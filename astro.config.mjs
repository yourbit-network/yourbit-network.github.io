import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourbit.network',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never' },
});
