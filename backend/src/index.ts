import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import prisma from "./db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { snap, coreApi } from "./utils/midtrans";
import { processDigiflazzTopUp } from "./utils/digiflazz";

const JWT_SECRET = process.env.JWT_SECRET || "sultan_top_up_super_secret_key";

const app = express();
const port = process.env.PORT || 5000;

// --- SECURITY MIDDLEWARE ---
// 1. Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

// 2. Strict CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
  message: { error: "Terlalu banyak request dari IP ini, coba lagi nanti." },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', globalLimiter);

// 4. Stricter Rate Limiting for Auth/Login
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10, // Start blocking after 10 requests
  message: { error: "Terlalu banyak percobaan login, coba lagi setelah 1 jam." }
});

app.use(express.json({ limit: '10kb' })); // Body parser limit to prevent payload DoS

// --- CUSTOM MIDDLEWARE ---
const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ error: "Missing authorization header" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// --- AUTH ROUTES ---
app.get("/api/admin/setup-status", async (req, res) => {
  try {
    const adminCount = await prisma.admin.count();
    res.json({ isSetup: adminCount > 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to check admin setup status" });
  }
});

app.post("/api/admin/setup", authLimiter, async (req, res) => {
  try {
    const adminCount = await prisma.admin.count();
    if (adminCount > 0) return res.status(403).json({ error: "Admin already setup" });

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Credentials required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: { username, password: hashedPassword }
    });
    res.json({ message: "Admin setup successful" });
  } catch (error) {
    res.status(500).json({ error: "Setup failed" });
  }
});

app.post("/api/auth/login", authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// --- ROUTES ---

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Sultan Top Up API is running" });
});

// Sync Katalog API (Khusus Admin/Testing)
import { syncDigiflazzHarga } from "./utils/sync-katalog";
app.post("/api/admin/sync", async (req, res) => {
  try {
    const result = await syncDigiflazzHarga();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: "Gagal Sync", message: err.message });
  }
});

// GET all games
app.get("/api/games", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: { products: true }
    });
    res.json(games);
  } catch (error) {
    console.error("Games API Error:", error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// GET popular games
app.get("/api/games/popular", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      where: { isPopular: true }
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular games" });
  }
});

// GET single game by ID
app.get("/api/games/:id", async (req, res) => {
  try {
    const game = await prisma.game.findUnique({
      where: { id: req.params.id },
      include: { products: true }
    });
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game" });
  }
});

// POST transaction (Top Up)
app.post("/api/transactions", async (req, res) => {
  const { gameId, productId, gameUserId, gameZoneId, paymentMethod } = req.body;
  
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ error: "Product not found" });

    // 1. Periksa metode pembayaran
    const isSandbox = paymentMethod === "Sandbox Gateway (Simulasi)" || paymentMethod === "Sandbox Gateway";
    const isManual = paymentMethod.toLowerCase().includes("manual");

    // 2. Simpan transaksi ke database (PENDING)
    const transaction = await prisma.transaction.create({
      // @ts-ignore
      data: {
        gameId,
        productId,
        gameUserId,
        gameZoneId,
        amount: product.price,
        paymentMethod,
        status: "PENDING"
      }
    });

    if (isSandbox) {
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const paymentUrl = `${frontendUrl}/sandbox/pay/${transaction.id}`;
      
      const updatedTrx = await prisma.transaction.update({
        where: { id: transaction.id },
        data: { paymentCode: "TRX-SANDBOX" }
      });

      return res.status(201).json({
        ...updatedTrx,
        snap_token: "MOCK_SNAP_TOKEN",
        payment_url: paymentUrl
      });
    }

    if (isManual) {
      // Kode transfer manual unik dengan format TRX-MAN-RANDOM
      const uniqueCode = "TRX-MAN-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const updatedTrx = await prisma.transaction.update({
        where: { id: transaction.id },
        data: { paymentCode: uniqueCode }
      });

      return res.status(201).json({
        ...updatedTrx,
        snap_token: null,
        payment_url: null
      });
    }

    // Alur Default Midtrans (Fallback)
    try {
      const parameter = {
        transaction_details: {
          order_id: transaction.id,
          gross_amount: product.price
        },
        customer_details: {
          first_name: gameUserId,
          last_name: gameZoneId ? `(${gameZoneId})` : ""
        },
        item_details: [{
          id: product.id,
          price: product.price,
          quantity: 1,
          name: product.name
        }]
      };

      const snapResponse = await snap.createTransaction(parameter);

      const updatedTrx = await prisma.transaction.update({
        where: { id: transaction.id },
        data: { paymentCode: snapResponse.redirect_url }
      });

      return res.status(201).json({
        ...updatedTrx,
        snap_token: snapResponse.token,
        payment_url: snapResponse.redirect_url
      });
    } catch (midtransErr: any) {
      console.warn("Midtrans failed, falling back to Sandbox Simulator:", midtransErr.message);
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const paymentUrl = `${frontendUrl}/sandbox/pay/${transaction.id}`;
      
      const updatedTrx = await prisma.transaction.update({
        where: { id: transaction.id },
        data: { paymentCode: "TRX-SANDBOX-FALLBACK" }
      });

      return res.status(201).json({
        ...updatedTrx,
        snap_token: "MOCK_SNAP_TOKEN",
        payment_url: paymentUrl
      });
    }
  } catch (error: any) {
    console.error("Transaction Error:", error.message);
    res.status(500).json({ error: "Failed to create transaction", details: error.message });
  }
});

