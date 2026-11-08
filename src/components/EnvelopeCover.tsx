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
        <div className="absolute bottom-[20%] left-[12%] w-7 h-7 rounded-full bg-[#8FA9C4]/35 blur-xs animate-float-slow delay-500" />
        <div className="absolute bottom-[10%] right-[8%] w-8 h-8 rounded-full bg-[#C5A059]/25 blur-xs animate-float-slow delay-200" />
      </div>

      {/* Main Content Area */}
      <div className="relative w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center">
        {/* Header Kicker */}
        <div className="text-center mb-4 sm:mb-6 space-y-1">
          <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#000080] font-extrabold block">
            Undangan Pernikahan Digital
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1918] tracking-tight">
            The Wedding of <br />
            <span className="font-serif text-[#000080]">Nur</span>{' '}
            <span className="font-script text-3xl sm:text-4xl text-[#B87A7A]">&amp;</span>{' '}
            <span className="font-serif text-[#000080]">Udi</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#252423] font-semibold tracking-wider">
            22 Desember 2026 · Sinjai, Sulawesi Selatan
          </p>
        </div>

        {/* =========================================================================
            3D PASTEL BLUE ENVELOPE (Enlarged size)
        ========================================================================= */}
        <div className="relative w-full aspect-[4/3] max-w-[400px] sm:max-w-[450px] md:max-w-[470px] perspective-1000 my-2 select-none">
          
          {/* Inner Letter Card that slides out */}
          <div
            className={`absolute inset-x-4 top-4 bottom-4 bg-[#FAF9F6] rounded-2xl p-4 sm:p-5 border border-[#C5A059]/60 shadow-lg flex flex-col items-center justify-center text-center transition-all duration-700 ${
              isCardSliding ? 'animate-letter-out' : 'z-10'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-[#EBF3FA] flex items-center justify-center mb-1 text-[#000080] shadow-xs">
              <Heart className="w-5 h-5 fill-[#B87A7A] text-[#B87A7A]" />
            </div>
            <p className="font-serif text-xs uppercase tracking-widest text-[#000080] font-bold">
              Walimatul 'Ursy
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1918] my-0.5">
              Nur &amp; Udi
            </h2>
            <p className="text-xs text-[#2C2A29] font-medium tracking-wider">
              Selasa, 22 Desember 2026
            </p>
            <div className="w-16 h-[1.5px] bg-[#C5A059]/80 my-2" />
            <p className="text-xs text-[#000080] font-bold">
              Sinjai Utara, Kabupaten Sinjai
            </p>
          </div>

          {/* Envelope Pocket / Back Body (Pastel Blue) */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#8FA9C4] via-[#7B9CB9] to-[#6387A5] shadow-2xl border border-[#C5A059]/50 overflow-hidden z-20">
            {/* Soft inner shadow & gold hairline lines */}
            <div className="absolute inset-2 sm:inset-3 rounded-xl border border-white/30 pointer-events-none" />
            
            {/* Diagonal envelope fold lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 360 270"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Left flap triangle */}
              <polygon points="0,0 180,140 0,270" fill="#84A2BD" opacity="0.95" />
              {/* Right flap triangle */}
              <polygon points="360,0 180,140 360,270" fill="#7897B4" opacity="0.95" />
              {/* Bottom flap triangle */}
              <polygon points="0,270 180,135 360,270" fill="#6A8CA9" opacity="0.98" />
              {/* Delicate gold accent seams */}
              <line x1="0" y1="270" x2="180" y2="135" stroke="#C5A059" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.75" />
              <line x1="360" y1="270" x2="180" y2="135" stroke="#C5A059" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.75" />
            </svg>

            {/* Recipient Badge on Front of Envelope (Enlarged prominent font) */}
            <div className="absolute inset-x-5 sm:inset-x-7 bottom-4 sm:bottom-5 z-25 bg-[#FAF9F6]/98 backdrop-blur-xs rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border-2 border-[#C5A059] shadow-lg text-center">
              <span className="text-[10px] sm:text-xs uppercase font-sans tracking-widest text-[#000080] font-extrabold block">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-extrabold text-[#000080] leading-snug my-1 px-1 drop-shadow-xs">
                {guestName}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#4A5568] font-medium italic">
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
              <polygon points="0,0 180,140 360,0" fill="#93B0CC" />
              <line x1="0" y1="0" x2="180" y2="140" stroke="#C5A059" strokeWidth="1.5" opacity="0.75" />
              <line x1="360" y1="0" x2="180" y2="140" stroke="#C5A059" strokeWidth="1.5" opacity="0.75" />
            </svg>

            {/* Circular Photo Frame on Envelope Flap with Floral Wreath Accent */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[10px] sm:top-[14px] flex items-center justify-center pointer-events-none select-none z-20">
              {/* Watercolor Floral Wreath SVG in Pastel Blue & Navy */}
              <div className="absolute w-[116px] h-[116px] sm:w-[136px] sm:h-[136px] pointer-events-none -z-0">
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-sm" fill="none">
                  {/* Delicate Gold Vine Arc */}
                  <circle cx="80" cy="80" r="54" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
                  
                  {/* Top floral cluster */}
                  <g transform="translate(80, 26)">
                    <circle cx="0" cy="0" r="5" fill="#8FA9C4" />
                    <circle cx="-5" cy="-2" r="3.5" fill="#BAE6FD" />
                    <circle cx="5" cy="-2" r="3.5" fill="#A3BED8" />
                    <circle cx="0" cy="-6" r="3.5" fill="#000080" />
                    <circle cx="0" cy="0" r="2" fill="#C5A059" />
                  </g>
                  {/* Left floral cluster */}
                  <g transform="translate(26, 80) rotate(-45)">
                    <ellipse cx="-4" cy="-3" rx="6" ry="3.5" fill="#8FA9C4" transform="rotate(-30)" />
                    <ellipse cx="-2" cy="4" rx="5" ry="3" fill="#000080" transform="rotate(20)" />
                    <circle cx="4" cy="0" r="4.5" fill="#BAE6FD" />
                    <circle cx="4" cy="0" r="1.8" fill="#C5A059" />
                    <path d="M-8,-8 Q-4,-12 0,-10" stroke="#C5A059" strokeWidth="1" fill="none" />
                  </g>
                  {/* Right floral cluster */}
                  <g transform="translate(134, 80) rotate(45)">
                    <ellipse cx="4" cy="-3" rx="6" ry="3.5" fill="#8FA9C4" transform="rotate(30)" />
                    <ellipse cx="2" cy="4" rx="5" ry="3" fill="#000080" transform="rotate(-20)" />
                    <circle cx="-4" cy="0" r="4.5" fill="#BAE6FD" />
                    <circle cx="-4" cy="0" r="1.8" fill="#C5A059" />
                    <path d="M8,-8 Q4,-12 0,-10" stroke="#C5A059" strokeWidth="1" fill="none" />
                  </g>
                  {/* Bottom leaf accents */}
                  <g transform="translate(50, 128) rotate(35)">
                    <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#8FA9C4" />
                    <ellipse cx="4" cy="-4" rx="5" ry="2" fill="#000080" opacity="0.85" />
                  </g>
                  <g transform="translate(110, 128) rotate(-35)">
                    <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#8FA9C4" />
                    <ellipse cx="-4" cy="-4" rx="5" ry="2" fill="#000080" opacity="0.85" />
                  </g>
                </svg>
              </div>

              {/* Circular Gold Border Photo Frame */}
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full p-[2.5px] bg-gradient-to-tr from-[#C5A059] via-[#FFF3D6] to-[#9E7E3E] shadow-md z-10">
                <div className="w-full h-full rounded-full overflow-hidden border border-white/70 bg-[#FAF9F6]">
                  <img
                    src="/assets/foto-pasangan.jpg"
                    alt="Foto Pasangan Nur & Udi"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/hero.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Gold Wax Seal on the Flap Tip */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#E6D4A5] via-[#C5A059] to-[#8C6B28] border-2 border-[#FFF8EB] shadow-xl flex items-center justify-center text-[#1A1918] transition-transform duration-300 z-30 ${
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

        {/* Primary Action Button: "Buka Undangan" (Pastel Blue Elegance) */}
        <div className="w-full max-w-xs mt-6 sm:mt-7 text-center space-y-2">
          <button
            type="button"
            onClick={handleOpenClick}
            disabled={isAnimating}
            className="w-full group flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-gradient-to-r from-[#6387A5] to-[#4F7391] hover:from-[#547896] hover:to-[#416480] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#6387A5]/40 border-2 border-[#C5A059] transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            <MailOpen className="w-5 h-5 text-[#E6D4A5] transition-transform group-hover:rotate-12" />
            <span>{isAnimating ? 'Membuka Undangan...' : 'Buka Undangan'}</span>
            <Sparkles className="w-4 h-4 text-[#E6D4A5] animate-pulse" />
          </button>

          <p className="text-xs text-[#252423] font-medium flex items-center justify-center gap-1">
            <span>Sentuh tombol untuk membuka amplop &amp; memutar musik</span>
          </p>
        </div>
      </div>
    </div>
  );
};
