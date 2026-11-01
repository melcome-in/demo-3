import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Compass, Sparkles } from 'lucide-react';
import { JOURNEY_MILESTONES } from '../data/weddingData';
import PolaroidCard from './PolaroidCard';
import { ScrapbookDivider, OliveSprigDoodle } from './ScrapbookDoodles';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function JourneyRoadmap() {
  const sectionRef = useRef(null);
  const roadmapContainerRef = useRef(null);
  const animatedPathRef = useRef(null);
  const travelerDotRef = useRef(null);

  useGSAP(
    () => {
      const pathEl = animatedPathRef.current;
      if (!pathEl) return;

      const totalLength = pathEl.getTotalLength();

      // Set initial strokeDasharray and strokeDashoffset for real-time scroll drawing
      gsap.set(pathEl, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      // Animate stroke-dashoffset in real-time as the user scrolls
      gsap.to(pathEl, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: roadmapContainerRef.current,
          start: 'top 72%',
          end: 'bottom 68%',
          scrub: 0.5,
          onUpdate: (self) => {
            if (travelerDotRef.current && pathEl) {
              const point = pathEl.getPointAtLength(self.progress * totalLength);
              gsap.set(travelerDotRef.current, {
                attr: { cx: point.x, cy: point.y },
              });
            }
          },
        },
      });

      // Staggered entry animation for each Polaroid milestone wrapper (pop + slight random rotation)
      const milestoneNodes = gsap.utils.toArray('.milestone-entry-item');
      milestoneNodes.forEach((node, idx) => {
        const targetRotation = idx % 2 === 0 ? -2.6 : 2.6;
        gsap.fromTo(
          node,
          {
            opacity: 0,
            y: 64,
            scale: 0.88,
            rotate: idx % 2 === 0 ? -7 : 7,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: targetRotation * 0.25,
            duration: 0.9,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: node,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate milestone anchor badges on the path
      const pins = gsap.utils.toArray('.milestone-anchor-pin');
      pins.forEach((pin) => {
        gsap.fromTo(
          pin,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: pin,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="our-journey"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Decorative Background Foliage */}
      <OliveSprigDoodle className="w-36 absolute top-16 -left-6 opacity-40 pointer-events-none" />
      <OliveSprigDoodle
        flip
        className="w-36 absolute bottom-20 -right-6 opacity-40 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-parchment border border-gold/40 text-olive text-xs font-sans uppercase tracking-[0.2em] font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>The Story So Far · 2021 — 2026</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
            Our Journey in Polaroids
          </h2>

          <ScrapbookDivider label="Every mile led us here" />

          <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
            Follow the hand-drawn trail through our favorite keepsakes. Tilt any Polaroid with your
            finger or mouse—or tap <span className="font-semibold text-olive">“Flip Polaroid”</span>{' '}
            to read the secret note written on the back.
          </p>
        </div>

        {/* Interactive Roadmap Container with Continuous Vertical Curved SVG Path */}
        <div ref={roadmapContainerRef} className="relative">
          {/* Continuous Vertical Curved SVG Path (Visible on both Mobile & Desktop) */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-3xl pointer-events-none z-0"
          >
            <svg
              viewBox="0 0 600 1800"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="journeyInkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B7F5E" />
                  <stop offset="50%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#6B7F5E" />
                </linearGradient>

                {/* Mask to keep the animated path styled as a vintage dashed trail */}
                <mask id="dashedTrailMask">
                  <path
                    ref={animatedPathRef}
                    d="M 300 20 C 510 190, 90 390, 300 560 C 510 730, 90 930, 300 1120 C 510 1310, 140 1540, 300 1770"
                    fill="none"
                    stroke="white"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </mask>
              </defs>

              {/* Base Faint Unscrolled Dashed Trail */}
              <path
                d="M 300 20 C 510 190, 90 390, 300 560 C 510 730, 90 930, 300 1120 C 510 1310, 140 1540, 300 1770"
                fill="none"
                stroke="#C5A059"
                strokeOpacity="0.28"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
              />

              {/* Real-Time Scroll-Triggered Dashed Path revealed by the stroke-dashoffset mask */}
              <path
                d="M 300 20 C 510 190, 90 390, 300 560 C 510 730, 90 930, 300 1120 C 510 1310, 140 1540, 300 1770"
                fill="none"
                stroke="url(#journeyInkGradient)"
                strokeWidth="4.5"
                strokeDasharray="12 9"
                strokeLinecap="round"
                mask="url(#dashedTrailMask)"
              />

              {/* Live Traveling Gold Wax Bead Marker */}
              <circle
                ref={travelerDotRef}
                cx="300"
                cy="20"
                r="9"
                fill="#C5A059"
                stroke="#FDFBF7"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Milestones List */}
          <div className="relative z-10 space-y-20 sm:space-y-28 py-6">
            {JOURNEY_MILESTONES.map((milestone, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Polaroid Card Column */}
                  <div className="w-full md:w-5/12 milestone-entry-item">
                    <PolaroidCard milestone={milestone} index={idx} />
                  </div>

                  {/* Center Path Milestone Anchor Badge */}
                  <div className="md:w-2/12 flex flex-col items-center justify-center relative z-20">
                    <div className="milestone-anchor-pin w-14 h-14 rounded-full bg-cream border-2 border-gold shadow-polaroid flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-sans uppercase tracking-widest text-olive font-bold leading-none">
                        STOP
                      </span>
                      <span className="font-serif text-lg font-bold text-charcoal leading-tight">
                        {milestone.stepNumber}
                      </span>
                    </div>
                  </div>

                  {/* Handwritten Scrapbook Margin Note on Opposite Side */}
                  <div
                    className={`w-full md:w-5/12 flex ${
                      isLeft ? 'md:justify-start' : 'md:justify-end'
                    } justify-center`}
                  >
                    <div
                      className={`max-w-xs bg-parchment/90 border border-gold/35 px-5 py-4 rounded-sm shadow-paper relative ${
                        isLeft ? 'rotate-1' : '-rotate-1'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-olive text-xs font-sans uppercase tracking-widest font-semibold mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span>Margin Note · {milestone.stampText}</span>
                      </div>
                      <p className="font-hand text-xl sm:text-2xl text-charcoal leading-snug">
                        “{milestone.secretBackNote}”
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

