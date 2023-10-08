import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {//配置代理的路径
        target:"http://127.0.0.1:8800",//目标地址 --> 服务器地址
        changeOrigin:true,// 允许跨域
        ws: true,// 允许websocket代理
        rewrite:(path) => path.replace(/^\/api/,""),// 重写路径 --> 作用与配置pathrewrite作用相同 
      }
    }
  }
})
