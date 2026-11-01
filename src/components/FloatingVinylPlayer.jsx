import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

/**
 * Romantic Music Box / Acoustic Harp Waltz Synthesizer using Web Audio API.
 * Plays a gentle, nostalgic waltz in F Major ("La Valse d'Udaipur") without external network dependencies.
 */
const WALTZ_NOTES = [
  // Measure 1 (Fmaj7)
  { freq: 349.23, dur: 0.55 }, // F4
  { freq: 440.0, dur: 0.55 }, // A4
  { freq: 523.25, dur: 0.55 }, // C5
  // Measure 2 (Fmaj7)
  { freq: 659.25, dur: 1.05 }, // E5
  { freq: 587.33, dur: 0.55 }, // D5
  // Measure 3 (Dm7)
  { freq: 523.25, dur: 0.55 }, // C5
  { freq: 440.0, dur: 0.55 }, // A4
  { freq: 349.23, dur: 0.55 }, // F4
  // Measure 4 (Bb maj7)
  { freq: 392.0, dur: 1.1 }, // G4
  { freq: 440.0, dur: 0.55 }, // A4
  // Measure 5 (Gm7)
  { freq: 466.16, dur: 0.55 }, // Bb4
  { freq: 523.25, dur: 0.55 }, // C5
  { freq: 587.33, dur: 0.55 }, // D5
  // Measure 6 (C7)
  { freq: 523.25, dur: 1.05 }, // C5
  { freq: 440.0, dur: 0.55 }, // A4
  // Measure 7 (Fmaj)
  { freq: 392.0, dur: 0.55 }, // G4
  { freq: 349.23, dur: 1.1 }, // F4
];

export default function FloatingVinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const noteIdxRef = useRef(0);

  const playPluck = useCallback((freq, duration) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Warm music-box sine + soft triangle overtone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.08, now);

    // Gentle bell-like envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.095, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration * 1.45);

    osc1.connect(gain);
    osc2.connect(overtoneGain);
    overtoneGain.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 1.5);
    osc2.stop(now + duration * 1.5);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }

      const scheduleNext = () => {
        const current = WALTZ_NOTES[noteIdxRef.current % WALTZ_NOTES.length];
        playPluck(current.freq, current.dur);
        noteIdxRef.current = (noteIdxRef.current + 1) % WALTZ_NOTES.length;
        timerRef.current = window.setTimeout(scheduleNext, current.dur * 1000);
      };

      scheduleNext();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, playPluck]);

  const togglePlayback = () => {
    setHasInteracted(true);
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5">
      {/* Discreet label pill on desktop or initial load */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause romantic background music' : 'Play romantic background music'}
        aria-pressed={isPlaying}
        className="group relative flex items-center gap-3 bg-cream/95 backdrop-blur-md border border-gold/50 shadow-polaroid hover:shadow-polaroid-hover rounded-full pl-2 pr-4 py-1.5 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {/* Floating Musical Notes when Playing */}
        {isPlaying && (
          <span
            className="absolute -top-5 left-4 text-gold animate-bounce pointer-events-none select-none text-xs"
            aria-hidden="true"
          >
            ♪ ♫
          </span>
        )}

        {/* Vinyl Record & Gramophone Tonearm Container */}
        <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
          {/* Vinyl Disc */}
          <svg
            viewBox="0 0 64 64"
            className={`w-11 h-11 rounded-full shadow-sm transition-transform ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
            aria-hidden="true"
          >
            {/* Outer dark vinyl */}
            <circle cx="32" cy="32" r="30" fill="#2C2A29" stroke="#C5A059" strokeWidth="1.2" />
            {/* Vinyl grooves */}
            <circle cx="32" cy="32" r="25" fill="none" stroke="#454240" strokeWidth="0.8" strokeDasharray="8 4" />
            <circle cx="32" cy="32" r="20" fill="none" stroke="#454240" strokeWidth="0.8" strokeDasharray="6 3" />
            <circle cx="32" cy="32" r="15" fill="none" stroke="#454240" strokeWidth="0.8" />
            {/* Vinyl sheen highlight */}
            <path d="M12 18 A24 24 0 0 1 28 8" fill="none" stroke="#FDFBF7" strokeOpacity="0.2" strokeWidth="2.5" />
            {/* Center Gold Scrapbook Label */}
            <circle cx="32" cy="32" r="10.5" fill="#C5A059" />
            <circle cx="32" cy="32" r="8.5" fill="#F4ECE1" />
            <text
              x="32"
              y="30.5"
              textAnchor="middle"
              fontSize="4.5"
              fontWeight="700"
              fill="#2C2A29"
              className="font-serif"
            >
              A &amp; M
            </text>
            {/* Spindle hole */}
            <circle cx="32" cy="32" r="2.2" fill="#2C2A29" />
          </svg>

          {/* Gramophone Tonearm Needle */}
          <svg
            viewBox="0 0 40 40"
            className={`w-7 h-7 absolute -top-1 -right-1 pointer-events-none origin-top-right transition-transform duration-500 ${
              isPlaying ? 'rotate-12' : '-rotate-12'
            }`}
            aria-hidden="true"
          >
            <circle cx="33" cy="7" r="4" fill="#C5A059" stroke="#2C2A29" strokeWidth="1" />
            <path
              d="M33 7 L24 24 L17 28"
              fill="none"
              stroke="#C5A059"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="14" y="26" width="5" height="3.5" rx="1" fill="#2C2A29" transform="rotate(-20 16 28)" />
          </svg>
        </div>

        {/* Text & Status */}
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-olive">
              {isPlaying ? 'Now Spinning' : 'Gramophone'}
            </span>
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-gold-dark animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-charcoal/50" />
            )}
          </div>
          <p className="font-serif text-xs sm:text-sm font-semibold text-charcoal leading-tight">
            {isPlaying ? 'Udaipur Waltz · Playing' : !hasInteracted ? 'Tap for Music' : 'Music Paused'}
          </p>
        </div>
      </button>
    </div>
  );
}

