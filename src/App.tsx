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
  Lock,
  X,
  AlertCircle,
  CreditCard,
  Gift,
  Wallet,
  ChevronDown,
  ChevronUp,
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

// Image assets stored cleanly in assets/
const IMAGES = {
  cover: '/assets/foto-pasangan.jpg',
  groom: '/assets/aistudio/kkl_5cb94ce9.png', // Foto Mempelai Pria (Muh. Saifuddin Assa'diah)
  bride: '/assets/aistudio/pere_4537ba05.png', // Foto Mempelai Wanita (Nurhidayah)
  galeri1: '/assets/galeri-1.jpg', // Landscape (Seated on grass)
  galeri2: '/assets/galeri-2.jpg', // Portrait 1 (Standing under tree)
  galeri3: '/assets/galeri-3.jpg', // Portrait 2 (Side angle gentle smile)
  galeri4: '/assets/galeri-4.jpg', // Portrait 3 (Leaning on tree trunk)
  galeri5: '/assets/galeri-5.jpg', // Portrait 4 (Medium shot smiling)
};

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan Yang Berbahagia');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedDana, setCopiedDana] = useState(false);
  const [copiedBri, setCopiedBri] = useState(false);
  const [showBriDetails, setShowBriDetails] = useState(false);
  const [showDanaDetails, setShowDanaDetails] = useState(false);
  const [showGuestGenerator, setShowGuestGenerator] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const audioPlayerRef = useRef<AudioPlayerRef>(null);

  const copyDana = () => {
    navigator.clipboard.writeText('081524482262');
    setCopiedDana(true);
    setTimeout(() => setCopiedDana(false), 2500);
  };

  const copyBri = () => {
    navigator.clipboard.writeText('025801031111530');
    setCopiedBri(true);
    setTimeout(() => setCopiedBri(false), 2500);
  };

  const handleTriggerFooterGenerator = () => {
    if (showGuestGenerator) {
      // Jika panel sedang terbuka, klik akan menutup panel
      setShowGuestGenerator(false);
    } else {
      // Tampilkan popup input sandi
      setPasswordInput('');
      setPasswordError('');
      setShowPasswordModal(true);
    }
  };

  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPassword = passwordInput.trim().toLowerCase();
    if (cleanPassword === 'waliwali') {
      setShowPasswordModal(false);
      setPasswordError('');
      setPasswordInput('');
      setShowGuestGenerator(true);
      setTimeout(() => {
        const el = document.getElementById('guest-generator-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      setPasswordError('Sandi salah! Silakan coba lagi.');
    }
  };

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

  // 5 Gallery Photos as requested: Foto 1 (Landscape), Foto 2-5 (Portrait)
  const galleryPhotos: GalleryPhoto[] = [
    {
      src: IMAGES.galeri1,
      title: 'Kebersamaan & Kehangatan',
      caption: 'Duduk berdampingan merajut mimpi di hamparan rasa syukur',
    },
    {
      src: IMAGES.galeri2,
      title: 'Langkah Bersama',
      caption: 'Menatap masa depan penuh berkah di bawah rindangnya doa',
    },
    {
      src: IMAGES.galeri3,
      title: 'Senyuman Kasih',
      caption: 'Kelembutan hati yang menyinari setiap detik penantian',
    },
    {
      src: IMAGES.galeri4,
      title: 'Keteguhan Hati',
      caption: 'Sandaran cinta yang kokoh dalam ikrar suci pernikahan',
    },
    {
      src: IMAGES.galeri5,
      title: 'Dua Jiwa Satu Tujuan',
      caption: 'Menyempurnakan separuh agama dalam ikatan sakinah mawaddah warahmah',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#181716] selection:bg-[#D4A5A5]/30 selection:text-[#181716] relative overflow-x-hidden">
      {/* 3D Pastel Blue Envelope with Soft Rose Pink Background on initial load */}
      <EnvelopeCover
        guestName={guestName}
        isOpen={isUnlocked}
        onOpen={handleOpenInvitation}
        onStartOpen={() => {
          if (audioPlayerRef.current) {
            audioPlayerRef.current.play();
          }
        }}
      />

      {/* Background audio player & music control disc playing user's orchestral MP3 */}
      <AudioPlayer ref={audioPlayerRef} />

      {/* Floating bottom navigation bar (visible after opening invitation) */}
      <FloatingNav isVisible={isUnlocked} />

      {/* Main Single-Column Luxury Wedding Paper Container */}
      <div className="max-w-xl mx-auto min-h-screen bg-[#FAF9F6] shadow-xl shadow-stone-200/50 border-x border-[#8FA9C4]/25 relative">
        
        {/* =========================================================================
            1. COVER SECTION
        ========================================================================= */}
        <section
          id="cover"
          className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 pt-3 sm:pt-6 pb-8 text-center overflow-hidden"
        >
          {/* Subtle floral watercolor corners */}
          <BotanicalCorner position="top-left" className="absolute top-2 left-2" />
          <BotanicalCorner position="top-right" className="absolute top-2 right-2" />

          {/* Top Header */}
          <ScrollReveal delay={50} className="w-full pt-1 space-y-1 z-10">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-sans text-[#000080] font-extrabold">
              Save The Date
            </span>
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-serif tracking-widest text-[#B8860B] font-semibold">
              <span className="w-6 sm:w-8 h-[1px] bg-[#B8860B]/50" />
              <span>22 Desember 2026</span>
              <span className="w-6 sm:w-8 h-[1px] bg-[#B8860B]/50" />
            </div>
          </ScrollReveal>

          {/* Center Arch Frame Image (Photo of the Couple) */}
          <ScrollReveal delay={150} className="relative my-2 sm:my-3 z-10">
            {/* Outer Decorative Gold Halo Border - Proportionate for mobile first frame */}
            <div className="w-[76vw] max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-[330px] sm:h-[420px] md:h-[460px] arch-frame p-2.5 sm:p-3.5 bg-gradient-to-b from-[#C5A059]/40 via-[#D4A5A5]/30 to-[#8FA9C4]/35 shadow-xl transition-all duration-500">
              {/* Inner Matte with Double Border */}
              <div className="w-full h-full arch-frame p-2 sm:p-2.5 bg-[#FAF9F6] border border-[#C5A059]/50 shadow-inner">
                {/* Photo Arch Frame - object-cover with face focus */}
                <div className="w-full h-full arch-frame overflow-hidden relative group shadow-sm">
                  <img
                    src={IMAGES.cover}
                    alt="The Wedding of Nur & Udi"
                    className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-2 arch-frame border border-white/20 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Floating floral accent badge */}
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FAF9F6] border border-[#C5A059]/70 shadow-md flex items-center gap-1.5 text-[#181716] text-[11px] sm:text-xs font-serif tracking-wider whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-[#B8860B]" />
              <span className="font-bold">Walimatul 'Ursy</span>
            </div>
          </ScrollReveal>

          {/* Title & Couple Names - Prominent in first frame of mobile screens */}
          <ScrollReveal delay={200} className="space-y-1.5 z-10 mt-1 mb-2">
            <p className="text-[11px] sm:text-xs font-serif tracking-widest text-[#000080] uppercase font-bold">
              The Wedding of
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#181716] tracking-tight leading-tight">
              Nur <span className="font-script text-2xl sm:text-3xl text-[#B87A7A] mx-0.5">&</span> Udi
            </h1>
            <p className="text-[11px] sm:text-xs text-[#000080] tracking-wide font-sans font-bold">
              Selasa, 22 Desember 2026 · Sinjai, Sulawesi Selatan
            </p>
          </ScrollReveal>

          {/* Guest Personalization Card & Reopen Envelope Trigger */}
          <ScrollReveal delay={250} className="w-full max-w-sm mt-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#8FA9C4]/40 shadow-xs z-10 space-y-3">
            <p className="text-[11px] uppercase tracking-wider text-[#000080] font-bold">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#000080] leading-snug px-2">
              {guestName}
            </h2>
            <p className="text-[11px] text-stone-500 italic font-medium">
              *Merupakan suatu kehormatan bagi kami atas kehadiran dan doa restu Anda
            </p>

            <div className="pt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('mempelai');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#6387A5] hover:bg-[#4F7391] text-white font-bold text-sm shadow-md shadow-[#6387A5]/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <span>Lihat Informasi Pernikahan</span>
              </button>

              <button
                type="button"
                onClick={handleReopenEnvelope}
                className="inline-flex items-center justify-center gap-1.5 py-1.5 text-xs text-[#000080] hover:text-[#181716] font-bold transition-colors"
              >
                <MailOpen className="w-3.5 h-3.5 text-[#C5A059]" />
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
        <section id="mempelai" className="relative px-6 py-12 scroll-mt-6 text-center space-y-12 overflow-hidden">
          {/* Subtle floral watercolor corners (Enlarged & Opacity-80) */}
          <BotanicalCorner position="top-left" className="absolute top-2 left-2" />
          <BotanicalCorner position="top-right" className="absolute top-2 right-2" />

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

            <div className="p-5 sm:p-6 rounded-2xl bg-[#EBF3FA]/90 border border-[#8FA9C4]/40 text-center space-y-2 mt-4 shadow-xs">
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
                    className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-2 arch-frame border border-white/25 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Info Mempelai Wanita */}
            <div className="w-full max-w-sm px-4 text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B87A7A] font-extrabold block">
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
              <span className="font-serif italic text-lg sm:text-xl text-[#000080] font-bold tracking-wider">
                Dengan
              </span>
            </div>
          </ScrollReveal>

          {/* Mempelai Pria (Groom) - Second */}
          <ScrollReveal delay={150} className="w-full max-w-md mx-auto flex flex-col items-center">
            {/* Grand Arch Frame seukuran bingkai gambar paling atas */}
            <div className="w-[88vw] max-w-[360px] sm:max-w-[420px] md:max-w-[460px] h-[500px] sm:h-[580px] md:h-[620px] arch-frame p-3 sm:p-4 bg-gradient-to-b from-[#6387A5]/45 via-[#C5A059]/30 to-[#FAF9F6] shadow-2xl mb-6 relative">
              <div className="w-full h-full arch-frame p-2 sm:p-2.5 bg-[#FAF9F6] border border-[#8FA9C4]/50 shadow-inner">
                <div className="w-full h-full arch-frame overflow-hidden relative group shadow-sm">
                  <img
                    src={IMAGES.groom}
                    alt="Muh. Saifuddin Assa'diah, S.Hf (Udi)"
                    className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-2 arch-frame border border-white/25 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Info Mempelai Pria */}
            <div className="w-full max-w-sm px-4 text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#000080] font-extrabold block">
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
        <section id="acara" className="relative px-6 py-12 scroll-mt-6 bg-[#FAF9F6] text-center space-y-8 overflow-hidden">
          {/* Subtle floral watercolor corners (Enlarged & Opacity-80) */}
          <BotanicalCorner position="top-left" className="absolute top-2 left-2" />
          <BotanicalCorner position="top-right" className="absolute top-2 right-2" />

          <ScrollReveal delay={100} className="max-w-md mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#000080] font-extrabold block">
              Rangkaian Acara
            </span>
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#000080]">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className="text-xs sm:text-sm text-[#252423] leading-relaxed font-medium">
              Dengan Memohon Ridho dan Rahmat Allah Swt. kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami Yang InsyaAllah akan di selenggarakan pada :
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
            {/* Card Akad Nikah */}
            <ScrollReveal delay={150} className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#8FA9C4]/40 shadow-sm relative">
              <div className="w-12 h-12 rounded-full bg-[#EBF3FA] text-[#000080] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Heart className="w-6 h-6 text-[#000080]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#181716]">
                Akad Nikah
              </h3>
              <div className="w-12 h-[1.5px] bg-[#B8860B] mx-auto my-3" />

              <div className="space-y-3 text-xs sm:text-sm text-[#252423]">
                <div className="flex items-center justify-center gap-2 text-[#181716] font-bold">
                  <Calendar className="w-4 h-4 text-[#000080]" />
                  <span>Selasa, 22 Desember 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#000080] font-bold">
                  <Clock className="w-4 h-4 text-[#B8860B]" />
                  <span>Pukul 09.00 Wita</span>
                </div>
                <div className="pt-1 text-[#181716] text-xs">
                  Bertempat di:
                  <br />
                  <strong className="text-sm font-serif font-bold text-[#000080]">Di Kediaman Mempelai Wanita</strong>
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
                <div className="flex items-center justify-center gap-2 text-[#000080] font-bold">
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
            <div className="flex items-center gap-2 mb-2 text-[#000080]">
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
            <div className="w-full h-36 rounded-2xl bg-[#EBF3FA] border border-[#8FA9C4]/40 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-[#000080] animate-bounce" />
              </div>
              <p className="font-serif text-base font-bold text-[#181716]">
                Taipa, Biringere, Sinjai Utara
              </p>
              <p className="text-xs text-[#000080] font-bold">Kabupaten Sinjai, Sulawesi Selatan</p>
            </div>

            {/* Action Buttons: Google Maps & Copy Address */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#000080] hover:bg-[#000066] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#000080]/20 transition-all active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4 text-[#C5A059]" />
                <span>Buka di Google Maps</span>
              </a>

              <button
                type="button"
                onClick={copyAddressToClipboard}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-[#181716] text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#000080]" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            4. SECTION COUNTDOWN & 5-PHOTO GALLERY
            - Foto 1 (Landscape) on top
            - Foto 2, 3, 4, 5 (Portraits) below in neat grid
            - w-full h-full object-cover object-center
        ========================================================================= */}
        <section id="galeri" className="px-6 py-12 scroll-mt-6 text-center space-y-10">
          {/* Countdown Area */}
          <ScrollReveal delay={100} className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#000080] font-extrabold">
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

          {/* Galeri Foto: 5 Photos Layout */}
          <div className="space-y-4">
            <ScrollReveal delay={100}>
              <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#000080] font-extrabold">
                Memori Indah
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#181716] mt-1">
                Galeri Foto
              </h2>
              <p className="text-xs text-[#252423] mt-1 font-medium">
                Ketuk foto untuk melihat dalam resolusi penuh
              </p>
            </ScrollReveal>

            {/* Susunan 5 Foto Galeri: Foto 1 Landscape (Atas) & Foto 2-5 Portrait (Bawah) */}
            <div className="max-w-md mx-auto pt-2 space-y-3">
              {/* Foto 1 (Landscape): Ditempatkan di bagian paling atas bingkai galeri utama */}
              <ScrollReveal delay={150}>
                <div
                  onClick={() => setActivePhotoIndex(0)}
                  className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group shadow-md border-2 border-[#8FA9C4]/40"
                >
                  <img
                    src={IMAGES.galeri1}
                    alt={galleryPhotos[0].title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4 text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6D4A5] block">
                        Foto Utama (Landscape)
                      </span>
                      <p className="font-serif text-lg font-bold text-white leading-tight">
                        {galleryPhotos[0].title}
                      </p>
                      <p className="text-xs text-white/90 font-medium">{galleryPhotos[0].caption}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Foto 2, 3, 4, 5 (Portrait): Ditempatkan di bawahnya menggunakan susunan grid yang rapi */}
              <div className="grid grid-cols-2 gap-3">
                {/* Foto 2 (Portrait) */}
                <ScrollReveal delay={200}>
                  <div
                    onClick={() => setActivePhotoIndex(1)}
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200"
                  >
                    <img
                      src={IMAGES.galeri2}
                      alt={galleryPhotos[1].title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/40 backdrop-blur-xs text-left">
                      <p className="font-serif text-xs font-bold text-white truncate">
                        {galleryPhotos[1].title}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Foto 3 (Portrait) */}
                <ScrollReveal delay={250}>
                  <div
                    onClick={() => setActivePhotoIndex(2)}
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200"
                  >
                    <img
                      src={IMAGES.galeri3}
                      alt={galleryPhotos[2].title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/40 backdrop-blur-xs text-left">
                      <p className="font-serif text-xs font-bold text-white truncate">
                        {galleryPhotos[2].title}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Foto 4 (Portrait) */}
                <ScrollReveal delay={300}>
                  <div
                    onClick={() => setActivePhotoIndex(3)}
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200"
                  >
                    <img
                      src={IMAGES.galeri4}
                      alt={galleryPhotos[3].title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/40 backdrop-blur-xs text-left">
                      <p className="font-serif text-xs font-bold text-white truncate">
                        {galleryPhotos[3].title}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Foto 5 (Portrait) */}
                <ScrollReveal delay={350}>
                  <div
                    onClick={() => setActivePhotoIndex(4)}
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200"
                  >
                    <img
                      src={IMAGES.galeri5}
                      alt={galleryPhotos[4].title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/40 backdrop-blur-xs text-left">
                      <p className="font-serif text-xs font-bold text-white truncate">
                        {galleryPhotos[4].title}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Love Story Snippet */}
          <ScrollReveal delay={150} className="max-w-md mx-auto p-6 rounded-3xl bg-white/90 border border-[#8FA9C4]/35 text-left space-y-4 shadow-xs">
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-widest text-[#000080] font-extrabold">
                Kisah Kami
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#181716]">
                Perjalanan Menuju Halal
              </h3>
            </div>

            <div className="space-y-4 text-xs text-[#252423] relative pl-4 border-l-2 border-[#6387A5]/50">
              <div>
                <span className="font-bold text-[#000080] block text-xs">2022 · Awal Pertemuan</span>
                <p className="mt-0.5 leading-relaxed font-medium">
                  Berawal dari pertemuan sederhana dan silaturahmi yang menumbuhkan rasa saling mengagumi
                  dan menghargai visi hidup satu sama lain.
                </p>
              </div>

              <div>
                <span className="font-bold text-[#000080] block text-xs">2025 · Lamaran &amp; Komitmen</span>
                <p className="mt-0.5 leading-relaxed font-medium">
                  Dengan niat tulus beribadah menyempurnakan separuh agama, keluarga besar kedua mempelai
                  bertemu untuk merajut ikatan silaturahmi resmi.
                </p>
              </div>

              <div>
                <span className="font-bold text-[#000080] block text-xs">2026 · Menuju Pelaminan</span>
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
            TANDA KASIH / DOMPET DIGITAL & REKENING (WEDDING GIFT)
        ========================================================================= */}
        {/* =========================================================================
            TANDA KASIH / DOMPET DIGITAL & REKENING (WEDDING GIFT)
        ========================================================================= */}
        <section id="tanda-kasih" className="relative px-6 py-10 scroll-mt-6 text-center space-y-6 overflow-hidden">
          {/* Subtle floral watercolor corners (Enlarged & Opacity-80) */}
          <BotanicalCorner position="top-left" className="absolute top-2 left-2" />
          <BotanicalCorner position="top-right" className="absolute top-2 right-2" />

          <FloralBranchTop />

          <ScrollReveal delay={50} className="space-y-2">
            <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8FA9C4]/15 border border-[#8FA9C4]/35 text-[#000080] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <Gift className="w-3.5 h-3.5 text-[#000080]" />
              <span>Tanda Kasih</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181716] tracking-tight">
              Kirim Hadiah &amp; Doa Restu
            </h2>
            <p className="text-xs text-[#252423] font-medium max-w-md mx-auto leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda berkenan memberikan tanda kasih, silakan pilih salah satu opsi pembayaran di bawah ini:
            </p>
          </ScrollReveal>

          {/* Action Buttons: "Buka Rekening BRI" & "Buka Dompet DANA" (Soft Blue Elegance) */}
          <div className="max-w-md mx-auto space-y-4 pt-1 text-left">
            {/* OPSI 1: BANK BRI */}
            <ScrollReveal delay={100} className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowBriDetails(!showBriDetails)}
                className={`w-full group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 shadow-sm cursor-pointer ${
                  showBriDetails
                    ? 'bg-[#EBF3FA] border-[#00529C] shadow-md ring-2 ring-[#00529C]/20'
                    : 'bg-white/95 hover:bg-[#F2F7FC] border-[#8FA9C4]/40 hover:border-[#00529C]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    showBriDetails ? 'bg-[#00529C] text-white' : 'bg-[#EBF3FA] text-[#00529C]'
                  }`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#00529C] block">
                      Bank Transfer
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#181716] block leading-tight">
                      Buka Rekening BRI
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00529C] bg-[#EBF3FA] px-3 py-1.5 rounded-full border border-[#00529C]/20">
                  <span>{showBriDetails ? 'Tutup' : 'Buka'}</span>
                  {showBriDetails ? (
                    <ChevronUp className="w-4 h-4 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  )}
                </div>
              </button>

              {/* BRI Details Dropdown / Expanded Card */}
              {showBriDetails && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#00529C]/10 via-white to-[#00529C]/5 border-2 border-[#00529C]/40 shadow-lg space-y-3.5 transition-all">
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                    <span className="text-xs font-extrabold text-[#00529C] uppercase tracking-wider">
                      Informasi Rekening Bank BRI
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00529C]/10 text-[#00529C] border border-[#00529C]/20">
                      ATM / Mobile
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-[#4A5568] block">Nomor Rekening:</span>
                    <p className="font-mono text-xl sm:text-2xl font-extrabold text-[#181716] tracking-wider select-all">
                      0258 01 031111 53 0
                    </p>
                    <p className="text-xs text-[#000080] font-bold">
                      Atas Nama: Nurhidayah
                    </p>
                  </div>

                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={copyBri}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#00529C] hover:bg-[#003d75] text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {copiedBri ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>Nomor Rekening Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Salin Nomor Rekening</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBriDetails(false)}
                      className="px-3.5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600 text-xs font-semibold cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}
            </ScrollReveal>

            {/* OPSI 2: DOMPET DANA */}
            <ScrollReveal delay={150} className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowDanaDetails(!showDanaDetails)}
                className={`w-full group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 shadow-sm cursor-pointer ${
                  showDanaDetails
                    ? 'bg-[#EBF6FE] border-[#118EEA] shadow-md ring-2 ring-[#118EEA]/20'
                    : 'bg-white/95 hover:bg-[#F0F8FF] border-[#8FA9C4]/40 hover:border-[#118EEA]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    showDanaDetails ? 'bg-[#118EEA] text-white' : 'bg-[#EBF6FE] text-[#118EEA]'
                  }`}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#118EEA] block">
                      Dompet Digital
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#181716] block leading-tight">
                      Buka Dompet DANA
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#118EEA] bg-[#EBF6FE] px-3 py-1.5 rounded-full border border-[#118EEA]/20">
                  <span>{showDanaDetails ? 'Tutup' : 'Buka'}</span>
                  {showDanaDetails ? (
                    <ChevronUp className="w-4 h-4 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  )}
                </div>
              </button>

              {/* DANA Details Dropdown / Expanded Card */}
              {showDanaDetails && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#118EEA]/10 via-white to-[#118EEA]/5 border-2 border-[#118EEA]/40 shadow-lg space-y-3.5 transition-all">
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                    <span className="text-xs font-extrabold text-[#118EEA] uppercase tracking-wider">
                      Informasi Dompet Digital DANA
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#118EEA]/10 text-[#118EEA] border border-[#118EEA]/20">
                      Online
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-[#4A5568] block">Nomor Telepon / Akun:</span>
                    <p className="font-mono text-xl sm:text-2xl font-extrabold text-[#181716] tracking-wider select-all">
                      081524482262
                    </p>
                    <p className="text-xs text-[#000080] font-bold">
                      Atas Nama: Nurhidayah
                    </p>
                  </div>

                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={copyDana}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#118EEA] hover:bg-[#0c72be] text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {copiedDana ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>Nomor DANA Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Salin Nomor DANA</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDanaDetails(false)}
                      className="px-3.5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600 text-xs font-semibold cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            5. GUESTBOOK & RSVP (DOA RESTU)
        ========================================================================= */}
        <section id="doa" className="relative px-6 py-10 scroll-mt-6 text-center overflow-hidden">
          {/* Subtle floral watercolor corners (Enlarged & Opacity-80) */}
          <BotanicalCorner position="top-left" className="absolute top-2 left-2" />
          <BotanicalCorner position="top-right" className="absolute top-2 right-2" />

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
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#000080] font-extrabold">
              Ungkapan Hormat
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#181716]">
              Hormat Kami Yang Mengundang
            </h3>
            <p className="text-xs text-[#252423] font-medium">
              Keluarga Besar &amp; Segenap Handai Taulan:
            </p>

            {/* Structured Clean Family List Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#8FA9C4]/35 shadow-xs text-left space-y-4">
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
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">H.A. Muh. Amin Kasim, S.Ag.,M.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">H. Iskandar, S.Ag.,M.H</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Drs. Abdul Rasyid</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">A. Abdul Malik, S.Ag.,S.Pd.,M.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Firman Taha, S.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Ilyas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Muh. Amin Tahir, S.Sos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Abd. Hamid, S.Pd.,SD</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Muh. Amir</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Muh. Hatta Suyuti</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">G.r Amar Ma'ruf, S.Pd</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#000080] font-bold">•</span>
                  <span className="font-medium">Sabaruddin Damang</span>
                </div>
              </div>

              {/* Special Highlighted Big Families */}
              <div className="pt-3 border-t border-stone-200/80 space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-[#EBF3FA] border border-[#8FA9C4]/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#000080]" />
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
              <p className="text-xs font-serif uppercase tracking-widest text-[#000080] font-bold">
                Kami yang berbahagia,
              </p>
              <h4 className="font-script text-4xl sm:text-5xl text-[#B8860B] mt-2">
                Nur &amp; Udi
              </h4>
            </div>
          </ScrollReveal>

          {/* Guest Link Generator Panel: Hidden by default, toggled via footer */}
          {showGuestGenerator && (
            <div id="guest-generator-section" className="pt-4 scroll-mt-10">
              <GuestLinkGenerator 
                baseUrl="https://undanganpernikahannurudi.vercel.app/" 
                onClose={() => setShowGuestGenerator(false)} 
              />
            </div>
          )}

          {/* Interactive Footer Trigger to Open/Close Guest Link Generator with Password Protection */}
          <div className="pt-10 pb-4 text-center border-t border-stone-200/80">
            <button
              type="button"
              onClick={handleTriggerFooterGenerator}
              className="group inline-flex flex-col items-center justify-center py-2 px-4 rounded-2xl hover:bg-sky-50 transition-colors cursor-pointer select-none"
            >
              <p className="text-xs text-stone-500 group-hover:text-[#000080] font-sans tracking-wide font-medium transition-colors">
                The Wedding of Nurhidayah &amp; Muh. Saifuddin · Sinjai, 22 Desember 2026
              </p>
              <span className="text-[10px] text-stone-400 group-hover:text-[#000080] font-semibold mt-1 flex items-center gap-1 transition-colors">
                {showGuestGenerator ? '▲ Tutup Panel Generator' : '🔒 Ketuk untuk membuka Panel Generator Link Tamu'}
              </span>
            </button>
          </div>

          {/* Password Protection Modal ("waliwali") */}
          {showPasswordModal && (
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowPasswordModal(false);
                }
              }}
            >
              <div className="bg-[#FAF9F6] border-2 border-[#000080]/30 shadow-2xl rounded-3xl max-w-sm w-full p-6 text-center space-y-4 relative animate-in fade-in duration-200">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-200/60 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Lock Icon */}
                <div className="w-12 h-12 rounded-full bg-[#000080] text-[#C5A059] flex items-center justify-center mx-auto shadow-md shadow-[#000080]/20">
                  <Lock className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#000080]">
                    Proteksi Sandi
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#181716]">
                    Akses Generator Undangan
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Silakan masukkan kata sandi untuk membuka Panel Generator Link Tamu:
                  </p>
                </div>

                <form onSubmit={handleVerifyPassword} className="space-y-3 pt-1">
                  <div>
                    <input
                      type="password"
                      autoFocus
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        if (passwordError) setPasswordError('');
                      }}
                      placeholder="Masukkan sandi..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-stone-200 focus:border-[#000080] focus:outline-hidden text-sm font-semibold text-[#181716] text-center tracking-widest placeholder:text-stone-400 placeholder:tracking-normal transition-colors"
                    />
                  </div>

                  {passwordError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowPasswordModal(false)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#000080] hover:bg-[#000066] text-white text-xs font-bold shadow-md shadow-[#000080]/20 transition-all cursor-pointer"
                    >
                      Buka Panel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
