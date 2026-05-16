import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../components/ThemeProvider';
import { Toaster } from 'sonner';
import './globals.css';
import { Diamond, ShieldCheck, Zap } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', weight: ['300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Sultan Top Up | Platform Top Up Game Cepat & Termurah',
  description: 'Top up Diamond Mobile Legends, Free Fire, Valorant Points instan dan aman hanya di Sultan Top Up.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans`}>
        <ThemeProvider>
          {/* Global Ambient Lights */}
          <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-[-1]"></div>
          <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-[-1]"></div>

          {/* Global Toast Notifications */}
          <Toaster 
            position="top-center" 
            toastOptions={{
              className: 'bg-dark-card/90 backdrop-blur-2xl border border-white/10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-2xl font-bold tracking-wide',
              style: { padding: '16px' }
            }} 
          />
          
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <main className="pt-24 min-h-screen">
            {children}
          </main>

          {/* Premium Footer */}
          <footer className="mt-20 relative overflow-hidden bg-gradient-to-b from-transparent to-dark-card/50 border-t border-white/5 pt-20 pb-10">
            {/* Footer Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-12 mb-8">
                
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
                  <div className="flex items-center group cursor-pointer inline-flex w-max mb-6">
                    <div className="relative flex items-center justify-center w-14 h-14 bg-brand-600/20 rounded-2xl border border-brand-500/50 shadow-[0_0_20px_rgba(168,85,247,0.5)] transform group-hover:-rotate-3 group-hover:scale-105 transition-all duration-300">
                      <span className="relative z-10 text-[36px] font-black italic text-transparent bg-clip-text bg-gradient-to-br from-purple-200 to-pink-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">S</span>
                    </div>
                    <div className="flex flex-col justify-center ml-5 border-l-2 border-brand-500/30 pl-5 py-1">
                      <h4 className="text-[28px] font-black italic tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 uppercase leading-none drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                        SULTAN
                      </h4>
                      <span className="text-[12px] font-bold tracking-[0.5em] text-pink-400 uppercase mt-2 opacity-90">
                        TOP UP
                      </span>
                    </div>
                  </div>
                  <p className="text-theme-muted leading-relaxed max-w-sm text-sm font-medium">
                    Gerbang top up gaming premium paling mutakhir di Indonesia. Menghadirkan teknologi transaksi tercepat, 100% legal, dan bergaransi penuh 24/7 tanpa henti.
                  </p>
                  
                  {/* Micro Trust Indicators */}
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><Zap size={14} className="text-yellow-400" /> Kilat</div>
                    <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><ShieldCheck size={14} className="text-green-400" /> Legal</div>
                    <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><Diamond size={14} className="text-brand-400" /> Resmi</div>
                  </div>
                </div>
                
                {/* Links Matrix */}
                <div className="col-span-1 md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                  <div className="flex flex-col gap-4">
                    <h4 className="text-white font-bold tracking-wider text-sm uppercase">Cek Status</h4>
                    <div className="h-0.5 w-8 bg-brand-500 rounded-full mb-1"></div>
                    <a href="/lacak" className="text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">Lacak Pesanan</a>
                    <a href="/cara-kerja" className="text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">Cara Transaksi</a>
                    <a href="/#games" className="text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">Daftar Game</a>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-white font-bold tracking-wider text-sm uppercase">Pusat Bantuan</h4>
                    <div className="h-0.5 w-8 bg-brand-500 rounded-full mb-1"></div>
                    <a href="/bantuan" className="text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">Hubungi Admin</a>
                    <a href="/syarat-ketentuan" className="text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">Syarat & Ketentuan</a>
                    <a href="/kebijakan-privasi" className="text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">Kebijakan Privasi</a>
                  </div>
                  <div className="flex flex-col gap-4 sm:col-span-1 col-span-2">
                    <h4 className="text-white font-bold tracking-wider text-sm uppercase">Koneksi</h4>
                    <div className="h-0.5 w-8 bg-brand-500 rounded-full mb-1"></div>
                    <a href="#" className="flex items-center gap-2 text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">IG</div> Instagram
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-theme-muted hover:text-white hover:translate-x-1 transition-all font-medium">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">WA</div> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Copyright Section */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-theme-muted/70 font-medium font-mono">
                <p>&copy; {new Date().getFullYear()} Sultan Top Up Ecosystem. All rights reserved.</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                  Sistem Beroperasi Penuh
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
