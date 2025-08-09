import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure proper routing in production
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
})
