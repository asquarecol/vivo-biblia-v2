import { useState, useEffect } from "react";
import { 
  askFatherTomas, 
  fetchDailyGospel, 
  getDisclaimerStyle,
  GOVERNANCE_META 
} from "./governance.js";

// ══════════════════════════════════════════════════════════════════════
// VIVO — Biblia para Jóvenes v1.0 FINAL
// Sistema de Gobernanza + Diseño Editorial + Galería + Dedicatoria
// ══════════════════════════════════════════════════════════════════════

// Colores del sistema de diseño VIVO (según mockups aprobados)
const VIVO_COLORS = {
  azul: "#0066CC",
  rojo: "#DC2626", 
  verde: "#059669",
  naranja: "#EA580C",
  violeta: "#7C3AED",
  amarillo: "#F59E0B",
  negro: "#1F2937",
  blanco: "#FFFFFF",
  gris: "#6B7280",
};

// Temas de sección con fondos de colores sólidos
const SECTION_THEMES = {
  evangelio: { bg: VIVO_COLORS.azul, text: VIVO_COLORS.blanco },
  temas: { bg: VIVO_COLORS.rojo, text: VIVO_COLORS.blanco },
  estudia: { bg: VIVO_COLORS.verde, text: VIVO_COLORS.blanco },
  pregunta: { bg: VIVO_COLORS.violeta, text: VIVO_COLORS.blanco },
  wallpapers: { bg: VIVO_COLORS.amarillo, text: VIVO_COLORS.negro }, // Excepción: amarillo = texto negro
};

// ══════════════════════════════════════════════════════════════════════
// DATOS BÍBLICOS Y LECCIONARIO
// ══════════════════════════════════════════════════════════════════════

// Sagrada Biblia CEE 2011 (simulación compacta para demo)
const BIBLE_DATA = {
  "Mateo": `Libro de la genealogía de Jesucristo, hijo de David, hijo de Abraham.

Abraham engendró a Isaac, Isaac engendró a Jacob, Jacob engendró a Judá y a sus hermanos...

En aquellos días se presentó Juan el Bautista predicando en el desierto de Judea y diciendo: «Convertíos, porque está cerca el reino de los cielos.»

Entonces Jesús vino de Galilea al Jordán, donde estaba Juan, para ser bautizado por él. Pero Juan trataba de impedírselo diciendo: «Yo necesito ser bautizado por ti, ¿y tú vienes a mí?»

Y he aquí que se abrieron los cielos y vio al Espíritu de Dios que bajaba como una paloma y se posaba sobre él. Y una voz desde los cielos dijo: «Este es mi Hijo amado, en quien me complazco.»

Dichosos los pobres en el espíritu, porque de ellos es el reino de los cielos. Dichosos los mansos, porque ellos heredarán la tierra. Dichosos los que lloran, porque ellos serán consolados.

Jesús se acercó a ellos y les habló así: «Se me ha dado pleno poder en el cielo y en la tierra. Id, pues, y haced discípulos a todas las gentes bautizándolas en el nombre del Padre y del Hijo y del Espíritu Santo, y enseñándoles a guardar todo lo que yo os he mandado. Y sabed que yo estoy con vosotros todos los días, hasta el final de los tiempos.»`,
  
  "Juan": `En el principio existía la Palabra y la Palabra estaba con Dios, y la Palabra era Dios. Ella estaba en el principio con Dios. Todo se hizo por ella y sin ella no se hizo nada de cuanto existe.

En ella estaba la vida y la vida era la luz de los hombres. La luz brilla en las tinieblas y las tinieblas no la vencieron.

Yo soy el camino, la verdad y la vida. Nadie va al Padre sino por mí. Si me conocéis a mí, también conoceréis a mi Padre.

Un mandamiento nuevo os doy: que os améis unos a otros. Como yo os he amado, así amaos también vosotros unos a otros. En esto conocerán todos que sois discípulos míos: si os amáis unos a otros.

El que permanece en mí y yo en él, ése da mucho fruto; porque separados de mí no podéis hacer nada.`,
  
  "Lucas": `El ángel le dijo: «No temas, María, porque has hallado gracia delante de Dios; vas a concebir en el seno y vas a dar a luz un hijo, a quien pondrás por nombre Jesús.»

Y había también un hombre llamado José, que era senador, hombre bueno y justo, que no había asentido al acuerdo y proceder de los demás.

Dijo también: «Un hombre tenía dos hijos; y el menor de ellos dijo a su padre: 'Padre, dame la parte que me corresponde de la fortuna.' Y les repartió los bienes.

Pero cuando aún estaba lejos, le vio su padre y, compadecido, corrió, se echó a su cuello y le besó efusivamente. El hijo le dijo: 'Padre, pequé contra el cielo y contra ti; ya no merezco ser llamado hijo tuyo.'»`,
  
  "Salmos": `Dichoso el hombre que no sigue el consejo de los malvados, ni se detiene en la senda de los pecadores, ni se sienta en la reunión de los cínicos.

El Señor es mi pastor, nada me falta: en verdes praderas me hace recostar; me conduce hacia fuentes tranquilas y repara mis fuerzas.

Alzo mis ojos a los montes: ¿de dónde me vendrá el auxilio? El auxilio me viene del Señor, que hizo el cielo y la tierra.

Señor, tú me sondeas y me conoces; me conoces cuando me siento o me levanto, de lejos penetras mis pensamientos.`
};

