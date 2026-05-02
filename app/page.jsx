"use client";
import { useState } from "react";

const i18n = {
  es: {
    nav: { all: "Todas", a11y: "Accesibilidad", be: "Behavioral economics", ux: "UX", about: "Sobre esto", changelog: "Novedades" },
    hero: {
      eyebrow: "Laboratorio de herramientas",
      title: "Diseño más humano, una utilidad a la vez.",
      desc: "Una colección de herramientas pequeñas construidas en la intersección de accesibilidad, behavioral economics y UX. Libres, abiertas e iteradas en público.",
    },
    tools: {
      status: { live: "Disponible", soon: "Próximamente", wip: "En desarrollo" },
      statusIcon: { live: "✓", soon: "◷", wip: "◌" },
      open: "Abrir herramienta",
      heading: "Herramientas",
    },
    about: {
  title: "Sobre esto",
  body: "Diseñadora con foco en accesibilidad y experiencia de usuario. Construyo Humane Lab para probar cosas, aprender y compartir — explorando cómo el diseño puede ser más justo, claro y útil para todas las personas. Por el camino, me estoy adentrando en la IA y el vibe coding.",
  built: "Disciplinas",
  linkedinLabel: "Izaskun Sáez en LinkedIn",
  linkedinUrl: "https://www.linkedin.com/in/izaskunsaez/",
},
    changelog: {
      title: "Novedades",
      entries: [
        { date: "May 2025", text: "Guía de pruebas de accesibilidad WCAG 2.2 AA — publicada." },
        { date: "Abr 2025", text: "Plain language rewriter — primera herramienta publicada." },
      ],
    },
    breadcrumb: { home: "Inicio" },
    lang: "EN",
    skipLink: "Ir al contenido principal",
  },
  en: {
    nav: { all: "All", a11y: "Accessibility", be: "Behavioral economics", ux: "UX", about: "About", changelog: "Changelog" },
    hero: {
      eyebrow: "Tools laboratory",
      title: "More humane design, one utility at a time.",
      desc: "A collection of small tools built at the intersection of accessibility, behavioural economics and UX. Free, open, and iterated in public.",
    },
    tools: {
      status: { live: "Live", soon: "Coming soon", wip: "In progress" },
      statusIcon: { live: "✓", soon: "◷", wip: "◌" },
      open: "Open tool",
      heading: "Tools",
    },
    about: {
  title: "About",
  body: "Designer focused on accessibility and user experience. I build Humane Lab to try things, learn and share — exploring how design can be fairer, clearer and more useful for everyone. Along the way, I'm diving into AI and vibe coding.",
  built: "Disciplines",
  linkedinLabel: "Izaskun Sáez on LinkedIn",
  linkedinUrl: "https://www.linkedin.com/in/izaskunsaez/",
},
    changelog: {
      title: "Changelog",
      entries: [
        { date: "May 2025", text: "Accessibility testing guide WCAG 2.2 AA — published." },
        { date: "Apr 2025", text: "Plain language rewriter — first tool published." },
      ],
    },
    breadcrumb: { home: "Home" },
    lang: "ES",
    skipLink: "Skip to main content",
  },
};

const TOOLS = [
  {
    id: "plain-language",
    name: { es: "Plain language", en: "Plain language" },
    desc: { es: "Convierte textos complejos en lenguaje claro para cualquier audiencia.", en: "Converts complex text into plain language for any audience." },
    tags: ["a11y", "ux"],
    status: "live",
    url: "/plain-language",
  },
  {
    id: "guia-accesibilidad",
    name: { es: "Guía de pruebas de accesibilidad", en: "Accessibility testing guide" },
    desc: { es: "55 pruebas WCAG 2.2 AA organizadas por metodología: teclado, visual, lector de pantalla y más.", en: "55 WCAG 2.2 AA tests organised by methodology: keyboard, visual, screen reader and more." },
    tags: ["a11y"],
    status: "live",
    url: "/guia-pruebas-accesibilidad.html",
  },
];

