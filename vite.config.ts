import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita las funciones globales como describe, test, expect
    environment: 'jsdom', // Usa jsdom para las pruebas en el navegador
  },
});
