"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PROFILE } from "@/data/portfolio";

const REST_TILT = { rx: 0, ry: 0, lx: 0, ty: 0, gx: 50, gy: 50 };

export default function HeroBadge() {
  const lanyardRef = useRef(null);
  const [tilt, setTilt] = useState(REST_TILT);
  const [dragging, setDragging] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const dragState = useRef({
    active: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    moved: false,
  });

  useEffect(() => {
    const el = lanyardRef.current;
    if (!el) return;

    const swingTween = gsap.to(el, {
      rotate: 0.75,
      y: -2.5,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 0%",
    });

    return () => {
      swingTween.kill();
    };
  }, []);

  const updateFromPointer = (clientX, clientY) => {
    const el = lanyardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const ry = (x - 0.5) * 11;
    const rx = (0.5 - y) * 9;
    const lx = (x - 0.5) * 3;
    const ty = (y - 0.5) * 3;
    setTilt({
      rx,
      ry,
      lx,
      ty,
      gx: Math.round(x * 100),
      gy: Math.round(y * 100),
    });
  };

  const handlePointerMove = (e) => {
    if (dragState.current.active) {
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragState.current.moved = true;
      }
      const ry = Math.max(-11, Math.min(11, dragState.current.baseX + dx * 0.065));
      const rx = Math.max(-9, Math.min(9, dragState.current.baseY - dy * 0.055));
      const lx = Math.max(-3.5, Math.min(3.5, ry * 0.28));
      const ty = Math.max(-5, Math.min(5, dy * 0.04));
      const rect = lanyardRef.current?.getBoundingClientRect();
      const gx = rect
        ? Math.round(
            Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
          )
        : 50;
      const gy = rect
        ? Math.round(
            Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
          )
        : 50;
      setTilt({ rx, ry, lx, ty, gx, gy });
      return;
    }

    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerDown = (e) => {
    dragState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: tilt.ry,
      baseY: tilt.rx,
      moved: false,
    };
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e) => {
    if (!dragState.current.active) return;
    const wasDrag = dragState.current.moved;
    dragState.current.active = false;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);

    if (wasDrag) {
      setTilt(REST_TILT);
    } else {
      setFlipped((prev) => !prev);
    }
  };

  const handlePointerLeave = () => {
    if (dragState.current.active) return;
    setTilt(REST_TILT);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((prev) => !prev);
    }
  };

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span>ADSO · SENA · BELLO, ANTIOQUIA</span>
          </div>

          <h1>
            <span>Software</span> <span>con</span> <span>criterio.</span>
            <br />
            <span>Código</span> <span>hecho</span> <span>para</span>{" "}
            <span>durar.</span>
          </h1>

          <p className="lead">
            Soy Keren. Construyo soluciones web desde la base de datos hasta la
            interfaz, cuidando la arquitectura, el rendimiento y la experiencia de
            usuario.
          </p>

          <div className="hero-actions">
            <a className="go shine-btn" href="#trabajo">
              <span>Ver proyectos</span>
              <span className="btn-ico">→</span>
            </a>
            <a
              className="go-sec shine-btn"
              href={PROFILE.cvUrl}
              download="Keren-Becerra-CV.pdf"
            >
              <span>Descargar CV</span>
              <span className="btn-ico">↓</span>
            </a>
          </div>

          <div className="socials">
            <a
              className="social-icon-link"
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil de GitHub"
              title="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="badge-stage">
          <div
            ref={lanyardRef}
            className={`lanyard-assembly ${dragging ? "is-dragging" : ""}`}
            style={{
              transform: `translate3d(0, ${tilt.ty}px, 0) rotate(${tilt.lx}deg)`,
            }}
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Lanyard y credencial 3D de Keren Tatiana Becerra Molina. Da clic para girar el carnet."
          >
            <div className="lanyard-strap" aria-hidden="true">
              <span className="strap-text">KEREN BECERRA · FULL-STACK · SENA ADSO</span>
            </div>

            <div className="lanyard-clasp" aria-hidden="true">
              <span className="clasp-ring"></span>
              <span className="clasp-clip"></span>
            </div>

            <div className="id-flip-scene">
              <div
                className={`id-card-3d ${flipped ? "is-flipped" : ""} ${
                  dragging ? "is-dragging" : ""
                }`}
                style={{
                  transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${
                    tilt.ry + (flipped ? 180 : 0)
                  }deg)`,
                  "--gx": `${tilt.gx}%`,
                  "--gy": `${tilt.gy}%`,
                }}
              >
                {/* FRENTE */}
                <div className="id-card id-face id-face--front">
                  <div className="id-glare"></div>

                  <div className="id-top">
                    <span className="id-chip">DEV · FULL-STACK</span>
                    <span className="id-zone">COL · UTC-5</span>
                  </div>

                  <div className="id-profile id-profile--stacked">
                    <div className="id-avatar-ring id-avatar-ring--lg">
                      <img
                        src="/foto-keren.jpg"
                        alt={PROFILE.fullName}
                        className="id-avatar"
                      />
                    </div>
                    <div className="id-identity">
                      <div className="id-name">{PROFILE.fullName}</div>
                      <div className="id-subrole">Practicante ADSO · SENA</div>
                    </div>
                  </div>

                  <div className="id-footer">
                    <div className="stk">Python · Django · Next.js · SQL</div>
                    <span className="id-hint">Da clic para girar el carnet</span>
                  </div>
                </div>

                {/* REVERSO */}
                <div className="id-card id-face id-face--back">
                  <div className="id-glare"></div>

                  <div className="id-top">
                    <span className="id-chip">PERFIL · ADSO</span>
                    <span className="id-zone">BELLO · ANTIOQUIA</span>
                  </div>

                  <div className="id-back-body">
                    <div className="id-back-title">Desarrollo Web Full-Stack</div>
                    <p className="id-back-text">
                      Arquitectura limpia, APIs estructuradas, bases de datos
                      relacionales e interfaces web responsivas.
                    </p>
                    <div className="id-back-tags">
                      <span>Prácticas / Remoto</span>
                      <span>UTC-5</span>
                    </div>
                  </div>

                  <div className="id-footer">
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="id-back-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver repositorios en GitHub ↗
                    </a>
                    <span className="id-hint">Da clic para girar el carnet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue" id="lz">
        <span>Scroll para explorar</span>
        <i></i>
      </div>
    </section>
  );
}