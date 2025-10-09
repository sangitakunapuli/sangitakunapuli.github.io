// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'   // <-- v4 integration

export default defineConfig({
  site: 'https://sangitakunapuli.github.io',
  // no @astrojs/tailwind here
  vite: {
    plugins: [tailwindcss()],
  },
})
