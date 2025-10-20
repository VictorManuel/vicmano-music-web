# Configuración de Google Apps Script para el Formulario de Contacto

## ¿Qué es Google Apps Script?

Google Apps Script es una plataforma de desarrollo de aplicaciones en la nube de Google que te permite crear scripts que se ejecutan en los servidores de Google. Es **completamente gratuito** y perfecto para manejar formularios de contacto.

## Ventajas de Google Apps Script

- ✅ **Completamente gratuito** (sin límites de envíos)
- ✅ **Sin configuración de servidor** necesaria
- ✅ **Integración con Gmail** para envío de emails
- ✅ **Almacenamiento en Google Sheets** opcional
- ✅ **Muy confiable** (infraestructura de Google)
- ✅ **Fácil de configurar** en 10 minutos

## Pasos para Configurar Google Apps Script

### 1. Crear un Nuevo Proyecto

1. Ve a [script.google.com](https://script.google.com)
2. Haz clic en "Nuevo proyecto"
3. Dale un nombre al proyecto (ej: "Vicmano Music Contact Form")

### 2. Configurar el Script

Reemplaza todo el código en el editor con este script:

```javascript
function doPost(e) {
  try {
    // Parsear los datos del formulario
    const data = JSON.parse(e.postData.contents);
    const { name, email, message, timestamp } = data;
    
    // Validar que todos los campos estén presentes
    if (!name || !email || !message) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Faltan campos requeridos'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Enviar email de notificación
    const subject = `Nuevo mensaje de contacto - ${name}`;
    const body = `
Nuevo mensaje de contacto recibido:

Nombre: ${name}
Email: ${email}
Mensaje: ${message}
Fecha: ${new Date(timestamp).toLocaleString('es-ES')}

---
Este mensaje fue enviado desde el formulario de contacto de Vicmano Music.
    `;
    
    // Enviar email (reemplaza con tu email)
    GmailApp.sendEmail(
      'vicmano.music@gmail.com', // Tu email de destino
      subject,
      body
    );
    
    // Opcional: Guardar en Google Sheets
    // saveToSheet(name, email, message, timestamp);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Mensaje enviado con éxito'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error interno del servidor'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para manejar CORS (IMPORTANTE)
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// Función opcional para guardar en Google Sheets
function saveToSheet(name, email, message, timestamp) {
  try {
    // Crear o abrir una hoja de cálculo
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Si es la primera vez, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 4).setValues([['Nombre', 'Email', 'Mensaje', 'Fecha']]);
    }
    
    // Agregar nueva fila
    sheet.appendRow([name, email, message, new Date(timestamp)]);
  } catch (error) {
    console.error('Error guardando en Sheets:', error);
  }
}
```

### 3. Configurar Permisos

1. Haz clic en "Ejecutar" (▶️) en la barra de herramientas
2. Aparecerá un popup pidiendo permisos
3. Haz clic en "Revisar permisos"
4. Selecciona tu cuenta de Google
5. Haz clic en "Avanzado" → "Ir a [nombre del proyecto] (no seguro)"
6. Haz clic en "Permitir"

### 4. Publicar como Web App

1. Haz clic en "Implementar" → "Nueva implementación"
2. Selecciona "Tipo: Aplicación web"
3. Configura:
   - **Descripción**: "Formulario de contacto Vicmano Music"
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: "Cualquiera"
4. Haz clic en "Implementar"
5. **Copia la URL de la aplicación web** (algo como: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### 5. Actualizar el Código

1. Abre el archivo `src/services/contact.service.ts`
2. Busca la línea:
   ```typescript
   const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
   ```
3. Reemplaza `YOUR_GOOGLE_APPS_SCRIPT_URL` con tu URL real:
   ```typescript
   const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
   ```

### 6. Probar el Formulario

1. Despliega tu sitio web
2. Ve a la sección de contacto
3. Envía un mensaje de prueba
4. Verifica que recibas el email en `vicmano.music@gmail.com`

## Configuración Opcional: Google Sheets

Si quieres guardar los mensajes en una hoja de cálculo:

1. En Google Apps Script, haz clic en "Recursos" → "Librerías"
2. Busca y agrega la librería de Google Sheets
3. Descomenta la línea `saveToSheet(name, email, message, timestamp);` en el script
4. Los mensajes se guardarán automáticamente en una hoja de cálculo

## Solución de Problemas

### Error de CORS
**Problema más común**: Si ves errores de CORS, sigue estos pasos:

1. **Verifica que el script tenga la función `doOptions`**:
   ```javascript
   function doOptions(e) {
     return ContentService
       .createTextOutput('')
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

2. **República la aplicación web**:
   - Ve a "Implementar" → "Administrar implementaciones"
   - Haz clic en "Nueva versión"
   - Selecciona "Implementar"

3. **Verifica la configuración de la aplicación web**:
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: "Cualquiera"

4. **Espera unos minutos** después de republicar para que los cambios se propaguen

### Error: "Script no encontrado"
- Verifica que la URL sea correcta
- Asegúrate de que la aplicación web esté publicada

### No recibo emails
- Revisa la carpeta de spam
- Verifica que el email de destino esté configurado correctamente
- Asegúrate de que los permisos estén configurados

### Error: "HTTP error! status: 405"
- Esto significa que el script no está configurado correctamente
- Verifica que tengas las funciones `doPost` y `doOptions`
- República la aplicación web

## Alternativas Gratuitas

Si prefieres otras opciones:

1. **Netlify Forms** (si usas Netlify para hosting)
2. **EmailJS** (gratuito hasta 200 emails/mes)
3. **Web3Forms** (gratuito, sin límites)
4. **Formspree** (50 envíos/mes gratis)

## Estado Actual

✅ **Configurado**: El código está listo para usar Google Apps Script
⏳ **Pendiente**: Solo necesitas crear el script y obtener la URL
🎯 **Recomendado**: Google Apps Script es la opción más confiable y gratuita
