/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="unplugin-icons/types/vue" />

declare module 'md:search' {
  const documents: { id: number; file: string; title: string; path: string; anchors: string }[]
  export { documents }
}
