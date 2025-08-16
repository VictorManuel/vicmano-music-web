# Vicmano Music Web

Sitio web oficial de **Vicmano**, DJ especializado en Tech House, Minimal Techno y Hard Techno. Este proyecto sirve como portfolio digital y presskit, permitiendo explorar música, eventos pasados, galería de imágenes, contacto directo e integración con Instagram.

## 🚀 Tecnologías utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Context API](https://reactjs.org/docs/context.html)

## 📁 Estructura del proyecto

```
├── public/             # Archivos estáticos (imágenes, fuentes)
├── src/
│   ├── components/     # Componentes organizados por secciones
│   ├── context/        # Manejo de estado global e internacionalización
│   ├── models/         # Interfaces y modelos TypeScript
│   ├── styles/         # Estilos globales
│   └── content.json    # Contenido editable (multi idioma)
├── index.html
├── package.json
└── tailwind.config.js
```

## ⚙️ Instalación

Cloná este repositorio y luego ejecutá:

```bash
npm install
npm run dev
```

Esto abrirá el sitio localmente en [http://localhost:5173](http://localhost:5173)

## 📦 Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Genera una versión optimizada para producción
- `npm run preview` — Previsualiza la app ya compilada

## 🚀 Despliegue Automático

Este proyecto está configurado con **GitHub Actions** para despliegue automático en **GitHub Pages**.

### Workflow de Despliegue
- **Trigger**: Push a ramas `main` o `master`
- **Build**: Automático con Node.js 18
- **Despliegue**: GitHub Pages desde la carpeta `dist/`
- **URL**: Disponible en la configuración del repositorio

### Configuración del Workflow
```yaml
# .github/workflows/deploy-pages.yml
- Build automático en push a main/master
- Cache de dependencias para builds rápidos
- Despliegue optimizado desde ./dist
- Permisos seguros para GitHub Pages
```

### Para Activar el Despliegue
1. **Habilitar GitHub Pages** en Settings > Pages
2. **Seleccionar fuente**: "GitHub Actions"
3. **Push a main/master** para activar el primer despliegue

## 🌐 Soporte multilenguaje

Este sitio está preparado para mostrar contenido en **español** e **inglés**, gestionado mediante `LanguageContext` y `content.json`.

## 📷 Secciones destacadas

- Hero con introducción
- Música de Vicmano (embed o links)
- Galería de eventos
- Presskit
- Formulario de contacto
- Feed de Instagram embebido

## 📄 Licencia

Este proyecto se distribuye bajo una licencia de uso personal. Para colaboración o adaptación, contactá a través del formulario del sitio.

---

Desarrollado como portfolio profesional por y para **Vicmano** 🎧
