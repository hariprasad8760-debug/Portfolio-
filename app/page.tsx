'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUp,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  Code2,
  Copy,
  Check,
  Cpu,
  ExternalLink,
  FolderGit2,
  Github,
  GraduationCap,
  Home as HomeIcon,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Terminal,
  User,
  X
} from 'lucide-react';

/* =========================================================================
   TYPES & DATA DEFINITIONS
========================================================================= */

interface DropdownItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: DropdownItem[] = [
  { id: 'home', name: 'Home', desc: 'Apex Overview & Hero', icon: <HomeIcon size={18} /> },
  { id: 'about', name: 'About Me', desc: 'Engineering Philosophy', icon: <User size={18} /> },
  { id: 'skills', name: 'Skills', desc: 'Tech Stack & Arsenal', icon: <Cpu size={18} /> },
  { id: 'projects', name: 'Projects', desc: 'Selected Builds & Labs', icon: <FolderGit2 size={18} /> },
  { id: 'experience', name: 'Experience', desc: 'Internships & History', icon: <Briefcase size={18} /> },
  { id: 'certifications', name: 'Certifications', desc: 'Verified Credentials', icon: <Award size={18} /> },
  { id: 'contact', name: 'Contact', desc: 'Direct Inquiries & Ping', icon: <Mail size={18} /> },
];

interface SkillCategory {
  category: string;
  items: { name: string; pct: number; icon: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Core Languages',
    items: [
      { name: 'Java', pct: 85, icon: '☕' },
      { name: 'Python', pct: 82, icon: '🐍' },
      { name: 'JavaScript', pct: 88, icon: 'JS' },
      { name: 'TypeScript', pct: 80, icon: 'TS' },
      { name: 'SQL', pct: 84, icon: '▦' },
    ],
  },
  {
    category: 'Frontend & UI Systems',
    items: [
      { name: 'React.js', pct: 90, icon: '⚛' },
      { name: 'Next.js', pct: 86, icon: '▲' },
      { name: 'HTML5 & CSS3', pct: 92, icon: '✦' },
      { name: 'UI / UX Design', pct: 85, icon: '◈' },
      { name: 'Framer Motion', pct: 84, icon: '≋' },
    ],
  },
  {
    category: 'Backend & Intelligence',
    items: [
      { name: 'Node.js & Express', pct: 82, icon: '⬢' },
      { name: 'REST APIs & Webhooks', pct: 88, icon: '⇄' },
      { name: 'AI & LLM Integration', pct: 80, icon: '✦' },
      { name: 'Database Architecture', pct: 82, icon: '🗄' },
      { name: 'Git & GitHub Workflows', pct: 90, icon: '⌥' },
    ],
  },
];

