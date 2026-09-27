import React, { useState, useEffect, useMemo } from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  LayoutDashboard, FileText, Briefcase, Target, Compass, Code2, Sparkles, 
  BarChart3, CloudSun, User, Settings, Bell, Sun, Moon, LogOut, CheckCircle2, 
  XCircle, AlertTriangle, ArrowRight, Upload, Search, Filter, ChevronRight, 
  Plus, ExternalLink, Zap, Shield, Eye, Trash2, Edit, RefreshCw, Check, Clock,
  MapPin, DollarSign, Building, Sparkle, Menu, X, Share2, Award, BookOpen, UserCheck,
  TrendingUp, Activity, Layers, Play
} from 'lucide-react';

// User Profile Mock Data
const MOCK_USER = {
  name: "Sai Kiran",
  title: "Python Full Stack Developer Aspirant",
  email: "saikiran@example.com",
  targetRole: "Python Full Stack Developer",
  location: "Hyderabad, India",
  education: "B.Tech in Computer Science (2024)",
  resumeScore: 82,
  jobMatchesCount: 24,
  skillsDetectedCount: 18,
  skillGapPercent: 32,
  skills: ["Python", "HTML5", "CSS3", "JavaScript", "SQL", "Git", "REST APIs", "Django", "PostgreSQL"],
  careerInterests: ["Full Stack Development", "AI / Machine Learning", "Data Engineering"]
};

// Skill Gap Mock Data
const MOCK_SKILLS_HAVEN = [
  { name: "Python", level: 85, category: "Languages" },
  { name: "SQL & Relational DBs", level: 80, category: "Database" },
  { name: "HTML/CSS/JS", level: 78, category: "Frontend" },
  { name: "Git & Version Control", level: 90, category: "Tools" },
  { name: "Django Basics", level: 70, category: "Backend" }
];

const MOCK_SKILLS_NEEDED = [
  { name: "React.js", gap: "High Priority", demandScore: 92, status: "In Progress" },
  { name: "FastAPI", gap: "Medium Priority", demandScore: 84, status: "Not Started" },
  { name: "Docker & Containers", gap: "High Priority", demandScore: 88, status: "Not Started" },
  { name: "PostgreSQL Advanced", gap: "Low Priority", demandScore: 75, status: "Completed" },
  { name: "Redis Caching", gap: "Medium Priority", demandScore: 70, status: "Not Started" }
];

const MOCK_RADAR_DATA = [
  { subject: 'Python/Django', Possessed: 80, Required: 90 },
  { subject: 'React Frontend', Possessed: 45, Required: 85 },
  { subject: 'Database Systems', Possessed: 75, Required: 80 },
  { subject: 'DevOps/Docker', Possessed: 30, Required: 75 },
  { subject: 'API Architecture', Possessed: 70, Required: 85 },
  { subject: 'System Design', Possessed: 40, Required: 70 }
];

// Jobs Mock Data
const MOCK_JOBS = [
  {
    id: "job-1",
    title: "Python Full Stack Developer",
    company: "TechNova Solutions",
    location: "Hyderabad (Hybrid)",
    salary: "₹8,00,000 - ₹12,00,000 / yr",
    match: 94,
    type: "Full-Time",
    experience: "0-2 Years",
    possessedSkills: ["Python", "Django", "SQL", "Git"],
    missingSkills: ["React", "Docker"],
    description: "Looking for an energetic Full Stack Developer who knows Python/Django and modern JavaScript frameworks. Build high-scale REST APIs and sleek user interfaces.",
    posted: "2 days ago"
  },
  {
    id: "job-2",
    title: "Junior Backend Engineer (FastAPI)",
    company: "CloudScale Inc.",
    location: "Remote / Bengaluru",
    salary: "₹9,50,000 - ₹14,00,000 / yr",
    match: 88,
    type: "Full-Time",
    experience: "1-3 Years",
    possessedSkills: ["Python", "SQL", "REST APIs", "Git"],
    missingSkills: ["FastAPI", "Docker", "Redis"],
    description: "Join our core backend infrastructure team building microservices with FastAPI, PostgreSQL, and asynchronous Python architecture.",
    posted: "1 day ago"
  },
  {
    id: "job-3",
    title: "Associate Data Analyst",
    company: "Analytics Core",
    location: "Hyderabad",
    salary: "₹6,00,000 - ₹8,50,000 / yr",
    match: 82,
    type: "Full-Time",
    experience: "0-1 Years",
    possessedSkills: ["Python", "SQL", "Git"],
    missingSkills: ["Pandas", "Power BI"],
    description: "Extract insights from raw transactional datasets. Ideal for entry-level developers with high database mastery and basic Python analytical chops.",
    posted: "3 days ago"
  },
  {
    id: "job-4",
    title: "Machine Learning Intern",
    company: "CognitiveAI Labs",
    location: "Remote",
    salary: "₹25,000 / month Stipend",
    match: 76,
    type: "Internship",
    experience: "Freshers",
    possessedSkills: ["Python", "Git"],
    missingSkills: ["PyTorch", "Scikit-Learn", "FastAPI"],
    description: "Hands-on research internship working on LLM fine-tuning, retrieval-augmented generation pipelines, and model deployments.",
    posted: "Just now"
  },
  {
    id: "job-5",
    title: "React & Python Software Engineer",
    company: "NextGen Software",
    location: "Hyderabad",
    salary: "₹10,00,000 - ₹15,00,000 / yr",
    match: 91,
    type: "Full-Time",
    experience: "1-2 Years",
    possessedSkills: ["Python", "HTML5", "CSS3", "JavaScript", "Git"],
    missingSkills: ["React", "Redux"],
    description: "Cross-functional engineering position building high-throughput user dashboards backed by robust Python microservices.",
    posted: "4 days ago"
  }
];

