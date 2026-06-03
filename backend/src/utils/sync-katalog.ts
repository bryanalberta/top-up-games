import crypto from "crypto";
import prisma from "../db";

const username = process.env.DIGIFLAZZ_USERNAME || "demo123";
const key = process.env.DIGIFLAZZ_KEY || "demokey12345";
const isProduction = process.env.DIGIFLAZZ_IS_PRODUCTION === "true";

// Helper margin: Markup % + Pajak Dasar
const PROFIT_PERCENTAGE = 0.20; // Untung 20%
const FLAT_FEE = 500; // Biaya platform Rp 500 perak rata

export async function syncDigiflazzHarga() {
  try {
    // --- MOCK DIGIFLAZZ DATA START ---
    // Karena user belum memiliki akun Digiflazz aktif, kita gunakan data Mockup
    // yang mencerminkan struktur API Digiflazz asli (Offline Mode).
    const bodyData = {
       data: [
         // MOBILE LEGENDS
         { product_name: "3 Diamonds", category: "Games", brand: "MOBILE LEGENDS", price: 1100, buyer_sku_code: "ML3", buyer_product_status: true, seller_product_status: true },
         { product_name: "12 Diamonds", category: "Games", brand: "MOBILE LEGENDS", price: 3300, buyer_sku_code: "ML12", buyer_product_status: true, seller_product_status: true },
         { product_name: "28 Diamonds", category: "Games", brand: "MOBILE LEGENDS", price: 7900, buyer_sku_code: "ML28", buyer_product_status: true, seller_product_status: true },
         { product_name: "86 Diamonds", category: "Games", brand: "MOBILE LEGENDS", price: 19500, buyer_sku_code: "ML86", buyer_product_status: true, seller_product_status: true },
         { product_name: "172 Diamonds", category: "Games", brand: "MOBILE LEGENDS", price: 38000, buyer_sku_code: "ML172", buyer_product_status: true, seller_product_status: true },
         { product_name: "257 Diamonds", category: "Games", brand: "MOBILE LEGENDS", price: 58000, buyer_sku_code: "ML257", buyer_product_status: true, seller_product_status: true },
         { product_name: "706 Diamonds", category: "Games", brand: "MOBILE LEGENDS", price: 155000, buyer_sku_code: "ML706", buyer_product_status: true, seller_product_status: true },
         { product_name: "Weekly Diamond Pass", category: "Games", brand: "MOBILE LEGENDS", price: 23000, buyer_sku_code: "MLWDP", buyer_product_status: true, seller_product_status: true },
         
         // FREE FIRE
         { product_name: "5 Diamonds", category: "Games", brand: "FREE FIRE", price: 900, buyer_sku_code: "FF5", buyer_product_status: true, seller_product_status: true },
         { product_name: "50 Diamonds", category: "Games", brand: "FREE FIRE", price: 6500, buyer_sku_code: "FF50", buyer_product_status: true, seller_product_status: true },
         { product_name: "70 Diamonds", category: "Games", brand: "FREE FIRE", price: 9000, buyer_sku_code: "FF70", buyer_product_status: true, seller_product_status: true },
         { product_name: "140 Diamonds", category: "Games", brand: "FREE FIRE", price: 18000, buyer_sku_code: "FF140", buyer_product_status: true, seller_product_status: true },
         { product_name: "355 Diamonds", category: "Games", brand: "FREE FIRE", price: 45000, buyer_sku_code: "FF355", buyer_product_status: true, seller_product_status: true },
         { product_name: "720 Diamonds", category: "Games", brand: "FREE FIRE", price: 90000, buyer_sku_code: "FF720", buyer_product_status: true, seller_product_status: true },

         // VALORANT
         { product_name: "125 VP", category: "Games", brand: "VALORANT", price: 13500, buyer_sku_code: "VALO125", buyer_product_status: true, seller_product_status: true },
         { product_name: "420 VP", category: "Games", brand: "VALORANT", price: 45000, buyer_sku_code: "VALO420", buyer_product_status: true, seller_product_status: true },
         { product_name: "700 VP", category: "Games", brand: "VALORANT", price: 73000, buyer_sku_code: "VALO700", buyer_product_status: true, seller_product_status: true },
         { product_name: "1375 VP", category: "Games", brand: "VALORANT", price: 135000, buyer_sku_code: "VALO1375", buyer_product_status: true, seller_product_status: true },
         { product_name: "2400 VP", category: "Games", brand: "VALORANT", price: 235000, buyer_sku_code: "VALO2400", buyer_product_status: true, seller_product_status: true },

         // GENSHIN IMPACT
         { product_name: "60 Genesis Crystals", category: "Games", brand: "GENSHIN IMPACT", price: 13500, buyer_sku_code: "GI60", buyer_product_status: true, seller_product_status: true },
         { product_name: "330 Genesis Crystals", category: "Games", brand: "GENSHIN IMPACT", price: 65000, buyer_sku_code: "GI330", buyer_product_status: true, seller_product_status: true },
         { product_name: "1090 Genesis Crystals", category: "Games", brand: "GENSHIN IMPACT", price: 215000, buyer_sku_code: "GI1090", buyer_product_status: true, seller_product_status: true },
         { product_name: "2240 Genesis Crystals", category: "Games", brand: "GENSHIN IMPACT", price: 435000, buyer_sku_code: "GI2240", buyer_product_status: true, seller_product_status: true },
         { product_name: "Blessing of the Welkin Moon", category: "Games", brand: "GENSHIN IMPACT", price: 65000, buyer_sku_code: "GIWELKIN", buyer_product_status: true, seller_product_status: true },

         // PUBG MOBILE
         { product_name: "60 UC", category: "Games", brand: "PUBG MOBILE", price: 13500, buyer_sku_code: "PUBG60", buyer_product_status: true, seller_product_status: true },
         { product_name: "325 UC", category: "Games", brand: "PUBG MOBILE", price: 65000, buyer_sku_code: "PUBG325", buyer_product_status: true, seller_product_status: true },
         { product_name: "660 UC", category: "Games", brand: "PUBG MOBILE", price: 130000, buyer_sku_code: "PUBG660", buyer_product_status: true, seller_product_status: true },
         { product_name: "1800 UC", category: "Games", brand: "PUBG MOBILE", price: 345000, buyer_sku_code: "PUBG1800", buyer_product_status: true, seller_product_status: true },

         // CALL OF DUTY MOBILE
         { product_name: "31 CP", category: "Games", brand: "CALL OF DUTY MOBILE", price: 4500, buyer_sku_code: "CODM31", buyer_product_status: true, seller_product_status: true },
         { product_name: "62 CP", category: "Games", brand: "CALL OF DUTY MOBILE", price: 9000, buyer_sku_code: "CODM62", buyer_product_status: true, seller_product_status: true },
         { product_name: "127 CP", category: "Games", brand: "CALL OF DUTY MOBILE", price: 18000, buyer_sku_code: "CODM127", buyer_product_status: true, seller_product_status: true },
         { product_name: "317 CP", category: "Games", brand: "CALL OF DUTY MOBILE", price: 45000, buyer_sku_code: "CODM317", buyer_product_status: true, seller_product_status: true },

         // EA SPORTS FC MOBILE
         { product_name: "100 FC Points", category: "Games", brand: "EA SPORTS FC MOBILE", price: 13500, buyer_sku_code: "EA100", buyer_product_status: true, seller_product_status: true },
         { product_name: "500 FC Points", category: "Games", brand: "EA SPORTS FC MOBILE", price: 65000, buyer_sku_code: "EA500", buyer_product_status: true, seller_product_status: true },
         { product_name: "1050 FC Points", category: "Games", brand: "EA SPORTS FC MOBILE", price: 130000, buyer_sku_code: "EA1050", buyer_product_status: true, seller_product_status: true },
         { product_name: "2200 FC Points", category: "Games", brand: "EA SPORTS FC MOBILE", price: 260000, buyer_sku_code: "EA2200", buyer_product_status: true, seller_product_status: true },

         // ROBLOX
         { product_name: "80 Robux", category: "Games", brand: "ROBLOX", price: 13500, buyer_sku_code: "RBX80", buyer_product_status: true, seller_product_status: true },
         { product_name: "400 Robux", category: "Games", brand: "ROBLOX", price: 65000, buyer_sku_code: "RBX400", buyer_product_status: true, seller_product_status: true },
         { product_name: "800 Robux", category: "Games", brand: "ROBLOX", price: 130000, buyer_sku_code: "RBX800", buyer_product_status: true, seller_product_status: true },
         { product_name: "1700 Robux", category: "Games", brand: "ROBLOX", price: 260000, buyer_sku_code: "RBX1700", buyer_product_status: true, seller_product_status: true },

         // HONOR OF KINGS
         { product_name: "16 Tokens", category: "Games", brand: "HONOR OF KINGS", price: 2500, buyer_sku_code: "HOK16", buyer_product_status: true, seller_product_status: true },
         { product_name: "80 Tokens", category: "Games", brand: "HONOR OF KINGS", price: 13500, buyer_sku_code: "HOK80", buyer_product_status: true, seller_product_status: true },
         { product_name: "240 Tokens", category: "Games", brand: "HONOR OF KINGS", price: 38000, buyer_sku_code: "HOK240", buyer_product_status: true, seller_product_status: true },
         { product_name: "400 Tokens", category: "Games", brand: "HONOR OF KINGS", price: 65000, buyer_sku_code: "HOK400", buyer_product_status: true, seller_product_status: true },
         { product_name: "560 Tokens", category: "Games", brand: "HONOR OF KINGS", price: 90000, buyer_sku_code: "HOK560", buyer_product_status: true, seller_product_status: true },

         // ARENA OF VALOR
         { product_name: "40 Vouchers", category: "Games", brand: "ARENA OF VALOR", price: 9000, buyer_sku_code: "AOV40", buyer_product_status: true, seller_product_status: true },
         { product_name: "90 Vouchers", category: "Games", brand: "ARENA OF VALOR", price: 18000, buyer_sku_code: "AOV90", buyer_product_status: true, seller_product_status: true },
         { product_name: "230 Vouchers", category: "Games", brand: "ARENA OF VALOR", price: 45000, buyer_sku_code: "AOV230", buyer_product_status: true, seller_product_status: true },
         { product_name: "470 Vouchers", category: "Games", brand: "ARENA OF VALOR", price: 90000, buyer_sku_code: "AOV470", buyer_product_status: true, seller_product_status: true },

         // POINT BLANK
         { product_name: "1.200 PB Cash", category: "Games", brand: "POINT BLANK", price: 9000, buyer_sku_code: "PB1200", buyer_product_status: true, seller_product_status: true },
         { product_name: "2.400 PB Cash", category: "Games", brand: "POINT BLANK", price: 18000, buyer_sku_code: "PB2400", buyer_product_status: true, seller_product_status: true },
         { product_name: "6.000 PB Cash", category: "Games", brand: "POINT BLANK", price: 45000, buyer_sku_code: "PB6000", buyer_product_status: true, seller_product_status: true },
         { product_name: "12.000 PB Cash", category: "Games", brand: "POINT BLANK", price: 90000, buyer_sku_code: "PB12000", buyer_product_status: true, seller_product_status: true }
       ]
    };
    // --- MOCK DIGIFLAZZ DATA END ---

    console.log("[SYNC RAW RESPONSE] Menggunakan Offline Mock Data Digiflazz.");

    const titleCase = (str: string) => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    if (!bodyData || !bodyData.data || !Array.isArray(bodyData.data)) {
        console.error("[SYNC] Struktur JSON tidak terduga atau kredensial salah:", bodyData);
        return;
    }

    const items = bodyData.data;
    const gameItems = items.filter((item: any) => item.category === "Games" && item.seller_product_status === true && item.buyer_product_status === true);
    
    console.log(`[SYNC] Ditemukan ${gameItems.length} produk Game aktif dari server Digiflazz. Memproses injeksi...`);

    // Proses Pengelompokan Data & Injeksi
    const brandsProcessed = new Set();
    
    for (const item of gameItems) {
       // Buat Game-nya dulu di Database (Upsert) jika belum ada
       const brandNameRaw = item.brand; // "MOBILE LEGENDS"
       // Perbaiki dari uppercase (MOBILE LEGENDS) menjadi Title Case (Mobile Legends)
       let brandName = titleCase(brandNameRaw);
       // Handle specific brands
       if (brandName === "Pubg Mobile") brandName = "PUBG Mobile";
       if (brandName === "Call Of Duty Mobile") brandName = "Call of Duty Mobile";
       if (brandName === "Ea Sports Fc Mobile") brandName = "EA SPORTS FC Mobile";
       
       if (!brandsProcessed.has(brandName)) {
           // Mencegah error gambar kosong, kita gunakan default image
           let fallbackImage = "/images/default-game.jpg";
           if (brandName.toLowerCase().includes("mobile legend")) fallbackImage = "/images/mlbb.avif";
           if (brandName.toLowerCase().includes("free fire")) fallbackImage = "/images/ff.png";
           if (brandName.toLowerCase().includes("valorant")) fallbackImage = "/images/valorant.png";
           if (brandName.toLowerCase().includes("pubg")) fallbackImage = "/images/pubg.jpg";
           if (brandName.toLowerCase().includes("genshin")) fallbackImage = "/images/genshin.webp";
           if (brandName.toLowerCase().includes("honor of kings")) fallbackImage = "/images/hok.jpeg";
           if (brandName.toLowerCase().includes("call of duty")) fallbackImage = "/images/codm.webp";
           if (brandName.toLowerCase().includes("roblox")) fallbackImage = "/images/roblox.png";
           if (brandName.toLowerCase().includes("arena of valor")) fallbackImage = "/images/aov.png";
           if (brandName.toLowerCase().includes("sports fc")) fallbackImage = "/images/ea sports.png";
           if (brandName.toLowerCase().includes("point blank")) fallbackImage = "/images/pb.png";
           if (brandName.toLowerCase().includes("clash of clans")) fallbackImage = "/images/clashofclan.png";
           if (brandName.toLowerCase().includes("steam")) fallbackImage = "/images/How-to-Use-Steam-Wallet.jpg";
           if (brandName.toLowerCase().includes("minecraft")) fallbackImage = "/images/minecraft.webp";

           const existGame = await prisma.game.findFirst({ where: { name: brandName }});
           if (!existGame) {
               await prisma.game.create({
                   data: {
                       name: brandName,
                       publisher: brandName,
                       imageUrl: fallbackImage,
                       description: `Top up murah ${brandName} 24 Jam`,
                       isPopular: true
                   }
               });
           }
           
           brandsProcessed.add(brandName);
       }

       // Dapatkan Game ID asli
       const activeGame = await prisma.game.findFirst({ where: { name: brandName }});
       if (!activeGame) continue;

       // Proses Insert Harga Jual Akhir
       const modalDigiflazz = item.price;
       let hargaJualLokal = Math.ceil(modalDigiflazz + (modalDigiflazz * PROFIT_PERCENTAGE) + FLAT_FEE);
       
       // Sempurnakan angka: contoh Rp 15.340 -> Rp 15.500
       const remainder = hargaJualLokal % 100;
       if (remainder > 0) hargaJualLokal += (100 - remainder);

       const sku = item.buyer_sku_code;
       
       // @ts-ignore
       const existProduct = await prisma.product.findFirst({ where: { supplierSku: sku } });
       if (existProduct) {
           // Jika sudah ada (Misal: SKU 'ML5'), update harganya biar live!
           await prisma.product.update({
               where: { id: existProduct.id },
               data: { price: hargaJualLokal, name: item.product_name }
           });
       } else {
           // Jika Belum Ada, tambahkan ke Game!
           await prisma.product.create({
               // @ts-ignore
               data: {
                   name: item.product_name,
                   price: hargaJualLokal,
                   supplierSku: sku,
                   gameId: activeGame.id
               }
           });
       }
    }

    console.log(`[SYNC] 🎉 SUKSES! Katalog Harga dan Game telah berhasil diperbarui ke dalam Database!`);
    return { status: "success", parsed: gameItems.length };
  } catch (err: any) {
    console.error("[SYNC] Gagal:", err.message);
    throw err;
  }
}
