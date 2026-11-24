"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import HeroBadge from "@/components/HeroBadge";
import AboutBento from "@/components/AboutBento";
import ProjectsRail from "@/components/ProjectsRail";
import { PROFILE } from "@/data/portfolio";

const CONTACT_TOPICS = [
  {
    id: "proyecto",
    label: "Proyecto web",
    placeholder:
      "Cuéntame sobre la idea, plazos o lo que necesitas construir...",
  },
  {
    id: "colaboracion",
    label: "Colaboración",
    placeholder:
      "Cuéntame cómo te gustaría colaborar o qué proyecto tienes en mente...",
  },
  {
    id: "oportunidad",
    label: "Oportunidad",
    placeholder:
      "Cuéntame sobre el equipo, vacante de prácticas o propuesta de desarrollo...",
  },
];

const HUD_SECTIONS = [
  { id: "top", code: "00", label: "Inicio" },
  { id: "about", code: "01", label: "Sobre mí" },
  { id: "trabajo", code: "02", label: "Trabajo" },
  { id: "contacto", code: "03", label: "Contacto" },
];

export default function Home() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [topicId, setTopicId] = useState("proyecto");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [activeHud, setActiveHud] = useState("top");
  const [scrollPct, setScrollPct] = useState(0);

  const activeTopic =
    CONTACT_TOPICS.find((t) => t.id === topicId) || CONTACT_TOPICS[0];

  const jumpToSection = (id) => {
    if (id === "top") {
      if (window.__l) {
        window.__l.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    if (window.__l) {
      window.__l.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.type === "loading") return;

    setStatus({ type: "loading", text: "Enviando mensaje..." });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          topic: activeTopic.label,
          message: messageText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          text: data.error || "No se pudo enviar. Intenta de nuevo.",
        });
        return;
      }

      setStatus({
        type: "success",
        text: "¡Mensaje enviado! Te responderé en menos de 24h ✓",
      });
      setSenderName("");
      setSenderEmail("");
      setMessageText("");
    } catch {
      setStatus({
        type: "error",
        text: "Error de conexión. También puedes copiar mi correo arriba.",
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let onBgMove = null;
    let onScrollHud = null;
    let onCursorHaloMove = null;
    let onCursorOver = null;
    let onCursorOut = null;

    const ctx = gsap.context(() => {
      const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;

      // Scroll suave Lenis
      if (!RM) {
        const l = new Lenis({ lerp: 0.09 });
        window.__l = l;
        l.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => l.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.addEventListener("click", (e) => {
          const h = a.getAttribute("href");
          if (h.length < 2 || !window.__l) return;
          const t = document.querySelector(h);
          if (t) {
            e.preventDefault();
            window.__l.scrollTo(t);
          }
        })
      );

      // Separar letras de titulares
      function split(el) {
        [...el.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const f = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((w) => {
              if (!w.trim()) {
                f.append(w);
                return;
              }
              const s = document.createElement("span");
              s.className = "w";
              [...w].forEach((c) => {
                const i = document.createElement("span");
                i.className = "ch";
                i.textContent = c;
                s.append(i);
              });
              f.append(s);
            });
            n.replaceWith(f);
          } else if (n.nodeType === 1) split(n);
        });
      }
      document.querySelectorAll("h1,#about h2,.ct h2").forEach(split);

      // Preloader + animación de entrada refinada
      const o = { v: 0 };
      const pn = document.getElementById("pn");
      const pl2 = document.getElementById("pl2");
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .to(o, {
          v: 100,
          duration: 0.85,
          ease: "power2.inOut",
          onUpdate: () => {
            if (pn) pn.textContent = Math.round(o.v);
          },
        })
        .call(() => {
          if (pl2) {
            pl2.textContent = "Acceso concedido ✓";
            pl2.style.color = "#38e1ff";
          }
        })
        .to({}, { duration: 0.28 })
        .to("#pre", {
          opacity: 0,
          scale: 1.04,
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: () => {
            const preEl = document.getElementById("pre");
            if (preEl) preEl.style.display = "none";
          },
        })
        .from(".eyebrow", { y: 20, opacity: 0, duration: 0.6 }, "-=.35")
        .from(
          "h1 .ch",
          { yPercent: 115, rotate: 5, duration: 0.9, stagger: 0.022 },
          "-=.45"
        )
        .from(
          ".lead,.hero-actions,.socials",
          { y: 22, opacity: 0, stagger: 0.1, duration: 0.7 },
          "-=.55"
        )
        .from("#lz", { opacity: 0, duration: 0.8 }, "-=.85");

      if (RM) intro.progress(1);

      // Barra de progreso superior
      gsap.to(".prog", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.3, start: 0, end: "max" },
      });

      // Revelados generales seguros
      gsap.utils.toArray("[data-rv]").forEach((el) =>
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            clearProps: "transform,opacity",
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        )
      );

      // Iluminación progresiva de lectura en Sobre mí
      gsap.fromTo(
        "#about .ch",
        { opacity: 0.34 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: "#about h2",
            start: "top 85%",
            end: "bottom 52%",
            scrub: true,
          },
        }
      );

      // Carril horizontal refinado de proyectos
      const mm = gsap.matchMedia();
      mm.add("(min-width:861px)", () => {
        const rail = document.querySelector(".rail");
        if (!rail) return;
        const d = () =>
          Math.max(
            0,
            rail.scrollWidth - window.innerWidth + window.innerWidth * 0.07
          );
        gsap.to(rail, {
          x: () => -d(),
          ease: "none",
          scrollTrigger: {
            trigger: ".hs",
            start: "top top",
            end: () => "+=" + d(),
            pin: true,
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (s) => gsap.set(".pl i", { scaleX: s.progress }),
          },
        });
      });

      gsap.fromTo(
        ".rail .pc",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          clearProps: "transform,opacity",
          ease: "power3.out",
          scrollTrigger: { trigger: ".hs", start: "top 85%", once: true },
        }
      );

      // Linterna de borde en Bento
      document.querySelectorAll(".bx").forEach((e) =>
        e.addEventListener("pointermove", (v) => {
          const r = e.getBoundingClientRect();
          e.style.setProperty("--mx", v.clientX - r.left + "px");
          e.style.setProperty("--my", v.clientY - r.top + "px");
        })
      );

      // Contadores y barra de progreso en Bento
      document.querySelectorAll(".b4 b").forEach((b) => {
        const T = +b.dataset.n;
        const val = { v: 0 };
        gsap.to(val, {
          v: T,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".bento", start: "top 88%", once: true },
          onUpdate: () => (b.textContent = Math.round(val.v)),
        });
      });

      gsap.to(".pg i", {
        scaleX: 0.72,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bento", start: "top 88%", once: true },
      });

      gsap.fromTo(
        ".bx",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.75,
          clearProps: "transform,opacity",
          ease: "power3.out",
          scrollTrigger: { trigger: ".bento", start: "top 88%", once: true },
        }
      );

      // Contacto y botones magnéticos
      gsap.from(".ct h2 .ch", {
        yPercent: 115,
        stagger: 0.02,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ct h2", start: "top 85%" },
      });

      document.querySelectorAll(".go").forEach((b) => {
        const qx = gsap.quickTo(b, "x", { duration: 0.35, ease: "power3" });
        const qy = gsap.quickTo(b, "y", { duration: 0.35, ease: "power3" });
        b.addEventListener("mousemove", (e) => {
          const r = b.getBoundingClientRect();
          qx((e.clientX - r.left - r.width / 2) * 0.28);
          qy((e.clientY - r.top - r.height / 2) * 0.28);
        });
        b.addEventListener("mouseleave", () => {
          qx(0);
          qy(0);
        });
      });

      // Halo de seguimiento con inercia en escritorio
      const halo = document.getElementById("pro-halo");
      if (halo && matchMedia("(hover:hover)").matches && !RM) {
        const hx = gsap.quickTo(halo, "x", { duration: 0.42, ease: "power3.out" });
        const hy = gsap.quickTo(halo, "y", { duration: 0.42, ease: "power3.out" });

        onCursorHaloMove = (e) => {
          halo.style.opacity = "1";
          hx(e.clientX);
          hy(e.clientY);
        };

        const interactiveSelector =
          "a, button, .tech-tile, .wow-pc, .ct-card";

        onCursorOver = (e) => {
          if (e.target.closest(interactiveSelector)) {
            halo.classList.add("is-active");
          }
        };

        onCursorOut = (e) => {
          if (e.target.closest(interactiveSelector)) {
            halo.classList.remove("is-active");
          }
        };

        window.addEventListener("pointermove", onCursorHaloMove, { passive: true });
        document.addEventListener("pointerover", onCursorOver, { passive: true });
        document.addEventListener("pointerout", onCursorOut, { passive: true });
      }

      // Parallax sutil del fondo al mover el cursor
      const bgEl = document.querySelector(".bg-wrap, .bg, main");
      if (bgEl && matchMedia("(hover:hover)").matches && !RM) {
        const bx = gsap.quickTo(bgEl, "--px", {
          duration: 0.8,
          ease: "power2.out",
        });
        const by = gsap.quickTo(bgEl, "--py", {
          duration: 0.8,
          ease: "power2.out",
        });
        onBgMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          bx(`${(-nx * 18).toFixed(1)}px`);
          by(`${(-ny * 14).toFixed(1)}px`);
        };
        window.addEventListener("pointermove", onBgMove);
      }

      // Actualización del HUD lateral según scroll y sección activa
      onScrollHud = () => {
        const doc = document.documentElement;
        const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
        const pct = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / maxScroll) * 100))
        );
        setScrollPct(pct);

        const contactoEl = document.getElementById("contacto");
        const trabajoEl = document.getElementById("trabajo");
        const aboutEl = document.getElementById("about");

        const yProbe = window.scrollY + window.innerHeight * 0.42;

        if (contactoEl && yProbe >= contactoEl.offsetTop) {
          setActiveHud("contacto");
        } else if (trabajoEl && yProbe >= trabajoEl.offsetTop) {
          setActiveHud("trabajo");
        } else if (aboutEl && yProbe >= aboutEl.offsetTop) {
          setActiveHud("about");
        } else {
          setActiveHud("top");
        }
      };

      onScrollHud();
      window.addEventListener("scroll", onScrollHud, { passive: true });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 450);
    });

    return () => {
      if (onBgMove) window.removeEventListener("pointermove", onBgMove);
      if (onScrollHud) window.removeEventListener("scroll", onScrollHud);
      if (onCursorHaloMove) window.removeEventListener("pointermove", onCursorHaloMove);
      if (onCursorOver) document.removeEventListener("pointerover", onCursorOver);
      if (onCursorOut) document.removeEventListener("pointerout", onCursorOut);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div id="pro-halo" className="pro-halo" aria-hidden="true"></div>
      <Background />
      <Navbar />

      <aside className="hud-rail" aria-label="Navegación rápida de secciones">
        <div className="hud-pct">{String(scrollPct).padStart(2, "0")}%</div>
        <div className="hud-items">
          {HUD_SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`hud-btn ${activeHud === item.id ? "is-active" : ""}`}
              onClick={() => jumpToSection(item.id)}
            >
              <span className="hud-dot"></span>
              <span className="hud-code">{item.code}</span>
              <span className="hud-label">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <main>
        <HeroBadge />
        <AboutBento />
        <ProjectsRail />

        <section className="ct" id="contacto">
          <div className="tl" data-rv="">
            {"// 03 · Contacto"}
          </div>
          <h2 data-rv="">
            ¿Construimos algo <span>fuera de lo común</span>?
          </h2>
          <p className="ct-sub" data-rv="">
            Soy {PROFILE.fullName}, practicante de Análisis y Desarrollo de
            Software (SENA) en Antioquia, Colombia. Disponible para prácticas,
            proyectos full-stack y trabajo remoto.
          </p>

          <button
            type="button"
            className="ct-card wow-card"
            onClick={handleCopyEmail}
            title="Haz clic para copiar mi correo"
            style={{ cursor: "pointer" }}
            data-rv=""
          >
            <span className="ct-mail">{PROFILE.email}</span>
            <span className="ct-status">
              {copiedEmail ? "Copiado ✓" : "Copiar correo"}
            </span>
          </button>

          <form className="ct-box wow-card" onSubmit={handleSubmit} data-rv="">
            <div
              className="ct-topics"
              role="group"
              aria-label="Motivo de contacto"
            >
              {CONTACT_TOPICS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={topicId === t.id ? "on" : undefined}
                  onClick={() => setTopicId(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="ct-fields">
              <div className="ct-row">
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  aria-label="Tu nombre"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                />
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  aria-label="Tu correo electrónico"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
              </div>
              <textarea
                rows={3}
                required
                placeholder={activeTopic.placeholder}
                aria-label="Tu mensaje"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>

            {status.text && (
              <p className={`ct-feedback ${status.type}`}>{status.text}</p>
            )}

            <div className="ct-actions">
              <button
                type="submit"
                className="go shine-btn"
                disabled={status.type === "loading"}
                style={{ border: 0, cursor: "pointer" }}
              >
                <span>
                  {status.type === "loading"
                    ? "Enviando..."
                    : "Enviar mensaje"}
                </span>
                <span className="btn-ico">→</span>
              </button>
              <a
                className="go-sec shine-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>GitHub</span>
                <span className="btn-ico">↗</span>
              </a>
            </div>
          </form>
        </section>
      </main>

      <footer>
        © 2026 {PROFILE.fullName} · Antioquia, Colombia · Full-Stack Developer
      </footer>

      <div className="pre" id="pre">
        <div style={{ textAlign: "center" }}>
          <div>
            <b id="pn">0</b>
            <span>%</span>
          </div>
          <em id="pl2">Verificando credenciales</em>
        </div>
      </div>
      <div className="prog"></div>
    </>
  );
}