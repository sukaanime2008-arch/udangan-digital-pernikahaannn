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
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  // Prevent background scrolling while modal is open - declared unconditionally
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Keyboard controls: Escape to close, arrows to navigate - declared unconditionally
  useEffect(() => {
    if (!isOpen || currentIndex === null) return;
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
  }, [isOpen, currentIndex, photos.length, onClose, onSelectIndex]);

  // Early return only after all hooks are unconditionally declared
  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 transition-all duration-300 select-none"
      onClick={onClose}
    >
      {/* Prominent, easily clickable Close "X" Button in the top right corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        type="button"
        aria-label="Tutup preview foto"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/85 border border-white/30 text-white shadow-xl transition-transform active:scale-90 cursor-pointer"
      >
        <X className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Navigation Buttons (Left & Right) */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
            }}
            type="button"
            aria-label="Foto sebelumnya"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 border border-white/25 text-white shadow-lg transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex + 1) % photos.length);
            }}
            type="button"
            aria-label="Foto berikutnya"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 border border-white/25 text-white shadow-lg transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </>
      )}

      {/* Main Image Container - Centered and constrained without vertical dead space */}
      <div
        className="relative w-full max-w-4xl flex flex-col items-center justify-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center justify-center max-w-full max-h-[85vh]">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/15"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Compact, clean photo caption & counter */}
        {(currentPhoto.title || currentPhoto.caption) && (
          <div className="text-center mt-2.5 px-4 text-white max-w-md">
            {currentPhoto.title && (
              <p className="font-serif text-base sm:text-lg text-[#EFE4CA] font-medium leading-snug drop-shadow-xs">
                {currentPhoto.title}
              </p>
            )}
            {currentPhoto.caption && (
              <p className="text-xs text-white/80 font-sans tracking-wide mt-0.5 leading-relaxed drop-shadow-xs">
                {currentPhoto.caption}
              </p>
            )}
            <p className="text-[11px] text-white/45 mt-1 font-mono">
              {currentIndex + 1} / {photos.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
