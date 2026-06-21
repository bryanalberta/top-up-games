"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Gem, ShieldCheck, Headset, Flame, Gamepad2, Timer, ChevronRight, Search, Smartphone, Monitor, Ticket } from 'lucide-react';

const LIVE_TRANSACTIONS = [
  { user: "Sultan*** dari Jakarta", item: "878 Diamonds", game: "Mobile Legends", time: "1 dtk lalu" },
  { user: "Sultan*** dari Surabaya", item: "720 Diamonds", game: "Free Fire", time: "3 dtk lalu" },
  { user: "Sultan*** dari Medan", item: "3564 CP", game: "Call of Duty Mobile", time: "5 dtk lalu" },
  { user: "Sultan*** dari Bandung", item: "1375 VP", game: "Valorant", time: "8 dtk lalu" },
  { user: "Sultan*** dari Makassar", item: "320 Minecoins", game: "Minecraft", time: "12 dtk lalu" },
  { user: "Sultan*** dari Palembang", item: "Steam Wallet IDR 120.000", game: "Steam Wallet Code", time: "15 dtk lalu" },
  { user: "Sultan*** dari Denpasar", item: "Weekly Diamond Pass", game: "Mobile Legends", time: "18 dtk lalu" },
  { user: "Sultan*** dari Semarang", item: "800 Robux", game: "Roblox", time: "22 dtk lalu" },
];

const LEADERBOARD_SULTANS = [
  { rank: 1, name: "@BryanSultan", total: 4750000, game: "Mobile Legends & Genshin", avatar: "B", badge: "🏆 SULTAN SUPREME" },
  { rank: 2, name: "@AlanEsports", total: 3200000, game: "Valorant Points", avatar: "A", badge: "🥈 ELITE SPENDER" },
  { rank: 3, name: "@DaniSultan", total: 2450000, game: "Free Fire & Roblox", avatar: "D", badge: "🥉 HIGH ROLLER" },
];

const VIP_TESTIMONIALS = [
  { name: "Sultan Jakarta 👑", rating: 5, quote: "Asli gila! Baru bayar 2 detik, diamond Mobile Legends langsung masuk ke ID. Harga Weekly Pass di sini paling murah dibanding lapak sebelah. Pelayanan VIP terbaik!", role: "VIP Customer" },
  { name: "Rian Pro Player 🎮", rating: 5, quote: "Top up Valorant Points di sini super aman dan terpercaya. Tidak perlu registrasi ribet, langsung masukin Riot ID, bayar via DANA, dan langsung war di Bind!", role: "Esports Athlete" },
  { name: "Sultan Surabaya 💎", rating: 5, quote: "Sudah langganan beli Genesis Crystals Genshin Impact bulanan di sini. Selalu dapet bonus, legal 100% aman anti-banned. Sultan Top Up is the best lah!", role: "VIP Customer" },
  { name: "Gamer Bandung 🔥", rating: 5, quote: "Beli Steam Wallet murah banget di sini buat borong game diskonan di Summer Sale kemarin. Pengiriman kilat via kode voucher. Rekomended parah!", role: "Gold Tier Member" },
];

const FAQ_ITEMS = [
  { q: "Apakah top up di Sultan Top Up legal dan aman?", a: "100% LEGAL DAN DIJAMIN AMAN. Kami hanya menggunakan jalur distribusi resmi penerbit game (seperti Moonton, Garena, Riot Games, dll.) dan Digiflazz. Seluruh transaksi bergaransi penuh anti-banned." },
  { q: "Berapa lama proses masuknya diamond ke akun game?", a: "PROSES INSTAN 1 DETIK. Melalui teknologi transaksi terintegrasi penuh, saldo atau item game Anda akan otomatis dikreditkan langsung ke ID game Anda dalam hitungan detik setelah pembayaran dikonfirmasi sistem." },
  { q: "Metode pembayaran apa saja yang didukung?", a: "Lengkap! Kami mendukung pembayaran QRIS (DANA, OVO, GoPay, LinkAja, ShopeePay), Transfer Bank Otomatis (BCA Virtual Account), serta Sandbox Simulator khusus untuk kemudahan simulasi pengujian Anda." },
  { q: "Bagaimana jika terjadi masalah pengiriman?", a: "Kami siap membantu 24 Jam Nonstop! Silakan klik tombol WhatsApp VIP melayang di pojok kanan bawah layar untuk menghubungi tim dukungan admin teknis kami secara langsung." }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 180, damping: 20 } }
};

