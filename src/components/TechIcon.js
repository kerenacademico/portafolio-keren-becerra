"use client";

export default function TechIcon({ name }) {
  const key = (name || "").toLowerCase().trim();

  if (key === "python") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <path
          fill="#38bdf8"
          d="M11.9 2C7.4 2 7.7 4 7.7 4v2h4.3v.6H6s-2.9-.3-2.9 4.2c0 4.5 2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.5-2.5h4.3s2.4 0 2.4-2.3V4.3S17 2 11.9 2zm-2.4 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"
        />
        <path
          fill="#facc15"
          d="M12.1 22c4.5 0 4.2-2 4.2-2v-2h-4.3v-.6H18s2.9.3 2.9-4.2c0-4.5-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.5 2.5H9.1s-2.4 0-2.4 2.3v3.8S7 22 12.1 22zm2.4-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"
        />
      </svg>
    );
  }

  if (key === "django") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#0f766e" />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10"
          fontWeight="800"
          fontFamily="monospace"
        >
          dj
        </text>
      </svg>
    );
  }

  if (key === "next.js") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#0b1220" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M8.5 16V8l8.2 10.5" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M15.5 8v8" stroke="#38e1ff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "react") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill="#38e1ff" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" fill="none" stroke="#38e1ff" strokeWidth="1.4" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.8"
          fill="none"
          stroke="#38e1ff"
          strokeWidth="1.4"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.8"
          fill="none"
          stroke="#38e1ff"
          strokeWidth="1.4"
          transform="rotate(120 12 12)"
        />
      </svg>
    );
  }

  if (key === "node.js") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <polygon points="12,2.5 20.5,7.4 20.5,16.6 12,21.5 3.5,16.6 3.5,7.4" fill="#166534" stroke="#4ade80" strokeWidth="1.3" />
        <text x="12" y="14.8" textAnchor="middle" fill="#bbf7d0" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">
          JS
        </text>
      </svg>
    );
  }

  if (key === "nestjs") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#4c0519" stroke="#fb7185" strokeWidth="1.4" />
        <path d="M8.5 15.5V8.5l7 7V8.5" stroke="#fda4af" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (key === "postgresql") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.4" />
        <text x="12" y="14.8" textAnchor="middle" fill="#dbeafe" fontSize="8" fontWeight="800" fontFamily="sans-serif">
          PG
        </text>
      </svg>
    );
  }

  if (key === "mysql") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.4" />
        <text x="12" y="14.6" textAnchor="middle" fill="#e0f2fe" fontSize="7.2" fontWeight="800" fontFamily="sans-serif">
          SQL
        </text>
      </svg>
    );
  }

  if (key === "typescript") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="#1d4ed8" />
        <text x="12" y="15.2" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">
          TS
        </text>
      </svg>
    );
  }

  if (key === "javascript") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="#eab308" />
        <text x="12" y="15.2" textAnchor="middle" fill="#090d16" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">
          JS
        </text>
      </svg>
    );
  }

  if (key === "html5") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <path d="M4.5 3.5h15l-1.4 15.2L12 20.5l-6.1-1.8L4.5 3.5z" fill="#ea580c" />
        <path d="M8.5 8.2h7l-.3 2.5h-4.3l.2 2.2h4l-.4 4.1-2.6.8-2.6-.8-.2-2h2.2l.1.7.7.2.7-.2.2-1.8H8.9l-.4-3.6z" fill="#fff7ed" />
      </svg>
    );
  }

  if (key === "css3") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <path d="M4.5 3.5h15l-1.4 15.2L12 20.5l-6.1-1.8L4.5 3.5z" fill="#2563eb" />
        <path d="M8.4 8.2h7.2l-.3 2.4h-4.5l.2 2.1h4.1l-.4 4.2-2.6.8-2.6-.8-.2-2h2.2l.1.7.7.2.7-.2.2-1.9H8.7l-.4-3.6z" fill="#eff6ff" />
      </svg>
    );
  }

  if (key === "gsap") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#14532d" stroke="#86efac" strokeWidth="1.4" />
        <text x="12" y="14.5" textAnchor="middle" fill="#dcfce7" fontSize="6.8" fontWeight="800" fontFamily="sans-serif">
          GSAP
        </text>
      </svg>
    );
  }

  if (key === "git" || key === "github") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#111827" stroke="#9ca3af" strokeWidth="1.4" />
        <circle cx="9" cy="10" r="1.5" fill="#38bdf8" />
        <circle cx="15" cy="10" r="1.5" fill="#38bdf8" />
        <circle cx="12" cy="15.5" r="1.5" fill="#38bdf8" />
        <path d="M9 10v5.5M15 10l-3 5.5" stroke="#e5e7eb" strokeWidth="1.4" />
      </svg>
    );
  }

  if (key === "vercel") {
    return (
      <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
        <polygon points="12,4.5 20.5,18.5 3.5,18.5" fill="#f8fafc" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="tech-svg" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="3.5" fill="#0f172a" stroke="#38e1ff" strokeWidth="1.4" />
      <path d="M7.5 9.5l3 2.5-3 2.5M12 14.5h4.5" stroke="#38e1ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}