// Career Roadmap Steps Mock Data
const MOCK_ROADMAP = [
  { id: 1, title: "Python Fundamentals & Advanced OOP", status: "Completed", score: "100%", detail: "Variables, Functions, OOPs, Modules, File Handling, Exception Handling." },
  { id: 2, title: "SQL, Relational Databases & ORM", status: "Completed", score: "95%", detail: "Complex Joins, Aggregations, Indexing, Django ORM Schema modeling." },
  { id: 3, title: "Backend Web APIs (Django & FastAPI)", status: "In Progress", score: "65%", detail: "Building RESTful Endpoints, JWT Authentication, Serializers, OpenAPI docs." },
  { id: 4, title: "Modern Frontend Mastery (React & Tailwind)", status: "Not Started", score: "0%", detail: "React Hooks, Context API, Tailwind CSS, Recharts, Async Data Fetching." },
  { id: 5, title: "DevOps & Containerization (Docker, AWS)", status: "Not Started", score: "0%", detail: "Dockerfiles, Docker Compose, CI/CD Actions, Deployment to AWS EC2/App Runner." },
  { id: 6, title: "System Design & Interview Preparation", status: "Not Started", score: "0%", detail: "Data Structures, Algorithms, Mock Tech Interviews, Resume Optimization." }
];

// Projects Mock Data
const MOCK_PROJECTS = [
  {
    id: "proj-1",
    title: "AI Resume & Portfolio Analyzer",
    difficulty: "Intermediate",
    missingSkillSolved: "FastAPI & React Integration",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "Tailwind"],
    progress: 35,
    description: "Build an automated resume analyzer application that extracts PDF text, computes keyword vectors, and renders interactive skill matching scores."
  },
  {
    id: "proj-2",
    title: "Real-time Job Recommendation Engine",
    difficulty: "Advanced",
    missingSkillSolved: "Docker & Machine Learning",
    tags: ["Python", "Scikit-Learn", "Docker", "REST API"],
    progress: 0,
    description: "Develop a content-based recommendation system that scores job descriptions against user resume tokens in real-time."
  },
  {
    id: "proj-3",
    title: "E-Commerce Microservices Platform",
    difficulty: "Advanced",
    missingSkillSolved: "Redis & Architecture",
    tags: ["Django", "React", "Redis", "PostgreSQL"],
    progress: 0,
    description: "Construct scalable microservices handling product catalogs, secure payment gateway mock webhooks, and asynchronous Redis task queues."
  },
  {
    id: "proj-4",
    title: "Customer Churn Prediction System",
    difficulty: "Intermediate",
    missingSkillSolved: "Pandas & Data Pipelines",
    tags: ["Python", "Pandas", "Streamlit", "Scikit-Learn"],
    progress: 100,
    description: "Data intelligence web utility predicting subscription drop-offs with custom visual explainability dashboards."
  }
];

