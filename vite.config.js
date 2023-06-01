import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

console.log(process.env.NODE_ENV === 'production' , 'rinima')
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? './': '/',
  resolve: {
    publicDir:  process.env.NODE_ENV === 'production' ? './': '/',
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
