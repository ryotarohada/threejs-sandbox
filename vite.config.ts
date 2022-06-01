import { resolve } from 'path'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

export default defineConfig({
  plugins: [ViteEjsPlugin()],
  root: 'src',
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      '@/': `${__dirname}/src/ts/`,
    },
  },
})