// Analytics Mock Charts Data
const MOCK_ANALYTICS = {
  skillDemand: [
    { skill: "Python", demand: 95 },
    { skill: "SQL", demand: 88 },
    { skill: "React", demand: 92 },
    { skill: "FastAPI", demand: 76 },
    { skill: "Docker", demand: 84 },
    { skill: "AWS", demand: 80 }
  ],
  careerInterest: [
    { name: "Full Stack Dev", value: 45, color: "#6366f1" },
    { name: "Data Science", value: 25, color: "#10b981" },
    { name: "AI / ML", value: 20, color: "#f59e0b" },
    { name: "DevOps", value: 10, color: "#ef4444" }
  ],
  skillProgress: [
    { month: "Jan", score: 45 },
    { month: "Feb", score: 55 },
    { month: "Mar", score: 62 },
    { month: "Apr", score: 70 },
    { month: "May", score: 78 },
    { month: "Jun", score: 82 }
  ],
  matchTrend: [
    { week: "Wk 1", matches: 8 },
    { week: "Wk 2", matches: 12 },
    { week: "Wk 3", matches: 15 },
    { week: "Wk 4", matches: 24 }
  ]
};

// Mock Weather Data with Service Layer
const MOCK_WEATHER_SERVICE = {
  getWeather: (city = "Hyderabad") => {
    const formattedCity = city.trim().toLowerCase();
    const isHyd = formattedCity.includes("hyderabad") || formattedCity === "";
    
    return {
      city: isHyd ? "Hyderabad" : city.charAt(0).toUpperCase() + city.slice(1),
      country: isHyd ? "India" : "Global",
      temp: isHyd ? 29 : 24,
      condition: isHyd ? "Partly Cloudy" : "Sunny & Clear",
      humidity: isHyd ? "62%" : "50%",
      wind: isHyd ? "14 km/h" : "10 km/h",
      feelsLike: isHyd ? "31°C" : "25°C",
      visibility: "10 km",
      forecast: [
        { day: "Mon", temp: "30°C", condition: "Sunny" },
        { day: "Tue", temp: "29°C", condition: "Partly Cloudy" },
        { day: "Wed", temp: "28°C", condition: "Thunderstorms" },
        { day: "Thu", temp: "31°C", condition: "Clear" },
        { day: "Fri", temp: "30°C", condition: "Partly Cloudy" }
      ]
    };
  }
};

