import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/diyStockManage/',
  // global css
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
  },

  // server config
  server: {
    host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    port: 3301,
    open: true,
    cors: true, 
    // https: false,
    // 代理跨域（mock 不需要配置，这里只是个事列）
    proxy: {
      "/api": {
        target: "https://mock.mengxuegu.com/mock/63e6fca84b99657e29850711/stockmanage", // easymock
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    react(),
    viteEslint({
      failOnError: false
    })
  ]
})
