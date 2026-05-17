"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'top-6 px-6' : 'top-0 px-0'}`}>
      <div className={`w-full transition-all duration-500 overflow-hidden ${
        scrolled 
          ? 'max-w-6xl glass-premium rounded-full py-3 px-8' 
          : 'max-w-7xl bg-gradient-to-b from-dark-bg/90 pb-4 pt-6 px-8 to-transparent border-transparent'
      }`}>
        <div className="flex items-center justify-between">
          {/* Ultra Elegant Esports Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative flex items-center justify-center w-12 h-12 bg-white/[0.03] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,242,254,0.15)] transform group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 text-[28px] font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_10px_rgba(0,242,254,0.3)]">S</span>
            </div>
            <div className="flex flex-col justify-center ml-4 pl-4 py-1 border-l border-white/10 group-hover:border-brand-500/30 transition-colors duration-500">
              <span className="text-[20px] font-black italic tracking-[0.15em] text-white uppercase leading-none group-hover:text-neon transition-all duration-500">
                SULTAN
              </span>
              <span className="text-[9px] font-bold tracking-[0.5em] text-brand-500 uppercase mt-1.5 opacity-90">
                TOP UP
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-theme-muted">
            <Link href="/" className="hover:text-white hover:text-neon transition-all duration-300 relative group">
              Beranda
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#games" className="hover:text-white hover:text-neon transition-all duration-300 relative group">
              Daftar Game
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/cara-kerja" className="hover:text-white hover:text-neon transition-all duration-300 relative group">
              Cara Kerja
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/lacak" className="hover:text-white hover:text-neon transition-all duration-300 relative group">
              Lacak Pesanan
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex">
            <Link href="/admin/login" className="flex items-center gap-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full border border-white/10 hover:border-brand-500/50 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-500 tracking-wider uppercase">
              <ShieldCheck size={16} className="text-brand-500" />
              Pusat Komando
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-white hover:text-brand-400 transition-colors p-2.5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md" onClick={toggleMenu}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`md:hidden absolute left-4 right-4 glass-premium p-6 flex flex-col gap-4 z-40 ${scrolled ? 'top-[5rem]' : 'top-24'}`}
          >
            <Link href="/" className="text-theme-muted hover:text-white font-bold py-3 border-b border-white/5 flex items-center gap-4 text-sm uppercase tracking-wider" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_#00f2fe]"></div> Beranda</Link>
            <Link href="/#games" className="text-theme-muted hover:text-white font-bold py-3 border-b border-white/5 flex items-center gap-4 text-sm uppercase tracking-wider" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_10px_#ff007f]"></div> Daftar Game</Link>
            <Link href="/cara-kerja" className="text-theme-muted hover:text-white font-bold py-3 border-b border-white/5 flex items-center gap-4 text-sm uppercase tracking-wider" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_#00f2fe]"></div> Cara Kerja</Link>
            <Link href="/lacak" className="text-theme-muted hover:text-white font-bold py-3 flex items-center gap-4 text-sm uppercase tracking-wider" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-accent-gold shadow-[0_0_10px_#fbbf24]"></div> Lacak Pesanan</Link>
            <Link href="/admin/login" className="mt-4 btn-primary text-center" onClick={toggleMenu}>Pusat Komando</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
