import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/vicmano-music-web/',
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}); 