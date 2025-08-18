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
      handleMissingId: 'ignore',
      handleHttpError: ({ path, referrer, status, message }) => {
        return 'fail';
        /*
        try {
          console.log("=== ERROR HANDLER START ===");
          console.log("hola 1");
          
          // Add more debugging info
          console.log("Error details:", { path, referrer, status, message });
          console.log("hola 2");
          
          // Check if the regex is causing issues
          console.log("About to test regex...");
          const isImageFile = path.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i);
          console.log("Regex result:", isImageFile);
          console.log("hola 2.5");
          
          if (isImageFile || (status === 404 && referrer)) {
            console.log("hola 3 - inside if");
            console.log(`Ignoring 404 for ${path} (linked from ${referrer})`);
            console.log("hola 4 - about to return ignore");
            return 'ignore';
          } else {
            console.log("hola 5 - in else branch");
          }

          console.log("hola 6 - before final return");
          
          return 'ignore';
        } catch (error) {
          console.log("ERROR IN HANDLER:", error);
          return 'ignore';
        }
        */
      },
    },
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
