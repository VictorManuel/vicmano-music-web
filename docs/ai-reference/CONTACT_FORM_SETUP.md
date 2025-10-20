# Configuración del Formulario de Contacto

Este documento explica cómo configurar el formulario de contacto para que funcione realmente. Hay varias opciones disponibles:

## Opción 1: Formspree (Recomendada - Más Simple)

### Pasos:
1. Ve a [formspree.io](https://formspree.io) y crea una cuenta gratuita
2. Crea un nuevo formulario
3. Copia el endpoint que te proporcionan (algo como `https://formspree.io/f/xqkoyqkq`)
4. Abre `src/services/contact.service.ts`
5. Reemplaza `YOUR_FORM_ID` en la función `sendContactFormspree` con tu ID real

```typescript
// En sendContactFormspree, cambia esta línea:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
// Por:
const response = await fetch('https://formspree.io/f/xqkoyqkq', {
```

### Ventajas:
- ✅ Gratis hasta 50 envíos por mes
- ✅ No requiere backend
- ✅ Configuración en 5 minutos
- ✅ Los mensajes llegan a tu email

## Opción 2: EmailJS

### Pasos:
1. Ve a [emailjs.com](https://emailjs.com) y crea una cuenta
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Crea un template de email
4. Instala la librería: `npm install @emailjs/browser`
5. Obtén tu Service ID, Template ID y Public Key
6. Descomenta y configura el código en `sendContactEmailJS`

### Ventajas:
- ✅ Más control sobre el formato del email
- ✅ Gratis hasta 200 emails por mes
- ✅ Personalizable

## Opción 3: Netlify Forms (Si usas Netlify)

### Pasos:
1. Agrega `data-netlify="true"` al formulario en `ContactSection.tsx`
2. Agrega un campo hidden con el nombre del formulario
3. Netlify automáticamente capturará los envíos

```tsx
<form onSubmit={handleSubmit} className="space-y-8" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* resto del formulario */}
</form>
```

### Ventajas:
- ✅ Integrado con Netlify
- ✅ No requiere configuración adicional
- ✅ Los envíos aparecen en el dashboard de Netlify

## Opción 4: Google Apps Script (Gratis)

### Pasos:
1. Ve a [script.google.com](https://script.google.com)
2. Crea un nuevo proyecto
3. Usa este código:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, message } = data;
    
    // Enviar email usando Gmail
    const subject = `Nuevo mensaje de contacto de ${name}`;
    const body = `
      Nombre: ${name}
      Email: ${email}
      Mensaje: ${message}
    `;
    
    GmailApp.sendEmail('vicmano.music@gmail.com', subject, body);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Email enviado' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Publica como web app
5. Copia la URL y úsala en `sendContactGoogleAppsScript`

### Ventajas:
- ✅ Completamente gratis
- ✅ Usa tu cuenta de Gmail
- ✅ Control total

## Opción 5: Backend Propio

### Pasos:
1. Crea un endpoint `/api/contact` en tu backend
2. Implementa la lógica de envío de email
3. Usa la función `sendContactBackend`

### Ventajas:
- ✅ Control total
- ✅ Personalizable
- ✅ Requiere servidor

## Configuración Actual

Actualmente el formulario está configurado para usar **Formspree**. Para activarlo:

1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta y un formulario
3. Copia tu Form ID
4. Edita `src/services/contact.service.ts`
5. Reemplaza `YOUR_FORM_ID` con tu ID real

## Prueba del Formulario

Una vez configurado, puedes probar el formulario:

1. Llena los campos
2. Haz clic en "Enviar Mensaje"
3. Verifica que recibas el email
4. Revisa la consola del navegador para errores

## Personalización

Puedes personalizar:
- Los mensajes de éxito/error en `content.json`
- El estilo del formulario en `ContactSection.tsx`
- La lógica de envío en `contact.service.ts`

## Troubleshooting

### Error: "Failed to fetch"
- Verifica que la URL del servicio sea correcta
- Asegúrate de que el servicio esté activo

### Error: "CORS error"
- Algunos servicios requieren configuración CORS
- Considera usar un proxy o cambiar de servicio

### No llegan los emails
- Verifica la configuración del servicio
- Revisa la carpeta de spam
- Confirma que el email de destino sea correcto
