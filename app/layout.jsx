export const metadata = {
  title: "Humane Lab",
  description: "Herramientas en la intersección de accesibilidad, economía conductual y UX.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}