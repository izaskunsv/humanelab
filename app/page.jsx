"use client";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const i18n = {
  es: {
    nav: { all: "Todas", a11y: "Accesibilidad", be: "Economía conductual", ux: "UX", about: "Sobre esto", changelog: "Novedades" },
    hero: {
      eyebrow: "Laboratorio de herramientas",
      title: "Diseño más humano,\nuna utilidad a la vez.",
      desc: "Una colección de herramientas pequeñas construidas en la intersección de accesibilidad, economía conductual y UX. Libres, abiertas e iteradas en público.",
    },
    tools: { status: { live: "Disponible", soon: "Próximamente", wip: "En desarrollo" }, open: "Abrir →" },
    about: {
      title: "Por qué existe esto",
      body: "La accesibilidad, la economía conductual y el UX comparten un objetivo: reducir la distancia entre las personas y lo que necesitan hacer. Este laboratorio es un espacio para explorar esa intersección con herramientas concretas, compartibles y útiles.",
      built: "Construido por",
    },
    changelog: {
      title: "Novedades",
      entries: [
        { date: "Abr 2025", text: "Plain language rewriter — primera herramienta publicada." },
        { date: "Próx.", text: "Dark pattern detector — en desarrollo." },
      ],
    },
    lang: "EN",
  },
  en: {
    nav: { all: "All", a11y: "Accessibility", be: "Behavioural economics", ux: "UX", about: "About", changelog: "Changelog" },
    hero: {
      eyebrow: "Tools laboratory",
      title: "More humane design,\none utility at a time.",
      desc: "A collection of small tools built at the intersection of accessibility, behavioural economics and UX. Free, open, and iterated in public.",
    },
    tools: { status: { live: "Live", soon: "Coming soon", wip: "In progress" }, open: "Open →" },
    about: {
      title: "Why this exists",
      body: "Accessibility, behavioural economics and UX share one goal: reducing the distance between people and what they need to do. This lab is a space to explore that intersection with concrete, shareable, useful tools.",
      built: "Built by",
    },
    changelog: {
      title: "Changelog",
      entries: [
        { date: "Apr 2025", text: "Plain language rewriter — first tool published." },
        { date: "Next", text: "Dark pattern detector — in development." },
      ],
    },
    lang: "ES",
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
    id: "dark-pattern",
    name: { es: "Dark pattern detector", en: "Dark pattern detector" },
    desc: { es: "Identifica patrones manipulativos en flujos e interfaces.", en: "Identifies manipulative patterns in flows and interfaces." },
    tags: ["be", "ux"],
    status: "soon",
    url: null,
  },
  {
    id: "copy-nudge",
    name: { es: "Copy nudge analyzer", en: "Copy nudge analyzer" },
    desc: { es: "Mapea microcopy a sesgos cognitivos y sugiere mejoras.", en: "Maps microcopy to cognitive biases and suggests improvements." },
    tags: ["be", "ux"],
    status: "soon",
    url: null,
  },
  {
    id: "empathy-mode",
    name: { es: "Empathy mode", en: "Empathy mode" },
    desc: { es: "Simula tu interfaz con condiciones reales de uso.", en: "Simulates your interface under real usage conditions." },
    tags: ["a11y", "be", "ux"],
    status: "wip",
    url: null,
  },
  {
    id: "pricing-psychology",
    name: { es: "Pricing psychology", en: "Pricing psychology" },
    desc: { es: "Audita tu página de precios con principios de economía conductual.", en: "Audits your pricing page with behavioural economics principles." },
    tags: ["be"],
    status: "wip",
    url: null,
  },
  {
    id: "form-friction",
    name: { es: "Form friction auditor", en: "Form friction auditor" },
    desc: { es: "Detecta puntos de fricción en formularios y flujos.", en: "Detects friction points in forms and flows." },
    tags: ["a11y", "ux"],
    status: "wip",
    url: null,
  },
];

