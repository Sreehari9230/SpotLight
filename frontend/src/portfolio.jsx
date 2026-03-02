// Developer Portfolio — React + Zustand + DaisyUI + Tailwind
// Aesthetic: Editorial monochrome with a single electric accent
// Font: Syne (display) + DM Mono (code/body)

import { useState, useEffect, useRef } from "react";
import { create } from "https://esm.sh/zustand@4.5.2";

// ─── Google Fonts ─────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --accent: #00FF88;
      --accent-dim: #00FF8822;
      --bg: #0A0A0A;
      --surface: #111111;
      --border: #1E1E1E;
      --text: #EFEFEF;
      --muted: #666666;
      --font-display: 'Syne', sans-serif;
      --font-mono: 'DM Mono', monospace;
    }

    body { background: var(--bg); color: var(--text); font-family: var(--font-mono); }

    html { scroll-behavior: smooth; }

    ::selection { background: var(--accent); color: #000; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 #00FF8840; }
      50%       { box-shadow: 0 0 0 12px #00FF8808; }
    }
    @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

    .fade-up   { animation: fadeUp  0.6s ease forwards; }
    .slide-in  { animation: slideIn 0.5s ease forwards; }

    .card-hover {
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      border-color: var(--accent) !important;
      box-shadow: 0 12px 40px #00FF8815;
    }

    .accent-link {
      color: var(--accent);
      text-decoration: none;
      position: relative;
    }
    .accent-link::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; right: 0;
      height: 1px;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s ease;
    }
    .accent-link:hover::after { transform: scaleX(1); }

    .nav-pill {
      padding: 6px 16px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 13px;
      letter-spacing: 0.05em;
      color: var(--muted);
      transition: color 0.2s, background 0.2s;
      cursor: pointer;
      border: none;
      background: transparent;
    }
    .nav-pill:hover, .nav-pill.active {
      color: var(--accent);
      background: var(--accent-dim);
    }

    .resume-btn {
      font-family: var(--font-mono);
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 10px 24px;
      border: 1px solid var(--accent);
      background: transparent;
      color: var(--accent);
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      animation: pulse-glow 3s infinite;
    }
    .resume-btn:hover {
      background: var(--accent);
      color: #000;
      box-shadow: 0 0 24px #00FF8840;
    }

    .skill-tag {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.06em;
      padding: 4px 10px;
      border: 1px solid var(--border);
      border-radius: 3px;
      color: var(--muted);
      background: var(--surface);
      transition: border-color 0.2s, color 0.2s;
    }
    .skill-tag:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .modal-overlay {
      position: fixed; inset: 0;
      background: #000000CC;
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      z-index: 999;
      animation: fadeUp 0.2s ease;
    }
    .modal-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 36px;
      max-width: 400px;
      width: 90%;
    }

    .cursor { animation: blink 1.1s step-end infinite; }

    .section-label {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .project-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      filter: grayscale(40%);
      transition: filter 0.3s ease, transform 0.3s ease;
    }
    .card-hover:hover .project-img {
      filter: grayscale(0%);
      transform: scale(1.02);
    }

    .divider-line {
      height: 1px;
      background: linear-gradient(90deg, var(--accent) 0%, transparent 100%);
      border: none;
      margin: 0;
    }

    .stat-num {
      font-family: var(--font-display);
      font-size: 36px;
      font-weight: 800;
      color: var(--accent);
      line-height: 1;
    }
  `}</style>
);

// ─── Zustand Store ─────────────────────────────────────────────────────────────
const useStore = create((set) => ({
  activeSection: "about",
  showResumeModal: false,
  setActiveSection: (s) => set({ activeSection: s }),
  openResumeModal: () => set({ showResumeModal: true }),
  closeResumeModal: () => set({ showResumeModal: false }),
}));

// ─── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "NeuralDash",
    description: "Real-time ML model monitoring dashboard with live metrics, drift detection, and alerting pipelines.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    tags: ["React", "Python", "WebSocket", "Postgres"],
    live: "https://example.com",
    year: "2024",
  },
  {
    id: 2,
    title: "Codex API",
    description: "High-throughput REST & GraphQL API serving 50M+ requests/month with sub-5ms p99 latency.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    tags: ["Node.js", "GraphQL", "Redis", "Docker"],
    live: "https://example.com",
    year: "2023",
  },
  {
    id: 3,
    title: "SnapForge",
    description: "Image processing SaaS — batch resize, compress, convert, and CDN-deliver assets at scale.",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80",
    tags: ["Next.js", "Sharp", "AWS S3", "Stripe"],
    live: "https://example.com",
    year: "2023",
  },
  {
    id: 4,
    title: "ChainTrace",
    description: "On-chain analytics tool for tracing token flows, wallet clusters, and DeFi interaction graphs.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80",
    tags: ["TypeScript", "D3.js", "Ethers.js", "Supabase"],
    live: "https://example.com",
    year: "2024",
  },
];

const SKILLS = [
  "TypeScript", "React", "Next.js", "Node.js",
  "Python", "PostgreSQL", "Redis", "Docker",
  "AWS", "GraphQL", "Rust", "Go",
];

const NAV = ["about", "projects", "skills", "contact"];

// ─── Components ────────────────────────────────────────────────────────────────

function ResumeModal() {
  const { closeResumeModal } = useStore();

  const handleDownload = () => {
    // In production, replace with actual resume URL
    const link = document.createElement("a");
    link.href = "https://example.com/resume.pdf";
    link.download = "resume.pdf";
    link.target = "_blank";
    link.click();
    closeResumeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeResumeModal}>
      <div className="modal-box fade-up" onClick={(e) => e.stopPropagation()}>
        <p className="section-label" style={{ marginBottom: 16 }}>Confirm Download</p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Download Resume?
        </h3>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
          You're about to download a PDF copy of my resume. It includes my full work history, skills, and education.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="resume-btn"
            style={{ flex: 1 }}
            onClick={handleDownload}
          >
            ↓ Download
          </button>
          <button
            onClick={closeResumeModal}
            style={{
              flex: 1,
              padding: "10px 24px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "var(--muted)"; e.target.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { activeSection, setActiveSection, openResumeModal } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
      padding: "0 clamp(20px, 5vw, 80px)",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
          <span style={{ color: "var(--accent)" }}>{"<"}</span>
          Alex.dev
          <span style={{ color: "var(--accent)" }}>{"/>"}</span>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 4 }}>
          {NAV.map((s) => (
            <button
              key={s}
              className={`nav-pill ${activeSection === s ? "active" : ""}`}
              onClick={() => scrollTo(s)}
            >
              {s}
            </button>
          ))}
        </nav>

        {/* Resume */}
        <button className="resume-btn" onClick={openResumeModal}>
          Resume ↓
        </button>
      </div>
    </header>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const phrases = ["Full-Stack Engineer", "Open Source Contributor", "Systems Thinker", "Problem Solver"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true;
          clearInterval(interval);
          setTimeout(() => {
            const id2 = setInterval(() => {
              charIdx.current--;
              setTyped(current.slice(0, charIdx.current));
              if (charIdx.current === 0) {
                deleting.current = false;
                phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
                clearInterval(id2);
              }
            }, 40);
          }, 1800);
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "80px clamp(20px, 5vw, 80px) 60px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Grid: Text + Profile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 60,
          alignItems: "center",
        }}>
          {/* Left */}
          <div>
            <p className="section-label fade-up" style={{ marginBottom: 16 }}>
              Available for hire · 2026
            </p>
            <h1 className="fade-up" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 7vw, 80px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              animationDelay: "0.1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}>
              Alex<br />
              <span style={{ color: "var(--accent)" }}>Rivera</span>
            </h1>

            <div className="fade-up" style={{
              marginTop: 20,
              height: 32,
              animationDelay: "0.2s",
              opacity: 0,
              animationFillMode: "forwards",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--muted)" }}>
                {typed}<span className="cursor" style={{ color: "var(--accent)" }}>|</span>
              </span>
            </div>

            <p className="fade-up" style={{
              marginTop: 24,
              maxWidth: 480,
              color: "var(--muted)",
              fontSize: 15,
              lineHeight: 1.7,
              animationDelay: "0.3s",
              opacity: 0,
              animationFillMode: "forwards",
            }}>
              I build fast, resilient systems and clean user interfaces. 7 years of production experience
              across fintech, devtools, and consumer apps. I care about code quality, developer experience,
              and shipping things that last.
            </p>

            {/* Stats */}
            <div className="fade-up" style={{
              display: "flex",
              gap: 40,
              marginTop: 40,
              animationDelay: "0.4s",
              opacity: 0,
              animationFillMode: "forwards",
            }}>
              {[["7+", "Years exp."], ["40+", "Projects"], ["12", "OSS repos"], ["3", "Startups"]].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-num">{n}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.06em", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="fade-up" style={{
              display: "flex",
              gap: 20,
              marginTop: 36,
              animationDelay: "0.5s",
              opacity: 0,
              animationFillMode: "forwards",
            }}>
              {[
                ["GitHub", "https://github.com"],
                ["LinkedIn", "https://linkedin.com"],
                ["Twitter", "https://twitter.com"],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener" className="accent-link"
                  style={{ fontSize: 13, letterSpacing: "0.04em" }}>
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Profile picture */}
          <div className="fade-up" style={{
            animationDelay: "0.3s",
            opacity: 0,
            animationFillMode: "forwards",
          }}>
            <div style={{
              width: 260,
              height: 320,
              position: "relative",
            }}>
              {/* Decorative frame */}
              <div style={{
                position: "absolute",
                inset: -8,
                border: "1px solid var(--accent)",
                borderRadius: 8,
                opacity: 0.3,
              }} />
              <div style={{
                position: "absolute",
                inset: -16,
                border: "1px solid var(--border)",
                borderRadius: 12,
              }} />
              {/* Photo */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                alt="Alex Rivera"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 4,
                  filter: "grayscale(20%)",
                  display: "block",
                }}
              />
              {/* Status badge */}
              <div style={{
                position: "absolute",
                bottom: -16,
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 6px var(--accent)",
                  animation: "pulse-glow 2s infinite",
                  flexShrink: 0,
                }} />
                Open to work
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{
      padding: "100px clamp(20px, 5vw, 80px)",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <p className="section-label">Selected Work</p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginTop: 10,
          }}>
            Projects
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))",
          gap: 24,
        }}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="card-hover"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                overflow: "hidden",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Image */}
              <div style={{ overflow: "hidden", background: "#111" }}>
                <img
                  className="project-img"
                  src={p.image}
                  alt={p.title}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "24px 24px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}>
                    {p.title}
                  </h3>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: "0.06em",
                  }}>
                    {p.year}
                  </span>
                </div>

                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 18 }}>
                  {p.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tags.map(t => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>

                <hr className="divider-line" style={{ marginBottom: 20 }} />

                {/* Link */}
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener"
                  className="accent-link"
                  style={{ fontSize: 13, letterSpacing: "0.04em" }}
                >
                  View Live ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{ padding: "100px clamp(20px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label">Technical Toolkit</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginTop: 10,
          marginBottom: 48,
        }}>
          Skills
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {[
            { cat: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "D3.js"] },
            { cat: "Backend", items: ["Node.js", "Go", "Python", "GraphQL", "REST APIs"] },
            { cat: "Infrastructure", items: ["PostgreSQL", "Redis", "Docker", "AWS", "Kubernetes"] },
            { cat: "Tooling", items: ["Git", "CI/CD", "Jest", "Playwright", "OpenTelemetry"] },
          ].map(({ cat, items }) => (
            <div key={cat} style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: 28,
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <p className="section-label" style={{ marginBottom: 16 }}>{cat}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { openResumeModal } = useStore();

  return (
    <section id="contact" style={{
      padding: "100px clamp(20px, 5vw, 80px)",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p className="section-label">Let's Build Together</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 5vw, 60px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          marginTop: 12,
          marginBottom: 20,
        }}>
          Get in touch
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 40px" }}>
          I'm always open to discussing new projects, interesting ideas, or opportunities to be part of something meaningful.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:alex@example.com"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              letterSpacing: "0.06em",
              padding: "12px 32px",
              background: "var(--accent)",
              color: "#000",
              borderRadius: 4,
              textDecoration: "none",
              fontWeight: 500,
              transition: "box-shadow 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={e => { e.target.style.boxShadow = "0 0 32px #00FF8850"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.boxShadow = "none"; e.target.style.transform = "none"; }}
          >
            Email Me
          </a>
          <button className="resume-btn" onClick={openResumeModal}>
            Resume ↓
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "24px clamp(20px, 5vw, 80px)",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>
          <span style={{ color: "var(--accent)" }}>{"<"}</span>
          Alex.dev
          <span style={{ color: "var(--accent)" }}>{"/>"}</span>
        </div>

        <p style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          © 2026 Alex Rivera · Built with React + TypeScript · Designed with care
        </p>

        <div style={{ display: "flex", gap: 20 }}>
          {["GitHub", "LinkedIn", "Twitter"].map((s) => (
            <a key={s} href="#" className="accent-link" style={{ fontSize: 12 }}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const { showResumeModal } = useStore();

  // Intersection observer for active section
  const { setActiveSection } = useStore();
  useEffect(() => {
    const sections = NAV.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <FontLoader />
      {showResumeModal && <ResumeModal />}
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <Header />
        <main>
          <HeroSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}