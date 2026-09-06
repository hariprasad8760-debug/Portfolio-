'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import {
  ArrowDownToLine,
  ArrowUp,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Check,
  ChevronDown,
  Code2,
  Copy,
  ExternalLink,
  FileText,
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
  TrendingUp,
  User,
} from 'lucide-react';

/* =========================================================================
   DROPDOWN DIRECTORY DATA (MATCHING USER'S MOCKUP)
========================================================================= */

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'home', name: 'Home', icon: <HomeIcon size={18} /> },
  { id: 'about', name: 'About Me', icon: <User size={18} /> },
  { id: 'skills', name: 'Skills', icon: <Code2 size={18} /> },
  { id: 'projects', name: 'Projects', icon: <Briefcase size={18} /> },
  { id: 'experience', name: 'Experience', icon: <TrendingUp size={18} /> },
  { id: 'certifications', name: 'Certifications', icon: <Award size={18} /> },
  { id: 'contact', name: 'Contact', icon: <Send size={18} /> },
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
  desc: string;
  tags: string[];
  githubUrl: string;
  metric: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Aegis AI Web Engine',
    category: 'Intelligent Systems · Full Stack',
    desc: 'An AI-powered web platform engineered to automate complex enterprise workflows, processing multi-modal user prompts with dynamic reactive frontend visualization and low-latency API handling.',
    tags: ['Next.js', 'Python', 'AI / LLM', 'TypeScript'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    metric: 'Sub-150ms Latency',
  },
  {
    title: 'Nexus Data Dashboard',
    category: 'Telemetry & Analytics · Enterprise',
    desc: 'High-throughput analytics console featuring predictive metrics charting, resilient session caching, and dark obsidian data presentation layers.',
    tags: ['React', 'JavaScript', 'SQL', 'Node.js'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    metric: '99.9% Uptime',
  },
  {
    title: 'Pulse Design System',
    category: 'Interface Engineering · Design Systems',
    desc: 'A bespoke design language and component architecture built around glassmorphism, fluid physics, accessible contrast, and tactile feedback for modern digital products.',
    tags: ['CSS3', 'Framer Motion', 'React', 'UI/UX'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    metric: '60 FPS Micro-FX',
  },
  {
    title: 'OmniSecure API Gateway',
    category: 'Backend & Infrastructure · Security',
    desc: 'Resilient backend authentication hub and API proxy supporting encrypted session tokens, dynamic rate throttling, and relational data query optimization.',
    tags: ['Java', 'SQL', 'Node.js', 'REST APIs'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    metric: 'Enterprise Scalable',
  },
];

/* =========================================================================
   SILKY FLOWING WINE RIBBON & AURORA CANVAS COMPONENT
========================================================================= */
function SilkyRibbonCanvas() {
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

    let step = 0;

    // Subtle moving wine-red dots ("not much", elegant and glowing)
    const redDots = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 1.2,
      baseAlpha: Math.random() * 0.4 + 0.35,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.015,
    }));

    const render = () => {
      step += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Render glowing silky wave ribbons
      const drawRibbon = (offsetY: number, amplitude: number, speed: number, alpha: number, color: string) => {
        ctx.beginPath();
        ctx.moveTo(0, height * offsetY);

        for (let x = 0; x <= width; x += 15) {
          const y =
            height * offsetY +
            Math.sin(x * 0.0025 + step * speed) * amplitude +
            Math.cos(x * 0.0018 + step * 0.7) * (amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(230, 27, 77, 0.4)';
        ctx.shadowBlur = 15;
        ctx.globalAlpha = alpha;
        ctx.stroke();
      };

      // 3 overlapping wine-red light streams (matching image backdrop waves)
      drawRibbon(0.28, 45, 1.2, 0.35, 'rgba(230, 27, 77, 0.6)');
      drawRibbon(0.32, 55, 0.9, 0.25, 'rgba(255, 59, 104, 0.5)');
      drawRibbon(0.36, 40, 1.4, 0.2, 'rgba(160, 16, 50, 0.4)');
      drawRibbon(0.75, 50, 1.0, 0.18, 'rgba(230, 27, 77, 0.3)');

      // Render subtle floating wine-red dots with soft outer glow
      for (let i = 0; i < redDots.length; i++) {
        const dot = redDots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.pulse += dot.pulseSpeed;

        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;

        const currentAlpha = dot.baseAlpha + Math.sin(dot.pulse) * 0.2;

        // Soft outer ambient halo
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * 3.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 27, 77, ${currentAlpha * 0.2})`;
        ctx.fill();

        // Vivid glowing red dot core
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 45, 90, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(230, 27, 77, 0.85)';
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="ambient-container" aria-hidden="true">
      <canvas ref={canvasRef} className="aurora-canvas" />
      <div className="ambient-nebula-1" />
      <div className="ambient-nebula-2" />
      <div className="ambient-nebula-3" />
      {/* Delicate floating background twinkle particles */}
      <span className="sparkle-particle" style={{ top: '18%', left: '12%' }} />
      <span className="sparkle-particle" style={{ top: '25%', right: '18%', animationDelay: '1.2s' }} />
      <span className="sparkle-particle" style={{ top: '65%', left: '22%', animationDelay: '2.4s' }} />
      <span className="sparkle-particle" style={{ top: '78%', right: '14%', animationDelay: '0.8s' }} />
    </div>
  );
}

/* =========================================================================
   INTERACTIVE 3D DEV CARD
========================================================================= */
function InteractiveDevBadge() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [8, -8]);
  const rotateY = useTransform(x, [-150, 150], [-8, 8]);

  const springConfig = { stiffness: 180, damping: 20 };
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
    <div className="hero-card-perspective">
      <motion.div
        className="hero-telemetry-box"
        style={{ rotateX: smoothRx, rotateY: smoothRy }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shimmering Top Laser Flare */}
        <span className="card-laser-flare" />

        {/* Top Spec Bar */}
        <div className="card-spec-bar">
          <div className="terminal-pip-group">
            <span className="pip wine" />
            <span className="pip muted" />
            <span className="pip muted" />
          </div>
          <span className="card-spec-tag">FULL STACK // VERIFIED</span>
        </div>

        {/* Multi-layered Avatar Crest */}
        <div className="telemetry-avatar-stage">
          <div className="stage-rotating-orbit" />
          <div className="stage-rotating-orbit-ccw" />
          <div className="stage-wine-halo" />
          <div className="stage-monogram">
            H<span>P</span>
          </div>
        </div>

        {/* Developer Identity */}
        <div className="telemetry-meta">
          <h3 className="telemetry-name">
            Hariprasad <span>P</span>
          </h3>
          <p className="telemetry-role">Full Stack Developer</p>
        </div>

        {/* Quick Metrics Bar */}
        <div className="card-metrics-strip">
          <div className="metric-cell">
            <b>02</b>
            <span>Internships</span>
          </div>
          <div className="metric-cell">
            <b>10+</b>
            <span>Core Tech</span>
          </div>
          <div className="metric-cell">
            <b>7.5</b>
            <span>B.Tech CGPA</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="telemetry-pills-wrap">
          <span className="telemetry-pill">Java</span>
          <span className="telemetry-pill">Python</span>
          <span className="telemetry-pill">HTML</span>
          <span className="telemetry-pill">Tailwind CSS</span>
          <span className="telemetry-pill">JavaScript</span>
          <span className="telemetry-pill">SQL</span>
        </div>

      </motion.div>

      {/* Status Bar Outside Below the Card */}
      <motion.div
        className="telemetry-pulse-status outside-bar"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <div>
          <span className="status-beacon-live" />
          <span style={{ color: 'var(--text-muted)' }}>Status:</span> Open for Roles
        </div>
        <span style={{ color: 'var(--wine-light)', fontWeight: 600 }}>Available</span>
      </motion.div>

      {/* View Resume Button Outside Below the Status Bar */}
      <motion.a
        href="/Hariprasad_P_Resume.txt"
        target="_blank"
        rel="noopener noreferrer"
        className="card-view-resume-btn"
        aria-label="View Hariprasad's Resume"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="resume-sweep-shine" />
        <span>View resume</span>
        <FileText size={17} />
      </motion.a>
    </div>
  );
}

/* =========================================================================
   SCROLL REVEAL COMPONENT — appear/disappear on scroll
========================================================================= */
function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.15, once: false });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
   PORTFOLIO PAGE COMPONENT
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdown
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

  const scrollToSection = (id: string) => {
    setIsDropdownOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      const navOffset = 85;
      const elementPosition = elem.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hariprasad@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSent(false);
    }, 6000);
  };

  return (
    <>
      {/* Background Ambience and Silky Light Waves */}
      <SilkyRibbonCanvas />

      {/* =========================================================================
          TOP NAVBAR (PIXEL-MATCHING REFERENCE IMAGE)
      ========================================================================= */}
      <header className={`navbar-fixed-outer ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-pill">
          {/* Subtle edge glowing flares */}
          <span className="navbar-corner-glow top-left" />
          <span className="navbar-corner-glow bottom-right" />

          {/* Left: Brand "Hariprasad P" with Serif Typography */}
          <a
            href="#home"
            className="nav-brand-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <span className="brand-text-serif">Hariprasad</span>
            <span className="brand-p-accent">P</span>
          </a>

          {/* Right Controls: Squircle Icons, Resume Pill, Circular Down Arrow */}
          <div className="nav-controls-group">
            {/* GitHub squircle */}
            <a
              href="https://github.com/hariprasad8760-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-squircle-btn"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>

            {/* LinkedIn squircle */}
            <a
              href="https://www.linkedin.com/in/hariprasad-p-622417292"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-squircle-btn"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>

            {/* Resume button with download icon & animated shine */}
            <a
              href="/Hariprasad_P_Resume.txt"
              download="Hariprasad_P_Resume.txt"
              className="nav-resume-pill"
              aria-label="Download Resume"
            >
              <span className="resume-sweep-shine" />
              <span>Resume</span>
              <ArrowDownToLine size={16} />
            </a>

            {/* Circular Down Arrow Toggle Button */}
            <button
              ref={toggleBtnRef}
              className={`circular-down-btn ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Toggle Navigation Dropdown"
              aria-expanded={isDropdownOpen}
            >
              <ChevronDown size={22} />
            </button>
          </div>

          {/* =========================================================================
              DROPDOWN MENU (MATCHING EXACT NOTCH & ORDER IN IMAGE)
          ========================================================================= */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                className="dropdown-card-panel"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="dropdown-nav-list">
                  {MENU_ITEMS.map((item, index) => (
                    <button
                      key={item.id}
                      className={`dropdown-nav-row ${index === 0 ? 'highlight-active' : ''}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Dim backdrop when menu is open */}
      {isDropdownOpen && (
        <div className="menu-backdrop-dim" onClick={() => setIsDropdownOpen(false)} />
      )}

      {/* =========================================================================
          HERO SECTION (MATCHING USER'S IMAGE COPY & DESIGN)
      ========================================================================= */}
      <main>
        <section id="home" className="hero-stage">
          <div className="hero-main-container">
            <div className="hero-content-split">
              {/* Left: Headline & Statement */}
              <div>
                <h1 className="hero-editorial-heading">
                  <motion.span
                    className="hero-word"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Build.
                  </motion.span>
                  <motion.span
                    className="hero-word"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                  >
                    Break.
                  </motion.span>
                  <motion.span
                    className="hero-word elevate"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Better.
                  </motion.span>
                </h1>

                {/* Clean Glowing Wine-Red Divider Beam */}
                <motion.div
                  className="hero-divider-beam"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                />

                {/* Supporting Developer Statement */}
                <motion.div
                  className="hero-four-lines"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                >
                  <p className="hero-line">Where ideas become intelligent digital experiences.</p>
                  <p className="hero-line">Where clean code meets creative engineering.</p>
                  <p className="hero-line line-accent">
                    Building scalable solutions with purpose, precision, and{' '}
                    <span className="wine-highlight">impact</span>.
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  className="hero-button-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                >
                  <button onClick={() => scrollToSection('projects')} className="btn-wine-primary">
                    <span>Explore Projects</span>
                    <ArrowUpRight size={17} />
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="btn-glass-secondary">
                    <span>Let’s Connect</span>
                    <Mail size={16} />
                  </button>
                </motion.div>
              </div>

              {/* Right: Interactive 3D Dev Telemetry Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                <InteractiveDevBadge />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ABOUT ME SECTION
        ========================================================================= */}
        <section id="about" className="portfolio-section">
          <div className="content-wrapper">
            <ScrollReveal>
              <span className="section-eyebrow">01 — PHILOSOPHY</span>
              <h2 className="section-head-title">
                About <em>Me</em>
              </h2>
            </ScrollReveal>

            <div className="about-grid-layout">
              <ScrollReveal>
                <div className="glass-surface">
                  <p className="about-narrative">
                    I&apos;m <strong>Hariprasad P</strong> — a developer who enjoys turning ideas into experiences
                    that feel simple, useful, and different.
                  </p>
                  <p className="about-narrative" style={{ marginTop: '14px' }}>
                    I explore full-stack development, AI, and emerging technologies, constantly experimenting,
                    learning, and pushing ideas beyond the obvious.
                  </p>

                  <div className="about-quote-box" style={{ fontSize: '0.98rem', lineHeight: '1.75', marginBottom: 0 }}>
                    &ldquo;I&apos;m looking for an opportunity to start my professional journey where I can give my full effort, take responsibility, and continuously learn from real-world challenges. I&apos;m eager to gain practical experience, improve my skills, and contribute meaningful value to the team while growing alongside the organization.&rdquo;
                  </div>
                </div>
              </ScrollReveal>

              <div className="about-stack-col">
                <ScrollReveal>
                  <div className="glass-surface education-pill-card">
                    <div className="edu-title-group">
                      <div className="edu-icon-badge">
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <h4 style={{ color: '#ffffff', fontSize: '1.1rem' }}>Academic Foundation</h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          K.S.R College of Engineering
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Bachelor of Technology in Information Technology
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '8px 14px',
                        borderRadius: '8px',
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Score</span>
                      <span style={{ color: 'var(--wine-light)', fontWeight: 700 }}>CGPA: 7.5 / 10.0</span>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="glass-surface education-pill-card">
                    <div className="edu-title-group">
                      <div className="edu-icon-badge">
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <h4 style={{ color: '#ffffff', fontSize: '1.1rem' }}>School</h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          Sri Vidhya Mandir
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Higher Secondary Education
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '8px 14px',
                        borderRadius: '8px',
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Score</span>
                      <span style={{ color: 'var(--wine-light)', fontWeight: 700 }}>77%</span>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="glass-surface education-pill-card">
                    <div className="edu-title-group">
                      <div className="edu-icon-badge">
                        <Terminal size={22} />
                      </div>
                      <div>
                        <h4 style={{ color: '#ffffff', fontSize: '1.1rem' }}>Growth Philosophy</h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          Learn. Adapt. Contribute.
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      I&apos;m eager to begin my professional journey, take on real-world challenges, learn from experienced teams, and continuously improve while making a meaningful contribution to every project I work on.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SKILLS SECTION
        ========================================================================= */}
        <section id="skills" className="portfolio-section">
          <div className="content-wrapper">
            <ScrollReveal>
              <span className="section-eyebrow">02 — TECHNICAL ARSENAL</span>
              <h2 className="section-head-title">
                Skills &amp; <em>Arsenal</em>
              </h2>
              <p className="section-head-subtitle">
                Production-grade technologies harnessed to deliver scalable systems and refined user
                interfaces.
              </p>
            </ScrollReveal>

            <div className="skills-tab-row">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.category}
                  className={`tab-pill-btn ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="skills-card-grid">
              {SKILL_CATEGORIES[activeTab].items.map((skill) => (
                <div key={skill.name} className="skill-widget">
                  <div className="skill-info-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                      <b style={{ color: '#ffffff' }}>{skill.name}</b>
                    </div>
                    <span style={{ color: 'var(--wine-light)', fontFamily: 'var(--font-mono)' }}>
                      {skill.pct}%
                    </span>
                  </div>
                  <div className="skill-meter-track">
                    <div className="skill-meter-bar" style={{ width: `${skill.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            PROJECTS SECTION
        ========================================================================= */}
        <section id="projects" className="portfolio-section">
          <div className="content-wrapper">
            <ScrollReveal>
              <span className="section-eyebrow">03 — PORTFOLIO BUILDS</span>
              <h2 className="section-head-title">
                Selected <em>Projects</em>
              </h2>
              <p className="section-head-subtitle">
                High-impact solutions exhibiting architectural rigor and refined frontend execution.
              </p>
            </ScrollReveal>

            <div className="projects-deck">
              {PROJECTS.map((proj, idx) => (
                <div key={proj.title} className="project-tile">
                  <div>
                    <div className="project-top-spec">
                      <span className="project-case-label">CASE STUDY 0{idx + 1}</span>
                      <span className="project-metric-tag">{proj.metric}</span>
                    </div>
                    <h3 className="project-tile-title">{proj.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--wine-light)', marginBottom: '12px' }}>
                      {proj.category}
                    </p>
                    <p className="project-tile-desc">{proj.desc}</p>
                    <div className="project-tags-deck">
                      {proj.tags.map((t) => (
                        <span key={t} className="tech-tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-tile-actions">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-code-btn"
                    >
                      <Github size={16} />
                      <span>Source Code</span>
                    </a>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="btn-wine-primary"
                      style={{ padding: '6px 14px', fontSize: '0.82rem', marginLeft: 'auto' }}
                    >
                      <span>Inquire</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            EXPERIENCE SECTION
        ========================================================================= */}
        <section id="experience" className="portfolio-section">
          <div className="content-wrapper">
            <ScrollReveal>
              <span className="section-eyebrow">04 — JOURNEY</span>
              <h2 className="section-head-title">
                Professional <em>Experience</em>
              </h2>
              <p className="section-head-subtitle">
                Applied engineering and design work within fast-paced internship environments.
              </p>
            </ScrollReveal>

            <div className="timeline-stem-wrapper">
              <div className="timeline-stem-line" />

              {/* AZHIZEN */}
              <div className="timeline-event-card glass-surface">
                <div className="timeline-stem-node" />
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#ffffff' }}>
                    AZHIZEN <span style={{ color: 'var(--wine-light)' }}>— AI Powered Web Development</span>
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--wine-light)',
                      background: 'rgba(230,27,77,0.12)',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--wine-border)',
                    }}
                  >
                    16 JUN 2025 — 30 JUN 2025
                  </span>
                </div>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', margin: '14px 0' }}>
                  Developed intelligent, AI-powered web applications and strengthened full-stack engineering
                  workflows by integrating AI models directly into modern frontend architectures.
                </p>
                <div className="project-tags-deck" style={{ margin: 0 }}>
                  <span className="tech-tag-chip">AI Integration</span>
                  <span className="tech-tag-chip">React</span>
                  <span className="tech-tag-chip">Python</span>
                  <span className="tech-tag-chip">REST APIs</span>
                </div>
              </div>

              {/* STACK QUEUE */}
              <div className="timeline-event-card glass-surface" style={{ marginTop: '28px' }}>
                <div className="timeline-stem-node" />
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#ffffff' }}>
                    STACK QUEUE <span style={{ color: 'var(--wine-light)' }}>— UI/UX Design Intern</span>
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--wine-light)',
                      background: 'rgba(230,27,77,0.12)',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--wine-border)',
                    }}
                  >
                    10 JUL 2024 — 24 JUL 2024
                  </span>
                </div>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', margin: '14px 0' }}>
                  Honed user-centered thinking, interface ergonomics, design systems, and responsive wireframing
                  to translate complex user journeys into delightful, intuitive screens.
                </p>
                <div className="project-tags-deck" style={{ margin: 0 }}>
                  <span className="tech-tag-chip">UI/UX Systems</span>
                  <span className="tech-tag-chip">Figma</span>
                  <span className="tech-tag-chip">Design Ergonomics</span>
                  <span className="tech-tag-chip">Prototyping</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CERTIFICATIONS SECTION
        ========================================================================= */}
        <section id="certifications" className="portfolio-section">
          <div className="content-wrapper">
            <ScrollReveal>
              <span className="section-eyebrow">05 — CREDENTIALS</span>
              <h2 className="section-head-title">
                Certifications &amp; <em>Honors</em>
              </h2>
              <p className="section-head-subtitle">
                Industry-recognized validations of engineering acumen and interface design.
              </p>
            </ScrollReveal>

            <div className="cert-deck-grid">
              <div className="cert-capsule">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div className="edu-icon-badge">
                      <Award size={20} />
                    </div>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        color: '#10b981',
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.25)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      <BadgeCheck size={14} /> VERIFIED
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#ffffff' }}>
                    Full Stack Web Engineering
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Specialization in Modern React &amp; Scalable Backends
                  </p>
                </div>
              </div>

              <div className="cert-capsule">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div className="edu-icon-badge">
                      <Award size={20} />
                    </div>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        color: '#10b981',
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.25)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      <BadgeCheck size={14} /> VERIFIED
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#ffffff' }}>
                    AI-Driven Web Development
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Azhizen Practical Architecture &amp; LLM Engineering
                  </p>
                </div>
              </div>

              <div className="cert-capsule">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div className="edu-icon-badge">
                      <Award size={20} />
                    </div>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        color: '#10b981',
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.25)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      <BadgeCheck size={14} /> VERIFIED
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#ffffff' }}>
                    UI/UX Design Systems
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Stack Queue Usability &amp; Design Architecture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTACT SECTION
        ========================================================================= */}
        <section id="contact" className="portfolio-section">
          <div className="content-wrapper">
            <ScrollReveal>
              <span className="section-eyebrow">06 — TRANSMISSION</span>
              <h2 className="section-head-title">
                Let&apos;s Connect &amp; <em>Elevate.</em>
              </h2>
              <p className="section-head-subtitle">
                Ready to collaborate on visionary builds or discuss opportunities.
              </p>
            </ScrollReveal>

            <div className="contact-grid-deck">
              <div>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-platinum)' }}>
                  Currently open to full-time roles, software engineering contracts, and impactful
                  technical projects.
                </p>

                <div className="contact-channels-list">
                  {/* Email */}
                  <div
                    onClick={copyEmail}
                    className="contact-link-tile"
                    style={{ cursor: 'pointer' }}
                    title="Click to copy email"
                  >
                    <div className="contact-tile-icon">
                      <Mail size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <small style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                        Email
                      </small>
                      <div style={{ fontWeight: 600 }}>hariprasad@gmail.com</div>
                    </div>
                    {copiedEmail ? <Check size={18} color="#10b981" /> : <Copy size={18} color="var(--text-muted)" />}
                  </div>

                  {/* Phone */}
                  <a href="tel:+918807650205" className="contact-link-tile">
                    <div className="contact-tile-icon">
                      <Phone size={18} />
                    </div>
                    <div>
                      <small style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                        Phone
                      </small>
                      <div style={{ fontWeight: 600 }}>+91 8807650205</div>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/hariprasad8760-debug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-tile"
                  >
                    <div className="contact-tile-icon">
                      <Github size={18} />
                    </div>
                    <div>
                      <small style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                        GitHub
                      </small>
                      <div style={{ fontWeight: 600 }}>github.com/hariprasad8760-debug</div>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/hariprasad-p-622417292"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-tile"
                  >
                    <div className="contact-tile-icon">
                      <Linkedin size={18} />
                    </div>
                    <div>
                      <small style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                        LinkedIn
                      </small>
                      <div style={{ fontWeight: 600 }}>linkedin.com/in/hariprasad-p</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="contact-form-glass">
                <form onSubmit={submitForm}>
                  <div className="form-field-unit">
                    <label>Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field-unit">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-field-unit">
                    <label>Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="Role Opportunity / Project"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div className="form-field-unit">
                    <label>Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your idea or project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="form-send-btn">
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                  {formSent && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '12px',
                        borderRadius: '8px',
                        background: 'rgba(16,185,129,0.12)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#34d399',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <BadgeCheck size={18} />
                      <span>Thank you! Message transmitted successfully.</span>
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
      <footer className="footer-base">
        <div className="content-wrapper">
          <div className="footer-flex">
            <div>
              <div className="footer-brand-title">
                Hariprasad <span>P</span>
              </div>
              <p className="footer-credits">
                Designed with precision in Black + Wine Red + White · © {new Date().getFullYear()}
              </p>
            </div>
            <div className="footer-status-pill">
              <span className="status-beacon-live" style={{ margin: 0 }} />
              <span>SYSTEMS ONLINE // 60 FPS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {isScrolled && (
        <button
          className="floating-top-fab"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
