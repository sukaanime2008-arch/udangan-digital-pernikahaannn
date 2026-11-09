import React, { useState } from 'react';
import { Link2, Copy, Check, Share2, MessageCircle, ExternalLink } from 'lucide-react';

interface GuestLinkGeneratorProps {
  baseUrl?: string;
  onClose?: () => void;
}

export const GuestLinkGenerator: React.FC<GuestLinkGeneratorProps> = ({
  baseUrl = 'https://undanganpernikahannurudi.vercel.app/',
  onClose,
}) => {
  const [guestInput, setGuestInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Generate URL encoded query parameter
  const encodedName = guestInput.trim() ? encodeURIComponent(guestInput.trim()).replace(/%20/g, '+') : '';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const generatedUrl = encodedName ? `${cleanBase}?to=${encodedName}` : `${cleanBase}?to=Tamu+Undangan`;

  const displayName = guestInput.trim() || 'Tamu Undangan';

  // WhatsApp formatted message template
  const waMessage = `Kepada Yth.
*${displayName}*
di Tempat
__________________________

_Assalamu'alaikum Warahmatullahi Wabarakatuh_

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara resepsi pernikahan putra-putri kami:

*Nurhidayah, S.Pd (Nur)*
&
*Muh. Saifuddin Assa'diah, S.Hf (Udi)*

Yang InsyaAllah akan diselenggarakan pada:
🗓️ *Hari/Tgl:* Selasa, 22 Desember 2026
⏰ *Waktu:* Pukul 11.00 WITA s/d Selesai
📍 *Lokasi:* Jl. Ranggong Dg Romo No. 56 B, Lingk. Taipa Kel. Biringere Kec. Sinjai Utara, Kab. Sinjai (Samping Mesjid Khaerussaadah Kalaka)

Berikut tautan undangan digital resmi Anda:
${generatedUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.

Terima kasih.
_Wassalamu'alaikum Warahmatullahi Wabarakatuh_

Hormat kami yang berbahagia,
*Nur & Udi*`;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const copyMessageToClipboard = () => {
    navigator.clipboard.writeText(waMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const openWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 text-left">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-[#000080]/20 shadow-xl shadow-[#000080]/5 relative overflow-hidden">
        {/* Navy Header Accent */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#000080] text-white flex items-center justify-center shadow-xs">
              <Link2 className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#000080]">
                Panel Khusus Pengantin &amp; Panitia
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#000080]">
                Guest Link Generator
              </h3>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>✕ Tutup</span>
            </button>
          )}
        </div>

        <p className="text-xs text-[#2A2827] leading-relaxed mb-5 font-medium">
          Ketik nama tamu di bawah untuk membuat tautan undangan personal otomatis yang siap disalin
          dan dikirim via WhatsApp.
        </p>

        {/* Guest Name Input */}
        <div className="space-y-2 mb-4">
          <label className="block text-xs font-bold text-[#000080]">
            Nama Tamu Undangan
          </label>
          <div className="relative">
            <input
              type="text"
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              placeholder="Contoh: Bapak Budi &amp; Keluarga"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border-2 border-stone-200 focus:border-[#000080] focus:outline-none text-sm font-semibold text-[#181716] placeholder:text-stone-400 transition-colors"
            />
            {guestInput && (
              <button
                type="button"
                onClick={() => setGuestInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Generated URL Box */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#000080]/25 mb-5 space-y-1.5">
          <span className="text-[10px] font-bold text-[#000080] uppercase tracking-wider block">
            Tautan Undangan Khusus Tamu:
          </span>
          <p className="font-mono text-xs text-[#000080] break-all select-all font-semibold bg-white p-2.5 rounded-lg border border-stone-200">
            {generatedUrl}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          <button
            type="button"
            onClick={copyLinkToClipboard}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#000080] hover:bg-[#000066] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#000080]/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#C5A059]" />
                <span>Salin Link Undangan</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={openWhatsApp}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim via WhatsApp</span>
          </button>
        </div>

        {/* WhatsApp Preview Drawer / Accordion */}
        <div className="pt-3 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#000080]">
              Format Teks Pesan WhatsApp:
            </span>
            <button
              type="button"
              onClick={copyMessageToClipboard}
              className="text-[11px] text-[#000080] hover:underline font-semibold flex items-center gap-1"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Pesan Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Seluruh Pesan</span>
                </>
              )}
            </button>
          </div>
          <div className="max-h-36 overflow-y-auto text-[11px] font-mono text-[#2A2827] bg-[#FAF9F6] p-3 rounded-xl border border-stone-200 leading-relaxed whitespace-pre-wrap select-all">
            {waMessage}
          </div>
        </div>

        {/* Bottom Close Button */}
        {onClose && (
          <div className="pt-4 text-center border-t border-stone-200 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>▲ Tutup Panel Generator</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
