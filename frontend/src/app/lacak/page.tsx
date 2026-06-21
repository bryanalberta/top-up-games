"use client";

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// 1. Definisikan Interface untuk Type Safety TypeScript
interface TransactionResult {
  id: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | string;
  game: string;
  product: string;
  userId: string;
  date: string;
  price: string;
  paymentMethod: string;
  paymentCode?: string;
}

export default function LacakPesananPage() {
  const [trxId, setTrxId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<TransactionResult | null>(null);
  const [error, setError] = useState('');

  // 2. Pisahkan logika Fetching agar bisa dipanggil ulang dengan bersih
  const getTransactionData = async (targetId: string) => {
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const apiUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
    const res = await fetch(`${apiUrl}/transactions/${targetId}`);
    
    if (!res.ok) {
      throw new Error("Transaksi tidak ditemukan.");
    }
    
    return await res.json();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTrxId = trxId.trim(); // Bersihkan spasi
    if (!cleanTrxId) return;

    setIsLoading(true);
    setIsScanning(true);
    setError('');
    setResult(null);

    // Efek radar scanning selama 2.2 detik
    await new Promise(resolve => setTimeout(resolve, 2200));

    try {
      const data = await getTransactionData(cleanTrxId);
      
      toast.success("Radar mendeteksi data transaksi!");
      setResult({
        id: data.id,
        status: data.status,
        game: data.game?.name || "Unknown Game",
        product: data.product?.name || "Unknown Product",
        userId: data.gameUserId + (data.gameZoneId ? ` (${data.gameZoneId})` : ""),
        date: new Date(data.createdAt).toLocaleString('id-ID'),
        price: "Rp " + data.amount.toLocaleString('id-ID'),
        paymentMethod: data.paymentMethod,
        paymentCode: data.paymentCode
      });
    } catch (err: any) {
      setError(err.message === "Transaksi tidak ditemukan." ? "Transaksi tidak ditemukan." : "Terjadi kesalahan sistem.");
      toast.error(err.message === "Transaksi tidak ditemukan." ? "Pesanan tidak ditemukan. Cek kembali Nomor Invoice." : "Kesalahan jaringan.");
    } finally {
      setIsScanning(false);
      setIsLoading(false);
    }
  };

  // 3. Fungsi Simulasi Lunas tanpa memalsukan Event Submit
  const handleSimulatePayment = async () => {
    if (!result) return;
    
    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const apiUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
      toast.info("Menjalankan Otorisasi...");
      
      const res = await fetch(`${apiUrl}/transactions/${result.id}/pay`, { method: "POST" });
      if (!res.ok) throw new Error();

      toast.success("Pembayaran Berhasil Dilunasi!");
      
      // Refresh data secara langsung
      const updatedData = await getTransactionData(result.id);
      setResult(prev => prev ? {
        ...prev,
        status: updatedData.status
      } : null);
      
    } catch (err) {
      toast.error("Gagal menjalankan simulasi pembayaran.");
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 overflow-hidden bg-dark-bg relative">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px]"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mt-12 mb-12 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 backdrop-blur-md border border-brand-500/30 text-brand-400 font-bold mb-6 text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(14,165,233,0.3)]">
          <Search size={16} /> Lacak Real-Time
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
          Lacak <span className="text-neon">Pesanan</span>
        </h1>
        <p className="text-theme-muted font-medium text-lg max-w-xl mx-auto">
          Masukkan Nomor Transaksi / Invoice Anda untuk melacak status pesanan secara instan layaknya radar E-Sports.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
          <div className="glow-effect"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-500/40 transition-colors animate-pulse-glow"></div>
          
          <form onSubmit={handleSearch} className="relative z-10 flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex-1 relative group/input">
              <input
                type="text"
                placeholder="TRX-123456789"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 backdrop-blur-xl rounded-2xl pl-6 pr-12 py-4 md:py-5 text-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 transition-all font-mono text-lg tracking-wider placeholder-white/20 group-hover/input:border-white/20 uppercase shadow-inner"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-theme-muted group-hover/input:text-brand-400 transition-colors" size={24} />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !trxId.trim()}
              className="btn-primary rounded-2xl flex items-center justify-center gap-2 px-8 py-4 md:py-5 min-w-[160px]"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Scan Kode'}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {isScanning && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 gap-6 relative z-10"
              >
                <div className="radar-container relative">
                  <div className="radar-sweep"></div>
                  <div className="radar-grid"></div>
                  <div className="radar-crosshair-h"></div>
                  <div className="radar-crosshair-v"></div>
                  <div className="radar-blip top-[40%] left-[30%]"></div>
                  <div className="radar-blip top-[65%] left-[70%]"></div>
                </div>
                
                <div className="text-center">
                  <p className="text-brand-500 font-black tracking-[0.25em] animate-pulse text-sm font-mono">RADAR MEMINDAI SIGNAL...</p>
                  <p className="text-xs text-theme-muted mt-2">Menghubungkan ke Invoice ID: {trxId.toUpperCase()}</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="mt-6 bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-10 glass-card border-brand-500/50 p-6 md:p-8 relative overflow-hidden receipt-tear"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/20 blur-[60px] pointer-events-none"></div>
                
                {/* Header Struk */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/5 relative z-10 gap-4">
                  <div>
                    <div className="text-theme-muted text-xs uppercase tracking-widest font-bold mb-2">Status Terminal</div>
                    <div className={`px-4 py-1.5 rounded-full text-sm font-black border inline-flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${result.status === 'SUCCESS' ? 'bg-green-500/20 text-green-300 border-green-400/50 ring-1 ring-green-400/30 shadow-green-500/40 backdrop-blur-md' : result.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50 ring-1 ring-yellow-400/30 shadow-yellow-500/40 backdrop-blur-md' : 'bg-red-500/20 text-red-300 border-red-400/50 ring-1 ring-red-400/30 shadow-red-500/40 backdrop-blur-md'}`}>
                      <span className={`w-2 h-2 rounded-full animate-pulse shadow-xl ${result.status === 'SUCCESS' ? 'bg-green-300 shadow-green-300/100' : result.status === 'PENDING' ? 'bg-yellow-300 shadow-yellow-300/100' : 'bg-red-300 shadow-red-300/100'}`}></span>
                      {result.status}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-theme-muted text-xs uppercase tracking-widest font-bold mb-2">Sinkronisasi Waktu</div>
                    <div className="text-white text-sm font-mono tracking-tight drop-shadow-md">{result.date}</div>
                  </div>
                </div>

                {/* Body Struk */}
                <div className="space-y-5 relative z-10">
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">No. Registri (TRX)</span>
                    <span className="text-white font-mono tracking-wider font-bold drop-shadow-sm">{result.id}</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">Beban Muatan (Item)</span>
                    <span className="text-brand-400 font-black drop-shadow-sm">{result.product} <span className="text-white font-medium opacity-80">| {result.game}</span></span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">Target Operasi (ID)</span>
                    <span className="text-neonBlue font-mono tracking-wider font-bold text-accent-neonBlue drop-shadow-sm">{result.userId}</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">Jalur Logistik (Metode)</span>
                    <span className="text-accent-purple font-black uppercase tracking-widest drop-shadow-sm">{result.paymentMethod}</span>
                  </div>
                  
                  <div className="border-t-2 border-dashed border-white/20 my-6 shadow-sm"></div>

                  <div className="flex justify-between items-center px-1">
                    <span className="text-theme-muted text-sm uppercase tracking-widest font-bold">Total Nilai Kontrak</span>
                    <span className="font-black text-neon text-2xl tracking-tighter">{result.price}</span>
                  </div>
                </div>

                {/* Bagian Instruksi Pembayaran */}
                {result.status === "PENDING" && result.paymentCode && (() => {
                  const isManual = result.paymentMethod?.toLowerCase().includes("manual");
                  const getManualDetails = (paymentMethod: string) => {
                    const method = paymentMethod?.toLowerCase() || "";
                    if (method.includes("bca")) return { type: "Bank BCA", account: "8830198271", name: "Kelompok Sultan Top Up" };
                    if (method.includes("dana")) return { type: "DANA E-Wallet", account: "0812-3456-7890", name: "Sultan Top Up" };
                    if (method.includes("gopay")) return { type: "GoPay E-Wallet", account: "0812-3456-7890", name: "Sultan Top Up" };
                    return { type: "Manual Transfer", account: "0812-3456-7890", name: "Sultan Top Up" };
                  };
                  const manualDetails = isManual ? getManualDetails(result.paymentMethod) : null;
                  const whatsappText = `Halo Admin, saya ingin konfirmasi transfer manual untuk Top Up ${result.product} di ${result.game}.\n\nInvoice ID: ${result.id}\nMetode: ${result.paymentMethod}\nJumlah Transfer: ${result.price}\nKode Unik: ${result.paymentCode || '-'}\nMohon segera diproses ya!`;
                  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappText)}`;

                  return (
                    <div className="mt-8 pt-6 border-t border-white/10 relative z-10 text-left">
                      {isManual ? (
                        <div className="bg-dark-bg/60 border border-dark-border rounded-2xl p-6 space-y-4">
                          <h4 className="text-xs uppercase tracking-widest font-black text-brand-400">Instruksi Transfer Manual</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-dark-bg border border-white/5 rounded-xl p-3">
                              <span className="text-[10px] text-theme-muted uppercase font-bold tracking-wider block">Rekening Tujuan ({manualDetails?.type})</span>
                              <span className="font-mono text-white text-lg font-black block">{manualDetails?.account}</span>
                              <span className="text-xs text-theme-muted block">a/n {manualDetails?.name}</span>
                            </div>
                            <div className="bg-dark-bg border border-white/5 rounded-xl p-3">
                              <span className="text-[10px] text-theme-muted uppercase font-bold tracking-wider block">Total Transfer</span>
                              <span className="font-mono text-neon text-lg font-black block">{result.price}</span>
                              <span className="text-xs text-theme-muted block">Gunakan transfer nilai pas</span>
                            </div>
                          </div>
                          
                          <div className="bg-dark-bg border border-white/5 rounded-xl p-3">
                            <span className="text-[10px] text-theme-muted uppercase font-bold tracking-wider block">Kode Referensi Transfer</span>
                            <span className="font-mono text-white text-sm font-bold block">{result.paymentCode}</span>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <a 
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl text-center transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider"
                            >
                              📱 WhatsApp Konfirmasi
                            </a>
                            <button
                              onClick={handleSimulatePayment}
                              className="flex-1 bg-dark-bg text-brand-400 border border-brand-500/30 hover:bg-brand-500 hover:text-white transition-all font-bold text-xs uppercase tracking-wider rounded-xl py-2.5"
                            >
                              ⚡ Lunas Instan (Simulasi)
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-accent-gold/5 backdrop-blur-xl border border-accent-gold/40 rounded-3xl p-6 md:p-8 text-center shadow-[inset_0_0_30px_rgba(251,191,36,0.05),0_10px_40px_rgba(251,191,36,0.1)] relative overflow-hidden group">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50"></div>
                          <p className="text-xs uppercase tracking-widest font-black text-accent-gold mb-3 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span> Otorisasi Pembayaran
                          </p>
                          <p className="text-sm font-medium text-theme-muted mb-6">Gunakan kode ini untuk menyelesaikan transfer pada metode yang dipilih.</p>
                          <div className="bg-dark-bg/80 inline-block px-10 py-5 rounded-2xl border border-white/10 mb-4 shadow-inner ring-1 ring-white/5 group-hover:border-accent-gold/40 transition-colors">
                            <span className="text-3xl md:text-5xl font-mono font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                              {result.paymentCode}
                            </span>
                          </div>
                          
                          <div>
                            <button
                              onClick={handleSimulatePayment}
                              className="mt-4 text-xs bg-dark-bg text-brand-400 px-4 py-2 rounded-lg border border-brand-500/30 hover:bg-brand-500 hover:text-white transition-colors font-bold tracking-wide uppercase"
                            >
                              [SIMULASI] Jalankan Protokol Lunas
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Futuristic Barcode */}
                <div className="flex flex-col items-center justify-center mt-10 pt-8 border-t border-white/5 relative z-10">
                  <div className="text-[9px] text-theme-muted font-mono tracking-[0.25em] uppercase mb-3">Satelit Hash Invoice</div>
                  <div className="bg-white/[0.02] p-4 rounded-2xl flex items-center justify-center gap-1.5 hover:bg-white/[0.04] transition-all w-max shadow-inner border border-white/5">
                    {[1, 2.5, 1.2, 3.2, 1.8, 4, 1.5, 2.5, 1, 3.5, 1.2, 4.2, 2.8, 1, 3, 2, 1.2, 4, 2.2, 1, 3.2, 1.5, 2].map((height, i) => (
                      <div 
                        key={i} 
                        className="bg-white w-[2.5px] rounded-full opacity-60 hover:opacity-100 transition-opacity" 
                        style={{ height: `${height * 8}px` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[10px] text-brand-500 font-mono tracking-[0.35em] uppercase mt-3.5 select-all">{result.id}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
