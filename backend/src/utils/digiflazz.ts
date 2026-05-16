import crypto from "crypto";

const username = process.env.DIGIFLAZZ_USERNAME || "demo123";
const key = process.env.DIGIFLAZZ_KEY || "demokey12345";
const isProduction = process.env.DIGIFLAZZ_IS_PRODUCTION === "true";

export async function processDigiflazzTopUp(refId: string, skuCode: string, customerNo: string) {
  try {
    // Pola Hash: md5(username + key + ref_id)
    const signString = username + key + refId;
    const sign = crypto.createHash("md5").update(signString).digest("hex");

    const payload = {
      username: username,
      buyer_sku_code: skuCode,     // Kode Produk supplier ex: ML5
      customer_no: customerNo,     // ID Game tujuan ex: 12345678
      ref_id: refId,               // Transaction ID dari kita
      sign: sign,
      testing: !isProduction       // Mode Sandbox / Development jika testing=true
    };

    console.log(`[DIGIFLAZZ DEBUG] Menembak API Digiflazz...`, payload);

    // Endpoint Digiflazz
    const url = "https://api.digiflazz.com/v1/transaction";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(`[DIGIFLAZZ RESPONSE]`, JSON.stringify(data));
    
    // Asumsi balasan dari Digiflazz mengandung data transaksi
    return data;
  } catch (error: any) {
    console.error("[DIGIFLAZZ ERROR]", error.message);
    throw error;
  }
}
