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
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  FileText,
  FolderGit2,
  Github,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  User,
  X,
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
  items: { name: string; pct: number; icon: React.ReactNode }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Core Languages',
    items: [
      {
        name: 'Java',
        pct: 85,
        icon: (
          <span className="skill-tech-badge">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8.85 16.83c0 .13.1.23.23.23h.05c1.48-.07 2.94-.37 4.31-.88.35-.13.52-.52.39-.87-.13-.35-.52-.52-.87-.39-1.18.44-2.43.7-3.7.76-.23.01-.41.16-.41.35v.8zm-1.07-2.61c.14.07.31.02.38-.12.59-1.25 1.57-2.28 2.79-2.95.33-.18.45-.6.27-.93-.18-.33-.6-.45-.93-.27-1.47.8-2.65 2.04-3.36 3.54-.08.16-.01.36.15.44l.7.29zm8.56 1.84c-1.85 1.05-4.04 1.55-6.21 1.44-.37-.02-.69.26-.71.63-.02.37.26.69.63.71 2.52.13 5.06-.46 7.21-1.68.32-.18.44-.59.26-.91-.18-.32-.59-.44-.91-.26l-.27.07zm-2.09-7.79c-.38.02-.67.35-.65.73.07 1.47-.36 2.93-1.22 4.14-.22.31-.15.74.16.96.31.22.74.15.96-.16 1.07-1.5 1.6-3.31 1.51-5.14-.02-.38-.35-.67-.73-.65l-.03.12zM5.5 19.5c3.8 1.2 8.2 1.2 12 0 .5-.16.8.38.3.54-4.2 1.3-9 1.3-13.2 0-.5-.16-.2-.7.3-.54h.6z"/>
            </svg>
          </span>
        ),
      },
      {
        name: 'Python',
        pct: 80,
        icon: (
          <span className="skill-tech-badge">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M11.91 2c-5.06 0-4.74 2.19-4.74 2.19l.01 2.27h4.82v.69H5.19S2 6.8 2 11.95c0 5.14 2.78 4.96 2.78 4.96h1.65v-2.32s-.09-2.78 2.73-2.78h4.7v-.71s.36-4.09-2.04-4.09h-.91V2zm-2.58 1.44c.46 0 .84.38.84.84 0 .47-.38.85-.84.85a.85.85 0 01-.85-.85c0-.46.38-.84.85-.84zm2.76 18.56c5.06 0 4.74-2.19 4.74-2.19l-.01-2.27H12.2v-.69h6.81s3.19.35 3.19-4.8c0-5.14-2.78-4.96-2.78-4.96h-1.65v2.32s.09 2.78-2.73 2.78h-4.7v.71s-.36 4.09 2.04 4.09h.91v4.81zm2.58-1.44c-.46 0-.84-.38-.84-.84 0-.47.38-.85.84-.85.47 0 .85.38.85.85 0 .46-.38.84-.85.84z"/>
            </svg>
          </span>
        ),
      },
      {
        name: 'SQL',
        pct: 80,
        icon: (
          <span className="skill-tech-badge">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm-6 4.87C7.64 10.59 9.68 11 12 11s4.36-.41 6-1.13V12c0 .5-2.13 2-6 2s-6-1.5-6-2V9.87zm0 5C7.64 15.59 9.68 16 12 16s4.36-.41 6-1.13V17c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.13z"/>
            </svg>
          </span>
        ),
      },
    ],
  },
  {
    category: 'Frontend & UI Systems',
    items: [
      { name: 'HTML', pct: 85, icon: <span className="skill-tech-badge tag-text">HTML</span> },
      { name: 'CSS', pct: 85, icon: <span className="skill-tech-badge tag-text">CSS</span> },
      { name: 'Tailwind CSS', pct: 80, icon: <span className="skill-tech-badge tag-text">TW</span> },
      { name: 'Bootstrap', pct: 80, icon: <span className="skill-tech-badge tag-text">BS</span> },
      { name: 'JavaScript', pct: 80, icon: <span className="skill-tech-badge tag-text">JS</span> },
      { name: 'React.js', pct: 55, icon: <span className="skill-tech-badge tag-text">⚛</span> },
    ],
  },
  {
    category: 'Backend & Intelligence',
    items: [
      { name: 'Node.js & Express', pct: 82, icon: <span className="skill-tech-badge tag-text">NODE</span> },
      { name: 'REST APIs & Webhooks', pct: 88, icon: <span className="skill-tech-badge tag-text">API</span> },
      { name: 'AI & LLM Integration', pct: 80, icon: <span className="skill-tech-badge tag-text">AI</span> },
      { name: 'Database Architecture', pct: 82, icon: <span className="skill-tech-badge tag-text">DB</span> },
      { name: 'Git & GitHub Workflows', pct: 90, icon: <span className="skill-tech-badge tag-text">GIT</span> },
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
  image?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Digital ID',
    category: 'Security & Verification · Identity Systems',
    desc: 'Digital identity system for secure and easy user verification. Helps manage identity details digitally with better privacy, authentication flow, and accessibility.',
    tags: ['Security', 'Full Stack', 'Verification', 'Privacy'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    metric: 'Secure Verification',
    image: '/projects/digital-id.png',
  },
  {
    title: 'ZENO AI',
    category: 'Artificial Intelligence · Full Stack Platform',
    desc: 'Built a full-stack AI platform featuring intelligent chat, OCR, browser extension support, and multiple AI providers. Designed a clean, user-centric interface focused on productivity, automation, and a seamless user experience.',
    tags: ['Next.js', 'Python', 'AI / OCR', 'Browser Extension'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    metric: 'Multi-AI Powered',
    image: '/projects/zeno.png',
  },
  {
    title: 'Tracklytics',
    category: 'Voice Interaction · Analytics & Productivity',
    desc: 'Voice interaction platform implementing voice-based expense and study tracking with word-word activation, continuous conversation, and hands-free dashboard control.',
    tags: ['Voice AI', 'React', 'Analytics', 'Dashboard'],
    githubUrl: 'https://github.com/hariprasad8760-debug',
    metric: 'Hands-Free Control',
    image: '/projects/tracklytics.png',
  },
];

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  badgeText: string;
  badgeType: 'elite' | 'verified' | 'project';
  desc: string;
  image?: string;
  period?: string;
  credentialInfo?: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: 'nptel-cloud',
    title: 'Cloud Computing',
    issuer: 'NPTEL — IIT Kharagpur (Funded by MoE, Govt. of India)',
    badgeText: '★ ELITE (60%)',
    badgeType: 'elite',
    desc: '12-week comprehensive program covering virtualization, cloud storage architectures, distributed systems, and modern infrastructure paradigms.',
    image: '/certificates/nptel-cloud-computing.jpg',
    period: 'Jul - Oct 2025',
    credentialInfo: 'Roll No: NPTEL25CS107S370400220 · IIT Kharagpur & Swayam',
  },
  {
    id: 'cgi-python',
    title: 'Python Programming',
    issuer: 'Bhumi (Supported by CGI)',
    badgeText: 'VERIFIED',
    badgeType: 'verified',
    desc: 'Industry-partnered Python curriculum covering logic design, algorithmic problem solving, and practical Python implementations.',
    image: '/certificates/cgi-bhumi-python.jpg',
    period: 'Oct 2023 - Mar 2024',
    credentialInfo: 'Certificate ID: BH245543 · Issued 24th May 2024',
  },
  {
    id: 'uniathena-python',
    title: 'Basics of Python',
    issuer: 'UniAthena (Cambridge International Qualifications, UK)',
    badgeText: 'VERIFIED',
    badgeType: 'verified',
    desc: 'Foundations of Python syntax, data structures, logic design, and algorithmic problem solving with blockchain verification.',
    image: '/certificates/uniathena-basics-of-python.jpg',
    period: 'January 2026',
    credentialInfo: 'Blockchain ID: 1B5F-2D3E-9A7F · CIQ UK & FEDE Europe',
  },
  {
    id: 'azhizen-movies-spot',
    title: 'Movies Spot (Project Completion)',
    issuer: 'Azhizen Solutions — Summer Internship Program',
    badgeText: 'GRADE A+',
    badgeType: 'project',
    desc: 'Full-featured web application project developed during internship tenure under mentorship, achieving Grade A+ standard of execution.',
    image: '/certificates/azhizen-movies-spot.jpg',
    period: 'Summer Internship 2025',
    credentialInfo: 'Grade: A+ · Head System Developer Mentorship',
  },
  {
    id: 'great-learning-sql',
    title: 'SQL Projects for Beginners',
    issuer: 'Great Learning Academy',
    badgeText: 'VERIFIED',
    badgeType: 'verified',
    desc: 'Relational database architecture, queries, aggregation functions, joins, and hands-on SQL project execution.',
    image: '/certificates/great-learning-sql.jpg',
    period: 'June 2024',
    credentialInfo: 'Verification Code: GAPHXJXQ · Great Learning Academy',
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
            <img
              src="/profile.jpg"
              alt="Hariprasad P"
              className="stage-avatar-img"
            />
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
        href="/Hariprasad_P_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="card-view-resume-btn"
        aria-label="View Hariprasad's Resume PDF"
        title="View Official Resume (PDF)"
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
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', role: '', description: '' });
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    navigator.clipboard.writeText('hariprasad8760@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const [formNotice, setFormNotice] = useState<string | null>(null);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSent(false);
    setFormError(null);
    setFormNotice(null);

    const senderName = formData.name.trim() || 'Visitor';
    const senderRole = formData.role.trim() || 'Role Opportunity';
    const senderDesc = formData.description.trim() || '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: senderName,
          role: senderRole,
          description: senderDesc,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormSent(true);
        setFormNotice('✅ Message sent successfully! Hariprasad will receive your details in his email.');
        setFormData({ name: '', role: '', description: '' });
        setTimeout(() => setFormSent(false), 8000);
      } else {
        setFormError(data.message || 'Unable to deliver message right now. Please try again.');
      }
    } catch {
      setFormError('Network error while sending. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
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
              href="/Hariprasad_P_Resume.pdf"
              download="Hariprasad_P_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume-pill"
              aria-label="Download Resume (PDF)"
              title="Download Hariprasad's Resume (PDF)"
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

                  <div className="about-quote-box">
                    <span className="about-quote-shine" />
                    <div className="about-quote-text">
                      &ldquo;I&apos;m looking for an opportunity to start my professional journey where I can give my full effort, take responsibility, and continuously learn from real-world challenges. I&apos;m eager to gain practical experience, improve my skills, and contribute meaningful value to the team while growing alongside the organization.&rdquo;
                    </div>
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
                          K.S.R College of Engineering, Namakkal
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-platinum)' }}>
                        B.Tech — Information Technology
                      </p>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        2023 — 2027
                      </span>
                    </div>
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
                      <span style={{ color: 'var(--wine-light)', fontWeight: 700 }}>CGPA: 7.54 / 10.0</span>
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
                          Sri Vidhya Mandir, Gurusamipalayam
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '7px 14px',
                          borderRadius: '8px',
                        }}
                      >
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-platinum)' }}>HSC (2022 — 2023)</span>
                        <span style={{ color: 'var(--wine-light)', fontWeight: 700 }}>77%</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '7px 14px',
                          borderRadius: '8px',
                        }}
                      >
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-platinum)' }}>SSLC (2020 — 2021)</span>
                        <span style={{ color: '#34d399', fontWeight: 700 }}>100%</span>
                      </div>
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

            {/* Skills Navigation Controls (< >) */}
            <div className="skills-nav-row">
              <button
                className="skills-nav-arrow-btn"
                onClick={() =>
                  setActiveTab((prev) => (prev === 0 ? SKILL_CATEGORIES.length - 1 : prev - 1))
                }
                aria-label="Previous skill category"
                title="Previous Category"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="skills-nav-indicator">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <span
                    key={cat.category}
                    className={`skills-nav-dot ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                    title={cat.category}
                  />
                ))}
              </div>

              <button
                className="skills-nav-arrow-btn"
                onClick={() =>
                  setActiveTab((prev) => (prev === SKILL_CATEGORIES.length - 1 ? 0 : prev + 1))
                }
                aria-label="Next skill category"
                title="Next Category"
              >
                <ChevronRight size={20} />
              </button>
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
                    {proj.image && (
                      <div className="project-img-banner-wrap">
                        <img
                          src={proj.image}
                          alt={`${proj.title} UI Preview`}
                          className="project-img-banner"
                        />
                      </div>
                    )}
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
                Internship / <em>Training</em>
              </h2>
            </ScrollReveal>

            <div className="timeline-stem-wrapper">
              <div className="timeline-stem-line" />

              {/* STACK QUEUE */}
              <div className="timeline-event-card glass-surface">
                <div className="timeline-stem-node" />
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#ffffff' }}>
                    STACK QUEUE <span style={{ color: 'var(--wine-light)' }}>— UI/UX Design</span>
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
                <div style={{ fontSize: '0.95rem', color: 'var(--text-platinum)', margin: '14px 0', lineHeight: 1.8 }}>
                  <p>
                    • Completed intensive hands-on training focusing on modern UI/UX design paradigms and design thinking.
                  </p>
                  <p>
                    • Sharpened core designing capabilities and creative problem-solving by building interactive screen flows.
                  </p>
                  <p>
                    • Crafted responsive prototypes, user-centric wireframes, and design systems focused on visual ergonomics.
                  </p>
                </div>
                <div className="project-tags-deck" style={{ margin: 0 }}>
                  <span className="tech-tag-chip">UI/UX Design</span>
                  <span className="tech-tag-chip">Creative Design</span>
                  <span className="tech-tag-chip">Wireframing</span>
                  <span className="tech-tag-chip">Figma</span>
                </div>
              </div>

              {/* AZHIZEN */}
              <div className="timeline-event-card glass-surface" style={{ marginTop: '28px' }}>
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
                <div style={{ fontSize: '0.95rem', color: 'var(--text-platinum)', margin: '14px 0', lineHeight: 1.8 }}>
                  <p>
                    • Completed specialized training in cutting-edge full-stack web engineering and intelligent software workflows.
                  </p>
                  <p>
                    • Developed and strengthened modern web development skills seamlessly integrated with AI tools and automation.
                  </p>
                  <p>
                    • Engineered dynamic, responsive frontend interfaces with optimized component architectures and API integrations.
                  </p>
                </div>
                <div className="project-tags-deck" style={{ margin: 0 }}>
                  <span className="tech-tag-chip">Web Development</span>
                  <span className="tech-tag-chip">AI Tools</span>
                  <span className="tech-tag-chip">React</span>
                  <span className="tech-tag-chip">Python</span>
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
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="cert-capsule"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedCert(cert)}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div className="edu-icon-badge">
                        <Award size={20} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.72rem',
                            color:
                              cert.badgeType === 'elite'
                                ? 'var(--wine-light)'
                                : cert.badgeType === 'project'
                                ? '#38bdf8'
                                : '#10b981',
                            background:
                              cert.badgeType === 'elite'
                                ? 'rgba(230,27,77,0.15)'
                                : cert.badgeType === 'project'
                                ? 'rgba(56,189,248,0.12)'
                                : 'rgba(16,185,129,0.1)',
                            border: `1px solid ${
                              cert.badgeType === 'elite'
                                ? 'var(--wine-border)'
                                : cert.badgeType === 'project'
                                ? 'rgba(56,189,248,0.3)'
                                : 'rgba(16,185,129,0.25)'
                            }`,
                            padding: '3px 10px',
                            borderRadius: '999px',
                            fontWeight: 600,
                          }}
                        >
                          {cert.badgeType === 'verified' && <BadgeCheck size={13} />}
                          {cert.badgeText}
                        </span>
                      </div>
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#ffffff' }}>
                      {cert.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--wine-light)', marginTop: '4px' }}>
                      {cert.issuer}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      {cert.desc}
                    </p>
                  </div>
                  {cert.period && (
                    <div
                      style={{
                        marginTop: '16px',
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{cert.period}</span>
                      <span
                        style={{
                          color: 'var(--wine-light)',
                          fontSize: '0.76rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontWeight: 500,
                        }}
                      >
                        Inspect <ArrowUpRight size={13} />
                      </span>
                    </div>
                  )}
                </div>
              ))}
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
                  <div className="contact-link-tile" style={{ display: 'flex', alignItems: 'center' }}>
                    <a
                      href="mailto:hariprasad8760@gmail.com"
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, textDecoration: 'none', color: 'inherit' }}
                      title="Click to compose email directly"
                    >
                      <div className="contact-tile-icon">
                        <Mail size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <small style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                          Email (Direct Compose)
                        </small>
                        <div style={{ fontWeight: 600 }}>hariprasad8760@gmail.com</div>
                      </div>
                    </a>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyEmail();
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? <Check size={18} color="#10b981" /> : <Copy size={18} color="var(--text-muted)" />}
                    </button>
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
                    <label>Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Recruiter / Hiring Manager / Client"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div className="form-field-unit">
                    <label>Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="What would you like to discuss with Hariprasad?"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="form-send-btn" disabled={formSubmitting}>
                    {formSubmitting ? (
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.4)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 0.7s linear infinite',
                          }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Email</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '10px', textAlign: 'center' }}>
                    ⚡ Sends directly to <span style={{ color: 'var(--wine-light)' }}>hariprasad8760@gmail.com</span>
                  </p>
                  {formSent && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(16,185,129,0.14)',
                        border: '1px solid rgba(16,185,129,0.35)',
                        color: '#34d399',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <BadgeCheck size={20} style={{ flexShrink: 0 }} />
                      <span>{formNotice || '✅ Message sent! Hariprasad will receive your details shortly.'}</span>
                    </div>
                  )}
                  {formError && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(239, 68, 68, 0.14)',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        color: '#f87171',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <X size={20} style={{ flexShrink: 0 }} />
                      <span>{formError}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>



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

      {/* =========================================================================
          CERTIFICATE PREVIEW LIGHTBOX MODAL
      ========================================================================= */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="cert-modal-content"
              initial={{ scale: 0.93, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 25 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="cert-modal-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="cert-modal-pill">CREDENTIAL VERIFICATION</span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color:
                          selectedCert.badgeType === 'elite'
                            ? 'var(--wine-light)'
                            : selectedCert.badgeType === 'project'
                            ? '#38bdf8'
                            : '#10b981',
                      }}
                    >
                      {selectedCert.badgeText}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#ffffff', margin: 0 }}>
                    {selectedCert.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', margin: '3px 0 0' }}>
                    {selectedCert.issuer} {selectedCert.period ? `· ${selectedCert.period}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="cert-modal-close-btn"
                  title="Close preview (Esc)"
                  aria-label="Close certificate preview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="cert-modal-body">
                {selectedCert.image ? (
                  <div className="cert-modal-img-wrap">
                    <img
                      src={selectedCert.image}
                      alt={`${selectedCert.title} Certificate`}
                      className="cert-modal-img"
                    />
                  </div>
                ) : (
                  <div className="cert-modal-placeholder">
                    <div className="cert-pending-icon">
                      <Award size={34} color="var(--wine-light)" />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#ffffff', marginTop: '16px' }}>
                      SQL Certificate Arriving Soon
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '440px', textAlign: 'center', marginTop: '8px', lineHeight: '1.6' }}>
                      Hariprasad is preparing and verifying this credential document. It will be uploaded and accessible here shortly.
                    </p>
                    <span className="cert-pending-badge">UPDATE IN PROGRESS</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="cert-modal-footer">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {selectedCert.credentialInfo || 'Verified Document'}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedCert.image && (
                    <a
                      href={selectedCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-modal-action-btn primary"
                      title="Open full size certificate image in new tab"
                    >
                      <ExternalLink size={14} />
                      <span>Open Full Size</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="cert-modal-action-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
