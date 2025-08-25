import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig(({ mode }) => ({
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
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 3000,
    open: true
  }
}))