// Leccionario Semana Santa + Octava de Pascua 2026
const INTERNAL_LECTIONARY = {
  "2026-04-19": { liturgia: "Domingo de Ramos", ref: "Mt 21,1-11", libro: "Mateo", search: "Jesús entró Jerusalén" },
  "2026-04-20": { liturgia: "Lunes Santo", ref: "Jn 12,1-11", libro: "Juan", search: "María ungió pies Jesús" },
  "2026-04-21": { liturgia: "Martes Santo", ref: "Jn 13,21-33", libro: "Juan", search: "uno de vosotros me va entregar" },
  "2026-04-22": { liturgia: "Miércoles Santo", ref: "Mt 26,6-16", libro: "Mateo", search: "mujer derramó perfume" },
  "2026-04-23": { liturgia: "Jueves Santo", ref: "Jn 13,1-15", libro: "Juan", search: "lavó los pies" },
  "2026-04-24": { liturgia: "Viernes Santo", ref: "Jn 18,1-19", libro: "Juan", search: "pasión del Señor" },
  "2026-04-25": { liturgia: "Sábado Santo", ref: "Mt 28,1-10", libro: "Mateo", search: "ha resucitado" },
  "2026-04-26": { liturgia: "Domingo de Pascua", ref: "Jn 20,1-9", libro: "Juan", search: "sepulcro vacío" }
};

// Temas para jóvenes (16-30 años)
const TEMAS_JOVENES = [
  { id: "amor", titulo: "Amor y Relaciones", emoji: "💕", desc: "El amor verdadero según Dios", color: VIVO_COLORS.rojo },
  { id: "sexualidad", titulo: "Sexualidad y Pureza", emoji: "🌸", desc: "Tu cuerpo es templo del Espíritu Santo", color: VIVO_COLORS.violeta },
  { id: "ansiedad", titulo: "Ansiedad y Miedos", emoji: "😰", desc: "Paz en medio de la tormenta", color: VIVO_COLORS.azul },
  { id: "drogas", titulo: "Adicciones", emoji: "🚫", desc: "Libertad verdadera en Cristo", color: VIVO_COLORS.verde },
  { id: "soledad", titulo: "Soledad", emoji: "🤗", desc: "Dios nunca te abandona", color: VIVO_COLORS.naranja },
  { id: "redes", titulo: "Redes Sociales", emoji: "📱", desc: "Identidad digital vs identidad real", color: VIVO_COLORS.azul },
  { id: "proposito", titulo: "Propósito de Vida", emoji: "🎯", desc: "¿Para qué me creó Dios?", color: VIVO_COLORS.verde },
  { id: "rupturas", titulo: "Rupturas Amorosas", emoji: "💔", desc: "Sanando el corazón roto", color: VIVO_COLORS.rojo },
  { id: "santos", titulo: "Santos Jóvenes", emoji: "✨", desc: "Ejemplos de santidad juvenil", color: VIVO_COLORS.amarillo },
];

// Estudios bíblicos fundamentales
const ESTUDIOS_BIBLICOS = [
  { id: "bienaventuranzas", titulo: "Las Bienaventuranzas", ref: "Mt 5,3-12", libro: "Mateo" },
  { id: "padrenuestro", titulo: "Padre Nuestro", ref: "Mt 6,9-13", libro: "Mateo" },
  { id: "prodigo", titulo: "El Hijo Pródigo", ref: "Lc 15,11-32", libro: "Lucas" },
  { id: "mandamiento", titulo: "Nuevo Mandamiento", ref: "Jn 13,31-35", libro: "Juan" },
  { id: "camino", titulo: "Yo soy el Camino", ref: "Jn 14,1-14", libro: "Juan" },
  { id: "vid", titulo: "Yo soy la Vid", ref: "Jn 15,1-17", libro: "Juan" },
  { id: "pastor", titulo: "El Buen Pastor", ref: "Jn 10,1-16", libro: "Juan" },
  { id: "pan", titulo: "Yo soy el Pan de Vida", ref: "Jn 6,35-51", libro: "Juan" },
];

// Wallpapers de Salmos disponibles
const WALLPAPERS_SALMOS = [
  { 
    id: "salmo23_azul", 
    titulo: "Salmo 23", 
    versiculo: "El Señor es mi pastor, nada me falta", 
    imagen: "/wallpapers/salmo23_azul.png",
    preview: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgZmlsbD0iIzAwNjZDQyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTc4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCI+U2FsbW8gMjM8L3RleHQ+PC9zdmc+",
    color: VIVO_COLORS.azul 
  },
  { 
    id: "salmo121_amarillo", 
    titulo: "Salmo 121", 
    versiculo: "Alzo mis ojos a los montes", 
    imagen: "/wallpapers/salmo121_amarillo.png",
    preview: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgZmlsbD0iI0Y1OUUwQiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTc4IiBmaWxsPSIjMUYyOTM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIj5TYWxtbyAxMjE8L3RleHQ+PC9zdmc+",
    color: VIVO_COLORS.amarillo 
  },
  { 
    id: "salmo91_verde", 
    titulo: "Salmo 91", 
    versiculo: "El que habita al amparo del Altísimo", 
    imagen: "/wallpapers/salmo91_verde.png",
    preview: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgZmlsbD0iIzA1OTY2OSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTc4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCI+U2FsbW8gOTE8L3RleHQ+PC9zdmc+",
    color: VIVO_COLORS.verde 
  },
  { 
    id: "salmo139_violeta", 
    titulo: "Salmo 139", 
    versiculo: "Señor, tú me sondeas y me conoces", 
    imagen: "/wallpapers/salmo139_violeta.png",
    preview: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgZmlsbD0iIzdDM0FFRCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTc4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCI+U2FsbW8gMTM5PC90ZXh0Pjwvc3ZnPg==",
    color: VIVO_COLORS.violeta 
  }
];

