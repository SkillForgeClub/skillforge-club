import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';

const COLORS = [
  'from-blue-600 to-cyan-500',
  'from-purple-600 to-pink-500',
  'from-emerald-600 to-teal-500',
  'from-orange-600 to-yellow-500',
  'from-rose-600 to-red-500',
];

const TeamCard = React.memo(({ name, role, domain, imageUrl, linkedin, github, otherLinks, objectPosition, onClick }) => {
  const color = COLORS[(name?.charCodeAt(0) || 0) % COLORS.length];
  const initials = name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  const displayImage = imageUrl && imageUrl.startsWith('/uploads/')
    ? `http://localhost:5000${imageUrl}`
    : imageUrl;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-colors duration-300 cursor-pointer flex flex-col h-full relative"
    >
      {/* Avatar */}
      <div className="h-80 relative overflow-hidden flex-shrink-0">
        {displayImage ? (
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            style={{ objectPosition: objectPosition || 'center' }}
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}>
            <span className="text-5xl font-black text-white/30 select-none">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
      </div>

      {/* Info */}
      <div className="p-5 -mt-6 relative z-10 bg-slate-950/40 backdrop-blur-md rounded-b-2xl border-t border-white/5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">{name}</h3>
          {domain && <p className="text-cyan-400 text-sm font-medium mt-0.5">{domain}</p>}
        </div>

        {/* Social links */}
        {(linkedin || github || (otherLinks && otherLinks.length > 0)) && (
          <div className="flex flex-wrap gap-4 mt-4" onClick={(e) => e.stopPropagation()}>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Github size={14} /> GitHub
              </a>
            )}
            {otherLinks && otherLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Globe size={14} /> {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

TeamCard.displayName = 'TeamCard';
export default TeamCard;