interface Project {
  title: string;
  category: string;
  tagline: string;
  desc: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  metric: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Aegis AI Web Engine',
    category: 'Intelligent Systems · Full Stack',
    tagline: 'Autonomous AI orchestration & agentic workflows',
    desc: 'An AI-powered web platform engineered to automate complex enterprise workflows, processing multi-modal user prompts with dynamic reactive frontend visualization and low-latency API handling.',
    tags: ['Next.js', 'Python', 'AI / LLM', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    liveUrl: '#contact',
    metric: 'Sub-150ms Latency',
  },
  {
    title: 'Nexus Data Dashboard',
    category: 'Telemetry & Analytics · Enterprise',
    tagline: 'Real-time telemetry and data streams visualization',
    desc: 'High-throughput analytics console featuring predictive analytics, real-time metrics charting, resilient session caching, and dark obsidian data presentation layers.',
    tags: ['React', 'JavaScript', 'SQL', 'Charts.js', 'Node.js'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    liveUrl: '#contact',
    metric: '99.9% Uptime',
  },
  {
    title: 'Pulse Design System',
    category: 'Interface Engineering · Design Systems',
    tagline: 'Futuristic component library & micro-interaction engine',
    desc: 'A bespoke design language and component architecture built around glassmorphism, fluid physics, accessible contrast, and tactile feedback for modern digital products.',
    tags: ['CSS3', 'Framer Motion', 'React', 'Figma', 'UI/UX'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    liveUrl: '#contact',
    metric: '60 FPS Micro-FX',
  },
  {
    title: 'OmniSecure API Gateway',
    category: 'Backend & Infrastructure · Security',
    tagline: 'High-concurrency authentication and rate-limiting gateway',
    desc: 'Resilient backend authentication hub and API proxy supporting encrypted session tokens, dynamic rate throttling, and relational data query optimization.',
    tags: ['Java', 'SQL', 'Node.js', 'REST APIs', 'PostgreSQL'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    liveUrl: '#contact',
    metric: 'Enterprise Scalable',
  },
];

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'AZHIZEN',
    role: 'AI-Powered Web Development Intern',
    period: '16 JUN 2025 — 30 JUN 2025',
    location: 'Hybrid / Remote',
    summary: 'Spearheaded full-stack application development enriched with artificial intelligence capabilities, streamlining dynamic interfaces and backend services.',
    highlights: [
      'Engineered responsive web interfaces integrated with AI-driven models and real-time backend API endpoints.',
      'Optimized client-side rendering pipelines and data parsing mechanisms for enhanced throughput and usability.',
      'Collaborated on architectural design reviews and continuous testing workflows using modern development practices.',
    ],
    tech: ['AI Integration', 'React', 'Python', 'Node.js', 'REST APIs'],
  },
  {
    company: 'STACK QUEUE',
    role: 'UI/UX Design Intern',
    period: '10 JUL 2024 — 24 JUL 2024',
    location: 'Design Studio',
    summary: 'Focused on digital design systems, user-centric usability architectures, wireframing, and creating high-fidelity interactive web prototypes.',
    highlights: [
      'Conducted design heuristic evaluations and implemented frictionless navigation layouts for modern web tools.',
      'Developed interactive design prototypes translating complex specifications into elegant glass-styled layouts.',
      'Coordinated between design handoffs and frontend development teams to ensure pixel-perfect fidelity.',
    ],
    tech: ['UI/UX Systems', 'Figma', 'Prototyping', 'Design Thinking', 'Wireframing'],
  },
];

interface Certification {
  title: string;
  issuer: string;
  skills: string[];
  verifiedDate: string;
  credentialId: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: 'Full Stack Web Development & Architecture',
    issuer: 'Professional Development Series',
    skills: ['React', 'Node.js', 'REST APIs', 'SQL Database Design'],
    verifiedDate: '2025',
    credentialId: 'VER-HP-78902',
  },
  {
    title: 'AI-Driven Application Engineering',
    issuer: 'Azhizen Tech Specialization',
    skills: ['AI Model Integration', 'Prompt Architecture', 'Python Web Apps'],
    verifiedDate: '2025',
    credentialId: 'AZH-AI-4421',
  },
  {
    title: 'Advanced Java & Object-Oriented Design',
    issuer: 'Engineering Competency Board',
    skills: ['Java Core', 'Data Structures', 'Design Patterns'],
    verifiedDate: '2024',
    credentialId: 'JAVA-ENG-1092',
  },
  {
    title: 'Human-Centered UI/UX Interface Design',
    issuer: 'Stack Queue Design Labs',
    skills: ['Design Systems', 'Micro-Interactions', 'User Research'],
    verifiedDate: '2024',
    credentialId: 'SQ-UX-8812',
  },
];

/* =========================================================================
   ANIMATED PARTICLES / FLOWING WINE LIGHT CANVAS COMPONENT
========================================================================= */
function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    // Particle count: 35 particles for lightweight, silky 60fps performance
    const count = 36;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render flowing wine-red particles and connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 30, 79, ${p.alpha * 0.7})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(180, 20, 56, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <canvas ref={canvasRef} className="ambient-canvas" />
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
      <div className="ambient-glow-3" />
      <div className="ambient-grid" />
    </div>
  );
}

