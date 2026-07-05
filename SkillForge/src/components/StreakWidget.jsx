import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const STORAGE_KEY = "sf_learning_streak";

const dayKey = (d) => d.toISOString().slice(0, 10);

/**
 * Tracks a lightweight, front-end-only "daily learning streak": each calendar
 * day the student opens the dashboard counts as a visit. Consecutive days
 * extend the streak, a missed day resets it. Purely cosmetic/local — does not
 * touch any backend or auth state.
 */
const useStreak = () => {
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState([]);

  useEffect(() => {
    let stored;
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      stored = null;
    }

    const today = new Date();
    const todayKey = dayKey(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = dayKey(yesterday);

    let history = stored?.history || [];
    let current = stored?.current || 0;

    if (!history.includes(todayKey)) {
      if (history.includes(yesterdayKey) || current === 0) {
        current = current + 1;
      } else {
        current = 1;
      }
      history = [...history, todayKey].slice(-30);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ current, history }));
      } catch {
        /* ignore storage failures (private browsing, quota, etc.) */
      }
    }

    setStreak(current);

    const last7 = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return { label: d.toLocaleDateString(undefined, { weekday: "narrow" }), active: history.includes(dayKey(d)) };
    });
    setWeek(last7);
  }, []);

  return { streak, week };
};

const StreakWidget = ({ variant = "card" }) => {
  const { streak, week } = useStreak();

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full" title={`${streak}-day learning streak`}>
        <Flame className={`w-4 h-4 ${streak > 0 ? "text-orange-400" : "text-slate-500"}`} />
        <span className="text-xs font-bold text-slate-200">{streak}</span>
      </div>
    );
  }

  return (
    <div className="stat-card relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Learning Streak</p>
          <h3 className="text-3xl font-black text-white tracking-tight flex items-baseline gap-1.5">
            {streak}
            <span className="text-sm font-bold text-slate-400">{streak === 1 ? "day" : "days"}</span>
          </h3>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-xl shrink-0">
          <Flame className={`w-6 h-6 ${streak > 0 ? "text-orange-400" : "text-slate-500"}`} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-1.5 mt-5 relative z-10">
        {week.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className={`w-full aspect-square max-w-7 rounded-lg border transition-colors duration-300 ${
                d.active
                  ? "bg-orange-500/80 border-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.4)]"
                  : "bg-white/5 border-white/10"
              }`}
            />
            <span className="text-[9px] text-slate-500 font-semibold">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakWidget;
