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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
  };

  return (
    <div className="min-h-screen">
      {/* Ultra Modern Bento Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-white/[0.05]">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-80">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[150px] mix-blend-screen"></div>
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
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-500/20 rounded-full blur-[100px] group-hover:bg-brand-500/30 transition-colors duration-700 animate-pulse-glow z-0"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-brand-500/30 text-brand-500 font-bold mb-8 text-xs uppercase tracking-[0.2em] backdrop-blur-xl bg-brand-500/5 shadow-[0_0_20px_rgba(0,242,254,0.1)]">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_10px_#00f2fe]"></span>
                  Protokol Transaksi Super Kilat
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-[7.5rem] font-black italic tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">SULTAN</span>
                  <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-purple drop-shadow-[0_0_30px_rgba(255,0,127,0.4)]">TOP UP</span>
                </h1>

                <p className="max-w-2xl text-theme-muted mb-12 leading-relaxed font-medium tracking-wide text-sm md:text-lg border-l-4 border-brand-500/50 pl-6 py-2 bg-gradient-to-r from-white/5 to-transparent rounded-r-2xl">
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
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-500/20 rounded-full blur-[60px] group-hover:bg-brand-500/40 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <ShieldCheck size={56} className="text-brand-500 mb-6 drop-shadow-[0_0_20px_rgba(0,242,254,0.6)]" />
                  <div className="text-4xl lg:text-5xl font-black italic text-white mb-2 tracking-tighter drop-shadow-lg">100% AMAN</div>
                  <div className="text-xs sm:text-sm text-brand-500 font-bold tracking-[0.2em] uppercase">Enkripsi Militer Lapis Baja</div>
                </div>
              </motion.div>

              {/* Metric 2 - Trust Theme */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="col-span-2 sm:col-span-1 lg:col-span-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-purple-700 to-accent-purple border border-white/20 p-8 flex flex-col justify-center shadow-[0_10px_40px_rgba(255,0,127,0.3)] hover:shadow-[0_20px_50px_rgba(255,0,127,0.5)] hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700">
                  <Zap size={160} className="text-white filter blur-[2px]" />
                </div>
                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-3 mb-6 bg-black/50 backdrop-blur-xl w-max px-4 py-2 rounded-full border border-green-400/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.9)]"></span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-green-400">SISTEM ONLINE</span>
                  </div>
                  <div className="text-4xl lg:text-5xl font-black italic tracking-tighter mb-2 drop-shadow-xl text-white">KILAT 1 DETIK</div>
                  <div className="text-sm font-bold text-white/90 tracking-wide">Pengiriman instan langsung ke akun.</div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Bento Style */}
      <section className="py-12 border-b border-white/[0.02] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={28} />, title: 'Proses Instan', desc: 'Selesai dalam hitungan detik', color: 'text-brand-500', bg: 'bg-brand-500/10' },
              { icon: <Gem size={28} />, title: 'Harga Sultan', desc: 'Termurah di seluruh dimensi', color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
              { icon: <ShieldCheck size={28} />, title: '100% Legal', desc: 'Garansi mutlak anti banned', color: 'text-brand-500', bg: 'bg-brand-500/10' },
              { icon: <Headset size={28} />, title: 'Support 24/7', desc: 'Siap membantu kapanpun', color: 'text-green-400', bg: 'bg-green-500/10' }
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
          className="relative overflow-hidden rounded-[3rem] glass-premium p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 group border-brand-500/30 shadow-[0_20px_60px_rgba(0,242,254,0.15)]"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-500/30 transition-colors duration-700 z-0"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2 group-hover:bg-accent-purple/30 transition-colors duration-700 z-0"></div>

          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left text-white max-w-2xl">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-6 py-2.5 rounded-full bg-brand-500/20 border border-brand-500/50 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md text-white shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <Timer size={16} className="animate-pulse text-brand-500" /> Penawaran Terbatas
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black italic mb-6 leading-none tracking-tighter">
              FLASH SALE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-purple drop-shadow-[0_0_20px_rgba(255,0,127,0.4)]">DISKON 50%</span>
            </h2>
            <p className="text-white/80 font-medium md:text-lg leading-relaxed max-w-xl">
              Harga sultan termurah se-Indonesia. Jangan lewatkan kesempatan emas ini, event akan segera berakhir.
            </p>
          </div>

          {/* Right Action */}
          <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center justify-center gap-4 bg-black/60 backdrop-blur-2xl border border-white/20 px-8 py-5 rounded-3xl shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] w-full">
              <div className="flex flex-col items-center">
                <span className="font-mono text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[11px] font-bold text-brand-500 uppercase tracking-widest mt-2">Jam</span>
              </div>
              <span className="text-3xl font-black text-white/30 animate-pulse -mt-6">:</span>
              <div className="flex flex-col items-center">
                <span className="font-mono text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[11px] font-bold text-brand-500 uppercase tracking-widest mt-2">Mnt</span>
              </div>
              <span className="text-3xl font-black text-white/30 animate-pulse -mt-6">:</span>
              <div className="flex flex-col items-center">
                <span className="font-mono text-4xl md:text-5xl font-black text-accent-purple drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[11px] font-bold text-accent-purple uppercase tracking-widest mt-2">Dtk</span>
              </div>
            </div>

            <Link href="#games" className="btn-primary w-full flex items-center justify-center gap-3 text-base py-5 group/btn">
              BORONG SEKARANG
              <ChevronRight size={22} className="group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Game List Section */}
      <section id="games" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center md:items-start"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-accent-purple/30 text-accent-purple font-bold mb-5 text-[11px] uppercase tracking-[0.3em] bg-accent-purple/10 shadow-[0_0_15px_rgba(255,0,127,0.2)]">
            <Flame size={16} className="animate-pulse" /> Trending Sekarang
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase drop-shadow-lg">
            Katalog <span className="text-neon-purple">Sultan</span>
          </h2>
        </motion.div>

        {popularGames.length === 0 ? (
          <div className="text-center py-16 glass-premium rounded-3xl border-dashed border-2 border-white/20">
            <p className="text-theme-muted font-medium text-lg">Menunggu intelijen data game masuk...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-20"
          >
            {popularGames.map((game: any) => (
              <motion.div variants={itemVariants} key={game.id} className="h-full">
                <Link href={`/game/${game.id}`} className="group cursor-pointer block h-full outline-none">
                  <div className="relative rounded-[2rem] p-2 glass-premium h-full flex flex-col group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(0,242,254,0.2)] group-hover:border-brand-500/50 transition-all duration-500">
                    
                    {/* Glowing Aura on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-500/0 to-brand-500/20 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-black shadow-inner ring-1 ring-white/10">
                      <Image
                        src={game.imageUrl}
                        alt={game.name}
                        fill
                        className="object-cover filter brightness-90 group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      />

                      {/* Deep Seamless Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10 pointer-events-none opacity-100 transition-opacity duration-300"></div>

                      {/* Hot Badge */}
                      {game.isPopular && (
                        <div className="absolute top-3 right-3 bg-accent-purple/20 backdrop-blur-xl border border-accent-purple/50 text-white text-[9px] font-black px-3 py-1.5 rounded-full z-10 shadow-[0_0_15px_rgba(255,0,127,0.5)] uppercase tracking-[0.2em] animate-pulse">
                          HOT 🔥
                        </div>
                      )}

                      {/* Hover Action Button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm z-20">
                        <span className="btn-primary py-3 px-8 text-sm transform translate-y-8 group-hover:translate-y-0 shadow-[0_10px_30px_rgba(0,242,254,0.6)]">
                          Top Up
                        </span>
                      </div>

                      {/* Title & Publisher */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left transform group-hover:-translate-y-2 transition-transform duration-500">
                        <h3 className="font-black italic text-lg sm:text-2xl text-white leading-none group-hover:text-brand-500 transition-colors drop-shadow-xl tracking-tighter">
                          {game.name}
                        </h3>
                        <p className="text-[10px] text-brand-500/80 uppercase tracking-[0.3em] font-bold mt-2 drop-shadow-sm line-clamp-1">
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

        {/* All Games Grid - More compact version */}
        {allGames.length > 0 && (
          <div className="mb-12 mt-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-black italic tracking-tighter mb-3 flex items-center gap-3 text-white">
                <Gamepad2 className="text-accent-purple" size={32} /> SEMUA GAME
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-brand-500 to-accent-purple rounded-full shadow-[0_0_10px_rgba(0,242,254,0.5)]"></div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
            >
              {allGames.map((game: any) => (
                <motion.div variants={itemVariants} key={game.id} className="h-full">
                  <Link href={`/game/${game.id}`} className="group cursor-pointer block h-full">
                    {/* Compact Glass Card */}
                    <div className="relative rounded-3xl p-2 glass-premium border border-white/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_rgba(0,242,254,0.15)] group-hover:border-brand-500/30 group-hover:bg-brand-500/5 h-full flex flex-col">

                      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black shadow-inner">
                        <Image
                          src={game.imageUrl}
                          alt={game.name}
                          fill
                          className="object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-10 pointer-events-none"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col justify-end text-center">
                          <h3 className="font-bold text-sm text-white line-clamp-2 leading-tight group-hover:text-brand-500 transition-colors drop-shadow-md">
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
