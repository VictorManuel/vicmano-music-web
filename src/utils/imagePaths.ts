// Utilidad para manejar rutas de imágenes de forma dinámica
// Esto permite que las imágenes funcionen tanto en desarrollo como en producción

export const getImagePath = (imageName: string): string => {
  // Usar rutas relativas para ambos entornos
  return `/images/${imageName}`;
};

// Rutas predefinidas para imágenes comunes
export const IMAGES = {
  logo: () => getImagePath('logo.webp'),
  vicmano: () => getImagePath('profile.webp'),
  performance: () => getImagePath('performance.webp'),
} as const;
