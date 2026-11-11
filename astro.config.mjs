import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://javierfr7625-cell.github.io',
  base: '/PI-Apuntes',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'tokyo-night',
      wrap: true,
    },
  },
});
