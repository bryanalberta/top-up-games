const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  await client.connect();
  try {
    await client.query(`ALTER TABLE "Product" ADD COLUMN "supplierSku" TEXT;`);
    console.log("Column added successfully!");
  } catch (e) {
    if (e.message.includes("already exists")) {
       console.log("Column already exists, ignoring.");
    } else {
       console.error("Error adding column:", e.message);
    }
  }
  await client.end();
}
main();
