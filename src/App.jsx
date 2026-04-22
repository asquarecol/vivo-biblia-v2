import React, { useState, useEffect, useRef } from 'react';

// ══════════════════════════════════════════════════════════════════════
// VIVO — VERSIÓN SIMPLIFICADA PARA BUILD EXITOSO
// ══════════════════════════════════════════════════════════════════════

const VIVO_COLORS = {
  azul: "#0066CC",
  rojo: "#DC2626", 
  verde: "#059669",
  naranja: "#EA580C",
  violeta: "#7C3AED",
  amarillo: "#F59E0B",
  blanco: "#FFFFFF",
  gris: "#6B7280",
};

const SECTION_THEMES = {
  evangelio: { bg: VIVO_COLORS.azul, text: VIVO_COLORS.blanco },
  temas: { bg: VIVO_COLORS.rojo, text: VIVO_COLORS.blanco },
  estudia: { bg: VIVO_COLORS.verde, text: VIVO_COLORS.blanco },
  pregunta: { bg: VIVO_COLORS.violeta, text: VIVO_COLORS.blanco },
  wallpapers: { bg: VIVO_COLORS.amarillo, text: VIVO_COLORS.gris },
};

function EvangelioDelDia({ isYellow }) {
  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 style={{ 
        fontSize: "2.5em", 
        fontWeight: "600", 
        margin: "0 0 8px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}>
        ☀️ Evangelio del Día
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8 }}>
        Miércoles 22 de abril de 2026
      </p>
      
      <div style={{
        background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.1)`,
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 12px", fontSize: "1.2em" }}>
          Evangelio según San Juan (Jn 20,11-18)
        </h3>
        <p style={{ lineHeight: "1.6", fontStyle: "italic", margin: "0 0 16px" }}>
          "María se quedó fuera, junto al sepulcro, llorando. Mientras lloraba, 
          se inclinó hacia el sepulcro y vio dos ángeles vestidos de blanco..."
        </p>
      </div>

      <div style={{
        background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.1)`,
        borderRadius: "12px",
        padding: "16px",
        textAlign: "center"
      }}>
        <p style={{ margin: 0, fontSize: "0.9em", opacity: 0.8 }}>
          🙏 "Jesús le dijo: 'María'. Ella se volvió y le dijo: 'Maestro'"
        </p>
      </div>
    </div>
  );
}

