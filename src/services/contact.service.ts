export interface ContactFormData {
  name: string
  email: string
  message: string
}
export interface ContactResponse {
  success: boolean
  message: string
}

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
  } catch (err) {
    clearTimeout(t);
    return { success: false, message: 'Error al enviar el mensaje' };
  }
};
