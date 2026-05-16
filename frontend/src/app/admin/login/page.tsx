"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, Loader2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('adminToken', data.token);
            toast.success('Otentikasi Berhasil! Mengalihkan ke Pusat Komando...');
            router.push('/admin');
        } else {
            toast.error('Akses Ditolak. Kredensial tidak sah.');
        }
    } catch (err) {
        toast.error('Gagal terhubung ke server otentikasi.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 overflow-hidden bg-dark-bg relative flex flex-col items-center justify-center">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] glass-card mb-6 shadow-[0_0_40px_rgba(14,165,233,0.4)] group hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-12 h-12 text-brand-400 group-hover:text-white transition-colors" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-lg">Protokol Keamanan</h1>
            <p className="text-theme-muted font-medium text-lg">Masuk untuk mengakses Pusat Komando Sultan Top Up</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 md:p-10 relative overflow-hidden group border-brand-500/30 ring-1 ring-brand-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(14,165,233,0.1)]">
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-brand-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-brand-500/20 transition-colors"></div>
            <div className="glow-effect"></div>
            
            <div className="space-y-6 relative z-10">
                <div className="space-y-2 relative group/input">
                    <label className="text-xs font-black text-theme-muted group-focus-within/input:text-brand-400 transition-colors uppercase tracking-widest">Identifikasi (User)</label>
                    <div className="relative hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-shadow rounded-2xl">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-theme-muted group-focus-within/input:text-brand-400 transition-colors" size={20} />
                        <input 
                            type="text" 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-dark-bg/50 border border-white/10 backdrop-blur-xl rounded-2xl pl-14 pr-4 py-4 text-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 transition-all font-mono text-lg tracking-wider placeholder-white/20 shadow-inner"
                            placeholder="USERNAME"
                        />
                    </div>
                </div>

                <div className="space-y-2 relative group/input">
                    <label className="text-xs font-black text-theme-muted group-focus-within/input:text-brand-400 transition-colors uppercase tracking-widest">Kata Sandi (Kode)</label>
                    <div className="relative hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-shadow rounded-2xl">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-theme-muted group-focus-within/input:text-brand-400 transition-colors" size={20} />
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-dark-bg/50 border border-white/10 backdrop-blur-xl rounded-2xl pl-14 pr-4 py-4 text-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 transition-all font-mono text-lg tracking-wider placeholder-white/20 shadow-inner"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isLoading || !username || !password}
                    className="w-full btn-primary rounded-2xl py-4 mt-4 font-bold tracking-wide text-lg flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Otorisasi Masuk'}
                  </button>
                </div>
            </div>
        </form>
      </motion.div>
    </div>
  );
}
