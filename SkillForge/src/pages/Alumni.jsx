import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Twitter, Quote, X, Briefcase, GraduationCap, BookOpen } from 'lucide-react';

const ALUMNI_DATA = [
  {
    id: 1,
    name: "Behara Lakshmi Sai Charan",
    role: "Senior Data Engineer",
    batch: "Class of 2026",
    department: "CSE - Data Science",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    bio: "Specializing in large-scale data pipelines and machine learning infrastructure. Previously worked at AWS before joining Google's Data Platform team.",
    message: "Focus heavily on SQL, distributed systems, and core algorithms. Build projects that actually handle real-world messy data rather than clean Kaggle datasets.",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "Priya Iyer",
    role: "Data Scientist @ Atlassian",
    batch: "Class of 2026",
    department: "CSE - Data Science",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Passionate about predictive modeling and translating complex data into actionable business insights. Currently leading the Jira analytics experience.",
    message: "Don't just run ML models; understand the statistics behind them and who you are building them for. Communication will set you apart from being just another data cruncher.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: 3,
    name: "Karthik Reddy",
    role: "AI Researcher @ OpenAI",
    batch: "Class of 2026",
    department: "CSE - Data Science",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    bio: "Deep learning enthusiast working on generative AI and reasoning models. Spent my college years heavily invested in data science hackathons.",
    message: "Math is more important than you think. Don't skip your linear algebra, calculus, and statistics classes. The AI field moves fast, but the foundational math remains exactly the same.",
    social: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    id: 4,
    name: "Srinivas Rao",
    role: "Machine Learning Engineer @ TechFlow",
    batch: "Class of 2026",
    department: "CSE - Data Science",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Developing cutting-edge recommendation systems and scaling ML models in production environments. I love taking a model from research to deployment.",
    message: "Networking is just as important as your GPA. Go to tech meetups, participate in Datathons, and talk to people! The connections you make now will be incredibly valuable.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const AlumniCard = ({ alumni, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.2)] relative flex flex-col h-full"
      onClick={() => onClick(alumni)}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/15 group-hover:via-pink-500/15 group-hover:to-orange-500/15 transition-all duration-500" />
      
      <div className="h-32 xs:h-36 sm:h-48 overflow-hidden relative border-b border-white/5 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-90" />
        <img 
          src={alumni.image} 
          alt={alumni.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter saturate-[0.85] group-hover:saturate-100"
          style={{ objectPosition: alumni.objectPosition || 'center 20%' }}
        />
      </div>
      
      <div className="p-3 sm:p-6 relative z-20 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <div>
            <h3 className="text-xs xs:text-sm sm:text-2xl font-black text-white drop-shadow-md leading-tight">{alumni.name}</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-[9px] xs:text-[10px] sm:text-sm mt-0.5 sm:mt-1.5">{alumni.role}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] xs:text-[9px] sm:text-xs font-semibold text-slate-300 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/5 shadow-inner">
            <GraduationCap className="text-orange-400 w-[10px] h-[10px] sm:w-[14px] sm:h-[14px]" />
            <span className="hidden sm:inline">{alumni.batch}</span>
            <span className="sm:hidden">{alumni.batch.replace('Class of ', '')}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] xs:text-[9px] sm:text-xs font-semibold text-slate-300 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/5 shadow-inner">
            <BookOpen className="text-pink-400 w-[10px] h-[10px] sm:w-[14px] sm:h-[14px]" />
            <span className="hidden sm:inline">{alumni.department}</span>
            <span className="sm:hidden">DS</span>
          </div>
        </div>
        
        <p className="text-slate-400 text-[9px] xs:text-[10px] sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-6 font-medium flex-grow">
          {alumni.bio}
        </p>

        <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-white/5 mt-auto">
          {alumni.social.linkedin && (
            <div className="p-1.5 sm:p-2 rounded-full bg-white/5 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-colors">
              <Linkedin className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]" />
            </div>
          )}
          {alumni.social.github && (
            <div className="p-1.5 sm:p-2 rounded-full bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <Github className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]" />
            </div>
          )}
          {alumni.social.twitter && (
            <div className="p-1.5 sm:p-2 rounded-full bg-white/5 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
              <Twitter className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Alumni = () => {
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  return (
    <div className="min-h-screen bg-[#070B14] text-white pt-24 pb-20 relative overflow-hidden selection:bg-pink-500/30">
      
      {/* Background massive glowing orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-pink-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Vibrant Hero Header */}
        <div className="text-center mb-20 relative mt-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 drop-shadow-sm">Alumni Network</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Honoring our seniors from the <span className="text-pink-400 font-bold">CSE - Data Science</span> department who continue to guide and support us. Discover their journeys, learn from their experiences, and get inspired to forge your own path.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 md:gap-8 px-2 sm:px-0">
          {ALUMNI_DATA.map((alumni, index) => (
            <motion.div
              key={alumni.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              className="h-full flex"
            >
              <div className="w-full">
                <AlumniCard alumni={alumni} onClick={setSelectedAlumni} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAlumni && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAlumni(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-lg"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-slate-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-y-auto md:overflow-hidden shadow-[0_0_80px_rgba(236,72,153,0.2)] flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-[85vh]"
            >
              <button
                onClick={() => setSelectedAlumni(null)}
                className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-800 text-white rounded-full p-2.5 transition-colors border border-white/10 shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/5 h-56 sm:h-72 md:h-auto relative flex-shrink-0">
                <img 
                  src={selectedAlumni.image} 
                  alt={selectedAlumni.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900" />
                
                {/* Image overlay badge */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-2 md:hidden">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 text-white font-bold text-xs border border-white/20 backdrop-blur-md">
                    <BookOpen size={14} className="text-pink-400" />
                    {selectedAlumni.department}
                  </div>
                </div>
              </div>

              {/* Details Side */}
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-start md:justify-center bg-slate-900 overflow-y-visible md:overflow-y-auto pb-8">
                <div className="hidden md:flex gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/20">
                    <GraduationCap size={16} />
                    {selectedAlumni.batch}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-400 font-bold text-xs border border-pink-500/20">
                    <BookOpen size={16} />
                    {selectedAlumni.department}
                  </div>
                </div>
                
                <h2 className="text-4xl font-black text-white tracking-tight">{selectedAlumni.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-lg">
                  <Briefcase size={20} className="text-purple-400" />
                  {selectedAlumni.role}
                </div>

                <div className="mt-8 mb-8">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-3">Professional Biography</h4>
                  <p className="text-slate-300 text-base leading-relaxed font-medium">
                    {selectedAlumni.bio}
                  </p>
                </div>

                <div className="relative bg-gradient-to-br from-slate-950/80 to-slate-900/80 p-6 rounded-2xl border border-white/5 mb-8 shadow-inner">
                  <Quote className="absolute top-4 right-4 text-purple-500/10 w-16 h-16 rotate-180" />
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                    Advice for Juniors
                  </h4>
                  <p className="text-slate-200 text-sm md:text-base italic relative z-10 leading-relaxed font-semibold">
                    "{selectedAlumni.message}"
                  </p>
                </div>

                <div className="flex gap-4 mt-auto">
                  {selectedAlumni.social.linkedin && (
                    <a href={selectedAlumni.social.linkedin} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600/15 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-600/35 rounded-2xl py-3.5 text-sm font-bold transition-all shadow-lg">
                      <Linkedin size={20} /> LinkedIn
                    </a>
                  )}
                  {selectedAlumni.social.github && (
                    <a href={selectedAlumni.social.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 rounded-2xl py-3.5 text-sm font-bold transition-all shadow-lg">
                      <Github size={20} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Alumni;