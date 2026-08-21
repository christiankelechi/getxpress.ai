import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 5174, // Specify the port you want to use
    host:"localhost", // Use localhost as the host
  }
})
