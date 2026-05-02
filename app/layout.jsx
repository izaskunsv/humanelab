import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Humane Lab",
  description: "Herramientas en la intersección de accesibilidad, behavioral economics y UX.",
  openGraph: {
    title: "Humane Lab",
    description: "Herramientas en la intersección de accesibilidad, behavioral economics y UX.",
    url: "https://www.humanelab.dev",
    siteName: "Humane Lab",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={dmSans.className} style={{ margin: 0, padding: 0, background: "#F5F4F0" }}>
        {children}
      </body>
    </html>
  );
}