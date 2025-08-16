# Contexto del Proyecto: Vicmano Music Web

## 📋 Resumen Ejecutivo

**Vicmano Music Web** es un sitio web portfolio/presskit para **Vicmano**, un DJ especializado en música electrónica (Tech House, Minimal Techno, Hard Techno). El proyecto está construido como una Single Page Application (SPA) moderna con React, TypeScript y TailwindCSS.

## 🎯 Propósito del Proyecto

- **Portfolio digital** para mostrar la música y eventos de Vicmano
- **Presskit profesional** con información para contrataciones
- **Sitio web oficial** con galería, agenda de shows y formulario de contacto
- **Integración social** con Instagram y YouTube

## 🏗️ Arquitectura Técnica

### Stack Tecnológico Principal
- **Frontend**: React 18.2.0 + TypeScript 4.9.5
- **Build Tool**: Vite 5.2.10
- **Styling**: TailwindCSS 4.1.12
- **Animaciones**: Framer Motion 10.16.4
- **Formularios**: React Hook Form 7.60.0 + Zod 4.0.5
- **Iconos**: Lucide React 0.292.0
- **Partículas**: React Particles 2.12.2

### Estructura de Carpetas
```
src/
├── components/          # Componentes organizados por funcionalidad
│   ├── common/         # Componentes reutilizables (Header, Footer, Forms, ErrorBoundary)
│   └── sections/       # Secciones principales de la página
├── context/            # Context API para estado global
├── hooks/              # Hooks personalizados (useFetch, useErrorHandler)
├── models/             # Interfaces TypeScript
├── pages/              # Páginas principales
├── services/           # Servicios y utilidades
├── styles/             # Estilos globales
├── ErrorBoundary.tsx   # ErrorBoundary principal
└── content.json        # Contenido multiidioma
```

## 🌐 Sistema de Internacionalización

### Implementación
- **Context API**: `LanguageContext` maneja el estado del idioma
- **Almacenamiento**: LocalStorage para persistir preferencia del usuario
- **Detección automática**: Detecta idioma del navegador (es/en)
- **Función de traducción**: `t(key, section?)` para acceder al contenido

### Estructura de Contenido
```json
{
  "es": {
    "hero": { "title": "Vicmano", "subtitle": "..." },
    "about": { "title": "Sobre mí", "text": "..." },
    "contact": { "title": "Contacto", "email": "..." }
  },
  "en": {
    "hero": { "title": "Vicmano", "subtitle": "..." },
    "about": { "title": "About", "text": "..." },
    "contact": { "title": "Contact", "email": "..." }
  }
}
```

## 🎨 Patrones de Diseño

### Componentes
- **Composición**: Componentes modulares y reutilizables
- **Props**: TypeScript interfaces para type safety
- **Hooks personalizados**: `useLanguage()` para internacionalización, `useErrorHandler()` para manejo de errores
- **Motion Components**: Wrappers de Framer Motion para animaciones
- **ErrorBoundary**: Sistema completo de manejo de errores con UI de fallback

### Estilos
- **TailwindCSS**: Utility-first CSS framework
- **Gradientes**: Uso extensivo de gradientes púrpura/fucsia
- **Backdrop blur**: Efectos de transparencia y blur
- **Responsive**: Mobile-first design
- **Dark theme**: Tema oscuro predominante

### Animaciones
- **Framer Motion**: Animaciones de entrada y transiciones
- **ParticleBackground**: Fondo animado con partículas
- **Hover effects**: Efectos interactivos en botones y enlaces

## 📱 Secciones del Sitio

### Secciones Activas (en home.tsx)
- ✅ **HeroSection**: Introducción principal con título y enlaces sociales
- ✅ **AboutSection**: Información biográfica de Vicmano
- ✅ **Footer**: Pie de página

### Secciones Comentadas (deshabilitadas)
- ⏸️ **ShowsSection**: Agenda de próximos eventos
- ⏸️ **GallerySection**: Galería de fotos/videos
- ⏸️ **MusicSection**: Música y sets
- ⏸️ **ContactSection**: Formulario de contacto
- ⏸️ **InstagramSection**: Feed de Instagram

## 🔧 Funcionalidades Clave

### Formulario de Contacto
- **Validación**: React Hook Form + Zod
- **Estados**: Loading, success, error
- **Simulación**: Actualmente simula envío (no backend real)
- **Responsive**: Adaptable a móviles

### Navegación
- **Header**: Navegación principal con selector de idioma
- **Smooth scroll**: Navegación suave entre secciones
- **Snap sections**: Scroll snapping para secciones

### Performance
- **Lazy loading**: Componentes cargados bajo demanda
- **Optimización**: Vite para build optimizado
- **Bundle splitting**: Separación automática de chunks

### Manejo de Errores
- **ErrorBoundary**: Captura errores de componentes React
- **ErrorBoundaryWrapper**: Wrapper reutilizable para componentes específicos
- **Hooks de error**: `useErrorHandler`, `useFormErrorHandler`, `useApiErrorHandler`
- **UI de fallback**: Interfaz personalizada para errores con diseño consistente
- **Debugging**: Detalles de error solo en modo desarrollo

#### Sistema de ErrorBoundary
```tsx
// ErrorBoundary principal (global)
<ErrorBoundary>
  <App />
</ErrorBoundary>

// ErrorBoundaryWrapper para componentes específicos
<ErrorBoundaryWrapper componentName="MiComponente">
  <MiComponente />
</ErrorBoundaryWrapper>

// Hooks de manejo de errores
const { handleError, handleAsyncError } = useErrorHandler()
const { handleFormError } = useFormErrorHandler()
const { handleApiError } = useApiErrorHandler()
```

