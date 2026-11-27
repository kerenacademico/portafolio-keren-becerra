export const PROFILE = {
  name: "Keren",
  fullName: "Keren Tatiana Becerra Molina",
  role: "Full-Stack Developer · Practicante ADSO (SENA)",
  location: "Antioquia, Colombia (UTC-5)",
  availability: "Disponible para prácticas, remoto o híbrido",
  email: "kerenacademico@gmail.com",
  github: "https://github.com/kerenacademico",
  linkedin: "https://www.linkedin.com",
  cvUrl: "/cv-keren-becerra.pdf",
};

export const STACK_GROUPS = [
  {
    id: "backend",
    label: "Backend y BD",
    items: ["Python", "Django", "Node.js", "NestJS", "PostgreSQL", "MySQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "GSAP"],
  },
  {
    id: "tools",
    label: "Entornos y Git",
    items: ["Git", "GitHub", "Vercel", "Linux / CLI", "REST APIs"],
  },
];

export const STACK = STACK_GROUPS.flatMap((group) =>
  group.items.map((name) => ({ name, group: group.id }))
);

export const PROJECTS = [
  {
    id: "cuidarte",
    index: "01 / 03 · PROYECTO PRINCIPAL · EN PRODUCCIÓN",
    title: "CuidArte",
    shortDesc:
      "Plataforma integral para conectar familias con cuidadores de adultos mayores. Cuenta con registro e ingreso por rol (cuidador o usuario), agenda inteligente, chat multimedia en tiempo real, tienda de insumos médicos, talleres virtuales y guías en PDF.",
    highlights: [
      "Autenticación y control de acceso diferenciado según el rol (familia/usuario o cuidador).",
      "Agenda inteligente para coordinación de turnos, recordatorios y seguimiento diario.",
      "Chat multimedia en tiempo real para comunicación directa entre familias y cuidadores.",
      "Módulo de tienda de insumos médicos, talleres virtuales y biblioteca de guías en PDF.",
    ],
    architecture: [
      "Backend estructurado en Python con Django y base de datos relacional PostgreSQL.",
      "Separación clara de vistas, modelos de negocio y gestión de archivos multimedia.",
      "Despliegue continuo en la nube accesible desde navegador web y móvil.",
    ],
    tags: ["Python", "Django", "HTML", "CSS", "PostgreSQL"],
    liveUrl: "https://cuid-arte-gamma.vercel.app/",
    repoUrl: "",
    featured: true,
  },
  {
    id: "kronoskool",
    index: "02 / 03 · PROYECTO WEB · EN PRODUCCIÓN",
    title: "Kronoskool",
    shortDesc:
      "Sistema web de gestión y control escolar con vista tipo kiosko para registro ágil, consulta operativa y seguimiento en entornos educativos.",
    highlights: [
      "Interfaz tipo kiosko optimizada para registro rápido y uso intuitivo en puntos de acceso escolar.",
      "Gestión centralizada de registros y consulta ágil en tiempo real.",
      "Diseño responsivo preparado para pantallas táctiles, escritorio y dispositivos móviles.",
    ],
    architecture: [
      "Aplicación web moderna desarrollada con Next.js y JavaScript/React.",
      "Arquitectura modular conectada a servicios de datos y control de estado.",
      "Despliegue continuo en Vercel integrado con control de versiones en GitHub.",
    ],
    tags: ["Next.js", "React", "JavaScript", "CSS", "Vercel"],
    liveUrl: "https://kronoskool.vercel.app/kiosk",
    repoUrl: "https://github.com/kerenacademico/kronoskool",
    featured: true,
  },
  {
    id: "next-collab",
    index: "03 / 03 · COLABORACIÓN",
    title: "¿El siguiente es el tuyo?",
    shortDesc:
      "Busco aportar en equipos de desarrollo como practicante o desarrolladora junior, construyendo productos web sólidos, escalables y bien diseñados.",
    tags: [],
    isCollaboration: true,
  },
];