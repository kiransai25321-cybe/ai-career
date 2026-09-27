import React, { useState, useEffect } from 'react';
import { 
  Briefcase, ChevronRight, BarChart2, FileText, Cpu, Target, 
  Sun, Moon, Bell, Upload, Sparkles, TrendingUp, ArrowRight, Menu, X, 
  Mic, LogOut, Check, Search, PlusCircle, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, 
  Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

// --- DATA TYPES ---
interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  location: string;
  experience: string;
  targetRole: string;
  skills: string[];
}

interface JobMatch {
  id: number;
  title: string;
  company: string;
  location: string;
  match: number;
  salary: string;
  skills: string[];
  type: string;
}

interface SkillGap {
  name: string;
  level: number;
  status: 'High Priority' | 'Medium Priority' | 'Low Priority';
  demand: 'High' | 'Moderate';
}

interface RoadmapItem {
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date: string;
  description: string;
}

// --- INITIAL MOCK DATA ---
const DEFAULT_USER: UserProfile = {
  name: "Sai Kiran",
  email: "sai.kiran@example.com",
  role: "Python Full Stack Developer",
  avatar: "SK",
  location: "Hyderabad, India",
  experience: "Mid-Level (2-4 Yrs)",
  targetRole: "Python Full Stack Developer",
  skills: ["Python", "HTML", "CSS", "SQL", "Git", "JavaScript", "Django"]
};

const STATS_DATA = [
  { id: 1, title: "Resume ATS Score", value: "84/100", trend: "+8% this month", positive: true, icon: FileText, color: "from-blue-500 to-indigo-600" },
  { id: 2, title: "Active Job Matches", value: "24", trend: "6 new this week", positive: true, icon: Briefcase, color: "from-purple-500 to-pink-600" },
  { id: 3, title: "Detected Skills", value: "18", trend: "3 added recently", positive: true, icon: Cpu, color: "from-emerald-500 to-teal-600" },
  { id: 4, title: "Skill Gap Ratio", value: "28%", trend: "4 key target skills", positive: false, icon: Target, color: "from-amber-500 to-orange-600" }
];

const JOBS_DATA: JobMatch[] = [
  { id: 1, title: "Python Full Stack Developer", company: "TechNova Solutions", location: "Hyderabad (Hybrid)", match: 94, salary: "₹14 - ₹18 LPA", skills: ["Python", "Django", "React", "PostgreSQL", "REST APIs"], type: "Full-time" },
  { id: 2, title: "Senior AI & Data Engineer", company: "CyberPulse Analytics", location: "Bengaluru (Remote)", match: 88, salary: "₹20 - ₹28 LPA", skills: ["Python", "FastAPI", "Docker", "PyTorch", "AWS"], type: "Full-time" },
  { id: 3, title: "Backend API Specialist", company: "FinStack Global", location: "Hyderabad (On-site)", match: 82, salary: "₹12 - ₹15 LPA", skills: ["Python", "SQL", "Docker", "Redis", "Microservices"], type: "Full-time" },
  { id: 4, title: "Data Analyst & Visualizer", company: "InfoMetrics Labs", location: "Mumbai (Hybrid)", match: 76, salary: "₹9 - ₹12 LPA", skills: ["Python", "SQL", "Tableau", "PowerBI", "Pandas"], type: "Contract" }
];

const INITIAL_SKILL_GAPS: SkillGap[] = [
  { name: "React Framework", level: 45, status: "High Priority", demand: "High" },
  { name: "FastAPI / Microservices", level: 30, status: "High Priority", demand: "High" },
  { name: "Docker & Kubernetes", level: 20, status: "Medium Priority", demand: "Moderate" },
  { name: "CI/CD & Cloud Deployment", level: 10, status: "Low Priority", demand: "High" }
];

