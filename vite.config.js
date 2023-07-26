import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // transpileDependencies: true,
  base: './',
  publicPath: "./",
  entry: {
    main: '/src/main.js',
  },
  plugins: [vue()],
  resolve: {
    // alias: {
    //   '@': 'src'
    // }
  },
})
