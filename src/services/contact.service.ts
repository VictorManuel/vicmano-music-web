export interface ContactFormData {
  name: string
  email: string
  message: string
}
export interface ContactResponse {
  success: boolean
  message: string
}

// Configuración de Formspree - Reemplaza con tu endpoint de Formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';

export const sendContactFormspree = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  // timeout opcional para UX
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 15000);

  try {
    // Formspree espera FormData en lugar de JSON
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formDataToSend,
      signal: ac.signal,
    });

    clearTimeout(t);

    // Formspree devuelve 200 si el envío es exitoso
    if (res.ok) {
      return { success: true, message: 'Mensaje enviado con éxito' };
    }

    // Si hay error, intentar obtener el mensaje de error
    const errorText = await res.text().catch(() => '');
    return {
      success: false,
      message: `Error al enviar el mensaje: ${res.status} ${errorText}`,
    };
  } catch {
    clearTimeout(t);
    return { success: false, message: 'Error al enviar el mensaje' };
  }
};

// Mantener el servicio anterior por compatibilidad (opcional)
export const sendContactGoogleAppsScript = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  const API = 'https://script.google.com/macros/s/AKfycbzmo4c9YejxS5BVlADEHW8IFlUgbd5jGU8ANR9_b4PlIHHAri07lb1UKNd9qEu9ZXtuzQ/exec';

  // timeout opcional para UX
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 15000);

  try {
    const res = await fetch(API, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
      signal: ac.signal,
    });

    clearTimeout(t);

    // Maneja HTTP no-2xx
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${txt}`);
    }

    // Respuesta JSON del GAS
    const data = await res.json().catch(() => null);

    if (data?.success) {
      return { success: true, message: data.message ?? 'Mensaje enviado con éxito' };
    }

    return {
      success: false,
      message: data?.message ?? 'No se pudo confirmar el envío',
    };
  } catch {
    clearTimeout(t);
    return { success: false, message: 'Error al enviar el mensaje' };
  }
};
