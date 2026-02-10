import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  server: {
    allowedHosts: ['client-production-1ce9.up.railway.app','www.alphadev.uz']
  },

  preview: {
    allowedHosts: ['client-production-1ce9.up.railway.app','www.alphadev.uz']
  }
})
