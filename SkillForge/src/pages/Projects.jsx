import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { Loader2, FolderOpen } from 'lucide-react';
import { api } from '../api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter]     = useState('All');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getProjects();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects([]);
          setError('Could not load projects.');
        }
      } catch (err) {
        console.error("Error loading projects:", err);
        setProjects([]);
        setError('Could not connect to server. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Derive categories dynamically from data
  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category).filter(Boolean))];
    return ['All', ...cats];
  }, [projects]);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  if (loading) return (
    <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
      <Loader2 className="animate-spin text-cyan-400" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B1121] text-white pt-24 pb-20 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Morphing background gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ contain: 'layout paint' }}>
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" 
        />
        <motion.div
          animate={{ x: [0, -20, 30, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] bg-purple-500/5 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Discover the amazing products built by our community.
          </p>
        </div>

        {error && (
          <div className="mb-8 text-center bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 text-red-400">
            {error}
          </div>
        )}

        {projects.length > 0 && (
          /* Dynamic category filters from DB */
          <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 relative ${
                    isSelected ? 'text-slate-950' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && !error ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-slate-400 text-xl font-bold mb-2">
              {filter !== 'All' ? `No projects in "${filter}"` : 'No projects yet'}
            </p>
            <p className="text-slate-500 text-sm">
              {filter !== 'All' ? 'Try selecting a different category.' : 'Check back soon — new projects are being added!'}
            </p>
          </div>
        ) : (
          <motion.div layout className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    image={project.image}
                    githubLink={project.github_url || project.githubUrl}
                    demoLink={project.live_url || project.liveUrl}
                    tags={project.tech_stack || project.techStack || []}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;