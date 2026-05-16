"use client";

import { motion } from 'framer-motion';
import { Headset, Mail, MessageCircle } from 'lucide-react';

export default function BantuanPage() {
  return (
    <div className="min-h-screen py-24 px-6 overflow-hidden bg-dark-bg relative flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[120px]"></div>
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
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] group-hover:bg-brand-500/20 transition-colors"></div>
            <div className="w-20 h-20 bg-brand-500/20 border border-brand-500/30 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(14,165,233,0.3)]">
              <Headset className="w-10 h-10 text-brand-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
              Pusat <br/>
              <span className="text-neon">Bantuan 24/7</span>
            </h1>
            <p className="text-theme-muted text-lg md:text-xl leading-relaxed font-medium max-w-lg">
              Ada kendala dengan transaksi Anda? Tim layanan pelanggan elit Sultan Top Up selalu stand-by memonitor radar operasional.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="md:col-span-12 lg:col-span-5 grid grid-cols-1 gap-6">
            
            <motion.a 
              href="mailto:support@sultan-topup.com"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 flex flex-col justify-center group cursor-pointer h-full text-left w-full hover:border-accent-purple/50 hover:shadow-[0_10px_40px_rgba(139,92,246,0.2)]"
            >
              <div className="absolute right-0 bottom-0 p-6 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:-rotate-12 transition-all">
                <Mail size={100} className="text-accent-purple" />
              </div>
              <div className="relative z-10 w-14 h-14 bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center rounded-2xl mb-6 shadow-[-4px_4px_15px_rgba(139,92,246,0.2)]">
                <Mail className="text-accent-purple" size={24} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-accent-purple transition-colors drop-shadow-md">Electronic Mail</h3>
              <p className="text-theme-muted font-mono tracking-tight text-lg font-medium">support@sultan-topup.com</p>
            </motion.a>

            <motion.a 
              href="#"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8 flex flex-col justify-center group cursor-pointer h-full text-left w-full hover:border-green-400/50 hover:shadow-[0_10px_40px_rgba(34,197,94,0.2)]"
            >
              <div className="absolute right-0 bottom-0 p-6 opacity-5 group-hover:opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                <MessageCircle size={100} className="text-green-500" />
              </div>
              <div className="relative z-10 w-14 h-14 bg-green-500/10 border border-green-500/30 flex items-center justify-center rounded-2xl mb-6 shadow-[-4px_4px_15px_rgba(34,197,94,0.2)] flex-shrink-0">
                <MessageCircle className="text-green-400" size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-theme-text mb-2 group-hover:text-green-400 transition-colors">WhatsApp Kring</h3>
              <p className="text-theme-muted font-medium mb-1">Jalur prioritas untuk keluhan cepat.</p>
              <p className="text-green-400/80 text-xs font-bold tracking-widest uppercase">Operasional: 08:00 - 22:00 WIB</p>
            </motion.a>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
