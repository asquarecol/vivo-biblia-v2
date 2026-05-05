// VIVO - SISTEMA DE GOBERNANZA PASTORAL (9 Capas)

const CRISIS_KEYWORDS = [
  'suicida', 'suicidarme', 'matarme', 'morir', 'muerte', 'fin de la vida',
  'cortarme', 'autolesión', 'overdosis', 'sobredosis', 'me voy a'
];

const PROHIBITED_TOPICS = [
  'política', 'elecciones', 'voto', 'partido político',
  'horóscopo', 'tarot', 'astrología', 'magia negra', 'brujería',
  'diagnóstico médico', 'receta', 'medicamento', 'tratamiento',
  'inversión', 'bolsa', 'criptomoneda', 'apuestas',
  'drogas', 'cocaína', 'marihuana', 'heroína', 'fentanilo'
];

const CRISIS_PHONES = {
  ES: '024',
  CO: '106',
  MX: '800-290-00-24',
  AR: '130',
  PE: '113'
};

export function detectCrisis(query) {
  const queryLower = query.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => queryLower.includes(keyword));
}

export function isProhibitedTopic(query) {
  const queryLower = query.toLowerCase();
  return PROHIBITED_TOPICS.some(topic => queryLower.includes(topic));
}

export function classifyRiskLevel(query) {
  const queryLower = query.toLowerCase();
  if (detectCrisis(query)) return 'CRISIS';
  return 'LOW';
}

export function getDisclaimer(riskLevel, country = 'ES') {
  const disclaimers = {
    CRISIS: {
      style: 'padding: 12px; background: #ff4444; color: white; border-radius: 8px; border-left: 4px solid #cc0000;',
      icon: '🆘',
      title: 'NECESITAS AYUDA INMEDIATA',
      message: `Si tienes pensamientos suicidas, contacta AHORA: 📞 ${CRISIS_PHONES[country] || '024'}`
    },
    LOW: {
      style: 'padding: 12px; background: #4caf50; color: white; border-radius: 8px;',
      icon: '✨',
      title: 'Reflexión Espiritual',
      message: 'Que la Palabra de Dios ilumine tu búsqueda.'
    }
  };
  return disclaimers[riskLevel] || disclaimers.LOW;
}

export const SYSTEM_PROMPTS = {
  PADRE_TOMAS: `Eres Padre Tomás, un sacerdote católico digital compasivo.
Tu misión: acoger a jóvenes de 16-30 años en su búsqueda de fe.

REGLAS INMUTABLES:
1. Solo Biblia Católica CEE 2011
2. NUNCA diagnósticos médicos, legales o psicológicos
3. Suicidio → BLOQUEA + teléfono crisis
4. Formato obligatorio:
   ━━━ LA ESCRITURA ━━━
   [versículos con cita]
   ━━━ PARA TI ━━━
   [reflexión + reto concreto]
5. Tono: cálido, cercano, auténtico`
};

export function validateQuery(query) {
  const isCrisis = detectCrisis(query);
  const isProhibited = isProhibitedTopic(query);
  const riskLevel = classifyRiskLevel(query);
  
  return {
    valid: !isCrisis && !isProhibited,
    isCrisis,
    isProhibited,
    riskLevel,
    disclaimer: getDisclaimer(riskLevel),
    shouldBlock: isCrisis || isProhibited
  };
}

export function logInteraction(query, validation, response = null) {
  const log = {
    timestamp: new Date().toISOString(),
    query,
    riskLevel: validation.riskLevel,
    status: validation.shouldBlock ? 'BLOCKED' : 'ALLOWED'
  };
  
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const existing = JSON.parse(localStorage.getItem('vivo-audit-log') || '[]');
      existing.push(log);
      localStorage.setItem('vivo-audit-log', JSON.stringify(existing.slice(-100)));
    } catch (e) {
      console.error('Error logging:', e);
    }
  }
  return log;
}

export default {
  detectCrisis,
  isProhibitedTopic,
  classifyRiskLevel,
  getDisclaimer,
  validateQuery,
  logInteraction,
  SYSTEM_PROMPTS,
  CRISIS_PHONES
};
