// @ts-check
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  root: 'src',
  build: {
    outDir: '..',
  },
  base: 'https://meowtec.github.io/url-editor/',
  plugins: [react()],
  // workaround for esbuild does not support jsx automatic runtime
  esbuild: {
    jsxFactory: 'createElement',
    jsxInject: `import { createElement } from '${
      command === 'build' ? 'preact' : 'react'
    }'`,
  },
  resolve: {
    alias: {
      ...(command === 'build'
        ? {
            react: 'preact/compat',
            'react-dom': 'preact/compat',
          }
        : {}),
    },
  },
}));
