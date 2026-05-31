import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev-only: proxy API calls to the backend so `npm run dev` works standalone
  // (production/Docker serves /api same-origin via nginx).
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
