import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { resolve } from 'path'


/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $components: resolve('./src/components'),
          $stores: resolve('./src/stores'),
          $utils: resolve('./src/utils')
        }
      }
    }
  }
};

export default config;