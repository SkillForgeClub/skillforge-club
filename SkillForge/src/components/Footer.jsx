import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Youtube, Facebook, Instagram, Mail, MapPin, ChevronRight } from 'lucide-react';
import logoImage from '../assets/logo.png';

const socialLinks = [
  { icon: Linkedin,  href: "https://www.linkedin.com/company/skillforge-viit",            label: "LinkedIn",  color: "hover:text-blue-400"   },
  { icon: Youtube,   href: "https://youtube.com/@skillforge_viit",                        label: "YouTube",   color: "hover:text-red-400"    },
  { icon: Facebook,  href: "https://www.facebook.com/share/1AT2CbvTYd/",                  label: "Facebook",  color: "hover:text-blue-500"   },
  { icon: Instagram, href: "https://www.instagram.com/skillforge_club",                   label: "Instagram", color: "hover:text-pink-400"   },
];

const navLinks = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Events",   to: "/events" },
  { label: "Team",     to: "/team" },
  { label: "Contact",  to: "/contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

const Footer = React.memo(() => {
  return (
    <footer className="relative border-t border-white/8 bg-[#060d1a] overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-48 bg-blue-600/4 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="SkillForge Logo" className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              <div>
                <p className="font-black text-xl text-white tracking-wide leading-none">SkillForge</p>
                <p className="text-xs text-cyan-400 font-semibold tracking-widest uppercase mt-0.5">VIIT Club</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A student-led technical community bridging classroom theory with real-world engineering excellence.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 ${color} hover:border-white/25 hover:bg-white/10 transition-colors duration-200`}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-200 group"
                  >
                    <ChevronRight size={13} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-4">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=skillforge123@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-3 text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-200 group"
              >
                <Mail size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                skillforge123@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SkillForge Club, VIIT. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-medium">
            Built with ❤️ by the Technical Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