// ══════════════════════════════════════════════════════════════════════
// FUNCIONES HELPER
// ══════════════════════════════════════════════════════════════════════

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateEs(dateKey) {
  const [year, month, day] = dateKey.split("-");
  const months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const d = new Date(`${dateKey}T12:00:00`);
  const days = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  return `${days[d.getDay()]} ${day} de ${months[parseInt(month)-1]} de ${year}`;
}

function searchInBibleBook(text, searchTerms) {
  if (!text) return "";
  const terms = searchTerms.split(" ").filter(t => t.length > 3);
  const lines = text.split("\n");
  let bestIdx = 0, bestScore = 0;
  
  for (let i = 0; i < lines.length - 5; i++) {
    const chunk = lines.slice(i, i + 10).join(" ").toLowerCase();
    const score = terms.filter(t => chunk.includes(t.toLowerCase())).length;
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  
  return lines.slice(Math.max(0, bestIdx), bestIdx + 8).join("\n").trim();
}

// ══════════════════════════════════════════════════════════════════════
// ESTILOS Y COMPONENTES BASE
// ══════════════════════════════════════════════════════════════════════

function TypographyStyles() {
  return (
    <style>{`
      .vivo-title {
        font-family: "Helvetica Neue", "Arial", sans-serif;
        font-weight: 600;
        font-size: 5em;
        line-height: 0.9;
        letter-spacing: -0.02em;
      }
      
      .vivo-subtitle {
        font-family: "Helvetica Neue", "Arial", sans-serif; 
        font-weight: 600;
        font-size: 2em;
        line-height: 1.1;
      }
      
      .vivo-button {
        font-family: "Helvetica Neue", "Arial", sans-serif;
        font-weight: 600;
        font-size: 0.9em;
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }
      
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-fade-up { animation: fadeUp 0.4s ease-out; }
      
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 3px; }
      
      button:active { transform: scale(0.98); }
      
      /* Tipografía responsiva */
      @media (max-width: 480px) {
        .vivo-title { font-size: 2.5em; }
        .vivo-subtitle { font-size: 1.8em; }
      }
    `}</style>
  );
}

function DisclaimerCard({ disclaimers, severity }) {
  if (!disclaimers?.length) return null;
  
  const style = getDisclaimerStyle(severity);
  
  return (
    <div style={{
      backgroundColor: style.bg,
      borderLeft: `4px solid ${style.border}`,
      color: style.text,
      padding: "16px",
      margin: "16px 0",
      borderRadius: "8px",
      fontSize: "14px",
      lineHeight: "1.5"
    }}>
      <div style={{ fontWeight: "600", fontSize: "12px", marginBottom: "8px", opacity: 0.8 }}>
        {style.icon} {style.label}
      </div>
      {disclaimers.map((disclaimer, idx) => (
        <div key={idx} style={{ 
          marginBottom: idx === disclaimers.length - 1 ? 0 : "12px",
          whiteSpace: "pre-line"
        }}>
          {disclaimer.message}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════════════

export default function App() {
  const [currentSection, setCurrentSection] = useState("evangelio");
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados específicos por sección
  const [evangelioData, setEvangelioData] = useState(null);
  const [padreMensajes, setPadreMensajes] = useState([]);
  const [selectedTema, setSelectedTema] = useState(null);
  const [selectedEstudio, setSelectedEstudio] = useState(null);
  
  // Easter egg - dedicatoria oculta
  const [dedicatoriaVisible, setDedicatoriaVisible] = useState(false);
  const [secretTaps, setSecretTaps] = useState(0);
  
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simular carga inicial
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Cargar evangelio del día
        const today = getTodayKey();
        const gospel = await fetchDailyGospel(today, INTERNAL_LECTIONARY, BIBLE_DATA);
        setEvangelioData(gospel);
        
      } catch (error) {
        console.error("Error al inicializar VIVO:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeApp();
  }, []);
  
  const handleSecretTap = () => {
    const newTaps = secretTaps + 1;
    setSecretTaps(newTaps);
    if (newTaps >= 7) {
      setDedicatoriaVisible(true);
      setSecretTaps(0);
    }
  };
  
  const currentTheme = SECTION_THEMES[currentSection] || SECTION_THEMES.evangelio;
  const isYellow = currentSection === "wallpapers";
  const textColor = isYellow ? VIVO_COLORS.negro : VIVO_COLORS.blanco;
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: currentTheme.bg,
      color: textColor,
      maxWidth: "480px",
      margin: "0 auto",
      position: "relative",
      transition: "all 0.3s ease",
      fontFamily: "'Arial', sans-serif"
    }}>
      <TypographyStyles />
      
      {/* Header */}
      <header style={{
        padding: "20px 20px 16px",
        borderBottom: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 className="vivo-title" style={{
              margin: 0,
              fontSize: "2.5em"
            }}>
              VIVO
            </h1>
            <p style={{ 
              margin: 0, 
              opacity: 0.8, 
              fontSize: "0.85em",
              fontWeight: "500",
              fontFamily: "'Arial', sans-serif"
            }}>
              Biblia para jóvenes · CEE 2011
            </p>
          </div>
          <button 
            onClick={handleSecretTap}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: `2px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              color: "inherit",
              fontSize: "20px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            ✞
          </button>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <nav style={{
        padding: "0 20px",
        overflowX: "auto",
        borderBottom: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`
      }}>
        <div style={{ display: "flex", gap: "24px", minWidth: "max-content", paddingBottom: "16px" }}>
          {[
            { id: "evangelio", label: "☀️ Evangelio" },
            { id: "temas", label: "🔥 Temas" },
            { id: "estudia", label: "📖 Estudia" },
            { id: "pregunta", label: "🙏 Padre Tomás" },
            { id: "wallpapers", label: "🎨 Wallpapers" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentSection(tab.id)}
              className="vivo-button"
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                padding: "8px 0",
                fontSize: "0.85em",
                cursor: "pointer",
                opacity: currentSection === tab.id ? 1 : 0.6,
                borderBottom: currentSection === tab.id ? 
                  `2px solid currentColor` : "2px solid transparent",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      
      {/* Content Area */}
      <main style={{ paddingBottom: "40px" }} className="animate-fade-up">
        {currentSection === "evangelio" && (
          <EvangelioSection data={evangelioData} theme={currentTheme} />
        )}
        
        {currentSection === "temas" && (
          <TemasSection 
            theme={currentTheme}
            selectedTema={selectedTema}
            setSelectedTema={setSelectedTema}
          />
        )}
        
        {currentSection === "estudia" && (
          <EstudiaSection 
            theme={currentTheme}
            selectedEstudio={selectedEstudio}
            setSelectedEstudio={setSelectedEstudio}
          />
        )}
        
        {currentSection === "pregunta" && (
          <PadreTomasSection 
            theme={currentTheme}
            mensajes={padreMensajes}
            setMensajes={setPadreMensajes}
          />
        )}
        
        {currentSection === "wallpapers" && (
          <WallpapersSection theme={currentTheme} />
        )}
      </main>
      
      {/* Dedicatoria oculta */}
      {dedicatoriaVisible && (
        <DedicatoriaOverlay onClose={() => setDedicatoriaVisible(false)} />
      )}
      
      {/* Footer */}
      <footer style={{
        padding: "16px 20px",
        textAlign: "center",
        borderTop: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
        fontSize: "0.75em",
        opacity: 0.6
      }}>
        {GOVERNANCE_META.biblicalSource} • v{GOVERNANCE_META.version}
      </footer>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// PANTALLA DE CARGA
// ══════════════════════════════════════════════════════════════════════

function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: VIVO_COLORS.azul,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: VIVO_COLORS.blanco,
      fontFamily: "'Arial', sans-serif"
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: `3px solid rgba(255,255,255,0.3)`,
        borderTop: `3px solid white`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "24px"
      }} />
      <h2 className="vivo-title" style={{
        margin: "0 0 8px",
        fontSize: "2em"
      }}>
        VIVO
      </h2>
      <p style={{ 
        opacity: 0.8, 
        textAlign: "center", 
        margin: "8px 0",
        fontSize: "0.9em"
      }}>
        Cargando la Palabra de Dios...
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// SECCIONES PRINCIPALES
// ══════════════════════════════════════════════════════════════════════

function EvangelioSection({ data, theme }) {
  const [reflection, setReflection] = useState("");
  const [loadingReflection, setLoadingReflection] = useState(false);
  const isYellow = theme.bg === VIVO_COLORS.amarillo;
  
  const getReflection = async () => {
    if (!data?.text || loadingReflection) return;
    
    setLoadingReflection(true);
    setReflection("");
    
    try {
      const response = await askFatherTomas(
        `Reflexiona sobre este evangelio para jóvenes: ${data.text.substring(0, 1500)}`,
        data.text,
        []
      );
      
      if (response.type === "RESPONSE") {
        setReflection(response.text);
      } else {
        setReflection("No pude generar una reflexión en este momento.");
      }
    } catch (error) {
      setReflection("Error al conectar. Inténtalo de nuevo.");
    } finally {
      setLoadingReflection(false);
    }
  };
  
  if (!data) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <p>Cargando evangelio del día...</p>
      </div>
    );
  }
  
  return (
    <div style={{ padding: "24px 20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <p style={{ 
          margin: "0 0 8px", 
          opacity: 0.8, 
          fontSize: "0.85em",
          fontWeight: "500"
        }}>
          {formatDateEs(getTodayKey()).toUpperCase()}
        </p>
        <h2 className="vivo-subtitle" style={{ margin: "0 0 16px" }}>
          {data.liturgia || "Evangelio del Día"}
        </h2>
        {data.ref && (
          <div style={{
            display: "inline-block",
            background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.15)`,
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "0.8em",
            fontWeight: "600",
            fontFamily: "monospace"
          }}>
            {data.ref}
          </div>
        )}
      </div>
      
      <div style={{
        background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
        border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px"
      }}>
        <div style={{
          fontSize: "0.75em",
          fontWeight: "600",
          marginBottom: "12px",
          opacity: 0.8,
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          Palabra de Dios
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: "1.05em", 
          lineHeight: "1.8",
          fontStyle: "italic",
          whiteSpace: "pre-line"
        }}>
          {data.text}
        </p>
      </div>
      
      <button 
        onClick={getReflection}
        disabled={loadingReflection}
        className="vivo-button"
        style={{
          width: "100%",
          padding: "16px",
          background: loadingReflection ? 
            `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)` : 
            `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
          border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
          borderRadius: "8px",
          color: "inherit",
          cursor: loadingReflection ? "not-allowed" : "pointer",
          transition: "all 0.2s ease"
        }}
      >
        {loadingReflection ? "Padre Tomás está reflexionando..." : "🔥 Reflexión del Padre Tomás"}
      </button>
      
      {reflection && (
        <div style={{
          background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.15)`,
          border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.25)`,
          borderRadius: "12px",
          padding: "20px",
          marginTop: "20px"
        }}>
          <div style={{
            fontSize: "0.75em",
            fontWeight: "600",
            marginBottom: "12px",
            opacity: 0.8,
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Reflexión — Padre Tomás
          </div>
          <p style={{ 
            margin: 0, 
            fontSize: "1.05em", 
            lineHeight: "1.7",
            whiteSpace: "pre-line"
          }}>
            {reflection}
          </p>
        </div>
      )}
    </div>
  );
}

function TemasSection({ theme, selectedTema, setSelectedTema }) {
  const isYellow = theme.bg === VIVO_COLORS.amarillo;
  
  if (selectedTema) {
    return (
      <TemaDetail 
        tema={selectedTema} 
        theme={theme}
        onBack={() => setSelectedTema(null)} 
      />
    );
  }
  
  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 className="vivo-subtitle" style={{ margin: "0 0 8px" }}>
        Temas que Importan
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8, fontSize: "0.95em" }}>
        La Biblia habla de los temas que vives cada día
      </p>
      
      <div style={{ display: "grid", gap: "16px" }}>
        {TEMAS_JOVENES.map(tema => (
          <button
            key={tema.id}
            onClick={() => setSelectedTema(tema)}
            style={{
              background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
              borderRadius: "12px",
              padding: "20px",
              textAlign: "left",
              color: "inherit",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "2em" }}>{tema.emoji}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: "0 0 4px", 
                  fontSize: "1.1em", 
                  fontWeight: "600" 
                }}>
                  {tema.titulo}
                </h3>
                <p style={{ 
                  margin: 0, 
                  opacity: 0.8, 
                  fontSize: "0.9em" 
                }}>
                  {tema.desc}
                </p>
              </div>
              <div style={{ opacity: 0.6, fontSize: "1.2em" }}>→</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TemaDetail({ tema, theme, onBack }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const isYellow = theme.bg === VIVO_COLORS.amarillo;
  
  useEffect(() => {
    const loadTema = async () => {
      setLoading(true);
      
      try {
        const bibleContext = BIBLE_DATA["Juan"] || "";
        const response = await askFatherTomas(
          `Háblame sobre ${tema.titulo} desde la perspectiva bíblica para jóvenes`,
          bibleContext,
          []
        );
        
        if (response.type === "RESPONSE") {
          setContent(response.text);
        } else {
          setContent("No pude cargar este contenido en este momento.");
        }
      } catch (error) {
        setContent("Error al cargar el tema.");
      } finally {
        setLoading(false);
      }
    };
    
    loadTema();
  }, [tema]);
  
  return (
    <div style={{ padding: "24px 20px" }}>
      <button 
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          fontSize: "1.1em",
          cursor: "pointer",
          marginBottom: "16px",
          opacity: 0.8
        }}
      >
        ← Volver a temas
      </button>
      
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "3em", marginBottom: "12px" }}>{tema.emoji}</div>
        <h2 className="vivo-subtitle" style={{ margin: "0 0 8px" }}>
          {tema.titulo}
        </h2>
        <p style={{ margin: 0, opacity: 0.8 }}>
          {tema.desc}
        </p>
      </div>
      
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{
            width: "32px",
            height: "32px",
            border: `2px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
            borderTop: `2px solid currentColor`,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <p>Cargando...</p>
        </div>
      ) : (
        <div style={{
          background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
          border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
          borderRadius: "12px",
          padding: "20px"
        }}>
          <p style={{ 
            margin: 0, 
            lineHeight: "1.7",
            whiteSpace: "pre-line" 
          }}>
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

function EstudiaSection({ theme, selectedEstudio, setSelectedEstudio }) {
  const isYellow = theme.bg === VIVO_COLORS.amarillo;
  
  if (selectedEstudio) {
    return (
      <EstudioDetail 
        estudio={selectedEstudio} 
        theme={theme}
        onBack={() => setSelectedEstudio(null)} 
      />
    );
  }
  
  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 className="vivo-subtitle" style={{ margin: "0 0 8px" }}>
        Estudia la Biblia
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8, fontSize: "0.95em" }}>
        Textos fundamentales explicados para jóvenes
      </p>
      
      <div style={{ display: "grid", gap: "12px" }}>
        {ESTUDIOS_BIBLICOS.map(estudio => (
          <button
            key={estudio.id}
            onClick={() => setSelectedEstudio(estudio)}
            style={{
              background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
              borderRadius: "8px",
              padding: "16px",
              textAlign: "left",
              color: "inherit",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ 
                  margin: "0 0 4px", 
                  fontSize: "1.05em", 
                  fontWeight: "600" 
                }}>
                  {estudio.titulo}
                </h3>
                <p style={{ 
                  margin: 0, 
                  opacity: 0.7, 
                  fontSize: "0.85em",
                  fontFamily: "monospace"
                }}>
                  {estudio.ref}
                </p>
              </div>
              <div style={{ opacity: 0.6, fontSize: "1.2em" }}>→</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function EstudioDetail({ estudio, theme, onBack }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const isYellow = theme.bg === VIVO_COLORS.amarillo;
  
  useEffect(() => {
    const loadEstudio = async () => {
      setLoading(true);
      
      try {
        const bookText = BIBLE_DATA[estudio.libro] || "";
        const bibleText = searchInBibleBook(bookText, estudio.titulo);
        
        const response = await askFatherTomas(
          `Explica este texto bíblico para jóvenes: ${estudio.titulo}`,
          bibleText,
          []
        );
        
        if (response.type === "RESPONSE") {
          setContent(response.text);
        } else {
          setContent("No pude cargar este estudio en este momento.");
        }
      } catch (error) {
        setContent("Error al cargar el estudio.");
      } finally {
        setLoading(false);
      }
    };
    
    loadEstudio();
  }, [estudio]);
  
  return (
    <div style={{ padding: "24px 20px" }}>
      <button 
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          fontSize: "1.1em",
          cursor: "pointer",
          marginBottom: "16px",
          opacity: 0.8
        }}
      >
        ← Volver a estudios
      </button>
      
      <div style={{ marginBottom: "24px" }}>
        <h2 className="vivo-subtitle" style={{ margin: "0 0 8px" }}>
          {estudio.titulo}
        </h2>
        <div style={{
          display: "inline-block",
          background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.15)`,
          padding: "6px 12px",
          borderRadius: "6px",
          fontSize: "0.8em",
          fontWeight: "600",
          fontFamily: "monospace"
        }}>
          {estudio.ref}
        </div>
      </div>
      
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{
            width: "32px",
            height: "32px",
            border: `2px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
            borderTop: `2px solid currentColor`,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <p>Cargando estudio...</p>
        </div>
      ) : (
        <div style={{
          background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
          border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
          borderRadius: "12px",
          padding: "20px"
        }}>
          <p style={{ 
            margin: 0, 
            lineHeight: "1.7",
            whiteSpace: "pre-line" 
          }}>
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

function PadreTomasSection({ theme, mensajes, setMensajes }) {
  const [pregunta, setPregunta] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const isYellow = theme.bg === VIVO_COLORS.amarillo;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pregunta.trim() || loading) return;
    
    const userMessage = { role: "user", content: pregunta, timestamp: new Date() };
    const newMessages = [...mensajes, userMessage];
    setMensajes(newMessages);
    setConversationHistory(prev => [...prev, userMessage]);
    setPregunta("");
    setLoading(true);
    
    try {
      const bibleContext = BIBLE_DATA["Juan"] || "";
      
      const response = await askFatherTomas(
        pregunta,
        bibleContext,
        conversationHistory
      );
      
      const assistantMessage = {
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
        disclaimers: response.disclaimers,
        severity: response.severity,
        source: response.source
      };
      
      setMensajes([...newMessages, assistantMessage]);
      setConversationHistory(prev => [...prev, userMessage, assistantMessage]);
      
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: "No pude conectarme en este momento. Inténtalo de nuevo.",
        timestamp: new Date(),
        disclaimers: [],
        isError: true
      };
      
      setMensajes([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      <div style={{ padding: "24px 20px 16px" }}>
        <h2 className="vivo-subtitle" style={{ margin: "0 0 8px" }}>
          Habla con Padre Tomás
        </h2>
        <p style={{ margin: 0, opacity: 0.8, fontSize: "0.9em" }}>
          Tu guía espiritual basado en la Sagrada Escritura
        </p>
      </div>
      
      <div style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        {mensajes.length === 0 && (
          <div style={{
            background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
            border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2.5em", marginBottom: "12px" }}>🙏</div>
            <p style={{ margin: 0, opacity: 0.8 }}>
              ¡Hola! Soy el Padre Tomás. Puedes preguntarme sobre la fe, la Biblia o cualquier tema que te preocupe. Estoy aquí para acompañarte.
            </p>
          </div>
        )}
        
        {mensajes.map((mensaje, idx) => (
          <div key={idx}>
            <div style={{
              background: mensaje.role === "user" ? 
                `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.15)` : 
                `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
              borderRadius: "12px",
              padding: "16px",
              marginLeft: mensaje.role === "user" ? "20px" : 0,
              marginRight: mensaje.role === "assistant" ? "20px" : 0
            }}>
              <div style={{
                fontSize: "0.75em",
                fontWeight: "600",
                marginBottom: "8px",
                opacity: 0.7
              }}>
                {mensaje.role === "user" ? "TÚ" : "PADRE TOMÁS"}
              </div>
              <p style={{ 
                margin: 0, 
                lineHeight: "1.6",
                whiteSpace: "pre-line" 
              }}>
                {mensaje.content}
              </p>
            </div>
            
            {mensaje.disclaimers && mensaje.disclaimers.length > 0 && (
              <DisclaimerCard 
                disclaimers={mensaje.disclaimers} 
                severity={mensaje.severity} 
              />
            )}
          </div>
        ))}
        
        {loading && (
          <div style={{
            background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
            border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
            borderRadius: "12px",
            padding: "16px",
            marginRight: "20px"
          }}>
            <div style={{
              fontSize: "0.75em",
              fontWeight: "600",
              marginBottom: "8px",
              opacity: 0.7
            }}>
              PADRE TOMÁS
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "16px",
                height: "16px",
                border: `2px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
                borderTop: `2px solid currentColor`,
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }} />
              <span style={{ opacity: 0.8, fontSize: "0.9em" }}>Pensando...</span>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <textarea
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Escribe tu pregunta al Padre Tomás..."
            style={{
              flex: 1,
              padding: "12px 16px",
              background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
              borderRadius: "8px",
              color: "inherit",
              fontSize: "1em",
              fontFamily: "Arial, sans-serif",
              resize: "none",
              rows: 2,
              minHeight: "48px",
              maxHeight: "120px"
            }}
          />
          <button
            type="submit"
            disabled={!pregunta.trim() || loading}
            style={{
              padding: "12px 16px",
              background: (!pregunta.trim() || loading) ? 
                `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)` : 
                `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
              borderRadius: "8px",
              color: "inherit",
              cursor: (!pregunta.trim() || loading) ? "not-allowed" : "pointer",
              fontSize: "1.2em",
              transition: "all 0.2s ease"
            }}
          >
            →
          </button>
        </div>
      </form>
    </div>
  );
}

