import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  Users,
  User,
  Heart,
  CheckCircle2,
  MessageSquareHeart,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import {
  WashiTape,
  PostageStamp,
  PostmarkCancellation,
  ScrapbookDivider,
  MonogramWaxSeal,
} from './ScrapbookDoodles';

const EVENT_CHOICES = [
  { id: 'haldi', label: 'Haldi & Mehendi (Dec 12)' },
  { id: 'ceremony', label: 'Wedding Ceremony (Dec 13)' },
  { id: 'reception', label: 'Starlight Reception (Dec 14)' },
];

export default function DirectRSVP() {
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [attendance, setAttendance] = useState('Joyfully Accepts');
  const [selectedEvents, setSelectedEvents] = useState(['haldi', 'ceremony', 'reception']);
  const [note, setNote] = useState('');
  const [isStamped, setIsStamped] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const toggleEventChoice = (id) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Build formatted WhatsApp RSVP message & https://wa.me/... URL
  const { whatsappMessage, whatsappUrl } = useMemo(() => {
    const cleanName = guestName.trim() || 'A Beloved Guest';
    const eventsText =
      attendance === 'Regretfully Declines'
        ? 'Sending warm blessings from afar'
        : EVENT_CHOICES.filter((e) => selectedEvents.includes(e.id))
            .map((e) => e.label)
            .join(', ') || 'All Wedding Celebrations';

    const lines = [
      `✨ *Wedding Scrapbook RSVP — ${COUPLE_DATA.groom} & ${COUPLE_DATA.bride}* ✨`,
      `• *Guest Name:* ${cleanName}`,
      `• *Status:* ${attendance}`,
      `• *Number of Guests:* ${attendance === 'Regretfully Declines' ? 0 : guestCount}`,
      `• *Celebrations:* ${eventsText}`,
    ];

    if (note.trim()) {
      lines.push(`• *Note / Song Request:* "${note.trim()}"`);
    }
    lines.push(`\n📍 Udaipur · Dec 12–14, 2026 (${COUPLE_DATA.hashtag})`);

    const msg = lines.join('\n');
    const url = `https://wa.me/${COUPLE_DATA.rsvpWhatsAppNumber}?text=${encodeURIComponent(msg)}`;
    return { whatsappMessage: msg, whatsappUrl: url };
  }, [guestName, guestCount, attendance, selectedEvents, note]);

  const handleRsvpClick = () => {
    setIsStamped(true);
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#C5A059', '#6B7F5E', '#FAD2C0', '#2C2A29'],
      });
    } catch {
      // Ignore confetti error in headless environments
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard?.writeText(whatsappMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  return (
    <section
      id="rsvp"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-parchment/70 border-t border-gold/30"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-gold/40 text-olive text-xs font-sans uppercase tracking-[0.2em] font-semibold mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-gold" />
            <span>Répondez S’il Vous Plaît · By Nov 25, 2026</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
            Direct 1-Tap RSVP Postcard
          </h2>

          <ScrapbookDivider label="Sign & send via WhatsApp" />

          <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
            Fill out your reply slip below and tap{' '}
            <span className="font-semibold text-olive">“Send 1-Tap RSVP on WhatsApp”</span> to
            deliver your attendance directly to our wedding concierge with a pre-filled note.
          </p>
        </div>

        {/* Reply Postcard Container */}
        <div className="relative bg-cream paper-grain rounded-sm shadow-polaroid border-2 border-charcoal/15 p-6 sm:p-10 md:p-12">
          {/* Top Washi Tapes */}
          <WashiTape
            variant="peach-gingham"
            rotation={-3}
            className="w-36 sm:w-44 absolute -top-5 left-8 z-20"
          />
          <WashiTape
            variant="olive-botanical"
            rotation={3.5}
            className="w-36 sm:w-44 absolute -top-5 right-8 z-20"
          />

          {/* Top Postcard Header with Postage Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-dashed border-charcoal/15">
            <div className="text-left">
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-olive font-bold block">
                REPLY TELEGRAM · KISMET POST
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                To: {COUPLE_DATA.groom} &amp; {COUPLE_DATA.bride} · Udaipur
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <PostmarkCancellation text="RSVP · UDAIPUR" className="w-32 hidden sm:block -mr-4" />
              <PostageStamp city="RSVP" year="2026" value="1-TAP · WA" />
            </div>
          </div>

          {/* Form Grid */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRsvpClick();
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }}
            className="space-y-6 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Guest Full Name */}
              <div className="md:col-span-7">
                <label
                  htmlFor="rsvp-guest-name"
                  className="block text-xs font-sans uppercase tracking-[0.16em] text-charcoal font-bold mb-2"
                >
                  Your Full Name (or Family Name) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-olive absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="rsvp-guest-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g., Rohan & Priya Verma"
                    className="w-full pl-10 pr-4 py-3 rounded-sm bg-parchment/80 border border-charcoal/20 focus:border-olive focus:bg-cream focus:outline-none font-serif text-lg text-charcoal placeholder:text-charcoal/40"
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div className="md:col-span-5">
                <label
                  htmlFor="rsvp-guest-count"
                  className="block text-xs font-sans uppercase tracking-[0.16em] text-charcoal font-bold mb-2"
                >
                  Number of Guests
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Users className="w-4 h-4 text-olive absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="rsvp-guest-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-sm bg-parchment/80 border border-charcoal/20 focus:border-olive focus:bg-cream focus:outline-none font-sans text-sm font-semibold text-charcoal"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick +/- Stepper Buttons */}
                  <button
                    type="button"
                    aria-label="Decrease guests"
                    onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                    className="w-11 h-11 rounded-sm bg-parchment border border-charcoal/20 hover:bg-peach/60 font-bold text-charcoal transition-colors"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    aria-label="Increase guests"
                    onClick={() => setGuestCount((c) => Math.min(10, c + 1))}
                    className="w-11 h-11 rounded-sm bg-parchment border border-charcoal/20 hover:bg-peach/60 font-bold text-charcoal transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Radio Pills */}
            <div>
              <span className="block text-xs font-sans uppercase tracking-[0.16em] text-charcoal font-bold mb-2.5">
                Will You Be Celebrating With Us?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Joyfully Accepts', sub: 'Cannot wait to dance!' },
                  { label: 'Celebrating from Afar', sub: 'Sending love & blessings' },
                  { label: 'Regretfully Declines', sub: 'Will miss the festivities' },
                ].map((opt) => {
                  const active = attendance === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setAttendance(opt.label)}
                      className={`p-3.5 rounded-sm border text-left transition-all ${
                        active
                          ? 'bg-peach/60 border-charcoal shadow-sm'
                          : 'bg-parchment/55 border-charcoal/15 hover:border-gold'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-bold text-charcoal">
                          {opt.label}
                        </span>
                        {active && <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />}
                      </div>
                      <span className="block font-hand text-base text-charcoal/75 mt-0.5">
                        {opt.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Events Multi-Select */}
            {attendance !== 'Regretfully Declines' && (
              <div>
                <span className="block text-xs font-sans uppercase tracking-[0.16em] text-charcoal font-bold mb-2.5">
                  Which Celebrations Will You Attend?
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {EVENT_CHOICES.map((ev) => {
                    const checked = selectedEvents.includes(ev.id);
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => toggleEventChoice(ev.id)}
                        className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-sans font-semibold border transition-all inline-flex items-center gap-2 ${
                          checked
                            ? 'bg-olive text-cream border-olive shadow-sm'
                            : 'bg-parchment text-charcoal border-charcoal/20 hover:border-olive'
                        }`}
                      >
                        <span>{checked ? '✓' : '+'}</span>
                        <span>{ev.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Personal Note / Song Request */}
            <div>
              <label
                htmlFor="rsvp-note"
                className="block text-xs font-sans uppercase tracking-[0.16em] text-charcoal font-bold mb-2"
              >
                Handwritten Blessing, Dietary Note, or Song Request (Optional)
              </label>
              <textarea
                id="rsvp-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a sweet wish for Aarav & Meera or tell us what song gets you on the dance floor..."
                className="w-full px-4 py-3 rounded-sm bg-parchment/80 lined-paper border border-charcoal/20 focus:border-olive focus:bg-cream focus:outline-none font-hand text-2xl text-charcoal placeholder:text-charcoal/40"
              />
            </div>

            {/* Live Pre-filled WhatsApp Message Preview Slip */}
            <div className="bg-parchment/90 border border-gold/40 rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-olive font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-dark" />
                  Pre-Filled WhatsApp Message Preview
                </span>
                <p className="font-sans text-xs text-charcoal/80 whitespace-pre-line">
                  {whatsappMessage}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream border border-charcoal/20 text-xs font-sans font-semibold text-charcoal hover:bg-peach/50 transition-colors"
              >
                {copiedMsg ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-olive" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-olive" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Primary 1-Tap WhatsApp RSVP Action Link & Submit */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleRsvpClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-olive hover:bg-charcoal text-cream font-sans text-sm sm:text-base font-bold tracking-wide shadow-polaroid hover:shadow-polaroid-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 text-peach" />
                <span>Send 1-Tap RSVP via WhatsApp</span>
              </a>

              {isStamped ? (
                <div className="inline-flex items-center gap-2 text-olive font-hand text-2xl animate-bounce">
                  <CheckCircle2 className="w-5 h-5 text-olive" />
                  <span>Postcard Sealed &amp; Ready in WhatsApp!</span>
                </div>
              ) : (
                <span className="font-hand text-xl text-charcoal/70">
                  Opens WhatsApp with your RSVP pre-typed ✨
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Footer Keepsake Monogram */}
        <footer className="mt-20 text-center space-y-3 pb-10">
          <MonogramWaxSeal monogram={COUPLE_DATA.monogram} className="w-20 h-20 mx-auto" />
          <p className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            {COUPLE_DATA.groom} &amp; {COUPLE_DATA.bride}
          </p>
          <p className="font-hand text-xl text-olive">
            “See you under the marigolds &amp; starlight in Udaipur”
          </p>
          <p className="font-sans text-xs text-charcoal/55 uppercase tracking-[0.2em]">
            {COUPLE_DATA.weddingDateDisplay} · {COUPLE_DATA.venueShort} · {COUPLE_DATA.hashtag}
          </p>
        </footer>
      </div>
    </section>
  );
}

