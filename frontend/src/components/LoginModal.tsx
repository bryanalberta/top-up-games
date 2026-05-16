"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md text-left bg-dark-bg border border-dark-border rounded-3xl shadow-[0_0_50px_rgba(20,184,166,0.15)] z-10 m-4 sm:my-8"
            >
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/20 blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-purple/20 blur-[60px] pointer-events-none" />

              <div className="relative p-6 sm:p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-theme-muted hover:text-theme-text bg-dark-card/50 hover:bg-dark-card rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-8 mt-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-accent-neonBlue flex items-center justify-center font-bold text-white shadow-lg shadow-brand-500/30 mx-auto mb-4 text-2xl">
                    S
                  </div>
                  <h2 className="text-2xl font-bold text-theme-text mb-1">
                    {isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
                  </h2>
                  <p className="text-sm text-theme-muted">
                    {isLogin ? 'Masuk untuk mengelola transaksi Anda.' : 'Daftar sekarang untuk promo top up menarik!'}
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Fitur Login sedang dalam tahap pengembangan!"); onClose(); }}>
                  {!isLogin && (
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-400 transition-colors">
                        <UserPlus size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap"
                        className="w-full bg-dark-card/80 border border-dark-border rounded-xl pl-10 pr-4 py-3 text-theme-text placeholder-theme-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                      />
                    </div>
                  )}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-400 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Alamat Email"
                      className="w-full bg-dark-card/80 border border-dark-border rounded-xl pl-10 pr-4 py-3 text-theme-text placeholder-theme-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-400 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="Kata Sandi"
                      className="w-full bg-dark-card/80 border border-dark-border rounded-xl pl-10 pr-4 py-3 text-theme-text placeholder-theme-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                    />
                  </div>

                  {isLogin && (
                    <div className="flex justify-end">
                      <a href="#" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Lupa kata sandi?</a>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-6"
                  >
                    {isLogin ? (
                      <><LogIn size={18} /> Masuk</>
                    ) : (
                      <><UserPlus size={18} /> Daftar</>
                    )}
                  </button>
                </form>

                {/* Toggle Mode */}
                <div className="mt-6 text-center text-sm text-theme-muted">
                  {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-brand-400 font-semibold hover:text-brand-300 transition-colors"
                  >
                    {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
                  </button>
                </div>

                <div className="mt-8 text-center text-xs text-theme-muted">
                  Layanan mockup presentasi - Universitas.
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