export default function App() {
  // Navigation & Theme State
  const [currentPath, setCurrentPath] = useState('/');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Resume Upload Simulation State
  const [resumeFile, setResumeFile] = useState(null);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [resumesList, setResumesList] = useState([
    { name: "SaiKiran_Resume.pdf", size: "2.4 MB", date: "May 12, 2026", status: "Analyzed ✓", score: 82 }
  ]);

  // AI Writing Tool Interactive State
  const [sampleWritingText, setSampleWritingText] = useState(
    "Highly motivated professional with exceptional dynamic skillsets seeking synergy in high-growth paradigms to optimize outcomes."
  );
  const [improvedWritingText, setImprovedWritingText] = useState("");
  const [isGeneratingWriting, setIsGeneratingWriting] = useState(false);

  // Search & Filter State
  const [jobSearchTerm, setJobSearchTerm] = useState("");
  const [jobLocationFilter, setJobLocationFilter] = useState("All");

  // Weather Search State
  const [weatherQuery, setWeatherQuery] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(MOCK_WEATHER_SERVICE.getWeather("Hyderabad"));

  // Apply dark mode class to document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Route Handler wrapper
  const navigate = (path) => {
    setCurrentPath(path);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Header = () => (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-600 dark:text-slate-300 rounded-lg lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Good morning, Sai Kiran <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Here's your career intelligence overview.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Theme Switcher Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="Toggle Dark/Light Theme"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h3>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">2 New</span>
              </div>
              <div className="mt-2 space-y-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-300">6 New Job Matches Found!</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Python Full Stack roles matching 90%+ of your skills.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                  <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">Resume Analysis Complete</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Your score improved to 82/100 this week.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Link */}
        <div 
          onClick={() => navigate('/profile')} 
          className="flex items-center space-x-3 cursor-pointer p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/20">
            SK
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">Sai Kiran</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Pro Member</p>
          </div>
        </div>
      </div>
    </header>
  );

  const Sidebar = () => {
    const navItems = [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Resume Intelligence", path: "/resume", icon: FileText },
      { name: "Job Matches", path: "/jobs", icon: Briefcase },
      { name: "Skill Gap Analysis", path: "/skills", icon: Target },
      { name: "Career Roadmap", path: "/roadmap", icon: Compass },
      { name: "Recommended Projects", path: "/projects", icon: Code2 },
      { name: "AI Writing Analysis", path: "/ai-writing-analysis", icon: Sparkles },
      { name: "Career Analytics", path: "/analytics", icon: BarChart3 },
      { name: "Weather Intelligence", path: "/weather", icon: CloudSun },
      { name: "My Profile", path: "/profile", icon: User },
      { name: "Settings", path: "/settings", icon: Settings },
    ];

    return (
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col justify-between border-r border-slate-800
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="p-2 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/30">
                <Sparkle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                CareerIQ
              </span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150
                    ${isActive 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold" 
                      : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                SK
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Sai Kiran</p>
                <p className="text-[10px] text-slate-400">Target: Python Dev</p>
              </div>
            </div>
            <button 
              onClick={() => {
                showToast("Logged out successfully");
                navigate('/login');
              }}
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    );
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Landing Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/30">
            <Sparkle className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">CareerIQ</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
          <a href="#career-tools" className="hover:text-indigo-400 transition-colors">Career Tools</a>
          <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-md shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-28 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="lg:col-span-7 space-y-6 text-left z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Gen Career Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Your Resume Is More Than a Document. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">
              It's Your Career Data.
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Analyze your resume, discover matching opportunities, identify skill gaps, and build a personalized career roadmap with AI-powered insights.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => navigate('/resume')}
              className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Analyze My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded-xl transition-all"
            >
              Explore Dashboard
            </button>
          </div>

          {/* Key metrics ticker */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
            <div>
              <p className="text-2xl font-bold text-white">94%</p>
              <p className="text-xs text-slate-500">Matching Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">10k+</p>
              <p className="text-xs text-slate-500">Skills Mapped</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-slate-500">Data Privacy</p>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="lg:col-span-5 z-10">
          <div className="relative rounded-2xl p-4 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">careeriq.ai/dashboard</span>
            </div>

            <div className="py-4 space-y-4">
              <div className="flex justify-between items-center bg-indigo-950/40 p-3 rounded-xl border border-indigo-900/50">
                <div>
                  <p className="text-xs font-semibold text-indigo-300">Resume Intelligence Score</p>
                  <p className="text-2xl font-extrabold text-white">82 / 100</p>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-indigo-500 flex items-center justify-center font-bold text-xs text-white">
                  82%
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Python Full Stack Match</span>
                  <span className="text-emerald-400 font-semibold">94% Match</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[94%]"></div>
                </div>
              </div>

              <div className="p-3 bg-slate-800/50 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">Recommended Action</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Gap Detected</span>
                </div>
                <p className="text-[11px] text-slate-400">Learn React.js & Docker to increase job matches by 40%.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Platform Features</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Everything You Need To Get Hired</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Resume Intelligence", desc: "Analyze resume skills, education, projects, and formatting with parsing AI.", icon: FileText },
            { title: "Job Matching", desc: "Discover targeted jobs that match your current stack with high precision score.", icon: Briefcase },
            { title: "Skill Gap Analysis", desc: "Find the exact missing skills you need for your target senior or entry roles.", icon: Target },
            { title: "AI Writing Analysis", desc: "Identify generic phrasing or repetitive writing patterns in resume summaries.", icon: Sparkles },
            { title: "Career Roadmap", desc: "Step-by-step custom learning milestones tailored to fill your precise skill gaps.", icon: Compass },
            { title: "Career Analytics", desc: "Understand industry skill demand trends and track your score progress visually.", icon: BarChart3 }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all group text-left">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Simple Process</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">4 Steps To Your Dream Role</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { step: "01", title: "Upload Resume", desc: "Drag & drop your PDF or DOCX resume into our parser." },
            { step: "02", title: "AI Analyzes Profile", desc: "Deep extraction of skills, projects, and writing tone." },
            { step: "03", title: "Discover Matches", desc: "Get curated job openings with match compatibility %." },
            { step: "04", title: "Follow Roadmap", desc: "Complete recommended projects and close skill gaps." }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left relative">
              <span className="text-4xl font-extrabold text-indigo-500/30 block mb-2">{s.step}</span>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 px-6 py-8 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CareerIQ Platform. All rights reserved.</p>
          <div className="flex space-x-6 text-slate-400">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/login')}>Login</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/register')}>Register</span>
          </div>
        </div>
      </footer>
    </div>
  );

  const LoginPage = () => {
    const [email, setEmail] = useState("saikiran@example.com");
    const [password, setPassword] = useState("••••••••");

    const handleSubmit = (e) => {
      e.preventDefault();
      showToast("Logged in successfully!");
      navigate('/dashboard');
    };

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-left">
          <div className="text-center space-y-2">
            <div 
              onClick={() => navigate('/')} 
              className="inline-flex items-center space-x-2 cursor-pointer mb-2"
            >
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Sparkle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CareerIQ</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-xs text-slate-400">Sign in to access your career intelligence dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500" 
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 text-indigo-600 focus:ring-0" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast("Password reset link sent!"); }} className="text-indigo-400 hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase font-semibold">Or</span>
          </div>

          <button 
            type="button"
            onClick={() => {
              showToast("Google Auth simulation success");
              navigate('/dashboard');
            }}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all"
          >
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} className="text-indigo-400 font-semibold cursor-pointer hover:underline">
              Create one
            </span>
          </p>
        </div>
      </div>
    );
  };

  const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [targetRole, setTargetRole] = useState("Python Full Stack Developer");

    const handleSubmit = (e) => {
      e.preventDefault();
      showToast("Account created successfully!");
      navigate('/dashboard');
    };

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-left">
          <div className="text-center space-y-2">
            <div onClick={() => navigate('/')} className="inline-flex items-center space-x-2 cursor-pointer mb-2">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Sparkle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CareerIQ</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
            <p className="text-xs text-slate-400">Start transforming your resume into actionable intelligence</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input 
                type="text" 
                placeholder="Sai Kiran"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input 
                type="email" 
                placeholder="sai@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Career Goal</label>
              <select 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Python Full Stack Developer</option>
                <option>Data Scientist / AI Engineer</option>
                <option>Backend Developer (FastAPI/Django)</option>
                <option>Frontend React Engineer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Min. 8 characters"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500" 
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="text-indigo-400 font-semibold cursor-pointer hover:underline">
              Sign In
            </span>
          </p>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* 4 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Resume Score", value: "82/100", sub: "+8% this month", icon: FileText, color: "indigo" },
          { label: "Job Matches", value: "24", sub: "6 new matches", icon: Briefcase, color: "emerald" },
          { label: "Skills Detected", value: "18", sub: "3 added recently", icon: Award, color: "sky" },
          { label: "Skill Gap", value: "32%", sub: "4 priority skills", icon: Target, color: "amber" }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Grid: Resume Intelligence Card & Skill Gap Overview */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Resume Intelligence */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Resume Intelligence Score</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Analyzed from SaiKiran_Resume.pdf</p>
            </div>
            <button 
              onClick={() => navigate('/resume')}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all"
            >
              View Full Analysis
            </button>
          </div>

          <div className="grid sm:grid-cols-12 gap-6 items-center">
            {/* Circular Gauge Score */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="46" stroke="currentColor" strokeWidth="10" className="text-slate-200 dark:text-slate-700" fill="transparent" />
                  <circle cx="56" cy="56" r="46" stroke="currentColor" strokeWidth="10" strokeDasharray={2 * Math.PI * 46} strokeDashoffset={2 * Math.PI * 46 * (1 - 0.82)} className="text-indigo-600 dark:text-indigo-500" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">82%</span>
                  <span className="block text-[10px] text-slate-500">Strong</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown Progress */}
            <div className="sm:col-span-7 space-y-3">
              {[
                { label: "Skills Extraction", val: 92 },
                { label: "Experience Impact", val: 76 },
                { label: "Projects Detail", val: 84 },
                { label: "Keywords Relevance", val: 71 },
                { label: "Formatting Cleanliness", val: 88 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{item.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full" style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Skill Gap Summary */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Skill Gap Breakdown</h3>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-full">Target: Full Stack</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> You Have (5 Core Skills)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "HTML/CSS", "SQL", "Git", "REST APIs"].map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Recommended To Learn
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["React.js", "FastAPI", "Docker", "Redis"].map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/skills')}
            className="w-full py-2.5 mt-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs rounded-xl transition-all"
          >
            Explore Skill Roadmap →
          </button>
        </div>
      </div>

      {/* Top Matching Jobs Preview */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Top Recommended Jobs</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Curated based on your skill score & experience level</p>
          </div>
          <button 
            onClick={() => navigate('/jobs')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View All ({MOCK_JOBS.length}) →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_JOBS.slice(0, 3).map((job) => (
            <div key={job.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">{job.title}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    {job.match}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{job.company} • {job.location}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {job.possessedSkills.map((s, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => {
                  setSelectedJob(job);
                }}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition-all"
              >
                View Match Analysis
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResumePage = () => {
    const handleFileUpload = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setResumeFile(file);
        setIsAnalyzingResume(true);
        setTimeout(() => {
          setIsAnalyzingResume(false);
          setResumesList([
            { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, date: "Just now", status: "Analyzed ✓", score: 85 },
            ...resumesList
          ]);
          showToast(`Successfully parsed and analyzed ${file.name}`);
        }, 2000);
      }
    };

    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resume Intelligence Hub</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Upload, analyze, and manage your stored career resumes</p>
        </div>

        {/* Upload Drop Area */}
        <div className="p-8 border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 rounded-3xl bg-indigo-50/30 dark:bg-slate-900 text-center space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Upload your latest Resume (PDF or DOCX)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supports files up to 10MB. Automatic skill extraction and score calculation.
            </p>
          </div>

          <label className="inline-block cursor-pointer">
            <span className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition-all inline-flex items-center space-x-2">
              <span>Select File</span>
            </span>
            <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="hidden" />
          </label>

          {isAnalyzingResume && (
            <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 rounded-3xl flex flex-col items-center justify-center space-y-3 z-10 backdrop-blur-sm">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Extracting Skills & Analyzing Content...</p>
            </div>
          )}
        </div>

        {/* Previous Resumes Table */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Uploaded Resumes History</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="pb-3">File Name</th>
                  <th className="pb-3">Uploaded Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {resumesList.map((res, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <span>{res.name}</span>
                    </td>
                    <td className="py-3 text-slate-500">{res.date}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 font-semibold text-[10px]">
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-indigo-600 dark:text-indigo-400">{res.score}/100</td>
                    <td className="py-3 text-right space-x-2">
                      <button 
                        onClick={() => navigate('/dashboard')}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg"
                        title="View Score Analysis"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setResumesList(resumesList.filter((_, index) => index !== i));
                          showToast("Resume deleted");
                        }}
                        className="p-1.5 text-slate-500 hover:text-red-500 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const AIWritingAnalysisPage = () => {
    const handleImprove = () => {
      setIsGeneratingWriting(true);
      setTimeout(() => {
        setIsGeneratingWriting(false);
        setImprovedWritingText("Results-driven Software Engineer with hands-on experience developing REST APIs in Python/Django and building reactive frontend user interfaces.");
        showToast("AI Generated refined resume summary!");
      }, 1500);
    };

    return (
      <div className="space-y-6 text-left">
        {/* Important Probabilistic Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start space-x-3 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">Disclaimer:</span> AI-writing detection is probabilistic and cannot prove whether a resume was written by AI. Treat these indicators as stylistic suggestions to make your writing sound more human and personalized.
          </p>
        </div>

        {/* Gauge & Metrics Overview */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI-Writing Likelihood</h3>
            
            <div className="w-32 h-32 rounded-full border-8 border-amber-500/80 flex flex-col items-center justify-center text-center p-2 bg-amber-500/5">
              <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">Medium</span>
              <span className="text-[10px] text-slate-500">42% Probability</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Contains common generic buzzwords and repetitive syntax.
            </p>
          </div>

          <div className="md:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Detected Wording Signals</h3>

            {[
              { signal: "Generic Buzzword Phrasing", desc: "'exceptional dynamic skillsets', 'synergy'", risk: "High" },
              { signal: "Repetitive Sentence Structure", desc: "Multiple passive phrases starting with abstract goals", risk: "Medium" },
              { signal: "Over-optimized Keyword Density", desc: "Slightly unnatural keyword packing in summary", risk: "Low" }
            ].map((sig, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{sig.signal}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{sig.desc}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  sig.risk === "High" ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300" :
                  sig.risk === "Medium" ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300" :
                  "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
                }`}>
                  {sig.risk} Risk
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Interactive Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Interactive Wording Refiner</h3>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed space-y-2">
            <p className="font-semibold text-slate-500">Current Resume Text Sample:</p>
            <p className="text-slate-800 dark:text-slate-200">
              "<span className="bg-amber-200 dark:bg-amber-900/60 px-1 rounded font-medium">Highly motivated professional</span> with <span className="bg-red-200 dark:bg-red-900/60 px-1 rounded font-medium">exceptional dynamic skillsets</span> seeking <span className="bg-amber-200 dark:bg-amber-900/60 px-1 rounded font-medium">synergy in high-growth paradigms</span>."
            </p>
          </div>

          {improvedWritingText && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs leading-relaxed space-y-2 animate-in fade-in">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Recommended Human-centric Revision:
              </p>
              <p className="text-emerald-900 dark:text-emerald-200 font-medium">
                "{improvedWritingText}"
              </p>
            </div>
          )}

          <button 
            onClick={handleImprove}
            disabled={isGeneratingWriting}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGeneratingWriting ? "Generating Human Tone..." : "Improve This Section"}</span>
          </button>
        </div>
      </div>
    );
  };

  const JobsPage = () => {
    const filteredJobs = MOCK_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
                            job.possessedSkills.some(s => s.toLowerCase().includes(jobSearchTerm.toLowerCase()));
      const matchesLoc = jobLocationFilter === "All" || job.location.includes(jobLocationFilter);
      return matchesSearch && matchesLoc;
    });

    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Job Discoveries</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Targeted openings algorithmically matched to your active skillset</p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search jobs, companies, or skills (e.g. Python, React)..."
              value={jobSearchTerm}
              onChange={(e) => setJobSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            <select 
              value={jobLocationFilter}
              onChange={(e) => setJobLocationFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="All">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Remote">Remote</option>
              <option value="Bengaluru">Bengaluru</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{job.title}</h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{job.company}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
                    {job.match}% Match
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 my-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 my-2">{job.description}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex flex-wrap gap-1.5">
                  {job.possessedSkills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded">
                      ✓ {s}
                    </span>
                  ))}
                  {job.missingSkills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                      ⚠ Need {s}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedJob(job)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow transition-all"
                >
                  View Match Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const JobDetailModal = () => {
    if (!selectedJob) return null;

    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-start pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedJob.title}</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{selectedJob.company} • {selectedJob.location}</p>
            </div>
            <button 
              onClick={() => setSelectedJob(null)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Match Compatibility Score</p>
              <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{selectedJob.match}% Match</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
              High Probability Hiring Fit
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
              <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Matching Possessed Skills ({selectedJob.possessedSkills.length})</h4>
              <div className="space-y-1">
                {selectedJob.possessedSkills.map((s, i) => (
                  <p key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {s}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
              <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300">Missing Skills To Learn ({selectedJob.missingSkills.length})</h4>
              <div className="space-y-1">
                {selectedJob.missingSkills.map((s, i) => (
                  <p key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> {s}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Why This Job Matches</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your resume exhibits strong mastery of core Python paradigms, RESTful APIs, and SQL relational schema design required by {selectedJob.company}. Learning {selectedJob.missingSkills.join(' and ')} will close your remaining gap.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => {
                showToast(`Added ${selectedJob.title} to your target career plan!`);
                setSelectedJob(null);
              }}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
            >
              Add to Career Plan
            </button>
            <button 
              onClick={() => setSelectedJob(null)}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SkillsPage = () => (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Skill Gap Analysis</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Comparison of your possessed skills vs. target Python Full Stack Developer standards</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Competency Radar Comparison</h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={MOCK_RADAR_DATA}>
                <PolarGrid stroke="#475569" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 10 }} />
                <Radar name="Possessed Level" dataKey="Possessed" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Radar name="Required Level" dataKey="Required" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff', borderRadius: '12px', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Missing Skills Priority List */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Priority Missing Skills</h3>

          <div className="space-y-3">
            {MOCK_SKILLS_NEEDED.map((sk, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{sk.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Industry Demand Score: {sk.demandScore}/100</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    sk.gap === "High Priority" ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300" :
                    sk.gap === "Medium Priority" ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300" :
                    "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
                  }`}>
                    {sk.gap}
                  </span>
                  <button 
                    onClick={() => navigate('/roadmap')}
                    className="p-1 text-slate-400 hover:text-indigo-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const RoadmapPage = () => (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Personalized Career Roadmap</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Step-by-step learning milestones to become a Python Full Stack Engineer</p>
        </div>

        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Overall Completion:</span>
          <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">48%</span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900/60 ml-4 space-y-8">
          {MOCK_ROADMAP.map((step) => (
            <div key={step.id} className="relative pl-6">
              {/* Dot Icon Indicator */}
              <div className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step.status === "Completed" ? "bg-emerald-500 text-white" :
                step.status === "In Progress" ? "bg-indigo-600 text-white animate-pulse" :
                "bg-slate-200 dark:bg-slate-800 text-slate-500"
              }`}>
                {step.status === "Completed" ? "✓" : step.id}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{step.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    step.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
                    step.status === "In Progress" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" :
                    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Projects</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Tailored portfolio projects specifically selected to solve your missing skill gaps</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_PROJECTS.map((proj) => (
          <div key={proj.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{proj.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold">
                  {proj.difficulty}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{proj.description}</p>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs mb-3">
                <span className="text-slate-500 font-medium">Closes Gap: </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{proj.missingSkillSolved}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={() => showToast(`Enrolled in project: ${proj.title}`)}
              className="w-full py-2.5 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow transition-all"
            >
              Start Project Module
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalyticsPage = () => (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Career Intelligence Analytics</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Data-driven visualizations on market demand, career interests, and match progress</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Demand Bar Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Industry Skill Demand Score</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS.skillDemand}>
                <XAxis dataKey="skill" tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 10 }} />
                <YAxis tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff', borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="demand" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Progress Line Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Skill Mastery Progress Over Months</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_ANALYTICS.skillProgress}>
                <XAxis dataKey="month" tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 10 }} />
                <YAxis tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff', borderRadius: '12px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const WeatherPage = () => {
    const handleSearch = (e) => {
      e.preventDefault();
      setWeatherData(MOCK_WEATHER_SERVICE.getWeather(weatherQuery));
    };

    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Career & Weather Intelligence</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Live environmental weather conditions for interview planning & office commuting</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <input 
            type="text" 
            placeholder="Search city (e.g. Hyderabad, Bengaluru)..."
            value={weatherQuery}
            onChange={(e) => setWeatherQuery(e.target.value)}
            className="flex-grow px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow">
            Search
          </button>
        </form>

        {/* Weather Card Display */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-xl space-y-6 max-w-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{weatherData.city}</h3>
              <p className="text-xs text-indigo-200">{weatherData.country}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <CloudSun className="w-8 h-8 text-amber-300" />
            </div>
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-5xl font-extrabold">{weatherData.temp}°C</span>
            <span className="text-sm font-medium text-indigo-100">{weatherData.condition}</span>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10 text-center text-xs">
            <div>
              <p className="text-indigo-200 text-[10px]">Humidity</p>
              <p className="font-bold">{weatherData.humidity}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-[10px]">Wind</p>
              <p className="font-bold">{weatherData.wind}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-[10px]">Feels Like</p>
              <p className="font-bold">{weatherData.feelsLike}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-[10px]">Visibility</p>
              <p className="font-bold">{weatherData.visibility}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfilePage = () => (
    <div className="space-y-6 text-left max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">User Profile</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage your persona, career aspirations, and detected skills</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
            SK
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{MOCK_USER.name}</h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{MOCK_USER.targetRole}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{MOCK_USER.location} • {MOCK_USER.education}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Detected Skills ({MOCK_USER.skills.length})</h4>
          <div className="flex flex-wrap gap-1.5">
            {MOCK_USER.skills.map((sk, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="space-y-6 text-left max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Settings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Preferences, notification alerts, and account details</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Email Notifications</p>
            <p className="text-slate-500">Receive alerts when new high-compatibility job matches appear</p>
          </div>
          <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Public Resume Visibility</p>
            <p className="text-slate-500">Allow verified recruiters to view your anonymized profile match</p>
          </div>
          <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
        </div>

        <button 
          onClick={() => showToast("Settings saved successfully!")}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );

  if (currentPath === '/') return <LandingPage />;
  if (currentPath === '/login') return <LoginPage />;
  if (currentPath === '/register') return <RegisterPage />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentPath === '/dashboard' && <DashboardView />}
          {currentPath === '/resume' && <ResumePage />}
          {currentPath === '/ai-writing-analysis' && <AIWritingAnalysisPage />}
          {currentPath === '/jobs' && <JobsPage />}
          {currentPath === '/skills' && <SkillsPage />}
          {currentPath === '/roadmap' && <RoadmapPage />}
          {currentPath === '/projects' && <ProjectsPage />}
          {currentPath === '/analytics' && <AnalyticsPage />}
          {currentPath === '/weather' && <WeatherPage />}
          {currentPath === '/profile' && <ProfilePage />}
          {currentPath === '/settings' && <SettingsPage />}
        </main>
      </div>

      {/* Modal overlays */}
      <JobDetailModal />
    </div>
  );
}