import React, { useEffect, useState } from "react";

/**
 * Circular progress indicator. Pure presentational SVG — no colors introduced
 * outside the existing cyan/blue/purple/emerald/amber palette already used
 * across the dashboard.
 *
 * value: 0-100
 * color: tailwind-ish hex already in use elsewhere in the app
 */
const ProgressRing = ({
  value = 0,
  size = 88,
  strokeWidth = 8,
  color = "#22d3ee", // cyan-400
  trackColor = "rgba(255,255,255,0.08)",
  label,
  sublabel,
  animateMs = 900,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / animateMs);
      // ease-out-ish
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (clamped - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clamped]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - display / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)`, transition: "stroke-dashoffset 200ms linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black text-white leading-none" style={{ fontSize: size * 0.24 }}>
          {Math.round(display)}
          <span style={{ fontSize: size * 0.14 }}>%</span>
        </span>
        {label && <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1 text-center px-1">{label}</span>}
        {sublabel && <span className="text-[9px] text-slate-500 mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
};

export default ProgressRing;
