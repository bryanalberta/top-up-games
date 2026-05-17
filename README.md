# 🎮 Sultan Top Up - Portal Layanan Game Premium

![Sultan Top Up Banner](https://img.shields.io/badge/SULTAN_TOP_UP-Premium_Service-ec4899?style=for-the-badge&logo=react)

Sultan Top Up adalah platform layanan transaksi instan untuk top up berbagai macam game populer. Didesain dengan antarmuka yang sangat modern (Cyberpunk & Premium Esports Theme) serta dilengkapi dengan fitur keamanan dan kecepatan transaksi kilat.

> **🌍 Live Demo:** *(Opsional: Masukkan link Vercel/Hosting Anda di sini jika ada)*

## 👥 Anggota Kelompok

Proyek web ini dikembangkan oleh kelompok kami:

1. **Bryan Alberta Hildan Pradana** (NIM: 223140148) - *Project Manager & Full-Stack Developer* (Memimpin jalannya proyek, mengintegrasikan sistem Frontend Next.js dan Backend Node.js)
2. **Ahmad Nurhidayat Maulana** (NIM: 223140129) - *Frontend Developer (UI/UX)* (Merancang antarmuka pengguna dengan Tailwind CSS, membuat animasi Framer Motion, dan memastikan desain responsif)
3. **Allen Virgustiyan Prakoso** (NIM: 223140136) - *Backend Developer (API & Database)* (Membangun REST API menggunakan Express.js dan mengelola skema database PostgreSQL menggunakan Prisma ORM)
4. **Iswara Pranidana Kartika Putra** (NIM: 223140107) - *Backend Developer (Payment & Security)* (Mengimplementasikan Payment Gateway Midtrans, serta mengelola keamanan autentikasi JWT dan Enkripsi)
6. **Abdul Muntolib Fajarkhan** (NIM: 223140120) - *Frontend Developer (Integration)* (Menghubungkan antarmuka UI Frontend dengan API Backend, menangani *state management*, dan *error handling*)
7. **Dani Ahmad Kafabih** (NIM: 223140145) - *Quality Assurance & System Analyst* (Melakukan pengujian sistem (QA), menyusun dokumentasi proyek, dan melakukan *deployment*)

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan arsitektur Modern Full-Stack (Frontend & Backend terpisah):

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

### Backend
- **Framework:** [Express.js](https://expressjs.com/) & [Node.js](https://nodejs.org/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Payment Gateway:** [Midtrans](https://midtrans.com/)
- **Security & Auth:** JWT, Bcrypt, Helmet, CORS

## ✨ Fitur Utama

- ⚡ **Transaksi Instan:** Pengiriman kilat tanpa perlu mendaftar/login yang rumit.
- 🛡️ **Sistem Aman:** Keamanan data 100% dengan enkripsi tingkat militer dan jaminan legal.
- 💎 **Katalog Produk Lengkap:** Tersedia untuk berbagai game populer (Mobile Legends, Free Fire, Valorant, dll) dengan harga termurah ("Harga Sultan").
- 📱 **Desain Responsif:** Tampilan UI/UX premium yang berjalan mulus di perangkat Desktop maupun Mobile (Glassmorphism & Neon Effects).
- 🕒 **Dukungan 24/7:** Sistem berjalan online secara otomatis kapanpun dibutuhkan.
- 💳 **Integrasi Midtrans:** Mendukung berbagai metode pembayaran di Indonesia.

## 📸 Tampilan Antarmuka (Screenshots)

*(Silakan tambahkan gambar screenshot dari proyek Anda dan simpan di folder `public` atau `assets`, lalu ubah path di bawah ini)*

| Halaman Utama | Halaman Transaksi Game | Halaman Admin Dashboard |
| :---: | :---: | :---: |
| ![Home](./frontend/public/screenshot-home.png) *(Contoh)* | ![Transaksi](./frontend/public/screenshot-transaksi.png) *(Contoh)* | ![Admin](./frontend/public/screenshot-admin.png) *(Contoh)* |

## 📂 Struktur Folder Proyek

Proyek ini dipisah menjadi dua repositori utama di dalam satu folder (Monorepo style) untuk memisahkan *concern* antara UI dan logika API:

```text
top-up-games/
├── frontend/               # Aplikasi Klien (Next.js)
│   ├── public/             # Aset gambar statis
│   ├── src/
│   │   ├── app/            # App Router untuk halaman web
│   │   ├── components/     # Komponen UI React (Navbar, Footer, Card)
│   │   └── lib/            # Fungsi utilitas klien
│   └── tailwind.config.ts  # Konfigurasi Styling
│
└── backend/                # Aplikasi Server API (Express.js)
    ├── prisma/
    │   ├── schema.prisma   # Struktur Database ORM
    │   └── seed.ts         # Data awal (seeding) untuk database
    └── src/
        ├── controllers/    # Logika proses dari setiap endpoint
        ├── routes/         # Definisi jalur API (API Routes)
        └── utils/          # Konfigurasi Midtrans & Digiflazz
```

## 🗄️ Skema Database (ERD)

Aplikasi ini menggunakan PostgreSQL dengan **Prisma ORM**. Berikut adalah entitas utama dalam sistem kami:
- **User/Admin:** Mengelola autentikasi dan akses dashboard.
- **Game & Kategori:** Menyimpan informasi katalog game.
- **Product (Item):** Daftar nominal top-up dan harga (berelasi dengan Game).
- **Transaction (Order):** Menyimpan riwayat pembelian, status pembayaran dari Midtrans, dan nomor tujuan.

## 📡 Dokumentasi API Utama

Beberapa endpoint REST API utama yang tersedia di sisi Backend:

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| `GET` | `/api/games` | Mengambil seluruh katalog game |
| `GET` | `/api/games/:id` | Mengambil detail game beserta produk/item top-up |
| `POST` | `/api/transactions` | Membuat pesanan baru & mendapatkan URL Midtrans |
| `GET` | `/api/transactions/:orderId` | Mengecek status pesanan |
| `POST` | `/api/auth/login` | Login khusus Admin untuk mendapatkan token JWT |

## ⚙️ Cara Menjalankan Proyek Secara Lokal

Pastikan Anda sudah menginstal **Node.js**, **npm**, dan memiliki database **PostgreSQL** yang berjalan.

### 1. Kloning Repositori
```bash
git clone https://github.com/bryanalberta/top-up-games.git
cd top-up-games
```

### 2. Setup Backend (API Server)
Buka terminal dan jalankan:
```bash
cd backend
npm install
```

Buat file `.env` di dalam folder `backend` berdasarkan `.env.example`, minimal berisi:
```env
# URL Koneksi PostgreSQL Anda
DATABASE_URL="postgresql://username:password@localhost:5432/topup_db"
# Kunci Server Midtrans
MIDTRANS_SERVER_KEY="SB-Mid-server-xxxx"
# Rahasia untuk JWT Token
JWT_SECRET="rahasia_super_aman"
```

Setelah `.env` siap, jalankan migrasi database dan server:
```bash
npx prisma generate
npx prisma db push
npm run dev
```
Backend akan berjalan di `http://localhost:5000`.

### 3. Setup Frontend (Web UI)
Buka terminal baru dan jalankan:
```bash
cd frontend
npm install
```

Buat file `.env` atau `.env.local` di dalam folder `frontend`, berisi:
```env
# URL tempat Backend berjalan
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

Jalankan server tampilan web:
```bash
npm run dev
```
Frontend akan berjalan di `http://localhost:3000`. Buka alamat tersebut di browser Anda.

---
*Dibuat untuk memenuhi tugas kelompok / project pemrograman web.*
