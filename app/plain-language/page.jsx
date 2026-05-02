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
      <div style={s.container}>
        <a href="/" style={s.back}>← Humane Lab</a>
        <div style={s.header}>
          <h1 style={s.title}>Plain language</h1>
          <p style={s.subtitle}>Convierte textos complejos en lenguaje claro y accesible</p>
        </div>
        <div style={s.controlRow}>
          <div style={s.controlGroup}>
            <div style={s.label}>Audiencia</div>
            <div style={s.pillRow}>
              {AUDIENCES.map((a) => (
                <button key={a.id} style={{ ...s.pill, ...(audience === a.id ? s.pillActive : {}) }} onClick={() => setAudience(a.id)} aria-pressed={audience === a.id}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div style={s.controlGroup}>
            <div style={s.label}>Tipo de texto</div>
            <div style={s.pillRow}>
              {TEXT_TYPES.map((t) => (
                <button key={t.id} style={{ ...s.pill, ...(textType === t.id ? s.pillActive : {}) }} onClick={() => setTextType(t.id)} aria-pressed={textType === t.id}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={s.columns}>
          <div style={s.col}>
            <div style={s.colHeader}>
              <label htmlFor="input-text" style={s.label}>Texto original</label>
            </div>
            <textarea id="input-text" style={s.textarea} placeholder="Pega aquí el texto complejo..." value={inputText} onChange={(e) => setInputText(e.target.value)} aria-label="Texto original a simplificar" />
            <button style={s.linkBtn} onClick={loadSample}>Cargar ejemplo →</button>
          </div>
          <div style={s.col}>
            <div style={s.colHeader}>
              <label style={s.label}>Versión simplificada</label>
            </div>
            <div style={{ ...s.outputBox }} role="region" aria-live="polite" aria-label="Resultado simplificado">
              {loading ? <p style={s.placeholder}>Simplificando...</p>
                : outputText ? <p style={s.outputText}>{outputText}</p>
                : <p style={s.placeholder}>El resultado aparecerá aquí...</p>}
            </div>
            {outputText && (
              <button style={s.linkBtn} onClick={copyOutput}>{copied ? "Copiado ✓" : "Copiar texto"}</button>
            )}
          </div>
        </div>
        <div style={s.actionRow}>
          <button style={{ ...s.btnPrimary, opacity: loading || !inputText.trim() ? 0.4 : 1 }} onClick={rewrite} disabled={loading || !inputText.trim()} aria-busy={loading}>
            {loading ? "Simplificando..." : "Simplificar texto"}
          </button>
        </div>
        {error && <div style={s.errorBox} role="alert">{error}</div>}
        {changes.length > 0 && (
          <div style={s.changesRow}>
            <div style={s.label}>Cambios aplicados</div>
            <div style={s.chipsRow}>
              {changes.map((c, i) => <span key={i} style={s.chip}>{c}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#FAFAF8", padding: "2rem 1rem", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" },
  container: { maxWidth: 860, margin: "0 auto" },
  back: { fontSize: 13, color: "#888780", textDecoration: "none", display: "block", marginBottom: 24 },
  header: { marginBottom: "2rem" },
  title: { fontSize: 28, fontWeight: 500, color: "#1a1a18", margin: 0, letterSpacing: "-0.02em" },
  subtitle: { fontSize: 15, color: "#888780", margin: "4px 0 0" },
  controlRow: { display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" },
  controlGroup: { flex: 1, minWidth: 200 },
  label: { fontSize: 11, fontWeight: 500, color: "#888780", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "block" },
  pillRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  pill: { fontSize: 13, padding: "5px 12px", borderRadius: 20, border: "0.5px solid #D3D1C7", background: "transparent", color: "#5F5E5A", cursor: "pointer", fontFamily: "inherit" },
  pillActive: { background: "#1a1a18", color: "#fff", border: "0.5px solid transparent" },
  columns: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 },
  col: { display: "flex", flexDirection: "column", gap: 8 },
  colHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  textarea: { width: "100%", minHeight: 200, padding: "12px 14px", fontSize: 14, lineHeight: 1.7, border: "0.5px solid #D3D1C7", borderRadius: 10, background: "#fff", color: "#1a1a18", resize: "vertical", fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  outputBox: { minHeight: 200, padding: "12px 14px", fontSize: 14, lineHeight: 1.7, border: "0.5px solid #D3D1C7", borderRadius: 10, background: "#fff" },
  outputText: { margin: 0, fontSize: 14, lineHeight: 1.8, color: "#1a1a18", whiteSpace: "pre-wrap" },
  placeholder: { margin: 0, color: "#B4B2A9", fontSize: 14, fontStyle: "italic" },
  linkBtn: { fontSize: 12, color: "#5F5E5A", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3, alignSelf: "flex-start" },
  actionRow: { display: "flex", justifyContent: "center", marginBottom: 16 },
  btnPrimary: { fontSize: 15, fontWeight: 500, padding: "10px 32px", borderRadius: 8, border: "none", background: "#1a1a18", color: "#fff", cursor: "pointer", fontFamily: "inherit" },
  errorBox: { background: "#FCEBEB", color: "#A32D2D", border: "0.5px solid #F09595", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 12 },
  changesRow: { marginBottom: 16 },
  chipsRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 },
  chip: { fontSize: 12, padding: "4px 10px", borderRadius: 20, background: "#F1EFE8", color: "#444441" },
};