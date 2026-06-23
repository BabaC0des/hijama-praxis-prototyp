import { defineConfig } from 'astro/config';

// Static, zero-JS-by-default content site.
// (For the final go-live on hijama-praxis.ch, no `base` needed — it's the domain root.)
export default defineConfig({
  site: 'https://hijama-praxis.ch'
});
