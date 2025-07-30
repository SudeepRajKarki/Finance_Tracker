import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html',
          dest: '.', // place in dist root as 404.html
          rename: '404.html'
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // optional: avoid code splitting
      }
    }
  }
});
