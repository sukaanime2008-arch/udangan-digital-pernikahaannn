/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  MailOpen,
  Sparkles,
} from 'lucide-react';
import { FloralBranchTop, GoldDivider, BotanicalCorner } from './components/FloralDecorations';
import { AudioPlayer, AudioPlayerRef } from './components/AudioPlayer';
import { CountdownTimer } from './components/CountdownTimer';
import { LightboxModal, GalleryPhoto } from './components/LightboxModal';
import { GuestbookRSVP } from './components/GuestbookRSVP';
import { FloatingNav } from './components/FloatingNav';
import { EnvelopeCover } from './components/EnvelopeCover';
import { ScrollReveal } from './components/ScrollReveal';
import { GuestLinkGenerator } from './components/GuestLinkGenerator';

// Exact generated image asset paths
const IMAGES = {
  cover: '/src/assets/images/wedding_couple_cover_1794141712367.jpg',
  groom: '/src/assets/images/groom_portrait_1794141714007.jpg',
  bride: '/src/assets/images/bride_portrait_1794141715689.jpg',
  gallery1: '/src/assets/images/gallery_moment_one_1794141714727.jpg',
  gallery2: '/src/assets/images/gallery_details_rings_1794141717014.jpg',
};

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan Yang Berbahagia');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);

  // Read guest name from URL query parameter (e.g. ?to=Bapak+Ahmad or ?guest=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest') || params.get('u');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsUnlocked(true);
    // Smoothly scroll down to greeting section
    setTimeout(() => {
      const el = document.getElementById('cover');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const handleReopenEnvelope = () => {
    setIsUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const weddingAddress =
    'Jl. Ranggong Dg Romo No. 56 B, Lingk. Taipa Kel. Biringere Kec. Sinjai Utara, Kab. Sinjai (Samping Mesjid Khaerussaadah Kalaka)';

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Jl. Ranggong Dg Romo No. 56 B Taipa Biringere Sinjai Utara Kabupaten Sinjai Mesjid Khaerussaadah Kalaka');

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(weddingAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const galleryPhotos: GalleryPhoto[] = [
    {
      src: IMAGES.cover,
      title: 'Nur & Udi',
      caption: 'Harmoni cinta dalam keindahan taman bunga',
    },
    {
      src: IMAGES.gallery1,
      title: 'Langkah Bersama',
      caption: 'Menuju babak baru penuh ridha dan kasih sayang',
    },
    {
      src: IMAGES.gallery2,
      title: 'Ikatan Suci',
      caption: 'Dua cincin tanda komitmen seumur hidup',
    },
    {
      src: IMAGES.bride,
      title: 'Nurhidayah, S.Pd (Nur)',
      caption: 'Mempelai Wanita yang anggun dan berhati mulia',
    },
    {
      src: IMAGES.groom,
      title: "Muh. Saifuddin Assa'diah, S.Hf (Udi)",
      caption: 'Mempelai Pria yang teguh dan penuh tanggung jawab',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#181716] selection:bg-[#D4A5A5]/30 selection:text-[#181716] relative overflow-x-hidden">
      {/* 3D Sage Green Envelope with Soft Rose Pink Background on initial load */}
      <EnvelopeCover
        guestName={guestName}
        onOpen={handleOpenInvitation}
        onStartOpen={() => audioPlayerRef.current?.play()}
        isOpen={isUnlocked}
      />

      {/* Background audio player & music control disc playing user's orchestral MP3 */}
      <AudioPlayer ref={audioPlayerRef} />

      {/* Floating bottom navigation bar (visible after opening invitation) */}
      <FloatingNav isVisible={isUnlocked} />

      {/* Main Single-Column Luxury Wedding Paper Container */}
      <div className="max-w-xl mx-auto min-h-screen bg-[#FAF9F6] shadow-xl shadow-stone-200/50 border-x border-[#8F9E8B]/20 relative">
        
        {/* =========================================================================
            1. COVER SECTION
        ========================================================================= */}
        <section
          id="cover"
          className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 py-12 text-center overflow-hidden"
        >
          {/* Subtle floral watermark corners */}
          <BotanicalCorner position="top-left" className="absolute top-2 left-2" />
          <BotanicalCorner position="top-right" className="absolute top-2 right-2" />

          {/* Top Header */}
          <ScrollReveal delay={50} className="w-full pt-2 space-y-2 z-10">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#2C3A29] font-bold">
              Save The Date
            </span>
            <div className="flex items-center justify-center gap-2 text-xs font-serif tracking-widest text-[#B8860B] font-semibold">
              <span className="w-8 h-[1px] bg-[#B8860B]/50" />
              <span>22 Desember 2026</span>
              <span className="w-8 h-[1px] bg-[#B8860B]/50" />
            </div>
          </ScrollReveal>

          {/* Center Large Arch Frame Image */}
          <ScrollReveal delay={150} className="relative my-6 z-10">
            {/* Outer Decorative Gold Halo Border - Grand Size */}
            <div className="w-[88vw] max-w-[360px] sm:max-w-[420px] md:max-w-[460px] h-[500px] sm:h-[580px] md:h-[620px] arch-frame p-3 sm:p-4 bg-gradient-to-b from-[#C5A059]/40 via-[#D4A5A5]/30 to-[#8F9E8B]/30 shadow-2xl transition-all duration-500">
              {/* Inner White/Off-White Matte with Double Border */}
              <div className="w-full h-full arch-frame p-2 sm:p-2.5 bg-[#FAF9F6] border border-[#C5A059]/50 shadow-inner">
                {/* Photo Arch Frame */}
                <div className="w-full h-full arch-frame overflow-hidden relative group shadow-sm">
                  <img
                    src={IMAGES.cover}
                    alt="The Wedding of Nur & Udi"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

                  {/* Subtle inner gold arch hairline */}
                  <div className="absolute inset-2 arch-frame border border-white/20 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Floating floral accent badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#C5A059]/70 shadow-md flex items-center gap-1.5 text-[#181716] text-xs font-serif tracking-wider whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="font-bold">Walimatul 'Ursy</span>
            </div>
          </ScrollReveal>

          {/* Title & Couple Names */}
          <ScrollReveal delay={200} className="space-y-3 z-10 mt-3 mb-2">
            <p className="text-xs font-serif tracking-widest text-[#383634] uppercase font-bold">
              The Wedding of
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#181716] tracking-tight">
              Nur <span className="font-script text-3xl sm:text-4xl text-[#B87A7A] mx-1">&</span> Udi
            </h1>
            <p className="text-xs text-[#2C3A29] tracking-wide font-sans font-bold">
              Selasa, 22 Desember 2026 · Sinjai, Sulawesi Selatan
            </p>
          </ScrollReveal>

          {/* Guest Personalization Card & Reopen Envelope Trigger */}
          <ScrollReveal delay={250} className="w-full max-w-sm mt-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#8F9E8B]/35 shadow-xs z-10 space-y-3">
            <p className="text-[11px] uppercase tracking-wider text-[#383634] font-semibold">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#181716] leading-snug px-2">
              {guestName}
            </h2>
            <p className="text-[11px] text-[#383634] italic font-medium">
              *Merupakan suatu kehormatan bagi kami atas kehadiran dan doa restu Anda
            </p>

            <div className="pt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('mempelai');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#5C6E58] hover:bg-[#4F5F4B] text-white font-bold text-sm shadow-md shadow-[#5C6E58]/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <span>Lihat Informasi Pernikahan</span>
              </button>

              <button
                type="button"
                onClick={handleReopenEnvelope}
                className="inline-flex items-center justify-center gap-1.5 py-1.5 text-xs text-[#2C3A29] hover:text-[#181716] font-semibold transition-colors"
              >
                <MailOpen className="w-3.5 h-3.5" />
                <span>Buka Kembali Amplop Pembuka</span>
              </button>
            </div>
          </ScrollReveal>

          <BotanicalCorner position="bottom-left" className="absolute bottom-2 left-2" />
          <BotanicalCorner position="bottom-right" className="absolute bottom-2 right-2" />
        </section>

        {/* Divider Ornament */}
        <div className="px-6 py-2">
          <FloralBranchTop />
        </div>

        {/* =========================================================================
            2. SECTION MEMPELAI (THE COUPLE)
        ========================================================================= */}
        <section id="mempelai" className="px-6 py-12 scroll-mt-6 text-center space-y-12">
          {/* Islamic Greeting & Official Opening Quote with Grand Gold Basmalah */}
          <ScrollReveal delay={100} className="max-w-md mx-auto space-y-4">
            {/* Grand Golden Basmalah Calligraphy */}
            <div className="py-2 space-y-1">
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-[#B8860B] drop-shadow-xs block leading-relaxed">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="w-8 sm:w-12 h-[1.5px] bg-[#B8860B]/60" />
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#B8860B] italic tracking-wide">
                  Bismillahirrohmanirrohim
                </p>
                <span className="w-8 sm:w-12 h-[1.5px] bg-[#B8860B]/60" />
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#F0F3EF]/90 border border-[#8F9E8B]/35 text-center space-y-2 mt-4 shadow-xs">
              <p className="font-serif text-sm sm:text-base text-[#181716] italic leading-relaxed font-semibold">
                “Maha Suci Allah yang telah menciptakan makhluk-Nya berpasangan-pasangan. Ya Allah dengan Ridho-Mu perkenankanlah kami menikahkah putra-putri kami:”
              </p>
            </div>
          </ScrollReveal>

          <GoldDivider />

          {/* Mempelai Wanita (Bride) - First */}
          <ScrollReveal delay={150} className="w-full max-w-md mx-auto flex flex-col items-center">
            {/* Grand Arch Frame seukuran bingkai gambar paling atas */}
            <div className="w-[88vw] max-w-[360px] sm:max-w-[420px] md:max-w-[460px] h-[500px] sm:h-[580px] md:h-[620px] arch-frame p-3 sm:p-4 bg-gradient-to-b from-[#D4A5A5]/45 via-[#C5A059]/30 to-[#FAF9F6] shadow-2xl mb-6 relative">
              <div className="w-full h-full arch-frame p-2 sm:p-2.5 bg-[#FAF9F6] border border-[#D4A5A5]/50 shadow-inner">
                <div className="w-full h-full arch-frame overflow-hidden relative group shadow-sm">
                  <img
                    src={IMAGES.bride}
                    alt="Nurhidayah, S.Pd (Nur)"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-2 arch-frame border border-white/25 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Info Mempelai Wanita */}
            <div className="w-full max-w-sm px-4 text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B87A7A] font-bold block">
                Mempelai Wanita
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#181716]">
                Nurhidayah, S.Pd (Nur)
              </h3>
              <p className="text-xs sm:text-sm text-[#252423] leading-relaxed max-w-xs mx-auto font-semibold">
                (Putri Pertama dari Bapak A. Muh. Taslim &amp; Ibu Darniati Damang)
              </p>
            </div>
          </ScrollReveal>

          {/* "Dengan" Floral Transition Badge */}
          <ScrollReveal delay={100} className="flex items-center justify-center my-6">
            <div className="px-6 py-2 rounded-full bg-[#FAF9F6] border border-[#C5A059]/60 shadow-xs flex items-center justify-center">
              <span className="font-serif italic text-lg sm:text-xl text-[#B8860B] font-bold tracking-wider">
                Dengan
              </span>
            </div>
          </ScrollReveal>

          {/* Mempelai Pria (Groom) - Second */}
          <ScrollReveal delay={150} className="w-full max-w-md mx-auto flex flex-col items-center">
            {/* Grand Arch Frame seukuran bingkai gambar paling atas */}
            <div className="w-[88vw] max-w-[360px] sm:max-w-[420px] md:max-w-[460px] h-[500px] sm:h-[580px] md:h-[620px] arch-frame p-3 sm:p-4 bg-gradient-to-b from-[#8F9E8B]/45 via-[#C5A059]/30 to-[#FAF9F6] shadow-2xl mb-6 relative">
              <div className="w-full h-full arch-frame p-2 sm:p-2.5 bg-[#FAF9F6] border border-[#8F9E8B]/50 shadow-inner">
                <div className="w-full h-full arch-frame overflow-hidden relative group shadow-sm">
                  <img
                    src={IMAGES.groom}
                    alt="Muh. Saifuddin Assa'diah, S.Hf (Udi)"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-2 arch-frame border border-white/25 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Info Mempelai Pria */}
            <div className="w-full max-w-sm px-4 text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#2C3A29] font-bold block">
                Mempelai Pria
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#181716]">
                Muh. Saifuddin Assa'diah, S.Hf (Udi)
              </h3>
              <p className="text-xs sm:text-sm text-[#252423] leading-relaxed max-w-xs mx-auto font-semibold">
                (Putra Pertama dari Bapak As'ad Mustamin BA dan Ibu Dra. Ruhbiah Hasan)
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            3. SECTION ACARA (EVENT & LOCATION)
        ========================================================================= */}
        <section id="acara" className="px-6 py-12 scroll-mt-6 bg-[#FAF9F6] text-center space-y-8">
          <ScrollReveal delay={100} className="max-w-md mx-auto space-y-3">
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#181716]">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className="text-xs sm:text-sm text-[#252423] leading-relaxed font-medium">
              Dengan Memohon Ridho dan Rahmat Allah Swt. kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami Yang InsyaAllah akan di selenggarakan pada :
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
            {/* Card Akad Nikah */}
            <ScrollReveal delay={150} className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#8F9E8B]/35 shadow-sm relative">
              <div className="w-12 h-12 rounded-full bg-[#F0F3EF] text-[#2C3A29] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Heart className="w-6 h-6 text-[#5C6E58]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#181716]">
                Akad Nikah
              </h3>
              <div className="w-12 h-[1.5px] bg-[#B8860B] mx-auto my-3" />

              <div className="space-y-3 text-xs sm:text-sm text-[#252423]">
                <div className="flex items-center justify-center gap-2 text-[#181716] font-bold">
                  <Calendar className="w-4 h-4 text-[#5C6E58]" />
                  <span>Selasa, 22 Desember 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#2C3A29] font-bold">
                  <Clock className="w-4 h-4 text-[#B8860B]" />
                  <span>Pukul 09.00 Wita</span>
                </div>
                <div className="pt-1 text-[#181716] text-xs">
                  Bertempat di:
                  <br />
                  <strong className="text-sm font-serif font-bold text-[#2C3A29]">Di Kediaman Mempelai Wanita</strong>
                </div>
              </div>
            </ScrollReveal>

            {/* Card Resepsi */}
            <ScrollReveal delay={200} className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#D4A5A5]/40 shadow-sm relative">
              <div className="w-12 h-12 rounded-full bg-[#F7EFEF] text-[#B87A7A] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Sparkles className="w-6 h-6 text-[#B87A7A]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#181716]">
                Resepsi Pernikahan
              </h3>
              <div className="w-12 h-[1.5px] bg-[#B8860B] mx-auto my-3" />

              <div className="space-y-3 text-xs sm:text-sm text-[#252423]">
                <div className="flex items-center justify-center gap-2 text-[#181716] font-bold">
                  <Calendar className="w-4 h-4 text-[#B87A7A]" />
                  <span>Selasa, 22 Desember 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#2C3A29] font-bold">
                  <Clock className="w-4 h-4 text-[#B8860B]" />
                  <span>Pukul 11.00 WITA s/d Selesai</span>
                </div>
                <div className="pt-1 text-[#181716] text-xs">
                  Bertempat di:
                  <br />
                  <strong className="text-sm font-serif font-bold text-[#8A5858]">Di Kediaman Mempelai Wanita</strong>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Location Details Card */}
          <ScrollReveal delay={250} className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#C5A059]/40 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-2 text-[#2C3A29]">
              <MapPin className="w-5 h-5 text-[#B8860B] shrink-0" />
              <h3 className="font-serif text-xl font-bold text-[#181716]">
                Lokasi Acara
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#181716] font-bold mb-1">
              Kediaman Mempelai Wanita
            </p>
            <p className="text-xs sm:text-sm text-[#252423] leading-relaxed mb-5 font-semibold">
              {weddingAddress}
            </p>

            {/* Stylized Map Viewport Card */}
            <div className="w-full h-36 rounded-2xl bg-[#F0F3EF] border border-[#8F9E8B]/40 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-[#B87A7A] animate-bounce" />
              </div>
              <p className="font-serif text-base font-bold text-[#181716]">
                Taipa, Biringere, Sinjai Utara
              </p>
              <p className="text-xs text-[#2C3A29] font-medium">Kabupaten Sinjai, Sulawesi Selatan</p>
            </div>

            {/* Action Buttons: Google Maps & Copy Address */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5C6E58] hover:bg-[#4F5F4B] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka di Google Maps</span>
              </a>

              <button
                type="button"
                onClick={copyAddressToClipboard}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-[#181716] text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98]"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-600" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* Divider Ornament */}
        <div className="px-6 py-2">
          <FloralBranchTop />
        </div>

        {/* =========================================================================
            4. SECTION GALERI & COUNTDOWN
        ========================================================================= */}
        <section id="galeri" className="px-6 py-12 scroll-mt-6 text-center space-y-10">
          {/* Countdown Area */}
          <ScrollReveal delay={100} className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#2C3A29] font-bold">
              Menghitung Hari
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#181716]">
              Hitung Mundur Acara
            </h2>
            <p className="text-xs text-[#252423] max-w-sm mx-auto font-medium">
              Setiap detik menuju ikatan suci yang dinantikan bersama keluarga dan para sahabat
            </p>

            <div className="pt-4">
              <CountdownTimer />
            </div>
          </ScrollReveal>

          <GoldDivider />

          {/* Galeri Foto */}
          <div className="space-y-4">
            <ScrollReveal delay={100}>
              <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#B87A7A] font-bold">
                Memori Indah
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#181716] mt-1">
                Galeri Foto
              </h2>
              <p className="text-xs text-[#252423] mt-1 font-medium">
                Ketuk foto untuk melihat dalam resolusi penuh
              </p>
            </ScrollReveal>

            {/* Photo Mosaic Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
              {/* Large Feature Photo */}
              <ScrollReveal delay={150} className="col-span-2">
                <div
                  onClick={() => setActivePhotoIndex(0)}
                  className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group shadow-sm border border-[#8F9E8B]/30"
                >
                  <img
                    src={IMAGES.cover}
                    alt={galleryPhotos[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 text-left">
                    <div>
                      <p className="font-serif text-lg font-bold text-white">
                        {galleryPhotos[0].title}
                      </p>
                      <p className="text-xs text-white/90 font-medium">{galleryPhotos[0].caption}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Secondary Photos */}
              <ScrollReveal delay={200} className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200">
                <div
                  onClick={() => setActivePhotoIndex(1)}
                  className="w-full h-full"
                >
                  <img
                    src={IMAGES.gallery1}
                    alt={galleryPhotos[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={250} className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200">
                <div
                  onClick={() => setActivePhotoIndex(2)}
                  className="w-full h-full"
                >
                  <img
                    src={IMAGES.gallery2}
                    alt={galleryPhotos[2].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200">
                <div
                  onClick={() => setActivePhotoIndex(3)}
                  className="w-full h-full"
                >
                  <img
                    src={IMAGES.bride}
                    alt={galleryPhotos[3].title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={350} className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200">
                <div
                  onClick={() => setActivePhotoIndex(4)}
                  className="w-full h-full"
                >
                  <img
                    src={IMAGES.groom}
                    alt={galleryPhotos[4].title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Love Story Snippet */}
          <ScrollReveal delay={150} className="max-w-md mx-auto p-6 rounded-3xl bg-white/90 border border-[#8F9E8B]/30 text-left space-y-4 shadow-xs">
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-widest text-[#2C3A29] font-bold">
                Kisah Kami
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#181716]">
                Perjalanan Menuju Halal
              </h3>
            </div>

            <div className="space-y-4 text-xs text-[#252423] relative pl-4 border-l-2 border-[#5C6E58]/50">
              <div>
                <span className="font-bold text-[#2C3A29] block text-xs">2022 · Awal Pertemuan</span>
                <p className="mt-0.5 leading-relaxed font-medium">
                  Berawal dari pertemuan sederhana dan silaturahmi yang menumbuhkan rasa saling mengagumi
                  dan menghargai visi hidup satu sama lain.
                </p>
              </div>

              <div>
                <span className="font-bold text-[#2C3A29] block text-xs">2025 · Lamaran &amp; Komitmen</span>
                <p className="mt-0.5 leading-relaxed font-medium">
                  Dengan niat tulus beribadah menyempurnakan separuh agama, keluarga besar kedua mempelai
                  bertemu untuk merajut ikatan silaturahmi resmi.
                </p>
              </div>

              <div>
                <span className="font-bold text-[#2C3A29] block text-xs">2026 · Menuju Pelaminan</span>
                <p className="mt-0.5 leading-relaxed font-medium">
                  Hari yang kami nanti akhirnya tiba. Memulai babak baru dalam bingkai pernikahan yang
                  penuh berkah dan cinta.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Lightbox Modal for gallery photo viewing */}
        <LightboxModal
          photos={galleryPhotos}
          currentIndex={activePhotoIndex}
          onClose={() => setActivePhotoIndex(null)}
          onSelectIndex={(index) => setActivePhotoIndex(index)}
        />

        {/* =========================================================================
            5. GUESTBOOK & RSVP (DOA RESTU)
        ========================================================================= */}
        <section id="doa" className="px-6 py-10 scroll-mt-6 text-center">
          <ScrollReveal delay={100}>
            <GuestbookRSVP initialGuestName={guestName !== 'Tamu Undangan Yang Berbahagia' ? guestName : ''} />
          </ScrollReveal>
        </section>

        {/* =========================================================================
            6. SECTION PENUTUP (CLOSING & HORMAT KAMI YANG MENGUNDANG)
        ========================================================================= */}
        <section className="px-6 pt-8 pb-28 text-center space-y-8 bg-[#FAF9F6]">
          <FloralBranchTop />

          <ScrollReveal delay={100} className="max-w-md mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#2C3A29] font-bold">
              Ungkapan Hormat
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#181716]">
              Hormat Kami Yang Mengundang
            </h3>
            <p className="text-xs text-[#252423] font-medium">
              Keluarga Besar &amp; Segenap Handai Taulan:
            </p>

            {/* Structured Clean Family List Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#8F9E8B]/30 shadow-xs text-left space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#181716]">
                <div className="flex items-start gap-2">
                  <span className="text-[#B8860B] font-bold">•</span>
                  <span className="font-semibold">A. Muh. Taslim Djafar / Darniati Damang</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#B8860B] font-bold">•</span>
                  <span className="font-semibold">Hj. A. Nursiah Djafar, S.Pd / A. Ardah Djafar, S.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">H.A. Muh. Amin Kasim, S.Ag.,M.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">H. Iskandar, S.Ag.,M.H</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Drs. Abdul Rasyid</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">A. Abdul Malik, S.Ag.,S.Pd.,M.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Firman Taha, S.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Ilyas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Muh. Amin Tahir, S.Sos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Abd. Hamid, S.Pd.,SD</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Drs. A. Dewan Dapi, M.H</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Mustamin</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Muh. Risal Akib, S.Sos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Muh. Hatta Suyuti</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">G.r Amar Ma'ruf, S.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#5C6E58] font-bold">•</span>
                  <span className="font-medium">Sabaruddin Damang</span>
                </div>
              </div>

              {/* Special Highlighted Big Families */}
              <div className="pt-3 border-t border-stone-200/80 space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F0F3EF]/90 border border-[#8F9E8B]/35 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5C6E58]" />
                  <span className="font-serif font-bold text-sm sm:text-base text-[#181716]">
                    Keluarga Besar Andi Mandasini Petta Wawo
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7EFEF]/90 border border-[#D4A5A5]/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B87A7A]" />
                  <span className="font-serif font-bold text-sm sm:text-base text-[#181716]">
                    Keluarga Besar Puang Damang (Alm) / Andi Hasni (Almh)
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#C5A059]/60 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                    <span className="font-serif font-bold text-base text-[#181716]">
                      Kedua Mempelai
                    </span>
                  </div>
                  <span className="font-script text-2xl text-[#B8860B] font-bold">Nur &amp; Udi</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="max-w-md mx-auto pt-4 space-y-4">
            <p className="text-xs sm:text-sm text-[#252423] leading-relaxed font-semibold">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
            </p>
            <p className="font-serif text-base sm:text-lg font-bold text-[#181716]">
              Wassalamu'alaikum Warahmatullahi Wabarakatuh
            </p>

            <div className="pt-2">
              <p className="text-xs font-serif uppercase tracking-widest text-[#2C3A29] font-bold">
                Kami yang berbahagia,
              </p>
              <h4 className="font-script text-4xl sm:text-5xl text-[#B8860B] mt-2">
                Nur &amp; Udi
              </h4>
            </div>
          </ScrollReveal>

          {/* Guest Link Generator Panel for Bride/Groom & Committee */}
          <ScrollReveal delay={250} className="pt-4">
            <GuestLinkGenerator baseUrl="https://undanganpernikahannurudi.vercel.app/" />
          </ScrollReveal>

          {/* Simple Clean Footer */}
          <div className="pt-10 pb-4 text-center border-t border-stone-200/80">
            <p className="text-xs text-stone-500 font-sans tracking-wide font-medium">
              The Wedding of Nurhidayah &amp; Muh. Saifuddin · Sinjai, 22 Desember 2026
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
