"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Image as ImageIcon, CheckCircle2, Diamond, Layers, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminGamesTab() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<any>(null);
  
  // Game Form State
  const [gameForm, setGameForm] = useState({ name: "", publisher: "", imageUrl: "", isPopular: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expanded Game (to show products)
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  // Product Form State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({ name: "", price: "" });

  const fetchGames = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`);
      const data = await res.json();
      setGames(data);
    } catch (e) {
      toast.error("Gagal memuat katalog game.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const getHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const handleSaveGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingGame 
        ? `${process.env.NEXT_PUBLIC_API_URL}/games/${editingGame.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/games`;
      const method = editingGame ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(gameForm)
      });

      if (res.ok) {
        toast.success(`Game berhasil ${editingGame ? 'diperbarui' : 'ditambahkan'}!`);
        setIsGameModalOpen(false);
        fetchGames();
      } else {
        toast.error("Gagal menyimpan game.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm("Hapus game ini beserta seluruh produk di dalamnya?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        toast.success("Game dihapus!");
        fetchGames();
      } else {
        toast.error("Gagal menghapus game.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan.");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingProduct 
        ? `${process.env.NEXT_PUBLIC_API_URL}/products/${editingProduct.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/products`;
      const method = editingProduct ? "PUT" : "POST";

      const payload = { ...productForm, gameId: expandedGameId };

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(`Produk berhasil ${editingProduct ? 'diperbarui' : 'ditambahkan'}!`);
        setIsProductModalOpen(false);
        fetchGames(); // Refresh whole list to get updated products
      } else {
        toast.error("Gagal menyimpan produk.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        toast.success("Produk dihapus!");
        fetchGames();
      } else {
        toast.error("Gagal menghapus produk.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan.");
    }
  };

  const openGameModal = (game?: any) => {
    if (game) {
      setEditingGame(game);
      setGameForm({ name: game.name, publisher: game.publisher, imageUrl: game.imageUrl, isPopular: game.isPopular });
    } else {
      setEditingGame(null);
      setGameForm({ name: "", publisher: "", imageUrl: "", isPopular: false });
    }
    setIsGameModalOpen(true);
  };

  const openProductModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({ name: product.name, price: product.price.toString() });
    } else {
      setEditingProduct(null);
      setProductForm({ name: "", price: "" });
    }
    setIsProductModalOpen(true);
  };

  if (loading) return <div className="text-center py-20 text-brand-400 animate-pulse font-bold">Memuat Katalog Game...</div>;

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex justify-between items-center glass-card p-6 border-brand-500/30">
        <div className="glow-effect"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white drop-shadow-md flex items-center gap-3">
            <span className="p-2 bg-accent-purple/20 text-accent-purple rounded-xl border border-accent-purple/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Layers className="animate-pulse" size={24} />
            </span>
            Katalog Game
          </h2>
          <p className="text-theme-muted text-sm mt-2 font-medium">Kelola daftar game, gambar banner, dan harga diamond.</p>
        </div>
        <button 
          onClick={() => openGameModal()}
          className="btn-primary flex items-center gap-2 rounded-xl px-5 py-3 shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-gradient-to-r from-accent-purple to-brand-500 border-none hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
        >
          <Plus size={18} /> Tambah Game
        </button>
      </div>

      {/* Game List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <motion.div 
            key={game.id}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`glass-card overflow-hidden transition-all duration-300 relative group ${expandedGameId === game.id ? 'border-brand-500 shadow-[0_10px_40px_rgba(14,165,233,0.15)] ring-1 ring-brand-500/50' : 'hover:border-brand-500/40 hover:shadow-2xl'}`}
          >
            {game.isPopular && <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] border border-white/20 backdrop-blur-md flex items-center gap-1.5 tracking-widest uppercase">POPULER</div>}
            
            <div className="h-32 w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent z-10 opacity-90 transition-opacity duration-300"></div>
              <Image src={game.imageUrl} alt={game.name} fill className="object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700" />
              
              <div className="absolute top-3 right-3 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openGameModal(game)} className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:text-brand-400 hover:bg-black/80 transition-colors"><Edit2 size={14} /></button>
                <button onClick={() => handleDeleteGame(game.id)} className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-red-400 hover:text-red-500 hover:bg-black/80 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>

            <div className="p-5 relative z-20 bg-dark-bg/80 backdrop-blur-sm -mt-4 border-t border-white/10">
              <h3 className="text-xl font-bold text-white tracking-tight">{game.name}</h3>
              <p className="text-xs text-brand-400 font-bold uppercase tracking-widest mb-4">{game.publisher}</p>
              
              <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
                <div className="flex items-center gap-1.5 text-theme-muted font-medium">
                  <Diamond size={14} className="text-accent-neonBlue" />
                  {game.products?.length || 0} Produk
                </div>
                <button 
                  onClick={() => setExpandedGameId(expandedGameId === game.id ? null : game.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${expandedGameId === game.id ? 'bg-brand-500/20 text-brand-300 border-brand-500/50' : 'bg-white/5 text-theme-muted hover:text-white border-white/10'}`}
                >
                  {expandedGameId === game.id ? 'Tutup Data' : 'Kelola Produk'}
                </button>
              </div>
            </div>

            {/* Expanded Product List */}
            <AnimatePresence>
              {expandedGameId === game.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: "auto", opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-brand-500/5 border-t border-brand-500/20 p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">Daftar Nominal</span>
                    <button onClick={() => openProductModal()} className="text-[10px] bg-brand-500 text-white px-2 py-1 rounded-md font-bold hover:bg-brand-400">+ Item</button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {game.products?.length === 0 && <div className="text-xs text-center text-theme-muted py-2 italic">Belum ada item jualan.</div>}
                    {game.products?.map((prod: any) => (
                      <div key={prod.id} className="flex justify-between items-center bg-white/5 hover:bg-white/10 border border-white/5 p-2.5 rounded-xl group/prod transition-colors">
                        <div>
                          <div className="text-sm font-bold text-white leading-none mb-1">{prod.name}</div>
                          <div className="text-xs text-brand-400 font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(prod.price)}</div>
                        </div>
                        <div className="flex opacity-0 group-hover/prod:opacity-100 transition-opacity gap-1">
                          <button onClick={() => openProductModal(prod)} className="p-1.5 text-theme-muted hover:text-white"><Edit2 size={12} /></button>
                          <button onClick={() => handleDeleteProduct(prod.id)} className="p-1.5 text-red-400 hover:text-red-500"><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ))}
      </div>

      {/* GAME MODAL */}
      <AnimatePresence>
        {isGameModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGameModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative z-10 w-full max-w-lg bg-dark-bg border border-white/10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/5">
                <h3 className="text-xl font-black text-white">{editingGame ? 'Edit Master Game' : 'Tambah Game Baru'}</h3>
              </div>
              <form onSubmit={handleSaveGame} className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1.5 block">Nama Game</label>
                  <input type="text" required value={gameForm.name} onChange={e => setGameForm({...gameForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="e.g. Mobile Legends" />
                </div>
                <div>
                  <label className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1.5 block">Developer / Publisher</label>
                  <input type="text" required value={gameForm.publisher} onChange={e => setGameForm({...gameForm, publisher: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="e.g. Moonton" />
                </div>
                <div>
                  <label className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1.5 block">Image URL (Cover)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={16} />
                    <input type="url" required value={gameForm.imageUrl} onChange={e => setGameForm({...gameForm, imageUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors text-sm" placeholder="https://..." />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <input type="checkbox" id="isPop" checked={gameForm.isPopular} onChange={e => setGameForm({...gameForm, isPopular: e.target.checked})} className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-500 focus:ring-brand-500 focus:ring-offset-dark-bg cursor-pointer" />
                  <label htmlFor="isPop" className="text-sm font-bold text-white cursor-pointer select-none">Tandai sebagai Game Populer</label>
                </div>
                <div className="pt-6 flex gap-3">
                  <button type="button" onClick={() => setIsGameModalOpen(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">Batal</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-3 btn-primary rounded-xl flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle2 size={18} /> Simpan</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProductModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative z-10 w-full max-w-md bg-dark-bg border border-white/10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-accent-neonBlue/10">
                <h3 className="text-xl font-black text-white drop-shadow-md">{editingProduct ? 'Edit Nominal' : 'Tambah Nominal Baru'}</h3>
              </div>
              <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1.5 block">Nama / Jumlah Item</label>
                  <input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="e.g. 86 Diamonds" />
                </div>
                <div>
                  <label className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-1.5 block">Harga Jual (Rupiah)</label>
                  <input type="number" min="0" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors font-mono" placeholder="Rp 20000" />
                </div>
                <div className="pt-6 flex gap-3">
                  <button type="button" onClick={() => setIsProductModalOpen(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">Batal</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-3 btn-primary bg-accent-neonBlue border-accent-neonBlue text-dark-bg hover:bg-blue-400 rounded-xl flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle2 size={18} /> Simpan Data</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