const TAG_META = {
  a11y:  { label: { es: "Accesibilidad", en: "Accessibility" },         color: "#1D9E75", bg: "#E1F5EE", text: "#0F6E56" },
  be:    { label: { es: "Economía conductual", en: "Behavioural econ" }, color: "#7F77DD", bg: "#EEEDFE", text: "#3C3489" },
  ux:    { label: { es: "UX", en: "UX" },                               color: "#378ADD", bg: "#E6F1FB", text: "#0C447C" },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Page() {
  const [lang, setLang] = useState("es");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("tools");
  const t = i18n[lang];

  const filteredTools = TOOLS.filter(tool =>
    activeFilter === "all" || tool.tags.includes(activeFilter)
  );

  const navItems = [
    { id: "all",   label: t.nav.all,   section: "tools" },
    { id: "a11y",  label: t.nav.a11y,  section: "tools" },
    { id: "be",    label: t.nav.be,    section: "tools" },
    { id: "ux",    label: t.nav.ux,    section: "tools" },
  ];

  return (
    <div style={s.page}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.logoWrap}>
          <span style={s.logoMark} />
          <span style={s.logoText}>Humane<br />toolkit</span>
        </div>

        <nav style={s.nav}>
          <div style={s.navSection}>{lang === "es" ? "Herramientas" : "Tools"}</div>
          {navItems.map(item => (
            <button
              key={item.id}
              style={{
                ...s.navItem,
                ...(activeFilter === item.id && activeSection === "tools" ? s.navItemActive : {}),
              }}
              onClick={() => { setActiveFilter(item.id); setActiveSection("tools"); }}
            >
              {item.id !== "all" && (
                <span style={{ ...s.navDot, background: TAG_META[item.id].color }} />
              )}
              {item.label}
            </button>
          ))}

          <div style={{ ...s.navSection, marginTop: 20 }}>{lang === "es" ? "Proyecto" : "Project"}</div>
          <button
            style={{ ...s.navItem, ...(activeSection === "about" ? s.navItemActive : {}) }}
            onClick={() => setActiveSection("about")}
          >
            {t.nav.about}
          </button>
          <button
            style={{ ...s.navItem, ...(activeSection === "changelog" ? s.navItemActive : {}) }}
            onClick={() => setActiveSection("changelog")}
          >
            {t.nav.changelog}
          </button>
        </nav>

        <button style={s.langToggle} onClick={() => setLang(lang === "es" ? "en" : "es")}>
          {t.lang}
        </button>
      </aside>

      {/* Main */}
      <main style={s.main}>

        {/* Hero — only on tools section */}
        {activeSection === "tools" && activeFilter === "all" && (
          <div style={s.hero}>
            <span style={s.eyebrow}>{t.hero.eyebrow}</span>
            <h1 style={s.heroTitle}>{t.hero.title}</h1>
            <p style={s.heroDesc}>{t.hero.desc}</p>
          </div>
        )}

        {/* Tools grid */}
        {activeSection === "tools" && (
          <div style={s.toolGrid}>
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} lang={lang} t={t} />
            ))}
            {/* Empty slot */}
            <div style={s.addCard}>
              <span style={s.addIcon}>+</span>
              <span style={s.addLabel}>{lang === "es" ? "próxima herramienta" : "next tool"}</span>
            </div>
          </div>
        )}

        {/* About section */}
        {activeSection === "about" && (
          <div style={s.prose}>
            <h2 style={s.proseTitle}>{t.about.title}</h2>
            <p style={s.proseBody}>{t.about.body}</p>
            <div style={s.builtBy}>
              <span style={s.builtByLabel}>{t.about.built}</span>
              <div style={s.tagGrid}>
                {Object.entries(TAG_META).map(([key, meta]) => (
                  <span key={key} style={{ ...s.tagPill, background: meta.bg, color: meta.text }}>
                    {meta.label[lang]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Changelog section */}
        {activeSection === "changelog" && (
          <div style={s.prose}>
            <h2 style={s.proseTitle}>{t.changelog.title}</h2>
            {t.changelog.entries.map((entry, i) => (
              <div key={i} style={s.changeEntry}>
                <span style={s.changeDate}>{entry.date}</span>
                <span style={s.changeText}>{entry.text}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Tool Card ────────────────────────────────────────────────────────────────

function ToolCard({ tool, lang, t }) {
  const statusStyles = {
    live:  { bg: "#E1F5EE", color: "#0F6E56" },
    soon:  { bg: "#FAEEDA", color: "#633806" },
    wip:   { bg: "#F1EFE8", color: "#5F5E5A" },
  };
  const st = statusStyles[tool.status];

  return (
    <div style={{ ...s.card, opacity: tool.status === "live" ? 1 : 0.82 }}>
      <div style={s.cardTop}>
        <div style={s.cardTags}>
          {tool.tags.map(tag => (
            <span key={tag} style={{ ...s.dot, background: TAG_META[tag].color }} title={TAG_META[tag].label[lang]} />
          ))}
        </div>
        <span style={{ ...s.statusBadge, background: st.bg, color: st.color }}>
          {t.tools.status[tool.status]}
        </span>
      </div>
      <p style={s.cardName}>{tool.name[lang]}</p>
      <p style={s.cardDesc}>{tool.desc[lang]}</p>
      {tool.url && (
        <a href={tool.url} style={s.cardLink}>{t.tools.open}</a>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    background: "#FAFAF8",
    color: "#1a1a18",
  },
  sidebar: {
    width: 220,
    minWidth: 220,
    background: "#fff",
    borderRight: "0.5px solid #E8E6DF",
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  logoMark: {
    display: "block",
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#1a1a18",
    flexShrink: 0,
  },
  logoText: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.3,
    color: "#1a1a18",
    letterSpacing: "-0.01em",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  navSection: {
    fontSize: 10,
    fontWeight: 500,
    color: "#B4B2A9",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    padding: "0 8px",
    marginBottom: 4,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#5F5E5A",
    background: "none",
    border: "none",
    padding: "7px 8px",
    borderRadius: 6,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    marginBottom: 1,
    transition: "background 0.1s",
  },
  navItemActive: {
    background: "#F1EFE8",
    color: "#1a1a18",
    fontWeight: 500,
  },
  navDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
  },
  langToggle: {
    marginTop: 24,
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: 500,
    color: "#B4B2A9",
    background: "none",
    border: "0.5px solid #E8E6DF",
    borderRadius: 4,
    padding: "3px 8px",
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.04em",
  },
  main: {
    flex: 1,
    padding: "40px 48px",
    maxWidth: 900,
  },
  hero: {
    marginBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 500,
    color: "#B4B2A9",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    display: "block",
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
    color: "#1a1a18",
    margin: "0 0 16px",
    whiteSpace: "pre-line",
  },
  heroDesc: {
    fontSize: 15,
    color: "#888780",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 480,
  },
  toolGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 12,
  },
  card: {
    background: "#fff",
    border: "0.5px solid #E8E6DF",
    borderRadius: 12,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    transition: "border-color 0.15s",
    cursor: "default",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTags: {
    display: "flex",
    gap: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    display: "inline-block",
  },
  statusBadge: {
    fontSize: 10,
    fontWeight: 500,
    padding: "2px 7px",
    borderRadius: 20,
  },
  cardName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1a1a18",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  cardDesc: {
    fontSize: 12,
    color: "#888780",
    lineHeight: 1.6,
    margin: 0,
    flex: 1,
  },
  cardLink: {
    fontSize: 12,
    color: "#1a1a18",
    textDecoration: "none",
    fontWeight: 500,
    marginTop: 4,
    borderBottom: "0.5px solid #1a1a18",
    alignSelf: "flex-start",
    paddingBottom: 1,
  },
  addCard: {
    border: "0.5px dashed #D3D1C7",
    borderRadius: 12,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 120,
  },
  addIcon: {
    fontSize: 20,
    color: "#D3D1C7",
    lineHeight: 1,
  },
  addLabel: {
    fontSize: 11,
    color: "#B4B2A9",
  },
  prose: {
    maxWidth: 560,
  },
  proseTitle: {
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: "-0.02em",
    color: "#1a1a18",
    margin: "0 0 20px",
  },
  proseBody: {
    fontSize: 15,
    color: "#5F5E5A",
    lineHeight: 1.8,
    margin: "0 0 28px",
  },
  builtBy: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  builtByLabel: {
    fontSize: 11,
    color: "#B4B2A9",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontWeight: 500,
  },
  tagGrid: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  tagPill: {
    fontSize: 12,
    padding: "4px 12px",
    borderRadius: 20,
    fontWeight: 500,
  },
  changeEntry: {
    display: "flex",
    gap: 20,
    padding: "14px 0",
    borderBottom: "0.5px solid #E8E6DF",
    alignItems: "baseline",
  },
  changeDate: {
    fontSize: 12,
    color: "#B4B2A9",
    minWidth: 60,
    fontWeight: 500,
    flexShrink: 0,
  },
  changeText: {
    fontSize: 14,
    color: "#5F5E5A",
    lineHeight: 1.6,
  },
};