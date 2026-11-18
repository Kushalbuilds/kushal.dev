import React, { useState, useEffect } from 'react';
import HeroScene from './components/HeroScene';
import TestingLab3D from './components/TestingLab3D';
import { portfolioData } from './portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  GraduationCap,
  Award,
  Terminal,
  Sparkles,
  Download,
  Copy,
  Check,
  Briefcase,
  Database,
  Palette
} from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('blue'); // 'blue', 'red', 'yellow'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="portfolio-app">
      {/* Background ambient light */}
      <div className="ambient-glow" />

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">
          <span>Kushal</span>
          <span className="brand-badge">SWE • JAVA • C++ • PYTHON</span>
        </div>
        
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#lab">Interactive Lab</a></li>
          <li><a href="#education">Education</a></li>
        </ul>

        <div className="nav-actions">
          {/* Theme Switcher Options */}
          <div className="theme-switcher">
            <button
              className={`theme-btn ${theme === 'blue' ? 'active' : ''}`}
              onClick={() => setTheme('blue')}
              title="Blue Neon Theme"
            >
              <span className="theme-dot blue" />
              <span>Blue</span>
            </button>
            <button
              className={`theme-btn ${theme === 'red' ? 'active' : ''}`}
              onClick={() => setTheme('red')}
              title="Ruby Red Theme"
            >
              <span className="theme-dot red" />
              <span>Red</span>
            </button>
            <button
              className={`theme-btn ${theme === 'yellow' ? 'active' : ''}`}
              onClick={() => setTheme('yellow')}
              title="Cyber Gold Theme"
            >
              <span className="theme-dot yellow" />
              <span>Yellow</span>
            </button>
          </div>

          <a href="#contact" className="btn btn-primary" style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}>
            Let's Connect
          </a>
        </div>
      </nav>

      {/* Hero Section with 3D Canvas & Profile Avatar */}
      <header className="hero-section" id="about">
        <HeroScene currentTheme={theme} />
        <div className="hero-content">
          {/* Status pill emphasizing SWE Roles */}
          <div className="status-badge">
            <span className="status-badge-dot"></span>
            Actively Seeking Software Engineer (SWE) Roles
          </div>

          {/* 3D Software Engineer Workspace Scene */}

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{portfolioData.name}</span>
          </h1>

          <div className="role-tagline-badge">
            <Briefcase size={16} />
            <span>Aspiring Software Engineer & Systems Developer</span>
          </div>

          <p className="hero-subtitle">
            {portfolioData.tagline}. {portfolioData.about}
          </p>

          <div className="contact-quick">
            <div className="contact-item">
              <MapPin size={16} color="var(--accent-cyan)" />
              <span>{portfolioData.location}</span>
            </div>
            <div className="contact-item">
              <Phone size={16} color="var(--accent-cyan)" />
              <span>{portfolioData.phone}</span>
            </div>
            <div className="contact-item">
              <Mail size={16} color="var(--accent-cyan)" />
              <span>{portfolioData.email}</span>
            </div>
          </div>

          <div className="hero-cta-group">
            <a href="#contact" className="btn btn-primary">
              <Briefcase size={18} />
              Hire for SWE Role
            </a>
            <a href="#projects" className="btn btn-secondary">
              <Sparkles size={18} />
              View 3D Projects
            </a>
            <button className="btn btn-ghost" onClick={copyEmail}>
              {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
              {copied ? 'Email Copied!' : 'Copy Email'}
            </button>
          </div>

          <div className="metrics-grid">
            {portfolioData.stats.map((stat, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-val">{stat.value}</div>
                <div className="metric-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Experience Section */}
      <section className="section" id="experience">
        <div className="section-header">
          <span className="section-tag">Career & Industry</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-desc">
            Hands-on software quality engineering, defect lifecycle management, and high-reliability embedded firmware development.
          </p>
        </div>

        <div className="timeline">
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="timeline-card">
              <div className="timeline-dot" />
              <div className="exp-header">
                <h3 className="exp-title">{exp.title}</h3>
                <span className="exp-period">{exp.period}</span>
              </div>
              <div className="exp-company">
                {exp.company} — <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{exp.location}</span>
              </div>
              <ul className="exp-list">
                {exp.highlights.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
              <div className="tag-list">
                {exp.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Interactive Projects Section */}
      <section className="section" id="projects">
        <div className="section-header">
          <span className="section-tag">Interactive Portfolio</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-desc">
            Explore a selection of software projects showcasing my skills in Java, Python, C++, and full‑stack development.
          </p>
        </div>

        <div className="projects-grid">
          {portfolioData.projects.map((proj) => (
            <div key={proj.id} className="project-card">
              <div className="project-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="project-cat">{proj.category}</span>
                  {proj.metrics && (
                    <span className="tag-pill" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {proj.metrics}
                    </span>
                  )}
                </div>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.description}</p>
                <div className="project-footer">
                  <div className="tag-list">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Testing & Firmware Terminal */}
      <section className="section" id="lab">
        <div className="section-header">
          <span className="section-tag">Interactive Terminal</span>
          <h2 className="section-title">Live Verification & Diagnostic Workbench</h2>
          <p className="section-desc">
            Execute automated checks across REST APIs, backend regression scenarios, and hardware bus communications.
          </p>
        </div>

        <TestingLab3D />
      </section>

      {/* Technical Skills Section */}
      <section className="section" id="skills">
        <div className="section-header">
          <span className="section-tag">Core Competencies</span>
          <h2 className="section-title">Technical Skillset for SWE Roles</h2>
          <p className="section-desc">
            Extensive knowledge in object-oriented programming, relational databases, web frameworks, and quality assurance.
          </p>
        </div>

        <div className="skills-container">
          {Object.entries(portfolioData.skills).map(([category, items], idx) => (
            <div key={idx} className="skill-category-card">
              <h3 className="skill-cat-title">
                {idx === 0 && <Code2 size={20} />}
                {idx === 1 && <Database size={20} />}
                {idx === 2 && <Layers size={20} />}
                {idx === 3 && <Cpu size={20} />}
                {idx === 4 && <Award size={20} />}
                {category}
              </h3>
              <div className="skill-bars">
                {items.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-bar-item">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-progress-bg">
                      <div
                        className="skill-progress-fill"
                        style={{
                          width: `${skill.level}%`,
                          background: skill.color ? `linear-gradient(90deg, ${skill.color}, var(--accent-cyan))` : undefined
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="section" id="education">
        <div className="section-header">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Education & Milestones</h2>
          <p className="section-desc">
            Bachelor of Engineering in Electronics and Communication from KLE Technological University.
          </p>
        </div>

        <div className="edu-grid">
          {portfolioData.education.map((edu, idx) => (
            <div key={idx} className="edu-card">
              <div className="edu-score-badge">{edu.score}</div>
              <h3 className="edu-degree">{edu.degree}</h3>
              <div className="edu-inst">{edu.institution}</div>
              <div className="edu-period">{edu.period}</div>
              <p className="edu-desc">{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <div className="contact-box">
          <span className="section-tag">Open for Opportunities</span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            Looking for a Dedicated Software Engineer?
          </h2>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            I am available and ready to join innovative engineering teams as a <strong>Software Engineer / Developer</strong>. Let's discuss how my strong foundation in Java, C++, Python, databases, and testing can bring value to your projects.
          </p>

          <div className="contact-action-list">
            <a href={`mailto:${portfolioData.email}`} className="btn btn-primary">
              <Mail size={18} />
              Email Kushal ({portfolioData.email})
            </a>
            <a href={`tel:${portfolioData.phone.replace(/[^0-9+]/g, '')}`} className="btn btn-secondary">
              <Phone size={18} />
              Call ({portfolioData.phone})
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Kushal • Built with React, Vite & Three.js.</p>
      </footer>
    </div>
  );
}
