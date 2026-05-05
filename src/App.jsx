import React, { useState, useEffect, useRef } from 'react';
import Governance from './governance';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userCountry, setUserCountry] = useState('ES');
  const [padreTomasResponse, setPadreTomasResponse] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [crossTapCount, setCrossTapCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const easterEggTimer = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('vivo-country');
    if (saved) setUserCountry(saved);
    else setUserCountry('ES');
  }, []);

  const handleCrossTap = () => {
    setCrossTapCount(prev => {
      const newCount = prev + 1;
      if (newCount === 7) {
        setShowEasterEgg(true);
        setCrossTapCount(0);
        if (easterEggTimer.current) clearTimeout(easterEggTimer.current);
        easterEggTimer.current = setTimeout(() => setShowEasterEgg(false), 8000);
      }
      return newCount;
    });
  };

  const handlePadreTomas = async (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setIsLoading(true);
    try {
      const validation = Governance.validateQuery(userQuery);

      if (validation.shouldBlock) {
        if (validation.isCrisis) {
          setPadreTomasResponse(`
            <div style="${validation.disclaimer.style}">
              <strong>${validation.disclaimer.icon} ${validation.disclaimer.title}</strong>
              <p>${validation.disclaimer.message}</p>
            </div>
          `);
        } else {
          setPadreTomasResponse(`<div style="padding: 12px; background: #ff6b6b; color: white; border-radius: 8px;">⛔ No puedo responder a este tema.</div>`);
        }
        Governance.logInteraction(userQuery, validation);
        setUserQuery('');
        setIsLoading(false);
        return;
      }

      let response = '';
      const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY || ''
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: Governance.SYSTEM_PROMPTS.PADRE_TOMAS,
          messages: [{ role: 'user', content: userQuery }]
        })
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        response = data.content[0].text;
      } else {
        response = `<strong>━━━ LA ESCRITURA ━━━</strong><p>Mateo 11:28 - "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."</p><strong>━━━ PARA TI ━━━</strong><p>Tu pregunta es importante. En la oración, busca la luz de la Palabra.</p>`;
      }

      setPadreTomasResponse(response);
      Governance.logInteraction(userQuery, validation, response);
    } catch (error) {
      console.error('Error:', error);
      setPadreTomasResponse(`<div style="padding: 12px; background: #ff6b6b; color: white; border-radius: 8px;">⚠️ Error de conexión</div>`);
    }

    setUserQuery('');
    setIsLoading(false);
  };

  const HomeScreen = () => (
    <div style={styles.screen}>
      <div style={styles.headerHome}>
        <div style={styles.crossContainer} onClick={handleCrossTap}>
          <span style={styles.cross}>✞</span>
        </div>
        <h1 style={styles.mainTitle}>VIVO.</h1>
        <p style={styles.subtitle}>Biblia para jóvenes · CEE</p>
      </div>

      <div style={styles.contentHome}>
        <button onClick={() => setCurrentScreen('hoy')} style={{ ...styles.moduleButton, ...styles.btnBlue }}>
          <div style={styles.moduleTitle}>Hoy.</div>
          <div style={styles.moduleSubtitle}>Evangelio del Día</div>
        </button>
        <button onClick={() => setCurrentScreen('temas')} style={{ ...styles.moduleButton, ...styles.btnRed }}>
          <div style={styles.moduleTitle}>Temas.</div>
          <div style={styles.moduleSubtitle}>Lo que importa de verdad</div>
        </button>
        <button onClick={() => setCurrentScreen('biblia')} style={{ ...styles.moduleButton, ...styles.btnGreen }}>
          <div style={styles.moduleTitle}>Biblia.</div>
          <div style={styles.moduleSubtitle}>Estudios clásicos</div>
        </button>
        <button onClick={() => setCurrentScreen('hablar')} style={{ ...styles.moduleButton, ...styles.btnPurple }}>
          <div style={styles.moduleTitle}>Hablar.</div>
          <div style={styles.moduleSubtitle}>Padre Tomás te escucha</div>
        </button>
        <button onClick={() => setCurrentScreen('salmos')} style={{ ...styles.moduleButton, ...styles.btnYellow }}>
          <div style={styles.moduleTitle}>Salmos.</div>
          <div style={styles.moduleSubtitle}>Wallpapers inspiradores</div>
        </button>
      </div>

      {showEasterEgg && (
        <div style={styles.easterEgg}>
          <div style={styles.easterEggContent}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>✨ Easter Egg ✨</p>
            <p style={{ fontSize: '14px' }}>Para mis hijas, que inspiran cada palabra de VIVO.</p>
            <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.8 }}>Que encuentren en la Palabra la luz que ilumina el camino. 💫</p>
          </div>
        </div>
      )}
    </div>
  );

  const HoyScreen = () => (
    <div style={styles.screen}>
      <div style={{ ...styles.headerModule, ...styles.bgBlue }}>
        <button style={styles.backBtn} onClick={() => setCurrentScreen('home')}>← Atrás</button>
        <h1 style={styles.moduleTitle}>Hoy.</h1>
      </div>
      <div style={styles.contentModule}>
        <div style={styles.decorativeBg}></div>
        <p style={styles.labelSmall}>Mt 26,14-25</p>
        <p style={styles.textLarge}>Entonces uno de los Doce, llamado Judas Iscariote, fue a los sumos sacerdotes y les propuso: «¿Qué me daréis si os lo entrego?»</p>
        <button style={styles.actionButton}>□ REFLEXIÓN PARA HOY</button>
      </div>
    </div>
  );

  const TemasScreen = () => (
    <div style={styles.screen}>
      <div style={{ ...styles.headerModule, ...styles.bgRed }}>
        <button style={styles.backBtn} onClick={() => setCurrentScreen('home')}>← Atrás</button>
        <h1 style={styles.moduleTitle}>Temas.</h1>
      </div>
      <div style={styles.contentModule}>
        <p style={styles.subtitle}>Lo que importa de verdad</p>
        <div style={styles.temasGrid}>
          {['Amor y Relaciones', 'Sexualidad', 'Ansiedad', 'Drogas', 'Soledad', 'Redes Sociales', 'Propósito de Vida', 'Rupturas y Pérdidas', 'Santos Jóvenes'].map((t, i) => (
            <div key={i} style={styles.temaCard}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const BibliaScreen = () => (
    <div style={styles.screen}>
      <div style={{ ...styles.headerModule, ...styles.bgGreen }}>
        <button style={styles.backBtn} onClick={() => setCurrentScreen('home')}>← Atrás</button>
        <h1 style={styles.moduleTitle}>Biblia.</h1>
      </div>
      <div style={styles.contentModule}>
        <p style={styles.subtitle}>Estudios clásicos</p>
        {[
          { t: 'Las Bienaventuranzas', p: 'Mt 5, 3-12' },
          { t: 'El Padre Nuestro', p: 'Mt 6, 9-13' },
          { t: 'El Hijo Pródigo', p: 'Lc 15, 11-32' },
          { t: 'El Nuevo Mandamiento', p: 'Jn 13, 34-35' },
          { t: 'Los Diez Mandamientos', p: 'Ex 20, 1-17' },
          { t: 'El Sermón del Monte', p: 'Mt 5, 1-7, 29' }
        ].map((item, i) => (
          <div key={i} style={styles.bibliaItem}>
            <div style={styles.bibliaTitle}>{item.t}</div>
            <div style={styles.biliaPasaje}>{item.p}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const HablarScreen = () => (
    <div style={styles.screen}>
      <div style={{ ...styles.headerModule, ...styles.bgPurple }}>
        <button style={styles.backBtn} onClick={() => setCurrentScreen('home')}>← Atrás</button>
        <h1 style={styles.moduleTitle}>Hablar.</h1>
      </div>
      <div style={styles.contentModule}>
        <p style={styles.subtitle}>Padre Tomás te escucha</p>
        {padreTomasResponse && <div style={styles.responseBox} dangerouslySetInnerHTML={{ __html: padreTomasResponse }} />}
        <form onSubmit={handlePadreTomas} style={styles.form}>
          <textarea value={userQuery} onChange={(e) => setUserQuery(e.target.value)} placeholder="¿Cuál es tu pregunta?" style={styles.textarea} disabled={isLoading} />
          <button type="submit" style={{ ...styles.submitButton, opacity: isLoading ? 0.5 : 1 }} disabled={isLoading}>
            {isLoading ? '⏳ Esperando...' : '✓ Enviar'}
          </button>
        </form>
      </div>
    </div>
  );

  const SalmosScreen = () => (
    <div style={styles.screen}>
      <div style={{ ...styles.headerModule, ...styles.bgYellow, color: '#000' }}>
        <button style={{ ...styles.backBtn, color: '#000' }} onClick={() => setCurrentScreen('home')}>← Atrás</button>
        <h1 style={{ ...styles.moduleTitle, color: '#000' }}>Salmos.</h1>
      </div>
      <div style={styles.contentModule}>
        <div style={styles.salmosGrid}>
          {[
            { n: 23, c: '#2196F3', t: 'El Señor es mi pastor' },
            { n: 27, c: '#4CAF50', t: 'El Señor es mi luz' },
            { n: 34, c: '#F44336', t: 'Contempladlo' },
            { n: 46, c: '#FF9800', t: 'Dios es nuestro refugio' },
            { n: 91, c: '#9C27B0', t: 'Tú que habitas' },
            { n: 121, c: '#FFC107', t: 'El Señor te guarda' },
            { n: 139, c: '#2196F3', t: 'Señor, tú me sondeas' }
          ].map((s, i) => (
            <div key={i} style={{ ...styles.salmoCard, backgroundColor: s.c, color: s.c === '#FFC107' ? '#000' : '#fff' }}>
              <div style={styles.salmoNum}>Salmo {s.n}</div>
              <div style={styles.salmoText}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const screens = {
    home: <HomeScreen />,
    hoy: <HoyScreen />,
    temas: <TemasScreen />,
    biblia: <BibliaScreen />,
    hablar: <HablarScreen />,
    salmos: <SalmosScreen />
  };

  return <div style={styles.container}>{screens[currentScreen] || screens.home}</div>;
}

const styles = {
  container: { width: '100%', maxWidth: '480px', margin: '0 auto', fontFamily: 'Helvetica Neue, Arial, sans-serif', backgroundColor: '#000a0f', color: '#ffffff', minHeight: '100vh', overflowX: 'hidden' },
  screen: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000a0f' },
  headerHome: { padding: '40px 20px 30px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  crossContainer: { fontSize: '28px', marginBottom: '20px', cursor: 'pointer' },
  cross: { display: 'inline-block' },
  mainTitle: { fontSize: '48px', fontWeight: 'bold', letterSpacing: '2px', margin: '0 0 8px 0' },
  subtitle: { fontSize: '12px', opacity: 0.6, letterSpacing: '1px', margin: 0 },
  contentHome: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
  moduleButton: { padding: '24px', borderRadius: '0px', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Helvetica Neue, Arial, sans-serif' },
  moduleTitle: { fontSize: '32px', fontWeight: 'bold', letterSpacing: '1px' },
  moduleSubtitle: { fontSize: '12px', opacity: 0.8, marginTop: '8px' },
  btnBlue: { backgroundColor: '#2196F3' },
  btnRed: { backgroundColor: '#F44336' },
  btnGreen: { backgroundColor: '#4CAF50' },
  btnPurple: { backgroundColor: '#9C27B0' },
  btnYellow: { backgroundColor: '#FFC107', color: '#000' },
  easterEgg: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  easterEggContent: { backgroundColor: 'rgba(156,39,176,0.95)', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '2px solid #00D4AA' },
  headerModule: { padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bgBlue: { backgroundColor: '#2196F3' },
  bgRed: { backgroundColor: '#F44336' },
  bgGreen: { backgroundColor: '#4CAF50' },
  bgPurple: { backgroundColor: '#9C27B0' },
  bgYellow: { backgroundColor: '#FFC107' },
  backBtn: { position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  contentModule: { flex: 1, overflowY: 'auto', padding: '24px', position: 'relative' },
  decorativeBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'360\' height=\'700\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,50 Q90,100 180,50 T360,50\' stroke=\'rgba(255,255,255,0.03)\' fill=\'none\' stroke-width=\'2\'/%3E%3Cpath d=\'M0,150 Q90,200 180,150 T360,150\' stroke=\'rgba(255,255,255,0.03)\' fill=\'none\' stroke-width=\'2\'/%3E%3C/svg%3E")', opacity: 0.3, pointerEvents: 'none' },
  labelSmall: { fontSize: '12px', opacity: 0.6, marginBottom: '16px', position: 'relative', zIndex: 1 },
  textLarge: { fontSize: '20px', lineHeight: 1.6, marginBottom: '24px', position: 'relative', zIndex: 1 },
  actionButton: { padding: '12px 20px', background: 'white', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', position: 'relative', zIndex: 1 },
  temasGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px', position: 'relative', zIndex: 1 },
  temaCard: { padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 500, textAlign: 'center' },
  bibliaItem: { padding: '14px', background: 'rgba(255,255,255,0.05)', borderLeft: '3px solid white', marginBottom: '10px', position: 'relative', zIndex: 1 },
  bibliaTitle: { fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' },
  biliaPasaje: { fontSize: '11px', opacity: 0.7 },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px', position: 'relative', zIndex: 1 },
  textarea: { padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', fontFamily: 'Arial', fontSize: '12px', minHeight: '80px', resize: 'none' },
  submitButton: { padding: '12px', borderRadius: '4px', border: 'none', background: '#00D4AA', color: '#000', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' },
  responseBox: { background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '4px', marginBottom: '16px', borderLeft: '3px solid #00D4AA', fontSize: '12px', lineHeight: 1.5, position: 'relative', zIndex: 1 },
  salmosGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '10px', position: 'relative', zIndex: 1 },
  salmoCard: { padding: '20px', border: 'none', borderRadius: '0px', cursor: 'pointer', textAlign: 'left', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Helvetica Neue, Arial' },
  salmoNum: { fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', opacity: 0.8 },
  salmoText: { fontSize: '16px', fontWeight: 'bold', lineHeight: 1.3 }
};
