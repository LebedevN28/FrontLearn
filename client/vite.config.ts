import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { ManifestOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
  theme_color: '#ece6f5',
  background_color: '#ffffff',
  icons: [
    { purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
    { purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' },
  ],
  screenshots: [
    {
      src: '/screenshots/desktop.png',
      type: 'image/png',
      sizes: '1398x882',
      form_factor: 'wide',
    },
    {
      src: '/screenshots/mobile.png',
      type: 'image/png',
      sizes: '447x767',
      form_factor: 'narrow',
    },
  ],

  orientation: 'any',
  display: 'standalone',

  lang: 'en-GB',
  name: 'FrontLearn App',
  short_name: 'FrontLearn',
  start_url: '/',
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest,
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/images': 'http://localhost:3000',
    },
  },
  build: {
    outDir: '../server/dist',
  },
});
