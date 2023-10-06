import react from '@vitejs/plugin-react-swc';
import path from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/prc-collections/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    Pages(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8001,
    host: '0.0.0.0'
  },
});
