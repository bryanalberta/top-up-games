const readline = require("readline");

const issues = [
  {
    title: "[UI/UX] Integrasi Opsi Pembayaran Baru pada Form Checkout",
    body: `### Deskripsi Tugas
Menambahkan opsi pembayaran simulasi ("Sandbox Gateway (Simulasi)") dan pembayaran manual ("BCA Transfer (Manual)", "DANA (Manual)", "GoPay (Manual)") ke pilihan pembayaran di halaman detail game.

### Detail Implementasi
- Modifikasi \`frontend/src/app/game/[id]/page.tsx\`
- Ubah array metode pembayaran.
- Perbarui logika \`handleTransaction\` agar mengalihkan rute sesuai dengan metode pembayaran yang dipilih (Sandbox -> halaman simulator, Manual -> langsung struk sukses).

**Kategori**: Frontend (UI/UX)
**Tingkat Kesulitan**: Mudah`,
    labels: ["frontend", "easy", "group-task"]
  },
  {
    title: "[Backend] Implementasi Simulator Endpoint & Fallback Gateway",
    body: `### Deskripsi Tugas
Menambahkan endpoint simulator sandbox dan menyesuaikan logika checkout utama untuk mendeteksi metode simulasi/manual.

### Detail Implementasi
- Modifikasi \`backend/src/index.ts\`
- Buat endpoint:
  - \`POST /api/sandbox/pay/:id/success\` (Ubah status ke SUCCESS, trigger Digiflazz)
  - \`POST /api/sandbox/pay/:id/failed\` (Ubah status ke FAILED)
- Sesuaikan \`POST /api/transactions\` agar jika memilih Sandbox/Manual tidak memanggil API Midtrans asli melainkan mengembalikan koordinat lokal.
- Tambahkan try-catch fallback otomatis dari Midtrans ke Sandbox.

**Kategori**: Backend (API)
**Tingkat Kesulitan**: Sedang`,
    labels: ["backend", "medium", "group-task"]
  },
  {
    title: "[Frontend] Pembuatan Halaman Gateway Simulator Sandbox",
    body: `### Deskripsi Tugas
Membuat halaman visual simulator pembayaran lokal yang bertindak sebagai mock payment gateway.

### Detail Implementasi
- Buat file baru \`frontend/src/app/sandbox/pay/[id]/page.tsx\`
- Tampilkan ringkasan pesanan yang terenkripsi (Order ID, Game, Produk, Total Nominal, ID Pemain).
- Sediakan tombol "Simulasikan Pembayaran Sukses" dan "Simulasikan Pembayaran Gagal" yang memanggil API simulator backend.

**Kategori**: Frontend (UI & Integrasi)
**Tingkat Kesulitan**: Sedang`,
    labels: ["frontend", "medium", "group-task"]
  },
  {
    title: "[Frontend] Panduan Transfer Pembayaran Manual & Whatsapp Link Generator",
    body: `### Deskripsi Tugas
Menampilkan instruksi transfer uang (No Rekening, Nama Penerima, Nominal Presisi) apabila pembeli memilih jalur manual.

### Detail Implementasi
- Modifikasi \`frontend/src/app/success/page.tsx\` dan \`frontend/src/app/lacak/page.tsx\`
- Deteksi jika \`paymentMethod\` mengandung kata "Manual".
- Tampilkan target rekening Bank BCA / DANA / GoPay Kelompok secara detail.
- Sediakan tombol Konfirmasi via WhatsApp dengan auto-text WhatsApp Link Generator.

**Kategori**: Frontend (UX & Fitur)
**Tingkat Kesulitan**: Sedang`,
    labels: ["frontend", "medium", "group-task"]
  },
  {
    title: "[Admin] Fitur Verifikasi & Persetujuan Pembayaran Manual di Dashboard Admin",
    body: `### Deskripsi Tugas
Menambahkan kendali persetujuan transaksi manual di dashboard admin agar admin kelompok dapat menandai lunas atau menolak transaksi.

### Detail Implementasi
- Modifikasi \`backend/src/index.ts\`:
  - Tambahkan endpoint \`POST /api/admin/transactions/:id/approve\` (Protected with token)
  - Tambahkan endpoint \`POST /api/admin/transactions/:id/reject\` (Protected with token)
- Modifikasi \`frontend/src/app/admin/page.tsx\`:
  - Tambahkan kolom "Aksi" pada tabel Beranda Status.
  - Tampilkan tombol "Setujui" & "Tolak" untuk transaksi manual pending.
  - Kirim authorization header admin token saat diklik.

**Kategori**: Fullstack (UI Admin & API Otorisasi)
**Tingkat Kesulitan**: Tinggi`,
    labels: ["fullstack", "hard", "group-task"]
  },
  {
    title: "[DB/Seed] Migrasi Database ke SQLite & Pembaruan Katalog Harga Valid",
    body: `### Deskripsi Tugas
Memindahkan database dari Supabase Postgres ke SQLite lokal agar proyek dapat diuji dan dijalankan secara mandiri gratis secara offline. Memastikan data harga diamond game valid sesuai pasaran top-up.

### Detail Implementasi
- Modifikasi \`backend/prisma/schema.prisma\` (Ubah provider ke "sqlite" dan datasource URL ke file lokal).
- Jalankan \`npx prisma db push\` untuk sinkronisasi.
- Verifikasi dan jalankan \`npx ts-node prisma/seed.ts\` untuk mengisi database dengan harga realistik MLBB, Free Fire, Valorant, PUBG, dll.

**Kategori**: Database / DevOps
**Tingkat Kesulitan**: Sedang`,
    labels: ["database", "medium", "group-task"]
  },
  {
    title: "[Testing] Pengujian Integrasi Alur Transaksi Kelompok dari Hulu ke Hilir",
    body: `### Deskripsi Tugas
Melakukan pengujian fungsionalitas keseluruhan sistem untuk memastikan tidak ada celah error atau koordinat transaksi yang terputus.

### Detail Implementasi
- Uji checkout Sandbox Gateway (memastikan status menjadi SUCCESS dan produk terkirim/tercatat).
- Uji checkout Transfer Manual (memastikan instruksi tampil, WhatsApp link terbentuk, dan Admin dapat melakukan approval lunas).
- Pastikan tidak ada error 403 atau API crash.

**Kategori**: Quality Assurance (Testing)
**Tingkat Kesulitan**: Mudah`,
    labels: ["testing", "easy", "group-task"]
  }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== GITHUB ISSUES GENERATOR SULTAN TOP UP ===");
console.log("Script ini akan otomatis mengupload daftar tugas kelompok ke repositori GitHub Anda.");
console.log("Pastikan Anda memiliki GitHub Personal Access Token (PAT) dengan akses 'repo'.\n");

rl.question("Masukkan Owner / Username GitHub (default: bryanalberta): ", (ownerInput) => {
  const owner = ownerInput.trim() || "bryanalberta";
  
  rl.question("Masukkan Nama Repositori GitHub (default: top-up-games): ", (repoInput) => {
    const repo = repoInput.trim() || "top-up-games";
    
    rl.question("Masukkan GitHub Personal Access Token Anda: ", async (token) => {
      if (!token || token.trim() === "") {
        console.error("Token tidak boleh kosong!");
        rl.close();
        return;
      }
      
      console.log(`\nMemulai pengunggahan ${issues.length} Issues ke ${owner}/${repo}...`);
      
      for (const issue of issues) {
        try {
          const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token.trim()}`,
              "Accept": "application/vnd.github.v3+json",
              "Content-Type": "application/json",
              "User-Agent": "NodeJS-Issue-Creator"
            },
            body: JSON.stringify({
              title: issue.title,
              body: issue.body,
              labels: issue.labels
            })
          });
          
          if (res.ok) {
            const data = await res.json();
            console.log(`✔ Berhasil membuat Issue: "${issue.title}" (Link: ${data.html_url})`);
          } else {
            const errorText = await res.text();
            console.error(`✘ Gagal membuat Issue "${issue.title}":`, errorText);
          }
        } catch (err) {
          console.error(`✘ Terjadi kesalahan koneksi saat membuat Issue "${issue.title}":`, err.message);
        }
      }
      
      console.log("\nProses Pengunggahan Selesai!");
      console.log("Anda sekarang dapat membuka Tab 'Projects' di repositori GitHub Anda:");
      console.log(`👉 https://github.com/${owner}/${repo}/projects`);
      console.log("Pilih 'New Project' -> 'Board' -> 'Link Repository' -> Pilih repositori Anda untuk menyinkronkan tugas-tugas di atas.");
      
      rl.close();
    });
  });
});
