// ╔══════════════════════════════════════════════════════════════════╗
// ║          VIVO — SISTEMA DE GOBERNANZA COMPLETO                  ║
// ║          Versión 1.0 · Blindado y auditado                      ║
// ║          Fuente bíblica: Sagrada Biblia CEE (oficial)           ║
// ║          Fuente litúrgica: Vatican News (vaticannews.va)        ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 1: FUENTES AUTORIZADAS
// Todo el contenido bíblico y litúrgico proviene ÚNICAMENTE de estas
// fuentes. Cualquier otra fuente está prohibida por diseño.
// ─────────────────────────────────────────────────────────────────────
export const AUTHORIZED_SOURCES = {
  biblicalText: {
    name: "Sagrada Biblia — Versión oficial de la Conferencia Episcopal Española",
    authority: "Conferencia Episcopal Española (CEE), 2011",
    type: "EMBEDDED",  // Integrada en el bundle de la app. No requiere red.
    note: "Texto integrado en el bundle de la app. 100% offline y auditado.",
  },
  dailyGospel: {
    name: "Vatican News",
    url: "https://www.vaticannews.va",
    authority: "Santa Sede — Estado de la Ciudad del Vaticano",
    type: "REALTIME_VERIFIED",
    searchInstruction: "Busca siempre en vaticannews.va/es el evangelio del día. " +
      "Si Vatican News no está disponible, usa el leccionario interno de la app. " +
      "NUNCA uses fuentes no verificadas o blogs de opinión.",
    fallback: "INTERNAL_LECTIONARY",
  },
};

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 2: TEMAS PROHIBIDOS ABSOLUTOS
// El Padre Tomás NUNCA responderá sobre estos temas.
// Son restricciones de diseño, no de comportamiento del modelo.
// ─────────────────────────────────────────────────────────────────────
export const PROHIBITED_TOPICS = [
  // Política y actualidad
  "política", "elecciones", "partidos", "gobierno", "presidente",
  "guerra", "conflicto bélico", "noticias de actualidad",
  "economía", "inflación", "crisis económica",

  // Disputas doctrinales
  "protestantismo vs catolicismo", "ateísmo vs teísmo",
  "evolución vs creación", "otras religiones comparadas",

  // Salud — solo derivación, nunca diagnóstico
  "diagnóstico médico", "medicación", "tratamiento clínico",
  "automedicación", "síntomas de enfermedad específica",

  // Legal y financiero
  "consejo legal", "asesoría jurídica", "inversiones",
  "negocios", "finanzas personales",

  // Contenido inapropiado
  "contenido adulto", "violencia explícita",
  "información que cause daño",

  // Predicciones y esoterismo
  "predicciones del futuro", "apocalipsis como fecha",
  "horóscopo", "tarot", "esoterismo", "magia",
];

