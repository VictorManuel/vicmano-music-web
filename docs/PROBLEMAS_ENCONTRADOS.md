# 🔍 Listado de Problemas y Mejoras Recomendadas

Este documento contiene un análisis de la estructura del proyecto y los problemas encontrados que deberían corregirse.

## 🚨 Problemas Críticos

### 1. **Interfaz Duplicada en LanguageContext.tsx**
**Ubicación:** `src/context/LanguageContext.tsx` (líneas 13-18 y 20-25)

**Problema:** La interfaz `LanguageContextType` está definida dos veces, lo que puede causar confusión y errores de TypeScript.

**Solución:** Eliminar una de las definiciones duplicadas.

---

### 2. **API Key Hardcodeada Expuesta**
**Ubicación:** `src/services/contact.service.ts` (línea 57)

**Problema:** La URL del Google Apps Script está hardcodeada y expuesta públicamente en el código.

```typescript
const API = 'https://script.google.com/macros/s/AKfycbzmo4c9YejxS5BVlADEHW8IFlUgbd5jGU8ANR9_b4PlIHHAri07lb1UKNd9qEu9ZXtuzQ/exec';
```

**Riesgo:** 
- La URL puede ser utilizada por terceros
- No hay separación entre entornos (desarrollo/producción)
- Dificulta el mantenimiento

**Solución:** 
- Mover a variables de entorno usando `import.meta.env`
- Crear archivo `.env.example` con placeholder
- Actualizar `.gitignore` para asegurar que `.env` no se suba

---

### 3. **FormValues Schema No Coincide con el Formulario Real**
**Ubicación:** `src/models/form.model.ts`

**Problema:** El schema de validación incluye campos `password` y `confirmPassword` que no existen en el formulario de contacto real (que solo tiene `name`, `email`, `message`).

**Evidencia:**
- `ContactSection.tsx` usa `ContactFormData` con `name`, `email`, `message`
- `CustomForm.tsx` usa `FormValues` con `password` y `confirmPassword`
- `CustomForm` parece ser un componente de ejemplo que no se usa en la aplicación

**Solución:**
- Crear un schema específico para el formulario de contacto
- O eliminar `CustomForm` si no se está usando
- Actualizar `form.model.ts` para reflejar los campos reales

---

### 4. **GlobalContext con Validación Problemática**
**Ubicación:** `src/context/GlobalContext.tsx` (líneas 28-32)

**Problema:** El hook `useGlobalContext` lanza un error si `value === 0` o `value === EmptyGlobalState` (que es 0), lo que significa que siempre fallará cuando el valor sea 0.

```typescript
if (!context.value || context.value === EmptyGlobalState) {
    throw new Error("useGlobalContext must be used within a GlobalProvider")
}
```

**Solución:** Cambiar la validación para verificar solo si el contexto no está definido:

```typescript
if (!context || context.value === null) {
    throw new Error("useGlobalContext must be used within a GlobalProvider")
}
```

---

## ⚠️ Problemas de Configuración y Mantenimiento

### 5. **Falta de Variables de Entorno**
**Problema:** No hay soporte para variables de entorno, especialmente para:
- Endpoints de API (Formspree, Google Apps Script)
- URLs de servicios externos
- Configuraciones sensibles

**Solución:**
- Crear archivo `.env.example` con placeholders
- Configurar Vite para leer variables de entorno (`import.meta.env`)
- Actualizar `contact.service.ts` para usar variables de entorno
- Documentar cómo configurar las variables

---

### 6. **TypeScript Desactualizado**
**Ubicación:** `package.json` (línea 56)

**Problema:** TypeScript está en versión `4.9.5` mientras que las dependencias de React están en versiones más recientes (19.x).

**Solución:** Actualizar TypeScript a una versión más reciente compatible (5.x):

```bash
npm install -D typescript@^5.3.0
```

---

### 7. **Workflow de GitHub Actions No Existe**
**Problema:** El `README.md` menciona un workflow de GitHub Actions para despliegue automático en GitHub Pages, pero no existe el archivo `.github/workflows/deploy-pages.yml`.

