"use client";

import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Gem, ShieldCheck, Headset, Flame, Gamepad2, Timer, ChevronRight } from 'lucide-react';

export default function HomeClient({ games }: { games: any[] }) {
  const popularGames = games.filter((g: any) => g.isPopular);
  const allGames = games;

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


  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen">
      {/* Ultra Modern Bento Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-20 bg-dark-bg border-b border-dark-border">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-60">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px] mix-blend-screen"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">

            {/* Main Hero Card (Span 8) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 group glass-card p-6 sm:p-10 md:p-14 flex flex-col justify-center animate-float relative"
            >
              <div className="glow-effect"></div>
              
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] group-hover:bg-brand-500/40 transition-colors animate-pulse-glow"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-400/30 text-brand-300 font-medium mb-10 text-xs uppercase tracking-[0.2em] backdrop-blur-md bg-white/[0.02]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
                  Layanan Transaksi Instan
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-[7rem] font-black italic tracking-widest mb-4 leading-none drop-shadow-2xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">SULTAN</span>
                  <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">TOP UP</span>
                </h1>

                <p className="max-w-xl text-theme-muted/80 mb-12 leading-relaxed font-medium tracking-wide text-sm md:text-lg border-l-2 border-brand-500/50 pl-4 py-2">
                  Portal layanan top up game tepercaya di Indonesia. Nikmati kemudahan transaksi yang aman, instan tanpa pendaftaran, dan terjamin untuk seluruh kebutuhan hiburan digital Anda.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href="#games" className="btn-primary flex items-center gap-2">
                    Mulai Top Up <Zap size={18} className="animate-pulse" />
                  </Link>
                  <Link href="/cara-kerja" className="btn-glass flex items-center gap-2">
                    Cara Kerja
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Side Bento Metrics (Span 4) */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">

              {/* Metric 1 - E-Sports Theme */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-2 sm:col-span-1 lg:col-span-1 glass-card p-8 flex flex-col justify-center group"
              >
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent-purple/20 rounded-full blur-[50px] group-hover:bg-accent-purple/30 transition-colors animate-pulse-glow"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cyber-grid.png')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="relative z-10">
                  <ShieldCheck size={48} className="text-cyan-400 mb-5 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                  <div className="text-3xl lg:text-4xl font-black italic text-white mb-2 tracking-tight drop-shadow-md">100% AMAN</div>
                  <div className="text-xs sm:text-sm text-cyan-400/80 font-bold tracking-widest uppercase">Transaksi Enkripsi Lapis Baja</div>
                </div>
              </motion.div>

              {/* Metric 2 - Trust Theme */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="col-span-2 sm:col-span-1 lg:col-span-1 relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-600 via-purple-700 to-pink-700 border border-brand-400/50 p-8 flex flex-col justify-center shadow-[0_10px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.5)] hover:-translate-y-1 transition-all group"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.1] mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700">
                  <Zap size={140} className="text-white filter blur-[1px]" />
                </div>
                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-2 mb-4 bg-black/40 w-max px-3 py-1.5 rounded-sm border-l-2 border-green-400 backdrop-blur-md">
                    <span className="w-2 h-2 bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.9)]"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">SISTEM ONLINE</span>
                  </div>
                  <div className="text-3xl font-black italic tracking-wider mb-2 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-200">KILAT 1 DETIK</div>
                  <div className="text-sm font-bold text-white/80">Pengiriman instant langsung masuk.</div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Bento Style */}
      <section className="bg-dark-bg py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Zap size={24} />, title: 'Proses Instan', desc: 'Selesai dalam detik', color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/50' },
              { icon: <Gem size={24} />, title: 'Harga Sultan', desc: 'Termurah se-Cyber', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'hover:border-cyan-400/50' },
              { icon: <ShieldCheck size={24} />, title: '100% Legal', desc: 'Garansi anti banned', color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'hover:border-brand-400/50' },
              { icon: <Headset size={24} />, title: 'Support 24/7', desc: 'Siap bantu kapanpun', color: 'text-green-400', bg: 'bg-green-500/10', border: 'hover:border-green-400/50' }
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card rounded-2xl p-5 border border-dark-border transition-colors ${badge.border} flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left`}
              >
                <div className={`w-12 h-12 rounded-xl ${badge.bg} flex items-center justify-center flex-shrink-0`}>
                  <div className={`${badge.color}`}>{badge.icon}</div>
                </div>
                <div>
                  <h3 className="font-bold text-theme-text text-sm sm:text-base mb-1">{badge.title}</h3>
                  <p className="text-xs text-theme-muted font-medium">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo & Flash Sale Banner */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-dark-card/60 backdrop-blur-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group border border-brand-400/20"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left text-white max-w-xl">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-5 py-2 rounded-full bg-brand-500/10 border border-brand-400/30 text-[10px] font-medium uppercase tracking-[0.2em] mb-6 backdrop-blur-md text-brand-300">
              <Timer size={14} className="animate-pulse" /> Penawaran Khusus
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight tracking-tight">
              Event Flash Sale <br /><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">Diskon Hingga 50%</span>
            </h2>
            <p className="text-white/90 font-medium md:text-lg leading-relaxed">
              Dapatkan harga terbaik selama periode Flash Sale berlangsung. Transaksi dijamin 100% legal dan diproses secara otomatis oleh sistem kami.
            </p>
          </div>

          {/* Right Action */}
          <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center justify-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] w-full">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-white">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">Jam</span>
              </div>
              <span className="text-2xl font-black text-white/30 animate-pulse -mt-4">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-white">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">Mnt</span>
              </div>
              <span className="text-2xl font-black text-white/30 animate-pulse -mt-4">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-bold text-yellow-300/50 uppercase tracking-widest mt-1">Dtk</span>
              </div>
            </div>

            <Link href="#games" className="btn-primary w-full flex items-center justify-center gap-2 group/btn">
              LIHAT KATALOG
              <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Game List Section */}
      <section id="games" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center md:items-start"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-400/20 text-brand-400 font-medium mb-4 text-[10px] uppercase tracking-[0.3em] bg-brand-500/5">
            <Flame size={14} /> Kategori Terpopuler
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-wide uppercase">
            Katalog <span className="font-medium text-brand-300">Produk</span>
          </h2>
        </motion.div>

        {popularGames.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl border-dashed border-2 border-dark-border">
            <p className="text-theme-muted font-medium">Belum ada game populer saat ini.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mb-16"
          >
            {popularGames.map((game: any) => (
              <motion.div variants={itemVariants} key={game.id} className="h-full">
                <Link href={`/game/${game.id}`} className="group cursor-pointer block h-full outline-none">
                  <div className="relative rounded-3xl p-1.5 sm:p-2 glass-card h-full flex flex-col group-hover:-translate-y-2">
                    <div className="glow-effect"></div>

                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-dark-bg/50 shadow-inner ring-1 ring-white/5">
                      <Image
                        src={game.imageUrl}
                        alt={game.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      />

                      {/* Seamless Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent z-10 pointer-events-none opacity-90 transition-opacity duration-300"></div>

                      {/* Hot Badge */}
                      {game.isPopular && (
                        <div className="absolute top-2 right-2 bg-brand-500/10 backdrop-blur-md border border-brand-400/30 text-brand-300 text-[8px] font-medium px-2 py-1 rounded-sm z-10 shadow-[0_4px_10px_rgba(0,0,0,0.5)] uppercase tracking-[0.2em]">
                          HOT
                        </div>
                      )}

                      {/* Hover Action Overlay */}
                      <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[4px] z-20">
                        <span className="btn-primary py-2.5 px-6 text-sm transform translate-y-6 group-hover:translate-y-0 shadow-[0_10px_30px_rgba(14,165,233,0.5)]">
                          Top Up Kilat
                        </span>
                      </div>

                      {/* Title & Publisher */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-left">
                        <h3 className="font-black text-base sm:text-xl text-white leading-tight group-hover:text-brand-300 transition-colors drop-shadow-md tracking-tight">
                          {game.name}
                        </h3>
                        <p className="text-[10px] text-brand-400 uppercase tracking-widest font-bold mt-1.5 opacity-90 drop-shadow-sm line-clamp-1">
                          {game.publisher}
                        </p>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {allGames.length > 0 && (
          <div className="mb-12 mt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-theme-text">
                <Gamepad2 className="text-accent-purple" size={28} /> Semua Game
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-brand-600 to-brand-400 rounded-full mb-8"></div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
            >
              {allGames.map((game: any) => (
                <motion.div variants={itemVariants} key={game.id} className="h-full">
                  <Link href={`/game/${game.id}`} className="group cursor-pointer block h-full">
                    {/* Glassmorphism Card Wrapper */}
                    <div className="relative rounded-3xl p-1.5 sm:p-2 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(14,165,233,0.2)] group-hover:border-brand-500/40 group-hover:bg-brand-500/5 h-full flex flex-col opacity-90 group-hover:opacity-100">

                      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-dark-bg shadow-inner">
                        <Image
                          src={game.imageUrl}
                          alt={game.name}
                          fill
                          className="object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/50 to-transparent z-10 pointer-events-none"></div>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-dark-bg/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
                          <span className="bg-dark-card border border-brand-500/50 text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-500">
                            Top Up
                          </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 flex flex-col justify-end text-left">
                          <h3 className="font-bold text-sm sm:text-base text-theme-muted line-clamp-2 leading-tight group-hover:text-brand-300 transition-colors drop-shadow-md">
                            {game.name}
                          </h3>
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}
