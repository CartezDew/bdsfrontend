import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    react(),
    ...(mode === 'production'
      ? [
          viteImagemin({
            mozjpeg: {
              quality: 96,
              progressive: true
            },
            pngquant: {
              quality: [0.95, 1.0],
              speed: 1
            }
          })
        ]
      : [])
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    assetsInlineLimit: 4096,
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 3000,
    open: true
  }
}))
