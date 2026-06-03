import { PrismaClient } from "@prisma/client";
import prisma from "../src/db";

const PORT = 5000;
const testApiUrl = `http://localhost:${PORT}/api`;

async function runTests() {
  console.log("=== MEMULAI INTEGRATION TEST ===");

  // 1. Setup Data Awal di Database (Game & Product)
  console.log("\n[1/7] Menyiapkan data game dan produk di database...");
  await prisma.transaction.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.product.deleteMany();
  await prisma.game.deleteMany();

  const game = await prisma.game.create({
    data: {
      name: "Mobile Legends Test",
      publisher: "Moonton",
      imageUrl: "/images/mlbb.avif",
      description: "Top up MLBB Test",
      products: {
        create: [
          { name: "5 Diamonds Test", price: 1500, supplierSku: "ML5" }
        ]
      }
    },
    include: { products: true }
  });

  const product = game.products[0] as any;
  console.log(`Berhasil membuat Game: ${game.name}, Produk: ${product.name} (SKU: ${product.supplierSku})`);

  // 2. Start Server Backend untuk Testing
  console.log("\n[2/7] Menjalankan server testing...");
  // Import backend server (akan otomatis listen ke port 5000)
  require("../src/index.ts");

  // Tunggu server startup sejenak
  await new Promise(resolve => setTimeout(resolve, 3000));

  let testSuccess = true;

  try {
    // 3. Uji Endpoint Kesehatan (Health Check)
    console.log("\n[3/7] Menguji Health Check...");
    const healthRes = await fetch(`${testApiUrl}/health`);
    const healthData = (await healthRes.json()) as any;
    console.log("Health Check Response:", healthData);
    if (healthRes.ok && healthData.status === "ok") {
      console.log("✅ Health Check Berhasil!");
    } else {
      throw new Error("Health check gagal");
    }

    // 4. Uji Alur Checkout Sandbox Gateway (Qris)
    console.log("\n[4/7] Menguji Checkout Sandbox Gateway...");
    const checkoutGatewayRes = await fetch(`${testApiUrl}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: game.id,
        productId: product.id,
        gameUserId: "12345678",
        gameZoneId: "1234",
        paymentMethod: "Qris"
      })
    });

    const gatewayTrx = (await checkoutGatewayRes.json()) as any;
    console.log("Checkout Gateway Response:", gatewayTrx);
    if (checkoutGatewayRes.ok && gatewayTrx.id && gatewayTrx.payment_url.includes("pay_simulate=true")) {
      console.log("✅ Checkout Gateway Berhasil! Redirect URL simulasi terbentuk.");
    } else {
      throw new Error(`Checkout Gateway gagal: ${JSON.stringify(gatewayTrx)}`);
    }

    // 5. Uji Webhook Pembayaran Sukses Sandbox
    console.log("\n[5/7] Menguji Simulasi Webhook Pembayaran Sukses...");
    const webhookRes = await fetch(`${testApiUrl}/webhooks/midtrans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: gatewayTrx.id,
        transaction_status: "settlement",
        fraud_status: "accept"
      })
    });

    const webhookResult = (await webhookRes.json()) as any;
    console.log("Webhook Response:", webhookResult);
    
    // Periksa status transaksi di database
    const updatedGatewayTrx = await prisma.transaction.findUnique({
      where: { id: gatewayTrx.id }
    });
    console.log("Status Transaksi setelah Webhook:", updatedGatewayTrx?.status);
    if (webhookRes.ok && updatedGatewayTrx?.status === "SUCCESS") {
      console.log("✅ Simulasi Webhook Gateway Berhasil! Status berubah menjadi SUCCESS.");
    } else {
      throw new Error("Simulasi webhook gagal mengubah status menjadi SUCCESS");
    }

    // 6. Uji Alur Checkout Transfer Manual
    console.log("\n[6/7] Menguji Checkout Transfer Manual...");
    const checkoutManualRes = await fetch(`${testApiUrl}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: game.id,
        productId: product.id,
        gameUserId: "87654321",
        gameZoneId: "9999",
        paymentMethod: "Transfer Manual"
      })
    });

    const manualTrx = (await checkoutManualRes.json()) as any;
    console.log("Checkout Manual Response:", manualTrx);
    if (checkoutManualRes.ok && manualTrx.id && manualTrx.paymentCode.startsWith("TF-") && !manualTrx.payment_url) {
      console.log("✅ Checkout Transfer Manual Berhasil! Kode pembayaran TF-... terbentuk.");
    } else {
      throw new Error(`Checkout Transfer Manual gagal: ${JSON.stringify(manualTrx)}`);
    }

    // 7. Uji Otorisasi & Persetujuan Admin (Approval Lunas)
    console.log("\n[7/7] Menguji Login Admin & Persetujuan Lunas...");
    
    // Setup Admin Pertama
    const adminSetupRes = await fetch(`${testApiUrl}/admin/setup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin_test",
        password: "password123"
      })
    });
    console.log("Admin Setup Response Status:", adminSetupRes.status);
    
    // Login Admin
    const adminLoginRes = await fetch(`${testApiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin_test",
        password: "password123"
      })
    });
    const loginData = (await adminLoginRes.json()) as any;
    console.log("Admin Login Response:", loginData);
    if (!adminLoginRes.ok || !loginData.token) {
      throw new Error("Login admin gagal");
    }

    // Approval Lunas dengan Token Otorisasi
    const approveRes = await fetch(`${testApiUrl}/transactions/${manualTrx.id}/pay`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginData.token}`
      }
    });
    const approveResult = (await approveRes.json()) as any;
    console.log("Approve Response:", approveResult);

    const updatedManualTrx = await prisma.transaction.findUnique({
      where: { id: manualTrx.id }
    });
    console.log("Status Transaksi setelah Approval Admin:", updatedManualTrx?.status);
    
    if (approveRes.ok && updatedManualTrx?.status === "SUCCESS") {
      console.log("✅ Persetujuan Admin Berhasil! Status berubah menjadi SUCCESS.");
    } else {
      throw new Error("Persetujuan admin gagal mengubah status transaksi");
    }

    // Uji proteksi keamanan (harus mengembalikan 403 / 401 tanpa token)
    const unauthorizedApproveRes = await fetch(`${testApiUrl}/transactions/${manualTrx.id}/pay`, {
      method: "POST"
    });
    console.log("Status request tanpa token:", unauthorizedApproveRes.status);
    if (unauthorizedApproveRes.status === 403 || unauthorizedApproveRes.status === 401) {
      console.log("✅ Proteksi Keamanan 403/401 Berhasil! Request tanpa otorisasi ditolak.");
    } else {
      throw new Error("Proteksi keamanan gagal! Request tanpa token tidak diblokir.");
    }

  } catch (err: any) {
    console.error("❌ Terjadi Kegagalan Pengujian:", err.message);
    testSuccess = false;
  }

  console.log("\n=== INTEGRATION TEST SELESAI ===");
  if (testSuccess) {
    console.log("🎉 SEMUA PENGUJIAN TRANSAKSI BERHASIL TANPA ERROR ATAU API CRASH!");
    process.exit(0);
  } else {
    console.log("⚠️ ADA PENGUJIAN YANG GAGAL!");
    process.exit(1);
  }
}

runTests();
