// Using native global fetch available in Node.js v24.x


async function testAll() {
  console.log("=== MEMULAI PENGUJIAN API SULTAN TOP UP ===");
  const baseUrl = "http://localhost:5000/api";

  // 0. Ambil daftar game dan produk untuk data uji
  console.log("\n1. Mengambil data game...");
  const gamesRes = await fetch(`${baseUrl}/games`);
  const games = await gamesRes.json();
  if (games.length === 0) {
    console.error("Gagal: Database kosong. Jalankan seed terlebih dahulu!");
    return;
  }
  const targetGame = games[0];
  const targetProduct = targetGame.products[0];
  console.log(`✔ Menggunakan Game: ${targetGame.name}, Produk: ${targetProduct.name} (Harga: Rp ${targetProduct.price})`);

  // 1. Uji Checkout Sandbox
  console.log("\n2. Menguji Checkout Sandbox Gateway...");
  const checkoutSandboxRes = await fetch(`${baseUrl}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gameId: targetGame.id,
      productId: targetProduct.id,
      gameUserId: "TEST_USER_SANDBOX",
      gameZoneId: "1234",
      paymentMethod: "Sandbox Gateway (Simulasi)"
    })
  });

  const sandboxTrx = await checkoutSandboxRes.json();
  if (checkoutSandboxRes.ok && sandboxTrx.payment_url && sandboxTrx.payment_url.includes("/sandbox/pay/")) {
    console.log(`✔ Berhasil membuat Transaksi Sandbox! ID: ${sandboxTrx.id}`);
    console.log(`  Redirect URL: ${sandboxTrx.payment_url}`);
  } else {
    console.error("✘ Gagal membuat transaksi Sandbox:", sandboxTrx);
    return;
  }

  // 2. Uji Pelunasan Sandbox Success
  console.log("\n3. Menguji Otorisasi Sukses Sandbox Gateway...");
  const paySandboxRes = await fetch(`${baseUrl}/sandbox/pay/${sandboxTrx.id}/success`, {
    method: "POST"
  });
  const paySandboxResult = await paySandboxRes.json();
  if (paySandboxRes.ok && paySandboxResult.status === "SUCCESS") {
    console.log("✔ Berhasil melunasi transaksi Sandbox!");
  } else {
    console.error("✘ Gagal melunasi transaksi Sandbox:", paySandboxResult);
    return;
  }

  // 3. Uji Status Akhir Sandbox
  const getSandboxTrxRes = await fetch(`${baseUrl}/transactions/${sandboxTrx.id}`);
  const getSandboxTrx = await getSandboxTrxRes.json();
  console.log(`✔ Status akhir transaksi Sandbox: ${getSandboxTrx.status} (Harus SUCCESS)`);

  // 4. Uji Checkout Manual
  console.log("\n4. Menguji Checkout Pembayaran Manual...");
  const checkoutManualRes = await fetch(`${baseUrl}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gameId: targetGame.id,
      productId: targetProduct.id,
      gameUserId: "TEST_USER_MANUAL",
      gameZoneId: "5678",
      paymentMethod: "BCA Transfer (Manual)"
    })
  });

  const manualTrx = await checkoutManualRes.json();
  if (checkoutManualRes.ok && manualTrx.paymentCode && manualTrx.paymentCode.startsWith("TRX-MAN-")) {
    console.log(`✔ Berhasil membuat Transaksi Manual! ID: ${manualTrx.id}`);
    console.log(`  Kode Transfer: ${manualTrx.paymentCode}`);
  } else {
    console.error("✘ Gagal membuat transaksi Manual:", manualTrx);
    return;
  }

  // 5. Uji Pelunasan Demo Tanpa Token (Endpoint public lama /pay yang sudah dibuka)
  console.log("\n5. Menguji Pelunasan Manual Instan (Jalur Customer)...");
  const payManualCustomerRes = await fetch(`${baseUrl}/transactions/${manualTrx.id}/pay`, {
    method: "POST"
  });
  const payManualCustomerResult = await payManualCustomerRes.json();
  if (payManualCustomerRes.ok && payManualCustomerResult.status === "SUCCESS") {
    console.log("✔ Berhasil melunasi manual via endpoint public /pay!");
  } else {
    console.error("✘ Gagal melunasi manual via endpoint public /pay:", payManualCustomerResult);
    return;
  }

  console.log("\n=== SEMUA PENGUJIAN INTEGRASI BERHASIL DILALUI! ===");
}

testAll().catch(err => console.error("Error saat pengujian:", err.message));
