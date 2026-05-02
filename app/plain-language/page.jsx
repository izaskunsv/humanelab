"use client";
import { useState } from "react";

const AUDIENCES = [
  { id: "general", label: "Público general" },
  { id: "low-literacy", label: "Baja alfabetización" },
  { id: "dyslexia", label: "Dislexia / TDAH" },
  { id: "nonnative", label: "No nativo" },
  { id: "elder", label: "Persona mayor" },
];

const TEXT_TYPES = [
  { id: "legal", label: "Legal / contrato" },
  { id: "medical", label: "Médico / salud" },
  { id: "bureaucratic", label: "Burocrático" },
  { id: "financial", label: "Financiero" },
];

const SAMPLES = {
  legal: "El presente instrumento contractual establece los términos y condiciones bajo los cuales el ARRENDADOR cede el uso y goce temporal del inmueble al ARRENDATARIO. El ARRENDATARIO queda obligado a satisfacer la renta convenida dentro de los primeros cinco días naturales de cada mes, bajo apercibimiento de que el incumplimiento reiterado de dicha obligación facultará al ARRENDADOR para instar la resolución del presente contrato.",
  medical: "El paciente presenta cuadro de hipertensión arterial esencial de grado II con afectación de órgano diana a nivel cardiovascular. Se prescribe tratamiento con inhibidor de la enzima convertidora de angiotensina, debiendo el paciente abstenerse de la ingesta concomitante de antiinflamatorios no esteroideos dada la potencial interacción farmacológica.",
  bureaucratic: "En virtud de lo establecido en el artículo 14.3 del Reglamento de Prestaciones Económicas por Desempleo, el solicitante deberá acreditar fehacientemente la situación de desempleo involuntario, siendo preceptiva la presentación de documentación en el plazo improrrogable de quince días hábiles desde la fecha de cese de la relación laboral.",
  financial: "El presente instrumento financiero conlleva un Tipo Anual Equivalente variable sujeto a revisión semestral en función del índice de referencia Euríbor a 12 meses, con un diferencial aplicable de 1,25 puntos porcentuales, sin perjuicio de la aplicación de la cláusula suelo establecida en el 0,5%.",
};