#### Características del ErrorBoundary
- **Captura de errores**: `componentDidCatch` y `getDerivedStateFromError`
- **UI de fallback**: Diseño consistente con gradientes púrpura/fucsia
- **Acciones de recuperación**: Reintento y navegación al inicio
- **Información de debug**: Stack trace solo en desarrollo
- **Integración con servicios**: Preparado para Sentry, LogRocket, etc.

## 🎵 Contenido Específico

### Información del Artista
- **Nombre**: Vicmano
- **Géneros**: Tech House, Minimal Techno, Hard Techno, Minimal Psy
- **Inicio**: 2019
- **Actividad**: Streamings durante pandemia, eventos en vivo
- **Ciudades**: Tandil, Necochea, Bahía Blanca, Almería (España)
- **Filosofía**: Crear viajes emocionales desde contemplación hasta baile explosivo

### Contacto
- **Email**: contact@vicmano.com
- **Redes**: YouTube, Instagram
- **Propósito**: Contrataciones y colaboraciones

## 🚀 Scripts y Comandos

```bash
npm run dev      # Desarrollo local (localhost:5173)
npm run build    # Build de producción
npm run preview  # Preview del build
```

## 🌐 Despliegue y CI/CD

### GitHub Actions Workflow
El proyecto incluye un workflow automatizado para despliegue en GitHub Pages:

**Archivo**: `.github/workflows/deploy-pages.yml`

**Características del Workflow**:
- **Triggers**: Push a `main`/`master` y Pull Requests
- **Build Environment**: Ubuntu latest con Node.js 18
- **Cache**: Dependencias npm para builds más rápidos
- **Artefactos**: Carpeta `./dist` optimizada para producción
- **Despliegue**: Solo en ramas principales (main/master)
- **Permisos**: Configuración segura para GitHub Pages

**Jobs del Workflow**:
1. **Build Job**: Instalación, build y preparación de artefactos
2. **Deploy Job**: Despliegue automático a GitHub Pages

**Configuración de Permisos**:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### Estructura de Despliegue
- **Build Output**: `./dist/` (configurado en Vite)
- **Artefactos**: Incluye favicons, assets optimizados y HTML
- **Concurrencia**: Controlada para evitar conflictos de despliegue
- **URL de Despliegue**: Disponible en environment outputs

### Consideraciones para IA
- **Automatización**: No requiere intervención manual para despliegue
- **Optimización**: Build optimizado con Vite para producción
- **Favicons**: Incluidos automáticamente en el despliegue
- **Cache**: Dependencias cacheadas para eficiencia
- **Seguridad**: Permisos mínimos necesarios para GitHub Pages

## 📋 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (ej: `ContactSection`)
- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Hooks**: `use` + PascalCase (ej: `useLanguage`)
- **Context**: `Context` suffix (ej: `LanguageContext`)

### TypeScript
- **Interfaces**: Definidas en `models/`
- **Props**: Interfaces específicas para cada componente
- **Context**: Tipos definidos para Context API

### Imports
- **Relativos**: Para archivos cercanos
- **Absolutos**: Para componentes comunes
- **Barrel exports**: Uso de `index.ts` para exports

## 🔮 Estado Actual y Roadmap

### Implementado
- ✅ Estructura base del proyecto
- ✅ Sistema de internacionalización
- ✅ Componentes principales (Hero, About, Footer)
- ✅ Formulario de contacto (frontend)
- ✅ Animaciones y efectos visuales
- ✅ Sistema completo de ErrorBoundary
- ✅ Hooks personalizados para manejo de errores
- ✅ ErrorBoundaryWrapper para componentes específicos
- ✅ Favicons completos para múltiples plataformas
- ✅ Workflow de GitHub Actions para despliegue automático
- ✅ Configuración optimizada para GitHub Pages

### Pendiente/En Desarrollo
- 🔄 Integración con backend para formulario
- 🔄 Galería de imágenes/videos
- 🔄 Sección de música con embeds
- 🔄 Feed de Instagram
- 🔄 Sistema de shows/agenda
- 🔄 Presskit descargable

## 🛠️ Consideraciones para Desarrollo

### Al Trabajar con el Proyecto
1. **Idioma**: Siempre considerar ambos idiomas (es/en)
2. **Responsive**: Mobile-first approach
3. **Performance**: Optimizar imágenes y animaciones
4. **Accesibilidad**: Mantener estándares WCAG
5. **SEO**: Meta tags y estructura semántica

### Patrones a Seguir
- Usar `useLanguage()` hook para traducciones
- Implementar animaciones con Framer Motion
- Mantener consistencia en colores (púrpura/fucsia)
- Seguir estructura de carpetas establecida
- Usar TypeScript para type safety
- Implementar ErrorBoundary para componentes críticos
- Usar hooks de error para manejo consistente de errores
- Proporcionar UI de fallback para mejor UX

### Integraciones Futuras
- **Email service**: Para formulario de contacto
- **CMS**: Para gestión de contenido
- **Analytics**: Google Analytics o similar
- **Social APIs**: Instagram, YouTube
- **Booking system**: Para gestión de shows
- **Error monitoring**: Sentry, LogRocket para monitoreo de errores

## 📞 Contacto para Soporte

Para consultas técnicas o colaboración:
- **Email**: contact@vicmano.com
- **Proyecto**: Portfolio personal de Vicmano
- **Licencia**: Uso personal (contactar para colaboración)

---

*Este documento debe actualizarse conforme evolucione el proyecto.*
