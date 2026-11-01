import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MapPin, Clock, KeyRound, RotateCcw, Copy, Check, ExternalLink } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { WashiTape, ScrapbookDivider } from './ScrapbookDoodles';

export default function ScratchOffCard() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const strokeCountRef = useRef(0);

  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  /**
   * Paint the shimmering gold/matte metallic foil layer scaled by window.devicePixelRatio
   */
  const initFoilCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 3);

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';

    const w = rect.width;
    const h = rect.height;

    // 1. Shimmering metallic gold gradient (#C5A059 base)
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#9E7B36');
    grad.addColorStop(0.22, '#C5A059');
    grad.addColorStop(0.48, '#EAD49E');
    grad.addColorStop(0.72, '#C5A059');
    grad.addColorStop(1, '#8F6D2D');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Subtle metallic diagonal sheen bands
    ctx.fillStyle = 'rgba(253, 251, 247, 0.14)';
    ctx.beginPath();
    ctx.moveTo(w * 0.15, 0);
    ctx.lineTo(w * 0.34, 0);
    ctx.lineTo(w * 0.12, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w * 0.65, 0);
    ctx.lineTo(w * 0.78, 0);
    ctx.lineTo(w * 0.55, h);
    ctx.lineTo(w * 0.42, h);
    ctx.closePath();
    ctx.fill();

    // 3. Matte coin-scratch metallic grain dots
    for (let i = 0; i < 420; i++) {
      const gx = Math.random() * w;
      const gy = Math.random() * h;
      const alpha = Math.random() * 0.22;
      ctx.fillStyle = i % 2 === 0 ? `rgba(255, 250, 235, ${alpha})` : `rgba(75, 55, 20, ${alpha})`;
      ctx.fillRect(gx, gy, 1.5, 1.5);
    }

    // 4. Ornamental Inner Filigree Frame on the Foil
    ctx.strokeStyle = 'rgba(44, 42, 41, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(253, 251, 247, 0.65)';
    ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.setLineDash([]);

    // 5. Center Coin Seal & Instructions Text on Foil
    ctx.fillStyle = 'rgba(44, 42, 41, 0.85)';
    ctx.textAlign = 'center';

    // Top small label
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✦ SEALED IN GOLD FOIL · SACRED MUHURAT & COORDINATES ✦', w / 2, h / 2 - 42);

    // Main title
    ctx.font = 'italic 700 28px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Reveal the Secret', w / 2, h / 2 - 8);

    // Pill instruction background
    const pillW = Math.min(w - 48, 310);
    const pillH = 36;
    const pillX = (w - pillW) / 2;
    const pillY = h / 2 + 12;

    ctx.fillStyle = 'rgba(44, 42, 41, 0.88)';
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 18);
    ctx.fill();

    ctx.fillStyle = '#FDFBF7';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('🪙 Scratch with finger or mouse to reveal', w / 2, pillY + 23);

    ctx.restore();
  }, []);

  useEffect(() => {
    initFoilCanvas();

    const handleResize = () => {
      if (!isRevealed) {
        initFoilCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initFoilCanvas, isRevealed]);

  /**
   * Compute percentage of transparent pixels; auto-clear when >= 60%
   */
  const evaluateScratchProgress = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const stride = 16; // sample every 4th pixel for 60fps mobile performance
    let transparentCount = 0;
    let totalSampled = 0;

    for (let i = 3; i < pixels.length; i += 4 * stride) {
      totalSampled++;
      if (pixels[i] < 128) {
        transparentCount++;
      }
    }

    const pct = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
    setScratchedPercent(pct);

    // Auto-clear threshold at 60%
    if (pct >= 60 && !isRevealed) {
      setIsRevealed(true);
      setScratchedPercent(100);
      try {
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#C5A059', '#6B7F5E', '#FAD2C0', '#FDFBF7'],
        });
      } catch {
        // Ignore if confetti fails in headless environments
      }
    }
  }, [isRevealed]);

  const getLocalCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratchAtPoint = useCallback(
    (point) => {
      if (isRevealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 46;

      ctx.beginPath();
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
      ctx.arc(point.x, point.y, 23, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      lastPointRef.current = point;
      strokeCountRef.current += 1;

      if (strokeCountRef.current % 4 === 0) {
        evaluateScratchProgress();
      }
    },
    [isRevealed, evaluateScratchProgress]
  );

  // Mouse & Touch Event Handlers
  const handleMouseDown = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    const pt = getLocalCoords(e);
    lastPointRef.current = pt;
    scratchAtPoint(pt);
    evaluateScratchProgress();
  };

  const handleMouseMove = (e) => {
    if (isRevealed) return;
    // Allow scratching both on drag and on hover/move across the card so mousemove works effortlessly
    if (isDrawingRef.current || e.buttons === 1 || e.type === 'mousemove') {
      const pt = getLocalCoords(e);
      scratchAtPoint(pt);
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPointRef.current = null;
      evaluateScratchProgress();
    }
    lastPointRef.current = null;
  };

  const handleTouchStart = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    const pt = getLocalCoords(e);
    lastPointRef.current = pt;
    scratchAtPoint(pt);
  };

  const handleTouchMove = (e) => {
    if (isRevealed || !isDrawingRef.current) return;
    const pt = getLocalCoords(e);
    scratchAtPoint(pt);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    evaluateScratchProgress();
  };

  const handleResetFoil = () => {
    setIsRevealed(false);
    setScratchedPercent(0);
    lastPointRef.current = null;
    strokeCountRef.current = 0;
    setTimeout(() => {
      initFoilCanvas();
    }, 30);
  };

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText(COUPLE_DATA.secretCeremony.coordinates);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  return (
    <section
      id="secret-reveal"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-parchment/60 border-y border-gold/25"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-gold/40 text-olive text-xs font-sans uppercase tracking-[0.2em] font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Interactive Keepsake · Golden Coin Foil</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
          Reveal the Secret Muhurat &amp; Coordinates
        </h2>

        <ScrapbookDivider label="Scratch the gold foil below" />

        <p className="font-sans text-sm sm:text-base text-charcoal/80 max-w-xl mx-auto mb-10">
          We’ve sealed the exact sunset ceremony Muhurat time and secret lakeside jetty coordinates
          under a layer of vintage gold foil. Scratch away{' '}
          <span className="font-semibold text-charcoal">60%</span> to unlock it!
        </p>

        {/* Scratch Card Outer Scrapbook Frame */}
        <div className="relative max-w-xl mx-auto bg-cream p-4 sm:p-6 rounded-sm shadow-polaroid border-2 border-gold/40">
          {/* Top Washi Tape */}
          <WashiTape
            variant="gold-dots"
            rotation={-2}
            className="w-40 sm:w-48 absolute -top-5 left-1/2 -translate-x-1/2 z-30"
          />

          {/* Progress Bar & Status Pill */}
          <div className="flex items-center justify-between text-xs font-sans text-charcoal/75 mb-3 px-1">
            <span className="font-semibold uppercase tracking-wider text-olive">
              {isRevealed
                ? '✨ Secret Unlocked!'
                : `Foil Scratched: ${scratchedPercent}% (Auto-clears at 60%)`}
            </span>

            <button
              type="button"
              onClick={handleResetFoil}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:text-charcoal transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Foil</span>
            </button>
          </div>

          {/* Inner Concealed Card + HTML5 Scratch Canvas */}
          <div
            ref={containerRef}
            className="relative w-full min-h-[260px] sm:min-h-[280px] rounded-sm overflow-hidden border border-gold/50 bg-parchment select-none"
          >
            {/* Concealed Secret Ceremony Time & Venue Coordinates Layer */}
            <div className="p-5 sm:p-7 flex flex-col items-center justify-center text-center min-h-[260px] sm:min-h-[280px] paper-grain">
              <span className="px-3 py-0.5 rounded-full bg-peach/70 border border-gold/40 text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-charcoal mb-2">
                {COUPLE_DATA.secretCeremony.dateLine}
              </span>

              <div className="flex items-center justify-center gap-2 text-olive mt-1">
                <Clock className="w-4 h-4 shrink-0" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Sacred Ceremony Time
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-0.5">
                {COUPLE_DATA.secretCeremony.muhuratTime}
              </h3>

              {/* Exact Venue Coordinates & Secret Spot */}
              <div className="mt-4 pt-3 border-t border-dashed border-charcoal/20 w-full max-w-md">
                <div className="flex items-center justify-center gap-1.5 text-xs font-sans font-semibold text-olive">
                  <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{COUPLE_DATA.secretCeremony.secretSpot}</span>
                </div>

                <div className="mt-1.5 inline-flex flex-wrap items-center justify-center gap-2 bg-cream px-3.5 py-1.5 rounded-full border border-gold/40 shadow-sm">
                  <span className="font-mono text-xs sm:text-sm font-bold text-charcoal">
                    GPS: {COUPLE_DATA.secretCeremony.coordinates}
                  </span>
                  <span className="text-charcoal/30">|</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-olive">
                    <KeyRound className="w-3 h-3" />
                    Pass: {COUPLE_DATA.secretCeremony.gatePassCode}
                  </span>
                </div>

                <p className="font-hand text-lg sm:text-xl text-charcoal/85 mt-2.5 leading-snug">
                  “{COUPLE_DATA.secretCeremony.whisperNote}”
                </p>
              </div>
            </div>

            {/* Top Shimmering Gold Metallic Scratch-Off Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              aria-label="Scratch with finger or mouse to reveal the ceremony time and venue coordinates"
              style={{ touchAction: 'none' }}
              className={`absolute inset-0 z-20 cursor-crosshair transition-opacity duration-700 ${
                isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />
          </div>

          {/* Bottom Action Bar (Copy Coordinates / Open in Google Maps) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCopyCoords}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-parchment hover:bg-peach/60 border border-charcoal/15 text-xs font-sans font-semibold text-charcoal transition-colors"
            >
              {copiedCoords ? (
                <>
                  <Check className="w-3.5 h-3.5 text-olive" />
                  <span>Coordinates Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-olive" />
                  <span>Copy GPS ({COUPLE_DATA.secretCeremony.coordinates})</span>
                </>
              )}
            </button>

            <a
              href={COUPLE_DATA.coordinates.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal text-cream hover:bg-olive text-xs font-sans font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Secret Jetty in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

