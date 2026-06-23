"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, UserSquare2, Coins, Wallet, HelpCircle, ShieldCheck, Sparkles, Gem, ArrowRight, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function GameDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [gameUserId, setGameUserId] = useState('');
  const [gameZoneId, setGameZoneId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIdGuide, setShowIdGuide] = useState(false);

  const getProductVisuals = (name: string) => {
    const lowercase = name.toLowerCase();
    const isPass = lowercase.includes("pass") || lowercase.includes("membership") || lowercase.includes("card") || lowercase.includes("codex");
    
    const match = name.match(/\d+/g);
    const amount = match ? parseInt(match[0].replace(/\./g, '')) : 0;
    
    if (isPass) {
      return {
        icon: "🎫",
        glowColor: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-amber-500/5",
        badge: "PASS KILAT"
      };
    }
    
    if (amount >= 2000) {
      return {
        icon: "👑",
        glowColor: "group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] bg-red-500/5",
        badge: "SULTAN BOX"
      };
    } else if (amount >= 500) {
      return {
        icon: "💎",
        glowColor: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] bg-purple-500/5",
        badge: "VALUE CHEST"
      };
    } else if (amount >= 100) {
      return {
        icon: "🪙",
        glowColor: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] bg-cyan-500/5",
        badge: "PRO STACK"
      };
    } else {
      return {
        icon: "✨",
        glowColor: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-500/5",
        badge: "LITE BAG"
      };
    }
  };

  const paymentMethods = [
    {
      name: 'Sandbox Gateway (Simulasi)',
      badge: '⚡ PROSES INSTAN',
      logo: '🤖',
      color: 'border-orange-500/40 text-orange-400 bg-orange-500/5',
      desc: 'Simulasi instan 1 detik untuk uji coba sistem.',
      fee: 'Bebas Biaya Admin'
    },
    {
      name: 'BCA Transfer (Manual)',
      badge: '🕒 5 MNT VERIFIKASI',
      logo: '🏦',
      color: 'border-blue-500/40 text-blue-400 bg-blue-500/5',
      desc: 'Transfer ke rekening BCA manual lewat m-Banking.',
      fee: 'Biaya admin Rp 0'
    },
    {
      name: 'DANA E-Wallet (Manual)',
      badge: '⚡ VERIFIKASI CEPAT',
      logo: '📱',
      color: 'border-sky-500/40 text-sky-400 bg-sky-500/5',
      desc: 'Transfer e-wallet DANA. Mudah & instan.',
      fee: 'Biaya admin Rp 0'
    },
    {
      name: 'GoPay E-Wallet (Manual)',
      badge: '⚡ VERIFIKASI CEPAT',
      logo: '🟢',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5',
      desc: 'Transfer e-wallet GoPay. Mudah & aman.',
      fee: 'Biaya admin Rp 0'
    }
  ];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch game:", err);
        setGame({ error: true });
        setLoading(false);
      });
  }, [params.id]);

  const handleTransaction = async () => {
    if (!gameUserId || !selectedProduct || !paymentMethod) {
      toast.error("Harap lengkapi User ID, Nominal, dan Metode Pembayaran!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: game.id,
          productId: selectedProduct.id,
          gameUserId,
          gameZoneId,
          paymentMethod
        })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.payment_url) {
          toast.success("Menghubungkan ke Gateway Pembayaran...");
          window.location.href = result.payment_url;
        } else {
          toast.success("Pesanan Manual Terdaftar!");
          router.push(`/success?trx_id=${result.id}`);
        }
      } else {
        toast.error("Gagal memproses transaksi.");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-brand-400 font-bold">
      <Loader2 className="w-12 h-12 animate-spin text-brand-500" />
      <span className="animate-pulse text-xl">Memuat data game...</span>
    </div>
  );

  if (!game || game.error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-2xl">Game tidak ditemukan</div>;

  return (
    <div className="min-h-screen pb-20 overflow-hidden">
      
      {/* Small Header info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-64 md:h-80 w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card z-10 opacity-90 border-b border-dark-border"></div>
        <Image 
          src={game.imageUrl} 
          alt={game.name} 
          fill 
          className="object-cover blur-sm opacity-50 z-0" 
        />
        <div className="absolute inset-0 z-20 flex items-center px-6">
           <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-end gap-6 pb-8 md:pb-12 text-center md:text-left pt-20 md:pt-0">
              <motion.div 
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.5)] ring-4 ring-dark-bg border border-brand-400 group"
              >
                <Image src={game.imageUrl} alt={game.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </motion.div>
              <div className="mb-2">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-lg tracking-tight">{game.name}</h1>
                <p className="text-brand-300 font-bold tracking-widest uppercase text-xs md:text-sm drop-shadow-md">{game.publisher}</p>
              </div>
           </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Left Side */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: User ID */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 md:p-8 relative"
            >
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-300 border-4 border-dark-bg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(0,242,254,0.4)] transform -rotate-6">
                <UserSquare2 size={24} className="animate-pulse" />
              </div>
              
              <div className="flex justify-between items-center border-b border-dark-border pb-4 mb-6 pl-4">
                <h2 className="text-xl font-bold text-theme-text">Masukkan ID Game</h2>
                <button 
                  onClick={() => setShowIdGuide(!showIdGuide)}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 rounded-xl transition-all shadow-[0_0_10px_rgba(0,242,254,0.1)]"
                >
                  <HelpCircle size={14} /> Panduan ID
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 group">
                  <label className="text-xs text-theme-muted mb-2.5 block group-focus-within:text-brand-400 transition-colors font-black uppercase tracking-wider">User ID Target</label>
                  <input 
                    type="text" 
                    value={gameUserId}
                    onChange={(e) => setGameUserId(e.target.value)}
                    placeholder="Contoh: 12345678"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:bg-white/[0.05] backdrop-blur-sm transition-all font-mono placeholder-white/20 hover:border-white/20 shadow-inner"
                  />
                </div>
                <div className="flex-1 group">
                  <label className="text-xs text-theme-muted mb-2.5 block group-focus-within:text-brand-400 transition-colors font-black uppercase tracking-wider">Zone ID / Server</label>
                  <input 
                    type="text" 
                    value={gameZoneId}
                    onChange={(e) => setGameZoneId(e.target.value)}
                    placeholder="Contoh: 1234 (Opsional)"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:bg-white/[0.05] backdrop-blur-sm transition-all font-mono placeholder-white/20 hover:border-white/20 shadow-inner"
                  />
                </div>
              </div>

              {/* ID Guide Drawer Panel */}
              <AnimatePresence>
                {showIdGuide && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 bg-brand-500/5 border border-brand-500/20 rounded-2xl p-5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-xl pointer-events-none"></div>
                    <div className="flex gap-3 items-start relative z-10">
                      <Info size={18} className="text-brand-400 flex-shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed font-medium">
                        <span className="text-white font-bold block mb-1">Cara Menemukan Player ID & Zone ID:</span>
                        1. Buka Game **{game.name}** di ponsel/PC Anda.<br />
                        2. Masuk ke halaman profil utama (klik ikon foto profil di sudut kiri atas).<br />
                        3. Nomor identitas Anda terletak di bawah nama profil. Format ID: **ID Utama** (e.g. 12345678) dan **Zone/Server ID** biasanya tercantum di dalam tanda kurung (e.g. 1234).<br />
                        4. Salin nomor tersebut dan tempelkan ke kolom input di atas.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="text-xs text-brand-500/70 mt-3.5 font-medium flex items-center gap-1.5"><Sparkles size={12} className="animate-pulse" /> Pastikan Player ID yang Anda masukkan sudah benar untuk menjamin transaksi sukses!</p>
            </motion.div>

            {/* Step 2: Nominals */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6 md:p-8 relative"
            >
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-300 border-4 border-dark-bg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(0,242,254,0.4)] transform -rotate-6">
                <Coins size={24} className="animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-6 text-theme-text border-b border-dark-border pb-4 pl-4">Pilih Nominal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {game.products?.map((product: any) => {
                  const visuals = getProductVisuals(product.name);
                  const isSelected = selectedProduct?.id === product.id;
                  
                  return (
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`cursor-pointer rounded-3xl p-5 transition-all duration-500 border overflow-hidden relative group backdrop-blur-md flex flex-col justify-between min-h-[125px] ${
                        isSelected 
                          ? 'bg-gradient-to-br from-brand-500/10 to-accent-purple/10 border-brand-400 shadow-[inset_0_0_25px_rgba(0,242,254,0.15),0_0_25px_rgba(0,242,254,0.25)] ring-1 ring-brand-400 scale-[1.02] z-10' 
                          : `bg-white/[0.02] border-white/5 hover:border-brand-500/30 hover:bg-white/[0.04] ${visuals.glowColor}`
                      }`}
                    >
                      {/* Visual Category Icon & Glow */}
                      <div className="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-500 z-0">
                        {visuals.icon}
                      </div>

                      {/* Selection Indicator pill */}
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${
                          isSelected ? 'bg-brand-500/20 text-brand-300 border border-brand-400/40' : 'bg-white/5 text-theme-muted border border-white/5'
                        }`}>
                          {visuals.badge}
                        </span>
                        
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-brand-400 bg-brand-500/10' : 'border-white/10'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-[0_0_5px_#00f2fe]"></div>}
                        </div>
                      </div>

                      {/* Product details */}
                      <div className="relative z-10 mt-auto">
                        <div className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight mb-1">{product.name}</div>
                        <div className="text-brand-400 font-black text-xs sm:text-sm">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 3: Payment */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 md:p-8 relative"
            >
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-purple to-purple-600 border-4 border-dark-bg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transform -rotate-6">
                <Wallet size={24} className="animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-6 text-theme-text border-b border-dark-border pb-4 pl-4">Pilih Pembayaran</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const isSelected = paymentMethod === method.name;
                  
                  return (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={method.name}
                      onClick={() => setPaymentMethod(method.name)}
                      className={`cursor-pointer rounded-3xl p-5 flex flex-col justify-between transition-all duration-500 border relative overflow-hidden backdrop-blur-md min-h-[140px] group ${
                        isSelected 
                          ? 'bg-gradient-to-br from-accent-purple/10 to-brand-500/10 border-accent-purple shadow-[inset_0_0_25px_rgba(168,85,247,0.1),0_0_25px_rgba(168,85,247,0.2)] ring-1 ring-accent-purple scale-[1.01] z-10' 
                          : 'bg-white/[0.02] border-white/5 hover:border-accent-purple/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      {/* Background Glowing Vector */}
                      <div className="absolute -right-6 -bottom-6 text-7xl opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 z-0">
                        {method.logo}
                      </div>

                      <div className="flex justify-between items-start mb-3 relative z-10 gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-xl shadow-inner ${
                            isSelected ? 'bg-accent-purple/20 border-accent-purple/50' : 'bg-white/5 border-white/10'
                          }`}>
                            {method.logo}
                          </div>
                          <div>
                            <span className="font-extrabold text-sm text-white block tracking-tight leading-tight">{method.name.split(' (')[0]}</span>
                            <span className="text-[9px] font-black text-theme-muted block mt-0.5">{method.name.includes('Manual') ? 'TRANSFER MANUAL' : 'GATEWAY SIMULASI'}</span>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                          isSelected ? 'border-accent-purple bg-accent-purple/10' : 'border-white/10'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_5px_#ff007f]"></div>}
                        </div>
                      </div>

                      {/* Method Description and Admin Fee Badge */}
                      <p className="text-[11px] text-theme-muted font-medium mb-3 relative z-10 leading-relaxed max-w-[90%]">{method.desc}</p>

                      <div className="flex justify-between items-center relative z-10 mt-auto pt-3 border-t border-white/5">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' : 'bg-white/5 text-theme-muted border border-white/5'
                        }`}>
                          {method.badge}
                        </span>
                        
                        <span className="text-[10px] font-bold text-brand-400 font-mono">{method.fee}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Checkout Right Side Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 sticky top-24 lg:top-28">
              <h2 className="text-xl font-bold mb-6 text-theme-text border-b border-dark-border pb-4">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-theme-muted">Game</span>
                  <span className="font-bold text-theme-text text-right">{game.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-muted">Nominal</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span 
                      key={selectedProduct ? selectedProduct.name : 'none'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bold text-brand-300 text-right"
                    >
                      {selectedProduct ? selectedProduct.name : '-'}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-muted">Metode</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span 
                      key={paymentMethod || 'none'}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-bold text-accent-purple text-right"
                    >
                      {paymentMethod || '-'}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="pt-4 border-t border-dark-border flex justify-between items-center mt-2 pb-2">
                  <span className="text-theme-muted font-bold text-lg">Total Harga</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span 
                      key={selectedProduct ? selectedProduct.price : '0'}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-black text-neon text-3xl tracking-tight"
                    >
                      {selectedProduct ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedProduct.price) : 'Rp 0'}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {(!selectedProduct || !gameUserId || !paymentMethod) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center p-3 rounded-lg font-medium mb-4 flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Harap lengkapi User ID, Nominal, & Metode
                </motion.div>
              )}

              <motion.button 
                whileHover={(!isSubmitting && selectedProduct && gameUserId && paymentMethod) ? { scale: 1.05 } : {}}
                whileTap={(!isSubmitting && selectedProduct && gameUserId && paymentMethod) ? { scale: 0.95 } : {}}
                onClick={handleTransaction}
                disabled={isSubmitting || !selectedProduct || !gameUserId || !paymentMethod}
                className="w-full btn-primary text-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Beli Sekarang'}
              </motion.button>
              
              <p className="text-center text-xs text-theme-muted mt-4 leading-relaxed">
                Dengan menekan tombol Beli Sekarang, Anda menyetujui Syarat & Ketentuan dari Sultan Top Up. 🔒 Aman & Terenkripsi.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