// POST Webhook Midtrans (Notifikasi Pembayaran)
app.post("/api/webhooks/midtrans", async (req, res) => {
  try {
    const notification = req.body;
    
    // Verifikasi Signature jika sedang production (Untuk keamanan)
    // Di tahap ini kita percaya data req.body dulu untuk kemudahan sandbox
    const statusResponse = await snap.transaction.notification(notification);
    
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    let finalStatus = "PENDING";

    if (transactionStatus == 'capture') {
        if (fraudStatus == 'challenge'){
            // TODO set transaction status on your database to 'challenge'
            finalStatus = "PENDING";
        } else if (fraudStatus == 'accept'){
            finalStatus = "SUCCESS";
        }
    } else if (transactionStatus == 'settlement'){
        finalStatus = "SUCCESS";
    } else if (transactionStatus == 'cancel' ||
      transactionStatus == 'deny' ||
      transactionStatus == 'expire'){
        finalStatus = "FAILED";
    } else if (transactionStatus == 'pending'){
        finalStatus = "PENDING";
    }

    if (finalStatus === "SUCCESS") {
       // Update transaksi menjadi SUCCESS
       const trans = await prisma.transaction.update({
         where: { id: orderId },
         data: { status: "SUCCESS" },
         include: { product: true }
       });
       console.log(`[WEBHOOK] Order ${orderId} is SUCCESS! Paid.`);
       
       // TAHAP B: Panggil API Digiflazz di sini...
       if (trans.product.supplierSku) {
         console.log(`[SYSTEM] Triggering Digiflazz for SKU: ${trans.product.supplierSku}`);
         try {
           const customerTarget = trans.gameUserId + (trans.gameZoneId || "");
           await processDigiflazzTopUp(trans.id, trans.product.supplierSku, customerTarget);
         } catch (e) {
           console.error("[SYSTEM] Digiflazz Trigger Failed!", e);
         }
       } else {
         console.log(`[SYSTEM] Order ${orderId} has no supplierSku. Manual Processing required.`);
       }
    } else if (finalStatus === "FAILED") {
       await prisma.transaction.update({
         where: { id: orderId },
         data: { status: "FAILED" }
       });
       console.log(`[WEBHOOK] Order ${orderId} is FAILED/EXPIRED.`);
    }

    res.status(200).json({ status: "ok" });
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    // Midtrans membutuhkan HTTP 200 supaya tidak mengulang ping terus menerus
    res.status(200).json({ status: "error", message: error.message });
  }
});

// GET single transaction
app.get("/api/transactions/:id", async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: req.params.id },
      include: {
        game: true,
        product: true
      }
    });
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
});

// Helper function to complete transaction and trigger Digiflazz/log top-up
async function completeTransaction(transactionId: string) {
  const trans = await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: "SUCCESS" },
    include: { product: true }
  });
  console.log(`[SYSTEM] Transaction ${transactionId} marked as SUCCESS.`);
  
  if (trans.product.supplierSku) {
    console.log(`[SYSTEM] Triggering Digiflazz for SKU: ${trans.product.supplierSku}`);
    try {
      const customerTarget = trans.gameUserId + (trans.gameZoneId || "");
      await processDigiflazzTopUp(trans.id, trans.product.supplierSku, customerTarget);
    } catch (e) {
      console.error("[SYSTEM] Digiflazz Trigger Failed!", e);
    }
  } else {
    console.log(`[SYSTEM] Transaction ${transactionId} has no supplierSku. Manual / Simulation Processing completed.`);
  }
  return trans;
}

