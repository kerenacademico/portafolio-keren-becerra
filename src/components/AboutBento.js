"use client";

import { useEffect, useState } from "react";
import { PROFILE, STACK_GROUPS } from "@/data/portfolio";
import TechIcon from "@/components/TechIcon";

const GROUP_META = {
  backend: {
    summary:
      "APIs modulares, lógica de negocio, autenticación por roles y modelado relacional.",
  },
  frontend: {
    summary:
      "Interfaces responsivas, consumo de APIs, arquitectura de componentes y microinteracciones.",
  },
  tools: {
    summary:
      "Control de versiones colaborativo, despliegue continuo y documentación técnica.",
  },
};

const SIGNALS = [
  {
    id: "formacion",
    label: "Formación SENA",
    tag: "ADSO",
    headline: "Tecnóloga en Análisis y Desarrollo de Software",
    detail:
      "En etapa productiva (practicante), aplicando ingeniería de requisitos, arquitectura limpia y desarrollo web full-stack.",
  },
  {
    id: "arquitectura",
    label: "Arquitectura",
    tag: "FULL-STACK",
    headline: "De la base de datos a la interfaz final",
    detail:
      "Diseño de modelos relacionales, control de acceso por roles y flujos completos listos para producción.",
  },
  {
    id: "cuidarte",
    label: "Caso CuidArte",
    tag: "EN VIVO",
    headline: "Plataforma integral desplegada en producción",
    detail:
      "Roles diferenciados, agenda inteligente, chat multimedia en tiempo real, tienda y guías en PDF.",
  },
];

export default function AboutBento() {
  const [activeGroupId, setActiveGroupId] = useState(
    STACK_GROUPS[0]?.id || "backend"
  );
  const [activeSignalId, setActiveSignalId] = useState(SIGNALS[0].id);
  const [clockText, setClockText] = useState("COL · UTC-5");

  const currentGroup =
    STACK_GROUPS.find((g) => g.id === activeGroupId) || STACK_GROUPS[0];
  const currentGroupMeta = GROUP_META[currentGroup?.id] || {
    summary: "Tecnologías aplicadas a productos web reales.",
  };
  const currentSignal =
    SIGNALS.find((s) => s.id === activeSignalId) || SIGNALS[0];

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("es-CO", {
          timeZone: "America/Bogota",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setClockText(`${formatted} · COL`);
      } catch {
        setClockText("COL · UTC-5");
      }
    };

    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about">
      <div className="tl" data-rv="">
        {"// 01 · Sobre mí"}
      </div>

      <div className="bento">
        <div className="bx b1 wow-card pro-scan" data-rv="">
          <h2>
            Construyo productos <span className="hl-cyan">web full-stack</span>,
            diseño <span className="hl-cyan">APIs y datos</span> sólidos y hago
            que lo digital se sienta <span className="hl-cyan">humano.</span>
          </h2>

          <div className="pillars">
            <div>
              <b>01 · ARQUITECTURA</b>
              <span>APIs escalables y código limpio</span>
            </div>
            <div>
              <b>02 · INTERACCIÓN</b>
              <span>Interfaces fluidas con propósito</span>
            </div>
            <div>
              <b>03 · PRODUCTO</b>
              <span>De la idea a producción real</span>
            </div>
          </div>
        </div>

        <div className="bx b2 wow-card" data-rv="">
          <div className="st">
            <i className="pulse-dot"></i>
            <span>Disponible para proyectos</span>
          </div>
          <div className="b2-foot">
            <p>
              {PROFILE.availability} · {PROFILE.location}.
            </p>
            <span className="live-clock">{clockText}</span>
          </div>
        </div>

        <div className="bx b3 wow-card pro-scan" data-rv="">
          <small>AHORA CONSTRUYENDO</small>
          <h4>CuidArte</h4>
          <div className="pg">
            <i></i>
          </div>
          <p>Conectando familias con cuidadores verificados.</p>
        </div>

        <div className="bx b4 wow-card" data-rv="">
          <div className="sr">
            <b data-n="1">1</b>
            <span>Plataforma en vivo</span>
          </div>
          <div className="sr">
            <b data-n="14">14</b>
            <span>Tecnologías</span>
          </div>
        </div>

        <div className="bx b5 wow-card" data-rv="">
          <div className="stack-hd">
            <small>STACK</small>
            <div
              className="stack-tabs"
              role="tablist"
              aria-label="Áreas del stack"
            >
              {STACK_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  aria-selected={currentGroup?.id === group.id}
                  className={currentGroup?.id === group.id ? "on" : undefined}
                  onClick={() => setActiveGroupId(group.id)}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          <div className="stack-body" key={currentGroup?.id}>
            <div className="stack-grid">
              {(currentGroup?.items || []).map((tech, index) => (
                <div
                  key={tech}
                  className="tech-tile"
                  style={{
                    animation: `pillIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) ${
                      index * 45
                    }ms both`,
                  }}
                >
                  <TechIcon name={tech} />
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
            <p className="stack-desc">{currentGroupMeta.summary}</p>
          </div>
        </div>

        <div className="bx b6 wow-card" data-rv="">
          <div className="sig-top">
            <small>SELLO DE TRABAJO</small>
            <span className="sig-tag">{currentSignal.tag}</span>
          </div>

          <div
            className="term-cmds"
            role="group"
            aria-label="Aspectos de trabajo"
          >
            {SIGNALS.map((sig) => (
              <button
                key={sig.id}
                type="button"
                className={currentSignal.id === sig.id ? "on" : undefined}
                onClick={() => setActiveSignalId(sig.id)}
              >
                {sig.label}
              </button>
            ))}
          </div>

          <div className="sig-content" key={currentSignal.id}>
            <div className="sig-hl">{currentSignal.headline}</div>
            <p className="sig-detail">{currentSignal.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}