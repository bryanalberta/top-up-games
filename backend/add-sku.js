const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.updateMany({
    data: { supplierSku: "ML5" } // Force update all products just for testing Sandbox Digiflazz
  });
  console.log("Updated all products with mock supplierSku ML5");
  await prisma.$disconnect();
}
main();
