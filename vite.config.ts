import { fileURLToPath, URL } from 'node:url'
import EslintPlugin from 'vite-plugin-eslint'
import VitePluginFonts from 'vite-plugin-fonts'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

const eslintConfig = EslintPlugin({
  fix: true,
  cache: false,
})

const fontsConfig = VitePluginFonts({
  custom: {
    families: [
      {
        name: 'Manrope',
        local: 'Manrope',
        src: './src/styles/fonts/*.ttf',
      },
    ],
  },
})

const svgIconsConfig = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-first',
  customDomId: '__svg__icons__dom__',
})

const autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()],
  imports: ['vitest'],
  dts: true,
})

export default defineConfig({
  plugins: [vue(), eslintConfig, fontsConfig, svgIconsConfig, autoImportConfig],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['element-plus'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/resources" as *; @use "@/styles/vendor" as *;',
      },
    },
  },
})
