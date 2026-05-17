# 🎮 Sultan Top Up - Portal Layanan Game Premium

![Sultan Top Up Banner](https://img.shields.io/badge/SULTAN_TOP_UP-Premium_Service-ec4899?style=for-the-badge&logo=react)

Sultan Top Up adalah platform layanan transaksi instan untuk top up berbagai macam game populer. Didesain dengan antarmuka yang sangat modern (Cyberpunk & Premium Esports Theme) serta dilengkapi dengan fitur keamanan dan kecepatan transaksi kilat.

## 👥 Anggota Kelompok

Proyek web ini dikembangkan oleh kelompok kami:

1. **Bryan Alberta Hildan Pradana** (NIM: 223140148) - *Project Manager & Full-Stack Developer* (Memimpin jalannya proyek, mengintegrasikan sistem Frontend Next.js dan Backend Node.js)
2. **Ahmad Nurhidayat Maulana** (NIM: 223140129) - *Frontend Developer (UI/UX)* (Merancang antarmuka pengguna dengan Tailwind CSS, membuat animasi Framer Motion, dan memastikan desain responsif)
3. **Allen Virgustiyan Prakoso** (NIM: 223140136) - *Backend Developer (API & Database)* (Membangun REST API menggunakan Express.js dan mengelola skema database PostgreSQL menggunakan Prisma ORM)
4. **[Nama Anggota 666]** (NIM: ...) - *Backend Developer (Payment & Security)* (Mengimplementasikan Payment Gateway Midtrans, serta mengelola keamanan autentikasi JWT dan Enkripsi)
5. **Abdul Muntolib Fajarkhan** (NIM: 223140120) - *Frontend Developer (Integration)* (Menghubungkan antarmuka UI Frontend dengan API Backend, menangani *state management*, dan *error handling*)
6. **Dani Ahmad Kafabih** (NIM: 223140145) - *Quality Assurance & System Analyst* (Melakukan pengujian sistem (QA), menyusun dokumentasi proyek, dan melakukan *deployment*)

*(Catatan: Silakan lengkapi sisa nama dan NIM anggota yang belum terisi di atas)*

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

## ⚙️ Cara Menjalankan Proyek Secara Lokal

Pastikan Anda sudah menginstal **Node.js**, **npm**, dan memiliki database **PostgreSQL** yang berjalan.

### 1. Kloning Repositori
```bash
git clone https://github.com/bryanalberta/top-up-games.git
cd top-up-games
```

### 2. Setup Backend
```bash
cd backend
# Install dependensi
npm install

# Buat file .env dan sesuaikan dengan konfigurasi database & midtrans Anda
# (Silakan lihat .env.example jika ada, atau sesuaikan variabel environment)

# Jalankan migrasi Prisma
npx prisma generate
npx prisma db push

# Jalankan server development
npm run dev
```
Backend akan berjalan di `http://localhost:5000` (atau port yang disetel di `.env`).

### 3. Setup Frontend
Buka terminal baru:
```bash
cd frontend
# Install dependensi
npm install

# Buat file .env.local dan arahkan ke API Backend (contoh: NEXT_PUBLIC_API_URL=http://localhost:5000)

# Jalankan development server
npm run dev
```
Frontend akan berjalan di `http://localhost:3000`.

---
*Dibuat untuk memenuhi tugas kelompok / project web.*