function WallpapersSection({ theme }) {
  const isYellow = theme.bg === VIVO_COLORS.amarillo;
  
  const downloadWallpaper = (wallpaper) => {
    // Crear SVG del wallpaper y descargar
    const svg = `
      <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
        <rect width="1080" height="1920" fill="${wallpaper.color}"/>
        <text x="540" y="960" fill="${wallpaper.color === VIVO_COLORS.amarillo ? VIVO_COLORS.negro : VIVO_COLORS.blanco}" text-anchor="middle" dominant-baseline="central" font-family="Helvetica Neue, Arial" font-size="48" font-weight="600">${wallpaper.titulo}</text>
        <text x="540" y="1040" fill="${wallpaper.color === VIVO_COLORS.amarillo ? VIVO_COLORS.negro : VIVO_COLORS.blanco}" text-anchor="middle" dominant-baseline="central" font-family="Arial" font-size="32" font-style="italic">"${wallpaper.versiculo}"</text>
        <text x="540" y="1120" fill="${wallpaper.color === VIVO_COLORS.amarillo ? VIVO_COLORS.negro : VIVO_COLORS.blanco}" text-anchor="middle" dominant-baseline="central" font-family="Helvetica Neue, Arial" font-size="24" font-weight="600">VIVO</text>
      </svg>
    `;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VIVO_${wallpaper.id}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 className="vivo-subtitle" style={{ margin: "0 0 8px" }}>
        Wallpapers de Salmos
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8, fontSize: "0.95em" }}>
        Versículos que fortalecen tu día
      </p>
      
      <div style={{ display: "grid", gap: "20px" }}>
        {WALLPAPERS_SALMOS.map(wallpaper => (
          <div
            key={wallpaper.id}
            style={{
              background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.2)`,
              borderRadius: "16px",
              overflow: "hidden"
            }}
          >
            <div 
              style={{
                height: "200px",
                background: wallpaper.color,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: wallpaper.color === VIVO_COLORS.amarillo ? VIVO_COLORS.negro : VIVO_COLORS.blanco,
                textAlign: "center",
                padding: "20px"
              }}
            >
              <h3 style={{ fontSize: "1.5em", fontWeight: "600", margin: "0 0 8px" }}>
                {wallpaper.titulo}
              </h3>
              <p style={{ fontSize: "1em", fontStyle: "italic", margin: "0 0 8px" }}>
                "{wallpaper.versiculo}"
              </p>
              <p style={{ fontSize: "0.8em", fontWeight: "600", margin: 0 }}>
                VIVO
              </p>
            </div>
            <div style={{ padding: "16px" }}>
              <h3 style={{ 
                margin: "0 0 6px", 
                fontSize: "1.1em", 
                fontWeight: "600" 
              }}>
                {wallpaper.titulo}
              </h3>
              <p style={{ 
                margin: "0 0 16px", 
                opacity: 0.8, 
                fontSize: "0.9em",
                fontStyle: "italic"
              }}>
                "{wallpaper.versiculo}"
              </p>
              <button
                onClick={() => downloadWallpaper(wallpaper)}
                className="vivo-button"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.15)`,
                  border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'},0.3)`,
                  borderRadius: "8px",
                  color: "inherit",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                ⬇️ Descargar Wallpaper
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: "24px",
        padding: "16px",
        background: `rgba(${isYellow ? '0,0,0' : '255,255,255'},0.1)`,
        borderRadius: "12px",
        textAlign: "center"
      }}>
        <p style={{ 
          margin: 0, 
          fontSize: "0.85em", 
          opacity: 0.8 
        }}>
          💡 Guarda la imagen y configúrala como fondo de pantalla en tu móvil
        </p>
      </div>
    </div>
  );
}

