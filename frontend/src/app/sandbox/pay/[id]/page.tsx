"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CreditCard, ShoppingBag, ArrowLeft, Loader2, CheckCircle2, XCircle, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

export default function SandboxPaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [trx, setTrx] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<"success" | "failed" | null>(null);

  useEffect(() => {
    const fetchTrx = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const apiUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
        const res = await fetch(`${apiUrl}/transactions/${params.id}`);
        if (!res.ok) throw new Error("Transaction not found");
        const data = await res.json();
        setTrx(data);
      } catch (e) {
        toast.error("Transaksi tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrx();
  }, [params.id]);

  const handleSimulate = async (status: "success" | "failed") => {
    setProcessing(status);
    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const apiUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
      const endpoint = status === "success" ? "success" : "failed";
      const res = await fetch(`${apiUrl}/sandbox/pay/${params.id}/${endpoint}`, {
        method: "POST",
      });

      if (res.ok) {
        toast.success(status === "success" ? "Simulasi Pembayaran Sukses!" : "Simulasi Pembayaran Dibatalkan.");
        setTimeout(() => {
          if (status === "success") {
            router.push(`/success?trx_id=${params.id}`);
          } else {
            router.push(`/lacak?trx_id=${params.id}`);
          }
        }, 1500);
      } else {
        toast.error("Gagal mengirim simulasi status ke backend.");
        setProcessing(null);
      }
    } catch (e) {
      toast.error("Kesalahan jaringan.");
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6 bg-dark-bg text-brand-400">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 border-4 border-brand-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-400 rounded-full border-t-transparent animate-spin"></div>
          <Loader2 className="absolute inset-0 m-auto animate-pulse opacity-50" size={24} />
        </div>
        <span className="font-bold tracking-widest uppercase text-sm animate-pulse">Memuat Gateway Sandbox...</span>
      </div>
    );
  }

  if (!trx) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg px-6">
        <div className="text-center p-8 bg-red-900/10 border border-red-500/30 rounded-3xl max-w-md w-full shadow-[0_0_40px_rgba(239,68,68,0.1)]">
          <h2 className="text-red-500 font-black text-2xl mb-4">Gagal Memuat</h2>
          <p className="text-theme-muted mb-6">ID Transaksi tidak valid atau tidak terdaftar.</p>
          <button onClick={() => router.push("/")} className="btn-primary w-full py-3 rounded-xl font-bold">
            Kembali ke Toko
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6 bg-dark-bg relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-dark-card to-dark-bg/95 border border-dark-border rounded-[2rem] p-6 md:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Header Sandbox Gateway */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500"></div>
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-brand-500/20 text-brand-400 rounded-xl border border-brand-500/30">
                <ShieldCheck size={26} />
              </span>
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">SULTAN SANDBOX PAY</h1>
                <p className="text-xs text-brand-400 font-bold uppercase tracking-wider">Simulasi Gateway Pembayaran</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white/5 border border-white/10 text-white font-mono text-xs rounded-lg">
              DEVMODE
            </span>
          </div>

          <AnimatePresence mode="wait">
            {processing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-6"
              >
                <div className="w-20 h-20 relative">
                  <div className={`absolute inset-0 border-4 rounded-full animate-spin ${processing === "success" ? "border-green-500/30 border-t-green-400" : "border-red-500/30 border-t-red-400"}`}></div>
                  <Loader2 className="absolute inset-0 m-auto animate-pulse opacity-50 text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {processing === "success" ? "Memproses Pelunasan..." : "Membatalkan Transaksi..."}
                  </h3>
                  <p className="text-theme-muted text-sm mt-2">Menghubungkan ke API Sandbox Server lokal</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="details" className="space-y-6">
                {/* Brief Info */}
                <div className="bg-dark-bg/60 border border-dark-border rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-brand-400 uppercase tracking-widest flex items-center gap-2">
                    <ShoppingBag size={16} /> Rincian Kontrak Transaksi
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm border-t border-white/5 pt-4">
                    <div className="text-theme-muted">Order ID</div>
                    <div className="text-white font-mono text-right font-bold truncate">{trx.id}</div>

                    <div className="text-theme-muted">Game</div>
                    <div className="text-white text-right font-bold flex items-center justify-end gap-1.5">
                      <Gamepad2 size={16} className="text-brand-300" /> {trx.game?.name || "Game"}
                    </div>

                    <div className="text-theme-muted">Produk / Item</div>
                    <div className="text-brand-300 text-right font-black">{trx.product?.name}</div>

                    <div className="text-theme-muted">ID Pemain (Zone ID)</div>
                    <div className="text-white text-right font-mono font-bold">
                      {trx.gameUserId} {trx.gameZoneId ? `(${trx.gameZoneId})` : ""}
                    </div>

                    <div className="text-theme-muted">Metode Pembayaran</div>
                    <div className="text-accent-purple text-right font-black uppercase tracking-wider">
                      {trx.paymentMethod}
                    </div>

                    <div className="col-span-2 border-t border-white/5 my-2"></div>

                    <div className="text-theme-muted text-base font-bold">Total Harga</div>
                    <div className="text-neon text-right text-2xl font-black">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(trx.amount)}
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-300 p-4 rounded-xl text-xs leading-relaxed flex items-start gap-3">
                  <CreditCard size={18} className="shrink-0 mt-0.5" />
                  <p>
                    <strong>Info Simulasi:</strong> Ini adalah gateway simulator lokal. Anda tidak akan dikenakan biaya riil. Memilih **Simulasikan Bayar Sukses** akan menyimulasikan transaksi berhasil dan meneruskannya ke top-up supplier.
                  </p>
                </div>

                {/* Simulation Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={() => handleSimulate("success")}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} /> Simulasikan Bayar Sukses
                  </button>

                  <button
                    onClick={() => handleSimulate("failed")}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2"
                  >
                    <XCircle size={20} /> Simulasikan Bayar Gagal
                  </button>
                </div>

                <button
                  onClick={() => router.push(`/game/${trx.gameId}`)}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-theme-muted hover:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <ArrowLeft size={16} /> Batalkan dan Kembali ke Game
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
