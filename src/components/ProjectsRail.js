"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/portfolio";

const INSPECTOR_TABS = [
  { id: "producto", label: "01 · Producto" },
  { id: "arquitectura", label: "02 · Arquitectura" },
  { id: "flujo", label: "03 · Flujo de datos" },
];

const PIPELINE_STEPS = [
  {
    node: "01 · Interfaz y Roles",
    desc: "Ingreso diferenciado para familia/usuario y cuidador, con navegación adaptada a cada perfil.",
  },
  {
    node: "02 · Lógica Django",
    desc: "Gestión de agenda inteligente, mensajería multimedia, catálogo de insumos y guías en PDF.",
  },
  {
    node: "03 · Persistencia SQL",
    desc: "Modelado relacional en PostgreSQL para usuarios, turnos, conversaciones y recursos.",
  },
  {
    node: "04 · Despliegue Cloud",
    desc: "Publicación continua en Vercel con acceso web y móvil listo para uso real.",
  },
];

export default function ProjectsRail() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("producto");

  const openInspector = (proj) => {
    setActiveTab("producto");
    setSelectedProject(proj);
  };

  const handleCardClick = (proj) => {
    if (proj.isCollaboration) {
      const target = document.getElementById("contacto");
      if (window.__l && target) {
        window.__l.scrollTo(target);
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    openInspector(proj);
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    card.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
    card.style.setProperty("--px", `${(px * 12).toFixed(1)}px`);
    card.style.setProperty("--py", `${(py * 10).toFixed(1)}px`);
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--px", "0px");
    card.style.setProperty("--py", "0px");
  };

  return (
    <section id="trabajo">
      <div className="hs">
        <div className="hh">
          <div>
            <div className="tl" data-rv="">
              {"// 02 · Trabajo"}
            </div>
            <h2 className="work-title" data-rv="">
              Productos que sí funcionan en el mundo real.
            </h2>
          </div>
          <span className="rail-hint">
            Haz clic para inspeccionar · Desliza →
          </span>
        </div>

        <div className="rail">
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className={`pc wow-pc ${proj.featured ? "pc-feat" : ""} ${
                proj.isCollaboration ? "nx" : ""
              }`}
              onClick={() => handleCardClick(proj)}
              onPointerMove={handleCardMove}
              onPointerLeave={handleCardLeave}
            >
              <div className="pc-inner">
                <div className="pc-top">
                  <small>{proj.index}</small>
                  <span className="pc-act">
                    {proj.isCollaboration ? "Iniciar ↗" : "Inspector ↗"}
                  </span>
                </div>
                <h3>{proj.title}</h3>
                <p>{proj.shortDesc}</p>
              </div>

              <div className="pc-foot">
                {proj.isCollaboration ? (
                  <a
                    className="go-sec shine-btn"
                    href="#contacto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(proj);
                    }}
                  >
                    <span>Hablemos</span>
                    <span className="btn-ico">→</span>
                  </a>
                ) : (
                  <div className="tgs">
                    {(proj.tags || []).map((tag) => (
                      <i key={tag}>{tag}</i>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="pl">
          <i></i>
        </div>
      </div>

      {selectedProject && (
        <div
          className="proj-modal modal-pop"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="pm-box modal-card-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pm-top">
              <small>{selectedProject.index}</small>
              <button
                type="button"
                className="pm-close"
                aria-label="Cerrar inspector"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </div>

            <h3>{selectedProject.title}</h3>

            <div className="insp-tabs" role="tablist" aria-label="Vistas del proyecto">
              {INSPECTOR_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={activeTab === tab.id ? "on" : undefined}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="insp-panel" key={activeTab}>
              {activeTab === "producto" && (
                <>
                  <p className="pm-desc">{selectedProject.shortDesc}</p>
                  {Array.isArray(selectedProject.highlights) &&
                    selectedProject.highlights.length > 0 && (
                      <ul className="pm-list">
                        {selectedProject.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                </>
              )}

              {activeTab === "arquitectura" && (
                <div className="pm-arch">
                  <span>ARQUITECTURA E IMPLEMENTACIÓN</span>
                  {Array.isArray(selectedProject.architecture) &&
                    selectedProject.architecture.length > 0 && (
                      <ul className="pm-list">
                        {selectedProject.architecture.map((arch) => (
                          <li key={arch}>{arch}</li>
                        ))}
                      </ul>
                    )}
                </div>
              )}

              {activeTab === "flujo" && (
                <div className="flow-list">
                  {PIPELINE_STEPS.map((step, idx) => (
                    <div
                      key={step.node}
                      className="flow-step"
                      style={{
                        animation: `pillIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${
                          idx * 65
                        }ms both`,
                      }}
                    >
                      <strong>{step.node}</strong>
                      <span>{step.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {Array.isArray(selectedProject.tags) &&
              selectedProject.tags.length > 0 && (
                <div className="pm-arch">
                  <span>STACK</span>
                  <div className="tgs">
                    {selectedProject.tags.map((tag) => (
                      <i key={tag}>{tag}</i>
                    ))}
                  </div>
                </div>
              )}

            <div className="pm-actions">
              {selectedProject.liveUrl && (
                <a
                  className="go shine-btn"
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Ver sitio en vivo</span>
                  <span className="btn-ico">↗</span>
                </a>
              )}
              {selectedProject.repoUrl && (
                <a
                  className="go-sec shine-btn"
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Repositorio GitHub</span>
                  <span className="btn-ico">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}