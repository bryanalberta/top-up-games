"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Wallet, TrendingUp, AlertCircle, ShoppingCart, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import AdminGamesTab from '../../components/AdminGamesTab';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'beranda' | 'games'>('beranda');
  const [stats, setStats] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const headers = { 'Authorization': `Bearer ${token}` };

      const [statsRes, trxRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transactions`, { headers })
      ]);

      if (statsRes.status === 401 || statsRes.status === 403 || !statsRes.ok) {
        localStorage.removeItem('adminToken');
        toast.error("Akses Ditolak atau Sesi Habis.");
        router.push('/admin/login');
        return;
      }

      const statsData = await statsRes.json();
      const trxData = await trxRes.json();
      setStats(statsData);
      setTransactions(trxData);
    } catch (e) {
      console.error("Gagal memuat data admin");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transactions/${id}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        toast.success("Transaksi manual berhasil disetujui (Lunas)!");
        fetchAdminData();
      } else {
        toast.error("Gagal menyetujui transaksi.");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan jaringan.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transactions/${id}/reject`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        toast.success("Transaksi manual berhasil ditolak.");
        fetchAdminData();
      } else {
        toast.error("Gagal menolak transaksi.");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan jaringan.");
    }
  };

  useEffect(() => {
    fetchAdminData();
    // Auto refresh setiap 10 detik
    const interval = setInterval(fetchAdminData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-brand-400 animate-pulse">
      Memuat Dashboard Admin...
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3 text-white drop-shadow-xl tracking-tight font-display">
              <span className="p-2 bg-brand-500/10 text-brand-400 rounded-xl border border-brand-500/30 shadow-[0_0_20px_rgba(197,168,128,0.25)]">
                <LayoutDashboard size={28} className="animate-pulse" />
              </span>
              Pusat Komando
            </h1>
            <p className="text-theme-muted mt-2">Ringkasan performa dan riwayat pesanan Sultan Top Up.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-bold transition-all text-sm backdrop-blur-md shadow-lg">
              Ke Toko
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('adminToken');
                toast.success('Sesi Berakhir.');
                router.push('/admin/login');
              }}
              className="bg-red-500/5 hover:bg-red-500/15 text-red-400 border border-red-500/20 px-6 py-3 rounded-xl font-bold transition-all text-sm flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab('beranda')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'beranda' ? 'bg-brand-500 text-black shadow-[0_4px_20px_rgba(197,168,128,0.25)] border border-brand-400' : 'bg-white/5 text-theme-muted hover:text-white hover:bg-white/10 border border-white/10'}`}
          >
            Beranda Status
          </button>
          <button 
            onClick={() => setActiveTab('games')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'games' ? 'bg-brand-500 text-black shadow-[0_4px_20px_rgba(197,168,128,0.25)] border border-brand-400' : 'bg-white/5 text-theme-muted hover:text-white hover:bg-white/10 border border-white/10'}`}
          >
            Manajemen Game & Harga
          </button>
        </div>

        {activeTab === 'beranda' ? (
          <>
            {/* Stats Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card p-6 relative overflow-hidden group hover:border-brand-400/50 hover:shadow-[0_8px_30px_rgba(197,168,128,0.15)]"
          >
            <div className="glow-effect"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-brand-500/30 transition-colors animate-pulse-glow"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-theme-muted font-bold mb-1 uppercase tracking-widest text-xs">Total Pendapatan</p>
                <h3 className="text-3xl font-black text-brand-400 drop-shadow-md">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats?.totalRevenue || 0)}
                </h3>
              </div>
              <div className="p-3 bg-brand-500/20 text-brand-400 rounded-xl border border-brand-500/30 shadow-[0_0_20px_rgba(197,168,128,0.2)]"><Wallet size={24} /></div>
            </div>
            <div className="text-xs text-brand-300 flex items-center gap-1 font-medium"><TrendingUp size={14} /> Hanya transaksi sukses</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-6 relative overflow-hidden group hover:border-amber-400/50 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]"
          >
            <div className="glow-effect"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-amber-500/15 transition-colors animate-pulse-glow"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-theme-muted font-bold mb-1 uppercase tracking-widest text-xs">Pesanan Pending</p>
                <h3 className="text-3xl font-black text-amber-400 drop-shadow-md">{stats?.totalPending || 0}</h3>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]"><AlertCircle size={24} /></div>
            </div>
            <div className="text-xs text-amber-300 flex items-center gap-1 font-medium">Menunggu pembayaran pelanggan</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card p-6 relative overflow-hidden group hover:border-emerald-400/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]"
          >
            <div className="glow-effect"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-emerald-500/15 transition-colors animate-pulse-glow"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-theme-muted font-bold mb-1 uppercase tracking-widest text-xs">Pesanan Sukses</p>
                <h3 className="text-3xl font-black text-emerald-400 drop-shadow-md">{stats?.totalSuccess || 0}</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]"><ShoppingCart size={24} /></div>
            </div>
            <div className="text-xs text-emerald-300 flex items-center gap-1 font-medium">Total produk terjual</div>
          </motion.div>
        </div>

        {/* Transactions Table */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="glass-card overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h2 className="text-xl font-bold text-white drop-shadow-md">Riwayat Transaksi Terbaru</h2>
            <div className="flex items-center gap-2 text-xs text-theme-muted">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span> Auto-update (10s)
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-brand-300 text-sm uppercase tracking-widest relative border-b border-white/10 font-bold">
                  <th className="p-4 font-medium">ID / Tanggal</th>
                  <th className="p-4 font-medium">Item & Game</th>
                  <th className="p-4 font-medium">Player ID</th>
                  <th className="p-4 font-medium">Nominal</th>
                  <th className="p-4 font-medium">Metode</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-theme-text text-sm divide-y divide-dark-border/50">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-theme-muted">Belum ada transaksi.</td>
                  </tr>
                ) : (
                  transactions.map((trx: any) => (
                    <tr key={trx.id} className="hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-300 border-b border-white/5 last:border-0">
                      <td className="p-4">
                        <div className="font-mono text-xs text-white mb-1 drop-shadow-sm">{trx.id.split('-')[0].toUpperCase()}</div>
                        <div className="text-[10px] text-theme-muted">
                          {new Date(trx.createdAt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-brand-400 drop-shadow-sm">{trx.product?.name || '-'}</div>
                        <div className="text-xs text-theme-muted">{trx.game?.name || '-'}</div>
                      </td>
                      <td className="p-4 font-mono text-xs text-brand-300">{trx.gameUserId} {trx.gameZoneId ? `(${trx.gameZoneId})` : ''}</td>
                      <td className="p-4 font-black text-white drop-shadow-md">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(trx.amount)}
                      </td>
                      <td className="p-4 uppercase text-xs font-black text-accent-purple tracking-widest">{trx.paymentMethod}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black border inline-flex items-center gap-1.5 shadow-lg ${
                          trx.status === 'SUCCESS' 
                            ? 'bg-green-500/20 text-green-300 border-green-400/50 ring-1 ring-green-400/30 shadow-green-500/40' 
                            : trx.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50 ring-1 ring-yellow-400/30 shadow-yellow-500/40' : 'bg-red-500/20 text-red-300 border-red-400/50 ring-1 ring-red-400/30 shadow-red-500/40'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-xl ${trx.status === 'SUCCESS' ? 'bg-green-300 shadow-green-300/100' : trx.status === 'PENDING' ? 'bg-yellow-300 shadow-yellow-300/100' : 'bg-red-300 shadow-red-300/100'}`}></span>
                          {trx.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {trx.status === 'PENDING' && trx.paymentMethod.toLowerCase().includes('manual') ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(trx.id)}
                              className="bg-green-600 hover:bg-green-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-md hover:shadow-green-600/30 cursor-pointer"
                            >
                              Setujui
                            </button>
                            <button
                              onClick={() => handleReject(trx.id)}
                              className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-md hover:shadow-red-600/30 cursor-pointer"
                            >
                              Tolak
                            </button>
                          </div>
                        ) : trx.status === 'PENDING' ? (
                          <span className="text-xs text-theme-muted italic">Menunggu System</span>
                        ) : (
                          <span className="text-xs text-theme-muted font-bold">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        </>
        ) : (
          <AdminGamesTab />
        )}

      </div>
    </div>
  );
}
