import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === 'production'
      ? [
          viteImagemin({
            mozjpeg: {
              quality: 90,
              progressive: true
            },
            pngquant: {
              quality: [0.85, 0.95],
              speed: 3
            }
          })
        ]
      : [])
  ],
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 3000,
    open: true
  }
}))
