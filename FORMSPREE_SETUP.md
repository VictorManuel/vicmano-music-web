# Configuración de Formspree

## Pasos para configurar Formspree

### 1. Crear cuenta en Formspree
1. Ve a [Formspree.io](https://formspree.io/)
2. Regístrate con tu email
3. Verifica tu dirección de correo electrónico

### 2. Crear un nuevo formulario
1. En el panel de control de Formspree, haz clic en el botón "+" (Nuevo Formulario)
2. Dale un nombre a tu formulario (ej: "Contacto - Vicmano Music")
3. Formspree generará un ID único para tu formulario

### 3. Configurar el endpoint en el código
1. Abre el archivo `src/services/contact.service.ts`
2. Busca la línea:
   ```typescript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';
   ```
3. Reemplaza `YOUR_FORM_ID_HERE` con el ID de tu formulario de Formspree
4. El endpoint final debería verse así:
   ```typescript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpzgkqyw';
   ```

### 4. Configurar notificaciones (opcional)
1. En el panel de Formspree, ve a la configuración de tu formulario
2. Puedes configurar:
   - Email de destino para las notificaciones
   - Mensaje de confirmación personalizado
   - Redirección después del envío
   - Filtros de spam

### 5. Probar el formulario
1. Ejecuta tu aplicación localmente
2. Ve a la sección de contacto
3. Envía un mensaje de prueba
4. Verifica que recibas la notificación en tu email

## Características implementadas

- ✅ Envío de formulario con Formspree
- ✅ Manejo de errores
- ✅ Estados de carga
- ✅ Mensajes de éxito/error
- ✅ Timeout de 15 segundos
- ✅ Validación de campos requeridos
- ✅ Soporte para múltiples idiomas (ES/EN)

## Campos del formulario

El formulario envía los siguientes campos a Formspree:
- `name`: Nombre del usuario
- `email`: Email del usuario  
- `message`: Mensaje del usuario

## Notas importantes

- Formspree tiene un límite de 50 envíos por mes en el plan gratuito
- Los formularios de Formspree requieren verificación de email la primera vez
- El servicio anterior de Google Apps Script se mantiene por compatibilidad
