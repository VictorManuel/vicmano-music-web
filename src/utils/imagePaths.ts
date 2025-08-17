// Utilidad para manejar rutas de imágenes de forma dinámica
// Esto permite que las imágenes funcionen tanto en desarrollo como en producción

export const getImagePath = (imageName: string): string => {
  // En desarrollo, usar rutas relativas
  if (import.meta.env.DEV) {
    return `/images/${imageName}`;
  }
  
  // En producción (GitHub Pages), incluir el subpath
  return `/vicmano-music-web/images/${imageName}`;
};

// Rutas predefinidas para imágenes comunes
export const IMAGES = {
  logo: () => getImagePath('logo.png'),
  performance: () => getImagePath('performance.png'),
} as const;
