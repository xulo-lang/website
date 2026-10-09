import { xuloGrammar } from './src/lib/xulo-grammar';
import { defineConfig } from 'fumadocs-mdx/config';

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      langs: [xuloGrammar],
    },
  },
});
