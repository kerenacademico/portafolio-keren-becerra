"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/portfolio";

const COMMANDS = [
  { id: "about", label: "Ir a Sobre mí", hint: "#", action: "scroll", target: "#about" },
  { id: "trabajo", label: "Ver trabajo", hint: "#", action: "scroll", target: "#trabajo" },
  { id: "cuidarte", label: "Ver proyecto CuidArte", hint: "↗", action: "external", target: "https://cuid-arte-gamma.vercel.app/" },
  { id: "stack", label: "Ver stack tecnológico", hint: "#", action: "scroll", target: "#about" },
  { id: "contacto", label: "Ir a contacto", hint: "#", action: "scroll", target: "#contacto" },
  { id: "email", label: "Copiar correo", hint: "C", action: "copy" },
  { id: "top", label: "Volver arriba", hint: "↑", action: "top" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase().trim())
  );

  const runCommand = (cmd) => {
    setOpen(false);
    setQuery("");

    if (cmd.action === "top") {
      if (window.__l) window.__l.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (cmd.action === "scroll") {
      const el = document.querySelector(cmd.target);
      if (!el) return;
      if (window.__l) window.__l.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (cmd.action === "external") {
      window.open(cmd.target, "_blank", "noopener,noreferrer");
      return;
    }

    if (cmd.action === "copy") {
      navigator.clipboard?.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <header className="nav-shell">
        <nav className="nav-pill" aria-label="Navegación principal">
          <a href="#top" className="brand">
            KEREN.
          </a>

          <div className="nav-links">
            <a href="#about">Sobre mí</a>
            <a href="#trabajo">Trabajo</a>
            <a href="#contacto">Contacto</a>
          </div>

          <button
            type="button"
            className="cmd-trigger"
            onClick={() => setOpen(true)}
            aria-label="Abrir paleta de comandos"
          >
            <span>{copied ? "Correo copiado ✓" : "Comandos"}</span>
            <kbd>Ctrl K</kbd>
          </button>
        </nav>
      </header>

      {open && (
        <div
          className="cmd-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Paleta de comandos"
          onClick={() => setOpen(false)}
        >
          <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-input-row">
              <input
                type="text"
                autoFocus
                placeholder="Escribe un comando... (Esc para cerrar)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="button"
                className="cmd-esc"
                onClick={() => setOpen(false)}
              >
                Esc
              </button>
            </div>

            <ul className="cmd-list">
              {filtered.length > 0 ? (
                filtered.map((cmd) => (
                  <li key={cmd.id}>
                    <button
                      type="button"
                      className="cmd-item"
                      onClick={() => runCommand(cmd)}
                    >
                      <span>{cmd.label}</span>
                      <kbd>{cmd.hint}</kbd>
                    </button>
                  </li>
                ))
              ) : (
                <li className="cmd-empty">Sin comandos coincidentes</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}