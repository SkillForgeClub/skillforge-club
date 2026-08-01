import React from "react";

/**
 * 3D Student Developer Graphic Component
 * Renders the 3D developer character with floating code badges,
 * bar charts, glowing neon cyan orbit rings, and stars matching the SkillForge design.
 */
export default function Student3DAvatar({ size = "md", className = "" }) {
  // Compact dimensions according to size variant
  const sizeMap = {
    xs: "w-16 h-16 sm:w-20 sm:h-20",
    sm: "w-24 h-24 sm:w-28 sm:h-28",
    md: "w-36 h-36 sm:w-44 sm:h-44",
    lg: "w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56",
  };

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${sizeMap[size] || sizeMap.md} ${className}`}>
      {/* Background Ambient Neon Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/10 rounded-full blur-2xl animate-pulse" />

      {/* SVG Illustration Container */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_15px_35px_rgba(0,180,255,0.25)]"
      >
        <defs>
          <linearGradient id="hoodieGrad" x1="150" y1="200" x2="350" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1d4ed8" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="orbitGrad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00f2ff" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="1" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="skinGrad" x1="200" y1="120" x2="300" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffdbac" />
            <stop offset="1" stopColor="#f1c27d" />
          </linearGradient>

          <linearGradient id="badgeGrad" x1="330" y1="200" x2="410" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="chartGrad" x1="340" y1="90" x2="420" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" />
            <stop offset="1" stopColor="#0369a1" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        <ellipse
          cx="250"
          cy="290"
          rx="210"
          ry="75"
          stroke="url(#orbitGrad)"
          strokeWidth="6"
          strokeDasharray="12 6"
          className="opacity-80"
          transform="rotate(-12 250 290)"
        />

        <g fill="#00f2ff" className="animate-pulse">
          <path d="M120 100 L124 112 L136 116 L124 120 L120 132 L116 120 L104 116 L116 112 Z" opacity="0.9" />
          <path d="M420 80 L423 89 L432 92 L423 95 L420 104 L417 95 L408 92 L417 89 Z" opacity="0.9" />
          <path d="M80 320 L82 327 L89 329 L82 331 L80 338 L78 331 L71 329 L78 327 Z" opacity="0.7" />
          <circle cx="440" cy="300" r="4" fill="#38bdf8" />
          <circle cx="90" cy="180" r="5" fill="#a855f7" />
        </g>

        <path d="M160 380 Q250 360 340 380 L350 480 Q250 490 150 480 Z" fill="#1e293b" opacity="0.6" />

        <g id="body">
          <path d="M130 350 Q250 310 370 350 L390 480 L110 480 Z" fill="url(#hoodieGrad)" />
          <path d="M250 320 L250 480" stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
          <path d="M235 325 Q235 375 230 400" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M265 325 Q265 375 270 400" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </g>

        <g id="head">
          <rect x="230" y="270" width="40" height="50" rx="10" fill="url(#skinGrad)" />
          <path d="M185 180 C185 120 315 120 315 180 C315 250 300 290 250 290 C200 290 185 250 185 180 Z" fill="url(#skinGrad)" />
          <circle cx="182" cy="210" r="14" fill="url(#skinGrad)" />
          <circle cx="318" cy="210" r="14" fill="url(#skinGrad)" />

          <path
            d="M175 180 C170 130 200 80 260 80 C310 80 330 110 325 150 C310 120 280 110 250 110 C210 110 185 140 175 180 Z"
            fill="#1e1b4b"
          />
          <path
            d="M190 150 C210 100 280 90 320 120 C300 95 250 85 220 110 C200 125 195 140 190 150 Z"
            fill="#312e81"
          />

          <path d="M205 180 Q225 170 240 182" stroke="#1e1b4b" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M260 182 Q275 170 295 180" stroke="#1e1b4b" strokeWidth="6" strokeLinecap="round" fill="none" />

          <ellipse cx="222" cy="205" rx="11" ry="14" fill="#0f172a" />
          <ellipse cx="278" cy="205" rx="11" ry="14" fill="#0f172a" />
          <circle cx="225" cy="200" r="4" fill="#ffffff" />
          <circle cx="281" cy="200" r="4" fill="#ffffff" />

          <path d="M225 242 Q250 265 275 242" stroke="#991b1b" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M230 244 Q250 260 270 244" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
        </g>

        <g id="laptop">
          <rect x="70" y="420" width="360" height="18" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <path d="M160 415 L340 415 L360 435 L140 435 Z" fill="#94a3b8" />
          <path d="M230 422 L270 422" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <path d="M175 320 L325 320 L340 415 L160 415 Z" fill="#cbd5e1" />
          <rect x="185" y="328" width="130" height="80" rx="4" fill="#0f172a" />
          <line x1="195" y1="340" x2="240" y2="340" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="195" y1="352" x2="270" y2="352" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="205" y1="364" x2="250" y2="364" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
          <line x1="205" y1="376" x2="285" y2="376" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
          <line x1="195" y1="388" x2="230" y2="388" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        </g>

        <ellipse
          cx="250"
          cy="290"
          rx="210"
          ry="75"
          stroke="url(#orbitGrad)"
          strokeWidth="6"
          strokeDasharray="30 18"
          transform="rotate(-12 250 290)"
          filter="url(#glow)"
        />

        <g transform="translate(350, 210)" filter="url(#badgeShadow)">
          <rect x="0" y="0" width="75" height="60" rx="16" fill="url(#badgeGrad)" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="37" y="38" fill="#38bdf8" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            &lt;/&gt;
          </text>
        </g>

        <g transform="translate(375, 110)" filter="url(#badgeShadow)">
          <rect x="0" y="0" width="65" height="55" rx="14" fill="url(#chartGrad)" stroke="#7dd3fc" strokeWidth="2" />
          <rect x="14" y="28" width="8" height="16" rx="2" fill="#ffffff" />
          <rect x="28" y="20" width="8" height="24" rx="2" fill="#ffffff" />
          <rect x="42" y="14" width="8" height="30" rx="2" fill="#ffffff" />
        </g>

        <g transform="translate(60, 180)" filter="url(#badgeShadow)">
          <rect x="0" y="0" width="55" height="50" rx="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <path d="M27 12 C27 12 37 20 35 32 L20 32 C18 20 27 12 27 12 Z" fill="#ffffff" />
          <circle cx="27" cy="22" r="3" fill="#0284c7" />
        </g>
      </svg>
    </div>
  );
}
