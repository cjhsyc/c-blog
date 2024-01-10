import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

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
    Icons({
      customCollections: {
        c: FileSystemIconLoader('./src/assets/icons', (svg) => svg.replace(/fill=".+?"/g, ''))
      }
    }),
    Markdown(),
    Pages({
      extensions: ['md', 'vue'],
      dirs: [
        {
          dir: 'src/views/home',
          baseRoute: 'home',
          filePattern: 'index.vue'
        },
        {
          dir: 'src/views/source',
          baseRoute: 'source',
          filePattern: '**/*.md'
        }
      ],
      extendRoute: (route) => {
        if (route.path.startsWith('/source')) {
          return {
            ...route,
            meta: {
              ...(route.meta || {}),
              layout: 'SourceLayout'
            }
          }
        }
        return route
      },
      routeNameSeparator: '/'
    }),
    ClientSideLayout({
      defaultLayout: 'Default', // 默认布局使用 ‘src/layouts/Default.vue’
      importMode: 'async'
    })
  ]
})
