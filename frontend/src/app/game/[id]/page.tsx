"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, UserSquare2, Coins, Wallet } from 'lucide-react';
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
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
        toast.success("Menghubungkan ke Gateway Pembayaran...");
        if (result.payment_url) {
          window.location.href = result.payment_url;
        } else {
          router.push(`/lacak`);
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
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-300 border-4 border-dark-bg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(245,158,11,0.4)] transform -rotate-6">
                <UserSquare2 size={24} className="animate-pulse" />
              </div>
              <h2 className="text-xl items-center font-bold mb-6 text-theme-text border-b border-dark-border pb-4 pl-4">Masukkan ID Game</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 group">
                  <label className="text-sm text-theme-muted mb-2 block group-focus-within:text-brand-400 transition-colors font-semibold">User ID</label>
                  <input 
                    type="text" 
                    value={gameUserId}
                    onChange={(e) => setGameUserId(e.target.value)}
                    placeholder="Contoh: 12345678"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/50 focus:bg-white/10 backdrop-blur-sm transition-all font-mono placeholder-white/30 hover:border-white/20 shadow-inner"
                  />
                </div>
                <div className="flex-1 group">
                  <label className="text-sm text-theme-muted mb-2 block group-focus-within:text-brand-400 transition-colors font-semibold">Zone ID (Opsional)</label>
                  <input 
                    type="text" 
                    value={gameZoneId}
                    onChange={(e) => setGameZoneId(e.target.value)}
                    placeholder="Contoh: 1234"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/50 focus:bg-white/10 backdrop-blur-sm transition-all font-mono placeholder-white/30 hover:border-white/20 shadow-inner"
                  />
                </div>
              </div>
              <p className="text-xs text-brand-500/70 mt-3 font-medium">💡 Untuk mengetahui User ID Anda, silahkan klik menu profile di bagian kiri atas pada menu utama game.</p>
            </motion.div>

            {/* Step 2: Nominals */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6 md:p-8 relative"
            >
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-300 border-4 border-dark-bg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(245,158,11,0.4)] transform -rotate-6">
                <Coins size={24} className="animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-6 text-theme-text border-b border-dark-border pb-4 pl-4">Pilih Nominal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {game.products?.map((product: any) => (
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border overflow-hidden relative group backdrop-blur-sm ${selectedProduct?.id === product.id ? 'bg-brand-500/20 border-brand-400 shadow-[inset_0_0_20px_rgba(14,165,233,0.3),0_0_20px_rgba(14,165,233,0.4)] ring-1 ring-brand-400 scale-[1.02] z-10' : 'bg-white/5 border-white/10 hover:border-brand-400/50 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'}`}
                  >
                    {selectedProduct?.id === product.id && (
                       <div className="absolute top-0 right-0 w-8 h-8 bg-brand-500 rounded-bl-2xl flex items-center justify-center text-white font-bold text-xs shadow-[-2px_2px_10px_rgba(20,184,166,0.5)]">
                         ✓
                       </div>
                    )}
                    <div className="font-bold text-theme-text mb-1">{product.name}</div>
                    <div className="text-brand-400 font-medium text-sm">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Step 3: Payment */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 md:p-8 relative"
            >
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-purple to-pink-500 border-4 border-dark-bg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] transform -rotate-6">
                <Wallet size={24} className="animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-6 text-theme-text border-b border-dark-border pb-4 pl-4">Pilih Pembayaran</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Qris', 'Gopay', 'Dana', 'Ovo', 'ShopeePay', 'BCA Virtual Account'].map((method, idx) => (
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`cursor-pointer rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 border min-h-[100px] relative overflow-hidden backdrop-blur-sm ${paymentMethod === method ? 'bg-accent-purple/20 border-accent-purple shadow-[inset_0_0_20px_rgba(139,92,246,0.3),0_0_20px_rgba(139,92,246,0.4)] ring-1 ring-accent-purple scale-[1.02] z-10' : 'bg-white/5 border-white/10 hover:border-accent-purple/50 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                       <span className={`font-bold text-sm transition-colors ${paymentMethod === method ? 'text-theme-text' : 'text-theme-muted'}`}>{method}</span>
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === method ? 'border-accent-purple' : 'border-gray-600'}`}>
                         {paymentMethod === method && <motion.div layoutId="payment-dot" className="w-2.5 h-2.5 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(139,92,246,0.8)]"></motion.div>}
                       </div>
                    </div>
                    {selectedProduct && paymentMethod === method && (
                       <div className="text-brand-400 font-extrabold text-sm mt-auto">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedProduct.price)}
                       </div>
                    )}
                  </motion.div>
                ))}
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