**Solución:**
- Crear el workflow de GitHub Actions, o
- Actualizar el README para reflejar la realidad del proyecto

---

### 8. **Formspree Endpoint No Configurado**
**Ubicación:** `src/services/contact.service.ts` (línea 12)

**Problema:** El endpoint de Formspree está con placeholder `YOUR_FORM_ID_HERE`.

**Solución:** Configurar el endpoint real o moverlo a variables de entorno.

---

## 📝 Mejoras Recomendadas

### 9. **Componente CustomForm No Utilizado**
**Ubicación:** `src/components/common/CustomForm/`

**Problema:** El componente `CustomForm` parece ser un ejemplo que no se está usando en la aplicación real. El formulario de contacto usa un enfoque diferente.

**Solución:**
- Eliminar si no se necesita, o
- Documentar su propósito si se planea usar en el futuro

---

### 10. **Falta Validación de Tipos en Content JSON**
**Problema:** El archivo `content.json` no tiene validación de tipos TypeScript, lo que puede llevar a errores en runtime si la estructura cambia.

**Solución:**
- Crear una interfaz TypeScript para el contenido
- Usar validación en tiempo de ejecución (como Zod)
- Generar tipos desde el JSON si es posible

---

### 11. **Inconsistencia en Nombres de Componentes**
**Observación:** 
- Algunos componentes usan `FC` (FunctionComponent)
- Algunos usan `export default`
- Algunos usan `export const`

**Solución:** Establecer una convención consistente en todo el proyecto.

---

### 12. **Falta de Tests**
**Ubicación:** `package.json` (línea 26)

**Problema:** El script de test solo muestra un mensaje indicando que no hay tests configurados.

**Solución:**
- Configurar un framework de testing (Vitest recomendado para Vite)
- Agregar tests básicos para componentes críticos
- Implementar tests de integración para servicios

---

### 13. **Formulario de Contacto Comentado**
**Ubicación:** `src/components/sections/ContactSection/ContactSection.tsx` (líneas 91-187)

**Problema:** Todo el formulario está comentado, solo se muestran los links de contacto.

**Solución:**
- Descomentar y activar el formulario si se quiere usar, o
- Eliminar el código comentado si no se planea usar

---

### 14. **Falta de Documentación de Arquitectura**
**Problema:** No hay documentación sobre:
- Flujo de datos en la aplicación
- Estructura de carpetas y su propósito
- Patrones de diseño utilizados
- Convenciones de código

**Solución:** Crear documentación técnica completa (ver `ARCHITECTURE.md`).

---

### 15. **Manejo de Errores con Alert**
**Ubicación:** `src/components/sections/ContactSection/ContactSection.tsx` (líneas 40, 44)

**Problema:** Uso de `alert()` para mostrar errores, lo cual no es una buena práctica de UX.

**Solución:** Implementar un sistema de notificaciones más elegante (Toast notifications).

---

## 🎯 Prioridades de Corrección

### Alta Prioridad:
1. Eliminar interfaz duplicada en LanguageContext
2. Configurar variables de entorno para APIs
3. Corregir validación en GlobalContext
4. Actualizar schema de formulario o eliminar CustomForm

### Media Prioridad:
5. Actualizar TypeScript
6. Crear workflow de GitHub Actions o actualizar README
7. Configurar Formspree endpoint
8. Descomentar o eliminar formulario de contacto

### Baja Prioridad:
9. Establecer convenciones de código consistentes
10. Agregar tests
11. Mejorar manejo de errores/notificaciones
12. Documentar arquitectura

---

## 📌 Notas Adicionales

- El proyecto usa correctamente `imagePaths.ts` para manejar rutas de imágenes
- La estructura de carpetas está bien organizada
- El uso de Context API es apropiado para el tamaño del proyecto
- El sistema de internacionalización está bien implementado
- TailwindCSS está correctamente configurado

