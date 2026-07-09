import React, { useState } from 'react';
import CardGrid from '../components/CardGrid';
import DomainCard from '../components/DomainCard';
import { Globe, Code2, Paintbrush, Database, X, ExternalLink, BookOpen, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const domainsList = [
  {
    title: 'Web Development',
    description: 'Build modern, responsive, and interactive websites using cutting edge frameworks and technologies.',
    detailedDescription: 'Master HTML, CSS, JavaScript, React, and server-side technologies to build modern, full-stack web applications. Learn industry-standard design patterns, state management, and deployment strategies to create applications that scale globally.',
    Icon: Globe,
    resourceLink: 'https://roadmap.sh/frontend',
    resourceLabel: 'Frontend Developer Roadmap'
  },
  {
    title: 'AI & ML',
    description: 'Dive into artificial intelligence, neural networks, and machine learning algorithms.',
    detailedDescription: 'Explore data preprocessing, predictive modeling, deep learning architectures, and machine learning algorithms. Build and train models to solve complex real-world problems using Python, TensorFlow, and PyTorch.',
    Icon: Code2,
    resourceLink: 'https://roadmap.sh/ai-data-scientist',
    resourceLabel: 'AI & Data Scientist Roadmap'
  },
  {
    title: 'UI/UX Design',
    description: 'Craft beautiful, user-centric interfaces and improve overall user experiences.',
    detailedDescription: 'Learn visual design principles, typography, user research, wireframing, prototyping, and high-fidelity mockups. Gain mastery over industry-standard design tools like Figma and design intuitive, accessible user experiences.',
    Icon: Paintbrush,
    resourceLink: 'https://roadmap.sh/ux-design',
    resourceLabel: 'UX Designer Roadmap'
  },
  {
    title: 'Data Science',
    description: 'Learn to extract insights from raw data, build predictive models, and visualize information.',
    detailedDescription: 'Understand data analysis, statistical methods, database systems, and data visualization. Work with powerful tools like SQL, Pandas, NumPy, and Tableau to translate complex datasets into actionable insights.',
    Icon: Database,
    resourceLink: 'https://roadmap.sh/data-analyst',
    resourceLabel: 'Data Analyst Roadmap'
  }
];

const Domains = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-tight">
          Our Domains
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
          Explore the diverse fields of technology we focus on. Choose your path, acquire new skills, and start building.
        </p>
      </div>

      <CardGrid columns={3}>
        {domainsList.map((domain, index) => (
          <DomainCard
            key={index}
            title={domain.title}
            description={domain.description}
            Icon={domain.Icon}
            onClick={() => setSelectedDomain(domain)}
          />
        ))}
      </CardGrid>

      {/* Domain Detailed Popup Modal */}
      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDomain(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-[#0b1329] border border-white/10 w-full max-w-lg rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(6,182,212,0.15)] z-10 overflow-hidden"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full p-2.5 transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  {React.createElement(selectedDomain.Icon, { className: "w-6 h-6 text-cyan-400" })}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white leading-tight">{selectedDomain.title}</h2>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">Core Domain</p>
                </div>
              </div>

              <hr className="border-white/5 mb-6" />

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 flex items-center gap-1.5">
                    <Info size={12} /> Overview
                  </h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                    {selectedDomain.detailedDescription}
                  </p>
                </div>

                {/* Resource Link */}
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 flex items-center gap-1.5">
                    <BookOpen size={12} /> Learning Resources
                  </h4>
                  <a
                    href={selectedDomain.resourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 rounded-xl text-cyan-400 hover:text-cyan-300 text-sm font-bold transition-all group"
                  >
                    {selectedDomain.resourceLabel}
                    <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* See More / Register Button */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <a
                  href="https://forms.gle/cWKD9rcUGeSGCnkW8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 hover:opacity-95 text-slate-950 font-black rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] text-center group"
                >
                  See More
                  <ExternalLink size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Domains;
