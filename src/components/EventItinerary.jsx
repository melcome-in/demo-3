import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  Download,
  ExternalLink,
  Palette,
  Sparkles,
  Check,
} from 'lucide-react';
import { ITINERARY_EVENTS, COUPLE_DATA } from '../data/weddingData';
import {
  WashiTape,
  PostmarkCancellation,
  ScrapbookDivider,
} from './ScrapbookDoodles';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Build Google Calendar URL for an event
 */
function buildGoogleCalendarUrl(event) {
  const title = encodeURIComponent(`${COUPLE_DATA.groom} & ${COUPLE_DATA.bride} Wedding: ${event.title}`);
  const dates = `${event.calendarStartUTC}/${event.calendarEndUTC}`;
  const details = encodeURIComponent(
    `${event.subtitle}\n\n${event.description}\n\nDress Code: ${event.dressCodeTitle}\nCoordinates: ${event.coordinatesDisplay}`
  );
  const location = encodeURIComponent(`${event.venueFull} (${event.coordinates})`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Generate and download an .ics calendar file for an event
 */
function downloadIcsFile(event) {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AaravAndMeera//WeddingScrapbook//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-2026@aaravandmeera.wedding`,
    `DTSTAMP:20261031T080000Z`,
    `DTSTART:${event.calendarStartUTC}`,
    `DTEND:${event.calendarEndUTC}`,
    `SUMMARY:${COUPLE_DATA.groom} & ${COUPLE_DATA.bride}: ${event.title}`,
    `DESCRIPTION:${event.subtitle} - ${event.description} | Dress Code: ${event.dressCodeTitle}`,
    `LOCATION:${event.venueFull} (${event.coordinates})`,
    `GEO:${event.coordinates.replace(',', ';')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-aarav-meera-wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function EventPostcard({ event, index }) {
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState(0);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  const activeSwatch = event.swatches[selectedSwatchIdx] || event.swatches[0];
  const isPostcard = event.cardStyle === 'postcard';

  return (
    <article
      className={`itinerary-card relative bg-cream paper-grain rounded-sm shadow-postcard border-2 ${
        isPostcard ? 'border-gold/50' : 'border-charcoal/15'
      } transition-all duration-300`}
    >
      {/* Top Airmail / Luggage Tag Trim */}
      {isPostcard ? (
        <div className="h-2.5 w-full airmail-border opacity-85" aria-hidden="true" />
      ) : (
        /* Luggage Tag Brass Grommet Hole & Twine Loop */
        <div className="flex items-center justify-between px-6 py-2.5 bg-parchment border-b border-dashed border-charcoal/20">
          <div className="flex items-center gap-3">
            {/* Brass Eyelet Grommet SVG */}
            <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" aria-hidden="true">
              <circle cx="18" cy="18" r="14" fill="#C5A059" stroke="#2C2A29" strokeWidth="1.2" />
              <circle cx="18" cy="18" r="7" fill="#FDFBF7" stroke="#785A22" strokeWidth="1.5" />
              <path d="M4 18 Q-4 12 -6 4" stroke="#8C6D46" strokeWidth="2.5" fill="none" />
            </svg>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-charcoal uppercase">
              {event.tagCode}
            </span>
          </div>
          <span className="text-[11px] font-sans font-semibold text-olive uppercase tracking-widest">
            UDAIPUR · RAJASTHAN
          </span>
        </div>
      )}

      {/* Decorative Washi Tape on Corner */}
      <WashiTape
        variant={index % 2 === 0 ? 'olive-botanical' : 'peach-gingham'}
        rotation={index % 2 === 0 ? -4 : 4}
        className="w-32 sm:w-36 absolute -top-4 right-6 z-20"
      />

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Event Story, Timings, Highlights, Calendar & Map Actions */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach/65 border border-gold/40 text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                <span>Day 0{index + 1} Celebration</span>
              </span>

              <PostmarkCancellation text={event.postmark} className="w-36 h-12 hidden sm:block" />
            </div>

            <div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                {event.title}
              </h3>
              <p className="font-hand text-2xl text-olive mt-0.5">{event.subtitle}</p>
            </div>

            {/* Date, Time & Venue Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-parchment/85 p-4 rounded-sm border border-gold/30">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-olive mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] font-sans uppercase tracking-widest text-charcoal/60 font-semibold">
                    Date
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-bold text-charcoal">
                    {event.dateDisplay}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] font-sans uppercase tracking-widest text-charcoal/60 font-semibold">
                    Timings
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-bold text-charcoal">
                    {event.timeDisplay}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-charcoal/10">
                <MapPin className="w-4 h-4 text-olive mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] font-sans uppercase tracking-widest text-charcoal/60 font-semibold">
                    Venue &amp; GPS Coordinates
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-bold text-charcoal block">
                    {event.venueArea}
                  </span>
                  <span className="font-mono text-[11px] text-olive">
                    {event.venueFull} · ({event.coordinatesDisplay})
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-charcoal/80 leading-relaxed">
              {event.description}
            </p>

            {/* Highlights Pills */}
            <div className="flex flex-wrap gap-2">
              {event.highlights.map((item) => (
                <span
                  key={item}
                  className="text-xs font-sans font-medium bg-parchment px-3 py-1 rounded-full border border-charcoal/15 text-charcoal"
                >
                  ✦ {item}
                </span>
              ))}
            </div>

            {/* Action Buttons: "Add to Calendar" Dropdown & "Open in Google Maps" */}
            <div className="pt-3 flex flex-wrap items-center gap-3 relative">
              {/* Add to Calendar Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCalendarMenuOpen((prev) => !prev)}
                  aria-expanded={calendarMenuOpen}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-charcoal text-cream hover:bg-olive text-xs sm:text-sm font-sans font-semibold transition-colors shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Add to Calendar</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      calendarMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {calendarMenuOpen && (
                  <div className="absolute left-0 mt-2 w-60 rounded-sm bg-cream border-2 border-gold shadow-polaroid z-40 py-1.5 text-left">
                    <a
                      href={buildGoogleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setCalendarMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold text-charcoal hover:bg-peach/50 transition-colors"
                    >
                      <span>Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5 text-olive" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        downloadIcsFile(event);
                        setCalendarMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold text-charcoal hover:bg-peach/50 transition-colors border-t border-charcoal/10"
                    >
                      <span>Download .ics File (Apple/Outlook)</span>
                      <Download className="w-3.5 h-3.5 text-gold-dark" />
                    </button>
                  </div>
                )}
              </div>

              {/* Open in Google Maps Button with Venue Coordinates */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  event.coordinates
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-parchment hover:bg-peach/70 border border-gold/50 text-charcoal text-xs sm:text-sm font-sans font-semibold transition-colors"
              >
                <MapPin className="w-4 h-4 text-olive" />
                <span>Open in Google Maps ({event.coordinatesDisplay})</span>
                <ExternalLink className="w-3.5 h-3.5 text-charcoal/60" />
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Dress Code Color Swatches & Live Palette Preview */}
          <div className="lg:col-span-5 bg-parchment/90 border border-gold/40 rounded-sm p-5 sm:p-6 text-left lg:border-l-2 lg:border-dashed">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.18em] text-olive font-bold">
                <Palette className="w-3.5 h-3.5 text-gold-dark" />
                <span>Interactive Dress Code</span>
              </span>
              <span className="font-hand text-lg text-charcoal/70">Tap a swatch to preview</span>
            </div>

            <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
              {event.dressCodeTitle}
            </h4>
            <p className="font-sans text-xs text-charcoal/75 mt-1 mb-4">{event.dressCodeNote}</p>

            {/* Interactive Color Swatches Row */}
            <div
              role="radiogroup"
              aria-label={`${event.title} dress code color swatches`}
              className="grid grid-cols-4 gap-2.5 mb-5"
            >
              {event.swatches.map((swatch, sIdx) => {
                const isSelected = sIdx === selectedSwatchIdx;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedSwatchIdx(sIdx)}
                    className={`group flex flex-col items-center p-1.5 rounded-sm border transition-all ${
                      isSelected
                        ? 'bg-cream border-charcoal shadow-sm -translate-y-0.5'
                        : 'bg-cream/60 border-charcoal/15 hover:border-gold'
                    }`}
                  >
                    <span
                      className="w-full h-11 rounded-[2px] border border-charcoal/20 flex items-center justify-center relative shadow-inner"
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            swatch.textLight ? 'text-cream' : 'text-charcoal'
                          }`}
                        />
                      )}
                    </span>
                    <span className="text-[10px] font-sans font-semibold text-charcoal mt-1.5 text-center leading-tight line-clamp-1">
                      {swatch.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Fabric & Palette Preview Card */}
            <div className="bg-cream p-4 rounded-sm border border-charcoal/15 shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div
                  className="w-11 h-11 rounded-full border-2 border-charcoal/20 shrink-0 shadow-inner"
                  style={{ backgroundColor: activeSwatch.hex }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-charcoal">
                      {activeSwatch.name}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-parchment text-charcoal/80 border border-charcoal/10">
                      {activeSwatch.hex}
                    </span>
                  </div>
                  <span className="block text-[11px] font-sans font-semibold text-olive">
                    Fabric Mood: {activeSwatch.fabric}
                  </span>
                </div>
              </div>

              <p className="font-hand text-xl text-charcoal leading-snug border-t border-dashed border-charcoal/15 pt-2">
                “{activeSwatch.suggestion}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EventItinerary() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.itinerary-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 48, rotate: i % 2 === 0 ? -1.2 : 1.2 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="itinerary"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-parchment border border-gold/40 text-olive text-xs font-sans uppercase tracking-[0.2em] font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Three Days of Joy · Dec 12–14, 2026</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
            Event Details &amp; Itinerary
          </h2>

          <ScrapbookDivider label="Postcards & Luggage Tags" />

          <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
            Keep these luggage tags handy for our three-day celebration in Udaipur. Click any dress
            code swatch to preview the palette, save events to your calendar, or open exact
            courtyard pins in Google Maps.
          </p>
        </div>

        {/* Postcards & Luggage Tags Stack */}
        <div className="space-y-12 sm:space-y-16">
          {ITINERARY_EVENTS.map((event, index) => (
            <EventPostcard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

