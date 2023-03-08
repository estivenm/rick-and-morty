import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  publicDir: '../public',
  build: '../dist',
  plugins: [react()],
  server: {
    port: 9731
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components/')
      },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles/') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes/') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks/') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages/') },
      { find: '@services', replacement: path.resolve(__dirname, 'src/api/') },
      { find: '@redux', replacement: path.resolve(__dirname, 'src/redux/') },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, 'src/helpers/')
      },
      {
        find: '@context',
        replacement: path.resolve(__dirname, 'src/context/')
      },
      {
        find: '@container',
        replacement: path.resolve(__dirname, 'src/container/')
      },
      {
        find: '@images',
        replacement: path.resolve(__dirname, 'src/assets/images/')
      }
    ]
  }
})
