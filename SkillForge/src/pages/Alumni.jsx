import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Twitter, Quote, X, Briefcase, GraduationCap, BookOpen } from 'lucide-react';

const ALUMNI_DATA = [
  {
    id: 1,
    name: "Behara Lakshmi Sai Charan",
    role: "Frontend Developer at Adhiverse AI",
    batch: "Class of 2026",
    department: "CSE - Data Science",
    image: "https://res.cloudinary.com/jd4zqkel/image/upload/v1785684573/charan.jpg_sipawn.jpg",
    objectPosition: "center top",
    bio: "I am a 2026 B.Tech graduate in Computer Science and Engineering (Data Science) from Vignan's Institute of Information Technology. Passionate about software development, data engineering, and AI, I enjoy building real-world applications, solving challenging problems, and continuously learning new technologies. I am proud to be part of the first alumni batch of the CSE (Data Science) program and look forward to staying connected with the VIIT alumni community.",
    btechJourney: "My B.Tech journey was a rewarding experience that helped me grow both technically and personally. I was selected as a Microsoft Student Ambassador to represent my college, and under my leadership, I founded and led a Microsoft Student Community to encourage learning, collaboration, and awareness of emerging technologies among students.\n\nI actively participated in hackathons, technical events, coding competitions, and hands-on projects, which strengthened my technical, problem-solving, and teamwork skills. Beyond academics, I also enjoyed participating in cultural events, especially dance performances. Every experience during my B.Tech contributed to my growth and created memories that I will always cherish.",
    interests: [
      "Full-Stack Development",
      "AI & Data Engineering",
      "Python, SQL, JavaScript",
      "Hackathons & Coding Competitions",
      "Technical Community Leadership",
      "Dance & Cultural Activities",
      "Event Management",
      "Continuous Learning"
    ],
    message: "Enjoy every moment of your B.Tech journey—it goes by faster than you think. Don't limit yourself to the classroom; explore new technologies, build projects, participate in hackathons, internships, technical events, and cultural activities. Step out of your comfort zone, stay curious, and keep learning beyond textbooks. Most importantly, believe in yourself and work consistently. Your growth and success depend on your dedication, hard work, and willingness to seize every opportunity that comes your way.",
    social: {
      linkedin: "https://www.linkedin.com/in/behara-lakshmi-sai-charan-b5b25a2b8/",
      github: "https://github.com/BLSCharan"
    }
  },
  {
    id: 2,
    name: "Beesetty Likhita",
    role: "System Engineer Trainee at TCS",
    batch: "Class of 2026",
    department: "CSE - Data Science",
    image: "https://res.cloudinary.com/jd4zqkel/image/upload/v1785687748/WhatsApp_Image_2026-08-02_at_9.42.13_PM_sstdcx.jpg",
    objectPosition: "center 25%",
    bio: "I am a 2026 B.Tech graduate in Computer Science and Engineering (Data Science) from Vignan's Institute of Information Technology. I am passionate about software development, Artificial Intelligence, Data Science, and emerging technologies. I enjoy building innovative applications, solving real-world problems, and continuously learning new skills. Being a part of the first alumni batch of the CSE (Data Science) program has been a matter of pride, and I look forward to staying connected with the VIIT alumni community while contributing to its growth.",
    btechJourney: "My B.Tech journey has been a transformative experience that helped me grow both technically and personally. I had the privilege of serving as the Chair of the Learning Vertical at YUVA VIIT, Club Manager of the Microsoft Learn Student Community (MLSC), and Class Representative, where I organized technical sessions, coordinated student activities, and encouraged collaborative learning among my peers.\n\nI actively participated in hackathons, coding competitions, workshops, internships, and open-source initiatives that strengthened my problem-solving, leadership, and teamwork skills. During my academic journey, I completed multiple ServiceNow certifications (CSA, CAD, and CIS Discovery Fundamentals) and worked on real-world ServiceNow applications during my internship. Along with academics, I enjoyed participating in technical events, community activities, and creating lasting memories with friends and faculty. Every experience throughout my B.Tech played a significant role in shaping the person I am today.",
    interests: [
      "ServiceNow Development & Administration",
      "Artificial Intelligence & Data Science",
      "Full-Stack Web Development",
      "Python, SQL & JavaScript",
      "Problem Solving & Competitive Programming",
      "Leadership & Community Building",
      "Hackathons & Technical Events",
      "Continuous Learning & Innovation"
    ],
    message: "Make the most of every opportunity your B.Tech offers because these four years will shape your future in countless ways. Don't limit yourself to classroom learning—explore new technologies, build meaningful projects, participate in hackathons, internships, technical communities, and college events. Step out of your comfort zone, stay curious, and never stop learning. Focus on building strong fundamentals, improving your communication skills, and being consistent in your efforts. Remember, success is not about being perfect; it's about continuously improving yourself and making the best use of every opportunity that comes your way. All the best.",
    social: {
      linkedin: "https://www.linkedin.com/in/likhita-beesetty-b18246264",
      github: "https://github.com/likhita426"
    }
  },
  {
    id: 3,
    name: "Malla Sravan Kumar",
    role: "Software Developer",
    batch: "Class of 2026",
    department: "CSE - Data Science",
    image: "https://res.cloudinary.com/jd4zqkel/image/upload/v1785739987/WhatsApp_Image_2026-08-03_at_12.21.37_PM_l9tuhi.jpg",
    objectPosition: "center 20%",
    bio: "I am a 2026 B.Tech graduate in Computer Science and Engineering (Data Science) from Vignan's Institute of Information Technology. I am passionate about software development, Artificial Intelligence, Data Science, and emerging technologies. I enjoy building innovative applications, solving real-world problems, and continuously learning new skills. Being a part of the first alumni batch of the CSE (Data Science) program has been a matter of pride, and I look forward to staying connected with the VIIT alumni community while contributing to its growth.",
    btechJourney: "My B.Tech journey has been a transformative experience that helped me grow both technically and personally. Throughout my time at VIIT, I actively participated in technical events, hackathons, coding competitions, workshops, internships, and community activities that strengthened my problem-solving, leadership, and teamwork skills.\n\nI continuously explored new technologies, worked on real-world projects, and focused on improving my technical knowledge in software development, Artificial Intelligence, and Data Science. Along with academics, I enjoyed collaborating with friends, learning from faculty, and creating memorable experiences that shaped both my personal and professional growth.\n\nEvery experience throughout my B.Tech played a significant role in shaping the person I am today.",
    interests: [
      "Artificial Intelligence & Data Science",
      "Software Development",
      "Full-Stack Web Development",
      "Python, SQL & JavaScript",
      "Problem Solving & Competitive Programming",
      "Leadership & Community Building",
      "Hackathons & Technical Events",
      "Continuous Learning & Innovation"
    ],
    message: "Make the most of every opportunity your B.Tech offers because these four years will shape your future in countless ways. Don't limit yourself to classroom learning—explore new technologies, build meaningful projects, participate in hackathons, internships, technical communities, and college events. Step out of your comfort zone, stay curious, and never stop learning.\n\nFocus on building strong fundamentals, improving your communication skills, and being consistent in your efforts. Remember, success is not about being perfect; it's about continuously improving yourself and making the best use of every opportunity that comes your way. All the best!",
    social: {
      linkedin: "https://www.linkedin.com/in/sravankumar-malla",
      github: "https://github.com/SravanKuamarMalla999"
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
      
      <div className="h-44 xs:h-48 sm:h-60 overflow-hidden relative border-b border-white/5 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent z-10 opacity-50" />
        <img 
          src={alumni.image} 
          alt={alumni.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          style={{ objectPosition: alumni.objectPosition || 'center top' }}
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
          {alumni.social?.linkedin && alumni.social.linkedin !== "#" && (
            <div className="p-1.5 sm:p-2 rounded-full bg-white/5 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-colors">
              <Linkedin className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]" />
            </div>
          )}
          {alumni.social?.github && alumni.social.github !== "#" && (
            <div className="p-1.5 sm:p-2 rounded-full bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <Github className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]" />
            </div>
          )}
          {alumni.social?.twitter && alumni.social.twitter !== "#" && (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pt-24 sm:pt-28 pb-6">
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
              className="relative bg-slate-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(236,72,153,0.2)] flex flex-col md:flex-row z-10 max-h-[80vh] md:max-h-[82vh] my-auto"
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
                  style={{ objectPosition: selectedAlumni.objectPosition || 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-slate-900/40 md:to-slate-900 opacity-60 pointer-events-none" />
                
                {/* Image overlay badge */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-2 md:hidden">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 text-white font-bold text-xs border border-white/20 backdrop-blur-md">
                    <BookOpen size={14} className="text-pink-400" />
                    {selectedAlumni.department}
                  </div>
                </div>
              </div>

              {/* Details Side */}
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-start bg-slate-900 overflow-y-auto pb-8 max-h-[70vh] md:max-h-[85vh]">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/20">
                    <GraduationCap size={14} />
                    {selectedAlumni.batch}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 font-bold text-xs border border-pink-500/20">
                    <BookOpen size={14} />
                    {selectedAlumni.department}
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{selectedAlumni.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-base md:text-lg">
                  <Briefcase size={20} className="text-purple-400 shrink-0" />
                  {selectedAlumni.role}
                </div>

                <div className="mt-6 mb-6">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-2.5">About</h4>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                    {selectedAlumni.bio}
                  </p>
                </div>

                {selectedAlumni.btechJourney && (
                  <div className="mb-6">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-2.5">B.Tech Journey</h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium whitespace-pre-line">
                      {selectedAlumni.btechJourney}
                    </p>
                  </div>
                )}

                {selectedAlumni.interests && selectedAlumni.interests.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-2.5">Skills & Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAlumni.interests.map((interest, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-pink-300">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative bg-gradient-to-br from-slate-950/80 to-slate-900/80 p-6 rounded-2xl border border-white/5 mb-6 shadow-inner">
                  <Quote className="absolute top-4 right-4 text-purple-500/10 w-16 h-16 rotate-180" />
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                    Advice for Juniors
                  </h4>
                  <p className="text-slate-200 text-sm md:text-base italic relative z-10 leading-relaxed font-semibold">
                    "{selectedAlumni.message}"
                  </p>
                </div>

                <div className="flex gap-4 mt-auto pt-2">
                  {selectedAlumni.social?.linkedin && selectedAlumni.social.linkedin !== "#" && (
                    <a href={selectedAlumni.social.linkedin} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600/15 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-600/35 rounded-2xl py-3.5 text-sm font-bold transition-all shadow-lg">
                      <Linkedin size={20} /> LinkedIn
                    </a>
                  )}
                  {selectedAlumni.social?.github && selectedAlumni.social.github !== "#" && (
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