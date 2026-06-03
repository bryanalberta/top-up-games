"use client";

import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen py-24 px-6 overflow-hidden bg-dark-bg relative flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px]"></div>
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
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] group-hover:bg-accent-purple/20 transition-colors"></div>
            <div className="w-20 h-20 bg-accent-purple/20 border border-accent-purple/30 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <ShieldAlert className="w-10 h-10 text-accent-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
              Syarat & <br/>
              <span className="text-neon-purple">Ketentuan</span>
            </h1>
            <p className="text-theme-muted text-lg md:text-xl leading-relaxed font-medium">
              Dokumen ini memuat landasan hukum dan aturan main dalam penggunaan layanan Sultan Top Up demi keamanan dan kenyamanan bersama.
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
              <h3 className="text-xl font-extrabold text-theme-text mb-3">Status Dokumen</h3>
              <p className="text-theme-muted mb-6 leading-relaxed">
                Saat ini, tim legal kami sedang melakukan finalisasi penyusunan klausul lengkap *Terms of Service*.
              </p>
              
              <div className="bg-accent-purple/10 p-4 rounded-xl border border-accent-purple/30 flex items-start gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-accent-purple animate-pulse flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-accent-purple text-sm">Pembaruan Mendatang</h4>
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">Kebijakan pembatalan, *refund*, dan perlindungan konsumen tingkat lanjut akan segera diterbitkan.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
