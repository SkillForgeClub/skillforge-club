import React, { useState } from 'react';
import CardGrid from '../components/CardGrid';
import DomainCard from '../components/DomainCard';
import { Globe, Code2, Paintbrush, Database, X, ExternalLink, BookOpen, Info, Brain, Terminal, BookMarked, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import skillForgeLogo from '../assets/logo.png';

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

const dsaPatterns = [
  { id: 1, title: "Arrays", color: "border-purple-500/20 text-purple-400 bg-purple-500/5", patterns: ["Prefix Sum", "Sliding Window", "Kadane's / Subarray", "Binary Search"] },
  { id: 2, title: "String", color: "border-pink-500/20 text-pink-400 bg-pink-500/5", patterns: ["Two Pointers", "Pattern Matching (KMP)", "Anagram / Frequency Count", "Palindrome"] },
  { id: 3, title: "Hashing", color: "border-sky-500/20 text-sky-400 bg-sky-500/5", patterns: ["Hash Map", "Frequency Map", "Count Distinct Elements", "Group Anagrams", "Two Sum"] },
  { id: 4, title: "Stack", color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5", patterns: ["Monotonic Stack", "Balanced Parentheses", "Next Greater / Smaller", "Min Stack"] },
  { id: 5, title: "Queue / Deque", color: "border-orange-500/20 text-orange-400 bg-orange-500/5", patterns: ["Sliding Window Maximum", "First Negative in Window", "Deque Optimization", "Design Queue"] },
  { id: 6, title: "Linked List", color: "border-amber-500/20 text-amber-400 bg-amber-500/5", patterns: ["Pointer Techniques (Fast-Slow, Cycle Detection)", "Reversal", "Merge Lists"] },
  { id: 7, title: "Trees", color: "border-rose-500/20 text-rose-400 bg-rose-500/5", patterns: ["Binary Tree Traversal", "Binary Search Tree", "Lowest Common Ancestor", "Tree Construction"] },
  { id: 8, title: "Recursion", color: "border-orange-400/20 text-orange-300 bg-orange-400/5", patterns: ["Backtracking", "Divide & Conquer", "Tree / Graph Recursion", "Memoization"] },
  { id: 9, title: "Heap", color: "border-teal-500/20 text-teal-400 bg-teal-500/5", patterns: ["Priority Queue", "Top K Elements", "Heapify / Heap Sort"] },
  { id: 10, title: "Graphs", color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5", patterns: ["BFS", "DFS", "Shortest Path (Dijkstra)", "Topological Sort"] },
  { id: 11, title: "Trie", color: "border-red-500/20 text-red-400 bg-red-500/5", patterns: ["Insert / Search", "Prefix Problems", "Word Break"] },
  { id: 12, title: "Dynamic Programming", color: "border-green-500/20 text-green-400 bg-green-500/5", patterns: ["1D DP", "2D DP", "Knapsack DP", "DP on Trees"] },
  { id: 13, title: "Greedy", color: "border-blue-500/20 text-blue-400 bg-blue-500/5", patterns: ["Activity Selection", "Interval Scheduling", "Huffman Coding"] },
  { id: 14, title: "Bit Manipulation", color: "border-indigo-500/20 text-indigo-400 bg-indigo-500/5", patterns: ["Basic Operations", "Counting Set Bits", "XOR Tricks"] },
  { id: 15, title: "Advanced Patterns", color: "border-lime-500/20 text-lime-400 bg-lime-500/5", patterns: ["Two Pointers", "Meet in the Middle", "Sweep Line"] },
  { id: 16, title: "Range Structures", color: "border-orange-500/20 text-orange-400 bg-orange-500/5", patterns: ["Prefix Sum", "Segment Tree", "Fenwick Tree (BIT)"] }
];

const dsaResources = [
  {
    title: "Striver's SDE Sheet",
    description: "The most recommended sheet for coding interview preparation. 180+ problems split by days and topics, covering core concepts required for Google, Amazon, Microsoft, etc.",
    url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    label: "View Striver's SDE Sheet"
  },
  {
    title: "LeetCode 75 Study Plan",
    description: "Master coding fundamentals in 75 essential questions. Structured list spanning arrays, strings, stack, binary trees, dynamic programming, and graphs on LeetCode.",
    url: "https://leetcode.com/studyplan/leetcode-75/",
    label: "Start LeetCode 75"
  },
  {
    title: "NeetCode Roadmap",
    description: "An interactive, visual guide to coding interview topics. Learn step-by-step algorithms, practice curated problems, and watch detailed video explanations.",
    url: "https://neetcode.io/roadmap",
    label: "Explore NeetCode Roadmap"
  },
  {
    title: "Striver's A2Z DSA Sheet",
    description: "A comprehensive course from basic data structures to advanced topics like Segment Trees, Tries, and DP. Highly structured with free video tutorials.",
    url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
    label: "View A2Z DSA Sheet"
  }
];

const Domains = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showDsaRoadmap, setShowDsaRoadmap] = useState(false);

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

      <CardGrid columns={4}>
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

      {/* Our Services Section */}
      <div className="mt-28 pt-16 border-t border-white/5 relative">
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Explore our specialized educational support and training programs designed to accelerate your growth.
          </p>
        </div>

        {/* DSA Service Showcase card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-[2.5rem] overflow-hidden p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.05)] bg-slate-950/40 backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <span className="text-cyan-400 text-xs font-extrabold uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                  Specialized Training
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white mt-4 leading-tight font-sans">
                  Data Structures & Algorithms (DSA)
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mt-4">
                  Master the fundamentals of problem solving and algorithmic thinking. Our peer-led DSA training is designed to build intuition, write optimized code, and ace technical interviews at top product companies.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Zap size={12} className="fill-current" />
                  </div>
                  <span className="text-slate-300 text-sm font-semibold">Structured learning modules</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Zap size={12} className="fill-current" />
                  </div>
                  <span className="text-slate-300 text-sm font-semibold">Curated Leetcode & GFG practice lists</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Zap size={12} className="fill-current" />
                  </div>
                  <span className="text-slate-300 text-sm font-semibold">Mock contest & code review sessions</span>
                </div>
              </div>
            </div>

            {/* Right Topics Grid Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Basic Foundations",
                  topics: ["Arrays & Strings", "Hashing & Math", "Big O Complexity Analysis"],
                  borderColor: "border-blue-500/20"
                },
                {
                  title: "Linear Data Structures",
                  topics: ["Singly & Doubly Linked Lists", "Stacks (LIFO operations)", "Queues & Deques (FIFO)"],
                  borderColor: "border-cyan-500/20"
                },
                {
                  title: "Hierarchical Structures",
                  topics: ["Binary Trees & BSTs", "Heaps & Priority Queues", "Disjoint Set Union (DSU)"],
                  borderColor: "border-purple-500/20"
                },
                {
                  title: "Advanced Algorithms",
                  topics: ["Recursion & Backtracking", "Dynamic Programming (DP)", "Graph Traversals (DFS/BFS)"],
                  borderColor: "border-indigo-500/20"
                }
              ].map((group, idx) => (
                <div 
                  key={idx}
                  className={`bg-slate-900/40 backdrop-blur-sm border ${group.borderColor} rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <Terminal size={16} className="text-cyan-400" /> {group.title}
                    </h4>
                    <ul className="space-y-2">
                      {group.topics.map((t, i) => (
                        <li key={i} className="text-slate-400 text-xs sm:text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Resource Links Banner */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <BookMarked className="text-cyan-400 w-6 h-6 shrink-0" />
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base">Ready to practice coding?</h4>
                <p className="text-slate-400 text-xs sm:text-sm">Access curated roadmaps and coding platforms to sharpen your skills.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowDsaRoadmap(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 rounded-xl text-slate-950 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.25)]"
              >
                DSA Interactive Roadmap
                <Zap size={12} className="fill-current" />
              </button>
              {dsaResources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 rounded-xl text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-bold transition-all"
                >
                  {res.title}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Language Programming Section */}
        <div className="mt-20 text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-black flex items-center justify-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              Language Programming
            </span>
          </h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-medium">
            Acquire solid coding fundamentals with our structured courses in key programming languages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "C Programming",
              desc: "Master the fundamentals of memory management, pointers, and structures. Essential for computer science basics.",
              detailedDescription: "Develop a solid foundation in low-level programming. Learn about hardware interaction, compiler design, memory blocks (stack vs heap), pointers, memory allocation, and structures. C is the gateway to understanding operating systems, compiler construction, and high-performance applications.",
              borderColor: "border-blue-500/20",
              glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.08)]",
              features: ["Pointers & Memory Control", "Structures & Unions", "File Operations"],
              Icon: Terminal,
              subtitle: "Programming Language",
              resources: [
                { label: "C Developer Roadmap", url: "https://roadmap.sh/c" },
                { label: "Interactive C Mind Map", url: "https://www.learn-c.org/" }
              ]
            },
            {
              title: "Python Programming",
              desc: "Learn scripting, OOPs, and core packages for ML, AI, and Automation. Beginner-friendly and extremely powerful.",
              detailedDescription: "Dive into the world's most popular programming language. Understand variables, control flow, functions, OOPs, decorators, generators, and library ecosystems. Python is standard for web development, scripting, AI, data science, machine learning models, and automation.",
              borderColor: "border-yellow-500/20",
              glowColor: "shadow-[0_0_20px_rgba(234,179,8,0.08)]",
              features: ["Syntax & Scripting", "Data Structures & OOPs", "Libraries (Pandas, NumPy)"],
              Icon: Terminal,
              subtitle: "Programming Language",
              resources: [
                { label: "Python Developer Roadmap", url: "https://roadmap.sh/python" },
                { label: "Interactive Python Mind Map", url: "https://realpython.com/" }
              ]
            },
            {
              title: "Java Programming",
              desc: "Build scalable applications using OOPs principles, collections framework, and multi-threaded systems.",
              detailedDescription: "Master enterprise application development with Java. Study the JVM architecture, garbage collection, robust object-oriented programming (OOP), collections framework, exception handling, multithreading, and asynchronous programming. Perfect for massive backend architectures and Android app ecosystems.",
              borderColor: "border-orange-500/20",
              glowColor: "shadow-[0_0_20px_rgba(249,115,22,0.08)]",
              features: ["OOPs Foundations", "Collections & Exceptions", "Multithreading & JVM"],
              Icon: Terminal,
              subtitle: "Programming Language",
              resources: [
                { label: "Java Developer Roadmap", url: "https://roadmap.sh/java" },
                { label: "Java Structure Mind Map", url: "https://java-design-patterns.com/" }
              ]
            }
          ].map((lang, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(6, 182, 212, 0.4)", backgroundColor: "rgba(15, 23, 42, 0.6)" }}
              onClick={() => setSelectedDomain(lang)}
              className={`bg-slate-950/40 backdrop-blur-xl border ${lang.borderColor} ${lang.glowColor} rounded-[2rem] p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 overflow-hidden">
                  <img src={skillForgeLogo} alt="SkillForge Club Logo" className="w-7 h-7 object-contain opacity-90" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{lang.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{lang.desc}</p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-2">
                <ul className="space-y-2">
                  {lang.features.map((feat, i) => (
                    <li key={i} className="text-slate-300 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)] overflow-hidden">
                  {selectedDomain.Icon === Terminal ? (
                    <img src={skillForgeLogo} alt="SkillForge Club Logo" className="w-7 h-7 object-contain opacity-90" />
                  ) : (
                    React.createElement(selectedDomain.Icon || Terminal, { className: "w-6 h-6 text-cyan-400" })
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white leading-tight">{selectedDomain.title}</h2>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">
                    {selectedDomain.subtitle || "Core Domain"}
                  </p>
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
                  
                  {selectedDomain.resources ? (
                    <div className="flex flex-wrap gap-3">
                      {selectedDomain.resources.map((res, i) => (
                        <a
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 rounded-xl text-cyan-400 hover:text-cyan-300 text-sm font-bold transition-all group"
                        >
                          {res.label}
                          <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={selectedDomain.resourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 rounded-xl text-cyan-400 hover:text-cyan-300 text-sm font-bold transition-all group"
                    >
                      {selectedDomain.resourceLabel}
                      <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>

              {/* See More / Register Button */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <a
                  href="https://forms.gle/966rscCEd8yZJhp96"
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

      {/* DSA Roadmap Pop-up Modal */}
      <AnimatePresence>
        {showDsaRoadmap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDsaRoadmap(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-[#0b1329] border border-white/10 w-full max-w-4xl h-[85vh] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(6,182,212,0.15)] z-10 flex flex-col overflow-hidden"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setShowDsaRoadmap(false)}
                className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full p-2.5 transition-colors border border-white/10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white leading-tight">DSA Patterns & Roadmap</h2>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">Study Guide & Mind Map</p>
                </div>
              </div>

              <hr className="border-white/5 mb-6 shrink-0" />

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-8 scrollbar-thin">
                
                {/* 1. Mind Map Section */}
                <div>
                  <h3 className="text-white font-extrabold text-lg mb-4 flex items-center gap-2">
                    <Terminal size={18} className="text-cyan-400" /> DSA Patterns Mind Map
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {dsaPatterns.map((p) => (
                      <div 
                        key={p.id}
                        className={`border rounded-2xl p-4 transition-all duration-300 ${p.color}`}
                      >
                        <span className="text-[10px] font-black opacity-60 block uppercase tracking-wider mb-1">
                          Pattern {p.id}
                        </span>
                        <h4 className="font-bold text-sm text-white mb-2">{p.title}</h4>
                        <ul className="space-y-1">
                          {p.patterns.map((pat, idx) => (
                            <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5 leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shrink-0" />
                              {pat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Domains;
