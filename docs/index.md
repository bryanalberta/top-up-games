# 🎮 Dokumentasi Penggunaan Sultan Top Up

Selamat datang di dokumentasi resmi **Sultan Top Up - Portal Layanan Game Premium VIP**. Dokumen ini dibuat untuk membantu pengguna dan administrator memahami serta menggunakan fitur-fitur yang tersedia dalam aplikasi.

---

## 1. Gambaran Umum Sistem

### Nama Sistem
**Sultan Top Up**

### Tujuan dan Manfaat Sistem
Sultan Top Up adalah platform layanan transaksi instan kelas dunia untuk top up berbagai macam game populer. Sistem ini didesain untuk memberikan pengalaman transaksi yang cepat, aman, dan berkelas bagi para gamer dengan antarmuka modern bertema **Royal Obsidian Velvet & Satin Gold**. 
* **Bagi Pengguna:** Memudahkan pembelian item game secara cepat tanpa registrasi rumit dan dengan metode pembayaran variatif (otomatis & manual).
* **Bagi Administrator:** Menyediakan dashboard pengelolaan transaksi yang praktis, aman, serta memiliki fitur verifikasi pembayaran manual.

### Target Pengguna
1. **Gamer / Pembeli umum:** Pengguna yang ingin melakukan top up diamond/voucher game dengan cepat dan praktis.
2. **Administrator:** Tim pengelola backend website yang bertugas memantau transaksi, mengelola katalog game, serta menyetujui/menolak transaksi manual.

### Fitur-Fitur Utama
* **⚡ Transaksi Instan 1 Detik:** Pengiriman item game kilat langsung terintegrasi dengan Digiflazz API.
* **👑 Tema Premium Royal Obsidian & Satin Gold:** Visual berkelas tinggi menggunakan paduan warna obsidian gelap (`#030008`) dan aksen satin gold (`#c5a880`).
* **⚡ Live Transaction Ticker (FOMO):** Baris text berjalan berisi aktivitas transaksi terbaru yang otomatis berhenti saat diarahkan kursor (hover).
* **🏆 Dewan Kehormatan Sultan (Leaderboard):** Visualisasi tiga besar pembeli mingguan teratas untuk memicu persaingan kompetitif.
* **⭐ Karosel Testimonial VIP:** Slider ulasan pelanggan bintang emas dengan efek interaktif hover-lift.
* **💬 FAQ Accordion Premium:** Seksi tanya-jawab interaktif menggunakan transisi tinggi dinamis (dynamic height).
* **💬 Tombol WhatsApp VIP Melayang:** Tombol bantuan support 24/7 dengan efek denyut cahaya ganda.
* **🛡️ Self-Healing Admin Registration:** Sistem aman yang secara mandiri menyajikan formulir inisialisasi akun Admin utama pada kunjungan pertama ke `/admin/login` jika database kosong.

---

## 2. Panduan Fitur Secara Sequential (Alur Sistem)

Alur transaksi dan operasional pada sistem Sultan Top Up dibagi menjadi dua peran utama: **Alur Pengguna (User Flow)** dan **Alur Administrator (Admin Flow)**.

```
+---------------------------------------------------------------------------------+
|                                 USER FLOW                                       |
|                                                                                 |
|  [Halaman Utama] ---> [Pilih Game] ---> [Isi Form Checkout] ---> [Bayar]        |
|                                                                     |           |
|                                     +-------------------------------+           |
|                                     |                                           |
|                                     v                                           |
|                           [Metode Pembayaran]                                   |
|                             /             \                                     |
|                            /               \                                    |
|              (Sandbox Simulator)       (Transfer Manual)                        |
|                     |                              |                            |
|                     v                              v                            |
|              [Simulasi Bayar]             [Halaman Sukses &                     |
|              (Sukses / Gagal)              WhatsApp Admin]                      |
|                     |                              |                            |
|                     v                              v                            |
|              [Kirim Otomatis]             [Tunggu Verifikasi                    |
|                                                  Admin]                         |
+---------------------------------------------------------------------------------+
|                                 ADMIN FLOW                                      |
|                                                                                 |
|  [Self-Healing Setup] -> [Login Admin] -> [Dashboard Admin] -> [Aksi Verifikasi]|
|                                                                     |           |
|                                     +-------------------------------+           |
|                                     |                                           |
|                                     v                                           |
|                               [Setujui / Tolak]                                 |
|                               /               \                                 |
|                              v                 v                                |
|                        [Status: SUKSES]  [Status: BATAL]                        |
|                        (Kirim Diamond)                                          |
+---------------------------------------------------------------------------------+
```

### A. Alur Pengguna (User Flow)

#### 1. Mengakses Halaman Utama
Saat pertama kali membuka website, pengguna akan disajikan halaman utama dengan visual bertema gelap premium. Di sini pengguna dapat melihat:
* Katalog game populer yang tersedia.
* Running text transaksi sukses (Live Transaction Ticker).
* Leaderboard belanja mingguan (Dewan Kehormatan Sultan).

#### 2. Memilih Game
Pengguna mengklik salah satu kartu game pada katalog (misalnya *Mobile Legends* atau *Free Fire*) untuk masuk ke halaman detail transaksi game tersebut.