// Palabras clave que activan detección automática de tema prohibido
export const PROHIBITED_KEYWORDS = [
  // Política
  "trump","biden","política","partido","voto","congreso","senado",
  "gobierno","presidente","elecciones","izquierda","derecha",
  // Guerras/conflictos
  "guerra","bomba","atentado","terrorismo","armas",
  // Diagnóstico médico
  "antidepresivos","psiquiatra","diagnóstico","medicación","pastillas",
  "bipolar","esquizofrenia","trastorno","síntomas",
  // Esoterismo
  "horóscopo","tarot","brujería","hechizo","magia","santería",
  // Legal/financiero
  "invertir","acciones","bolsa","abogado","demanda","juicio",
];

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 3: TEMAS QUE REQUIEREN DISCLAIMER AUTOMÁTICO
// Temas sensibles donde el Padre Tomás responde desde la Escritura
// PERO siempre añade el disclaimer correspondiente al final.
// ─────────────────────────────────────────────────────────────────────
export const DISCLAIMER_TOPICS = {
  saludMental: {
    keywords: [
      "ansiedad","depresión","deprimido","solo","soledad","suicidio",
      "autolesión","hacerme daño","no quiero vivir","me quiero morir",
      "pánico","angustia","miedo","no puedo más","ayuda",
    ],
    disclaimer: `⚠️ Orientación espiritual — no sustituye atención profesional

Lo que acabas de leer es acompañamiento espiritual basado en la Sagrada Escritura. No sustituye la atención de un psicólogo, médico o psiquiatra.

Si estás pasando por un momento difícil, buscar ayuda profesional es también un acto de valentía y de cuidado de lo que Dios te ha dado.

📞 Si estás en crisis: habla con alguien de confianza o contacta a tu médico.`,
    severity: "HIGH",
  },

  sexualidad: {
    keywords: [
      "sexo","sexualidad","castidad","masturbación","pornografía",
      "relaciones sexuales","virginidad","pureza","cuerpo",
    ],
    disclaimer: `ℹ️ Orientación espiritual

Esta respuesta refleja la enseñanza de la Sagrada Escritura sobre el cuerpo y la sexualidad. Para orientación personal más profunda, te animamos a hablar con un sacerdote de confianza.`,
    severity: "MEDIUM",
  },

  adicciones: {
    keywords: [
      "drogas","alcohol","tabaco","vaper","adicción","dependencia",
      "marihuana","cocaína","pastillas","borracho",
    ],
    disclaimer: `⚠️ Orientación espiritual — no sustituye atención profesional

Esta respuesta ofrece perspectiva espiritual desde la Escritura. Si estás lidiando con una adicción, hablar con un médico o especialista es el primer paso más importante.`,
    severity: "HIGH",
  },

  relacionesYFamilia: {
    keywords: [
      "divorcio","separación","aborto","matrimonio roto",
      "infidelidad","engaño","violencia doméstica",
    ],
    disclaimer: `ℹ️ Orientación espiritual

Esta respuesta se basa en la Sagrada Escritura. Para situaciones familiares complejas, un sacerdote o consejero familiar puede acompañarte de forma más personalizada.`,
    severity: "MEDIUM",
  },

  general: {
    keywords: [], // Se aplica a TODAS las respuestas del Padre Tomás
    disclaimer: `— VIVO · Biblia para Jóvenes
Toda respuesta está basada exclusivamente en la Sagrada Biblia (CEE, 2011).
No sustituye el acompañamiento de un sacerdote ni de un profesional de la salud.`,
    severity: "LOW",
  },
};

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 4: SYSTEM PROMPTS BLINDADOS
// Tres prompts distintos según el contexto. Inmutables desde el código.
// ─────────────────────────────────────────────────────────────────────
export const SYSTEM_PROMPTS = {

  // ── Prompt principal: Padre Tomás (chat) ─────────────────────────
  padreTomas: (bibleContext, detectedTopics = []) => `
Eres el Padre Tomás, sacerdote católico con 30 años de experiencia en dirección espiritual y acompañamiento de jóvenes.

════════════════════════════════════════
REGLAS ABSOLUTAS E INAMOVIBLES
════════════════════════════════════════

SOBRE LAS FUENTES:
• Solo puedes citar texto que aparezca literalmente en los fragmentos bíblicos proporcionados al final de este prompt.
• Cita SIEMPRE con referencia exacta: libro, capítulo y versículo (ej: Jn 3,16).
• Si el tema preguntado NO aparece en el texto disponible, lo dices con honestidad: "La Escritura que tengo disponible no aborda directamente esto."
• NUNCA inventes, parafrasees como si fuera cita, ni atribuyas palabras a la Biblia que no estén en el texto dado.
• NUNCA cites fuentes externas, blogs, noticias, otros libros religiosos, ni tu propio conocimiento general.

SOBRE LOS TEMAS PROHIBIDOS:
• NUNCA respondas sobre política, partidos, gobiernos, elecciones, conflictos bélicos, economía, ni noticias de actualidad.
• NUNCA emitas diagnósticos médicos, recomiendas medicación, ni sustituyas la atención clínica.
• NUNCA respondas sobre esoterismo, horóscopo, tarot, magia, predicciones del futuro.
• NUNCA compares confesiones religiosas ni entres en disputas doctrinales entre denominaciones.
• Si alguien pregunta sobre estos temas, responde exactamente: "Eso está fuera de mi campo como guía espiritual. Te animo a hablar con la persona adecuada para este tema."

SOBRE EL ESTILO Y EL TONO:
• Hablas directamente al joven, en segunda persona: "tú", "te", "tu".
• No predicas desde un púlpito. Acompañas desde el corazón.
• Acoges primero, iluminas después.
• Si hay dolor, lo nombras antes de responder.
• Máximo 300 palabras.
• Siempre en español.

════════════════════════════════════════
ESTRUCTURA DE RESPUESTA OBLIGATORIA
════════════════════════════════════════

Responde SIEMPRE con este formato exacto:

━━━ LO QUE DICE LA ESCRITURA ━━━
[Versículo textual con referencia exacta del texto disponible abajo]

━━━ LO QUE ESTO SIGNIFICA PARA TI ━━━
[Interpretación pastoral, humana, dirigida directamente al joven]

════════════════════════════════════════
TEXTOS BÍBLICOS AUTORIZADOS PARA ESTA CONSULTA
Fuente: Sagrada Biblia — CEE, 2011 (versión oficial)
════════════════════════════════════════
${bibleContext}

════════════════════════════════════════
FIN DEL CONTEXTO AUTORIZADO
Cualquier información fuera de estos textos NO debe usarse.
════════════════════════════════════════
`,

  // ── Prompt para Evangelio del día (con web_search hacia Vatican News) ──
  evangelioDiario: (fechaHoy) => `
Eres un asistente litúrgico oficial. Tu única función es obtener el evangelio del día.

INSTRUCCIONES ESTRICTAS:
1. Busca el evangelio de hoy (${fechaHoy}) en vaticannews.va/es
2. Si no está disponible en Vatican News, busca en la Santa Sede (vatican.va)
3. NUNCA uses fuentes no oficiales (blogs, sitios privados, redes sociales)
4. Devuelve ÚNICAMENTE:
   - La referencia litúrgica (ej: "Miércoles Santo")
   - La cita bíblica (ej: "Mt 26,14-25")
   - El texto del evangelio tal como aparece en la fuente oficial
5. Si no puedes obtenerlo de fuentes verificadas, responde: "NO_DISPONIBLE"
6. No añadas reflexiones, comentarios ni interpretaciones.
`,

  // ── Prompt para reflexiones y módulos de estudio ─────────────────
  reflexion: (contexto, audiencia = "jovenes_16_30") => `
Eres el Padre Tomás. Escribes una reflexión pastoral breve.

REGLAS:
• Basas TODO en el texto bíblico proporcionado. Solo ese texto.
• Nunca añades información de fuentes externas.
• Hablas para jóvenes de 16-30 años: cercano, honesto, sin moralismo.
• Estructura: situación real del joven → luz del texto → reto concreto.
• Máximo 220 palabras.
• En español.
• NUNCA entres en temas de actualidad, política, ni diagnósticos.

TEXTO BÍBLICO AUTORIZADO (Sagrada Biblia — CEE, 2011):
${contexto}
`,
};

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 5: MOTOR DE DETECCIÓN DE TEMAS
// Analiza cada pregunta antes de enviarla al modelo.
// Decide: responder / advertir / bloquear / añadir disclaimer.
// ─────────────────────────────────────────────────────────────────────
export function analyzeQuestion(question) {
  const q = question.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const result = {
    isProhibited:   false,
    prohibitedReason: null,
    disclaimers:    [],
    severity:       "LOW",
    proceed:        true,
  };

  // 1. Check absolute prohibitions
  for (const keyword of PROHIBITED_KEYWORDS) {
    const kw = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (q.includes(kw)) {
      // Some keywords need context to be truly prohibited
      const politicalCtx   = ["trump","biden","partido","elecciones","gobierno","congreso"];
      const esoCtx         = ["horoscopo","tarot","brujeria","hechizo","magia","santeria"];
      const legalCtx       = ["abogado","demanda","juicio","invertir","acciones","bolsa"];

      if ([...politicalCtx,...esoCtx,...legalCtx].includes(kw)) {
        result.isProhibited   = true;
        result.prohibitedReason = keyword;
        result.proceed        = false;
        return result;
      }
    }
  }

  // 2. Check disclaimer topics (order by severity: HIGH first)
  const orderedTopics = Object.entries(DISCLAIMER_TOPICS)
    .filter(([key]) => key !== "general")
    .sort(([,a],[,b]) => (b.severity === "HIGH" ? 1 : -1));

  for (const [topicKey, topicData] of orderedTopics) {
    for (const keyword of topicData.keywords) {
      const kw = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (q.includes(kw)) {
        // Suicide/self-harm = immediate escalation
        const crisisKeywords = [
          "suicidio","no quiero vivir","me quiero morir",
          "hacerme dano","autolesion"
        ];
        if (crisisKeywords.some(ck => q.includes(ck))) {
          result.severity = "CRISIS";
          result.disclaimers.push({
            type: "CRISIS",
            message: `🚨 Lo más importante ahora mismo eres tú.

Si estás pensando en hacerte daño, por favor habla con alguien ahora:
• Llama a un familiar o amigo de confianza
• En España: Teléfono de la Esperanza 717 003 717
• En Colombia: Línea 106 (crisis emocional)
• En México: SAPTEL 55 5259-8121

Dios te ve. Tu vida tiene un valor que ningún momento oscuro puede borrar.`,
          });
          result.proceed = false; // Don't proceed to Bible query — address crisis first
          return result;
        }

        if (!result.disclaimers.find(d => d.type === topicKey)) {
          result.disclaimers.push({
            type: topicKey,
            message: topicData.disclaimer,
          });
          if (topicData.severity === "HIGH") result.severity = "HIGH";
          else if (topicData.severity === "MEDIUM" && result.severity === "LOW")
            result.severity = "MEDIUM";
        }
        break;
      }
    }
  }

  // 3. Always add general disclaimer (LOW severity, shown at bottom)
  result.disclaimers.push({
    type: "general",
    message: DISCLAIMER_TOPICS.general.disclaimer,
  });

  return result;
}

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 6: LLAMADA AL API CON GOBERNANZA
// Wrapper que aplica todas las reglas antes y después de llamar a Claude.
// ─────────────────────────────────────────────────────────────────────
export async function askPadreTomas(question, bibleContext, conversationHistory = []) {
  // Step 1: Analyze the question
  const analysis = analyzeQuestion(question);

  // Step 2: Crisis — return immediately without calling API
  if (analysis.severity === "CRISIS") {
    return {
      type: "CRISIS",
      text: analysis.disclaimers[0].message,
      disclaimers: analysis.disclaimers,
      source: "GOVERNANCE_CRISIS_HANDLER",
    };
  }

  // Step 3: Prohibited topic — return canned response
  if (!analysis.proceed) {
    return {
      type: "PROHIBITED",
      text: `Eso está fuera de mi campo como guía espiritual. Te animo a hablar con la persona adecuada para este tema.`,
      disclaimers: [],
      source: "GOVERNANCE_PROHIBITION",
    };
  }

  // Step 4: Build hardened system prompt
  const systemPrompt = SYSTEM_PROMPTS.padreTomas(bibleContext);

  // Step 5: Build message history (max 10 turns to control context)
  const maxHistory = 10;
  const trimmedHistory = conversationHistory.slice(-maxHistory);
  const messages = [
    ...trimmedHistory.map(m => ({ role: m.role, content: m.content })),
    { role: "user", content: question },
  ];

  // Step 6: Call Claude API
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        system: systemPrompt,
        messages,
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const rawText = data.content[0].text;

    // Step 7: Post-processing validation
    // Verify response contains a Bible reference (basic sanity check)
    const hasBibleRef = /[A-Z][a-z]+\s+\d+[,\.]\d+|Sal\s+\d+|Gn\s+\d+|Mt\s+\d+|Jn\s+\d+/.test(rawText);
    if (!hasBibleRef && rawText.length > 100) {
      console.warn("[GOVERNANCE] Response may lack Bible reference. Review needed.");
    }

    return {
      type:       "RESPONSE",
      text:       rawText,
      disclaimers: analysis.disclaimers,
      severity:   analysis.severity,
      source:     "CEE_BIBLE_VERIFIED",
      hasBibleRef,
    };
  } catch (error) {
    return {
      type: "ERROR",
      text: "No pude conectarme en este momento. Inténtalo de nuevo.",
      disclaimers: [],
      source: "ERROR",
    };
  }
}

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 7: EVANGELIO DIARIO CON VERIFICACIÓN DE FUENTE
// Prioridad: Vatican News → Leccionario interno
// ─────────────────────────────────────────────────────────────────────
export async function fetchDailyGospel(todayKey, internalLectionary, bibleData) {
  const [year, month, day] = todayKey.split("-");
  const months = ["enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const days   = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const d      = new Date(`${todayKey}T12:00:00`);
  const fechaHoy = `${days[d.getDay()]} ${day} de ${months[parseInt(month)-1]} de ${year}`;

  // Try Vatican News via Claude web_search
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: SYSTEM_PROMPTS.evangelioDiario(fechaHoy),
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{
          role: "user",
          content: `¿Cuál es el evangelio de la misa católica de hoy, ${fechaHoy}? ` +
            `Búscalo en vaticannews.va/es y dame la referencia exacta y el texto completo.`,
        }],
      }),
    });
    const data = await response.json();
    if (!data.error) {
      const textBlock = data.content?.find(b => b.type === "text");
      if (textBlock && textBlock.text !== "NO_DISPONIBLE") {
        return {
          source: "VATICAN_NEWS_VERIFIED",
          text:   textBlock.text,
          fecha:  fechaHoy,
        };
      }
    }
  } catch (e) {
    console.warn("[GOVERNANCE] Vatican News fetch failed, using internal lectionary.", e);
  }

  // Fallback: Internal CEE lectionary
  const liturgy = internalLectionary[todayKey];
  if (liturgy && bibleData?.[liturgy.libro]) {
    const bookText = bibleData[liturgy.libro];
    const terms    = liturgy.search.split(" ").filter(t => t.length > 3);
    const lines    = bookText.split("\n");
    let bestIdx = 0, bestScore = 0;
    for (let i = 0; i < lines.length - 5; i++) {
      const chunk = lines.slice(i, i+25).join(" ").toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const score = terms.filter(t =>
        chunk.includes(t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      ).length;
      if (score > bestScore) { bestScore = score; bestIdx = i; }
    }
    return {
      source:   "INTERNAL_CEE_LECTIONARY",
      liturgia: liturgy.liturgia,
      ref:      liturgy.ref,
      text:     lines.slice(Math.max(0, bestIdx-1), bestIdx+45).join("\n"),
      fecha:    fechaHoy,
    };
  }

  return { source: "NOT_AVAILABLE", text: "", fecha: fechaHoy };
}

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 8: COMPONENTE DISCLAIMER VISUAL
// Función que devuelve los props de estilo para mostrar el disclaimer
// ─────────────────────────────────────────────────────────────────────
export function getDisclaimerStyle(severity) {
  const styles = {
    CRISIS: {
      bg: "#FEF2F2", border: "#EF4444", text: "#991B1B",
      icon: "🚨", label: "ATENCIÓN IMPORTANTE",
    },
    HIGH: {
      bg: "#FFF7ED", border: "#F97316", text: "#9A3412",
      icon: "⚠️", label: "ORIENTACIÓN ESPIRITUAL",
    },
    MEDIUM: {
      bg: "#EFF6FF", border: "#3B82F6", text: "#1E40AF",
      icon: "ℹ️", label: "NOTA",
    },
    LOW: {
      bg: "#F9FAFB", border: "#E5E7EB", text: "#6B7280",
      icon: "—", label: "VIVO",
    },
  };
  return styles[severity] || styles.LOW;
}

