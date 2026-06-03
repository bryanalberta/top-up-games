"use client";

import { motion } from 'framer-motion';
import { LockKeyhole } from 'lucide-react';

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen py-24 px-6 overflow-hidden bg-dark-bg relative flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-neonBlue/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-5xl w-full mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Main Title Card */}
          <div className="md:col-span-12 lg:col-span-7 glass-card p-10 md:p-14 relative group">
            <div className="glow-effect"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent-neonBlue/10 rounded-full blur-[80px] group-hover:bg-accent-neonBlue/20 transition-colors"></div>
            <div className="w-20 h-20 bg-accent-neonBlue/20 border border-accent-neonBlue/30 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
              <LockKeyhole className="w-10 h-10 text-accent-neonBlue" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
              Kebijakan <br/>
              <span className="text-neon">Privasi</span>
            </h1>
            <p className="text-theme-muted text-lg md:text-xl leading-relaxed font-medium">
              Di Sultan Top Up, kami memprioritaskan keamanan komando. Identitas dan log transaksi Anda dilindungi melalui enkripsi tingkat militer.
            </p>
          </div>

          {/* Info Cards */}
          <div className="md:col-span-12 lg:col-span-5 grid grid-cols-1 gap-6">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 flex flex-col justify-center relative group"
            >
              <h3 className="text-xl font-extrabold text-theme-text mb-3">Keamanan Data 100%</h3>
              <p className="text-theme-muted mb-6 leading-relaxed">
                User ID dan informasi kontak dijamin tidak akan pernah diserahkan, dijual, atau dibocorkan kepada intelijen atau pihak ketiga mana pun.
              </p>
              
              <div className="bg-accent-neonBlue/10 p-4 rounded-xl border border-accent-neonBlue/30 flex items-start gap-4">
                <div className="mt-1 text-accent-neonBlue shrink-0">🛡️</div>
                <div>
                  <h4 className="font-bold text-accent-neonBlue text-sm">Enkripsi End-to-End</h4>
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">Pengembangan dokumen privasi lanjutan sedang diracik oleh divisi keamanan siber kami.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
