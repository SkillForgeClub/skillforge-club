import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Rocket, Trophy, Users, Award, CheckCircle2, Code2, Target, Heart, Zap, Sparkles, BookOpen } from 'lucide-react';
import skillForgeLogo from '../assets/logo.png';

const About = () => {
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1121] text-white pt-24 pb-20 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 30, -30, 0], y: [0, -35, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-[-10%] w-[45%] h-[45%] bg-blue-600/8 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -20, 25, 0], y: [0, 40, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] left-[-15%] w-[35%] h-[35%] bg-purple-600/6 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 15, -15, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-[10%] w-[30%] h-[30%] bg-cyan-600/5 rounded-full blur-[100px]"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8 flex items-center justify-center"
          >
            {/* Removed the rotated square - rendering just the clean PNG */}
            <img 
              src={skillForgeLogo} 
              alt="SkillForge Club Logo" 
              className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:scale-105 transition-transform duration-300" 
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400"
          >
            The Story of SkillForge
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-slate-400 font-medium tracking-wide max-w-2xl mx-auto"
          >
            Established by the elite <span className="text-cyan-400 font-bold border-b border-cyan-400/20 pb-0.5">Data Science Section</span> to cultivate engineering excellence, collaborative learning, and industry readiness.
          </motion.p>
        </div>

        {/* Genesis Core Section */}
        <section className="mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
            className="bg-slate-950/45 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center group hover:border-cyan-500/30 transition-colors shadow-[0_12px_45px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div variants={fadeInUpVariants} className="lg:w-1/2 space-y-6 relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/20 uppercase tracking-widest">
                Our Origins
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">What is SkillForge?</h2>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                SkillForge is a premium, student-run technical community founded at **Vignan's Institute of Information Technology**. We recognized a persistent gap: while academic courses teach theories, the industry demands product delivery, clean architecture, and project autonomy.
              </p>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                Our mission is to foster a collaborative incubator where students write actual code, deploy high-performance applications, and manage projects end-to-end, guided by student mentors who have real experience in building and freelancing.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 w-full">
              {[
                { label: 'Founded', val: '2026', desc: 'By Data Science Sec.', icon: <Award className="w-6 h-6 text-yellow-400" /> },
                { label: 'Mentors', val: '20+', desc: 'Technical Guides', icon: <Users className="w-6 h-6 text-blue-400" /> },
                { label: 'Pathways', val: '6+', desc: 'Specialized Tracks', icon: <Code2 className="w-6 h-6 text-purple-400" /> },
                { label: 'Freelancing', val: 'Mentors', desc: 'Active Practitioners', icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" /> }
              ].map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.025, borderColor: "rgba(6, 182, 212, 0.4)", backgroundColor: "rgba(15, 23, 42, 0.75)", boxShadow: "0 15px 30px rgba(6, 182, 212, 0.15)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-slate-950/50 backdrop-blur-md border border-white/8 p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-cyan-500/10 cursor-default"
                >
                  <div className="mb-3 transform group-hover:scale-105 transition-transform duration-300">{b.icon}</div>
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-0.5">{b.val}</h4>
                  <span className="text-xs md:text-sm font-bold text-cyan-400 block mb-0.5">{b.label}</span>
                  <span className="text-[10px] md:text-xs text-slate-500 font-medium">{b.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Core Pillars Section */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Our Core Pillars</h2>
            <p className="text-slate-400 text-sm md:text-base font-medium">The foundation of everything we build, teach, and stand for as a community.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "Empowering Mentorship", desc: "We believe in peer-to-peer knowledge sharing. Junior members learn directly from senior students who have worked on production codebases, freelance portals, and competitive hackathons.", icon: <Heart className="w-5 h-5 text-rose-400" /> },
              { title: "Practical Implementation", desc: "No sandbox code. We focus on building tools, platforms, and services that solve real campus problems and can be showcased directly in portfolios and resumes.", icon: <Zap className="w-5 h-5 text-amber-400" /> },
              { title: "Innovation Culture", desc: "From AI models to cloud architectures, we keep our stack modern. We encourage experimenting with new technologies, libraries, and frameworks to stay ahead of the curve.", icon: <Sparkles className="w-5 h-5 text-cyan-400" /> }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                variants={fadeInUpVariants}
                whileHover={{ y: -8 }}
                className="bg-slate-950/40 border border-white/8 rounded-3xl p-8 hover:border-cyan-500/20 transition-colors shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How We Operate Section */}
        <section className="mb-24 bg-slate-950/30 border border-white/5 rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs border border-blue-500/20 uppercase tracking-widest">
                Our Methodology
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">How We Build Capability</h2>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                We operate through a structure of target-focused learning cohorts. Each member selects a technical track—ranging from Full Stack Web Dev, Machine Learning, Mobile Apps, to DevOps.
              </p>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                Once inside, members are assigned to practical milestones. Rather than watching tutorials passively, students collaborate on GitHub, review pull requests, participate in weekly code reviews, and deploy prototypes. This prepares them for standard engineering team environments.
              </p>
            </div>
            
            <div className="lg:w-1/2 space-y-4 w-full">
              {[
                { title: "Weekly Cohort Syncs", desc: "Discussing architecture, design patterns, and unblocking fellow learners.", step: "01" },
                { title: "Hands-on Workshops", desc: "Interactive sessions building and explaining real-time system components.", step: "02" },
                { title: "Internal Hackathons", desc: "Accelerated builder sprints to ship working solutions within short deadlines.", step: "03" }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-blue-500/20 transition-colors">
                  <span className="text-2xl font-black text-blue-500 leading-none">{step.step}</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
