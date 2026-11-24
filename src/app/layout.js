import "./globals.css";

export const metadata = {
  title: "Keren Tatiana Becerra Molina · Portafolio",
  description:
    "Software con criterio. Desarrollo web full-stack con Python, Django, Next.js y SQL desde Bello, Antioquia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}