import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Markdown from './src/vitePluginMd'
import Pages from 'vite-plugin-pages'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.ts$/],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dirs: [], // 覆盖默认值 ['src/components']
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/], // 注：md中的组件自动导入在打包后不生效
      resolvers: [ElementPlusResolver()]
    }),
    Markdown(),
    Pages({
      dirs: 'src/source',
      extensions: ['md']
    }),
    ClientSideLayout({
      defaultLayout: 'Default', // 默认布局使用 ‘src/layouts/Default.vue’
      importMode: 'async'
    })
  ]
})
