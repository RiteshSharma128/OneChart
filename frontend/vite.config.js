import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure Vite resolves png files
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
})
