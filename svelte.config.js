import adapter from "@sveltejs/adapter-static";
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Add preprocess here, it's essential for the compilerOptions to work
  // preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      inlineStyleThreshold: Infinity,
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore 404s for image files during prerendering
        if (
          path.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
          (message.includes("404") && referrer)
        ) {
          console.warn(`Ignoring 404 for ${path} (linked from ${referrer})`);
          return;
        }

        // Throw for other errors
        throw new Error(message);
      },
    },
  },
  onwarn: (warning, handler) => {
    return
    if (warning.code === 'a11y_click_events_have_key_events'){ return }
    handler(warning)
  },
  /*
  compilerOptions: {
    dev: true,
    cssHash: ({ hash, css, name, filename }) => {
      console.log("css:",css,"|",name)
      // Generate short names in production
      if (import.meta.env.PROD) {
        return generateCounterClassName();
      }
      return name +"__"+ generateCounterClassName();
    }
  }
  */
};
