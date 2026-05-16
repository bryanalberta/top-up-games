require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

async function main() {
  const connectionString = process.env.DATABASE_URL.replace('?pgbouncer=true', '');
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected to PostgreSQL using pg");
    
    // Read SQL file (handling UTF-16LE from PowerShell)
    let sql = fs.readFileSync('migrate.sql', 'utf16le');
    // If it's actually ASCII/UTF8, utf16le reading will make it look weird.
    // Let's read as buffer and detect
    const buf = fs.readFileSync('migrate.sql');
    if (buf.length >= 2 && buf[0] === 0xFF && buf[1] === 0xFE) {
        sql = buf.toString('utf16le');
    } else {
        sql = buf.toString('utf8');
    }
    
    const sqlCleaned = sql.replace(/^\uFEFF/g, '');
    await client.query(sqlCleaned);
    console.log("Migration executed successfully!");
    
  } catch (error) {
    console.error("Error executing migration:", error);
  } finally {
    await client.end();
  }
}

main();
