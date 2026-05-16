import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function main() {
  console.log("Seeding database... Cleaning old data first.");

  // Memastikan tidak ada duplikat data dengan menghapus semua dulu
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.game.deleteMany();

  // Mobile Legends
  const mlbb = await prisma.game.create({
    data: {
      name: "Mobile Legends",
      publisher: "Moonton",
      imageUrl: "/images/mlbb.avif",
      description: "Top up Diamonds Mobile Legends: Bang Bang",
      isPopular: true,
      products: {
        create: [
          { name: "5 Diamonds", price: 1500 },
          { name: "12 Diamonds", price: 3500 },
          { name: "28 Diamonds", price: 8000 },
          { name: "59 Diamonds", price: 16000 },
          { name: "85 Diamonds", price: 24000 },
          { name: "170 Diamonds", price: 48000 },
          { name: "296 Diamonds", price: 84000 },
          { name: "878 Diamonds", price: 240000 },
          { name: "2010 Diamonds", price: 540000 },
          { name: "Weekly Diamond Pass", price: 27500 },
          { name: "Twilight Pass", price: 150000 },
        ]
      }
    }
  });

  // Free Fire
  const ff = await prisma.game.create({
    data: {
      name: "Free Fire",
      publisher: "Garena",
      imageUrl: "/images/ff.png",
      description: "Top up Diamonds Garena Free Fire",
      isPopular: true,
      products: {
        create: [
          { name: "5 Diamonds", price: 1000 },
          { name: "50 Diamonds", price: 8000 },
          { name: "70 Diamonds", price: 10000 },
          { name: "140 Diamonds", price: 20000 },
          { name: "355 Diamonds", price: 50000 },
          { name: "720 Diamonds", price: 100000 },
          { name: "1450 Diamonds", price: 200000 },
          { name: "Weekly Membership", price: 30000 },
          { name: "Monthly Membership", price: 100000 },
        ]
      }
    }
  });

  // Valorant
  const valo = await prisma.game.create({
    data: {
      name: "Valorant",
      publisher: "Riot Games",
      imageUrl: "/images/valorant.png",
      description: "Top up Valorant Points (VP)",
      isPopular: true,
      products: {
        create: [
          { name: "125 VP", price: 15000 },
          { name: "420 VP", price: 50000 },
          { name: "700 VP", price: 80000 },
          { name: "1375 VP", price: 150000 },
          { name: "2400 VP", price: 250000 },
          { name: "3400 VP", price: 350000 },
          { name: "4000 VP", price: 400000 },
          { name: "8150 VP", price: 800000 },
        ]
      }
    }
  });

  // PUBG Mobile
  const pubgm = await prisma.game.create({
    data: {
      name: "PUBG Mobile",
      publisher: "Tencent Games",
      imageUrl: "/images/pubg.jpg",
      description: "Top up UC PUBG Mobile",
      isPopular: false,
      products: {
        create: [
          { name: "60 UC", price: 15000 },
          { name: "325 UC", price: 75000 },
          { name: "660 UC", price: 150000 },
          { name: "1800 UC", price: 400000 },
          { name: "3850 UC", price: 800000 },
          { name: "8100 UC", price: 1600000 },
          { name: "Royale Pass Pack", price: 150000 },
          { name: "Elite Pass Plus", price: 400000 },
        ]
      }
    }
  });

  // Genshin Impact
  await prisma.game.create({
    data: {
      name: "Genshin Impact",
      publisher: "HoYoverse",
      imageUrl: "/images/genshin.webp", // Placeholder
      description: "Top up Genesis Crystals",
      isPopular: true,
      products: {
        create: [
          { name: "60 Genesis Crystals", price: 16000 },
          { name: "330 Genesis Crystals", price: 79000 },
          { name: "1090 Genesis Crystals", price: 249000 },
          { name: "2240 Genesis Crystals", price: 479000 },
          { name: "3880 Genesis Crystals", price: 799000 },
          { name: "8080 Genesis Crystals", price: 1599000 },
          { name: "Blessing of the Welkin Moon", price: 79000 },
        ]
      }
    }
  });

  // Call of Duty Mobile
  await prisma.game.create({
    data: {
      name: "Call of Duty Mobile",
      publisher: "Garena",
      imageUrl: "/images/codm.webp", // Placeholder
      description: "Top up CP Call of Duty Mobile",
      isPopular: true,
      products: {
        create: [
          { name: "31 CP", price: 5000 },
          { name: "62 CP", price: 10000 },
          { name: "127 CP", price: 20000 },
          { name: "317 CP", price: 50000 },
          { name: "634 CP", price: 100000 },
          { name: "1373 CP", price: 200000 },
          { name: "3564 CP", price: 500000 },
          { name: "7656 CP", price: 1000000 },
          { name: "Premium Pass", price: 80000 },
        ]
      }
    }
  });

  // EA SPORTS FC Mobile
  await prisma.game.create({
    data: {
      name: "EA SPORTS FC Mobile",
      publisher: "Electronic Arts",
      imageUrl: "/images/ea sports.png", // Placeholder
      description: "Top up FC Points",
      isPopular: false,
      products: {
        create: [
          { name: "100 FC Points", price: 15000 },
          { name: "500 FC Points", price: 75000 },
          { name: "1050 FC Points", price: 150000 },
          { name: "2200 FC Points", price: 300000 },
          { name: "5750 FC Points", price: 750000 },
          { name: "12000 FC Points", price: 1500000 },
          { name: "Star Pass", price: 150000 },
        ]
      }
    }
  });

  // Roblox
  await prisma.game.create({
    data: {
      name: "Roblox",
      publisher: "Roblox Corporation",
      imageUrl: "/images/roblox.png", // Placeholder
      description: "Top up Robux",
      isPopular: false,
      products: {
        create: [
          { name: "40 Robux", price: 8000 },
          { name: "80 Robux", price: 15000 },
          { name: "400 Robux", price: 75000 },
          { name: "800 Robux", price: 150000 },
          { name: "1700 Robux", price: 300000 },
          { name: "4500 Robux", price: 799000 },
          { name: "10000 Robux", price: 1599000 },
          { name: "22500 Robux", price: 3199000 },
          { name: "Roblox Premium 450", price: 79000 },
          { name: "Roblox Premium 1000", price: 159000 },
        ]
      }
    }
  });

  // Honor of Kings
  await prisma.game.create({
    data: {
      name: "Honor of Kings",
      publisher: "Level Infinite",
      imageUrl: "/images/hok.jpeg", // Placeholder
      description: "Top up Tokens",
      isPopular: true,
      products: {
        create: [
          { name: "16 Tokens", price: 3000 },
          { name: "80 Tokens", price: 15000 },
          { name: "240 Tokens", price: 45000 },
          { name: "400 Tokens", price: 75000 },
          { name: "560 Tokens", price: 105000 },
          { name: "800 Tokens", price: 150000 },
          { name: "1200 Tokens", price: 225000 },
          { name: "Weekly Weekly Card", price: 30000 },
        ]
      }
    }
  });

  // Arena of Valor
  await prisma.game.create({
    data: {
      name: "Arena of Valor",
      publisher: "Garena",
      imageUrl: "/images/aov.png", // Placeholder
      description: "Top up Vouchers",
      isPopular: false,
      products: {
        create: [
          { name: "40 Vouchers", price: 10000 },
          { name: "90 Vouchers", price: 20000 },
          { name: "230 Vouchers", price: 50000 },
          { name: "470 Vouchers", price: 100000 },
          { name: "950 Vouchers", price: 200000 },
          { name: "2400 Vouchers", price: 500000 },
          { name: "4800 Vouchers", price: 1000000 },
          { name: "Codex Level 1", price: 100000 },
        ]
      }
    }
  });

  // Point Blank
  await prisma.game.create({
    data: {
      name: "Point Blank",
      publisher: "Zepetto",
      imageUrl: "/images/pb.png", // Placeholder
      description: "Top up PB Cash",
      isPopular: false,
      products: {
        create: [
          { name: "1.200 PB Cash", price: 10000 },
          { name: "2.400 PB Cash", price: 20000 },
          { name: "6.000 PB Cash", price: 50000 },
          { name: "12.000 PB Cash", price: 100000 },
          { name: "24.000 PB Cash", price: 200000 },
          { name: "36.000 PB Cash", price: 300000 },
          { name: "60.000 PB Cash", price: 500000 },
        ]
      }
    }
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
