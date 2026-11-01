import React from 'react';

/**
 * Lightweight inline SVG Washi Tape strip with realistic jagged edges and patterned fill.
 */
export function WashiTape({ variant = 'olive-botanical', className = '', rotation = -2 }) {
  const uid = React.useId();

  const configs = {
    'olive-botanical': {
      base: '#6B7F5E',
      opacity: 0.78,
      accent: '#FDFBF7',
    },
    'gold-dots': {
      base: '#C5A059',
      opacity: 0.8,
      accent: '#FDFBF7',
    },
    'peach-gingham': {
      base: '#FAD2C0',
      opacity: 0.85,
      accent: '#C5A059',
    },
    'parchment-script': {
      base: '#E7DAC6',
      opacity: 0.88,
      accent: '#6B7F5E',
    },
  };

  const cfg = configs[variant] || configs['olive-botanical'];

  return (
    <svg
      viewBox="0 0 180 42"
      className={`select-none pointer-events-none drop-shadow-sm ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={`dots-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill={cfg.accent} opacity="0.65" />
          <circle cx="12" cy="12" r="1.6" fill={cfg.accent} opacity="0.65" />
        </pattern>
        <pattern id={`gingham-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="7" height="14" fill="#E39D83" opacity="0.28" />
          <rect width="14" height="7" fill="#E39D83" opacity="0.28" />
        </pattern>
        <pattern id={`botanical-${uid}`} width="36" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M4 26 Q18 14 32 16 M12 22 C11 16 15 12 18 13 C17 18 14 21 12 22 Z M22 17 C23 11 27 9 29 11 C27 15 24 17 22 17 Z"
            stroke="#FDFBF7"
            strokeWidth="1.3"
            fill="#FDFBF7"
            fillOpacity="0.35"
            strokeLinecap="round"
          />
        </pattern>
        <pattern id={`script-${uid}`} width="60" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M4 12 Q12 6 20 12 T36 12 T54 12"
            fill="none"
            stroke="#6B7F5E"
            strokeWidth="1"
            opacity="0.45"
          />
          <circle cx="30" cy="12" r="2" fill="#C5A059" opacity="0.6" />
        </pattern>
      </defs>

      {/* Serrated Washi Tape Silhouette */}
      <path
        d="M6 4 L174 3 L171 10 L176 16 L172 22 L176 29 L173 37 L7 38 L10 31 L5 25 L9 18 L4 11 Z"
        fill={cfg.base}
        fillOpacity={cfg.opacity}
      />
      <path
        d="M6 4 L174 3 L171 10 L176 16 L172 22 L176 29 L173 37 L7 38 L10 31 L5 25 L9 18 L4 11 Z"
        fill={
          variant === 'olive-botanical'
            ? `url(#botanical-${uid})`
            : variant === 'gold-dots'
            ? `url(#dots-${uid})`
            : variant === 'peach-gingham'
            ? `url(#gingham-${uid})`
            : `url(#script-${uid})`
        }
      />
      {/* Subtle tape highlight edge */}
      <path
        d="M9 6 L170 5"
        stroke="#FDFBF7"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="6 4"
      />
    </svg>
  );
}

/**
 * Embossed Wedding Monogram Wax Seal & Stamp SVG
 */
export function MonogramWaxSeal({ monogram = 'A & M', className = '' }) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={`select-none ${className}`}
      role="img"
      aria-label={`Wedding monogram seal ${monogram}`}
    >
      <defs>
        <radialGradient id="waxGoldGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#EAD39C" />
          <stop offset="45%" stopColor="#C5A059" />
          <stop offset="85%" stopColor="#9B7938" />
          <stop offset="100%" stopColor="#785A22" />
        </radialGradient>
        <filter id="waxDropShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#2C2A29" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Organic melted wax outer shape */}
      <path
        filter="url(#waxDropShadow)"
        d="M70 7 C84 6 95 13 107 19 C119 25 130 36 132 50 C134 64 131 78 128 92 C124 106 113 118 100 125 C87 132 73 134 58 131 C43 128 28 122 19 109 C10 96 7 80 9 65 C11 50 17 34 29 23 C41 12 56 8 70 7 Z"
        fill="url(#waxGoldGrad)"
      />

      {/* Inner embossed rim */}
      <circle
        cx="70"
        cy="70"
        r="49"
        fill="none"
        stroke="#785A22"
        strokeWidth="2.2"
        opacity="0.7"
      />
      <circle
        cx="70"
        cy="70"
        r="45"
        fill="none"
        stroke="#FDFBF7"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.65"
      />

      {/* Botanical olive branches inside seal */}
      <path
        d="M36 82 C30 66 36 46 52 36 M104 82 C110 66 104 46 88 36"
        fill="none"
        stroke="#FDFBF7"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="70" cy="31" r="2.2" fill="#FDFBF7" opacity="0.8" />
      <circle cx="70" cy="108" r="2.2" fill="#FDFBF7" opacity="0.8" />

      {/* Monogram Letters */}
      <text
        x="70"
        y="76"
        textAnchor="middle"
        fill="#2C2A29"
        className="font-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="1.5"
      >
        {monogram}
      </text>
      <text
        x="70"
        y="95"
        textAnchor="middle"
        fill="#2C2A29"
        fontSize="7.5"
        fontWeight="600"
        letterSpacing="2.2"
        opacity="0.85"
      >
        13 · XII · 2026
      </text>
    </svg>
  );
}

