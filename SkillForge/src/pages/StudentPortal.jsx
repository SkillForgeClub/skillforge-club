import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Rocket, BookOpen, Trophy, Target, Clock, CheckCircle2, MessageSquare, BrainCircuit, Code2, Loader2, User, CalendarCheck, ExternalLink, ChevronRight, Star, Layers, Globe, Database, Brain, Cpu, Shield, Smartphone, BarChart2, Send, Lock, Paintbrush, Award, ClipboardCheck, UserCheck, Activity, Zap } from "lucide-react";
import { getTokenFor, getUser, logout } from "../auth";

// Shared animation variants
const fadeUp = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } }, exit: { opacity: 0, y: -14, transition: { duration: 0.2, ease: 'easeIn' } } };
const sectionAnim = { initial: { opacity: 0, x: 18 }, animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }, exit: { opacity: 0, x: -18, transition: { duration: 0.18, ease: 'easeIn' } } };

import { API_BASE } from "../config";
const BASE = API_BASE;
const authFetch = async (path) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${getTokenFor("student")}` },
  });
  return res.json();
};

import Student3DAvatar from "../components/Student3DAvatar";

// Q&A Modal Component
const QnaModal = ({ onClose }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "How do I submit my practical assignment code?",
      answer: "Go to the Assignments section in your student portal, click 'Submit Link', and paste your public GitHub repository or Google Drive URL.",
      author: "Admin Team",
    },
    {
      id: 2,
      question: "When are new mentor tasks assigned?",
      answer: "Your allocated mentor assigns tasks weekly based on your chosen domain roadmap (e.g. Data Science, Web Dev).",
      author: "Monish (Mentor)",
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        question: newQuestion,
        answer: "Submitted! Your mentor will review and answer this shortly.",
        author: "Pending Mentor Response",
      },
    ]);
    setNewQuestion("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b132b] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-lg">
            <MessageSquare className="w-5 h-5" /> Student Q&A / Ask Doubt
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-xl px-2">
            ✕
          </button>
        </div>

        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {questions.map((q) => (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <p className="text-white font-bold text-sm">Q: {q.question}</p>
              <p className="text-slate-300 text-xs leading-relaxed bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-xl">
                💡 <span className="font-semibold text-cyan-300">{q.author}:</span> {q.answer}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-white/10">
          <label className="block text-xs font-bold text-slate-300">Ask a new doubt to mentor:</label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            required
            className="w-full px-4 py-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
          />
          <div className="flex items-center justify-between">
            {submitted && <span className="text-xs text-emerald-400 font-bold">✓ Question submitted!</span>}
            <button
              type="submit"
              className="ml-auto px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-all shadow-md"
            >
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -- Overview ------------------------------------------------------------------
const OverviewView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQnaModal, setShowQnaModal] = useState(false);

  useEffect(() => {
    Promise.all([
      authFetch("/student/overview"),
      authFetch("/assignments/my-mentor"),
      authFetch("/student/profile"),
    ]).then(([overview, mentor, profile]) => {
      setData({
        stats: overview?.stats ?? { totalProjects: 0, skillsLearned: 0, overallProgress: 0, tasksCompleted: 0 },
        progress: overview?.progress ?? [],
        assignments: overview?.assignments ?? [],
        registeredEvents: overview?.registeredEvents ?? [],
        activity: overview?.activity ?? [],
        assignedMentor: mentor ?? null,
        profile: profile?.id ? profile : null,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const markDone = async (id) => {
    await fetch(`${BASE}/student/assignments/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getTokenFor("student")}` },
    });
    setData((prev) => ({
      ...prev,
      assignments: prev.assignments.map((a) =>
        a.id === id ? { ...a, status: "Completed", type: "done" } : a
      ),
    }));
  };

  if (loading || !data) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-cyan-400 w-8 h-8" /></div>;

  const stats = [
    { title: "Registered Events", value: data.stats.totalProjects, icon: <Rocket className="w-6 h-6 text-cyan-400" />, color: "from-cyan-500/20" },
    { title: "Skills Learned", value: data.stats.skillsLearned, icon: <BookOpen className="w-6 h-6 text-purple-400" />, color: "from-purple-500/20" },
    { title: "Overall Progress", value: data.stats.overallProgress, icon: <Target className="w-6 h-6 text-blue-400" />, color: "from-blue-500/20" },
    { title: "Tasks Completed", value: data.stats.tasksCompleted, icon: <Trophy className="w-6 h-6 text-yellow-400" />, color: "from-yellow-500/20" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome to SkillForge Hero Banner Card (Image 2) */}
      <div className="bg-gradient-to-r from-[#060c20] via-[#091538] to-[#070e28] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Ambient background glow Orbs */}
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

        {/* Left Content Column */}
        <div className="space-y-4 max-w-xl text-left relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              SkillForge
            </span>
          </h2>

          <p className="text-slate-300 font-medium text-base sm:text-lg flex flex-wrap items-center gap-2">
            <span>Build Skills</span>
            <span className="text-cyan-400 font-bold">•</span>
            <span>Build Projects</span>
            <span className="text-cyan-400 font-bold">•</span>
            <span>Build Future</span>
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/student-portal/domains")}
              className="px-6 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:border-cyan-400 hover:text-white flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Domains</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {!data.assignedMentor && (
              <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <span>Mentor pending assignment (<a href="/contact" className="underline font-semibold">@admin</a>)</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Content Column: 3D Developer Student Avatar Illustration */}
        <div className="relative z-10 flex-shrink-0">
          <Student3DAvatar size="md" />
        </div>
      </div>

      {/* 3 Overview Stat Cards: Tasks, Tasks Completed, Certificates Earned */}
      <div className="bg-[#0b132b]/80 border border-blue-500/20 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">

          {/* 1. Tasks */}
          <div className="flex items-center gap-4 sm:pr-4 pt-1 sm:pt-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-md flex-shrink-0">
              <ClipboardCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {data.assignments?.length || 0}
              </div>
              <div className="text-sm font-semibold text-slate-200">Tasks</div>
              <div className="text-xs text-slate-400">Assigned to you</div>
            </div>
          </div>

          {/* 2. Tasks Completed */}
          <div className="flex items-center gap-4 sm:px-6 pt-4 sm:pt-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-md flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {data.assignments?.filter(a => a.status === "Completed" || a.type === "done").length || data.stats.tasksCompleted || 0}
              </div>
              <div className="text-sm font-semibold text-slate-200">Tasks Completed</div>
              <div className="text-xs text-slate-400">Finished</div>
            </div>
          </div>

          {/* 3. Certificates Earned */}
          <div className="flex items-center gap-4 sm:pl-6 pt-4 sm:pt-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-md flex-shrink-0">
              <Award className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {data.stats.certificatesEarned || 0}
              </div>
              <div className="text-sm font-semibold text-slate-200">Certificates Earned</div>
              <div className="text-xs text-slate-400">Unlocked</div>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Assignments — only visible if mentor is assigned */}
          <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Assigned Tasks</h3>
            {!data.assignedMentor ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-10 gap-4 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-slate-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Assignments</p>
                  <p className="text-slate-400 text-sm mt-1 max-w-xs">No mentor has been assigned yet. Assignments will be available after mentor allocation.</p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {data.assignments.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-6">No tasks assigned yet. Your mentor will add tasks soon.</p>
                ) : data.assignments.map((task) => (
                  <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/80 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      {task.type === "done" ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Clock className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      )}
                      <div>
                        <h4 className="font-semibold text-white">{task.title}</h4>
                        <p className="text-sm text-slate-400">Deadline: <span className={task.type === "urgent" ? "text-rose-400 font-bold" : ""}>{task.deadline}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${task.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                        {task.status}
                      </span>
                      {task.status !== "Completed" && (
                        <button onClick={() => markDone(task.id)} className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-slate-900 transition-all">
                          Mark Done
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Card 1: My Domains */}
          <div className="bg-[#0a1228]/80 border border-blue-500/20 rounded-2xl p-5 shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">My Domains</h3>
              <button onClick={() => navigate("/student-portal/domains")} className="text-xs font-bold text-blue-400 hover:underline">
                View all
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3.5 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl font-bold text-xs flex items-center gap-1.5 w-fit shadow-sm">
                  <Code2 className="w-3.5 h-3.5" /> {(data.profile?.domain_interest || "Data Science").split(",")[0].trim()}
                </span>
                <p className="text-xs text-slate-400 mt-3 font-medium">Keep exploring new technologies!</p>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="22" fill="url(#planetGrad)" />
                  <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="#60a5fa" strokeWidth="4" transform="rotate(-20 50 50)" opacity="0.8" />
                  <ellipse cx="50" cy="50" rx="44" ry="14" fill="none" stroke="#93c5fd" strokeWidth="2" transform="rotate(-20 50 50)" opacity="0.5" />
                  <defs>
                    <radialGradient id="planetGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(42 40) scale(28)">
                      <stop stopColor="#60a5fa" />
                      <stop offset="0.6" stopColor="#2563eb" />
                      <stop offset="1" stopColor="#1e3a8a" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Assigned Mentor */}
          <div className="bg-[#0a1228]/80 border border-blue-500/20 rounded-2xl p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <UserCheck className="w-4 h-4 text-cyan-400" /> Assigned Mentor
            </h3>
            {data.assignedMentor || true ? (
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold border-2 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex-shrink-0">
                  {(data.assignedMentor?.name || "Monish").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{data.assignedMentor?.name || "Monish"}</h4>
                  <p className="text-xs text-cyan-400 font-medium">{data.assignedMentor?.email || "monish@mentor.com"}</p>
                  <p className="text-[0.7rem] text-slate-400 mt-1">Assigned on {data.assignedMentor?.assignedAt ? new Date(data.assignedMentor.assignedAt).toLocaleDateString() : "8/1/2026"}</p>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-xs">No mentor assigned yet. Contact admin.</p>
            )}
          </div>

          {/* Card 3: Upcoming Events */}
          <div className="bg-[#0a1228]/80 border border-blue-500/20 rounded-2xl p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <CalendarCheck className="w-4 h-4 text-cyan-400" /> Upcoming Events
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-2 font-medium">
                  {data.registeredEvents?.length > 0 ? `${data.registeredEvents.length} event(s) registered` : "No upcoming events"}
                </p>
                <button onClick={() => navigate("/student-portal/events")} className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1">
                  Browse events →
                </button>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" viewBox="0 0 100 100" fill="none">
                  <rect x="20" y="25" width="60" height="55" rx="12" fill="#2563eb" />
                  <rect x="20" y="25" width="60" height="18" rx="12" fill="#ef4444" />
                  <rect x="20" y="35" width="60" height="8" fill="#ef4444" />
                  <rect x="32" y="18" width="6" height="14" rx="3" fill="#cbd5e1" />
                  <rect x="62" y="18" width="6" height="14" rx="3" fill="#cbd5e1" />
                  <rect x="30" y="48" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                  <rect x="46" y="48" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                  <rect x="62" y="48" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                  <rect x="30" y="62" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                  <rect x="46" y="62" width="8" height="8" rx="2" fill="#60a5fa" />
                  <rect x="62" y="62" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                  <path d="M16 68 L18 72 L22 74 L18 76 L16 80 L14 76 L10 74 L14 72 Z" fill="#fbbf24" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4: Recent Activity */}
          <div className="bg-[#0a1228]/80 border border-blue-500/20 rounded-2xl p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-400" /> Recent Activity
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-300 font-semibold">No recent activity</p>
                <p className="text-[0.7rem] text-slate-400 mt-1 max-w-[130px] leading-relaxed">Start learning to see your activity here!</p>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-20 h-12" viewBox="0 0 100 50" fill="none">
                  <path
                    d="M0 35 Q 20 45, 35 25 T 70 30 T 100 15"
                    fill="none"
                    stroke="url(#purpleWave)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="purpleWave" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a855f7" />
                      <stop offset="0.5" stopColor="#c084fc" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Quote of the Day, Club Announcements, Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">

        {/* 1. Quote of the Day */}
        <div className="bg-gradient-to-br from-[#0c132c] via-[#101b42] to-[#180e36] border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[190px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm mb-3">
              <span className="text-xl leading-none">“</span> Quote of the Day
            </div>
            <p className="text-white font-semibold text-base leading-relaxed max-w-sm italic">
              "The expert in anything was once a beginner."
            </p>
          </div>

          <p className="text-slate-400 text-xs font-semibold mt-4">— Helen Hayes</p>
        </div>

        {/* 2. Club Announcements */}
        <div className="bg-gradient-to-br from-[#09132c] to-[#0c183a] border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[190px]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 max-w-[65%]">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm">
                <span>📢</span> Club Announcements
              </div>
              <h4 className="text-white font-bold text-base leading-tight">Hackathon Registration Open!</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Register now for SkillForge Hackathon 2026. Show your skills, build amazing projects and win exciting prizes!
              </p>
            </div>

            {/* 3D Blue Trophy SVG Graphic */}
            <div className="flex-shrink-0">
              <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" viewBox="0 0 100 100" fill="none">
                <path d="M30 25 H70 V45 C70 58 60 68 50 68 C40 68 30 58 30 45 Z" fill="#2563eb" />
                <path d="M35 25 H65 V42 C65 52 58 60 50 60 C42 60 35 52 35 42 Z" fill="#3b82f6" />
                <rect x="46" y="68" width="8" height="15" fill="#1d4ed8" />
                <rect x="35" y="83" width="30" height="8" rx="3" fill="#1e3a8a" />
                <path d="M30 30 C20 30 20 45 30 48" stroke="#3b82f6" strokeWidth="4" fill="none" />
                <path d="M70 30 C80 30 80 45 70 48" stroke="#3b82f6" strokeWidth="4" fill="none" />
                <path d="M50 35 L52 40 L57 41 L53 44 L54 49 L50 46 L46 49 L47 44 L43 41 L48 40 Z" fill="#fbbf24" />
              </svg>
            </div>
          </div>

          <button onClick={() => navigate("/student-portal/events")} className="w-fit px-4 py-1.5 rounded-xl bg-blue-600/30 text-cyan-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all mt-3">
            Read More
          </button>
        </div>

        {/* 3. Quick Actions Grid */}
        <div className="bg-[#0a1228]/80 border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between min-h-[190px]">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm mb-4">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> Quick Actions
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Resources */}
            <button onClick={() => navigate("/student-portal/resources")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-900/40 border border-blue-500/30 hover:scale-105 transition-all group">
              <BookOpen className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="text-xs font-bold text-white">Resources</span>
            </button>

            {/* 2. Assignments */}
            <button onClick={() => navigate("/student-portal/assignments")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-emerald-600/30 to-emerald-900/40 border border-emerald-500/30 hover:scale-105 transition-all group">
              <ClipboardCheck className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="text-xs font-bold text-white">Assignments</span>
            </button>

            {/* 3. Q&A -> Direct to Google Form */}
            <button
              onClick={() => window.open("https://forms.gle/4cEyGRVQiQPwu9nC7", "_blank", "noopener,noreferrer")}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-purple-600/30 to-purple-900/40 border border-purple-500/30 hover:scale-105 transition-all group"
            >
              <MessageSquare className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="text-xs font-bold text-white">Q&A</span>
            </button>

            {/* 4. Feedback -> Direct to Home */}
            <button onClick={() => navigate("/")} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-amber-600/30 to-amber-900/40 border border-amber-500/30 hover:scale-105 transition-all group">
              <Send className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="text-xs font-bold text-white">Feedback</span>
            </button>
          </div>
        </div>

      </div>

      {showQnaModal && <QnaModal onClose={() => setShowQnaModal(false)} />}
    </div>
  );
};

// -- Profile -------------------------------------------------------------------
// -- Profile -------------------------------------------------------------------
const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", bio: "", year: "", branch: "", section: "", roll_number: "", domain_interest: "" });
  const [saveStatus, setSaveStatus] = useState(""); // "", "saving", "saved", "error"
  const autoSaveTimer = useRef(null);

  const BRANCHES = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "AIDS", "AIML", "CSD", "Other"];
  const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const SECTIONS = ["A", "B", "C", "D", "E"];

  const fetchProfile = useCallback(() => {
    authFetch("/student/profile")
      .then((d) => {
        setProfile(d?.id ? d : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const autoSave = (updatedForm) => {
    clearTimeout(autoSaveTimer.current);
    setSaveStatus("saving");
    autoSaveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE}/student/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${getTokenFor("student")}` },
          body: JSON.stringify(updatedForm),
        });
        const json = await res.json();
        if (!res.ok) { setSaveStatus("error"); return; }
        setProfile(json.student ?? { ...profile, ...updatedForm });
        const stored = JSON.parse(localStorage.getItem("studentUser") || "{}");
        localStorage.setItem("studentUser", JSON.stringify({ ...stored, name: updatedForm.name }));
        window.dispatchEvent(new Event("user-profile-updated"));
        setSaveStatus("saved");
      } catch { setSaveStatus("error"); }
    }, 800);
  };

  const setField = (key, val) => {
    const updated = { ...editForm, [key]: val };
    setEditForm(updated);
    autoSave(updated);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-cyan-400 w-8 h-8" /></div>;
  if (!profile) return <div className="text-center text-slate-400 py-20">Could not load profile. Please try again.</div>;

  const initials = profile.name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) ?? "??";
  const domainList = (profile.domain_interest || "").split(",").map((d) => d.trim()).filter(Boolean);

  const startEdit = () => {
    setEditForm({
      name: profile.name || "",
      phone: profile.phone || "",
      bio: profile.bio || "",
      year: profile.year || "",
      branch: profile.branch || "",
      section: profile.section || "",
      roll_number: profile.roll_number || "",
      domain_interest: profile.domain_interest || "",
    });
    setSaveStatus("");
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    clearTimeout(autoSaveTimer.current);
    setSaveStatus("saving");
    try {
      const res = await fetch(`${BASE}/student/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getTokenFor("student")}` },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      setProfile(json.student ?? { ...profile, ...editForm });
      const stored = JSON.parse(localStorage.getItem("studentUser") || "{}");
      localStorage.setItem("studentUser", JSON.stringify({ ...stored, name: editForm.name }));
      window.dispatchEvent(new Event("user-profile-updated"));
      setSaveStatus("success");
      setIsEditing(false);
    } catch { setSaveStatus("error"); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {!isEditing ? (
        <div className="bg-[#1c2536]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-800 rounded-full flex-shrink-0 flex items-center justify-center border-4 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.3)] font-black text-5xl text-white">
              {initials}
            </div>
            <div className="text-center md:text-left w-full space-y-4">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold border bg-cyan-500/10 text-cyan-400 border-cyan-500/20 uppercase tracking-wider">
                  {profile.role} Member
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-1">{profile.name}</h2>
                <p className="text-slate-400 font-medium text-sm">{profile.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 max-w-md">
                {[
                  { label: "My Domains", value: domainList.length, color: "text-cyan-400" },
                  { label: "Joined Year", value: new Date(profile.created_at || profile.createdAt).getFullYear(), color: "text-yellow-400" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center min-h-[85px] overflow-hidden">
                    <span className={`block font-black ${color} mb-0.5 leading-none text-center ${typeof value === "string" && value.length > 7
                        ? "text-xs sm:text-sm md:text-base"
                        : "text-lg sm:text-2xl"
                      }`}>
                      {value}
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider text-center leading-normal mt-1">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 relative z-10 space-y-6">
            <h3 className="text-xl font-bold text-white">Student Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Display Name</span>
                <p className="text-white text-base font-semibold">{profile.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email Address</span>
                <p className="text-white text-base font-semibold">{profile.email}</p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Domains Subscribed</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {domainList.length === 0 ? (
                    <p className="text-slate-400 text-sm">No domains selected</p>
                  ) : domainList.map((d) => (
                    <span key={d} className="px-3 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-lg text-xs font-bold">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={startEdit}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-cyan-500/20"
              >
                Edit Profile Details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-[#1c2536]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-white">Edit Profile</h2>
              <p className="text-slate-400 text-sm mt-1">Changes are saved automatically as you type.</p>
            </div>
            <div className="text-xs">
              {saveStatus === "saving" && <span className="text-slate-400 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Saving...</span>}
              {saveStatus === "saved" && <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Saved</span>}
              {saveStatus === "error" && <span className="text-rose-400">Save failed</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input type="text" value={editForm.name} onChange={(e) => setField("name", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors" required />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</label>
              <input type="text" value={editForm.phone} onChange={(e) => setField("phone", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. 9876543210" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Roll Number</label>
              <input type="text" value={editForm.roll_number} onChange={(e) => setField("roll_number", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. 22CS001" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Year</label>
              <select value={editForm.year} onChange={(e) => setField("year", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors">
                <option value="">Select Year</option>
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Branch</label>
              <select value={editForm.branch} onChange={(e) => setField("branch", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors">
                <option value="">Select Branch</option>
                {BRANCHES.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Section</label>
              <select value={editForm.section} onChange={(e) => setField("section", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors">
                <option value="">Select Section</option>
                {SECTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Domain Interest <span className="text-slate-500 normal-case font-normal">(comma-separated)</span></label>
              <input type="text" value={editForm.domain_interest} onChange={(e) => setField("domain_interest", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. Web Development, AI/ML" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Bio</label>
              <textarea value={editForm.bio} onChange={(e) => setField("bio", e.target.value)} rows={3}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors resize-none" placeholder="Tell us about yourself..." />
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex items-center justify-between gap-4">
            {saveStatus === "error" && (
              <p className="text-rose-400 text-sm font-bold">Failed to update details. Try again.</p>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent text-slate-400 hover:text-white hover:border-white/20 transition-all font-bold text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveStatus === "loading"}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
              >
                {saveStatus === "loading" ? "Saving..." : "Save Details"}
              </button>
            </div>
          </div>
        </form>
      )}

      {!isEditing && <ChangePasswordCard />}
    </div>
  );
};

const ChangePasswordCard = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(""); // "", "loading", "success", "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // client side validations
    if (newPassword !== confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg("New password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setErrorMsg("New password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setErrorMsg("New password must contain at least one lowercase letter.");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setErrorMsg("New password must contain at least one number.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(`${BASE}/student/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFor("student")}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password.");
      }
      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#1c2536]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-cyan-400" /> Security Settings
        </h3>
        <p className="text-slate-400 text-sm mt-1">Change your portal access password. You will need your login credentials sent to you (current password) and a new password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors text-sm"
              placeholder="Enter current password"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors text-sm"
              placeholder="Min. 8 chars, 1 uppercase, 1 number"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors text-sm"
              placeholder="Confirm new password"
              required
            />
          </div>
        </div>

        {errorMsg && (
          <p className="text-rose-400 text-sm font-bold">{errorMsg}</p>
        )}
        {status === "success" && (
          <p className="text-emerald-400 text-sm font-bold">Password changed successfully!</p>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-cyan-500/20"
          >
            {status === "loading" ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

// -- Assignments ---------------------------------------------------------------
const AssignmentsView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // "All" | "Pending" | "Completed"
  const [submittingId, setSubmittingId] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submittedTasks, setSubmittedTasks] = useState({});

  useEffect(() => {
    authFetch("/student/assignments")
      .then((res) => {
        const list = Array.isArray(res) ? res : (res?.assignments || []);
        setTasks(list);
        setLoading(false);
      })
      .catch(() => {
        setTasks([]);
        setLoading(false);
      });
  }, []);

  const markDone = async (id) => {
    try {
      await fetch(`${BASE}/student/assignments/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getTokenFor("student")}` },
      });
    } catch (e) {
      // local update fallback
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Completed" } : t))
    );
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (!submissionUrl || !submittingId) return;
    setSubmittedTasks((prev) => ({ ...prev, [submittingId]: submissionUrl }));
    setTasks((prev) =>
      prev.map((t) => (t.id === submittingId ? { ...t, status: "Completed" } : t))
    );
    setSubmittingId(null);
    setSubmissionUrl("");
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-cyan-400 w-8 h-8" /></div>;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Pending") return t.status !== "Completed";
    if (filter === "Completed") return t.status === "Completed";
    return true;
  });

  const pendingCount = tasks.filter((t) => t.status !== "Completed").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-cyan-400" /> Domain Assignments
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage and submit your practical domain tasks & milestone deliverables.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0a1228] border border-blue-500/20 px-4 py-2 rounded-2xl w-fit">
          <User className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-slate-300 font-semibold">Mentor: <strong className="text-white">Monish</strong></span>
        </div>
      </div>

      {/* Filter Tabs & Counter Badges */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-[#090f23]/80 p-1.5 rounded-2xl border border-white/10">
          {["All", "Pending", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                filter === tab
                  ? "bg-[#2f67f6] text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab} {tab === "Pending" ? `(${pendingCount})` : tab === "Completed" ? `(${completedCount})` : `(${tasks.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards List / Empty State */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-[#0b132b]/80 border border-blue-500/20 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[35vh]">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-400 mb-4 shadow-lg">
              <ClipboardCheck className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No Tasks Assigned Yet</h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Your assigned mentor will post your domain assignments and practical milestone tasks here.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === "Completed";
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  isDone
                    ? "bg-[#090f23]/70 border-white/10 opacity-90"
                    : "bg-[#0b132b]/90 border-blue-500/20 shadow-xl hover:border-cyan-500/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                      isDone ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    }`}>
                      {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {task.domain && (
                          <span className="px-3 py-1 text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                            {task.domain}
                          </span>
                        )}
                        {task.priority && (
                          <span className={`px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase rounded-full ${
                            task.priority === "Urgent" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                            task.priority === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {task.priority}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug">{task.title}</h3>
                      {task.description && <p className="text-slate-300 text-sm mt-2 leading-relaxed">{task.description}</p>}

                      {submittedTasks[task.id] && (
                        <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                          ✓ Submitted Link: <a href={submittedTasks[task.id]} target="_blank" rel="noreferrer" className="underline text-cyan-300">{submittedTasks[task.id]}</a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end justify-between gap-3 flex-shrink-0">
                    {task.deadline && (
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> Deadline: {task.deadline}
                      </span>
                    )}

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {!isDone && (
                        <>
                          <button
                            onClick={() => setSubmittingId(task.id)}
                            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                          >
                            Submit Link
                          </button>
                          <button
                            onClick={() => markDone(task.id)}
                            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                          >
                            Mark Done
                          </button>
                        </>
                      )}
                      {isDone && (
                        <span className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submission Form */}
                {submittingId === task.id && (
                  <form onSubmit={handleSubmission} className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      placeholder="Paste your GitHub repository or Google Drive link..."
                      required
                      className="flex-1 px-4 py-2.5 bg-slate-900/80 border border-cyan-500/30 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmittingId(null)}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

const DOMAIN_DATA = {
  "Web Development": {
    icon: <Globe className="w-8 h-8" />,
    color: "cyan",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    description: "Build modern, responsive web applications using the latest frontend and backend technologies.",
    roadmap: [
      { phase: "Phase 1", title: "HTML & CSS Fundamentals", topics: ["Semantic HTML5", "CSS Flexbox & Grid", "Responsive Design", "CSS Variables"] },
      { phase: "Phase 2", title: "JavaScript Essentials", topics: ["ES6+ Syntax", "DOM Manipulation", "Fetch API", "Async/Await"] },
      { phase: "Phase 3", title: "React & Frontend", topics: ["React Hooks", "State Management", "React Router", "Tailwind CSS"] },
      { phase: "Phase 4", title: "Backend & Databases", topics: ["Node.js & Express", "REST APIs", "PostgreSQL", "Authentication"] },
    ],
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org", type: "Docs" },
      { name: "React Official Docs", url: "https://react.dev", type: "Docs" },
      { name: "The Odin Project", url: "https://www.theodinproject.com", type: "Course" },
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org", type: "Course" },
      { name: "CSS Tricks", url: "https://css-tricks.com", type: "Blog" },

    ],
    tools: ["VS Code", "Git & GitHub", "Chrome DevTools", "Postman", "Figma"],
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "SQL", "REST APIs"],
  },
  "Data Science": {
    icon: <BarChart2 className="w-8 h-8" />,
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/30",
    description: "Analyze data, build predictive models, and extract meaningful insights using Python and ML tools.",
    roadmap: [
      { phase: "Phase 1", title: "Python & Statistics", topics: ["Python Basics", "NumPy & Pandas", "Descriptive Statistics", "Probability"] },
      { phase: "Phase 2", title: "Data Analysis & Viz", topics: ["Matplotlib & Seaborn", "EDA Techniques", "Data Cleaning", "Plotly"] },
      { phase: "Phase 3", title: "Machine Learning", topics: ["Scikit-learn", "Regression & Classification", "Model Evaluation", "Feature Engineering"] },
      { phase: "Phase 4", title: "Advanced Topics", topics: ["Deep Learning Basics", "NLP Intro", "SQL for Data", "Deployment"] },

    ],
    resources: [
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", type: "Course" },
      { name: "Towards Data Science", url: "https://towardsdatascience.com", type: "Blog" },
      { name: "fast.ai", url: "https://www.fast.ai", type: "Course" },
      { name: "Scikit-learn Docs", url: "https://scikit-learn.org", type: "Docs" },
      { name: "StatQuest YouTube", url: "https://www.youtube.com/@statquest", type: "Video" },
      { name: "DBMS", url: "https://www.oracle.com/in/education/training/database/", type: "course" },
    ],
    tools: ["Python", "Jupyter Notebook", "Pandas", "Scikit-learn", "Tableau"],
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "SQL", "EDA"],
  },
  "AI/ML": {
    icon: <Brain className="w-8 h-8" />,
    color: "emerald",
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    description: "Design and train intelligent systems using deep learning, neural networks, and modern AI frameworks.",
    roadmap: [
      { phase: "Phase 1", title: "Math & Python", topics: ["Linear Algebra", "Calculus", "Python for ML", "NumPy"] },
      { phase: "Phase 2", title: "ML Fundamentals", topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Scikit-learn"] },
      { phase: "Phase 3", title: "Deep Learning", topics: ["Neural Networks", "CNNs", "RNNs", "PyTorch / TensorFlow"] },
      { phase: "Phase 4", title: "Specialization", topics: ["NLP & Transformers", "Computer Vision", "Reinforcement Learning", "MLOps"] },
    ],
    resources: [
      { name: "fast.ai", url: "https://www.fast.ai", type: "Course" },
      { name: "DeepLearning.AI", url: "https://www.deeplearning.ai", type: "Course" },
      { name: "Papers With Code", url: "https://paperswithcode.com", type: "Research" },
      { name: "Hugging Face", url: "https://huggingface.co", type: "Docs" },
      { name: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown", type: "Video" },
    ],
    tools: ["Python", "PyTorch", "TensorFlow", "Jupyter", "Google Colab"],
    skills: ["Python", "Deep Learning", "NLP", "Computer Vision", "PyTorch", "MLOps"],
  },
  "UI/UX Design": {
    icon: <Paintbrush className="w-8 h-8" />,
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/30",
    description: "Design beautiful, user-centric interfaces and craft intuitive user experiences using Figma and modern design principles.",
    roadmap: [
      { phase: "Phase 1", title: "Design Principles & UX Research", topics: ["User Research", "Information Architecture", "Wireframing", "Typography & Color Theory"] },
      { phase: "Phase 2", title: "Figma Fundamentals", topics: ["Auto Layout & Components", "Figma Prototyping", "Design Systems", "UI Kits"] },
      { phase: "Phase 3", title: "High-Fidelity Prototyping", topics: ["Interactive Components", "Micro-interactions", "User Testing", "Heuristic Evaluation"] },
      { phase: "Phase 4", title: "Portfolio & Handoff", topics: ["Case Studies", "Developer Handoff", "Responsive Design", "Portfolio Building"] },
    ],
    resources: [
      { name: "Figma Resource Library", url: "https://www.figma.com/resource-library", type: "Docs" },
      { name: "UX Collective", url: "https://uxdesign.cc", type: "Blog" },
      { name: "Interaction Design Foundation", url: "https://www.interaction-design.org", type: "Course" },
      { name: "Laws of UX", url: "https://lawsofux.com", type: "Docs" },
      { name: "Nielsen Norman Group", url: "https://www.nngroup.com", type: "Blog" },
    ],
    tools: ["Figma", "Adobe XD", "Miro", "FigJam", "Zeplin"],
    skills: ["User Research", "Wireframing", "UI Design", "Prototyping", "Interaction Design", "Design Systems"],
  },
};

const DEFAULT_DOMAIN = {
  icon: <Code2 className="w-8 h-8" />,
  color: "cyan",
  gradient: "from-cyan-500/20 to-blue-500/10",
  border: "border-cyan-500/30",
  description: "Explore your chosen domain and build expertise through structured learning and hands-on projects.",
  roadmap: [
    { phase: "Phase 1", title: "Fundamentals", topics: ["Core Concepts", "Basic Tools", "Best Practices", "First Project"] },
    { phase: "Phase 2", title: "Intermediate", topics: ["Advanced Topics", "Real Projects", "Community", "Open Source"] },
  ],
  resources: [
    { name: "freeCodeCamp", url: "https://www.freecodecamp.org", type: "Course" },
    { name: "Coursera", url: "https://www.coursera.org", type: "Course" },
    { name: "YouTube", url: "https://www.youtube.com", type: "Video" },
  ],
  tools: ["VS Code", "Git", "GitHub"],
  skills: ["Problem Solving", "Version Control", "Documentation"],
};

const TYPE_COLORS = {
  Docs: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Course: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Blog: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Video: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Platform: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Research: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Tool: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const DomainsView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    authFetch("/student/profile").then((d) => { setProfile(d?.id ? d : null); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-cyan-400 w-8 h-8" /></div>;

  // Support multiple comma-separated domains
  const rawDomains = profile?.domain_interest?.trim() || "";
  const domainList = rawDomains ? rawDomains.split(",").map((d) => d.trim()).filter(Boolean) : [];

  if (domainList.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
        <Code2 className="w-10 h-10 text-slate-400" />
      </div>
      <div>
        <h2 className="text-3xl font-black text-white mb-2">No Domain Selected</h2>
        <p className="text-slate-400 text-sm max-w-sm">Your domain interest hasn't been set yet. Please complete your profile or contact your admin.</p>
      </div>
      <a href="/onboarding" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all text-sm">
        Complete Profile
      </a>
    </div>
  );

  const colorMap = {
    cyan: { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", text: "text-cyan-400", dot: "bg-cyan-500", tab: "border-cyan-400 text-cyan-400 bg-cyan-400/5" },
    purple: { badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", text: "text-purple-400", dot: "bg-purple-500", tab: "border-purple-400 text-purple-400 bg-purple-400/5" },
    emerald: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-500", tab: "border-emerald-400 text-emerald-400 bg-emerald-400/5" },
    rose: { badge: "bg-rose-500/10 text-rose-400 border-rose-500/20", text: "text-rose-400", dot: "bg-rose-500", tab: "border-rose-400 text-rose-400 bg-rose-400/5" },
    blue: { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", text: "text-blue-400", dot: "bg-blue-500", tab: "border-blue-400 text-blue-400 bg-blue-400/5" },
    yellow: { badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-500", tab: "border-yellow-400 text-yellow-400 bg-yellow-400/5" },
  };

  const currentDomain = domainList[activeTab];
  const domain = DOMAIN_DATA[currentDomain] ?? {
    ...DEFAULT_DOMAIN,
    description: `You are studying ${currentDomain}. Explore the roadmap and resources below.`,
  };
  const c = colorMap[domain.color] ?? colorMap.cyan;

  return (
    <div className="space-y-6">

      {/* Domain tabs — only show if multiple */}
      {domainList.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {domainList.map((d, idx) => {
            const dm = DOMAIN_DATA[d] ?? DEFAULT_DOMAIN;
            const cm = colorMap[dm.color] ?? colorMap.cyan;
            return (
              <motion.button
                key={d}
                onClick={() => setActiveTab(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 relative ${activeTab === idx ? cm.tab : "bg-slate-800 text-slate-400 border-white/10 hover:text-white"
                  }`}
              >
                {activeTab === idx && (
                  <motion.span
                    layoutId="domainTabIndicator"
                    className="absolute inset-0 rounded-full bg-white/5"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{d}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Animated domain content */}
      <AnimatePresence mode="wait">

        {/* Header banner */}
        <motion.div
          key={`header-${activeTab}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`bg-gradient-to-br ${domain.gradient} border ${domain.border} rounded-3xl p-8`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl ${c.badge} border flex items-center justify-center flex-shrink-0 ${c.text}`}>
              {domain.icon}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-white">{currentDomain}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${c.badge}`}>Your Domain</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">{domain.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
            {[
              { label: "Phases", value: domain.roadmap.length },
              { label: "Skills", value: domain.skills.length },
              { label: "Resources", value: domain.resources.length },
            ].map(({ label, value }) => (
              <div key={label} className="bg-black/20 rounded-2xl p-4 text-center border border-white/10">
                <p className={`text-2xl font-black ${c.text}`}>{value}</p>
                <p className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roadmap */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className={`w-2 h-6 rounded-full ${c.dot}`} /> Learning Roadmap
            </h3>
            <div className="space-y-4">
              {domain.roadmap.map((phase, idx) => (
                <div key={idx} className="bg-[#1e293b] border border-white/5 rounded-2xl p-6 shadow-xl hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`w-9 h-9 rounded-full ${c.dot} flex items-center justify-center text-sm font-black text-white flex-shrink-0`}>{idx + 1}</span>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-0.5`}>{phase.phase}</p>
                      <h4 className="text-white font-bold text-lg leading-tight">{phase.title}</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-slate-200 text-xs font-semibold hover:border-white/20 transition-colors">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#1c2536]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20" /> Key Skills
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {domain.skills.map((skill) => (
                  <span key={skill} className={`px-4.5 py-2.5 rounded-xl text-sm font-bold border ${c.badge} shadow-sm shadow-black/20 hover:scale-105 transition-transform duration-200 cursor-default`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1c2536]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-slate-400" /> Tools & Tech
              </h3>
              <div className="space-y-1">
                {domain.tools.map((tool) => (
                  <div key={tool} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-xl transition-colors duration-200">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.dot} shadow-sm`} />
                    <span className="text-slate-100 text-base font-semibold">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

// -- Resources Dashboard --------------------------------------------------------
const ResourcesView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    authFetch("/student/profile")
      .then((d) => {
        setProfile(d?.id ? d : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-cyan-400 w-8 h-8" /></div>;

  const rawDomains = profile?.domain_interest?.trim() || "";
  const domainList = rawDomains ? rawDomains.split(",").map((d) => d.trim()).filter(Boolean) : [];

  if (domainList.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
        <BookOpen className="w-10 h-10 text-slate-400" />
      </div>
      <div>
        <h2 className="text-3xl font-black text-white mb-2">No Domain Selected</h2>
        <p className="text-slate-400 text-sm max-w-sm">Please subscribe to at least one domain to see learning resources.</p>
      </div>
      <a href="/student-portal/profile" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all text-sm">
        Choose Domains
      </a>
    </div>
  );

  // Aggregate all resources from subscribed domains
  let allResources = [];
  domainList.forEach((dName) => {
    const dData = DOMAIN_DATA[dName];
    if (dData && dData.resources) {
      dData.resources.forEach((r) => {
        allResources.push({
          ...r,
          domain: dName,
        });
      });
    }
  });

  // Filter based on search & selected type
  const filtered = allResources.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.domain.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ["All", ...new Set(allResources.map((r) => r.type))];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1c2536] to-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
          <BookOpen className="text-cyan-400 w-8 h-8" /> Learning Hub
        </h2>
        <p className="text-slate-400 text-sm max-w-xl">
          Access high-quality learning resources, documentation, courses, and toolkits curated for your subscribed learning pathways.
        </p>

        {/* Filters and search row */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 items-center">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search resources or domains..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${selectedType === type
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md"
                    : "bg-slate-900/40 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-16">
          No resources match your search or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((r, idx) => {
            const badgeColor = TYPE_COLORS[r.type] ?? TYPE_COLORS.Docs;
            return (
              <a
                key={idx}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col justify-between gap-4 p-5 rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                    {r.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400/80 transition-colors uppercase tracking-wider">
                    {r.domain}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="text-white text-base font-bold tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                    {r.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

// -- Fallback ------------------------------------------------------------------
const FallbackView = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="w-28 h-28 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
      <Code2 className="w-12 h-12 text-slate-400" />
    </div>
    <h2 className="text-4xl font-black text-white mb-4">{title}</h2>
    <span className="px-4 py-1.5 text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Coming Soon</span>
  </div>
);

// -- Certificates --------------------------------------------------------------
const CertificatesView = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">My Certificates</h2>
      <p className="text-slate-400 text-sm mt-1">Official SkillForge module & project completion certificates.</p>
    </div>

    <div className="bg-[#0b132b]/80 border border-blue-500/20 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[45vh] shadow-2xl relative overflow-hidden">
      <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 shadow-lg shadow-purple-500/10">
        <Award className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No Certificates Earned Yet</h3>
      <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
        Complete your assigned domain tasks and project milestones to unlock official verified certificates here.
      </p>
      <div className="flex items-center gap-3">
        <span className="px-4 py-2 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
          0 Certificates Unlocked
        </span>
      </div>
    </div>
  </div>
);

// -- Events --------------------------------------------------------------------
const EventsView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/events")
      .then((res) => {
        const list = Array.isArray(res) ? res : (res?.events || []);
        if (list.length > 0) {
          setEvents(list.slice(0, 3));
        } else {
          throw new Error("No backend events");
        }
        setLoading(false);
      })
      .catch(() => {
        setEvents([
          {
            id: "1",
            title: "SkillForge Hackathon 2026",
            date: "Aug 15, 2026",
            time: "10:00 AM",
            venue: "Main Auditorium & Online",
            category: "Hackathon",
            description: "Build innovative web apps and AI solutions in 24 hours.",
            isCompleted: false,
          },
          {
            id: "2",
            title: "Full Stack Web Bootcamp",
            date: "Aug 28, 2026",
            time: "02:00 PM",
            venue: "Tech Lab 3",
            category: "Workshop",
            description: "Hands-on session covering React, Node.js and REST APIs.",
            isCompleted: false,
          },
          {
            id: "3",
            title: "AI & Machine Learning Seminar",
            date: "Jul 05, 2026",
            time: "11:00 AM",
            venue: "Virtual Hall 1",
            category: "Seminar",
            description: "Introductory session on PyTorch and modern LLM architecture.",
            isCompleted: true,
          },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-cyan-400 w-8 h-8" /></div>;

  const upcomingEvents = events.filter((e) => !e.isCompleted);
  const completedEvents = events.filter((e) => e.isCompleted);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Club Events</h2>
        <p className="text-slate-400 text-sm mt-1">Explore upcoming webinars, workshops, and completed club events.</p>
      </div>

      {/* Upcoming Events (2 Events) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
          <CalendarCheck className="w-5 h-5" /> Upcoming Events ({upcomingEvents.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((evt) => (
            <div key={evt.id} className="bg-[#0b132b]/90 border border-cyan-500/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                    {evt.category || "Event"}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {evt.date}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{evt.title}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{evt.description}</p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-slate-400">
                <span>📍 {evt.venue}</span>
                <span className="px-3 py-1 font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Events (1 Event) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Completed Events ({completedEvents.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedEvents.map((evt) => (
            <div key={evt.id} className="bg-[#090f23]/60 border border-white/10 rounded-2xl p-6 shadow-md opacity-85">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-bold bg-slate-800 text-slate-400 border border-white/10 rounded-full">
                  {evt.category || "Past Event"}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{evt.date}</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{evt.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{evt.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-white/5">
                <span>📍 {evt.venue}</span>
                <span className="text-slate-400 font-semibold">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// -- Main ----------------------------------------------------------------------
const StudentPortal = () => {
  const location = useLocation();
  const path = location.pathname;

  const getKey = () => {
    if (path.endsWith("/profile")) return "profile";
    if (path.endsWith("/progress")) return "progress";
    if (path.endsWith("/assignments")) return "assignments";
    if (path.endsWith("/domains")) return "domains";
    if (path.endsWith("/resources")) return "resources";
    if (path.endsWith("/events")) return "events";
    if (path.endsWith("/certificates")) return "certificates";
    return "overview";
  };

  const renderContent = () => {
    if (path.endsWith("/profile")) return <ProfileView />;
    if (path.endsWith("/progress")) return <FallbackView title="Progress Tracking" />;
    if (path.endsWith("/assignments")) return <AssignmentsView />;
    if (path.endsWith("/domains")) return <DomainsView />;
    if (path.endsWith("/resources")) return <ResourcesView />;
    if (path.endsWith("/events")) return <EventsView />;
    if (path.endsWith("/certificates")) return <CertificatesView />;
    return <OverviewView />;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={getKey()}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StudentPortal;