function DedicatoriaOverlay({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        background: VIVO_COLORS.blanco,
        color: VIVO_COLORS.negro,
        borderRadius: "16px",
        padding: "32px",
        maxWidth: "400px",
        textAlign: "center",
        animation: "fadeUp 0.5s ease-out"
      }}>
        <div style={{ fontSize: "3em", marginBottom: "16px" }}>💝</div>
        <h3 className="vivo-subtitle" style={{ 
          margin: "0 0 16px", 
          color: VIVO_COLORS.violeta 
        }}>
          Para mis hijas
        </h3>
        <p style={{ 
          margin: "0 0 16px", 
          lineHeight: "1.6",
          fontSize: "0.95em"
        }}>
          Esta app fue creada con amor para ustedes, mis princesas. Que la Palabra de Dios ilumine siempre sus caminos y las acompañe en cada paso de sus vidas.
        </p>
        <p style={{ 
          margin: "0 0 20px", 
          fontSize: "0.85em",
          fontStyle: "italic",
          opacity: 0.8
        }}>
          Con todo mi amor, papá ❤️
        </p>
        <button 
          onClick={onClose}
          className="vivo-button"
          style={{
            padding: "8px 16px",
            background: VIVO_COLORS.violeta,
            color: VIVO_COLORS.blanco,
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ✨ Cerrar
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL DE LA APP
// ══════════════════════════════════════════════════════════════════════

function App() {
  const [currentSection, setCurrentSection] = useState('evangelio');
  const [showDedicatoria, setShowDedicatoria] = useState(false);
  const [crossTapCount, setCrossTapCount] = useState(0);
  const crossTapRef = useRef(0);

  // Estado de datos
  const [dailyGospel, setDailyGospel] = useState(null);
  const [gospelLoading, setGospelLoading] = useState(true);

  // Cargar evangelio del día al inicio
  useEffect(() => {
    const todayKey = getTodayKey();
    const loadDailyGospel = async () => {
      try {
        const result = await fetchDailyGospel(todayKey, INTERNAL_LECTIONARY, BIBLE_DATA);
        setDailyGospel(result);
      } catch (error) {
        console.error("Error loading daily gospel:", error);
        setDailyGospel({
          source: "ERROR",
          text: "No se pudo cargar el evangelio del día. Inténtalo de nuevo más tarde.",
          fecha: formatDateEs(todayKey)
        });
      } finally {
        setGospelLoading(false);
      }
    };
    
    loadDailyGospel();
  }, []);

  // Easter egg: 7 taps en el ✞ para mostrar dedicatoria
  const handleCrossTap = () => {
    crossTapRef.current += 1;
    setCrossTapCount(crossTapRef.current);

    if (crossTapRef.current >= 7) {
      setShowDedicatoria(true);
      crossTapRef.current = 0;
      setCrossTapCount(0);
    }

    // Reset counter después de 3 segundos si no llega a 7
    setTimeout(() => {
      if (crossTapRef.current < 7) {
        crossTapRef.current = 0;
        setCrossTapCount(0);
      }
    }, 3000);
  };

  // Renderizar sección actual
  const renderCurrentSection = () => {
    const theme = SECTION_THEMES[currentSection];
    
    switch (currentSection) {
      case 'evangelio':
        return (
          <EvangelioDelDia 
            gospel={dailyGospel} 
            loading={gospelLoading}
            isYellow={theme.bg === VIVO_COLORS.amarillo}
          />
        );
      case 'temas':
        return (
          <TemasQueImportan 
            isYellow={theme.bg === VIVO_COLORS.amarillo}
          />
        );
      case 'estudia':
        return (
          <EstudiaLaBiblia 
            isYellow={theme.bg === VIVO_COLORS.amarillo}
          />
        );
      case 'pregunta':
        return (
          <PreguntaPadreTomas 
            isYellow={theme.bg === VIVO_COLORS.amarillo}
          />
        );
      case 'wallpapers':
        return (
          <WallpapersSalmos 
            isYellow={theme.bg === VIVO_COLORS.amarillo}
          />
        );
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  // Estilos dinámicos para la sección actual
  const theme = SECTION_THEMES[currentSection];

  return (
    <div 
      className="vivo-app"
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        transition: "all 0.5s ease-out",
        position: "relative",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Header con navegación */}
      <header style={{
        background: `rgba(${theme.text === VIVO_COLORS.blanco ? '255,255,255' : '0,0,0'}, 0.1)`,
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid rgba(${theme.text === VIVO_COLORS.blanco ? '255,255,255' : '0,0,0'}, 0.15)`,
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: "480px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span 
              onClick={handleCrossTap}
              style={{
                fontSize: "1.8em",
                cursor: "pointer",
                userSelect: "none",
                transition: "transform 0.2s ease",
                transform: crossTapCount > 0 ? "scale(1.1)" : "scale(1)"
              }}
            >
              ✞
            </span>
            <h1 className="vivo-title" style={{ 
              fontSize: "1.8em", 
              margin: 0,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: "700"
            }}>
              VIVO
            </h1>
          </div>
          
          <div style={{ fontSize: "0.7em", opacity: 0.8, textAlign: "right" }}>
            <div>Biblia para Jóvenes</div>
            <div style={{ fontSize: "0.85em" }}>v{GOVERNANCE_META.version}</div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main style={{
        maxWidth: "480px",
        margin: "0 auto",
        minHeight: "calc(100vh - 140px)"
      }}>
        {renderCurrentSection()}
      </main>

      {/* Navigation */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "480px",
        width: "100%",
        background: `rgba(${theme.text === VIVO_COLORS.blanco ? '255,255,255' : '0,0,0'}, 0.1)`,
        backdropFilter: "blur(20px)",
        borderTop: `1px solid rgba(${theme.text === VIVO_COLORS.blanco ? '255,255,255' : '0,0,0'}, 0.15)`,
        padding: "8px 12px",
        zIndex: 100
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}>
          {[
            { id: 'evangelio', emoji: '☀️', label: 'Evangelio' },
            { id: 'temas', emoji: '🔥', label: 'Temas' },
            { id: 'estudia', emoji: '📖', label: 'Estudia' },
            { id: 'pregunta', emoji: '🙏', label: 'Pregunta' },
            { id: 'wallpapers', emoji: '🎨', label: 'Wallpapers' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className="vivo-nav-button"
              style={{
                background: currentSection === item.id ? 
                  `rgba(${theme.text === VIVO_COLORS.blanco ? '255,255,255' : '0,0,0'}, 0.2)` : 
                  'transparent',
                border: currentSection === item.id ? 
                  `1px solid rgba(${theme.text === VIVO_COLORS.blanco ? '255,255,255' : '0,0,0'}, 0.3)` : 
                  '1px solid transparent',
                color: theme.text,
                padding: "8px 6px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                fontSize: "0.7em",
                minWidth: "55px",
                fontWeight: currentSection === item.id ? "600" : "400"
              }}
            >
              <span style={{ fontSize: "1.6em" }}>{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Dedicatoria overlay */}
      {showDedicatoria && (
        <DedicatoriaOverlay onClose={() => setShowDedicatoria(false)} />
      )}

      {/* Estilos globales */}
      <style jsx>{`
        .vivo-app {
          font-family: Arial, sans-serif;
          line-height: 1.5;
        }
        
        .vivo-title {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        
        .vivo-subtitle {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: 600;
          font-size: 2.5em;
          line-height: 1.1;
        }
        
        .vivo-button {
          font-family: Arial, sans-serif;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .vivo-button:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }
        
        .vivo-nav-button:hover {
          transform: translateY(-2px);
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .loading {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        /* Optimizaciones móvil */
        @media (max-width: 480px) {
          .vivo-subtitle {
            font-size: 2em;
          }
          
          .vivo-nav-button {
            font-size: 0.65em !important;
            min-width: 50px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
