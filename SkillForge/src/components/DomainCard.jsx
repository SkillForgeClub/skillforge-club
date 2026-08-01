import React from 'react';
import { motion } from 'framer-motion';

const DomainCard = React.memo(({ title, description, Icon, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
      className="glass-card p-4 sm:p-6 rounded-2xl cursor-pointer group hover:border-blue-500/50 transition-colors duration-200 flex flex-col h-full"
    >
      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-500/20 transition-colors duration-200 shrink-0">
        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
});

DomainCard.displayName = 'DomainCard';
export default DomainCard;
