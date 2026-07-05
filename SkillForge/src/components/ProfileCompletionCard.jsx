import React from "react";
import { CheckCircle2, Circle, UserCog } from "lucide-react";
import ProgressRing from "./ProgressRing";

/**
 * Reads fields already present on the student's profile/overview payload —
 * no new API calls, no schema changes — and turns them into a completion
 * checklist + ring so the dashboard feels alive even on day one.
 */
const ProfileCompletionCard = ({ profile, assignedMentor }) => {
  const domainList = (profile?.domain_interest || "")
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);

  const checklist = [
    { label: "Display name set", done: Boolean(profile?.name) },
    { label: "Email verified", done: Boolean(profile?.email) },
    { label: "Domain of interest chosen", done: domainList.length > 0 },
    { label: "Mentor assigned", done: Boolean(assignedMentor) },
  ];

  const doneCount = checklist.filter((c) => c.done).length;
  const percent = Math.round((doneCount / checklist.length) * 100);

  return (
    <div className="stat-card">
      <div className="flex items-center gap-2 mb-5">
        <UserCog className="w-4 h-4 text-purple-400" />
        <p className="text-slate-400 text-sm font-medium">Profile Completion</p>
      </div>
      <div className="flex items-center gap-5">
        <ProgressRing value={percent} size={80} strokeWidth={7} color="#a78bfa" label="Complete" />
        <ul className="space-y-2 flex-1 min-w-0">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-xs">
              {item.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <span className={item.done ? "text-slate-300" : "text-slate-500"}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCompletionCard;
