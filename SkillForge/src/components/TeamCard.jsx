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

import { ASSET_BASE } from '../config';

const TeamCard = React.memo(({ name, role, domain, imageUrl, linkedin, github, otherLinks, objectPosition, imageScale, onClick }) => {
  const [imgError, setImgError] = React.useState(false);
  const color = COLORS[((name || '').charCodeAt(0) || 0) % COLORS.length];
  const initials = name ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : '?';

  const displayImage = imageUrl && imageUrl.startsWith('/uploads/')
    ? `${ASSET_BASE}${imageUrl}`
    : imageUrl;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-colors duration-300 cursor-pointer flex flex-col h-full relative"
    >
      {/* Avatar */}
      <div className="h-28 xs:h-36 sm:h-56 md:h-64 lg:h-80 relative overflow-hidden flex-shrink-0">
        {(displayImage && !imgError) ? (
          <div className="w-full h-full overflow-hidden" style={{ transform: imageScale ? `scale(${imageScale})` : undefined, transformOrigin: objectPosition || 'center' }}>
            <img
              src={displayImage}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              style={{ objectPosition: objectPosition || 'center' }}
              loading="lazy"
            />
          </div>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}>
            <span className="text-xl sm:text-5xl font-black text-white/30 select-none">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
      </div>

      {/* Info */}
      <div className="p-2 sm:p-5 -mt-4 sm:-mt-6 relative z-10 bg-slate-950/40 backdrop-blur-md rounded-b-2xl border-t border-white/5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-[10px] xs:text-xs sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 leading-tight">{name}</h3>
          {domain && <p className="text-cyan-400 text-[9px] xs:text-xs sm:text-sm font-medium mt-0.5">{domain}</p>}
        </div>

        {/* Social links */}
        {(linkedin || github || (otherLinks && otherLinks.length > 0)) && (
          <div className="flex flex-wrap gap-1.5 sm:gap-4 mt-2 sm:mt-4" onClick={(e) => e.stopPropagation()}>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={13} /> <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Github size={13} /> <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {otherLinks && otherLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Globe size={13} /> <span className="hidden sm:inline">{link.label}</span>
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
