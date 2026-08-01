import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const Particle = ({ delay, x, size, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, bottom: "-10px", width: size, height: size, background: color }}
    animate={{ y: [0, -700], opacity: [0, 0.7, 0] }}
    transition={{ duration: 5 + Math.random() * 4, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  delay: i * 0.45,
  x: Math.random() * 100,
  size: `${3 + Math.random() * 5}px`,
  color: i % 2 === 0 ? "rgba(34,211,238,0.6)" : "rgba(99,102,241,0.5)",
}));

const MainLayout = React.memo(() => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-500/30 relative">
      
      {/* Global Viewport Bubbles (Fixed behind all content, completely immune to PageTransition) */}
      <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      <div className="relative z-[100]">
        <Navbar />
      </div>
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
});

MainLayout.displayName = 'MainLayout';
export default MainLayout;

