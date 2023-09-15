import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: "./", // 类似publicPath，'./'避免打包访问后空白页面，要加上，不然线上也访问不了
 
  // 8月更新-自动导入ElementPlus
  // 需安装 npm install -D unplugin-vue-components unplugin-auto-import
  plugins: [
      inject({ 
        $: "jquery",  // 这里会自动载入 node_modules 中的 jquery   jquery全局变量
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
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
      // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
      '@': path.resolve(process.cwd(), 'src')
    },
  },
  // 8月更新，全局引入less
  css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
                },
                javascriptEnabled: true,
            },
        },
    },
  build: {
    outDir: "dist",
    // 9月更新
    assetsDir: "assets", //指定静态资源存放路径
    sourcemap: false, //是否构建source map 文件
    // 10月更新
    minify: "terser", // 混淆器，terser 构建后文件体积更小，'terser' | 'esbuild'
    chunkSizeWarningLimit: 1500, //chunk 大小警告的限制，默认500KB
    rollupOptions: {
          output: {
              // 最小化拆分包
              manualChunks(id) {
                  if (id.includes('node_modules')) {
                      return id.toString().split('node_modules/')[1].split('/')[0].toString();
                  }
             },
             chunkFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名，[name]表示文件名,[hash]表示该文件内容hash值
         }
    },
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      // 10月更新
      output: {
         comments: true, // 去掉注释内容
      },
    },
  },
  server: {
    https: false, // 是否开启 https
    open: false, // 是否自动在浏览器打开
    cors: true, // 允许跨域  8月更新
    port: 3000, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: [],
  },
});