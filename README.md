# ✞ VIVO - Biblia para Jóvenes

Aplicación PWA católica para jóvenes de 16-30 años con IA pastoral, evangelio diario y sistema de gobernanza pastoral de 9 capas.

## 📱 Características

- ☀️ **Evangelio del Día** - Lectura diaria con reflexiones
- 🔥 **Temas que Importan** - 9 módulos para jóvenes (amor, sexualidad, ansiedad, etc.)
- 📖 **Estudia la Biblia** - Estudios bíblicos clásicos
- 🙏 **Padre Tomás** - Asistente espiritual con IA (Claude)
- 🎨 **Salmos** - Salmos descargables
- 🛡️ **Sistema de Gobernanza** - 9 capas de protección pastoral
- 📲 **PWA Completa** - Funciona offline, instalable en móvil

## 🚀 Requisitos

- Node.js 18+
- npm o yarn
- Clave de API de Anthropic (Claude)

## 📦 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# Edita .env.local y agrega tu REACT_APP_ANTHROPIC_API_KEY

# 3. Desarrollo
npm run dev
# Abre http://localhost:5173

# 4. Build para producción
npm run build

# 5. Preview
npm run preview
```

## 🌐 Deploy a Vercel

### Opción 1: GitHub + Vercel Dashboard

1. Push a GitHub
2. Ve a vercel.com/new
3. Selecciona tu repositorio
4. Agrega variable de entorno: `REACT_APP_ANTHROPIC_API_KEY`
5. Deploy automático

### Opción 2: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

## 🔐 Sistema de Gobernanza (9 Capas)

✅ Detección de crisis (suicidio)
✅ Temas prohibidos bloqueados
✅ Disclaimers contextuales
✅ Prompts blindados
✅ Auditoría completa
✅ Validación pre y post-respuesta

## 📞 Teléfonos Crisis

- España: 024
- Colombia: 106
- México: 800-290-00-24
- Argentina: 130
- Perú: 113

## 📝 Estructura

```
vivo-biblia-pwa/
├── src/
│   ├── App.jsx           (Componente principal)
│   ├── governance.js     (Sistema de gobernanza)
│   ├── main.jsx          (Entry point)
│   └── index.css         (Estilos globales)
├── public/
│   ├── sw.js             (Service Worker)
│   └── manifest.json     (PWA Manifest)
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## ✨ Easter Egg

7 taps en el icono ✞ → Dedicatoria personal

## 📄 Licencia

VIVO es un proyecto con propósito pastoral.
Solo para uso educativo y religioso.

---

**VIVO v1.0 - Biblia para Jóvenes**
✞ Desarrollado con propósito pastoral
