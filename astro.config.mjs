import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeBaseAssets from './src/lib/rehype-base-assets.mjs';

const rawBase = process.env.BASE_PATH || '/vela-project';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/|\/$/g, '')}`;
const site = process.env.SITE_URL || 'https://dac114514.github.io';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [[rehypeBaseAssets, { base }]],
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
