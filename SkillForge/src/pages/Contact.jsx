import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Share2, Github, Linkedin, Instagram, Youtube, Facebook, Brain, GraduationCap } from 'lucide-react';
import { api } from '../api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1121] text-white pt-24 pb-16 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Dynamic Backgrounds - morphing floating gradient spheres */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 30, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question or want to collaborate? Drop us a message and we'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-950/45 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Subject"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
              {status && status !== 'loading' && (
                <p className={`text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {status === 'success' ? 'Message sent successfully!' : 'Something went wrong. Please try again.'}
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info - 4 Distinct Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Card 1: Department */}
            <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl flex items-center gap-4 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/30">
                <Brain className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Department of Data Science</h3>
              </div>
            </div>

            {/* Card 2: Email */}
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=skillforge123@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-950/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl flex items-start gap-4 shadow-xl hover:border-purple-500/40 transition-all duration-300 group block"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                <Mail className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                <p className="text-gray-400 group-hover:text-cyan-400 transition-colors font-medium">skillforge123@gmail.com</p>
              </div>
            </a>

            {/* Card 3: Social Media Accounts */}
            <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col items-start gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Share2 className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Social Accounts</h3>
                  <p className="text-xs text-slate-400">Connect with us on official channels</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2 w-full">
                <a href="https://www.linkedin.com/company/skillforge-ds-viit/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 text-gray-300 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 text-xs font-bold transition-all duration-200">
                  <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                </a>
                <a href="https://youtube.com/@skillforge_viit?si=CNGftmeEVKPEv-AY" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-xs font-bold transition-all duration-200">
                  <Youtube className="w-4 h-4 text-red-500" /> YouTube
                </a>
                <a href="https://www.facebook.com/skillforege.club?rdid=m0IR3DEGZ39hQIQl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EGkuGC7Ap%2F#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 text-gray-300 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 text-xs font-bold transition-all duration-200">
                  <Facebook className="w-4 h-4 text-blue-500" /> Facebook
                </a>
                <a href="https://www.instagram.com/skillforge_viit?igsh=czRiY2FtcnU0Zm9z" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-pink-600/20 text-gray-300 hover:text-pink-400 border border-white/10 hover:border-pink-500/30 text-xs font-bold transition-all duration-200">
                  <Instagram className="w-4 h-4 text-pink-400" /> Instagram
                </a>
              </div>
            </div>

            {/* Card 4: Location */}
            <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl flex items-start gap-4 shadow-xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                <MapPin className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Vignan's Institute of Information Technology (VIIT),<br/>Beside VSEZ, Duvvada, Visakhapatnam,<br/>Andhra Pradesh 530049</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;