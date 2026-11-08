import React, { useState } from 'react';
import { MailOpen, Sparkles, Heart } from 'lucide-react';

interface EnvelopeCoverProps {
  guestName: string;
  onOpen: () => void;
  onStartOpen?: () => void;
  isOpen: boolean;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  guestName,
  onOpen,
  onStartOpen,
  isOpen,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardSliding, setIsCardSliding] = useState(false);

  const handleOpenClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Immediately trigger music playback right as the envelope opens!
    if (onStartOpen) {
      onStartOpen();
    }

    // Step 1: Open envelope top flap
    setIsFlapOpen(true);

    // Step 2: Slide letter card out
    setTimeout(() => {
      setIsCardSliding(true);
    }, 450);

    // Step 3: Complete transition to full wedding website
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  // If already unlocked and animation finished, unmount from view
  if (isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-1000 ${
        isOpen ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        // Soft rose pink background with delicate warm tone
        background: 'linear-gradient(135deg, #FAF0F2 0%, #F8E3E6 50%, #F4D5D7 100%)',
      }}
    >
      {/* Subtle floating rose petal decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[8%] left-[7%] w-7 h-7 rounded-full bg-[#D4A5A5]/30 blur-xs animate-float-slow" />
        <div className="absolute top-[22%] right-[10%] w-9 h-9 rounded-full bg-[#D4A5A5]/25 blur-xs animate-float-slow delay-300" />
        <div className="absolute bottom-[20%] left-[12%] w-6 h-6 rounded-full bg-[#8F9E8B]/30 blur-xs animate-float-slow delay-500" />
        <div className="absolute bottom-[10%] right-[8%] w-8 h-8 rounded-full bg-[#C5A059]/25 blur-xs animate-float-slow delay-200" />
      </div>

      {/* Main Content Area */}
      <div className="relative w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center">
        {/* Header Kicker */}
        <div className="text-center mb-4 sm:mb-6 space-y-1">
          <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#2C3A29] font-bold block">
            Undangan Pernikahan Digital
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1918] tracking-tight">
            The Wedding of <br />
            <span className="font-serif text-[#2C3A29]">Nur</span>{' '}
            <span className="font-script text-3xl sm:text-4xl text-[#B87A7A]">&</span>{' '}
            <span className="font-serif text-[#2C3A29]">Udi</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#2C3A29] font-semibold tracking-wider">
            22 Desember 2026 · Sinjai, Sulawesi Selatan
          </p>
        </div>

        {/* =========================================================================
            3D SAGE GREEN ENVELOPE (Enlarged size)
        ========================================================================= */}
        <div className="relative w-full aspect-[4/3] max-w-[400px] sm:max-w-[450px] md:max-w-[470px] perspective-1000 my-2 select-none">
          
          {/* Inner Letter Card that slides out */}
          <div
            className={`absolute inset-x-4 top-4 bottom-4 bg-[#FAF9F6] rounded-2xl p-4 sm:p-5 border border-[#C5A059]/50 shadow-lg flex flex-col items-center justify-center text-center transition-all duration-700 ${
              isCardSliding ? 'animate-letter-out' : 'z-10'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-[#F0F3EF] flex items-center justify-center mb-1 text-[#8F9E8B] shadow-xs">
              <Heart className="w-5 h-5 fill-[#B87A7A] text-[#B87A7A]" />
            </div>
            <p className="font-serif text-xs uppercase tracking-widest text-[#2C3A29] font-bold">
              Walimatul 'Ursy
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1918] my-0.5">
              Nur &amp; Udi
            </h2>
            <p className="text-xs text-[#2C2A29] font-medium tracking-wider">
              Selasa, 22 Desember 2026
            </p>
            <div className="w-16 h-[1.5px] bg-[#C5A059]/60 my-2" />
            <p className="text-xs text-[#2C3A29] font-semibold">
              Sinjai Utara, Kabupaten Sinjai
            </p>
          </div>

          {/* Envelope Pocket / Back Body (Sage Green) */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#758771] to-[#5C6E58] shadow-2xl border border-[#C5A059]/40 overflow-hidden z-20">
            {/* Soft inner shadow & gold hairline lines */}
            <div className="absolute inset-2 sm:inset-3 rounded-xl border border-white/20 pointer-events-none" />
            
            {/* Diagonal envelope fold lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 360 270"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Left flap triangle */}
              <polygon points="0,0 180,140 0,270" fill="#6E806A" opacity="0.95" />
              {/* Right flap triangle */}
              <polygon points="360,0 180,140 360,270" fill="#677863" opacity="0.95" />
              {/* Bottom flap triangle */}
              <polygon points="0,270 180,135 360,270" fill="#5E6F5A" opacity="0.98" />
              {/* Delicate gold accent seams */}
              <line x1="0" y1="270" x2="180" y2="135" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
              <line x1="360" y1="270" x2="180" y2="135" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
            </svg>

            {/* Recipient Badge on Front of Envelope */}
            <div className="absolute inset-x-6 sm:inset-x-8 bottom-5 sm:bottom-6 z-25 bg-[#FAF9F6]/98 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-[#C5A059]/50 shadow-md text-center">
              <span className="text-[11px] sm:text-xs uppercase font-sans tracking-widest text-[#4A4846] font-semibold block">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#1A1918] leading-tight my-1 truncate px-1">
                {guestName}
              </p>
              <p className="text-[11px] text-[#2C3A29] font-medium italic">
                Mohon maaf apabila ada kesalahan penulisan nama/gelar
              </p>
            </div>
          </div>

          {/* Envelope Top Triangular Flap (Folds Open in 3D) */}
          <div
            className={`absolute top-0 inset-x-0 h-1/2 origin-top transform-style-3d ${
              isFlapOpen ? 'flap-open' : 'flap-closed'
            }`}
          >
            {/* Flap Outer Face */}
            <svg
              className="w-full h-full drop-shadow-lg"
              viewBox="0 0 360 140"
              preserveAspectRatio="none"
              fill="none"
            >
              <polygon points="0,0 180,140 360,0" fill="#7E907A" />
              <line x1="0" y1="0" x2="180" y2="140" stroke="#C5A059" strokeWidth="1.5" opacity="0.6" />
              <line x1="360" y1="0" x2="180" y2="140" stroke="#C5A059" strokeWidth="1.5" opacity="0.6" />
            </svg>

            {/* Gold Wax Seal on the Flap Tip */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#E6D4A5] via-[#C5A059] to-[#8C6B28] border-2 border-[#FFF8EB] shadow-xl flex items-center justify-center text-[#1A1918] transition-transform duration-300 ${
                isAnimating ? 'scale-115 ring-4 ring-[#C5A059]/30' : 'hover:scale-105'
              }`}
            >
              {/* Wax Seal monogram */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#FAF9F6]/60 flex items-center justify-center">
                <span className="font-serif font-bold text-sm sm:text-base tracking-tighter text-[#FAF9F6]">
                  N &amp; U
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button: "Buka Undangan" */}
        <div className="w-full max-w-xs mt-6 sm:mt-7 text-center space-y-2">
          <button
            type="button"
            onClick={handleOpenClick}
            disabled={isAnimating}
            className="w-full group flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-[#5C6E58] hover:bg-[#4F5F4B] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#5C6E58]/35 border border-[#C5A059]/50 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            <MailOpen className="w-5 h-5 text-white transition-transform group-hover:rotate-12" />
            <span>{isAnimating ? 'Membuka Undangan...' : 'Buka Undangan'}</span>
            <Sparkles className="w-4 h-4 text-[#E6D4A5] animate-pulse" />
          </button>

          <p className="text-xs text-[#2C2A29] font-medium flex items-center justify-center gap-1">
            <span>Sentuh tombol untuk membuka amplop &amp; memutar musik</span>
          </p>
        </div>
      </div>
    </div>
  );
};
