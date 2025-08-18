// Utilidad para manejar rutas de imágenes de forma dinámica
// Esto permite que las imágenes funcionen tanto en desarrollo como en producción

export const getImagePath = (imageName: string): string => {
  // Usar rutas relativas para ambos entornos
  return `/images/${imageName}`;
};

// Rutas predefinidas para imágenes comunes
export const IMAGES = {
  logo: () => getImagePath('logo.png'),
  vicmano: () => getImagePath('profile.jpg'),
  performance: () => getImagePath('performance.png'),
} as const;
