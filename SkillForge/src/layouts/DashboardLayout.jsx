import React, { useState, useCallback, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, LogOut, BrainCircuit, Home, Bell, Check, HelpCircle, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getUserFor, logoutRole, getTokenFor } from "../auth";
import PageTransition from "../components/PageTransition";

const DashboardLayout = React.memo(({ menuItems = [], role = "User" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const roleKey = role.toLowerCase(); // "admin" | "mentor" | "student"
  const [user, setUser] = useState(() => getUserFor(roleKey));

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync state if roleKey changes
  useEffect(() => {
    setUser(getUserFor(roleKey));
  }, [roleKey]);

  // Listen to profile updates to sync header in real-time
  useEffect(() => {
    const handleProfileUpdate = () => {
      setUser(getUserFor(roleKey));
    };
    window.addEventListener("user-profile-updated", handleProfileUpdate);
    return () => window.removeEventListener("user-profile-updated", handleProfileUpdate);
  }, [roleKey]);

  // Auth guard — redirect to login if no token for this specific role
  useEffect(() => {
    if (!getTokenFor(roleKey)) {
      navigate("/login", { replace: true });
    }
  }, [navigate, roleKey]);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  const handleLogout = () => {
    logoutRole(roleKey);
    navigate("/login", { replace: true });
  };

  const nameToShow = user?.name ? user.name.split(" ")[0] : (role === "Student" ? "Karthik" : role);
  const fullUserTitle = user?.name ?? (role === "Student" ? "Karthik" : role);
  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : (role === "Student" ? "K" : role[0].toUpperCase());

  return (
    <div className="flex h-screen bg-[#090d1a] text-white font-sans overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d152a] border-r border-white/10 flex flex-col transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex-shrink-0`}>

        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-white/10 bg-[#0a1124]">
          <Link to="/" className="flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-cyan-400" />
            <span className="font-bold text-xl tracking-tight text-white flex flex-col leading-none">
              <span>SkillForge</span>
              <span className="text-[0.65rem] text-cyan-400 tracking-widest uppercase mt-1 font-bold">{role} PORTAL</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path || (item.path !== "/student-portal" && location.pathname.startsWith(item.path + "/"));
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
                    ? "bg-[#2f67f6] text-white font-bold shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
              >
                <div className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-cyan-400"} transition-colors`}>
                  {item.icon}
                </div>
                <span className="font-semibold text-sm tracking-wide">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions Widget Above Logout */}
        <div className="mx-4 mb-3 p-3.5 rounded-2xl bg-[#09132c] border border-blue-500/20 shadow-lg space-y-2">
          <h4 className="text-[0.7rem] font-extrabold text-cyan-400 uppercase tracking-wider px-1">Quick Actions</h4>
          <div className="space-y-1">
            {/* Q&A / Ask Doubt */}
            <a
              href="https://forms.gle/4cEyGRVQiQPwu9nC7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-purple-600/20 hover:text-purple-300 border border-transparent hover:border-purple-500/30 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Q&A / Ask Doubt</span>
            </a>

            {/* Feedback -> Direct to Home */}
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-amber-600/20 hover:text-amber-300 border border-transparent hover:border-amber-500/30 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Feedback</span>
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors group"
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-rose-400" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-0 overflow-hidden relative">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none z-0" />

        {/* Top Header Bar Matching User Image 1 */}
        <header className="h-20 lg:h-24 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-white/10 relative z-20 bg-[#070d1f]/90 backdrop-blur-md shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 lg:hidden">
              <Menu className="w-6 h-6" />
            </button>

            {/* Welcome Greeting Section */}
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                Welcome back, {nameToShow}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium hidden sm:block mt-0.5">
                Keep learning, keep growing. You're doing great!
              </p>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="p-2.5 rounded-full bg-[#0d1633] text-cyan-400 hover:bg-white/10 hover:text-cyan-300 border border-white/10 transition-colors" title="Back to Home">
              <Home className="w-4 h-4" />
            </Link>

            {/* Profile Pill Card */}
            <div className="flex items-center gap-2.5 bg-[#0c1633] border border-white/10 hover:border-cyan-500/40 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer hover:bg-[#132048] transition-all shadow-md">
              <div className="w-8 h-8 rounded-full bg-[#009bf2] text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-cyan-400/20 flex-shrink-0">
                {initials}
              </div>
              <span className="text-sm font-semibold text-white hidden sm:inline-block">
                {fullUserTitle}
              </span>
              <span className="text-[0.65rem] text-[#00d8ff] font-extrabold tracking-wider uppercase bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                {role === "Student" ? "STUDENT" : role.toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
});

DashboardLayout.displayName = "DashboardLayout";
export default DashboardLayout;