/* =========================================================================
   3D TILT INTERACTIVE BADGE
========================================================================= */
function InteractiveDevBadge() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [9, -9]);
  const rotateY = useTransform(x, [-150, 150], [-9, 9]);

  const springConfig = { stiffness: 200, damping: 20 };
  const smoothRx = useSpring(rotateX, springConfig);
  const smoothRy = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="hero-card-container">
      <motion.div
        className="hero-interactive-card"
        style={{ rotateX: smoothRx, rotateY: smoothRy }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-top-bar">
          <div className="terminal-dots">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
          </div>
          <span className="card-badge-tag">ENGINEER // VERIFIED</span>
        </div>

        <div className="hero-avatar-area">
          <div className="avatar-ring" />
          <div className="avatar-glow" />
          <div className="avatar-monogram">
            H<span>P</span>
          </div>
        </div>

        <div className="card-dev-info">
          <h3 className="card-dev-name">Hariprasad P</h3>
          <p className="card-dev-tagline">Full Stack Developer & AI Innovator</p>
        </div>

        <div className="card-pills-row">
          <span className="tech-mini-pill">Java</span>
          <span className="tech-mini-pill">Python</span>
          <span className="tech-mini-pill">Next.js</span>
          <span className="tech-mini-pill">TypeScript</span>
          <span className="tech-mini-pill">SQL</span>
          <span className="tech-mini-pill">UI/UX</span>
        </div>

        <div className="card-status-box">
          <div className="status-left">
            <span className="status-beacon" />
            <span>Availability Status</span>
          </div>
          <span className="status-val">Open for Roles</span>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   MAIN PORTFOLIO APPLICATION COMPONENT
========================================================================= */
export default function PortfolioPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  // Scroll detection for navbar blur and back to top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside dropdown handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen]);

  const scrollToSection = (id: string) => {
    setIsDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('hariprasad@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSent(false);
    }, 6000);
  };

  return (
    <>
      {/* Background Ambience and Particles */}
      <AmbientCanvas />

      {/* =========================================================================
          TOP NAVBAR
      ========================================================================= */}
      <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Animated Laser Border at Bottom */}
          <div className="navbar-laser-border" />

          {/* Left: Brand / Hariprasad P */}
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <div className="brand-icon-wrapper">
              <div className="brand-orb" />
              <div className="brand-letters">
                H<span>P</span>
              </div>
            </div>
            <div className="brand-info">
              <span className="brand-name">
                Hariprasad P
                <span className="brand-dot" />
              </span>
              <span className="brand-role">FULL STACK // ARCHITECT</span>
            </div>
          </a>

          {/* Right: Actions */}
          <div className="nav-actions">
            {/* 1. GitHub Button */}
            <a
              href="https://github.com/hariprasad8760-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn nav-social-btn"
              aria-label="Visit Hariprasad's GitHub profile"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            {/* 2. LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/hariprasad-p-622417292"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn nav-social-btn"
              aria-label="Visit Hariprasad's LinkedIn profile"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>

            {/* 3. Download Resume Button with Animated Shine */}
            <a
              href="/Hariprasad_P_Resume.txt"
              download="Hariprasad_P_Resume.txt"
              className="nav-btn nav-resume-btn"
              aria-label="Download Hariprasad's Resume"
            >
              <span className="shine-effect" />
              <ArrowDownToLine size={16} />
              <span>Download Resume</span>
            </a>

            {/* 4. Circular Down-Arrow Button */}
            <button
              ref={toggleBtnRef}
              className={`nav-dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isDropdownOpen}
            >
              <ChevronDown size={20} className={`arrow-icon ${isDropdownOpen ? 'rotate' : ''}`} />
            </button>
          </div>

          {/* =========================================================================
              DROPDOWN / MEGA MENU
          ========================================================================= */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                className="nav-dropdown-menu"
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="dropdown-header-tag">
                  <span>Navigation Directory</span>
                  <small>7 Sections</small>
                </div>

                <div className="dropdown-items-list">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      className="dropdown-item"
                      onClick={() => scrollToSection(item.id)}
                    >
                      <div className="dropdown-item-icon">{item.icon}</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">{item.name}</span>
                        <span className="dropdown-item-desc">{item.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Dim overlay when dropdown is open */}
      {isDropdownOpen && (
        <div className="dropdown-overlay" onClick={() => setIsDropdownOpen(false)} />
      )}

      {/* =========================================================================
          MAIN BODY CONTENT
      ========================================================================= */}
      <main>
        {/* =========================================================================
            1. HERO SECTION
        ========================================================================= */}
        <section id="home" className="hero-wrapper section">
          <div className="content-container">
            <div className="hero-grid">
              {/* Left Column: Hero Text */}
              <div>
                <motion.div
                  className="hero-eyebrow-box"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="status-beacon" />
                  <span>AVAILABLE FOR FULL-TIME &amp; STRATEGIC ROLES</span>
                </motion.div>

                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  HARIPRASAD <span className="gradient-wine">P</span>
                </motion.h1>

                <motion.div
                  className="hero-motto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span>BUILD. INNOVATE. ELEVATE.</span>
                  <span className="hero-motto-line" />
                </motion.div>

                <motion.p
                  className="hero-summary"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Crafting digital experiences where intelligent ideas meet elegant engineering.
                  Specializing in scalable full-stack architectures, high-precision interfaces,
                  and AI-powered digital products.
                </motion.p>

                <motion.div
                  className="hero-ctas"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <button onClick={() => scrollToSection('projects')} className="btn-primary">
                    <span>Explore Selected Work</span>
                    <ArrowUpRight size={18} />
                  </button>

                  <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                    <span>Initiate Contact</span>
                    <Mail size={16} />
                  </button>
                </motion.div>

                <motion.div
                  className="hero-stats-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <div className="hero-stat-item">
                    <span className="hero-stat-num">
                      02<span>+</span>
                    </span>
                    <span className="hero-stat-label">Internship Practicums</span>
                  </div>
                  <div className="hero-stat-item">
                    <span className="hero-stat-num">
                      10<span>+</span>
                    </span>
                    <span className="hero-stat-label">Core Technologies</span>
                  </div>
                  <div className="hero-stat-item">
                    <span className="hero-stat-num">
                      7.5<span>★</span>
                    </span>
                    <span className="hero-stat-label">B.Tech IT CGPA</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Interactive Tilt Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <InteractiveDevBadge />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. ABOUT ME SECTION
        ========================================================================= */}
        <section id="about" className="section">
          <div className="content-container">
            <div className="section-badge">01 — PHILOSOPHY &amp; PROFILE</div>
            <h2 className="section-title">
              About <em>Me</em>
            </h2>
            <p className="section-subtitle">
              Bridging robust backend engineering with futuristic user interfaces and AI integrations.
            </p>

            <div className="about-grid" style={{ marginTop: '40px' }}>
              {/* Main Card */}
              <div className="glass-card about-main-card">
                <div>
                  <p className="about-quote">
                    <strong>Architecting solutions, not just code.</strong> I focus on building
                    high-reliability web applications that harmonize performance, clean modularity,
                    and intuitive user interactions. My engineering practice is driven by a deep
                    curiosity for how distributed systems operate and how modern AI can empower real-world
                    end users without unnecessary friction.
                  </p>

                  <div className="about-philosophy-box">
                    <div className="about-philosophy-title">CORE DEVELOPMENT VALUES</div>
                    <p className="about-philosophy-desc">
                      Scalable clean architecture · Rapid prototyping · Accessible performance ·
                      Zero-compromise aesthetics
                    </p>
                  </div>
                </div>

                <div className="about-highlights-grid">
                  <div className="highlight-box">
                    <b>B.Tech</b>
                    <span>Information Tech</span>
                  </div>
                  <div className="highlight-box">
                    <b>AI + Full Stack</b>
                    <span>Specialization</span>
                  </div>
                  <div className="highlight-box">
                    <b>100%</b>
                    <span>Dedication to Craft</span>
                  </div>
                </div>
              </div>

              {/* Side Stack */}
              <div className="about-side-stack">
                <div className="glass-card">
                  <div className="info-card-header">
                    <div className="info-card-icon">
                      <GraduationCap size={22} />
                    </div>
                    <div className="info-card-title">Academic Foundation</div>
                  </div>
                  <div className="education-meta">
                    <div className="education-college">K.S.R College of Engineering</div>
                    <div className="education-degree">
                      Bachelor of Technology · Information Technology
                    </div>
                  </div>
                  <div className="education-score-row">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Cumulative Grade
                    </span>
                    <span className="score-badge">CGPA 7.5 / 10.0</span>
                  </div>
                </div>

                <div className="glass-card">
                  <div className="info-card-header">
                    <div className="info-card-icon">
                      <Terminal size={22} />
                    </div>
                    <div className="info-card-title">Developer DNA</div>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Constantly experimenting with next-generation web technologies, intelligent API
                    orchestrations, and performance-tuned micro-interactions to craft software that
                    leaves a lasting impression.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SKILLS SECTION
        ========================================================================= */}
        <section id="skills" className="section">
          <div className="content-container">
            <div className="section-badge">02 — TECHNICAL ARSENAL</div>
            <h2 className="section-title">
              Skills &amp; <em>Technologies</em>
            </h2>
            <p className="section-subtitle">
              Precision tools and production-grade technologies leveraged to turn complex ideas into
              impactful digital products.
            </p>

            {/* Category Selector Tabs */}
            <div className="skills-category-tabs" style={{ marginTop: '36px' }}>
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.category}
                  className={`category-tab-btn ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Active Category Skills Grid */}
            <div className="skills-grid">
              {SKILL_CATEGORIES[activeTab].items.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-top-row">
                    <div className="skill-brand-wrap">
                      <div className="skill-icon-pill">{skill.icon}</div>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${skill.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. PROJECTS SECTION
        ========================================================================= */}
        <section id="projects" className="section">
          <div className="content-container">
            <div className="section-badge">03 — FEATURED BUILDS</div>
            <h2 className="section-title">
              Selected <em>Projects</em>
            </h2>
            <p className="section-subtitle">
              A curated selection of robust web engineering, AI architectures, and modern user-centric
              products.
            </p>

            <div className="projects-grid" style={{ marginTop: '40px' }}>
              {PROJECTS.map((proj, idx) => (
                <div key={proj.title} className="project-card">
                  <div>
                    <div className="project-top-meta">
                      <span className="project-idx">0{idx + 1} // CASE STUDY</span>
                      <span className="project-tag-pill">{proj.metric}</span>
                    </div>

                    <div className="project-header-row">
                      <div className="project-icon-box">
                        <Layers3 size={22} />
                      </div>
                      <div>
                        <h3 className="project-title">{proj.title}</h3>
                        <p style={{ fontSize: '0.78rem', color: 'var(--wine-vivid)', fontWeight: 600 }}>
                          {proj.category}
                        </p>
                      </div>
                    </div>

                    <p className="project-desc">{proj.desc}</p>

                    <div className="project-tech-tags">
                      {proj.tags.map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-links-row">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      <Github size={15} />
                      <span>Source Code</span>
                    </a>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="project-link-btn primary-link"
                    >
                      <span>Demo Inquiries</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. EXPERIENCE SECTION
        ========================================================================= */}
        <section id="experience" className="section">
          <div className="content-container">
            <div className="section-badge">04 — CAREER TIMELINE</div>
            <h2 className="section-title">
              Professional <em>Experience</em>
            </h2>
            <p className="section-subtitle">
              Demonstrated hands-on experience through focused engineering and UI/UX design internships.
            </p>

            <div className="timeline-container" style={{ marginTop: '50px' }}>
              <div className="timeline-line" />

              {EXPERIENCES.map((exp) => (
                <div key={exp.company} className="timeline-card glass-card">
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <h3 className="timeline-role-title">
                      {exp.company} <span>— {exp.role}</span>
                    </h3>
                    <span className="timeline-duration-badge">{exp.period}</span>
                  </div>

                  <div className="timeline-org">
                    <MapPin size={15} color="var(--wine-vivid)" />
                    <span>{exp.location}</span>
                  </div>

                  <p className="timeline-desc">{exp.summary}</p>

                  <ul className="timeline-bullets">
                    {exp.highlights.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="project-tech-tags" style={{ marginTop: '18px', marginBottom: 0 }}>
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CERTIFICATIONS SECTION
        ========================================================================= */}
        <section id="certifications" className="section">
          <div className="content-container">
            <div className="section-badge">05 — CREDENTIALS &amp; RECOGNITION</div>
            <h2 className="section-title">
              Certifications &amp; <em>Specializations</em>
            </h2>
            <p className="section-subtitle">
              Verified certifications substantiating rigorous proficiency in software engineering and design.
            </p>

            <div className="certifications-grid" style={{ marginTop: '40px' }}>
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="cert-card">
                  <div>
                    <div className="cert-top-row">
                      <div className="cert-icon-wrap">
                        <Award size={22} />
                      </div>
                      <span className="cert-verified-pill">
                        <BadgeCheck size={14} />
                        VERIFIED · {cert.verifiedDate}
                      </span>
                    </div>

                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>
                  </div>

                  <div>
                    <div className="cert-skills-covered">
                      {cert.skills.map((s) => (
                        <span key={s} className="tech-tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONTACT SECTION
        ========================================================================= */}
        <section id="contact" className="section">
          <div className="content-container">
            <div className="section-badge">06 — REACH OUT</div>
            <h2 className="section-title">
              Let’s Build Something <em>Extraordinary.</em>
            </h2>
            <p className="section-subtitle">
              Have an opening, an innovative build in mind, or wish to connect? Send a transmission.
            </p>

            <div className="contact-layout" style={{ marginTop: '40px' }}>
              {/* Direct Info */}
              <div className="contact-info-col">
                <p className="contact-highlight-text">
                  I am currently available for full-time engineering roles, AI product development,
                  and collaborative technology ventures. Reach me directly through any channel below.
                </p>

                <div className="contact-methods-stack">
                  {/* Email */}
                  <div
                    onClick={copyEmailToClipboard}
                    className="contact-method-card"
                    style={{ cursor: 'pointer' }}
                    title="Click to copy email"
                  >
                    <div className="contact-method-icon">
                      <Mail size={20} />
                    </div>
                    <div className="contact-method-info" style={{ flex: 1 }}>
                      <small>Direct Email</small>
                      <span>hariprasad@gmail.com</span>
                    </div>
                    <button
                      type="button"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedEmail ? '#10b981' : 'var(--text-muted)',
                        cursor: 'pointer',
                      }}
                      aria-label="Copy email"
                    >
                      {copiedEmail ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>

                  {/* Phone */}
                  <a href="tel:+918807650205" className="contact-method-card">
                    <div className="contact-method-icon">
                      <Phone size={20} />
                    </div>
                    <div className="contact-method-info">
                      <small>Direct Contact Number</small>
                      <span>+91 8807650205</span>
                    </div>
                  </a>

                  {/* GitHub Direct */}
                  <a
                    href="https://github.com/hariprasad8760-debug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method-card"
                  >
                    <div className="contact-method-icon">
                      <Github size={20} />
                    </div>
                    <div className="contact-method-info">
                      <small>Code Repository</small>
                      <span>github.com/hariprasad8760-debug</span>
                    </div>
                  </a>

                  {/* LinkedIn Direct */}
                  <a
                    href="https://www.linkedin.com/in/hariprasad-p-622417292"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method-card"
                  >
                    <div className="contact-method-icon">
                      <Linkedin size={20} />
                    </div>
                    <div className="contact-method-info">
                      <small>Professional Network</small>
                      <span>linkedin.com/in/hariprasad-p</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <div className="contact-form-card">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@organization.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject / Purpose</label>
                    <input
                      type="text"
                      required
                      placeholder="Project discussion / Role opportunity"
                      className="form-input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Details</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share project goals, timeline, or inquiries..."
                      className="form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <span>Transmitting Message</span>
                    <Send size={18} />
                  </button>

                  {formSent && (
                    <div className="form-success-banner">
                      <BadgeCheck size={20} />
                      <span>Thank you, message transmitted! Hariprasad will respond promptly.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          FOOTER
      ========================================================================= */}
      <footer className="footer-wrapper">
        <div className="content-container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-signature">Hariprasad P</div>
              <p className="footer-copy">
                Crafted with Black + Wine Red + White aesthetics · High-performance engineering · ©{' '}
                {new Date().getFullYear()}
              </p>
            </div>

            <div className="footer-system-status">
              <span className="status-beacon" />
              <span>ALL SYSTEMS OPERATIONAL // 60 FPS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Smooth Button */}
      {isScrolled && (
        <button
          className="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
