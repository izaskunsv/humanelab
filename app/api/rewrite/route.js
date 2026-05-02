import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  const { text, audience, textType } = await req.json();

  const audienceLabels = {
    general: "público general adulto",
    "low-literacy": "personas con baja alfabetización (nivel lector equivalente a 6º de primaria)",
    dyslexia: "personas con dislexia o TDAH (frases muy cortas, máx 12 palabras, estructura visual clara)",
    nonnative: "personas no nativas del idioma (vocabulario simple, sin modismos)",
    elder: "personas mayores (evitar tecnicismos, tono cálido, instrucciones muy claras)",
  };

  const typeLabels = {
    legal: "texto legal o contractual",
    medical: "texto médico o de salud",
    bureaucratic: "texto burocrático o de formulario administrativo",
    financial: "texto financiero o bancario",
  };

  const systemPrompt = `Eres un experto en plain language y accesibilidad comunicativa. Reescribe textos complejos en lenguaje claro.

Audiencia: ${audienceLabels[audience] || "público general"}.
Tipo de texto: ${typeLabels[textType] || "texto general"}.

Reglas:
- Frases cortas (máximo 20 palabras)
- Voz activa siempre
- Una idea por párrafo
- Sustituye términos técnicos por palabras del día a día
- Mantén toda la información importante
- Si hay plazos o requisitos importantes, ponlos en una línea propia

Después del texto simplificado, añade una línea en blanco y escribe exactamente:
CAMBIOS: [cambio 1] | [cambio 2] | [cambio 3]`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: text }],
  });

  return Response.json({ result: message.content[0].text });
}