/**
 * Vintage Perforated Postage Stamp SVG
 */
export function PostageStamp({ city = 'UDAIPUR', year = '2026', value = 'LOVE · ₹10', className = '' }) {
  return (
    <div
      className={`inline-block bg-cream p-1.5 shadow-stamp border border-charcoal/15 relative select-none ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 0 6px, transparent 3px, #FDFBF7 3.5px)',
      }}
    >
      <div className="border border-olive/60 bg-parchment/80 p-2 w-24 h-28 flex flex-col justify-between items-center text-center relative overflow-hidden">
        <span className="text-[8px] tracking-[0.2em] uppercase font-sans font-semibold text-olive">
          INDIA POST · AIR
        </span>

        {/* Palace & Lake miniature arch */}
        <svg viewBox="0 0 64 48" className="w-14 h-12 my-0.5" aria-hidden="true">
          <path
            d="M8 42 L56 42 M14 42 L14 24 Q20 16 24 24 L24 42 M24 42 L24 18 Q32 6 40 18 L40 42 M40 42 L40 24 Q44 16 50 24 L50 42"
            fill="none"
            stroke="#6B7F5E"
            strokeWidth="1.5"
          />
          <circle cx="32" cy="14" r="2" fill="#C5A059" />
          <path d="M10 45 Q22 43 32 45 T54 45" fill="none" stroke="#C5A059" strokeWidth="1.2" />
        </svg>

        <div className="w-full border-t border-charcoal/15 pt-1 flex items-center justify-between text-[8px] font-serif font-bold text-charcoal">
          <span>{city}</span>
          <span className="text-gold-dark">{year}</span>
        </div>
        <span className="text-[7px] text-charcoal/60 tracking-widest">{value}</span>
      </div>
    </div>
  );
}

/**
 * Circular Postmark Cancellation Mark
 */
export function PostmarkCancellation({ text = 'UDAIPUR · 13 DEC 2026', className = '' }) {
  return (
    <svg
      viewBox="0 0 180 70"
      className={`select-none pointer-events-none text-charcoal/35 ${className}`}
      aria-hidden="true"
    >
      <circle cx="35" cy="35" r="28" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="35"
        cy="35"
        r="23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <text
        x="35"
        y="32"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="1.2"
        fill="currentColor"
      >
        SPECIALPOST
      </text>
      <text
        x="35"
        y="42"
        textAnchor="middle"
        fontSize="6"
        fontWeight="600"
        letterSpacing="0.8"
        fill="currentColor"
      >
        {text.slice(0, 12)}
      </text>
      {/* Wavy cancellation lines */}
      <path
        d="M68 20 Q82 14 96 20 T124 20 T152 20 T176 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M68 35 Q82 29 96 35 T124 35 T152 35 T176 35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M68 50 Q82 44 96 50 T124 50 T152 50 T176 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/**
 * Pressed Olive Foliage Doodle (#6B7F5E)
 */
export function OliveSprigDoodle({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={`select-none pointer-events-none ${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 68 Q48 45 104 14"
        fill="none"
        stroke="#6B7F5E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Olive Leaves */}
      <path
        d="M32 54 C26 42 32 30 42 32 C42 42 38 50 32 54 Z"
        fill="#6B7F5E"
        fillOpacity="0.28"
        stroke="#6B7F5E"
        strokeWidth="1.4"
      />
      <path
        d="M46 47 C56 52 66 46 64 38 C56 38 50 42 46 47 Z"
        fill="#6B7F5E"
        fillOpacity="0.22"
        stroke="#6B7F5E"
        strokeWidth="1.4"
      />
      <path
        d="M62 36 C57 25 63 14 72 17 C72 26 67 32 62 36 Z"
        fill="#6B7F5E"
        fillOpacity="0.28"
        stroke="#6B7F5E"
        strokeWidth="1.4"
      />
      <path
        d="M76 29 C86 33 95 28 93 20 C85 20 80 24 76 29 Z"
        fill="#6B7F5E"
        fillOpacity="0.22"
        stroke="#6B7F5E"
        strokeWidth="1.4"
      />
      {/* Gold berries */}
      <circle cx="48" cy="43" r="3" fill="#C5A059" />
      <circle cx="77" cy="26" r="2.6" fill="#C5A059" />
    </svg>
  );
}

/**
 * Ornamental Botanical & Gold Foil Section Divider
 */
export function ScrapbookDivider({ label = '' }) {
  return (
    <div className="flex items-center justify-center gap-4 my-6 select-none" aria-hidden="true">
      <svg viewBox="0 0 120 20" className="w-24 sm:w-32 h-5 text-olive/70">
        <path
          d="M4 10 L95 10 M82 10 C76 4 68 4 64 10 C68 16 76 16 82 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="3 3"
        />
        <circle cx="106" cy="10" r="3" fill="#C5A059" />
      </svg>
      {label ? (
        <span className="font-hand text-xl text-olive tracking-wide px-1">{label}</span>
      ) : (
        <span className="text-gold text-sm">✦</span>
      )}
      <svg viewBox="0 0 120 20" className="w-24 sm:w-32 h-5 text-olive/70 -scale-x-100">
        <path
          d="M4 10 L95 10 M82 10 C76 4 68 4 64 10 C68 16 76 16 82 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="3 3"
        />
        <circle cx="106" cy="10" r="3" fill="#C5A059" />
      </svg>
    </div>
  );
}

/**
 * Rich Illustrated Vintage Photographs for inside the Polaroid Cards
 */
export function PolaroidIllustration({ type = 'bookshop-rain' }) {
  if (type === 'bookshop-rain') {
    return (
      <svg viewBox="0 0 320 250" className="w-full h-full object-cover" aria-hidden="true">
        <defs>
          <linearGradient id="rainBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8C8B4" />
            <stop offset="60%" stopColor="#EADBC8" />
            <stop offset="100%" stopColor="#CBB69D" />
          </linearGradient>
        </defs>
        <rect width="320" height="250" fill="url(#rainBg)" />
        {/* Warm bookshop window arch */}
        <rect x="28" y="24" width="264" height="196" rx="8" fill="#463D36" />
        <rect x="38" y="34" width="244" height="176" rx="4" fill="#F5E6D3" />
        {/* Bookshelves */}
        <line x1="38" y1="88" x2="282" y2="88" stroke="#8C6D46" strokeWidth="4" />
        <line x1="38" y1="142" x2="282" y2="142" stroke="#8C6D46" strokeWidth="4" />
        {/* Books on top shelf */}
        <rect x="52" y="54" width="14" height="32" fill="#6B7F5E" />
        <rect x="68" y="50" width="12" height="36" fill="#C5A059" />
        <rect x="82" y="58" width="15" height="28" fill="#B66D5E" />
        <rect x="148" y="46" width="18" height="40" fill="#A64B3B" rx="1" />
        <rect x="210" y="52" width="14" height="34" fill="#6B7F5E" />
        <rect x="226" y="56" width="16" height="30" fill="#8C6D46" />
        {/* Warm hanging pendant lamp */}
        <line x1="160" y1="34" x2="160" y2="62" stroke="#2C2A29" strokeWidth="1.5" />
        <path d="M145 68 L175 68 L168 58 L152 58 Z" fill="#C5A059" />
        <circle cx="160" cy="74" r="24" fill="#FAD2C0" opacity="0.45" />
        {/* Couple silhouettes reaching for the same book */}
        <circle cx="132" cy="128" r="13" fill="#2C2A29" />
        <path d="M114 210 C114 165 148 165 148 210 Z" fill="#6B7F5E" />
        <circle cx="188" cy="132" r="12.5" fill="#2C2A29" />
        <path d="M170 210 C170 168 205 168 205 210 Z" fill="#C87A65" />
        {/* Two hands meeting at the poetry book */}
        <path
          d="M140 155 Q155 110 157 90 M180 158 Q165 112 159 90"
          stroke="#2C2A29"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Tiny heart above book */}
        <path
          d="M160 80 C157 75 150 76 152 82 C154 86 160 90 160 90 C160 90 166 86 168 82 C170 76 163 75 160 80 Z"
          fill="#C85A48"
        />
        {/* Rain streaks outside */}
        <g stroke="#FDFBF7" strokeWidth="1.2" opacity="0.6">
          <line x1="48" y1="40" x2="40" y2="75" />
          <line x1="260" y1="45" x2="252" y2="80" />
          <line x1="95" y1="150" x2="87" y2="185" />
          <line x1="245" y1="155" x2="237" y2="190" />
        </g>
        {/* Two steaming cups of chai on window ledge */}
        <rect x="140" y="194" width="14" height="14" rx="2" fill="#C5A059" />
        <rect x="166" y="194" width="14" height="14" rx="2" fill="#C5A059" />
        <path d="M147 190 Q144 182 149 177 M173 190 Q170 182 175 177" stroke="#8C6D46" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }

  if (type === 'spiti-stars') {
    return (
      <svg viewBox="0 0 320 250" className="w-full h-full object-cover" aria-hidden="true">
        <defs>
          <linearGradient id="spitiSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F242D" />
            <stop offset="55%" stopColor="#353E4B" />
            <stop offset="100%" stopColor="#6D5E57" />
          </linearGradient>
        </defs>
        <rect width="320" height="250" fill="url(#spitiSky)" />
        {/* Milky way & crescent moon */}
        <ellipse cx="165" cy="60" rx="120" ry="26" transform="rotate(-18 165 60)" fill="#FAD2C0" opacity="0.16" />
        <path d="M255 38 A16 16 0 1 1 238 58 A12 12 0 1 0 255 38 Z" fill="#EAD39C" />
        {/* Stars */}
        {[
          [42, 34, 2],
          [78, 52, 1.5],
          [115, 28, 2.2],
          [148, 62, 1.8],
          [188, 30, 2.4],
          [212, 68, 1.4],
          [60, 88, 1.7],
          [278, 82, 2],
          [135, 42, 1.3],
          [170, 50, 2.1],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#FDFBF7" opacity="0.9" />
        ))}
        {/* Shooting star */}
        <line x1="75" y1="38" x2="118" y2="22" stroke="#EAD39C" strokeWidth="1.5" strokeLinecap="round" />
        {/* Snow-capped Himalayan peaks */}
        <polygon points="0,185 68,102 142,185" fill="#4A535E" />
        <polygon points="68,102 48,126 68,120 88,128" fill="#FDFBF7" opacity="0.85" />
        <polygon points="95,185 182,88 265,185" fill="#3B434D" />
        <polygon points="182,88 158,118 182,110 206,120" fill="#FDFBF7" opacity="0.9" />
        <polygon points="210,185 275,112 320,185" fill="#555E69" />
        {/* Foreground camp & couple sitting on blanket */}
        <rect x="0" y="182" width="320" height="68" fill="#2C2A29" />
        {/* Warm glowing tent */}
        <polygon points="48,196 86,154 124,196" fill="#C5A059" />
        <polygon points="74,196 86,166 98,196" fill="#FAD2C0" />
        {/* Couple leaning together watching stars */}
        <circle cx="192" cy="166" r="10" fill="#FAD2C0" />
        <circle cx="212" cy="169" r="9.5" fill="#FAD2C0" />
        <path d="M176 205 Q202 168 228 205 Z" fill="#C87A65" />
        {/* Campfire glow */}
        <circle cx="155" cy="196" r="14" fill="#E69F2A" opacity="0.35" />
        <path d="M150 198 Q155 182 160 198 Z" fill="#FAD2C0" />
      </svg>
    );
  }

  if (type === 'lake-proposal') {
    return (
      <svg viewBox="0 0 320 250" className="w-full h-full object-cover" aria-hidden="true">
        <defs>
          <linearGradient id="sunsetLake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6A17E" />
            <stop offset="48%" stopColor="#FAD2C0" />
            <stop offset="55%" stopColor="#D69C72" />
            <stop offset="100%" stopColor="#7C5E54" />
          </linearGradient>
        </defs>
        <rect width="320" height="250" fill="url(#sunsetLake)" />
        {/* Golden sun */}
        <circle cx="160" cy="112" r="38" fill="#FDFBF7" opacity="0.78" />
        <circle cx="160" cy="112" r="52" fill="#C5A059" opacity="0.22" />
        {/* Distant Udaipur Palace domes on horizon */}
        <path
          d="M0 135 L38 135 L38 118 L48 110 L58 118 L58 135 L250 135 L250 116 L262 104 L274 116 L274 135 L320 135 L320 140 L0 140 Z"
          fill="#5A453E"
          opacity="0.75"
        />
        {/* Shimmering water ripples */}
        <g stroke="#FDFBF7" strokeWidth="1.5" opacity="0.65" strokeLinecap="round">
          <line x1="128" y1="152" x2="192" y2="152" />
          <line x1="136" y1="164" x2="184" y2="164" />
          <line x1="118" y1="178" x2="202" y2="178" />
          <line x1="142" y1="215" x2="178" y2="215" />
        </g>
        {/* Wooden Shikara Boat */}
        <path d="M72 186 Q160 216 248 186 L230 204 Q160 224 90 204 Z" fill="#2C2A29" />
        {/* Canopy pillars */}
        <line x1="112" y1="188" x2="112" y2="142" stroke="#2C2A29" strokeWidth="2" />
        <line x1="208" y1="188" x2="208" y2="142" stroke="#2C2A29" strokeWidth="2" />
        <path d="M104 142 Q160 124 216 142 Z" fill="#6B7F5E" />
        {/* Couple in boat with ring box */}
        <circle cx="144" cy="162" r="8.5" fill="#2C2A29" />
        <path d="M132 192 Q144 168 156 192 Z" fill="#C5A059" />
        <circle cx="176" cy="158" r="8.5" fill="#2C2A29" />
        <path d="M164 192 Q176 164 188 192 Z" fill="#C85A48" />
        {/* Ring sparkle */}
        <circle cx="160" cy="168" r="3" fill="#FDFBF7" />
        <path d="M160 160 L160 176 M152 168 L168 168" stroke="#FDFBF7" strokeWidth="1.2" />
      </svg>
    );
  }

  // Default: 'banyan-wedding'
  return (
    <svg viewBox="0 0 320 250" className="w-full h-full object-cover" aria-hidden="true">
      <defs>
        <linearGradient id="banyanBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4ECE1" />
          <stop offset="65%" stopColor="#FAD2C0" />
          <stop offset="100%" stopColor="#DFC4A8" />
        </linearGradient>
      </defs>
      <rect width="320" height="250" fill="url(#banyanBg)" />
      {/* Sacred Banyan Canopy */}
      <circle cx="160" cy="54" r="78" fill="#6B7F5E" opacity="0.85" />
      <circle cx="92" cy="68" r="56" fill="#5A6D4E" opacity="0.85" />
      <circle cx="228" cy="68" r="56" fill="#5A6D4E" opacity="0.85" />
      {/* Hanging Marigold Garlands & Brass Bells */}
      {[68, 102, 136, 184, 218, 252].map((x, idx) => (
        <g key={idx}>
          <line
            x1={x}
            y1="85"
            x2={x}
            y2={idx % 2 === 0 ? '146' : '132'}
            stroke="#E69F2A"
            strokeWidth="3"
            strokeDasharray="4 3"
          />
          <circle cx={x} cy={idx % 2 === 0 ? 150 : 136} r="3.5" fill="#C5A059" />
        </g>
      ))}
      {/* Mandap Pillars */}
      <rect x="82" y="118" width="8" height="98" fill="#8C6D46" />
      <rect x="230" y="118" width="8" height="98" fill="#8C6D46" />
      <path d="M76 120 Q160 98 244 120" fill="none" stroke="#C5A059" strokeWidth="4" />
      {/* Bride & Groom under Mandap */}
      <circle cx="146" cy="162" r="9.5" fill="#2C2A29" />
      <path d="M132 216 C132 178 160 178 160 216 Z" fill="#C5A059" />
      <circle cx="174" cy="164" r="9" fill="#2C2A29" />
      <path d="M160 216 C160 180 188 180 188 216 Z" fill="#C85A48" />
      {/* Courtyard floor */}
      <rect x="0" y="214" width="320" height="36" fill="#C5A059" opacity="0.4" />
    </svg>
  );
}

