import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import CompressionWebpackPlugin from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react() /** gzip压缩 */,
    CompressionWebpackPlugin({
      algorithm: 'gzip',
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: '/src/',
      },
      {
        find: '/@/',
        replacement: '/src/',
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    // 配置 css-module
    modules: {
      // 开启 camelCase 格式变量名转换
      localsConvention: 'camelCase',
      // 类名 前缀
      generateScopedName: '[local]-[hash:base64:5]',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
      },
    },
  },
  define: {
    'process.env.ENV': JSON.stringify(process.env.ENV),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  server: {
    proxy: {
      '/weather': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
      },
    },
  },
})
