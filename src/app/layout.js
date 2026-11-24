import "./globals.css";

export const metadata = {
  title: "Keren Tatiana Becerra Molina · Portafolio",
  description:
    "Software con criterio. Desarrollo web full-stack con Python, Django, Next.js y SQL desde Bello, Antioquia.",
  icons: {
    icon: [
      { url: "/kb-icon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/kb-icon.svg?v=2",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}