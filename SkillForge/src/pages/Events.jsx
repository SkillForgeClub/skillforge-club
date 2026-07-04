import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, MapPin, Clock, Loader2, ExternalLink, AlertCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../api';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const EventCard = ({ event, isPast }) => {
  const handleRegister = () => {
    if (event.registration_link) window.open(event.registration_link, '_blank', 'noreferrer');
  };
  const isFull = event.registered >= event.capacity;
  const pct = event.capacity ? Math.round((event.registered / event.capacity) * 100) : 0;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -10, scale: 1.02, boxShadow: isPast ? "none" : "0 20px 50px rgba(99,102,241,0.25)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`relative rounded-[2rem] overflow-hidden border backdrop-blur-xl flex flex-col transition-colors duration-300 ${
        isPast
          ? 'bg-slate-950/40 border-white/5 opacity-70'
          : 'bg-slate-950/60 border-blue-500/20 hover:border-indigo-500/50'
      }`}
    >
      {!isPast && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 opacity-70" />
      )}
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-black text-white max-w-[70%] leading-tight">{event.title}</h3>
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${isPast ? 'bg-white/5 text-slate-500' : 'bg-blue-500/15 text-blue-300 border border-blue-500/20'}`}>
            <Calendar size={11} /> {event.date}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">{event.description}</p>

        {!isPast && (
          <div className="mb-5 space-y-2.5">
            {event.time && (
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <Clock size={14} className="text-purple-400 shrink-0" /> {event.time}
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <MapPin size={14} className="text-red-400 shrink-0" /> {event.venue}
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>{event.registered}/{event.capacity} registered</span>
                <span className={pct >= 80 ? "text-red-400 font-bold" : "text-cyan-400"}>{pct}% full</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  className={`h-full rounded-full ${pct >= 80 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                />
              </div>
            </div>
          </div>
        )}

        <motion.button
          onClick={handleRegister}
          disabled={isPast || isFull || !event.registration_link}
          whileHover={!isPast && !isFull && event.registration_link ? { scale: 1.03 } : {}}
          whileTap={!isPast && !isFull && event.registration_link ? { scale: 0.97 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm transition-colors duration-300 ${
            isPast ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
            : isFull ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : !event.registration_link ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]'
          }`}
        >
          {isPast ? 'Completed' : isFull ? 'Fully Booked' : (
            <><Zap size={15} className="fill-current" /> Register Now <ExternalLink size={14} /></>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const MOCK_EVENTS = useMemo(() => [
    { id: 1, title: "Web Dev Bootcamp", description: "Learn HTML, CSS, JS from scratch in one day with our hands-on experts.", date: "2026-08-10", time: "10:00 AM", venue: "CS Lab 301", category: "Web Development", capacity: 100, registered: 45, registration_link: "https://forms.gle/mock" },
    { id: 2, title: "AI & ML Workshop", description: "Hands-on session on neural networks, LLMs, and Python libraries.", date: "2026-08-20", time: "2:00 PM", venue: "Seminar Hall", category: "AI/ML", capacity: 80, registered: 60, registration_link: "https://forms.gle/mock" },
    { id: 3, title: "Hackathon 2026", description: "24-hour coding competition. Build innovative projects and win prizes!", date: "2026-09-05", time: "9:00 AM", venue: "Main Auditorium", category: "Hackathon", capacity: 200, registered: 120, registration_link: "https://forms.gle/mock" },
  ], []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getEvents();
        if (Array.isArray(data)) { setEvents(data); setIsOffline(false); }
        else { setEvents(MOCK_EVENTS); setIsOffline(true); }
      } catch { setEvents(MOCK_EVENTS); setIsOffline(true); }
      finally { setLoading(false); }
    };
    load();
  }, [MOCK_EVENTS]);

  const today = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= today);
  const past     = events.filter((e) => new Date(e.date) < today);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
        <Loader2 className="text-blue-400" size={40} />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B1121] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div animate={{ x: [0,30,-20,0], y: [0,-40,20,0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-blue-600/6 rounded-full blur-[120px]" />
        <motion.div animate={{ x: [0,-20,30,0], y: [0,30,-30,0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-purple-500/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black text-white mb-5 tracking-tight">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Events</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Join our workshops, hackathons, and seminars. Build, compete, grow.
          </motion.p>
          <motion.div variants={fadeUp} className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-8" />
        </motion.div>

        {isOffline && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mb-12 px-6 py-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center justify-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 animate-pulse text-amber-400" />
            <span><strong>Demo Mode:</strong> Showing offline mock events.</span>
          </motion.div>
        )}

        <div className="mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-10 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
            <h2 className="text-3xl font-black text-white">Upcoming</h2>
            <span className="bg-blue-500/15 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">{upcoming.length}</span>
          </motion.div>
          {upcoming.length === 0 ? (
            <p className="text-slate-500 ml-5">No upcoming events right now. Check back soon!</p>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => <EventCard key={event.id} event={event} isPast={false} />)}
            </motion.div>
          )}
        </div>

        {past.length > 0 && (
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-10 bg-slate-600 rounded-full" />
              <h2 className="text-3xl font-black text-slate-400">Past Events</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => <EventCard key={event.id} event={event} isPast={true} />)}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
