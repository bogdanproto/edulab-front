import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), imagetools(), svgr()],
  resolve: {
    alias: {
      '@': '/src/',
      components: '/src/components/',
      public: '/public/',
      pages: '/src/pages',
      types: '/src/types',
    },
  },
});
