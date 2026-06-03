"use client";

import { useState, useEffect, Suspense } from 'react';
import { Search, Loader2, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

function LacakPesananContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const paySimulate = searchParams.get('pay_simulate');

  const [trxId, setTrxId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const searchInvoice = async (invoiceId: string) => {
    if (!invoiceId) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/transactions/${invoiceId}`);
      
      if (!res.ok) {
        setError("Transaksi tidak ditemukan.");
        toast.error("Pesanan tidak ditemukan. Cek kembali Nomor Invoice.");
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      toast.success("Data Transaksi ditemukan!");
      setResult({
        id: data.id,
        status: data.status,
        game: data.game?.name || "Unknown Game",
        product: data.product?.name || "Unknown Product",
        userId: data.gameUserId + (data.gameZoneId ? ` (${data.gameZoneId})` : ""),
        date: new Date(data.createdAt).toLocaleString('id-ID'),
        price: "Rp " + data.amount.toLocaleString('id-ID'),
        rawPrice: data.amount,
        paymentMethod: data.paymentMethod,
        paymentCode: data.paymentCode
      });
    } catch (err) {
      setError("Terjadi kesalahan sistem saat mencari transaksi.");
      toast.error("Kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (queryId) {
      setTrxId(queryId);
      searchInvoice(queryId);
    }
  }, [queryId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trxId) {
      searchInvoice(trxId.trim());
    }
  };

  const handleSimulateWebhook = async () => {
    if (!result) return;
    try {
      toast.success("Mengirimkan Simulasi Webhook Pembayaran Sukses...");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/webhooks/midtrans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: result.id,
          transaction_status: "settlement",
          fraud_status: "accept"
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.status === "ok") {
          toast.success("Simulasi Sukses! Status transaksi telah diperbarui.");
          // Segarkan data transaksi
          await searchInvoice(result.id);
        } else {
          toast.error("Simulasi gagal: " + (data.message || "Unknown error"));
        }
      } else {
        toast.error("Server mengembalikan error saat simulasi webhook.");
      }
    } catch (e: any) {
      toast.error("Gagal terhubung ke server untuk simulasi.");
    }
  };

  // Generate link WhatsApp untuk konfirmasi manual
  const getWhatsAppLink = () => {
    if (!result) return "#";
    const waNumber = "628123456789"; // Nomor Admin mock
    const text = `Halo Admin, saya ingin konfirmasi pembayaran untuk:
- Invoice ID: ${result.id}
- Game: ${result.game}
- Produk: ${result.product}
- Game ID: ${result.userId}
- Nominal: ${result.price}
- Metode: ${result.paymentMethod}

Mohon segera diproses. Terima kasih!`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
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
              disabled={isLoading || !trxId}
              className="btn-primary rounded-2xl flex items-center justify-center gap-2 px-8 py-4 md:py-5 min-w-[160px]"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Scan Kode'}
            </button>
          </form>

          <AnimatePresence mode="wait">
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
                className="mt-10 glass-card border-brand-500/50 p-6 md:p-8 relative overflow-hidden"
              >
                {/* Cyber Receipt Header Overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/20 blur-[60px] pointer-events-none"></div>
                
                {/* Header Struk */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/5 relative z-10 gap-4">
                  <div>
                    <div className="text-theme-muted text-xs uppercase tracking-widest font-bold mb-2">Status Pesanan</div>
                    <div className={`px-4 py-1.5 rounded-full text-sm font-black border inline-flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${result.status === 'SUCCESS' ? 'bg-green-500/20 text-green-300 border-green-400/50 ring-1 ring-green-400/30 shadow-green-500/40 backdrop-blur-md' : result.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50 ring-1 ring-yellow-400/30 shadow-yellow-500/40 backdrop-blur-md' : 'bg-red-500/20 text-red-300 border-red-400/50 ring-1 ring-red-400/30 shadow-red-500/40 backdrop-blur-md'}`}>
                      <span className={`w-2 h-2 rounded-full animate-pulse shadow-xl ${result.status === 'SUCCESS' ? 'bg-green-300 shadow-green-300/100' : result.status === 'PENDING' ? 'bg-yellow-300 shadow-yellow-300/100' : 'bg-red-300 shadow-red-300/100'}`}></span>
                      {result.status === 'SUCCESS' ? 'BERHASIL' : result.status === 'PENDING' ? 'MENUNGGU' : 'GAGAL'}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-theme-muted text-xs uppercase tracking-widest font-bold mb-2">Waktu Transaksi</div>
                    <div className="text-white text-sm font-mono tracking-tight drop-shadow-md">{result.date}</div>
                  </div>
                </div>

                {/* Body Struk */}
                <div className="space-y-5 relative z-10">
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">Nomor Invoice</span>
                    <span className="text-white font-mono tracking-wider font-bold drop-shadow-sm">{result.id}</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">Nama Produk</span>
                    <span className="text-brand-400 font-black drop-shadow-sm">{result.product} <span className="text-white font-medium opacity-80">| {result.game}</span></span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">ID Pemain (Game ID)</span>
                    <span className="text-neonBlue font-mono tracking-wider font-bold text-accent-neonBlue drop-shadow-sm">{result.userId}</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:bg-white/10 hover:shadow-lg backdrop-blur-sm p-3 -mx-3 rounded-xl transition-all duration-300">
                    <span className="text-theme-muted text-sm font-medium">Metode Pembayaran</span>
                    <span className="text-accent-purple font-black uppercase tracking-widest drop-shadow-sm">{result.paymentMethod}</span>
                  </div>
                  
                  {/* Total Separator */}
                  <div className="border-t-2 border-dashed border-white/20 my-6 shadow-sm"></div>

                  <div className="flex justify-between items-center px-1">
                    <span className="text-theme-muted text-sm uppercase tracking-widest font-bold">Total Pembayaran</span>
                    <span className="font-black text-neon text-2xl tracking-tighter">{result.price}</span>
                  </div>
                </div>

                {/* TAMPILAN JIKA STATUS PENDING */}
                {result.status === "PENDING" && (
                  <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                    {/* 1. Instruksi Transfer Manual */}
                    {result.paymentMethod === "Transfer Manual" ? (
                      <div className="bg-brand-500/5 backdrop-blur-xl border border-brand-500/20 rounded-3xl p-6 shadow-md text-center">
                        <AlertTriangle className="mx-auto text-brand-400 mb-3" size={32} />
                        <h4 className="text-brand-300 font-bold text-lg mb-2">Instruksi Transfer Manual</h4>
                        <p className="text-sm text-theme-muted mb-4">Silakan lakukan transfer sebesar nominal pas ke rekening berikut:</p>
                        
                        <div className="bg-dark-bg/80 border border-white/10 rounded-2xl p-4 mb-4 font-mono text-left inline-block w-full max-w-sm">
                          <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                            <span className="text-theme-muted text-xs">Bank:</span>
                            <span className="text-white font-bold text-sm">BCA (Bank Central Asia)</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                            <span className="text-theme-muted text-xs">No. Rekening:</span>
                            <span className="text-white font-black text-sm select-all">123-456-7890</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                            <span className="text-theme-muted text-xs">Penerima:</span>
                            <span className="text-white font-bold text-sm">SULTAN TOPUP</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-theme-muted text-xs">Nominal:</span>
                            <span className="text-brand-400 font-black text-sm select-all">{result.price}</span>
                          </div>
                        </div>

                        <div className="mt-2">
                          <a 
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(22,163,74,0.4)]"
                          >
                            Konfirmasi via WhatsApp <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* 2. Pembayaran Gateway */
                      <div className="bg-accent-gold/5 backdrop-blur-xl border border-accent-gold/40 rounded-3xl p-6 text-center shadow-[inset_0_0_30px_rgba(251,191,36,0.05),0_10px_40px_rgba(251,191,36,0.1)] relative overflow-hidden group">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50"></div>
                        <p className="text-xs uppercase tracking-widest font-black text-accent-gold mb-3 flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span> Otorisasi Pembayaran
                        </p>
                        <p className="text-sm font-medium text-theme-muted mb-6">Silakan selesaikan pembayaran Anda melalui window gateway atau link pembayaran.</p>
                        
                        {result.paymentCode && result.paymentCode.startsWith("http") ? (
                          <a 
                            href={result.paymentCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent-gold hover:bg-yellow-500 text-dark-bg font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(251,191,36,0.4)] mb-4"
                          >
                            Buka Halaman Pembayaran <ExternalLink size={16} />
                          </a>
                        ) : (
                          <div className="bg-dark-bg/80 inline-block px-10 py-5 rounded-2xl border border-white/10 mb-4 shadow-inner ring-1 ring-white/5">
                            <span className="text-xl md:text-3xl font-mono font-black tracking-widest text-white">
                              {result.paymentCode || "PROSES"}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 3. Tombol Simulasi Pembayaran Sukses Sandbox */}
                    {paySimulate === "true" && (
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={handleSimulateWebhook}
                          className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-extrabold text-xs px-6 py-3 rounded-xl border border-brand-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all uppercase tracking-wide"
                        >
                          <CheckCircle2 size={16} /> [Demo] Simulasikan Pembayaran Sukses
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function LacakPesananPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-brand-400 font-bold bg-dark-bg">
        <Loader2 className="w-12 h-12 animate-spin text-brand-500" />
        <span className="animate-pulse text-xl">Menyiapkan radar pelacakan...</span>
      </div>
    }>
      <LacakPesananContent />
    </Suspense>
  );
}
