import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquareHeart, Users, Heart } from 'lucide-react';

export interface WishItem {
  id: string;
  name: string;
  status: 'hadir' | 'hadir_keluarga' | 'ragu' | 'tidak_hadir';
  message: string;
  timestamp: string;
  likes: number;
}

const DEFAULT_WISHES: WishItem[] = [
  {
    id: '1',
    name: 'Andi Fatimah Azzahra & Keluarga',
    status: 'hadir',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir. Selamat menempuh hidup baru Nur & Udi, semoga menjadi keluarga yang sakinah, mawaddah, warahmah hingga akhir hayat.',
    timestamp: '2 jam yang lalu',
    likes: 12,
  },
  {
    id: '2',
    name: 'Ahmad Ridwan, S.Kom',
    status: 'hadir',
    message: 'Selamat Udi & Nur! Ikut bahagia melihat perjalanan kalian berdua sampai ke pelaminan. Semoga dilancarkan semua rangkaian acaranya di Sinjai nanti. Aamiin ya Rabbal alamin.',
    timestamp: '5 jam yang lalu',
    likes: 8,
  },
  {
    id: '3',
    name: 'Dra. Hj. Wahidah & Rekan Guru',
    status: 'hadir_keluarga',
    message: 'Selamat berbahagia ananda Nurhidayah, S.Pd & suami. Semoga keberkahan senantiasa melimpah dalam rumah tangga kalian.',
    timestamp: '1 hari yang lalu',
    likes: 15,
  },
  {
    id: '4',
    name: 'Fauzan Saputra (Sahabat Kampus)',
    status: 'hadir',
    message: 'MasyaAllah Tabarakallah bro Udi! Akhirnya berlabuh ke pelaminan dengan pujaan hati. Selamat bro, insyaAllah kami hadir meramaikan hari bahagia kalian!',
    timestamp: '1 hari yang lalu',
    likes: 9,
  },
];

const STORAGE_KEY = 'wedding_nur_udi_wishes_v1';