function TemasQueImportan({ isYellow }) {
  const temas = [
    { titulo: "Amor y Relaciones", emoji: "💕", desc: "El amor verdadero según Dios" },
    { titulo: "Ansiedad y Miedos", emoji: "😰", desc: "Paz en medio de la tormenta" },
    { titulo: "Propósito de Vida", emoji: "🎯", desc: "¿Para qué me creó Dios?" },
  ];

  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 style={{ 
        fontSize: "2.5em", 
        fontWeight: "600", 
        margin: "0 0 8px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}>
        🔥 Temas que Importan
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8 }}>
        Para jóvenes como tú
      </p>
      
      <div style={{ display: "grid", gap: "16px" }}>
        {temas.map((tema, index) => (
          <div
            key={index}
            style={{
              background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.2)`,
              borderRadius: "12px",
              padding: "20px",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: "2em", marginBottom: "8px" }}>{tema.emoji}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: "1.1em" }}>{tema.titulo}</h3>
            <p style={{ margin: 0, opacity: 0.8, fontSize: "0.9em" }}>{tema.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EstudiaLaBiblia({ isYellow }) {
  const estudios = [
    { titulo: "Las Bienaventuranzas", ref: "Mt 5,3-12" },
    { titulo: "Padre Nuestro", ref: "Mt 6,9-13" },
    { titulo: "El Hijo Pródigo", ref: "Lc 15,11-32" },
  ];

  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 style={{ 
        fontSize: "2.5em", 
        fontWeight: "600", 
        margin: "0 0 8px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}>
        📖 Estudia la Biblia
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8 }}>
        Fundamentos de la fe
      </p>
      
      <div style={{ display: "grid", gap: "12px" }}>
        {estudios.map((estudio, index) => (
          <div
            key={index}
            style={{
              background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.2)`,
              borderRadius: "8px",
              padding: "16px",
              cursor: "pointer"
            }}
          >
            <h3 style={{ margin: "0 0 4px", fontSize: "1em" }}>{estudio.titulo}</h3>
            <p style={{ margin: 0, opacity: 0.7, fontSize: "0.8em" }}>{estudio.ref}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreguntaPadreTomas({ isYellow }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    setResponse(`━━━ LA ESCRITURA ━━━
"Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente. Este es el primero y grande mandamiento." (Mt 22,37-38)

━━━ PARA TI ━━━
Esta es la respuesta fundamental a toda búsqueda espiritual. Dios te llama a amarlo por encima de todo.

— VIVO · Biblia para Jóvenes`);
  };

  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 style={{ 
        fontSize: "2.5em", 
        fontWeight: "600", 
        margin: "0 0 8px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}>
        🙏 Habla con Padre Tomás
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8 }}>
        Guía espiritual basada en la Sagrada Escritura
      </p>
      
      <div style={{ marginBottom: "20px" }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="¿Qué te inquieta? Pregúntame sobre la fe, la vida, el amor..."
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.3)`,
            background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.1)`,
            color: "inherit",
            fontSize: "1em",
            fontFamily: "inherit",
            resize: "vertical"
          }}
        />
      </div>
      
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "16px",
          background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.2)`,
          border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.3)`,
          borderRadius: "12px",
          color: "inherit",
          fontSize: "1em",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        📝 Enviar Pregunta
      </button>

      {response && (
        <div style={{
          marginTop: "24px",
          background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.1)`,
          borderRadius: "12px",
          padding: "20px"
        }}>
          <div style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
            {response}
          </div>
        </div>
      )}
    </div>
  );
}

function WallpapersSalmos({ isYellow }) {
  const wallpapers = [
    { titulo: "Salmo 23", versiculo: "El Señor es mi pastor", color: VIVO_COLORS.azul },
    { titulo: "Salmo 121", versiculo: "Alzo mis ojos a los montes", color: VIVO_COLORS.amarillo },
  ];

  const downloadWallpaper = (wallpaper) => {
    // Simulación de descarga
    alert(`Descargando wallpaper: ${wallpaper.titulo}`);
  };

  return (
    <div style={{ padding: "24px 20px" }}>
      <h2 style={{ 
        fontSize: "2.5em", 
        fontWeight: "600", 
        margin: "0 0 8px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}>
        🎨 Wallpapers de Salmos
      </h2>
      <p style={{ margin: "0 0 24px", opacity: 0.8 }}>
        Versículos que fortalecen tu día
      </p>
      
      <div style={{ display: "grid", gap: "20px" }}>
        {wallpapers.map((wallpaper, index) => (
          <div
            key={index}
            style={{
              background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.1)`,
              border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.2)`,
              borderRadius: "16px",
              overflow: "hidden"
            }}
          >
            <div 
              style={{
                height: "160px",
                background: wallpaper.color,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: wallpaper.color === VIVO_COLORS.amarillo ? VIVO_COLORS.gris : VIVO_COLORS.blanco,
                textAlign: "center",
                padding: "20px"
              }}
            >
              <h3 style={{ fontSize: "1.3em", fontWeight: "600", margin: "0 0 8px" }}>
                {wallpaper.titulo}
              </h3>
              <p style={{ fontSize: "0.9em", fontStyle: "italic", margin: 0 }}>
                "{wallpaper.versiculo}"
              </p>
            </div>
            <div style={{ padding: "16px" }}>
              <button
                onClick={() => downloadWallpaper(wallpaper)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: `rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.15)`,
                  border: `1px solid rgba(${isYellow ? '0,0,0' : '255,255,255'}, 0.3)`,
                  borderRadius: "8px",
                  color: "inherit",
                  cursor: "pointer"
                }}
              >
                ⬇️ Descargar Wallpaper
              </button>
            </div>
          </div>
        ))}
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
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        background: VIVO_COLORS.blanco,
        color: VIVO_COLORS.gris,
        borderRadius: "16px",
        padding: "32px",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "3em", marginBottom: "16px" }}>💝</div>
        <h3 style={{ margin: "0 0 16px", color: VIVO_COLORS.violeta }}>
          Para mis hijas
        </h3>
        <p style={{ margin: "0 0 20px", lineHeight: "1.6" }}>
          Esta app fue creada con amor para ustedes. Que la Palabra de Dios 
          ilumine siempre sus caminos.
        </p>
        <button 
          onClick={onClose}
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

function App() {
  const [currentSection, setCurrentSection] = useState('evangelio');
  const [showDedicatoria, setShowDedicatoria] = useState(false);
  const [crossTapCount, setCrossTapCount] = useState(0);
  const crossTapRef = useRef(0);

  const handleCrossTap = () => {
    crossTapRef.current += 1;
    setCrossTapCount(crossTapRef.current);

    if (crossTapRef.current >= 7) {
      setShowDedicatoria(true);
      crossTapRef.current = 0;
      setCrossTapCount(0);
    }

    setTimeout(() => {
      if (crossTapRef.current < 7) {
        crossTapRef.current = 0;
        setCrossTapCount(0);
      }
    }, 3000);
  };

  const renderCurrentSection = () => {
    const theme = SECTION_THEMES[currentSection];
    const isYellow = theme.bg === VIVO_COLORS.amarillo;
    
    switch (currentSection) {
      case 'evangelio': return <EvangelioDelDia isYellow={isYellow} />;
      case 'temas': return <TemasQueImportan isYellow={isYellow} />;
      case 'estudia': return <EstudiaLaBiblia isYellow={isYellow} />;
      case 'pregunta': return <PreguntaPadreTomas isYellow={isYellow} />;
      case 'wallpapers': return <WallpapersSalmos isYellow={isYellow} />;
      default: return <div>Sección no encontrada</div>;
    }
  };

  const theme = SECTION_THEMES[currentSection];

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      color: theme.text,
      transition: "all 0.5s ease-out",
      position: "relative",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: `rgba(${theme.text === VIVO_COLORS.blanco ? '255,255,255' : '0,0,0'}, 0.1)`,
        backdropFilter: "blur(10px)",
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
                transform: crossTapCount > 0 ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.2s ease"
              }}
            >
              ✞
            </span>
            <h1 style={{ 
              fontSize: "1.8em", 
              margin: 0,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: "700"
            }}>
              VIVO
            </h1>
          </div>
          
          <div style={{ fontSize: "0.7em", opacity: 0.8, textAlign: "right" }}>
            <div>Biblia para Jóvenes</div>
            <div style={{ fontSize: "0.85em" }}>v1.0</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
        padding: "8px 12px",
        zIndex: 100
      }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
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
    </div>
  );
}

export default App;
