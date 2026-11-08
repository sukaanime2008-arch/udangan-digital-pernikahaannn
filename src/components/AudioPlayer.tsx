import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

interface AudioPlayerProps {
  autoPlayRequest?: boolean;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ autoPlayRequest }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Audio file path provided by user
    const audioSrc = '/assets/audio/wedding_bgm.mp3';

    // Fallback synth in case file playback is blocked or unsupported
    const audioContextRef = useRef<AudioContext | null>(null);
    const intervalRef = useRef<number | null>(null);
    const isUsingSynthRef = useRef(false);

    const playAudioElement = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.currentTime = audioRef.current.currentTime || 0;
          await audioRef.current.play();
          setIsPlaying(true);
          return true;
        } catch (err) {
          console.warn('HTML Audio play error, trying fallback synth:', err);
          return false;
        }
      }
      return false;
    };

    const startSynthFallback = () => {
      isUsingSynthRef.current = true;
      if (!audioContextRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      const chords = [
        [174.61, 220.0, 261.63, 329.63, 392.0],
        [164.81, 196.0, 261.63, 329.63, 392.0],
        [146.83, 174.61, 220.0, 261.63, 329.63],
        [116.54, 146.83, 174.61, 220.0, 293.66],
      ];
      let chordIndex = 0;
      let noteIndex = 0;

      intervalRef.current = window.setInterval(() => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const currentChord = chords[chordIndex];
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = noteIndex === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(currentChord[noteIndex], now);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(0.04, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.0);

        noteIndex = (noteIndex + 1) % currentChord.length;
        if (noteIndex === 0) {
          chordIndex = (chordIndex + 1) % chords.length;
        }
      }, 500);

      setIsPlaying(true);
    };

    const play = async () => {
      const success = await playAudioElement();
      if (!success) {
        startSynthFallback();
      }
    };

    const pause = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
      setIsPlaying(false);
    };

    const toggle = () => {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    };

    useImperativeHandle(ref, () => ({
      play,
      pause,
      toggle,
      isPlaying,
    }));

    useEffect(() => {
      if (autoPlayRequest && !isPlaying) {
        play();
      }
    }, [autoPlayRequest]);

    useEffect(() => {
      const audioEl = audioRef.current;
      if (audioEl) {
        const handleCanPlay = () => setIsAudioLoaded(true);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
          audioEl.currentTime = 0;
          audioEl.play().catch(() => {});
        };

        audioEl.addEventListener('canplay', handleCanPlay);
        audioEl.addEventListener('play', handlePlay);
        audioEl.addEventListener('pause', handlePause);
        audioEl.addEventListener('ended', handleEnded);

        return () => {
          audioEl.removeEventListener('canplay', handleCanPlay);
          audioEl.removeEventListener('play', handlePlay);
          audioEl.removeEventListener('pause', handlePause);
          audioEl.removeEventListener('ended', handleEnded);
        };
      }
    }, []);

    return (
      <>
        {/* Hidden HTML5 Audio Element for user's MP3 */}
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="auto"
          loop
          className="hidden"
          playsInline
        />

        {/* Floating Vinyl Music Control Button */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={isPlaying ? 'Jeda lagu pernikahan' : 'Putar lagu pernikahan'}
            className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border ${
              isPlaying
                ? 'bg-[#FAF9F6]/95 border-[#C5A059] text-[#2F2D2C] ring-2 ring-[#C5A059]/20'
                : 'bg-white/90 border-[#D4A5A5] text-[#6B6664] hover:text-[#2F2D2C]'
            }`}
          >
            {/* Spinning Vinyl Record Icon */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#000080] via-[#6387A5] to-[#8FA9C4] text-white shadow-xs ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#FAF9F6] border border-[#C5A059]" />
            </div>

            {/* Song Label & Waves */}
            <div className="flex items-center gap-1.5">
              {isPlaying ? (
                <>
                  <div className="text-left hidden sm:block">
                    <p className="text-[11px] font-serif font-bold text-[#000080] leading-tight">
                      Ininnawa Sabbarae
                    </p>
                    <p className="text-[9px] text-[#6387A5] leading-none">Versi Orkestra Bugis</p>
                  </div>
                  <Volume2 className="w-4 h-4 text-[#C5A059] ml-1" />
                  <span className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                    <span className="w-0.5 h-2 bg-[#C5A059] animate-pulse" />
                    <span className="w-0.5 h-3.5 bg-[#8FA9C4] animate-pulse delay-100" />
                    <span className="w-0.5 h-1.5 bg-[#D4A5A5] animate-pulse delay-200" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#6B6664]" />
                  <span className="text-xs font-serif hidden sm:inline text-[#6B6664]">
                    Putar Musik
                  </span>
                </>
              )}
            </div>
          </button>
        </div>
      </>
    );
  }
);