export const GuestbookRSVP: React.FC<{ initialGuestName?: string }> = ({
  initialGuestName = '',
}) => {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_WISHES;
  });

  const [name, setName] = useState(initialGuestName);
  const [status, setStatus] = useState<'hadir' | 'hadir_keluarga' | 'ragu' | 'tidak_hadir'>('hadir');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialGuestName && !name) {
      setName(initialGuestName);
    }
  }, [initialGuestName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishItem = {
      id: Date.now().toString(),
      name: name.trim(),
      status,
      message: message.trim(),
      timestamp: 'Baru saja',
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isLiked = !!prev[id];
      const nextLiked = !isLiked;

      setWishes((current) =>
        current.map((item) =>
          item.id === id ? { ...item, likes: item.likes + (nextLiked ? 1 : -1) } : item
        )
      );

      return { ...prev, [id]: nextLiked };
    });
  };

  const getStatusBadge = (st: WishItem['status']) => {
    switch (st) {
      case 'hadir':
        return (
          <span className="text-[11px] text-[#4A5847] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E8B]" />
            Hadir
          </span>
        );
      case 'hadir_keluarga':
        return (
          <span className="text-[11px] text-[#4A5847] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E8B]" />
            Hadir Bersama
          </span>
        );
      case 'ragu':
        return (
          <span className="text-[11px] text-[#C5A059] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Masih Ragu
          </span>
        );
      case 'tidak_hadir':
        return (
          <span className="text-[11px] text-[#D4A5A5] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A5A5]" />
            Tidak Hadir
          </span>
        );
    }
  };

  const attendingCount = wishes.filter(
    (w) => w.status === 'hadir' || w.status === 'hadir_keluarga'
  ).length;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* RSVP Form Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#8F9E8B]/30 shadow-xs mb-8">
        <div className="text-center mb-6">
          <span className="text-xs font-serif uppercase tracking-widest text-[#2C3A29] font-bold">
            Konfirmasi Kehadiran &amp; Doa Restu
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#181716] mt-1 font-bold">
            Buku Tamu &amp; Ucapan
          </h3>
          <p className="text-xs sm:text-sm text-[#252423] mt-1 font-medium">
            Doa restu Anda merupakan karunia terindah bagi lembaran baru hidup kami
          </p>
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-2xl bg-[#F0F3EF] border border-[#8F9E8B]/40 text-[#2C3A29] text-xs sm:text-sm flex items-center gap-3 animate-in fade-in font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#5C6E58] shrink-0" />
            <span>Terima kasih banyak atas ucapan doa dan konfirmasi kehadiran Anda!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#181716] mb-1.5">
              Nama Lengkap Anda
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Andi Pratama"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#8F9E8B]/40 focus:border-[#B8860B] focus:outline-none text-sm text-[#181716] font-medium placeholder:text-stone-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#181716] mb-1.5">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setStatus('hadir')}
                className={`py-2.5 px-3 rounded-xl border text-center font-bold transition-all ${
                  status === 'hadir'
                    ? 'bg-[#5C6E58] text-white border-[#5C6E58] shadow-xs'
                    : 'bg-[#FAF9F6] text-[#181716] border-stone-300 hover:border-[#5C6E58]/50'
                }`}
              >
                Hadir Sendiri
              </button>
              <button
                type="button"
                onClick={() => setStatus('hadir_keluarga')}
                className={`py-2.5 px-3 rounded-xl border text-center font-bold transition-all ${
                  status === 'hadir_keluarga'
                    ? 'bg-[#5C6E58] text-white border-[#5C6E58] shadow-xs'
                    : 'bg-[#FAF9F6] text-[#181716] border-stone-300 hover:border-[#5C6E58]/50'
                }`}
              >
                Hadir Berkeluarga
              </button>
              <button
                type="button"
                onClick={() => setStatus('ragu')}
                className={`py-2.5 px-3 rounded-xl border text-center font-bold transition-all ${
                  status === 'ragu'
                    ? 'bg-[#B8860B] text-white border-[#B8860B] shadow-xs'
                    : 'bg-[#FAF9F6] text-[#181716] border-stone-300 hover:border-[#B8860B]/50'
                }`}
              >
                Masih Ragu
              </button>
              <button
                type="button"
                onClick={() => setStatus('tidak_hadir')}
                className={`py-2.5 px-3 rounded-xl border text-center font-bold transition-all ${
                  status === 'tidak_hadir'
                    ? 'bg-[#B87A7A] text-white border-[#B87A7A] shadow-xs'
                    : 'bg-[#FAF9F6] text-[#181716] border-stone-300 hover:border-[#B87A7A]/50'
                }`}
              >
                Tidak Bisa Hadir
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#181716] mb-1.5">
              Pesan &amp; Doa Restu
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan selamat dan doa terbaik untuk kedua mempelai..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#8F9E8B]/40 focus:border-[#B8860B] focus:outline-none text-sm text-[#181716] font-medium placeholder:text-stone-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#B87A7A] hover:bg-[#a66a6a] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Ucapan &amp; Doa Restu</span>
          </button>
        </form>
      </div>

      {/* Wishes Feed */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#8F9E8B]/25">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-[#B87A7A]" />
            <h4 className="font-serif text-xl font-bold text-[#181716]">
              Untaian Doa ({wishes.length})
            </h4>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#2C3A29] bg-[#F0F3EF] px-3 py-1 rounded-full font-bold">
            <Users className="w-3.5 h-3.5 text-[#5C6E58]" />
            <span>{attendingCount} Konfirmasi Hadir</span>
          </div>
        </div>

        <div className="max-h-[380px] overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/70 hover:border-[#8F9E8B]/30 transition-all text-left"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#8F9E8B]/20 text-[#2C3A29] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-serif text-base font-bold text-[#181716] block leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-[#4A4846] font-medium">{item.timestamp}</span>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <p className="text-xs sm:text-sm text-[#252423] leading-relaxed mt-2 pl-10 font-medium">
                {item.message}
              </p>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => handleToggleLike(item.id)}
                  className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition-colors ${
                    likedMap[item.id]
                      ? 'text-[#D4A5A5] bg-[#F7EFEF]'
                      : 'text-stone-400 hover:text-[#D4A5A5]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedMap[item.id] ? 'fill-[#D4A5A5] text-[#D4A5A5]' : ''
                    }`}
                  />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