const TAG_META = {
  a11y: { label: { es: "Accesibilidad", en: "Accessibility" }, color: "#0D7A5F", bg: "#C8F0E6", text: "#0D7A5F" },
  be:   { label: { es: "Behavioral economics", en: "Behavioral economics" }, color: "#4B3DB5", bg: "#E0DEFF", text: "#4B3DB5" },
  ux:   { label: { es: "UX", en: "UX" }, color: "#0D5C9E", bg: "#D0E8FF", text: "#0D5C9E" },
};

const SECTIONS = {
  tools: "tools",
  about: "about",
  changelog: "changelog",
};

export default function HumaneToolkitHome() {
  const [lang, setLang] = useState("es");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSection, setActiveSection] = useState(SECTIONS.tools);
  const t = i18n[lang];

  const filteredTools = TOOLS.filter(
    (tool) => activeFilter === "all" || tool.tags.includes(activeFilter)
  );

  const sectionLabel = {
    tools: activeFilter === "all" ? t.nav.all : TAG_META[activeFilter]?.label[lang],
    about: t.nav.about,
    changelog: t.nav.changelog,
  };

  const navItems = [
    { id: "all",  label: t.nav.all,  section: SECTIONS.tools },
    { id: "a11y", label: t.nav.a11y, section: SECTIONS.tools },
    { id: "be",   label: t.nav.be,   section: SECTIONS.tools },
    { id: "ux",   label: t.nav.ux,   section: SECTIONS.tools },
  ];

  const isActiveNav = (item) =>
    activeSection === SECTIONS.tools && activeFilter === item.id;

  return (
    <>
      <a href="#main-content" style={s.skipLink}>{t.skipLink}</a>

      <div style={s.page}>
        {/* Sidebar */}
        <aside style={s.sidebar} aria-label={lang === "es" ? "Navegación del sitio" : "Site navigation"}>
          {/* Logo — no es un landmark, es decorativo con texto */}
          <div style={s.logoWrap}>
            <span style={s.logoMark} aria-hidden="true" />
            <span style={s.logoText} aria-label="Humane Lab">Humane<br />lab</span>
          </div>

          <nav aria-label={lang === "es" ? "Secciones principales" : "Main sections"}>
            <p style={s.navSection} aria-hidden="true">
              {lang === "es" ? "Herramientas" : "Tools"}
            </p>
            <ul style={s.navList} role="list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    style={{ ...s.navItem, ...(isActiveNav(item) ? s.navItemActive : {}) }}
                    onClick={() => { setActiveFilter(item.id); setActiveSection(SECTIONS.tools); }}
                    aria-current={isActiveNav(item) ? "page" : undefined}
                    aria-pressed={isActiveNav(item)}
                  >
                    {item.id !== "all" && (
                      <span
                        style={{ ...s.navDot, background: TAG_META[item.id]?.color }}
                        aria-hidden="true"
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <p style={{ ...s.navSection, marginTop: 20 }} aria-hidden="true">
              {lang === "es" ? "Proyecto" : "Project"}
            </p>
            <ul style={s.navList} role="list">
              <li>
                <button
                  style={{ ...s.navItem, ...(activeSection === SECTIONS.about ? s.navItemActive : {}) }}
                  onClick={() => { setActiveSection(SECTIONS.about); setActiveFilter("all"); }}
                  aria-current={activeSection === SECTIONS.about ? "page" : undefined}
                  aria-pressed={activeSection === SECTIONS.about}
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  style={{ ...s.navItem, ...(activeSection === SECTIONS.changelog ? s.navItemActive : {}) }}
                  onClick={() => { setActiveSection(SECTIONS.changelog); setActiveFilter("all"); }}
                  aria-current={activeSection === SECTIONS.changelog ? "page" : undefined}
                  aria-pressed={activeSection === SECTIONS.changelog}
                >
                  {t.nav.changelog}
                </button>
              </li>
            </ul>
          </nav>

          <button
            style={s.langToggle}
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {t.lang}
          </button>
        </aside>

        {/* Main content */}
        <div style={s.mainWrap}>
          {/* Breadcrumb */}
          <nav aria-label={lang === "es" ? "Ruta de navegación" : "Breadcrumb"} style={s.breadcrumbNav}>
            <ol style={s.breadcrumbList} role="list">
              <li style={s.breadcrumbItem}>
                <button
                  style={s.breadcrumbLink}
                  onClick={() => { setActiveSection(SECTIONS.tools); setActiveFilter("all"); }}
                  aria-label={lang === "es" ? "Ir a inicio" : "Go to home"}
                >
                  {t.breadcrumb.home}
                </button>
              </li>
              {(activeSection !== SECTIONS.tools || activeFilter !== "all") && (
                <>
                  <li style={s.breadcrumbSep} aria-hidden="true">/</li>
                  <li style={s.breadcrumbItem}>
                    <span style={s.breadcrumbCurrent} aria-current="page">
                      {sectionLabel[activeSection]}
                    </span>
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Main */}
          <main id="main-content" style={s.main} tabIndex={-1}>

            {/* TOOLS */}
            {activeSection === SECTIONS.tools && (
              <>
                {activeFilter === "all" && (
                  <div style={s.hero}>
                    <p style={s.eyebrow} aria-hidden="true">{t.hero.eyebrow}</p>
                    <h1 style={s.heroTitle}>{t.hero.title}</h1>
                    <p style={s.heroDesc}>{t.hero.desc}</p>
                  </div>
                )}

                {activeFilter !== "all" && (
                  <h1 style={s.filterTitle}>
                    {TAG_META[activeFilter]?.label[lang]}
                  </h1>
                )}

                {filteredTools.length > 0 ? (
                  <ul style={s.toolGrid} role="list" aria-label={lang === "es" ? "Lista de herramientas" : "Tools list"}>
                    {filteredTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} lang={lang} t={t} />
                    ))}
                  </ul>
                ) : (
                  <p style={s.emptyMsg}>
                    {lang === "es" ? "No hay herramientas en esta categoría todavía." : "No tools in this category yet."}
                  </p>
                )}
              </>
            )}

            {/* ABOUT */}
            {activeSection === SECTIONS.about && (
              {activeSection === SECTIONS.about && (
  <article style={s.prose} aria-labelledby="about-heading">
    <h1 id="about-heading" style={s.proseTitle}>{t.about.title}</h1>
    <p style={s.proseBody}>{t.about.body}</p>
    
      href={t.about.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={s.linkedinLink}
      aria-label={t.about.linkedinLabel}
    >
      <span aria-hidden="true" style={s.linkedinIcon}>in</span>
      {t.about.linkedinLabel}
    </a>
    <div style={s.builtByWithMargin}>
      <p style={s.builtByLabel}>{t.about.built}</p>
      <ul style={s.tagGrid} role="list">
        {Object.entries(TAG_META).map(([key, meta]) => (
          <li key={key} style={{ listStyle: "none" }}>
            <span style={{ ...s.tagPill, background: meta.bg, color: meta.text }}>
              {meta.label[lang]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </article>
)}

            {/* CHANGELOG */}
            {activeSection === SECTIONS.changelog && (
              <section aria-labelledby="changelog-heading" style={s.prose}>
                <h1 id="changelog-heading" style={s.proseTitle}>{t.changelog.title}</h1>
                <ol style={s.changeList} role="list">
                  {t.changelog.entries.map((entry, i) => (
                    <li key={i} style={s.changeEntry}>
                      <time style={s.changeDate}>{entry.date}</time>
                      <span style={s.changeText}>{entry.text}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </main>
        </div>
      </div>

      <style>{`
        /* Skip link visible on focus */
        a[href="#main-content"]:focus {
          top: 8px !important;
          outline: 3px solid #1A1A18;
          outline-offset: 2px;
        }

        /* Focus visible global — foco claro en todos los elementos interactivos */
        *:focus-visible {
          outline: 3px solid #0D5C9E !important;
          outline-offset: 2px !important;
          border-radius: 4px !important;
        }

        /* Foco en card completa */
        .tool-card:focus-within {
          outline: 3px solid #0D5C9E;
          outline-offset: 2px;
          border-radius: 12px;
        }

        /* Quitar outline del link dentro de la card cuando la card ya tiene foco */
        .tool-card:focus-within a:focus {
          outline: none !important;
        }

        /* Hover en cards */
        .tool-card:hover {
          border-color: #1A1A18 !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10) !important;
        }

        /* Hover en nav items */
        .nav-item-btn:hover {
          background: #EBEBEB !important;
        }

        /* Responsive */
       @media (max-width: 768px) {
  /* Layout principal — columna en móvil */
  div[style*="display: flex"][style*="min-height: 100vh"] {
    flex-direction: column !important;
  }
  
  /* Sidebar — pasa a horizontal arriba */
  aside {
    width: 100% !important;
    min-width: unset !important;
    border-right: none !important;
    border-bottom: 1.5px solid #C8C6BC !important;
    padding: 16px !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    gap: 8px !important;
  }

  /* Logo en móvil */
  aside > div:first-child {
    width: 100% !important;
    margin-bottom: 8px !important;
  }

  /* Navegación en móvil — horizontal */
  aside nav {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
    width: 100% !important;
  }

  /* Ocultar labels de sección en móvil */
  aside nav p {
    display: none !important;
  }

  /* Nav items en móvil — compactos */
  aside nav ul {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 4px !important;
    margin: 0 !important;
  }

  aside nav button {
    font-size: 14px !important;
    padding: 6px 10px !important;
    border-radius: 20px !important;
    border: 1.5px solid #C8C6BC !important;
    background: #F5F4F0 !important;
  }

  aside nav button[aria-current="page"],
  aside nav button[aria-pressed="true"] {
    background: #1A1A18 !important;
    color: #FFFFFF !important;
    border-color: #1A1A18 !important;
  }

  /* Ocultar lang toggle en móvil */
  aside > button:last-child {
    display: none !important;
  }

  /* Breadcrumb */
  nav[aria-label="Ruta de navegación"],
  nav[aria-label="Breadcrumb"] {
    padding: 10px 16px !important;
  }

  /* Main content */
  main {
    padding: 24px 16px !important;
  }

  /* Hero title */
  main h1 {
    font-size: 26px !important;
  }

  /* Hero desc */
  main p {
    font-size: 16px !important;
  }

  /* Tool grid — una columna */
  ul[aria-label="Lista de herramientas"],
  ul[aria-label="Tools list"] {
    grid-template-columns: 1fr !important;
  }
}
      `}</style>
    </>
  );
}

function ToolCard({ tool, lang, t }) {
  const statusStyles = {
    live: { bg: "#C8F0E6", color: "#0D7A5F", border: "#0D7A5F" },
    soon: { bg: "#FDE8C8", color: "#7A4A0D", border: "#7A4A0D" },
    wip:  { bg: "#EBEBEB", color: "#3A3A3A", border: "#3A3A3A" },
  };
  const st = statusStyles[tool.status];
  const icon = t.tools.statusIcon[tool.status];

  return (
    <li style={s.card} className="tool-card" role="listitem">
      <div style={s.cardTop}>
        {/* Tags — con texto visible para lectores de pantalla */}
        <ul style={s.cardTags} role="list" aria-label={lang === "es" ? "Disciplinas" : "Disciplines"}>
          {tool.tags.map((tag) => (
            <li key={tag} style={{ listStyle: "none" }}>
              <span
                style={{ ...s.tagChip, background: TAG_META[tag]?.bg, color: TAG_META[tag]?.text }}
              >
                {TAG_META[tag]?.label[lang]}
              </span>
            </li>
          ))}
        </ul>
        {/* Status badge con icono */}
        <span
          style={{ ...s.statusBadge, background: st.bg, color: st.color }}
          aria-label={`${lang === "es" ? "Estado" : "Status"}: ${t.tools.status[tool.status]}`}
        >
          <span aria-hidden="true" style={s.statusIcon}>{icon}</span>
          {t.tools.status[tool.status]}
        </span>
      </div>

      <h2 style={s.cardName}>{tool.name[lang]}</h2>
      <p style={s.cardDesc}>{tool.desc[lang]}</p>

      {tool.url && (
        <a
          href={tool.url}
          style={s.cardLink}
          aria-label={`${t.tools.open}: ${tool.name[lang]}`}
        >
          {t.tools.open}
          <span aria-hidden="true" style={{ marginLeft: 6 }}>→</span>
        </a>
      )}
    </li>
  );
}

const s = {
  skipLink: {
    position: "fixed", top: "-100px", left: 16, zIndex: 9999,
    background: "#1A1A18", color: "#FFFFFF",
    padding: "10px 20px", borderRadius: 4,
    fontWeight: 700, textDecoration: "none",
    fontSize: 16, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
  },
  page: {
    display: "flex", minHeight: "100vh",
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    background: "#F5F4F0", color: "#1A1A18",
  },
  sidebar: {
    width: 240, minWidth: 240,
    background: "#FFFFFF", borderRight: "1.5px solid #C8C6BC",
    padding: "28px 20px", display: "flex", flexDirection: "column",
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 10, marginBottom: 32 },
  logoMark: { display: "block", width: 28, height: 28, borderRadius: "50%", background: "#1A1A18", flexShrink: 0 },
  logoText: { fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: "#1A1A18", letterSpacing: "-0.01em" },
  nav: { display: "flex", flexDirection: "column", flex: 1 },
  navList: { listStyle: "none", padding: 0, margin: "0 0 4px" },
  navSection: {
    fontSize: 11, fontWeight: 700, color: "#5A5855",
    textTransform: "uppercase", letterSpacing: "0.07em",
    padding: "0 8px", marginBottom: 4, margin: 0,
  },
  navItem: {
    display: "flex", alignItems: "center", gap: 8,
    fontSize: 16, color: "#2A2A28",
    background: "none", border: "none",
    padding: "8px 10px", borderRadius: 6,
    cursor: "pointer", textAlign: "left",
    fontFamily: "inherit", width: "100%",
    marginBottom: 2, fontWeight: 400,
  },
  navItemActive: { background: "#EBEBEB", color: "#1A1A18", fontWeight: 700 },
  navDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  langToggle: {
    marginTop: 24, alignSelf: "flex-start",
    fontSize: 14, fontWeight: 700, color: "#2A2A28",
    background: "none", border: "2px solid #C8C6BC",
    borderRadius: 4, padding: "4px 10px",
    cursor: "pointer", fontFamily: "inherit",
    letterSpacing: "0.04em",
  },
  mainWrap: { flex: 1, display: "flex", flexDirection: "column" },
  breadcrumbNav: {
    padding: "12px 48px",
    borderBottom: "1.5px solid #C8C6BC",
    background: "#FFFFFF",
  },
  breadcrumbList: { display: "flex", alignItems: "center", gap: 8, listStyle: "none", margin: 0, padding: 0 },
  breadcrumbItem: { display: "flex", alignItems: "center" },
  breadcrumbSep: { fontSize: 14, color: "#5A5855" },
  breadcrumbLink: {
    fontSize: 16, color: "#0D5C9E",
    background: "none", border: "none",
    cursor: "pointer", fontFamily: "inherit",
    fontWeight: 600, textDecoration: "underline",
    textUnderlineOffset: 3, padding: 0,
  },
  breadcrumbCurrent: { fontSize: 16, color: "#3A3A38", fontWeight: 400 },
  main: { flex: 1, padding: "40px 48px", maxWidth: 960 },
  hero: { marginBottom: 40 },
  eyebrow: {
    fontSize: 12, fontWeight: 700, color: "#5A5855",
    textTransform: "uppercase", letterSpacing: "0.08em",
    display: "block", marginBottom: 12, margin: "0 0 12px",
  },
  heroTitle: {
    fontSize: 36, fontWeight: 700, lineHeight: 1.2,
    letterSpacing: "-0.025em", color: "#1A1A18",
    margin: "0 0 16px",
  },
  heroDesc: { fontSize: 18, color: "#3A3A38", lineHeight: 1.7, margin: 0, maxWidth: 520 },
  filterTitle: { fontSize: 28, fontWeight: 700, color: "#1A1A18", margin: "0 0 24px", letterSpacing: "-0.02em" },
  toolGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 14, listStyle: "none", padding: 0, margin: 0,
  },
  card: {
    background: "#FFFFFF", border: "1.5px solid #C8C6BC",
    borderRadius: 12, padding: "18px 20px",
    display: "flex", flexDirection: "column", gap: 8,
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" },
  cardTags: { display: "flex", gap: 6, flexWrap: "wrap", padding: 0, margin: 0 },
  tagChip: {
    fontSize: 12, fontWeight: 700, padding: "3px 8px",
    borderRadius: 20, display: "inline-block",
  },
  statusBadge: {
    fontSize: 13, fontWeight: 700,
    padding: "3px 10px", borderRadius: 20,
    display: "inline-flex", alignItems: "center", gap: 5,
    flexShrink: 0,
  },
  statusIcon: { fontSize: 13, fontWeight: 700 },
  cardName: { fontSize: 18, fontWeight: 700, color: "#1A1A18", margin: 0, letterSpacing: "-0.01em" },
  cardDesc: { fontSize: 16, color: "#3A3A38", lineHeight: 1.6, margin: 0, flex: 1 },
  cardLink: {
    fontSize: 16, color: "#1A1A18",
    textDecoration: "underline", textUnderlineOffset: 3,
    fontWeight: 700, marginTop: 6,
    alignSelf: "flex-start",
    display: "inline-flex", alignItems: "center",
  },
  emptyMsg: { fontSize: 16, color: "#5A5855", fontStyle: "italic" },
  prose: { maxWidth: 600 },
  proseTitle: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "#1A1A18", margin: "0 0 20px" },
  proseBody: { fontSize: 18, color: "#3A3A38", lineHeight: 1.8, margin: "0 0 28px" },
  builtBy: { display: "flex", flexDirection: "column", gap: 10 },
  builtByLabel: { fontSize: 12, color: "#5A5855", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700, margin: 0 },
  tagGrid: { display: "flex", gap: 8, flexWrap: "wrap", padding: 0, margin: 0 },
  tagPill: { fontSize: 16, padding: "5px 14px", borderRadius: 20, fontWeight: 700 },
  changeList: { listStyle: "none", padding: 0, margin: 0 },
  changeEntry: { display: "flex", gap: 20, padding: "16px 0", borderBottom: "1.5px solid #C8C6BC", alignItems: "baseline" },
  changeDate: { fontSize: 14, color: "#5A5855", minWidth: 70, fontWeight: 700, flexShrink: 0 },
  changeText: { fontSize: 16, color: "#3A3A38", lineHeight: 1.6 },
  linkedinLink: {
  display: "inline-flex", alignItems: "center", gap: 8,
  fontSize: 16, fontWeight: 700, color: "#0D5C9E",
  textDecoration: "underline", textUnderlineOffset: 3,
  marginTop: 16,
},
linkedinIcon: {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 24, height: 24, borderRadius: 4,
  background: "#0D5C9E", color: "#FFFFFF",
  fontSize: 13, fontWeight: 700,
  builtByWithMargin: { display: "flex", flexDirection: "column", gap: 10, marginTop: 32 },
},
};