const s = {
  page: { minHeight: "100vh", background: "#F5F4F0", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1A1A18" },
  skipLink: { position: "fixed", top: "-100px", left: 16, zIndex: 9999, background: "#1A1A18", color: "#FFFFFF", padding: "10px 20px", borderRadius: 4, fontWeight: 700, textDecoration: "none", fontSize: 16 },
  topBar: { background: "#FFFFFF", borderBottom: "1.5px solid #C8C6BC", padding: "12px 48px", display: "flex", alignItems: "center", gap: 16 },
  logo: { fontSize: 16, fontWeight: 700, color: "#1A1A18", letterSpacing: "-0.01em", textDecoration: "none" },
  topBarSep: { color: "#C8C6BC", fontSize: 16 },
  breadcrumbNav: { display: "flex", alignItems: "center" },
  breadcrumbList: { display: "flex", alignItems: "center", gap: 8, listStyle: "none", margin: 0, padding: 0 },
  breadcrumbLink: { fontSize: 16, color: "#0D5C9E", textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 600 },
  breadcrumbSep: { fontSize: 14, color: "#5A5855" },
  breadcrumbCurrent: { fontSize: 16, color: "#3A3A38" },
  main: { maxWidth: 900, margin: "0 auto", padding: "40px 48px" },
  header: { marginBottom: 32 },
  title: { fontSize: 36, fontWeight: 700, color: "#1A1A18", margin: "0 0 8px", letterSpacing: "-0.02em" },
  subtitle: { fontSize: 18, color: "#3A3A38", margin: 0 },
  controlRow: { display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" },
  controlGroup: { flex: 1, minWidth: 200 },
  label: { fontSize: 12, fontWeight: 700, color: "#5A5855", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "block" },
  pillRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  pill: { fontSize: 16, padding: "6px 14px", borderRadius: 20, border: "1.5px solid #C8C6BC", background: "transparent", color: "#2A2A28", cursor: "pointer", fontFamily: "inherit", fontWeight: 400 },
  pillActive: { background: "#1A1A18", color: "#FFFFFF", border: "1.5px solid #1A1A18", fontWeight: 700 },
  divider: { height: "1.5px", background: "#C8C6BC", margin: "16px 0" },
  columns: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 },
  col: { display: "flex", flexDirection: "column", gap: 8 },
  colHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  textarea: { width: "100%", minHeight: 200, padding: "14px 16px", fontSize: 16, lineHeight: 1.7, border: "1.5px solid #C8C6BC", borderRadius: 10, background: "#FFFFFF", color: "#1A1A18", resize: "vertical", fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  outputBox: { minHeight: 200, padding: "14px 16px", fontSize: 16, lineHeight: 1.7, border: "1.5px solid #C8C6BC", borderRadius: 10, background: "#FFFFFF" },
  outputText: { margin: 0, fontSize: 16, lineHeight: 1.8, color: "#1A1A18", whiteSpace: "pre-wrap" },
  placeholder: { margin: 0, color: "#5A5855", fontSize: 16, fontStyle: "italic" },
  linkBtn: { fontSize: 16, color: "#0D5C9E", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3, alignSelf: "flex-start", fontWeight: 600 },
  actionRow: { display: "flex", justifyContent: "center", marginBottom: 16 },
  btnPrimary: { fontSize: 16, fontWeight: 700, padding: "12px 36px", borderRadius: 8, border: "none", background: "#1A1A18", color: "#FFFFFF", cursor: "pointer", fontFamily: "inherit" },
  errorBox: { background: "#FDE8C8", color: "#7A2A0D", border: "1.5px solid #F0A070", borderRadius: 8, padding: "12px 16px", fontSize: 16, marginBottom: 12 },
  changesRow: { marginBottom: 16 },
  chipsRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 },
  chip: { fontSize: 14, padding: "4px 12px", borderRadius: 20, background: "#EBEBEB", color: "#2A2A28", fontWeight: 600 },
};

export default function Page() {
  const [audience, setAudience] = useState("general");
  const [textType, setTextType] = useState("legal");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const loadSample = () => {
    setInputText(SAMPLES[textType]);
    setOutputText("");
    setChanges([]);
    setError("");
  };

  const rewrite = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setOutputText("");
    setChanges([]);
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, audience, textType }),
      });
      if (!res.ok) throw new Error("Error al conectar con la API");
      const data = await res.json();
      const parts = data.result.split(/\nCAMBIOS:/);
      setOutputText(parts[0].trim());
      if (parts[1]) setChanges(parts[1].trim().split(" | ").map((c) => c.trim()));
    } catch (e) {
      setError("Error al procesar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={s.page}>
      <a href="#main-content" style={s.skipLink}>Ir al contenido principal</a>

      {/* Barra superior con logo + breadcrumb */}
      <header style={s.topBar} role="banner">
        <a href="/" style={s.logo} aria-label="Humane Lab — ir a inicio">
          Humane Lab
        </a>
        <span style={s.topBarSep} aria-hidden="true">/</span>
        <nav aria-label="Ruta de navegación" style={s.breadcrumbNav}>
          <ol style={s.breadcrumbList} role="list">
            <li>
              <a href="/" style={s.breadcrumbLink}>Inicio</a>
            </li>
            <li style={s.breadcrumbSep} aria-hidden="true">/</li>
            <li>
              <span style={s.breadcrumbCurrent} aria-current="page">Plain language</span>
            </li>
          </ol>
        </nav>
      </header>

      <main id="main-content" style={s.main} tabIndex={-1}>
        <div style={s.header}>
          <h1 style={s.title}>Plain language</h1>
          <p style={s.subtitle}>Convierte textos complejos en lenguaje claro y accesible</p>
        </div>

        <div style={s.controlRow}>
          <div style={s.controlGroup}>
            <label style={s.label} id="audience-label">Audiencia</label>
            <div style={s.pillRow} role="group" aria-labelledby="audience-label">
              {AUDIENCES.map((a) => (
                <button
                  key={a.id}
                  style={{ ...s.pill, ...(audience === a.id ? s.pillActive : {}) }}
                  onClick={() => setAudience(a.id)}
                  aria-pressed={audience === a.id}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div style={s.controlGroup}>
            <label style={s.label} id="type-label">Tipo de texto</label>
            <div style={s.pillRow} role="group" aria-labelledby="type-label">
              {TEXT_TYPES.map((t) => (
                <button
                  key={t.id}
                  style={{ ...s.pill, ...(textType === t.id ? s.pillActive : {}) }}
                  onClick={() => setTextType(t.id)}
                  aria-pressed={textType === t.id}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={s.divider} role="separator" />

        <div style={s.columns}>
          <div style={s.col}>
            <div style={s.colHeader}>
              <label htmlFor="input-text" style={s.label}>Texto original</label>
            </div>
            <textarea
              id="input-text"
              style={s.textarea}
              placeholder="Pega aquí el texto complejo..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label="Texto original a simplificar"
              aria-required="true"
            />
            <button style={s.linkBtn} onClick={loadSample} type="button">
              Cargar ejemplo →
            </button>
          </div>

          <div style={s.col}>
            <div style={s.colHeader}>
              <span style={s.label} id="output-label">Versión simplificada</span>
            </div>
            <div
              style={s.outputBox}
              role="region"
              aria-live="polite"
              aria-labelledby="output-label"
              aria-busy={loading}
            >
              {loading
                ? <p style={s.placeholder}>Simplificando...</p>
                : outputText
                  ? <p style={s.outputText}>{outputText}</p>
                  : <p style={s.placeholder}>El resultado aparecerá aquí...</p>
              }
            </div>
            {outputText && (
              <button style={s.linkBtn} onClick={copyOutput} type="button" aria-live="polite">
                {copied ? "✓ Copiado" : "Copiar texto"}
              </button>
            )}
          </div>
        </div>

        <div style={s.actionRow}>
          <button
            style={{ ...s.btnPrimary, opacity: loading || !inputText.trim() ? 0.4 : 1 }}
            onClick={rewrite}
            disabled={loading || !inputText.trim()}
            aria-busy={loading}
            type="button"
          >
            {loading ? "Simplificando..." : "Simplificar texto"}
          </button>
        </div>

        {error && (
          <div style={s.errorBox} role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        {changes.length > 0 && (
          <section style={s.changesRow} aria-label="Cambios aplicados">
            <h2 style={{ ...s.label, marginBottom: 8 }}>Cambios aplicados</h2>
            <ul style={s.chipsRow} role="list">
              {changes.map((c, i) => (
                <li key={i} style={{ listStyle: "none" }}>
                  <span style={s.chip}>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <style>{`
        a[href="#main-content"]:focus { top: 8px !important; outline: 3px solid #1A1A18; outline-offset: 2px; }
        *:focus-visible { outline: 3px solid #0D5C9E !important; outline-offset: 2px !important; border-radius: 4px !important; }
        @media (max-width: 768px) {
          .humane-topbar { padding: 12px 16px !important; }
          .humane-main { padding: 24px 16px !important; }
          .humane-columns { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}