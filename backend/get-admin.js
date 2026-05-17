const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.admin.findMany();
  console.log("Admins:", admins.map(a => a.username));
}

main().finally(() => prisma.$disconnect());
