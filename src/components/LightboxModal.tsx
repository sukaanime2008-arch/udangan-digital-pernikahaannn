import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryPhoto {
  src: string;
  title: string;
  caption: string;
}

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  if (currentIndex === null) return null;

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % photos.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, onClose, onSelectIndex]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Tutup foto"
        className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
        }}
        aria-label="Foto sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelectIndex((currentIndex + 1) % photos.length);
        }}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto.src}
          alt={currentPhoto.title}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
        />
        <div className="text-center mt-3 text-white">
          <p className="font-serif text-lg text-[#EFE4CA]">{currentPhoto.title}</p>
          <p className="text-xs text-white/70 font-sans tracking-wide">{currentPhoto.caption}</p>
          <p className="text-[11px] text-white/40 mt-1">
            {currentIndex + 1} dari {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
};
