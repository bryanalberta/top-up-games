"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Clock, Copy, AlertCircle, Loader2, LockKeyhole, ScanSearch } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trxId = searchParams.get('trx_id');
  
  const [trx, setTrx] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    if (!trxId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${trxId}`)
      .then(res => res.json())
      .then(data => {
        setTrx(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [trxId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = async () => {
    setSimulating(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${trxId}/pay`, { method: "POST" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${trxId}`);
      const data = await res.json();
      setTrx(data);
    } catch (e) {
      alert("Gagal simulasi pembayaran");
    } finally {
      setSimulating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6 bg-dark-bg text-brand-400">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 border-4 border-brand-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-400 rounded-full border-t-transparent animate-spin"></div>
        <Loader2 className="absolute inset-0 m-auto animate-pulse opacity-50" size={24} />
      </div>
      <span className="font-bold tracking-widest uppercase text-sm animate-pulse drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">Memindai Database...</span>
    </div>
  );

  if (!trx || trx.error) return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-6">
      <div className="text-center p-8 bg-red-900/10 border border-red-500/30 rounded-3xl max-w-md w-full shadow-[0_0_40px_rgba(239,68,68,0.1)]">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-red-500" size={40} />
        </div>
        <h2 className="text-red-500 font-black text-2xl mb-2">Transaksi Nihil</h2>
        <p className="text-theme-muted mb-6">ID Invoice tidak ditemukan dalam log server kami.</p>
        <Link href="/" className="btn-primary inline-flex py-3 px-8 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 border-red-500/50 bg-gradient-to-r from-red-600 to-red-500 font-bold tracking-wide">
          Kembali ke Markas
        </Link>
      </div>
    </div>
  );

  const isPending = trx.status === "PENDING";

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6 bg-dark-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none ${isPending ? 'bg-orange-500/10' : 'bg-green-500/10'}`}></div>
      
      <div className="max-w-xl w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="bg-gradient-to-b from-dark-card to-dark-bg/95 border border-dark-border rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-brand-500/30 transition-colors"
        >
          {/* Header Glow */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[60px] opacity-30 z-0 ${isPending ? 'bg-orange-500' : 'bg-green-500'}`}></div>
          <div className={`absolute top-0 left-0 w-full h-1 ${isPending ? 'bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600' : 'bg-gradient-to-r from-green-600 via-green-400 to-green-600'}`}></div>
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Status Status Radar */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 relative ${isPending ? 'bg-orange-500/10' : 'bg-green-500/10'}`}
            >
              {isPending && <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 border-t-orange-400 animate-spin"></div>}
              {!isPending && <div className="absolute inset-0 rounded-full border-2 border-green-500/30 border-t-green-400 shadow-[0_0_20px_rgba(74,222,128,0.4)]"></div>}
              
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] relative z-10 ${isPending ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' : 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-[0_0_20px_rgba(74,222,128,0.5)]'}`}>
                {isPending ? <Clock size={36} className="animate-pulse" /> : <Check size={44} strokeWidth={4} className="drop-shadow-lg" />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center w-full"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-xs font-bold uppercase tracking-widest shadow-md ${isPending ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${isPending ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]' : 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]'}`}></span>
                {isPending ? 'Otorisasi Pending' : 'Otorisasi Sukses'}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                {isPending ? 'Menunggu Transfer' : 'Misi Berhasil!'}
              </h1>
              
              <p className="text-theme-muted mb-8 text-sm md:text-base max-w-sm mx-auto font-medium">
                {isPending 
                  ? 'Kunci koordinat pembayaran tercetak. Segera selesaikan transfer untuk memulai suplai drop.' 
                  : 'Suplai drop telah dikirim. Saldo game Anda akan masuk dalam hitungan detik.'}
              </p>
            </motion.div>

            {/* Tactical Brief Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-dark-bg/60 backdrop-blur-md border border-dark-border rounded-2xl p-6 text-left mb-8 shadow-inner relative"
            >
              {isPending && (
                <div className="mb-6 pb-6 border-b-2 border-dashed border-dark-border">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-theme-muted uppercase font-bold tracking-widest">Metode / Jalur</span>
                    <span className="font-black text-theme-text uppercase text-accent-neonBlue tracking-wider bg-accent-neonBlue/10 px-3 py-1 rounded-md border border-accent-neonBlue/20">{trx.paymentMethod}</span>
                  </div>
                  
                  <div className="bg-dark-bg border border-dark-border rounded-xl p-4 mt-4 relative overflow-hidden group/code">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                    <div className="text-xs text-brand-400 font-bold uppercase tracking-widest mb-2 pl-2 flex items-center gap-2">
                       <LockKeyhole size={14} /> Kunci Enkripsi (VA/Kode)
                    </div>
                    <div className="flex items-center gap-3 pl-2">
                      <div className="font-mono text-2xl md:text-3xl text-white font-black tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] truncate">{trx.paymentCode || '-'}</div>
                      <button 
                        onClick={() => copyToClipboard(trx.paymentCode || '')}
                        className="ml-auto p-3 hover:bg-brand-500/20 border border-transparent hover:border-brand-500/30 rounded-xl text-theme-muted hover:text-brand-400 transition-all flex-shrink-0"
                        title="Salin Kode"
                      >
                        {copied ? <Check size={22} className="text-green-400" /> : <Copy size={22} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-orange-900/20 border border-orange-500/30 rounded-xl p-4 flex items-start gap-3 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                    <AlertCircle className="text-orange-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-xs text-orange-200/90 leading-relaxed font-medium">
                      PERHATIAN: Transfer nilai pasti. Protokol pengiriman akan otomatis batal jika tidak ada respons dalam 24 jam.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                   <div className="text-theme-muted font-medium text-xs uppercase tracking-widest">No. Registri (TRX)</div>
                   <div className="font-mono text-theme-text font-bold text-right tracking-wider">{trx.id.split('-')[0].toUpperCase()}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                   <div className="text-theme-muted font-medium text-xs uppercase tracking-widest">Beban Operasi</div>
                   <div className="font-black text-theme-text text-right text-brand-300">{trx.product?.name} <span className="text-theme-muted font-medium opacity-60 ml-1">| {trx.game?.name}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                   <div className="text-theme-muted font-medium text-xs uppercase tracking-widest">Kordinat Target (ID)</div>
                   <div className="text-accent-purple font-mono font-bold text-right">{trx.gameUserId} <span className="text-theme-muted text-xs">{trx.gameZoneId ? `(${trx.gameZoneId})` : ''}</span></div>
                </div>
                <div className="pt-4 border-t border-dark-border mt-2 grid grid-cols-2 gap-2 items-center">
                   <div className="text-theme-muted font-black text-sm uppercase tracking-widest">Total Kontrak</div>
                   <div className="font-black text-brand-400 text-2xl text-right drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                     {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(trx.amount)}
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Secret Simulate Button */}
            {isPending && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-full mb-8 relative group"
              >
                 <div className="absolute inset-x-0 -top-4 text-[10px] text-accent-purple/70 font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Dev Terminal Command</div>
                 <button 
                  onClick={simulatePayment}
                  disabled={simulating}
                  className="w-full bg-dark-bg/50 border-2 border-accent-purple/50 text-accent-purple hover:bg-accent-purple hover:text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] uppercase tracking-widest text-sm"
                 >
                   {simulating ? <Loader2 className="animate-spin" size={20} /> : '⚡ Eksekusi Pelunasan Manual'}
                 </button>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row w-full gap-4"
            >
              <Link href="/" className="flex-1 btn-primary text-center py-4 rounded-xl text-base shadow-[0_0_20px_rgba(14,165,233,0.3)] min-w-[160px]">
                Ke Markas Utama
              </Link>
              {!isPending && (
                <Link href="/lacak" className="flex-1 bg-dark-bg/80 border border-brand-500/50 hover:bg-brand-500 hover:text-white text-brand-400 font-bold py-4 rounded-xl transition-all text-center text-base tracking-wide flex items-center justify-center gap-2">
                  <ScanSearch size={20} />
                  Radar Pesanan
                </Link>
              )}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
