import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, ChevronDown, MapPin, Calendar, Heart } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import {
  WashiTape,
  MonogramWaxSeal,
  PostageStamp,
  PostmarkCancellation,
  OliveSprigDoodle,
} from './ScrapbookDoodles';

gsap.registerPlugin(useGSAP);

export default function HeroCover() {
  const heroRef = useRef(null);
  const [countdown, setCountdown] = useState({ days: 43, hours: 0, mins: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(COUPLE_DATA.primaryDateISO).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      setCountdown({ days, hours, mins });
    };
    updateCountdown();
    const id = setInterval(updateCountdown, 30000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-scrapbook-sheet',
        { y: 36, opacity: 0, rotate: -1.5, scale: 0.97 },
        { y: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.05 }
      )
        .fromTo(
          '.hero-wax-seal',
          { scale: 0.4, opacity: 0, rotate: -25 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.75, ease: 'back.out(1.7)' },
          '-=0.55'
        )
        .fromTo(
          '.hero-stagger',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.11, duration: 0.7 },
          '-=0.45'
        );
    },
    { scope: heroRef }
  );

  const scrollToJourney = () => {
    const el = document.getElementById('our-journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-6 pb-12 overflow-hidden"
    >
      {/* Top Quick Scrapbook Navigation Bar */}
      <nav
        aria-label="Wedding sections"
        className="w-full max-w-5xl z-20 flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 sm:px-6 rounded-full bg-parchment/85 backdrop-blur-md border border-gold/30 shadow-sm"
      >
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-bold tracking-wider text-charcoal flex items-center gap-2"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold/25 border border-gold text-xs font-serif">
            {COUPLE_DATA.monogram}
          </span>
          <span className="hidden xs:inline">Our Scrapbook</span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-charcoal/85">
          <a href="#our-journey" className="hover:text-olive transition-colors">
            Our Journey
          </a>
          <a href="#secret-reveal" className="hover:text-olive transition-colors">
            Secret Reveal
          </a>
          <a href="#itinerary" className="hover:text-olive transition-colors">
            Itinerary
          </a>
          <a
            href="#rsvp"
            className="px-3.5 py-1.5 rounded-full bg-charcoal text-cream hover:bg-olive transition-colors font-semibold text-xs tracking-wide"
          >
            1-Tap RSVP
          </a>
        </div>
      </nav>

      {/* Main Layered Vintage Scrapbook Cover Sheet */}
      <div className="relative w-full max-w-4xl my-auto py-8 sm:py-10">
        {/* Background rotated antique parchment under-sheet for layered scrapbook feel */}
        <div
          aria-hidden="true"
          className="absolute inset-2 sm:inset-4 bg-peach/45 border border-gold/35 rounded-sm -rotate-2 shadow-paper pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-1 sm:inset-3 bg-parchment border border-charcoal/15 rounded-sm rotate-1 shadow-paper pointer-events-none"
        />

        {/* Primary Cream Deckle-Edge Cover Card */}
        <div className="hero-scrapbook-sheet relative bg-cream paper-grain border-2 border-charcoal/15 shadow-polaroid rounded-sm px-5 sm:px-12 md:px-16 py-10 sm:py-14 text-center">
          {/* Top Washi Tapes holding the cover down */}
          <WashiTape
            variant="olive-botanical"
            rotation={-4}
            className="w-36 sm:w-44 absolute -top-5 left-6 sm:left-14 z-20"
          />
          <WashiTape
            variant="peach-gingham"
            rotation={5}
            className="w-36 sm:w-44 absolute -top-4 right-6 sm:right-14 z-20"
          />

          {/* Corner Brass Photo Mounts */}
          <div
            aria-hidden="true"
            className="w-6 h-6 border-t-2 border-l-2 border-gold absolute top-3 left-3"
          />
          <div
            aria-hidden="true"
            className="w-6 h-6 border-t-2 border-r-2 border-gold absolute top-3 right-3"
          />
          <div
            aria-hidden="true"
            className="w-6 h-6 border-b-2 border-l-2 border-gold absolute bottom-3 left-3"
          />
          <div
            aria-hidden="true"
            className="w-6 h-6 border-b-2 border-r-2 border-gold absolute bottom-3 right-3"
          />

          {/* Decorative Botanical Sprigs */}
          <OliveSprigDoodle className="w-24 sm:w-32 absolute top-8 left-4 opacity-80 hidden sm:block" />
          <OliveSprigDoodle
            flip
            className="w-24 sm:w-32 absolute bottom-10 right-4 opacity-80 hidden sm:block"
          />

          {/* Top-right Vintage Postage Stamp & Cancellation Mark */}
          <div className="hidden md:flex items-center gap-1 absolute top-6 right-8 rotate-3">
            <PostmarkCancellation text="UDAIPUR · 13 DEC 2026" className="w-32 -mr-6 z-10" />
            <PostageStamp city="UDAIPUR" year="2026" value="INVITE · № 01" />
          </div>

          {/* Handwritten Volume Tag */}
          <div className="hero-stagger inline-flex items-center gap-2 px-4 py-1 rounded-full bg-parchment border border-gold/40 text-olive text-xs sm:text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Keepsake Edition · Volume I · 2021 — 2026</span>
          </div>

          {/* Wedding Monogram Wax Seal Stamp */}
          <div className="hero-wax-seal my-3 flex justify-center">
            <div className="relative group">
              <MonogramWaxSeal
                monogram={COUPLE_DATA.monogram}
                className="w-28 h-28 sm:w-32 sm:h-32 mx-auto transition-transform duration-500 group-hover:scale-105"
              />
              <span className="block font-hand text-base text-gold-dark -mt-1">
                Sealed with love
              </span>
            </div>
          </div>

          {/* Handwritten Pre-header */}
          <p className="hero-stagger font-hand text-2xl sm:text-3xl text-olive mt-2 mb-1">
            Together with our families, we invite you to celebrate the wedding of
          </p>

          {/* Couple's Names */}
          <h1 className="hero-stagger font-serif text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-charcoal leading-[1.05] my-3">
            <span>{COUPLE_DATA.groom}</span>
            <span className="inline-block font-serif italic font-normal text-gold mx-3 sm:mx-5 text-4xl sm:text-6xl align-middle">
              &amp;
            </span>
            <span>{COUPLE_DATA.bride}</span>
          </h1>

          {/* Surnames & Hashtag */}
          <p className="hero-stagger font-serif italic text-base sm:text-xl text-charcoal/75 tracking-wide mb-6">
            {COUPLE_DATA.groomFull} &amp; {COUPLE_DATA.brideFull} ·{' '}
            <span className="not-italic font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-olive font-semibold">
              {COUPLE_DATA.hashtag}
            </span>
          </p>

          {/* Handwritten Quote Taped Slip */}
          <blockquote className="hero-stagger max-w-xl mx-auto bg-parchment/90 border border-gold/35 px-5 py-4 rounded-sm shadow-sm relative my-6 -rotate-1">
            <p className="font-hand text-xl sm:text-2xl text-charcoal leading-snug">
              {COUPLE_DATA.heroQuote}
            </p>
          </blockquote>

          {/* Date, Venue & Countdown Badges */}
          <div className="hero-stagger flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-6 text-xs sm:text-sm font-sans text-charcoal">
            <div className="flex items-center gap-2 bg-parchment px-4 py-2 rounded-full border border-charcoal/10">
              <Calendar className="w-4 h-4 text-olive shrink-0" />
              <span className="font-semibold">{COUPLE_DATA.weddingDateDisplay}</span>
            </div>

            <div className="flex items-center gap-2 bg-parchment px-4 py-2 rounded-full border border-charcoal/10">
              <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
              <span className="font-semibold">{COUPLE_DATA.venueShort}</span>
            </div>

            <div className="flex items-center gap-2 bg-peach/55 px-4 py-2 rounded-full border border-gold/30">
              <Heart className="w-3.5 h-3.5 text-charcoal fill-gold shrink-0" />
              <span className="font-semibold">
                {countdown.days}d : {countdown.hours}h : {countdown.mins}m to go
              </span>
            </div>
          </div>

          {/* Prompt: "Scroll to open our story" */}
          <div className="hero-stagger mt-10 pt-4 border-t border-dashed border-charcoal/15 flex flex-col items-center">
            <button
              type="button"
              onClick={scrollToJourney}
              className="group inline-flex flex-col items-center gap-2 text-charcoal hover:text-olive transition-colors focus:outline-none"
            >
              <span className="font-hand text-2xl sm:text-3xl text-charcoal group-hover:text-olive transition-colors">
                “Scroll to open our story”
              </span>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-parchment border border-gold/60 shadow-sm group-hover:bg-peach/60 transition-all animate-bounce">
                <ChevronDown className="w-5 h-5 text-charcoal" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