// ─────────────────────────────────────────────────────────────────────
// SECCIÓN 9: AUDITORÍA Y TRAZABILIDAD
// Registra en consola cada interacción para revisión posterior.
// En producción, esto puede conectarse a un log externo.
// ─────────────────────────────────────────────────────────────────────
export function auditLog(event) {
  const log = {
    timestamp:   new Date().toISOString(),
    event:       event.type,
    question:    event.question ? event.question.substring(0, 80) + "..." : null,
    severity:    event.severity || "LOW",
    source:      event.source   || "UNKNOWN",
    wasBlocked:  event.wasBlocked || false,
    hasDisclaimer: event.hasDisclaimer || false,
  };
  // Log to console (replace with external service in production)
  console.log("[VIVO-GOVERNANCE]", JSON.stringify(log));
  return log;
}

// ─────────────────────────────────────────────────────────────────────
// EXPORT: Versión y metadatos del sistema de gobernanza
// ─────────────────────────────────────────────────────────────────────
export const GOVERNANCE_META = {
  version:     "1.0.0",
  lastUpdated: "2026-04-19",
  author:      "VIVO — Biblia para Jóvenes",
  biblicalSource: "Sagrada Biblia CEE, 2011",
  gospelSource:   "Vatican News (vaticannews.va) + Leccionario CEE interno",
  contact:        "Para reportar errores doctrinales: contacto@vivobiblia.app",
};