// POST simulate payment (Admin / Demo / Customer - No Token Required for Simulation)
app.post("/api/transactions/:id/pay", async (req, res) => {
  try {
    const transaction = await completeTransaction(req.params.id);
    res.json(transaction);
  } catch (error) {
    console.error("Failed to update payment status:", error);
    res.status(500).json({ error: "Failed to update payment status" });
  }
});

// POST sandbox payment success
app.post("/api/sandbox/pay/:id/success", async (req, res) => {
  try {
    const transaction = await completeTransaction(req.params.id);
    res.json({ status: "SUCCESS", transaction });
  } catch (error) {
    console.error("Sandbox pay success failed:", error);
    res.status(500).json({ error: "Failed to process sandbox payment" });
  }
});

// POST sandbox payment failed
app.post("/api/sandbox/pay/:id/failed", async (req, res) => {
  try {
    const transaction = await prisma.transaction.update({
      where: { id: req.params.id },
      data: { status: "FAILED" }
    });
    res.json({ status: "FAILED", transaction });
  } catch (error) {
    console.error("Sandbox pay failed failed:", error);
    res.status(500).json({ error: "Failed to cancel sandbox payment" });
  }
});

// POST admin approve manual transaction (Requires Admin Token)
app.post("/api/admin/transactions/:id/approve", verifyToken, async (req, res) => {
  try {
    const transaction = await completeTransaction(req.params.id);
    res.json({ message: "Transaction approved successfully", transaction });
  } catch (error) {
    console.error("Failed to approve transaction:", error);
    res.status(500).json({ error: "Failed to approve transaction" });
  }
});

// POST admin reject manual transaction (Requires Admin Token)
app.post("/api/admin/transactions/:id/reject", verifyToken, async (req, res) => {
  try {
    const transaction = await prisma.transaction.update({
      where: { id: req.params.id },
      data: { status: "FAILED" }
    });
    res.json({ message: "Transaction rejected successfully", transaction });
  } catch (error) {
    console.error("Failed to reject transaction:", error);
    res.status(500).json({ error: "Failed to reject transaction" });
  }
});

// GET admin stats
app.get("/api/admin/stats", verifyToken, async (req, res) => {
  try {
    const totalRevenueResult = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" }
    });
    
    const countPendingResult = await prisma.transaction.count({
      where: { status: "PENDING" }
    });

    const countSuccessResult = await prisma.transaction.count({
      where: { status: "SUCCESS" }
    });

    res.json({
      totalRevenue: totalRevenueResult._sum.amount || 0,
      totalPending: countPendingResult,
      totalSuccess: countSuccessResult
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET admin recent transactions
app.get("/api/admin/transactions", verifyToken, async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        game: { select: { name: true } },
        product: { select: { name: true, price: true } }
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent transactions" });
  }
});

// --- ADMIN CRUD ROUTES ---

// POST create new game
app.post("/api/games", verifyToken, async (req, res) => {
  try {
    const { name, publisher, imageUrl, description, isPopular } = req.body;
    const game = await prisma.game.create({
      data: { name, publisher, imageUrl, description, isPopular: isPopular || false }
    });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to create game" });
  }
});

// PUT update game
app.put("/api/games/:id", verifyToken, async (req, res) => {
  try {
    const { name, publisher, imageUrl, description, isPopular } = req.body;
    const game = await prisma.game.update({
      where: { id: req.params.id },
      data: { name, publisher, imageUrl, description, isPopular }
    });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to update game" });
  }
});

// DELETE game
app.delete("/api/games/:id", verifyToken, async (req, res) => {
  try {
    // Delete cascading dependencies manually since SQLite might complain
    await prisma.transaction.deleteMany({ where: { gameId: req.params.id } });
    await prisma.product.deleteMany({ where: { gameId: req.params.id } });
    const game = await prisma.game.delete({ where: { id: req.params.id } });
    res.json({ message: "Game deleted successfully", game });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

// POST create new product
app.post("/api/products", verifyToken, async (req, res) => {
  try {
    const { name, price, gameId } = req.body;
    const product = await prisma.product.create({
      data: { name, price: Number(price), gameId }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT update product
app.put("/api/products/:id", verifyToken, async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { name, price: Number(price) }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE product
app.delete("/api/products/:id", verifyToken, async (req, res) => {
  try {
    await prisma.transaction.deleteMany({ where: { productId: req.params.id } });
    const product = await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// START SERVER
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
