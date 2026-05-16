const { PrismaClient } = require("@prisma/client");
const { syncDigiflazzHarga } = require("./src/utils/sync-katalog");

const prisma = new PrismaClient();

async function main() {
    console.log("Menghapus semua Produk dan Game untuk menghindari duplikat...");
    await prisma.transaction.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.game.deleteMany({});
    console.log("Database bersih. Menjalankan Ulang Sinkronisasi...");
    await syncDigiflazzHarga();
    console.log("Selesai!");
}

main().catch(console.error);
