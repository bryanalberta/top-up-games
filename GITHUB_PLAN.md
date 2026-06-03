# Rencana Distribusi Tugas Kelompok - Sultan Top Up

Dokumen ini berisi daftar Issue (Tugas) yang telah dirancang untuk dibagi di antara anggota kelompok. Anda dapat membuat tugas-tugas ini secara manual di GitHub atau menggunakan script otomasi `scripts/create-github-tasks.js`.

---

## Daftar Issue & Pembagian Tugas

### 📋 Issue 1: [UI/UX] Integrasi Opsi Pembayaran Baru pada Form Checkout
- **Deskripsi**: Menambahkan opsi pembayaran simulasi ("Sandbox Gateway (Simulasi)") dan pembayaran manual ("BCA Transfer (Manual)", "DANA (Manual)", "GoPay (Manual)") ke pilihan pembayaran di halaman detail game. Menambahkan logika pengalihan rute pasca-checkout: jika memilih sandbox, dialihkan ke halaman simulator; jika manual, dialihkan langsung ke struk sukses.
- **Kategori**: Frontend (UI/UX)
- **File Terkait**: `frontend/src/app/game/[id]/page.tsx`
- **Tingkat Kesulitan**: Mudah

---

### 📋 Issue 2: [Backend] Implementasi Simulator Endpoint & Fallback Gateway
- **Deskripsi**: Menambahkan endpoint simulator `/api/sandbox/pay/:id/success` dan `/api/sandbox/pay/:id/failed` yang mengubah status transaksi langsung di database tanpa otorisasi token admin. Menyesuaikan logika endpoint `POST /api/transactions` untuk melewati proses Midtrans jika metode simulasi/manual dipilih. Menambahkan fallback otomatis jika koneksi Midtrans mengalami masalah kredensial.
- **Kategori**: Backend (API & Routing)
- **File Terkait**: `backend/src/index.ts`
- **Tingkat Kesulitan**: Sedang

---

### 📋 Issue 3: [Frontend] Pembuatan Halaman Gateway Simulator Sandbox
- **Deskripsi**: Membuat halaman visual `/sandbox/pay/[id]` dengan antarmuka bertema gelap E-Sports yang interaktif. Menampilkan detail pesanan (Order ID, Game, Nama Item, Total Nominal) dan menyediakan tombol "Simulasikan Pembayaran Sukses" serta "Simulasikan Pembayaran Gagal" yang memicu callback backend dan mengarahkan kembali ke halaman sukses/lacak.
- **Kategori**: Frontend (UI & Integrasi)
- **File Terkait**: `frontend/src/app/sandbox/pay/[id]/page.tsx`
- **Tingkat Kesulitan**: Sedang

---

### 📋 Issue 4: [Frontend] Panduan Transfer Pembayaran Manual & Whatsapp Link Generator
- **Deskripsi**: Memodifikasi halaman `/success` dan halaman `/lacak` untuk mendeteksi metode pembayaran manual. Jika status transaksi manual masih `PENDING`, tampilkan detail rekening target transfer (Bank BCA / DANA / GoPay), instruksi nominal presisi, dan tombol tautan WhatsApp dinamis untuk mempermudah pembeli mengirim bukti transfer ke Admin.
- **Kategori**: Frontend (UX & Fitur)
- **File Terkait**: `frontend/src/app/success/page.tsx`, `frontend/src/app/lacak/page.tsx`
- **Tingkat Kesulitan**: Sedang

---

### 📋 Issue 5: [Admin] Fitur Verifikasi & Persetujuan Pembayaran Manual di Dashboard Admin
- **Deskripsi**: Menambahkan kolom baru "Aksi" pada tabel transaksi dashboard admin `/admin`. Jika transaksi manual berstatus `PENDING`, tampilkan tombol "Setujui" (untuk melunasi dan memicu pengiriman diamond) dan "Tolak" (membatalkan pesanan). Membuat endpoint backend `POST /api/admin/transactions/:id/approve` dan `POST /api/admin/transactions/:id/reject` yang diproteksi token admin.
- **Kategori**: Fullstack (UI Admin & API Otorisasi)
- **File Terkait**: `frontend/src/app/admin/page.tsx`, `backend/src/index.ts`
- **Tingkat Kesulitan**: Tinggi

---

### 📋 Issue 6: [DB/Seed] Migrasi Database ke SQLite & Pembaruan Katalog Harga Valid
- **Deskripsi**: Mengubah konfigurasi database dari PostgreSQL Supabase (yang berbayar/memerlukan koneksi luar) ke SQLite lokal `dev.db` agar web dapat berjalan offline secara gratis. Melakukan validasi dan seeding harga diamond untuk game populer (MLBB, Free Fire, Valorant, dll.) agar data katalog sesuai dengan UniPin/Codashop.
- **Kategori**: DevOps / Database
- **File Terkait**: `backend/prisma/schema.prisma`, `backend/prisma/seed.ts`
- **Tingkat Kesulitan**: Sedang

---

### 📋 Issue 7: [Testing] Pengujian Integrasi Alur Transaksi dari Hulu ke Hilir
- **Deskripsi**: Menulis skenario pengujian komprehensif untuk memastikan alur checkout Sandbox Gateway dan Transfer Manual bekerja sempurna secara sinkron. Melakukan verifikasi log sistem supplier Digiflazz (mock/sandbox) saat transaksi sukses.
- **Kategori**: Quality Assurance (Testing)
- **Tingkat Kesulitan**: Mudah
