import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      manifest: {
        name: 'VIVO - Biblia para Jóvenes',
        short_name: 'VIVO',
        description: 'Biblia católica para jóvenes de 16-30 años con IA pastoral',
        theme_color: '#000a0f',
        background_color: '#000a0f',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.anthropic\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'anthropic-api-cache',
              expiration: {
                maxAgeSeconds: 3600
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true
    }
  }
})
