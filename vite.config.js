import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin as html } from 'vite-plugin-html';
import px2vw from 'postcss-px-to-viewport';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    html({
      minify: true,
      entry: 'src/main.js',
      template: 'index.html',
      inject: {
        data: {
          title: 'My Vite Vue3 App',
        },
      },
    }),
    legacy({
      targets: ['chrome', 'ios 11'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    postcss: {
      plugins: [
        px2vw({
          viewportWidth: 750,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
        }),
      ],
    },
  },  
});
