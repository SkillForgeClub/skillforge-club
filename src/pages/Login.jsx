import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ShieldCheck, Mail, Lock, UserCog, Eye, EyeOff, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { authApi, saveToken } from "../auth";

const ADMIN_EMAIL = "";
const ADMIN_PASS  = "";

/* ── Floating particle background ─────────────────────────────────────── */
const Particle = ({ delay, x, size, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, bottom: "-10px", width: size, height: size, background: color }}
    animate={{ y: [0, -700], opacity: [0, 0.7, 0] }}
    transition={{ duration: 5 + Math.random() * 4, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  delay: i * 0.45,
  x: Math.random() * 100,
  size: `${3 + Math.random() * 5}px`,
  color: i % 2 === 0 ? "rgba(34,211,238,0.6)" : "rgba(99,102,241,0.5)",
}));

/* ── Input field ──────────────────────────────────────────────────────── */
const InputField = ({ icon: Icon, type, placeholder, value, onChange, color }) => {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";

  return (
    <motion.div
      className="relative"
      animate={{ scale: focused ? 1.01 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Icon
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focused ? `text-${color}-400` : "text-gray-500"}`}
        size={18}
      />
      <input
        type={isPassword && show ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className={`w-full bg-slate-800/60 border rounded-2xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:outline-none transition-all duration-300 font-medium backdrop-blur-sm ${
          focused
            ? `border-${color}-500/70 bg-slate-800/80 shadow-[0_0_20px_rgba(6,182,212,0.15)]`
            : "border-white/8 hover:border-white/20"
        }`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </motion.div>
  );
};

/* ── Login card ───────────────────────────────────────────────────────── */
const LoginCard = ({ role, color, icon: Icon, gradient, title, subtitle, emailPlaceholder, buttonText, onSubmit, loading, error, isAdmin, loginOnly }) => {
  const [email, setEmail]           = useState(isAdmin ? ADMIN_EMAIL : "");
  const [password, setPassword]     = useState(isAdmin ? ADMIN_PASS : "");
  const [name, setName]             = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, name, isRegister });
  };

  const colorMap = {
    blue:    { glow: "rgba(59,130,246,0.2)",  ring: "rgba(59,130,246,0.4)"  },
    emerald: { glow: "rgba(16,185,129,0.2)",  ring: "rgba(16,185,129,0.4)"  },
    purple:  { glow: "rgba(168,85,247,0.2)",  ring: "rgba(168,85,247,0.4)"  },
  };
  const { glow } = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      key={role}
      initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, scale: 0.94, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/10 backdrop-blur-2xl w-full"
      style={{
        background: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.7) 100%)",
        boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${glow}`,
      }}
    >
      {/* Animated top gradient strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

      {/* Background glow orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
      />

      <div className="p-5 sm:p-8 md:p-10 relative z-10">
        {/* Icon + header */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-col items-center mb-8 mt-2"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-20 h-20 bg-${color}-500/10 border border-${color}-500/20 rounded-3xl flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(6,182,212,0.15)]`}
          >
            <Icon className={`w-10 h-10 text-${color}-400`} />
          </motion.div>
          <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
          <p className={`text-${color}-300/60 mt-2 text-center text-sm font-medium`}>{subtitle}</p>
        </motion.div>

        {/* Form */}
        <motion.form
          className="space-y-5"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          {!isAdmin && isRegister && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-gray-300 ml-1">Full Name</label>
              <InputField icon={UserCog} type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} color={color} />
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1">{isAdmin ? "Admin Email" : "Email"}</label>
            <InputField icon={Mail} type="email" placeholder={emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} color={color} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1">{isAdmin ? "Access Key" : "Password"}</label>
            <InputField icon={Lock} type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} color={color} />
            {!isAdmin && isRegister && (
              <p className="text-xs text-slate-500 ml-1">8–15 chars · uppercase · number · special (!@#$%^&*)</p>
            )}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                className="bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 text-red-400 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.025, boxShadow: `0 0 30px ${glow}` }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`w-full bg-gradient-to-r ${gradient} text-white font-black py-4 rounded-2xl transition-all mt-2 flex items-center justify-center gap-3 text-base shadow-lg`}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 inline-block"
              />
            ) : (
              <>
                <Sparkles size={18} className="opacity-80" />
                {isRegister ? "Create Account" : buttonText}
              </>
            )}
          </motion.button>

          {!isAdmin && !loginOnly && (
            <p className="text-center text-sm text-gray-500 pt-1">
              {isRegister ? "Already have an account? " : "New here? "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className={`text-${color}-400 font-bold hover:text-${color}-300 transition-colors`}
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </p>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
};

/* ── Main Login Page ──────────────────────────────────────────────────── */
const Login = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const navigate                  = useNavigate();

  const handleSubmit = async ({ email, password, name, isRegister }) => {
    setError("");
    setLoading(true);
    try {
      let res;
      if (isRegister) {
        if (!name.trim())                         { setError("Name is required."); setLoading(false); return; }
        if (password.length < 8 || password.length > 15) { setError("Password must be 8–15 characters."); setLoading(false); return; }
        if (!/[A-Z]/.test(password))             { setError("Password must contain at least one uppercase letter."); setLoading(false); return; }
        if (!/[0-9]/.test(password))             { setError("Password must contain at least one number."); setLoading(false); return; }
        if (!/[!@#$%^&*]/.test(password))        { setError("Password must contain at least one special character (!@#$%^&*)."); setLoading(false); return; }
        res = await authApi.register(name, email, password);
      } else {
        res = await authApi.login(email, password);
      }

      if (res.token) {
        // Enforce: the role returned must match the tab the user logged in from
        if (!isRegister && res.user.role !== activeTab) {
          const portalName = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
          setError(`This account does not have ${portalName} access. Please use the correct portal.`);
          setLoading(false);
          return;
        }
        saveToken(res.token, res.user);
        if (isRegister) {
          navigate("/onboarding");
        } else if (res.user.role === "admin") {
          navigate("/admin-portal");
        } else if (res.user.role === "mentor") {
          navigate("/mentor-portal");
        } else {
          navigate("/student-portal");
        }
      } else {
        setError(res.error || res.errors?.[0]?.msg || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Could not connect to server. Make sure the backend is running.");
    }
    setLoading(false);
  };

  const tabs = [
    { id: "student", label: "Student",  icon: GraduationCap, color: "blue",    gradient: "from-blue-400 to-cyan-400"     },
    { id: "mentor",  label: "Mentor",   icon: UserCog,       color: "emerald", gradient: "from-emerald-400 to-teal-400"  },
    { id: "admin",   label: "Admin",    icon: ShieldCheck,   color: "purple",  gradient: "from-purple-500 to-pink-500"   },
  ];

  const cardProps = {
    student: { color: "blue",    gradient: "from-blue-500 to-cyan-400",    icon: GraduationCap, title: "Student Portal",  subtitle: "Access your learning journey",      emailPlaceholder: "student@example.com",  buttonText: "Login to Portal"         },
    mentor:  { color: "emerald", gradient: "from-emerald-500 to-teal-400", icon: UserCog,       title: "Mentor Portal",   subtitle: "Track your assigned students",       emailPlaceholder: "mentor@example.com",   buttonText: "Login to Portal",  loginOnly: true },
    admin:   { color: "purple",  gradient: "from-purple-500 to-pink-500",  icon: ShieldCheck,   title: "Admin Portal",    subtitle: "System management & overview",       emailPlaceholder: ADMIN_EMAIL,            buttonText: "Authorize Access",         isAdmin: true, loginOnly: true },
  };

  const activeColor = tabs.find(t => t.id === activeTab)?.color || "blue";
  const activeGradient = tabs.find(t => t.id === activeTab)?.gradient || "from-blue-400 to-cyan-400";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 overflow-y-auto bg-[#080e1c]">
      {/* Floating Back to Home button */}
      <div className="self-start lg:absolute lg:top-6 lg:left-6 z-20 mb-6 lg:mb-0">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/8 text-gray-400 hover:text-white transition-colors duration-250 text-sm font-bold shadow-lg backdrop-blur-md"
        >
          &larr; Back to Home
        </Link>
      </div>
      {/* Animated particle background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
        {/* Gradient orbs */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-blue-600/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -30, 30, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
            Welcome to{" "}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeGradient} transition-all duration-500`}>
              SkillForge
            </span>
          </h1>
          <p className="text-slate-400 text-base font-medium">Sign in to continue your journey</p>
        </motion.div>

        {/* Animated tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-2xl mb-6 w-full border border-white/8 shadow-xl"
        >
          {tabs.map(({ id, label, icon: Icon, color, gradient: tGrad }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setError(""); }}
                className={`flex-1 py-2.5 px-1.5 sm:px-3 text-xs sm:text-sm md:text-base font-bold rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
                  isActive ? "text-slate-950" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tGrad} rounded-xl`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={17} />
                  {label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Login card */}
        <AnimatePresence mode="wait">
          <LoginCard
            key={activeTab}
            role={activeTab}
            {...cardProps[activeTab]}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