// Safe GameCard Component with Fallback Image support
const GameCard = ({ game, isCompact }: { game: any; isCompact: boolean }) => {
  const [imgSrc, setImgSrc] = useState(game.imageUrl || "/images/roblox.png");

  useEffect(() => {
    setImgSrc(game.imageUrl || "/images/roblox.png");
  }, [game.imageUrl]);

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={`/game/${game.id}`} className="group cursor-pointer block h-full outline-none">
        <div className="relative rounded-[2rem] p-2 glass-premium h-full flex flex-col group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(197,168,128,0.2)] group-hover:border-brand-500/50 transition-all duration-500">
          {/* Glowing Aura on Hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-500/0 to-brand-500/10 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 pointer-events-none"></div>

          <div className={`relative w-full ${isCompact ? 'aspect-[4/5]' : 'aspect-[3/4]'} rounded-3xl overflow-hidden bg-black shadow-inner ring-1 ring-white/10`}>
            <Image
              src={imgSrc}
              alt={game.name || 'Game'}
              fill
              onError={() => setImgSrc("/images/roblox.png")}
              className="object-cover filter brightness-90 group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />

            {/* Deep Seamless Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030008] via-[#030008]/60 to-transparent z-10 pointer-events-none opacity-100 transition-opacity duration-300"></div>

            {/* Hot Badge */}
            {!isCompact && game.isPopular && (
              <div className="absolute top-3 right-3 bg-brand-500/20 backdrop-blur-xl border border-brand-500/50 text-white text-[9px] font-black px-3 py-1.5 rounded-full z-10 shadow-[0_0_15px_rgba(197,168,128,0.3)] uppercase tracking-[0.2em] animate-pulse">
                HOT 🔥
              </div>
            )}

            {/* Hover Action Button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm z-20">
              <span className="btn-primary py-3 px-8 text-sm transform translate-y-8 group-hover:translate-y-0 shadow-[0_10px_30px_rgba(197,168,128,0.4)]">
                Top Up
              </span>
            </div>

            {/* Title & Publisher */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left transform group-hover:-translate-y-2 transition-transform duration-500">
              <h3 className={`font-black italic ${isCompact ? 'text-sm sm:text-base' : 'text-lg sm:text-2xl'} text-white leading-none group-hover:text-brand-500 transition-colors drop-shadow-xl tracking-tighter`}>
                {game.name}
              </h3>
              {!isCompact && (
                <p className="text-[10px] text-brand-500/80 uppercase tracking-[0.3em] font-bold mt-2 drop-shadow-sm line-clamp-1">
                  {game.publisher}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function HomeClient({ games }: { games: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const getGameCategory = (gameName: string) => {
    if (!gameName) return "Mobile";
    const name = gameName.toLowerCase();
    if (name.includes("steam") || name.includes("voucher") || name.includes("google play") || name.includes("roblox")) {
      return "Voucher";
    }
    if (name.includes("valorant") || name.includes("point blank") || name.includes("pc") || name.includes("minecraft")) {
      return "PC";
    }
    return "Mobile";
  };

  const filteredGames = games ? games.filter((game: any) => {
    if (!game) return false;
    const gameName = game.name || '';
    const gamePublisher = game.publisher || '';
    
    const matchesSearch = gameName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          gamePublisher.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'Semua') return matchesSearch;
    
    const category = getGameCategory(gameName);
    return matchesSearch && category === selectedCategory;
  }) : [];

  const popularGames = filteredGames.filter((g: any) => g.isPopular);
  const allGames = filteredGames;

  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              hours = 4;
              minutes = 45;
              seconds = 12;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Live Transaction Ticker */}
      <div className="w-full bg-[#090714]/65 backdrop-blur-md border-y border-white/5 overflow-hidden py-3.5 z-30 relative">
        <div className="animate-marquee flex gap-12 items-center whitespace-nowrap">
          {[...LIVE_TRANSACTIONS, ...LIVE_TRANSACTIONS].map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_#c5a880]"></span>
              <span className="text-white font-bold">{item.user}</span>
              <span className="text-theme-muted">baru saja membeli</span>
              <span className="text-brand-400 font-black italic">{item.item}</span>
              <span className="text-theme-muted">({item.game})</span>
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">⚡ SUKSES {item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ultra Modern Bento Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-white/[0.03]">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-80">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px] mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-auto">

            {/* Main Hero Card (Span 8) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-8 group glass-premium p-8 sm:p-12 md:p-16 flex flex-col justify-center animate-float relative overflow-visible"
            >
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px] group-hover:bg-brand-500/20 transition-colors duration-700 animate-pulse-glow z-0"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-brand-500/20 text-brand-400 font-black mb-8 text-xs uppercase tracking-[0.2em] backdrop-blur-xl bg-brand-500/5 shadow-[0_0_20px_rgba(197,168,128,0.08)]">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_10px_#c5a880]"></span>
                  Protokol Transaksi Super Kilat
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-[7rem] font-black italic tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl font-display">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400">SULTAN</span>
                  <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-purple drop-shadow-[0_0_30px_rgba(197,168,128,0.2)]">TOP UP</span>
                </h1>

                <p className="max-w-2xl text-theme-muted mb-12 leading-relaxed font-medium tracking-wide text-sm md:text-lg border-l-4 border-brand-500/40 pl-6 py-2 bg-gradient-to-r from-white/5 to-transparent rounded-r-2xl">
                  Gerbang top up gaming kelas dunia di Indonesia. Nikmati teknologi transaksi tercanggih, instan tanpa registrasi, dan dijamin 100% aman untuk seluruh aset digital Anda.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <Link href="#games" className="btn-primary flex items-center gap-2 text-base px-10 py-5">
                    Mulai Top Up <Zap size={20} className="animate-pulse" />
                  </Link>
                  <Link href="/cara-kerja" className="btn-glass flex items-center gap-2 text-base px-10 py-5">
                    Cara Kerja
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Side Bento Metrics (Span 4) */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-8">

              {/* Metric 1 - E-Sports Theme */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="col-span-2 sm:col-span-1 lg:col-span-1 glass-premium p-8 flex flex-col justify-center group relative overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-500/10 rounded-full blur-[60px] group-hover:bg-brand-500/20 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <ShieldCheck size={56} className="text-brand-400 mb-6 drop-shadow-[0_0_20px_rgba(197,168,128,0.3)]" />
                  <div className="text-4xl lg:text-5xl font-black italic text-white mb-2 tracking-tighter drop-shadow-lg font-display">100% AMAN</div>
                  <div className="text-xs sm:text-sm text-brand-400 font-bold tracking-[0.2em] uppercase">Enkripsi Militer Lapis Baja</div>
                </div>
              </motion.div>

              {/* Metric 2 - Trust Theme */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="col-span-2 sm:col-span-1 lg:col-span-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-purple-900 to-purple-800 border border-white/10 p-8 flex flex-col justify-center shadow-[0_10px_40px_rgba(197,168,128,0.15)] hover:shadow-[0_20px_50px_rgba(197,168,128,0.3)] hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                  <Zap size={160} className="text-white filter blur-[2px]" />
                </div>
                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-3 mb-6 bg-black/50 backdrop-blur-xl w-max px-4 py-2 rounded-full border border-yellow-400/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-yellow-400">SISTEM ONLINE</span>
                  </div>
                  <div className="text-4xl lg:text-5xl font-black italic tracking-tighter mb-2 drop-shadow-xl text-white font-display">KILAT 1 DETIK</div>
                  <div className="text-sm font-bold text-white/90 tracking-wide">Pengiriman instan langsung ke akun.</div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Bento Style */}
      <section className="py-12 border-b border-white/[0.01] bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={28} />, title: 'Proses Instan', desc: 'Selesai dalam hitungan detik', color: 'text-brand-400', bg: 'bg-brand-500/5' },
              { icon: <Gem size={28} />, title: 'Harga Sultan', desc: 'Termurah di seluruh dimensi', color: 'text-accent-purple', bg: 'bg-purple-500/5' },
              { icon: <ShieldCheck size={28} />, title: '100% Legal', desc: 'Garansi mutlak anti banned', color: 'text-brand-400', bg: 'bg-brand-500/5' },
              { icon: <Headset size={28} />, title: 'Support 24/7', desc: 'Siap membantu kapanpun', color: 'text-yellow-400', bg: 'bg-yellow-500/5' }
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-premium rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left group"
              >
                <div className={`w-14 h-14 rounded-2xl ${badge.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner border border-white/5`}>
                  <div className={`${badge.color}`}>{badge.icon}</div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1 tracking-wide">{badge.title}</h3>
                  <p className="text-sm text-theme-muted font-medium">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo & Flash Sale Banner */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] glass-premium p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 group border-brand-500/20 shadow-[0_20px_60px_rgba(197,168,128,0.08)]"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-500/20 transition-colors duration-700 z-0"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2 group-hover:bg-accent-purple/20 transition-colors duration-700 z-0"></div>

          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left text-white max-w-2xl">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-6 py-2.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-[11px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md text-white shadow-[0_0_20px_rgba(197,168,128,0.1)]">
              <Timer size={16} className="animate-pulse text-brand-400" /> Penawaran Terbatas
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black italic mb-6 leading-none tracking-tighter font-display">
              FLASH SALE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-purple drop-shadow-[0_0_20px_rgba(197,168,128,0.3)]">DISKON 50%</span>
            </h2>
            <p className="text-white/80 font-medium md:text-lg leading-relaxed max-w-xl">
              Harga sultan termurah se-Indonesia. Jangan lewatkan kesempatan emas ini, event akan segera berakhir.
            </p>
            {/* Flash Sale Stock Progress Bar */}
            <div className="w-full mt-8 bg-white/5 border border-white/10 rounded-full h-5 overflow-hidden relative shadow-inner backdrop-blur-md max-w-lg">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-accent-purple rounded-full w-[87%] animate-pulse shadow-[0_0_15px_#c5a880] transition-all duration-1000"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black uppercase text-white tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10">
                ⚡ 87% KUOTA SULTAN TERKLAIM
              </div>
            </div>
          </div>

          {/* Right Action */}
          <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center justify-center gap-4 bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-3xl shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] w-full font-mono">
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[11px] font-bold text-brand-400 uppercase tracking-widest mt-2 font-sans">Jam</span>
              </div>
              <span className="text-3xl font-black text-white/30 animate-pulse -mt-6">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[11px] font-bold text-brand-400 uppercase tracking-widest mt-2 font-sans">Mnt</span>
              </div>
              <span className="text-3xl font-black text-white/30 animate-pulse -mt-6">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-brand-400 drop-shadow-[0_0_15px_rgba(197,168,128,0.5)]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[11px] font-bold text-brand-400 uppercase tracking-widest mt-2 font-sans">Dtk</span>
              </div>
            </div>

            <Link href="#games" className="btn-primary w-full flex items-center justify-center gap-3 text-base py-5 group/btn">
              BORONG SEKARANG
              <ChevronRight size={22} className="group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Leaderboard Sultan Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-brand-500/20 text-brand-400 font-black mb-4 text-[10px] uppercase tracking-[0.3em] bg-brand-500/5 shadow-[0_0_15px_rgba(197,168,128,0.1)]">
            🏆 Dewan Kehormatan Sultan
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic text-white tracking-tighter uppercase font-display drop-shadow-xl">
            Sultan <span className="text-brand-400">Top Spender</span> Pekan Ini
          </h2>
          <p className="text-theme-muted font-medium text-sm md:text-base mt-2 max-w-xl mx-auto">
            Apresiasi khusus bagi para gamers elit dengan volume transaksi tertinggi minggu ini. Jadilah nomor satu!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Rank 1 Highlight Card (Span 6) */}
          {LEADERBOARD_SULTANS.slice(0, 1).map((sultan) => (
            <motion.div
              key={sultan.rank}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 border border-brand-500/40 bg-gradient-to-br from-brand-950/20 via-[#0a0715]/75 to-purple-950/15 group shadow-[0_20px_50px_rgba(197,168,128,0.15)]"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:bg-brand-500/20 transition-colors duration-700"></div>
              <div className="absolute -left-10 -bottom-10 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[60px]"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    {/* Glowing Avatar */}
                    <div className="w-24 h-24 rounded-[2rem] bg-brand-500/20 border border-brand-400 flex items-center justify-center text-brand-400 font-black text-4xl shadow-[0_0_30px_rgba(197,168,128,0.35)] relative overflow-hidden group-hover:rotate-3 transition-transform duration-500">
                      {sultan.avatar}
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/0 via-brand-500/10 to-brand-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    {/* Crown Icon */}
                    <div className="absolute -top-4 -right-2 bg-gradient-to-br from-yellow-400 to-amber-500 text-black p-1.5 rounded-xl shadow-[0_4px_12px_rgba(251,191,36,0.5)] border border-yellow-300">
                      👑
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-black bg-brand-500/20 text-brand-400 px-3.5 py-1.5 rounded-full border border-brand-500/30 uppercase tracking-widest">{sultan.badge}</span>
                    <h3 className="text-3xl font-black italic text-white mt-3.5 tracking-tight font-display">{sultan.name}</h3>
                    <p className="text-xs text-theme-muted mt-1 font-medium">Favorit: {sultan.game}</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xs font-black uppercase text-brand-400 tracking-widest">Total Belanja</div>
                  <div className="text-3xl font-black text-white italic mt-1 font-display tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(sultan.total)}
                  </div>
                </div>
              </div>

              {/* Progress Line */}
              <div className="w-full mt-10 bg-white/5 border border-white/10 rounded-full h-4 overflow-hidden relative shadow-inner">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-amber-400 rounded-full w-[95%] shadow-[0_0_15px_#c5a880]"></div>
              </div>
            </motion.div>
          ))}

          {/* Ranks 2 & 3 Grid (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            {LEADERBOARD_SULTANS.slice(1).map((sultan, index) => (
              <motion.div
                key={sultan.rank}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 relative overflow-hidden group hover:border-brand-500/40"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl border relative shadow-md ${sultan.rank === 2 ? 'bg-slate-500/20 text-slate-300 border-slate-500/35 shadow-slate-500/10' : 'bg-amber-800/20 text-amber-500 border-amber-800/35 shadow-amber-800/10'}`}>
                      {sultan.avatar}
                      <span className="absolute -top-2.5 -right-2 text-sm">{sultan.rank === 2 ? '🥈' : '🥉'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black bg-white/5 text-theme-muted px-2.5 py-1 rounded-lg border border-white/5 uppercase tracking-wider">{sultan.badge}</span>
                      <h4 className="text-xl font-black italic text-white mt-1.5 font-display tracking-tight">{sultan.name}</h4>
                      <p className="text-[10px] text-theme-muted font-medium mt-0.5">Favorit: {sultan.game}</p>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-[10px] font-black uppercase text-theme-muted tracking-wider">Total Belanja</div>
                    <div className="text-xl font-black text-white italic mt-0.5 font-display tracking-tight">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(sultan.total)}
                    </div>
                    {/* Smaller Progress Line */}
                    <div className="w-32 mt-2 bg-white/5 border border-white/10 rounded-full h-2 overflow-hidden relative shadow-inner hidden sm:block">
                      <div className={`absolute inset-y-0 left-0 rounded-full ${sultan.rank === 2 ? 'bg-slate-400 w-[78%]' : 'bg-amber-600 w-[60%]'}`}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game List Section */}
      <section id="games" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-500/20 text-brand-400 font-black mb-4 text-[11px] uppercase tracking-[0.3em] bg-brand-500/5 shadow-[0_0_15px_rgba(197,168,128,0.1)]">
                <Flame size={16} className="animate-pulse" /> Katalog Game Premium
              </div>
              <h2 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase drop-shadow-lg font-display">
                Katalog <span className="text-neon">Sultan</span>
              </h2>
            </motion.div>

            {/* Search Bar Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-96 relative group/search"
            >
              <input
                type="text"
                placeholder="Cari game sultan favoritmu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.01] border border-white/10 backdrop-blur-xl rounded-2xl pl-12 pr-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 hover:border-white/20 transition-all font-sans text-sm shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted group-hover/search:text-brand-500 transition-colors" size={18} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-brand-400 hover:text-white"
                >
                  BATAL
                </button>
              )}
            </motion.div>
          </div>

          {/* Category Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center md:justify-start font-display"
          >
            {[
              { id: 'Semua', label: 'Semua Game', icon: <Gamepad2 size={16} /> },
              { id: 'Mobile', label: 'Game Mobile', icon: <Smartphone size={16} /> },
              { id: 'PC', label: 'Game PC', icon: <Monitor size={16} /> },
              { id: 'Voucher', label: 'Voucher', icon: <Ticket size={16} /> }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 border ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-brand-500/20 to-purple-500/20 border-brand-400 text-white shadow-[0_0_20px_rgba(197,168,128,0.15)] ring-1 ring-brand-400'
                    : 'bg-white/[0.01] border-white/10 text-theme-muted hover:text-white hover:border-brand-500/40 hover:bg-white/[0.03]'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Catalog Filtered Render */}
        {!games || games.length === 0 ? (
          <div className="text-center py-16 md:py-20 glass-premium rounded-[2.5rem] border-brand-500/20 max-w-2xl mx-auto p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            <Gamepad2 className="mx-auto text-red-400 mb-6 animate-pulse" size={56} />
            <h3 className="text-white font-black text-2xl mb-4 font-display">Katalog Gagal Dimuat</h3>
            <p className="text-theme-muted font-medium text-sm leading-relaxed mb-6 px-4">
              Sistem tidak dapat terhubung ke API Server. Pastikan environment variable <code className="text-brand-300 font-mono bg-white/5 px-2 py-1 rounded">NEXT_PUBLIC_API_URL</code> pada Vercel Dashboard Frontend Anda telah diarahkan ke backend URL yang benar dan telah dilakukan redeployment.
            </p>
            <div className="bg-black/50 border border-white/5 rounded-2xl p-4 text-left font-mono text-xs space-y-2 text-white/80 max-w-md mx-auto">
              <div className="truncate"><span className="text-brand-400">Target Fetch:</span> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}</div>
              <div><span className="text-brand-400">Koneksi Server:</span> PENDING / TIMEOUT</div>
            </div>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-20 glass-premium rounded-[2.5rem] border-dashed border-2 border-white/10 max-w-2xl mx-auto">
            <Gamepad2 className="mx-auto text-theme-muted mb-4 animate-bounce" size={48} />
            <p className="text-white font-bold text-xl mb-2 font-display">Game Tidak Ditemukan</p>
            <p className="text-theme-muted font-medium text-sm px-6">Maaf, game &quot;{searchQuery}&quot; tidak masuk dalam sensor radar kami. Silakan coba kata kunci lain.</p>
          </div>
        ) : selectedCategory === 'Semua' ? (
          <>
            {popularGames.length > 0 && (
              <div className="mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h3 className="text-xs uppercase tracking-[0.25em] font-black text-brand-400 mb-2">🔥 Trending Sekarang</h3>
                  <h2 className="text-3xl font-black italic text-white tracking-tighter uppercase font-display">Katalog Terpopuler</h2>
                </motion.div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
                >
                  {popularGames.map((game: any) => (
                    <GameCard key={game.id} game={game} isCompact={false} />
                  ))}
                </motion.div>
              </div>
            )}

            {allGames.length > 0 && (
              <div className="mb-12 mt-24">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-10"
                >
                  <h2 className="text-3xl font-black italic tracking-tighter mb-3 flex items-center gap-3 text-white font-display">
                    <Gamepad2 className="text-brand-400" size={32} /> SEMUA GAME
                  </h2>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-brand-500 to-accent-purple rounded-full shadow-[0_0_10px_rgba(197,168,128,0.3)]"></div>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
                >
                  {allGames.map((game: any) => (
                    <GameCard key={game.id} game={game} isCompact={true} />
                  ))}
                </motion.div>
              </div>
            )}
          </>
        ) : (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-black italic tracking-tighter mb-3 flex items-center gap-3 text-white font-display">
                <Gamepad2 className="text-brand-400" size={32} /> KATALOG {selectedCategory.toUpperCase()}
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-brand-500 to-accent-purple rounded-full shadow-[0_0_10px_rgba(197,168,128,0.3)]"></div>
            </motion.div>

            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
            >
              {filteredGames.map((game: any) => (
                <GameCard key={game.id} game={game} isCompact={false} />
              ))}
            </motion.div>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/[0.005] border-y border-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-brand-500/20 text-brand-400 font-black mb-4 text-[10px] uppercase tracking-[0.3em] bg-brand-500/5 shadow-[0_0_15px_rgba(197,168,128,0.1)]">
              ⭐ Testimoni Pelanggan VIP
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic text-white tracking-tighter uppercase font-display drop-shadow-xl">
              Kata <span className="text-brand-400">Para Sultan</span> Kami
            </h2>
            <p className="text-theme-muted font-medium text-sm md:text-base mt-2 max-w-xl mx-auto">
              Lebih dari 50,000+ transaksi sukses diproses setiap hari dengan kepuasan pelanggan bintang lima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIP_TESTIMONIALS.map((testi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-premium p-8 relative overflow-hidden group hover:border-brand-500/40 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(197,168,128,0.1)] flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700 font-serif text-[120px] leading-none text-white font-bold select-none pointer-events-none">
                  “
                </div>
                <div className="relative z-10">
                  {/* Gold Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testi.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">★</span>
                    ))}
                  </div>
                  <p className="text-white/80 font-medium text-sm leading-relaxed mb-8 italic">
                    &quot;{testi.quote}&quot;
                  </p>
                </div>
                <div className="relative z-10 border-t border-white/5 pt-4">
                  <h4 className="font-bold text-white text-base tracking-wide">{testi.name}</h4>
                  <p className="text-xs text-brand-400 font-bold uppercase tracking-wider mt-1">{testi.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-brand-500/20 text-brand-400 font-black mb-4 text-[10px] uppercase tracking-[0.3em] bg-brand-500/5 shadow-[0_0_15px_rgba(197,168,128,0.1)]">
            💬 Pusat Informasi & Bantuan
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic text-white tracking-tighter uppercase font-display drop-shadow-xl">
            Pertanyaan <span className="text-brand-400">Populer FAQ</span>
          </h2>
          <p className="text-theme-muted font-medium text-sm md:text-base mt-2 max-w-xl mx-auto">
            Segala jawaban yang Anda butuhkan mengenai protokol keamanan, kecepatan transfer, dan metode pembayaran kami.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = expandedFaqIndex === idx;
            return (
              <div 
                key={idx}
                className={`glass-premium overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand-500/40 ring-1 ring-brand-500/20 bg-white/[0.04]' : 'hover:border-white/10'}`}
              >
                <button
                  onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-4 cursor-pointer outline-none select-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide">{faq.q}</span>
                  <span className={`text-brand-400 font-bold transition-transform duration-300 text-xl ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    ＋
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-sm text-theme-muted leading-relaxed font-medium border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