const ROADMAP_STEPS: RoadmapItem[] = [
  { title: "Python Advanced Concepts & Decorators", status: "completed", date: "Jan 2026", description: "Mastered memory management, generators, decorators, and OOP design patterns." },
  { title: "SQL Database Normalization & Querying", status: "completed", date: "Feb 2026", description: "Indexing strategies, complex multi-table joins, and query plan optimizations." },
  { title: "Django Web Framework & REST APIs", status: "in-progress", date: "Current", description: "Building scalable JSON APIs with DRF, middleware, and JWT authentication." },
  { title: "React Frontend Integration & Redux", status: "upcoming", date: "Next Month", description: "Connecting dynamic React single-page apps with Django REST backends." },
  { title: "Docker Containerization & AWS Deployment", status: "upcoming", date: "Future", description: "Packaging applications with Docker Compose and deploying on AWS ECS." }
];

const ANALYTICS_LINE = [
  { month: "Jan", score: 62, matches: 8 },
  { month: "Feb", score: 68, matches: 12 },
  { month: "Mar", score: 74, matches: 15 },
  { month: "Apr", score: 79, matches: 19 },
  { month: "May", score: 84, matches: 24 }
];

const RADAR_SKILLS = [
  { subject: 'Python', A: 90 },
  { subject: 'Frontend', A: 65 },
  { subject: 'Database', A: 80 },
  { subject: 'DevOps', A: 30 },
  { subject: 'Architecture', A: 50 },
  { subject: 'Security', A: 40 },
];

const INTERVIEW_QUESTIONS = [
  "Tell me about a time you optimized a slow SQL query or API endpoint in a Python application.",
  "How do you handle architectural tradeoffs between Django's quick setup versus FastAPI's execution speed?",
  "Explain how you would design an asynchronous task queue system using Celery and Redis."
];

