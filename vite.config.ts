import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  /* todo: 需要改成.env配置环境变量 */
  base: process.env.NODE_ENV === 'production' ? '/easy-chat/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [react()]
})
