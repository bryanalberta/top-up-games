"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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
    <nav className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'top-4 px-4' : 'top-0 px-0'}`}>
      <div className={`w-full transition-all duration-500 overflow-hidden ${
        scrolled 
          ? 'max-w-5xl bg-dark-card/60 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-full py-3 px-6 ring-1 ring-white/5' 
          : 'max-w-7xl bg-gradient-to-b from-dark-bg/90 pb-4 pt-6 px-6 to-transparent border-transparent'
      }`}>
        <div className="flex items-center justify-between">
          {/* Ultra Elegant Esports Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-brand-600/20 rounded-xl border border-brand-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)] transform group-hover:-rotate-3 group-hover:scale-105 transition-all duration-300">
              <span className="relative z-10 text-[26px] font-black italic text-transparent bg-clip-text bg-gradient-to-br from-purple-200 to-pink-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">S</span>
            </div>
            <div className="flex flex-col justify-center ml-4 pl-4 py-0.5 border-l-2 border-brand-500/30">
              <span className="text-[20px] font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 uppercase leading-none drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                SULTAN
              </span>
              <span className="text-[9px] font-bold tracking-[0.5em] text-pink-400 uppercase mt-1 opacity-90">
                TOP UP
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-theme-muted">
            <Link href="/" className="hover:text-white hover:text-shadow-glow transition-all">Beranda</Link>
            <Link href="/#games" className="hover:text-white hover:text-shadow-glow transition-all">Daftar Game</Link>
            <Link href="/cara-kerja" className="hover:text-white hover:text-shadow-glow transition-all">Cara Kerja</Link>
            <Link href="/lacak" className="hover:text-white hover:text-shadow-glow transition-all">Lacak Pesanan</Link>
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex">
            <Link href="/admin/login" className="text-xs font-bold text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 px-4 py-2 rounded-full border border-brand-500/20 transition-colors">
              Pusat Komando
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-white hover:text-brand-400 transition-colors p-2 bg-white/5 rounded-lg border border-white/10" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className={`md:hidden absolute left-4 right-4 bg-dark-card/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-40 ${scrolled ? 'top-[4.5rem]' : 'top-20'}`}
          >
            <Link href="/" className="text-theme-muted hover:text-white font-bold py-3 border-b border-white/5 flex items-center gap-3" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Beranda</Link>
            <Link href="/#games" className="text-theme-muted hover:text-white font-bold py-3 border-b border-white/5 flex items-center gap-3" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-accent-purple"></div> Daftar Game</Link>
            <Link href="/cara-kerja" className="text-theme-muted hover:text-white font-bold py-3 border-b border-white/5 flex items-center gap-3" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Cara Kerja</Link>
            <Link href="/lacak" className="text-theme-muted hover:text-white font-bold py-3 flex items-center gap-3" onClick={toggleMenu}><div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div> Lacak Pesanan</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