export default function App() {
  // --- APP STATES ---
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auth Form States
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [regName, setRegName] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regRole, setRegRole] = useState<string>("Python Full Stack Developer");

  // Resume State
  const [resumeText, setResumeText] = useState<string>(
    "Experienced Software Engineer with a strong background in Python web frameworks, SQL databases, and building RESTful APIs. Passionate about clean code and backend performance."
  );

  // Job Search Filter
  const [jobSearchQuery, setJobSearchQuery] = useState<string>("");

  // Interview Simulator State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [interviewFeedback, setInterviewFeedback] = useState<any>(null);

  // --- LOCK BODY SCROLL ON MOBILE DRAWER OPEN ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- AUTH HANDLERS ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;

    const username = loginEmail.split('@')[0];
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
    const initials = formattedName.substring(0, 2).toUpperCase();

    setUser({
      name: formattedName,
      email: loginEmail,
      role: "Software Engineer",
      avatar: initials || "SK",
      location: "India",
      experience: "Mid-Level",
      targetRole: "Python Full Stack Developer",
      skills: ["Python", "SQL", "JavaScript", "HTML/CSS"]
    });

    setIsAuthenticated(true);
    setActiveTab('dashboard');
    showToast(`Welcome back, ${formattedName}!`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regName) return;

    const initials = regName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    setUser({
      name: regName,
      email: regEmail,
      role: regRole || "Software Developer",
      avatar: initials || "IQ",
      location: "Hyderabad, India",
      experience: "Job Seeker",
      targetRole: regRole || "Software Developer",
      skills: ["Python", "SQL", "Git"]
    });

    setIsAuthenticated(true);
    setActiveTab('dashboard');
    showToast(`Account created successfully! Welcome ${regName}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('login');
    setLoginEmail('');
    setLoginPassword('');
    setIsMobileMenuOpen(false);
    showToast("Logged out successfully.");
  };

  // --- INTERVIEW EVALUATION ---
  const handleAnalyzeAnswer = () => {
    if (!userAnswer.trim()) {
      showToast("Please enter or record an answer first.");
      return;
    }
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setInterviewFeedback({
        score: 86,
        clarity: "High",
        fillerWords: 2,
        starMethod: true,
        suggestions: [
          "Strong use of situation-action structure.",
          "Add quantitative metrics (e.g., 'reduced API query time by 35%').",
          "Include a brief summary of how you prevented regression."
        ]
      });
      showToast("Answer evaluation complete!");
    }, 1200);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* PUBLIC AUTH / LANDING FLOW */}
      {!isAuthenticated ? (
        <div className="relative overflow-hidden min-h-screen">
          <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                IQ
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                CareerIQ
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('login')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'login' ? 'text-indigo-400 font-bold' : 'text-slate-300 hover:text-white'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setActiveTab('register')}
                className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </nav>

          {/* LANDING PAGE */}
          {activeTab === 'landing' && (
            <main className="max-w-7xl mx-auto px-6 pt-16 pb-28">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> AI Career Intelligence Platform
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                  Your Resume Is More Than a Document. <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    It's Your Career Data.
                  </span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                  Analyze your resume, discover matching high-growth opportunities, identify skill gaps, and execute a personalized roadmap with real-time AI guidance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('register')}
                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-base shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    Analyze My Resume <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => { setIsAuthenticated(true); setActiveTab('dashboard'); }}
                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-xl font-bold text-base transition-all"
                  >
                    Explore Live Dashboard Demo
                  </button>
                </div>
              </div>

              {/* Preview Card */}
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-500 font-mono ml-2">careeriq.ai/dashboard</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Resume ATS Score</div>
                    <div className="text-3xl font-extrabold text-indigo-400 mt-2">84 / 100</div>
                    <div className="text-xs text-emerald-400 mt-1">↑ Top 5% of Candidates</div>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Missing Skill Gap</div>
                    <div className="text-3xl font-extrabold text-amber-400 mt-2">3 Target Skills</div>
                    <div className="text-xs text-slate-400 mt-1">FastAPI, Docker, Microservices</div>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Salary Potential</div>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-2">₹16.5 LPA</div>
                    <div className="text-xs text-emerald-400 mt-1">+24% with Cloud Certification</div>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* SIGN IN / REGISTER FORM */}
          {(activeTab === 'login' || activeTab === 'register') && (
            <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
              <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl mb-3 shadow-lg shadow-indigo-500/30">
                    IQ
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {activeTab === 'login' ? 'Sign In to CareerIQ' : 'Create Free Account'}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {activeTab === 'login' ? 'Access your personal AI career workspace' : 'Start tracking and boosting your career metrics'}
                  </p>
                </div>

                {activeTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                        placeholder="sai.kiran@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Password</label>
                      <input 
                        type="password" 
                        required 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all mt-2"
                    >
                      Sign In
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Sai Kiran"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                        placeholder="sai.kiran@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Password</label>
                      <input 
                        type="password" 
                        required 
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Target Career Role</label>
                      <input 
                        type="text" 
                        value={regRole}
                        onChange={(e) => setRegRole(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Python Full Stack Developer"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all mt-2"
                    >
                      Create Free Account
                    </button>
                  </form>
                )}

                <div className="mt-6 text-center text-xs text-slate-400">
                  {activeTab === 'login' ? (
                    <span>Don't have an account? <button onClick={() => setActiveTab('register')} className="text-indigo-400 hover:underline font-semibold">Register here</button></span>
                  ) : (
                    <span>Already registered? <button onClick={() => setActiveTab('login')} className="text-indigo-400 hover:underline font-semibold">Sign in</button></span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* AUTHENTICATED DASHBOARD WORKSPACE */
        <div className="flex min-h-screen">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-2 mb-8 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/30">
                IQ
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                CareerIQ
              </span>
            </div>

            <nav className="flex-1 space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
                { id: 'resume', label: 'Resume & Builder', icon: FileText },
                { id: 'jobs', label: 'Job Matches', icon: Briefcase },
                { id: 'skills', label: 'Skill Gap Analysis', icon: Target },
                { id: 'roadmap', label: 'Career Roadmap', icon: TrendingUp },
                { id: 'interview', label: 'AI Mock Interview', icon: Mic, badge: 'New' },
                { id: 'analytics', label: 'Market Analytics', icon: Cpu },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-semibold' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-bold text-white uppercase">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.avatar}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-200 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.role}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  title="Log Out"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* MOBILE DRAWER (SCROLL LOCKED) */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm touch-none" onClick={() => setIsMobileMenuOpen(false)} />
              <div className="relative w-64 bg-slate-900 h-full p-6 flex flex-col border-r border-slate-800 z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-lg text-white">CareerIQ</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex-1 space-y-2">
                  {['dashboard', 'resume', 'jobs', 'skills', 'roadmap', 'interview', 'analytics'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl capitalize font-medium text-sm ${
                        activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
                <button 
                  onClick={handleLogout}
                  className="w-full py-2.5 mt-auto bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-semibold text-xs border border-red-500/20 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          )}

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* TOP HEADER */}
            <header className="h-16 border-b border-slate-800/80 bg-slate-900/40 px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span>Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-slate-200 capitalize">{activeTab}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button className="p-2 text-slate-400 hover:text-white rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-colors relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                </button>
              </div>
            </header>

            {/* TAB CONTENT VIEWS */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">

              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-white">Welcome back, {user.name} 👋</h2>
                      <p className="text-slate-400 text-sm mt-1">Here is your career intelligence overview for <span className="text-indigo-400 font-medium">{user.targetRole}</span>.</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('resume')}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4" /> Optimize Resume
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {STATS_DATA.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                            <div className={`p-2 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md`}>
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-2xl font-black text-white">{stat.value}</div>
                          <div className="text-xs text-emerald-400 font-medium mt-1">{stat.trend}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-base text-white">Career Score Progress</h3>
                          <p className="text-xs text-slate-400">Monthly improvement in profile ATS rank</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          +22% Growth
                        </span>
                      </div>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={ANALYTICS_LINE}>
                            <defs>
                              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
                      <h3 className="font-bold text-base text-white">Competency Radar</h3>
                      <p className="text-xs text-slate-400">Current skill balance across key tech domains</p>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_SKILLS}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                            <Radar name="Competency" dataKey="A" stroke="#818cf8" fill="#6366f1" fillOpacity={0.5} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RESUME BUILDER TAB */}
              {activeTab === 'resume' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Live AI Resume Studio</h2>
                      <p className="text-slate-400 text-sm">Refine your resume text to match target job ATS requirements.</p>
                    </div>
                    <button 
                      onClick={() => showToast("Exported resume as PDF!")}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" /> Export PDF
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Resume Content</label>
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        rows={10}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                      />
                      <button 
                        onClick={() => {
                          setResumeText((prev) => prev + "\n• Optimized high-throughput API endpoints using FastAPI and AsyncIO, improving latency by 40%.");
                          showToast("Added AI bullet recommendation!");
                        }}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-xl flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" /> Insert AI Impact Bullet
                      </button>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <span className="text-xs text-slate-400 font-semibold uppercase">ATS Compatibility Score</span>
                          <div className="text-3xl font-extrabold text-indigo-400 mt-1">84 / 100</div>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-indigo-500 flex items-center justify-center font-bold text-white text-sm bg-indigo-500/10">
                          84%
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase text-slate-400">Matched Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Python", "Django", "SQL", "REST APIs", "Git"].map((kw) => (
                            <span key={kw} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1">
                              <Check className="w-3 h-3" /> {kw}
                            </span>
                          ))}
                          {["Docker", "FastAPI", "Kubernetes"].map((kw) => (
                            <span key={kw} className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1">
                              <X className="w-3 h-3" /> Missing: {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI MOCK INTERVIEW TAB */}
              {activeTab === 'interview' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-bold text-white">AI Technical Interview Simulator</h2>
                    <p className="text-slate-400 text-sm">Practice answering role-specific questions and receive automated evaluation feedback.</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                        Question {currentQuestionIdx + 1} of {INTERVIEW_QUESTIONS.length}
                      </span>
                      <button 
                        onClick={() => {
                          setCurrentQuestionIdx((prev) => (prev + 1) % INTERVIEW_QUESTIONS.length);
                          setUserAnswer("");
                          setInterviewFeedback(null);
                        }}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        Next Question <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-relaxed">
                      "{INTERVIEW_QUESTIONS[currentQuestionIdx]}"
                    </h3>

                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      rows={5}
                      placeholder="Type your response using the STAR method (Situation, Task, Action, Result)..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />

                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => {
                          setUserAnswer("In my previous project, we faced a database latency issue on our user lookup API. I analyzed query plans, added missing indexes, and implemented Redis caching, reducing response times from 450ms to 80ms.");
                          showToast("Loaded sample voice response.");
                        }}
                        className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2"
                      >
                        <Mic className="w-4 h-4 text-red-400" /> Auto-Fill Audio Script
                      </button>

                      <button 
                        onClick={handleAnalyzeAnswer}
                        disabled={isEvaluating}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
                      >
                        {isEvaluating ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Evaluate Answer"}
                      </button>
                    </div>

                    {interviewFeedback && (
                      <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400 uppercase">AI Evaluation Results</span>
                          <span className="text-xs font-bold text-emerald-400">Score: {interviewFeedback.score}/100</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {interviewFeedback.suggestions.map((s: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* JOB MATCHES TAB */}
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Smart Job Matching Engine</h2>
                      <p className="text-slate-400 text-sm">Role opportunities scored directly against your verified resume profile.</p>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search roles or skills..."
                        value={jobSearchQuery}
                        onChange={(e) => setJobSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {JOBS_DATA.filter(j => j.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(jobSearchQuery.toLowerCase()))).map((job) => (
                      <div key={job.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-base text-white">{job.title}</h3>
                            <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold text-xs border border-emerald-500/20">
                            {job.match}% Match
                          </span>
                        </div>

                        <div className="text-sm font-bold text-indigo-400">{job.salary}</div>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((s) => (
                            <span key={s} className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-xs">
                              {s}
                            </span>
                          ))}
                        </div>

                        <button 
                          onClick={() => showToast(`Gap analysis calculated for ${job.company}!`)}
                          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
                        >
                          View Skill Gap Analysis
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SKILL GAP ANALYSIS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-bold text-white">Target Skill Gap Matrix</h2>
                    <p className="text-slate-400 text-sm">Key skills required to upgrade your compensation and role seniority.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                      <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">Skill Competency Gaps</h3>
                      {INITIAL_SKILL_GAPS.map((sg) => (
                        <div key={sg.name} className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-200">{sg.name}</span>
                            <span className="text-indigo-400">{sg.level}% Mastery</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${sg.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">Recommended Upskilling Project</h3>
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">Build FastAPI Microservices Gateway</span>
                          <span className="text-xs text-amber-400">High Impact</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Build an async API gateway handling user authentication, rate limiting, and PostgreSQL connection pooling.
                        </p>
                        <button 
                          onClick={() => showToast("Project added to your roadmap!")}
                          className="mt-2 text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <PlusCircle className="w-3.5 h-3.5" /> Add Project To Roadmap
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ROADMAP TAB */}
              {activeTab === 'roadmap' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-bold text-white">Personalized Learning Roadmap</h2>
                    <p className="text-slate-400 text-sm">Step-by-step milestones to reach senior level candidate status.</p>
                  </div>

                  <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-8 pl-6">
                    {ROADMAP_STEPS.map((step, idx) => (
                      <div key={idx} className="relative group">
                        <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
                          step.status === 'completed' ? 'bg-emerald-500 border-emerald-400' :
                          step.status === 'in-progress' ? 'bg-indigo-500 border-indigo-400 animate-pulse' : 'bg-slate-800 border-slate-600'
                        }`} />
                        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">{step.date}</span>
                          <h4 className="font-bold text-base text-white mt-1">{step.title}</h4>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.description}</p>
                          <span className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                            step.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                            step.status === 'in-progress' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {step.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MARKET ANALYTICS TAB */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-bold text-white">Tech Industry Hiring Market Analytics</h2>
                    <p className="text-slate-400 text-sm">Demand trends and salary benchmarking for full-stack developers.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <h3 className="font-bold text-sm text-white">In-Demand Tech Skills</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'Python', demand: 92 },
                            { name: 'SQL', demand: 85 },
                            { name: 'React', demand: 78 },
                            { name: 'FastAPI', demand: 68 },
                            { name: 'Docker', demand: 88 }
                          ]}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Bar dataKey="demand" fill="#6366f1" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <h3 className="font-bold text-sm text-white">Salary Growth Impact</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Adding Cloud Deployment (AWS & Docker) to your current skill profile increases average compensation offers by <span className="text-emerald-400 font-bold">+28%</span> in Indian tech hubs like Hyderabad and Bengaluru.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      )}
    </div>
  );
}
