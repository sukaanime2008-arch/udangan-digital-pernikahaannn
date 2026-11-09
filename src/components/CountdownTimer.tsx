import React, { useState, useEffect } from 'react';
import { Calendar, Download } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  // Wedding Date: 22 Desember 2026, 09:00 WITA (UTC+8 -> 2026-12-22T01:00:00Z)
  const targetDate = new Date('2026-12-22T09:00:00+08:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Pernikahan Nur & Udi");
    const details = encodeURIComponent(
      "Akad (09.00 WITA) & Resepsi (11.00 WITA s/d Selesai) Pernikahan Nurhidayah, S.Pd (Nur) & Muh. Saifuddin Assa'diah, S.Hf (Udi). Lokasi: Jl. Ranggong Dg Romo No. 56 B, Sinjai (Samping Mesjid Khaerussaadah Kalaka)."
    );
    const location = encodeURIComponent(
      "Jl. Ranggong Dg Romo No. 56 B, Lingk. Taipa Kel. Biringere Kec. Sinjai Utara, Kab. Sinjai (Samping Mesjid Khaerussaadah Kalaka)"
    );
    // 2026-12-22 09:00 WITA to 18:00 WITA -> 20261222T010000Z/20261222T100000Z
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261222T010000Z/20261222T100000Z&details=${details}&location=${location}`;
  };

  // Download ICS File for Apple Calendar / Outlook / Phone Calendar
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nur and Udi Wedding//EN',
      'BEGIN:VEVENT',
      'SUMMARY:Pernikahan Nur & Udi (Nurhidayah & Muh. Saifuddin)',
      'DESCRIPTION:Akad (09.00 WITA) & Resepsi (11.00 WITA s/d Selesai) Pernikahan Nurhidayah, S.Pd (Nur) & Muh. Saifuddin Assa\'diah, S.Hf (Udi)',
      'LOCATION:Jl. Ranggong Dg Romo No. 56 B, Lingk. Taipa Kel. Biringere Kec. Sinjai Utara, Kab. Sinjai (Samping Mesjid Khaerussaadah Kalaka)',
      'DTSTART:20261222T010000Z',
      'DTEND:20261222T100000Z',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pernikahan_Nur_dan_Udi.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-lg mx-auto text-center px-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/85 backdrop-blur-sm border border-[#8FA9C4]/35 shadow-sm hover:border-[#C5A059]/50 transition-colors"
          >
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#000080] tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs font-sans tracking-wider uppercase text-[#6387A5] mt-1 font-bold">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#6387A5] hover:bg-[#4F7391] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98]"
        >
          <Calendar className="w-4 h-4 text-[#FFF3D6]" />
          <span>Simpan ke Google Calendar</span>
        </a>

        <button
          type="button"
          onClick={downloadIcsFile}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F6] text-[#2F2D2C] border border-[#C5A059]/40 text-xs sm:text-sm font-medium shadow-sm transition-all active:scale-[0.98]"
        >
          <Download className="w-4 h-4 text-[#C5A059]" />
          <span>Unduh Pengingat</span>
        </button>
      </div>
    </div>
  );
};
