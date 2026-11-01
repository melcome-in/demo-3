import React, { useState, useRef, useCallback } from 'react';
import { RotateCw, MapPin, Heart } from 'lucide-react';
import { WashiTape, PolaroidIllustration } from './ScrapbookDoodles';

export default function PolaroidCard({ milestone, index }) {
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovering: false,
  });

  const handlePointerMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) / rect.width; // 0..1
    const y = (clientY - rect.top) / rect.height; // 0..1

    const maxTilt = 11; // degrees
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    setTilt({
      rotateX: Number(rotateX.toFixed(2)),
      rotateY: Number(rotateY.toFixed(2)),
      glareX: Math.round(x * 100),
      glareY: Math.round(y * 100),
      isHovering: true,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovering: false,
    });
  }, []);

  const baseRotation = milestone.rotation || (index % 2 === 0 ? -2.5 : 2.5);

  return (
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) rotateZ(${
          tilt.isHovering ? baseRotation * 0.35 : baseRotation
        }deg) scale3d(${tilt.isHovering ? 1.02 : 1}, ${tilt.isHovering ? 1.02 : 1}, 1)`,
        transition: tilt.isHovering
          ? 'transform 80ms ease-out, box-shadow 200ms ease'
          : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 350ms ease',
      }}
      className="journey-polaroid-card relative w-full max-w-md mx-auto bg-[#FFFEFA] p-3.5 sm:p-5 pb-6 rounded-[3px] shadow-polaroid hover:shadow-polaroid-hover border border-charcoal/10 select-none will-change-transform"
    >
      {/* Top Washi Tape Graphic */}
      <WashiTape
        variant={milestone.tapeVariant}
        rotation={index % 2 === 0 ? -3.5 : 3.2}
        className="w-36 sm:w-44 absolute -top-5 left-1/2 -translate-x-1/2 z-30"
      />

      {/* Specular 3D Tilt Glare Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[3px] z-20 transition-opacity duration-300"
        style={{
          opacity: tilt.isHovering ? 0.32 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 252, 240, 0.85), transparent 65%)`,
        }}
      />

      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.16em] text-olive mb-2.5 px-0.5">
        <span className="font-semibold">{milestone.chapterLabel}</span>
        <span className="px-2 py-0.5 rounded bg-parchment border border-gold/40 text-charcoal font-bold text-[10px]">
          {milestone.stampText}
        </span>
      </div>

      {/* Polaroid Photo Window (Supports Front Photo & Back Handwritten Secret Note) */}
      <div className="relative aspect-[4/3.1] w-full overflow-hidden rounded-[2px] border border-charcoal/15 bg-parchment shadow-inner">
        {!isFlipped ? (
          <div className="w-full h-full relative">
            <PolaroidIllustration type={milestone.illustrationType} />
            {/* Vintage Warm Kodak Film Vignette Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 36px rgba(44, 42, 41, 0.25)',
                background:
                  'linear-gradient(180deg, rgba(250,210,192,0.08) 0%, rgba(197,160,89,0.12) 100%)',
              }}
            />
            {/* Bottom-left Location Pill inside Photo */}
            <div className="absolute bottom-2.5 left-2.5 bg-cream/90 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-charcoal/15 flex items-center gap-1.5 text-[11px] font-sans text-charcoal shadow-sm">
              <MapPin className="w-3 h-3 text-olive shrink-0" />
              <span className="font-medium">{milestone.locationTag}</span>
            </div>
          </div>
        ) : (
          /* Back of the Polaroid: Secret Handwritten Journal Note */
          <div className="w-full h-full bg-parchment lined-paper p-5 flex flex-col justify-between text-left relative">
            <div className="flex items-center justify-between border-b border-gold/40 pb-1.5">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-olive font-semibold">
                Back of Polaroid · Memory Note
              </span>
              <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
            </div>
            <p className="font-hand text-xl sm:text-2xl text-charcoal leading-relaxed my-auto py-2">
              “{milestone.secretBackNote}”
            </p>
            <div className="text-right font-hand text-lg text-olive">
              — Taped by Aarav &amp; Meera
            </div>
          </div>
        )}
      </div>

      {/* Polaroid Thick White Bottom Margin with Handwritten Date & Caption */}
      <div className="pt-4 px-1 text-left">
        {/* Handwritten Date Caption */}
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="font-hand text-xl sm:text-2xl font-bold text-olive tracking-wide">
            {milestone.handwrittenDate}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped((prev) => !prev);
            }}
            className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-gold-dark hover:text-olive transition-colors px-2 py-0.5 rounded-full bg-parchment/80 border border-gold/30"
          >
            <RotateCw className="w-3 h-3" />
            <span>{isFlipped ? 'View Photo' : 'Flip Polaroid'}</span>
          </button>
        </div>

        {/* Milestone Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-1">
          {milestone.title}
        </h3>

        {/* Handwritten Polaroid Caption */}
        <p className="font-hand text-xl sm:text-2xl text-charcoal/90 leading-snug mt-1">
          “{milestone.caption}”
        </p>

        {/* Full Story Paragraph */}
        <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed mt-2.5 pt-2.5 border-t border-dashed border-charcoal/15">
          {milestone.story}
        </p>
      </div>
    </div>
  );
}

