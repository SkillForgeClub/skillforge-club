import React, { useState, useEffect, useMemo } from 'react';
import TeamCard from '../components/TeamCard';
import { Loader2, AlertCircle, Search, X, Linkedin, Github, User, Info, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';

// Static Imports of All 28 High-Resolution Profile Pictures
import imgAripakanavya from '../assets/profile_photos/Aripakanavya.png';
import imgChandrikaBylapudi from '../assets/profile_photos/Chandrika Bylapudi.png';
import imgChaitanya from '../assets/profile_photos/Chaitanya Pamidi.jpeg';
import imgCharmi from '../assets/profile_photos/Charmi.png';
import imgHarshi from '../assets/profile_photos/harshitha.jpeg';
import imgHarsha from '../assets/profile_photos/Harsha.png';
import imgHarshith from '../assets/profile_photos/Harshith.png';
import imgJureddiJaishnavi from '../assets/profile_photos/Jureddi Jaishnavi.jpg';
import imgKKarthik from '../assets/profile_photos/kunduru karthik.jpeg';
import imgJoshika from '../assets/profile_photos/Joshika.jpeg';
import imgKartikTummalapalli from '../assets/profile_photos/Kartik Tummalapalli.jpg';
import imgKundanaLam from '../assets/profile_photos/Kundana Lam.jpg';
import imgLalasaSomadhula from '../assets/profile_photos/Lalasa Somadhula.jpg';
import imgNavya from '../assets/profile_photos/navya.jpg';
import imgPHPadmavathi from '../assets/profile_photos/P.H.Padmavathi.jpeg';
import imgPrasanthKaredla from '../assets/profile_photos/Prasanth Karedla.png';
import imgPremanvitha from '../assets/profile_photos/Premanvitha.jpg';
import imgPrudhvi from '../assets/profile_photos/Prudvi.jpg.jpeg';
import imgPurvi from '../assets/profile_photos/Purvi.jpg';
import imgSanjana from '../assets/profile_photos/Sanjana_.jpg';
import imgSubhikshaSavarapu from '../assets/profile_photos/Subhiksha Savarapu.jpg';
import imgVainavi from '../assets/profile_photos/Vainavi.jpg';
import imgVaishnaviPathsamatla from '../assets/profile_photos/Vaishnavi Pathsamatla.jpg';
import imgVenkateshAmudalapalli from '../assets/profile_photos/Venkatesh Amudalapalli.jpg';
import imgVinay from '../assets/profile_photos/Vinay_.jpg';
import imgYashwant from '../assets/profile_photos/Yashwant_.jpg';
import imgGayathriGuvvala from '../assets/profile_photos/gayathri guvvala.jpg';
import imgTharunKumar from '../assets/profile_photos/tharun.jpeg';

const shuffleAndAssignOrder = (list) => {
  if (!Array.isArray(list) || list.length === 0) return [];
  const clonedList = list.map(m => ({ ...m }));
  const lead = clonedList.find(m => m.name?.toLowerCase().includes('chaitanya'));
  const coLead = clonedList.find(m => m.name?.toLowerCase().includes('jaishnavi'));
  const manager = clonedList.find(m => m.name?.toLowerCase().includes('charmi'));
  const others = clonedList.filter(m => m !== lead && m !== coLead && m !== manager);
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  if (lead) lead.randomOrder = 1;
  if (coLead) coLead.randomOrder = 2;
  if (manager) manager.randomOrder = 3;
  others.forEach((m, index) => {
    m.randomOrder = index + 4;
  });
  const result = [];
  if (lead) result.push(lead);
  if (coLead) result.push(coLead);
  if (manager) result.push(manager);
  result.push(...others);
  return result;
};

const Team = () => {
  const [searchParams] = useSearchParams();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const MOCK_TEAM = useMemo(() => [
    {
      id: 27,
      name: "Chaitanya P",
      role: "President",
      department: "President",
      avatar: imgChaitanya,
      linkedin: "https://www.linkedin.com/in/pamidi-chaitanya-379093350/",
      github: "https://github.com/chaitanya11-dot",
      bio: "Computer Science undergraduate with a strong interest in software development, artificial intelligence, and problem-solving. I enjoy building projects that help me improve my technical and practical skills. I am eager to learn from experienced professionals, work in collaborative teams, and contribute to real-world software solutions. My goal is to continuously grow as a developer and build reliable, user-friendly applications while expanding my knowledge of modern technologies.",
      objectPosition: "50% 18%"
    },
    {
      id: 1,
      name: "Vaishnavi Pathsamatla",
      role: "Managing Team",
      department: "Managing Team",
      avatar: imgVaishnaviPathsamatla,
      linkedin: "https://www.linkedin.com/in/vaishnavi-pathsamatla-621183311?utm_source=share_via&utm_content=profile&utm_medium=android_app",
      github: null,
      bio: "Managing Team"
    },
    {
      id: 2,
      name: "Jaishnavi Jureddi",
      role: "Vice President",
      department: "Vice President",
      avatar: imgJureddiJaishnavi,
      linkedin: "https://www.linkedin.com/in/jaishnavi-jureddi-ba7a63328",
      github: "https://github.com/jaishnavi04",
      bio: "Vice President",
      objectPosition: "50% 12%"
    },
    {
      id: 3,
      name: "Subhiksha Savarapu",
      role: "Managing Lead",
      department: "Managing Team",
      avatar: imgSubhikshaSavarapu,
      linkedin: "https://www.linkedin.com/in/subhiksha-savarapu-974344348",
      github: "https://github.com/savarapusubhiksha15-blip",
      bio: "Managing Lead"
    },
    {
      id: 4,
      name: "Charmi Samarla",
      role: "Manager",
      department: "Managing Team",
      avatar: imgCharmi,
      linkedin: "https://www.linkedin.com/in/charmi-samarla-516b27308?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/charmisamarla",
      bio: "Manager"
    },
    {
      id: 5,
      name: "Kartik Tummalapalli",
      role: "Managing Team",
      department: "Managing Team",
      avatar: imgKartikTummalapalli,
      linkedin: "https://linkedin.com/in/kartik-tummalapalli-1aab60348",
      github: "https://github.com/kartiktummalapalli5-rgb",
      bio: "Managing Team",
      objectPosition: "center"
    },
    {
      id: 6,
      name: "Poorvi Adari",
      role: "Managing Team",
      department: "Managing Team",
      avatar: imgPurvi,
      linkedin: "https://www.linkedin.com/in/poorvi-adari-512887322?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/poorviadari7",
      bio: "Managing Team"
    },
    {
      id: 7,
      name: "Prudvidhar Reddy",
      role: "Managing Team",
      department: "Managing Team",
      avatar: imgPrudhvi,
      linkedin: "https://www.linkedin.com/in/naram-reddy-prudvidhar-reddy-ab86783b7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/prudvidhar14",
      bio: "Managing Team",
      objectPosition: "50% 12%",
      imageScale: 1.7
    },
    {
      id: 8,
      name: "Tharun Kumar RallaPalli",
      role: "Managing Team",
      department: "Managing Team",
      avatar: imgTharunKumar,
      linkedin: "https://www.linkedin.com/in/tharun-kumar-rallapalli-012b48387/",
      github: "https://github.com/tarunkumar-05",
      bio: "Managing Team",
      objectPosition: "50% 10%"
    },
    {
      id: 9,
      name: "Navya A",
      role: "Technical Lead",
      department: "Technical Team",
      avatar: imgAripakanavya,
      linkedin: "https://www.linkedin.com/in/aripaka-navya-1b734b348?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/aripakanavya5",
      bio: "Full stack developer and DSA enthusiast",
      otherLinks: [
        { label: "LeetCode", url: "https://leetcode.com/u/navyalc7/" },
        { label: "CodeChef", url: "https://www.codechef.com/users/navya7510" }
      ]
    },
    {
      id: 10,
      name: "Navya Sri Uggina",
      role: "Technical Team",
      department: "Technical Team",
      avatar: imgNavya,
      linkedin: "https://www.linkedin.com/in/navya-sri-uggina-283b61348",
      github: "https://github.com/ugginanavyasri",
      bio: "Technical Team"
    },
    {
      id: 11,
      name: "Vainavi S",
      role: "Technical Team",
      department: "Technical Team",
      avatar: imgVainavi,
      linkedin: "https://www.linkedin.com/in/vainavi-sidagam-496195327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/vainavisidagam",
      bio: "Technical Team"
    },
    {
      id: 12,
      name: "Harshith Sai V",
      role: "Technical Team",
      department: "Technical Team",
      avatar: imgHarshith,
      linkedin: "https://www.linkedin.com/in/harshith-sai-b7423131b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/harshithsai2007",
      bio: "Computer Science and Engineering (Data Science) undergraduate with a strong foundation in software development, machine learning, and full-stack web development. Passionate about building innovative, user-centric solutions, with strong problem-solving, teamwork, and continuous learning skills.",
      objectPosition: "50% 15%",
      otherLinks: [
        { label: "Portfolio", url: "https://harshith-sai-portfolio.vercel.app/" }
      ]
    },
    {
      id: 13,
      name: "Surapureddy Tarakeswara Nooka Vinay",
      role: "Technical Team",
      department: "Technical Team",
      avatar: imgVinay,
      linkedin: "https://www.linkedin.com/in/surapureddy-tarakeswara-nooka-vinay-169b5b348/",
      github: "https://github.com/Vinay1518",
      bio: "Technical Team",
      objectPosition: "center",
      otherLinks: [
        { label: "LeetCode", url: "https://leetcode.com/u/stn_vinay/" },
        { label: "CodeChef", url: "https://www.codechef.com/users/stn_vinay18" }
      ]
    },
    {
      id: 14,
      name: "Karthik Kunduru",
      role: "Technical Team & Shooting Team",
      department: "Technical Team & Shooting Team",
      avatar: imgKKarthik,
      linkedin: "https://www.linkedin.com/in/karthik-kunduru-517836332",
      github: null,
      bio: "Technical Team & Shooting Team",
      objectPosition: "50% 30%",
      otherLinks: [
        { label: "Portfolio", url: "https://kk-karthikportfilo.netlify.app/" }
      ]
    },
    {
      id: 15,
      name: "Harshini Padmavathi P",
      role: "Technical Team",
      department: "Technical Team",
      avatar: imgPHPadmavathi,
      linkedin: "https://www.linkedin.com/in/harshinipadmavathi/",
      github: null,
      bio: "Technical Team",
      otherLinks: [
        { label: "Medium", url: "https://medium.com/@padmavathipachitala2719" }
      ]
    },
    {
      id: 16,
      name: "Joshika S",
      role: "Technical Team",
      department: "Technical Team",
      avatar: imgJoshika,
      linkedin: "https://www.linkedin.com/in/joshika-silaparasetti-486322336?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/Joshika13",
      bio: "Managing the club's database, SQL operations, database design, and backend data management.",
      objectPosition: "50% 25%"
    },
    {
      id: 17,
      name: "Prasanth",
      role: "Designing Team",
      department: "Designing Team",
      avatar: imgPrasanthKaredla,
      linkedin: "https://www.linkedin.com/in/prashuprasanth",
      github: "https://github.com/prashhu26-arch",
      bio: "Designing Team",
      otherLinks: [
        { label: "CodeChef", url: "https://www.codechef.com/users/prasanth_58_26" }
      ]
    },
    {
      id: 18,
      name: "Venkatesh",
      role: "Designing Team",
      department: "Designing Team",
      avatar: imgVenkateshAmudalapalli,
      linkedin: "https://www.linkedin.com/in/venkateswararaoamudalapalli",
      github: "https://github.com/venkatesh-0007",
      bio: "Designing Team",
      otherLinks: [
        { label: "Portfolio", url: "https://amudalapalli-venkateswara-rao.vercel.app/" }
      ]
    },
    {
      id: 19,
      name: "Harshitha",
      role: "Designing Team",
      department: "Designing Team",
      avatar: imgHarshi,
      linkedin: null,
      github: null,
      bio: "Designing Team",
      objectPosition: "50% 20%"
    },
    {
      id: 28,
      name: "Hari Harsha Ummidi",
      role: "Designer Lead and Social media Advisor",
      department: "Designing Team",
      avatar: imgHarsha,
      linkedin: null,
      github: null,
      bio: "I see the value in my own work, but I also see the meaning in all the endeavors of people. I believe I will continue to take pride in fulfilling my duties."
    },
    {
      id: 20,
      name: "Lalasa s",
      role: "Social Media",
      department: "Social Media",
      avatar: imgLalasaSomadhula,
      linkedin: null,
      github: null,
      bio: "Social Media"
    },
    {
      id: 21,
      name: "Kundana Lam",
      role: "Social Media",
      department: "Social Media",
      avatar: imgKundanaLam,
      linkedin: "https://www.linkedin.com/in/kundana-lam-937109349",
      github: "https://github.com/kundanalam",
      bio: "Social Media"
    },
    {
      id: 22,
      name: "Chandrika B",
      role: "Social Media",
      department: "Social Media",
      avatar: imgChandrikaBylapudi,
      linkedin: null,
      github: null,
      bio: "Social Media"
    },
    {
      id: 23,
      name: "Sanjana P",
      role: "Social Media",
      department: "Social Media Team",
      avatar: imgSanjana,
      linkedin: "https://www.linkedin.com/in/sanjana-pattisapu-207aa2323/",
      github: "https://github.com/SanjanaPattisapu",
      bio: "Hi, I'm Sanjana, a member of the Social Media Team at SkillForge Club. I'll be creating engaging content, designing creative posts, and managing our social media presence to showcase club activities and keep our audience informed and connected.",
      otherLinks: [
        { label: "CodeChef", url: "https://www.codechef.com/users/sanjana7984" }
      ]
    },
    {
      id: 24,
      name: "Gayathri G",
      role: "Social Media",
      department: "Social Media",
      avatar: imgGayathriGuvvala,
      linkedin: "https://www.linkedin.com/in/gayathri-guvvala-",
      github: "https://github.com/gayathri06311",
      bio: "Social Media"
    },
    {
      id: 25,
      name: "Premanvitha D",
      role: "Social Media",
      department: "Social Media",
      avatar: imgPremanvitha,
      linkedin: "https://www.linkedin.com/in/premanvitha-d",
      github: "https://github.com/DPremanvitha",
      bio: "Social Media"
    },
    {
      id: 26,
      name: "Yaswanth Sammidi",
      role: "Shooting & Editing Lead",
      department: "Shooting & Editing Team",
      avatar: imgYashwant,
      linkedin: "https://www.linkedin.com/in/yaswanth-sammidi-0271a6349",
      github: "https://github.com/yaswanthsammidi-wq",
      bio: "Shooting & Editing Lead"
    }
  ], []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getTeam();
        if (Array.isArray(data) && data.length > 0) {
          // If the backend has team members, merge them or prioritize our rich local members list
          const merged = data.map(backendMember => {
            const backendName = (backendMember.name || '').toLowerCase();
            const matchedMock = MOCK_TEAM.find(m => {
              const mockName = (m.name || '').toLowerCase();
              if (mockName === backendName) return true;
              if (backendName && (mockName.includes(backendName) || backendName.includes(mockName))) return true;
              const mockWords = mockName.split(/\s+/).filter(w => w.length > 2);
              const backendWords = backendName.split(/\s+/).filter(w => w.length > 2);
              return mockWords.some(w => backendWords.includes(w));
            });

            if (matchedMock) {
              return {
                ...matchedMock,
                id: backendMember.id,
                role: matchedMock.role,
                bio: matchedMock.bio,
                department: matchedMock.department,
                linkedin: backendMember.linkedin || matchedMock.linkedin,
                github: backendMember.github || matchedMock.github,
              };
            }
            return {
              ...backendMember,
              avatar: backendMember.avatar || null,
              bio: backendMember.bio || backendMember.department || "Core Team"
            };
          });

          // Ensure all local mock members are present
          const mergedNames = new Set(merged.map(m => (m.name || '').toLowerCase()).filter(Boolean));
          MOCK_TEAM.forEach(mockMem => {
            if (mockMem.name && !mergedNames.has(mockMem.name.toLowerCase())) {
              merged.push(mockMem);
            }
          });

          setTeam(shuffleAndAssignOrder(merged));
          setIsOffline(false);
        } else {
          setTeam(shuffleAndAssignOrder(MOCK_TEAM));
          setIsOffline(true);
        }
      } catch (err) {
        console.log("Failed to load backend team, falling back to offline mode", err);
        setTeam(shuffleAndAssignOrder(MOCK_TEAM));
        setIsOffline(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [MOCK_TEAM]);

  // Read ?category= from URL and pre-select the matching filter
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Categories list based on updated club sections
  const categories = useMemo(() => [
    { id: 'All', label: 'All 🌐' },
    { id: 'Leads', label: 'Leads 🌟' },
    { id: 'Managing Team', label: 'Managing Team 👑' },
    { id: 'Technical Team', label: 'Technical Team 💻' },
    { id: 'Designing Team', label: 'Designing Team 🎨' },
    { id: 'Social Media', label: 'Social Media 📣' },
    { id: 'Shooting & Editing Team', label: 'Shooting & Editing Team 🎬' }
  ], []);

  const isLeadMember = (member) => {
    const name = (member.name || '').toLowerCase();
    const role = (member.role || '').toLowerCase();
    if (name.includes('vaishnavi') && name.includes('p')) return false;
    if (name.includes('vainavi')) return false;
    if (name.includes('navya sri')) return false;
    if (name.includes('kartik') && name.includes('t.')) return false;
    return (
      role.includes('president') ||
      role.includes('lead') ||
      role.includes('director') ||
      role.includes('manager') ||
      role.includes('mentor')
    );
  };

  const matchesCategory = (member, category) => {
    if (category === 'All') return true;
    if (category === 'Leads') return isLeadMember(member);
    if (category === 'Managing Team') {
      const isSamarlaCharmi = (member.name || '').toLowerCase().includes('samarla') && (member.name || '').toLowerCase().includes('charmi');
      if (isSamarlaCharmi) return false;
    }
    return Boolean(member.department && member.department.includes(category));
  };

  // Filtering & Search logic
  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const matchesCategoryFilter = matchesCategory(member, selectedCategory);
      const matchesSearch =
        (member.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.department && member.department.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategoryFilter && matchesSearch;
    });
  }, [team, selectedCategory, searchQuery]);

  // Sort by hierarchy: Custom order for 'All', otherwise Leads first
  const sortedTeam = useMemo(() => {
    if (selectedCategory === 'All') {
      const getCustomOrder = (name) => {
        const n = (name || '').toLowerCase();
        if (n.includes('chaitanya')) return 1;
        if (n.includes('jaishnavi')) return 2;
        if (n.includes('charmi')) return 3;
        return 99; // Default for others
      };

      return [...filteredTeam].sort((a, b) => {
        const orderA = getCustomOrder(a.name);
        const orderB = getCustomOrder(b.name);
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return (a.randomOrder || 999) - (b.randomOrder || 999);
      });
    }

    if (selectedCategory === 'Technical Team') {
      const getCustomOrder = (name) => {
        const n = (name || '').toLowerCase();
        if (n.includes('navya') && (n.includes('aripaka') || n.includes('a.'))) return 1;
        if (n.includes('karthik') && n.includes('kunduru')) return 2;
        if (n.includes('harshini') && n.includes('padmavathi')) return 3;
        return 99;
      };

      return [...filteredTeam].sort((a, b) => {
        const orderA = getCustomOrder(a.name);
        const orderB = getCustomOrder(b.name);
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return (a.randomOrder || 999) - (b.randomOrder || 999);
      });
    }

    return [...filteredTeam].sort((a, b) => {
      const getCustomOrder = (name) => {
        const n = (name || '').toLowerCase();
        if (n.includes('chaitanya')) return 1;
        if (n.includes('jaishnavi')) return 2;
        if (n.includes('charmi')) return 3;
        return 99;
      };
      const customDiff = getCustomOrder(a.name) - getCustomOrder(b.name);
      if (customDiff !== 0) {
        return customDiff;
      }

      const getPriority = (role) => {
        const r = (role || '').toLowerCase();
        if (r.includes('president')) return 1;
        if (r.includes('lead') || r.includes('director')) return 2;
        if (r.includes('engineer') || r.includes('developer') || r.includes('designer')) return 3;
        return 99;
      };
      const priorityDiff = getPriority(a.role) - getPriority(b.role);
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      return (a.randomOrder || 999) - (b.randomOrder || 999);
    });
  }, [filteredTeam, selectedCategory]);

  // Separate into Leads and Members for segregated rendering
  const { leadsList, membersList } = useMemo(() => {
    const leads = [];
    const members = [];
    sortedTeam.forEach((member) => {
      if (isLeadMember(member)) {
        leads.push(member);
      } else {
        members.push(member);
      }
    });
    return { leadsList: leads, membersList: members };
  }, [sortedTeam]);

  if (loading) return (
    <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-cyan-400" size={48} />
        <span className="text-slate-400 font-medium">Assembling team details...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B1121] text-white pt-24 pb-20 relative overflow-hidden selection:bg-cyan-500/30">

      {/* Background radial glow */}
      <div className="absolute top-0 right-[-10%] w-[45%] h-[45%] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Forge Masters</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            The dedicated builders, developers, and visionaries driving SkillForge Club projects.
          </motion.p>
        </div>



        {/* Search & Category Filter Bar */}
        <div className="mb-12 space-y-6">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, role, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories Grid */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-5xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-[0_4px_20px_rgba(6,182,212,0.3)] scale-[1.03]'
                    : 'bg-slate-950/40 text-slate-400 border-white/5 hover:text-white hover:border-cyan-500/20'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Members Grid */}
        <div className="min-h-[400px] space-y-12">
          {sortedTeam.length === 0 ? (
            <div className="text-center py-24 text-slate-500 font-medium bg-slate-950/20 rounded-3xl border border-white/5 max-w-lg mx-auto">
              No matching team members found.
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-3 gap-2 sm:gap-6 lg:grid-cols-4"
            >
              <AnimatePresence>
                {sortedTeam.map((member) => (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TeamCard
                      name={member.name}
                      role={member.role}
                      domain={member.role}
                      imageUrl={member.avatar}
                      linkedin={member.linkedin}
                      github={member.github}
                      otherLinks={member.otherLinks}
                      objectPosition={member.objectPosition}
                      imageScale={member.imageScale}
                      onClick={() => setSelectedMember(member)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* 2K HD Profile Preview Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Modal backdrop glass effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-slate-950 border border-white/10 w-full max-w-4xl rounded-3xl overflow-y-auto md:overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-none"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full p-2.5 transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area (High Definition 2K Resolution) */}
              <div className="w-full md:w-1/2 h-48 xs:h-64 sm:h-80 md:h-[520px] bg-slate-900 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                {selectedMember.avatar ? (
                  <div className="w-full h-full overflow-hidden" style={{ transform: selectedMember.imageScale ? `scale(${selectedMember.imageScale})` : undefined, transformOrigin: selectedMember.objectPosition || 'center' }}>
                    <img
                      src={selectedMember.avatar}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: selectedMember.objectPosition || 'center', imageRendering: 'auto' }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center">
                    <User size={80} className="text-white/20" />
                  </div>
                )}
                {/* 2K High-Definition Resolution Watermark Badge */}
                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg select-none">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-cyan-300 tracking-widest uppercase">2K Ultra HD View</span>
                </div>
              </div>

              {/* Detail Profile Info Section */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-visible md:overflow-y-auto">
                <div className="space-y-6">
                  {/* Category Tag */}
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold text-xs border border-cyan-500/20 tracking-wider">
                    {selectedMember.department || "Core Domain"}
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-white leading-tight">{selectedMember.name}</h2>
                    <p className="text-cyan-400 text-lg font-bold mt-1.5">{selectedMember.role}</p>
                  </div>

                  <hr className="border-white/5" />

                  {/* Biography */}
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 flex items-center gap-1.5">
                      <Info size={12} /> About Member
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                      {selectedMember.bio}
                    </p>
                  </div>
                </div>

                {/* Footnotes & Social Networking Links */}
                <div className="mt-8 space-y-3">
                  <div className="flex gap-3">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600/15 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-600/35 rounded-xl py-3 text-xs font-bold transition-all"
                      >
                        <Linkedin size={16} /> LinkedIn
                      </a>
                    )}
                    {selectedMember.github && (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 rounded-xl py-3 text-xs font-bold transition-all"
                      >
                        <Github size={16} /> GitHub
                      </a>
                    )}
                  </div>
                  {selectedMember.otherLinks && selectedMember.otherLinks.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {selectedMember.otherLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-cyan-600/15 hover:bg-cyan-600/30 text-cyan-300 hover:text-white border border-cyan-600/35 rounded-xl py-3 text-xs font-bold transition-all"
                        >
                          <ExternalLink size={14} /> {link.label}
                        </a>
                      ))}
                    </div>
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

export default Team;