#### 3. Mengisi Detail Form Checkout
Pada halaman transaksi game, pengguna diwajibkan mengisi formulir:
* **Langkah 1:** Memasukkan data akun game (seperti User ID & Zone ID).
* **Langkah 2:** Memilih denominasi top up (misalnya: 86 Diamonds, 172 Diamonds).
* **Langkah 3:** Memilih metode pembayaran yang tersedia:
  * **Sandbox Gateway (Simulasi):** Untuk simulasi transaksi instan otomatis.
  * **BCA Transfer / DANA / GoPay (Manual):** Untuk transfer manual ke rekening bank/e-wallet admin.

#### 4. Melakukan Checkout dan Pembayaran
Setelah menekan tombol "Beli Sekarang", sistem akan memproses pesanan:
* **Jika memilih Sandbox Gateway (Simulasi):**
  Pengguna akan dialihkan ke halaman **Sandbox Simulator** `/sandbox/pay/[orderId]`. Di sini pengguna dapat menekan tombol **"Simulasikan Pembayaran Sukses"** atau **"Simulasikan Pembayaran Gagal"**. Jika sukses, backend akan otomatis memperbarui status menjadi `SUCCESS` dan mengirim item game.
* **Jika memilih Transfer Manual (BCA/DANA/GoPay):**
  Pengguna akan langsung dialihkan ke halaman `/success` dengan status transaksi masih `PENDING`. Halaman ini akan menampilkan informasi nominal transfer presisi hingga 3 angka unik terakhir, nomor rekening/e-wallet tujuan, serta tombol **"Hubungi Admin via WhatsApp"** yang menyusun template chat bukti transfer secara otomatis.

#### 5. Melacak Transaksi
Pengguna dapat memantau status transaksinya melalui halaman `/lacak` dengan memasukkan Order ID mereka. Halaman ini akan menampilkan status terbaru (PENDING, SUCCESS, atau FAILED).

---

### B. Alur Administrator (Admin Flow)

#### 1. Inisialisasi Akun Admin (Self-Healing)
Saat sistem baru di-deploy dan database kosong, admin yang mengakses `/admin/login` akan langsung dialihkan ke form registrasi admin pertama. Fitur ini menjamin sistem tidak akan terkunci dan dapat memulihkan diri secara mandiri jika database ter-reset.

#### 2. Login Administrator
Admin masuk menggunakan username dan password yang terdaftar untuk mendapatkan token otorisasi JWT yang disimpan dengan aman di sisi klien.

#### 3. Memantau Dashboard Admin
Setelah login berhasil, admin akan diarahkan ke halaman dashboard `/admin`. Di halaman ini admin dapat memantau seluruh riwayat transaksi yang masuk beserta grafik penjualannya.

#### 4. Memverifikasi Transaksi Manual
* Ketika ada pengguna yang mentransfer secara manual dan mengirim bukti transfer via WhatsApp, admin akan mencocokkan mutasi rekening.
* Admin mencari transaksi dengan status `PENDING` tersebut pada tabel transaksi dashboard.
* Di kolom **Aksi**, admin dapat memilih:
  * **Setujui (Approve):** Mengubah status transaksi menjadi sukses dan memicu proses pengiriman diamond ke pengguna.
  * **Tolak (Reject):** Membatalkan transaksi dan mengubah statusnya menjadi failed.

---

## 3. Penutup & Tim Pengembang

Proyek Sultan Top Up dikembangkan secara kolaboratif oleh Kelompok Pemrograman Web berikut:

1. **Bryan Alberta Hildan Pradana** (NIM: 223140148)
   * *Role:* Project Manager & Full-Stack Developer
   * *Jobdesc:* Memimpin jalannya proyek, mengintegrasikan sistem Frontend Next.js dan Backend Node.js.
2. **Ahmad Nurhidayat Maulana** (NIM: 223140129)
   * *Role:* Frontend Developer (UI/UX)
   * *Jobdesc:* Merancang antarmuka pengguna dengan Tailwind CSS, membuat animasi Framer Motion, dan memastikan responsivitas.
3. **Allen Virgustiyan Prakoso** (NIM: 223140136)
   * *Role:* Backend Developer (API & Database)
   * *Jobdesc:* Membangun REST API menggunakan Express.js dan mengelola database SQLite menggunakan Prisma ORM.
4. **Iswara Pranidana Kartika Putra** (NIM: 223140107)
   * *Role:* Backend Developer (Payment & Security)
   * *Jobdesc:* Mengimplementasikan payment gateway Midtrans sandbox, mengelola keamanan JWT, dan enkripsi.
5. **Abdul Muntolib Fajarkhan** (NIM: 223140120)
   * *Role:* Frontend Developer (Integration)
   * *Jobdesc:* Menghubungkan antarmuka UI Frontend dengan API Backend, serta menangani state management.
6. **Dani Ahmad Kafabih** (NIM: 223140145)
   * *Role:* Quality Assurance & System Analyst
   * *Jobdesc:* Melakukan pengujian sistem (QA), menyusun dokumentasi proyek, dan melakukan deployment.
