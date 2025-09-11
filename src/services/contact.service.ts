export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

// Opción 1: Envío por email usando EmailJS (requiere configuración)
export const sendContactEmailJS = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    // Necesitas configurar EmailJS primero
    // 1. Crear cuenta en emailjs.com
    // 2. Configurar template de email
    // 3. Instalar: npm install @emailjs/browser
    
    // Ejemplo de implementación con EmailJS:
    /*
    import emailjs from '@emailjs/browser'
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'vicmano.music@gmail.com'
    }
    
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    )
    
    return {
      success: true,
      message: 'Mensaje enviado con éxito'
    }
    */
    
    throw new Error('EmailJS no está configurado')
  } catch (error) {
    return {
      success: false,
      message: 'Error al enviar el mensaje'
    }
  }
}

// Función principal para enviar formulario de contacto usando Google Apps Script (COMPLETAMENTE GRATUITO)
export const sendContactForm = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    // Reemplaza 'YOUR_GOOGLE_APPS_SCRIPT_URL' con la URL de tu Google Apps Script
    // Para obtenerlo: 1. Ve a script.google.com, 2. Crea un nuevo proyecto, 3. Publica como web app
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString()
      }),
    })

    const data = await response.json()

    if (data.success) {
      return {
        success: true,
        message: '¡Mensaje enviado con éxito! Te responderemos pronto.'
      }
    } else {
      throw new Error(data.message || 'Error al enviar el mensaje')
    }
  } catch (error) {
    console.error('Error enviando formulario:', error)
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
    }
  }
}

// Función alternativa usando Formspree (mantenida para compatibilidad)
export const sendContactFormspree = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    // Reemplaza 'YOUR_FORM_ID' con tu ID de formulario de Formspree
    // Para obtenerlo: 1. Ve a formspree.io, 2. Crea cuenta gratuita, 3. Crea nuevo formulario
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `Nuevo mensaje de ${formData.name} - Vicmano Music`
      }),
    })

    if (response.ok) {
      return {
        success: true,
        message: '¡Mensaje enviado con éxito! Te responderemos pronto.'
      }
    } else {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error en la respuesta del servidor')
    }
  } catch (error) {
    console.error('Error enviando formulario:', error)
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
    }
  }
}

// Opción 3: Envío usando Netlify Forms (si usas Netlify)
export const sendContactNetlify = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    // Para Netlify Forms, solo necesitas agregar data-netlify="true" al form
    // y Netlify automáticamente capturará los envíos
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'form-name': 'contact',
        ...formData,
      }),
    })

    if (response.ok) {
      return {
        success: true,
        message: 'Mensaje enviado con éxito'
      }
    } else {
      throw new Error('Error en la respuesta del servidor')
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error al enviar el mensaje'
    }
  }
}

// Opción 4: Envío usando tu propio backend
export const sendContactBackend = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Mensaje enviado con éxito'
      }
    } else {
      throw new Error(data.message || 'Error en el servidor')
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error al enviar el mensaje'
    }
  }
}

// Opción 5: Envío usando Google Apps Script (gratis)
export const sendContactGoogleAppsScript = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    // Necesitas crear un Google Apps Script y publicarlo como web app
    const response = await fetch('https://script.google.com/macros/s/AKfycbzmo4c9YejxS5BVlADEHW8IFlUgbd5jGU8ANR9_b4PlIHHAri07lb1UKNd9qEu9ZXtuzQ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (data.success) {
      return {
        success: true,
        message: 'Mensaje enviado con éxito'
      }
    } else {
      throw new Error(data.message || 'Error al enviar')
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error al enviar el mensaje'
    }
  }
}
