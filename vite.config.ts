import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { transform } from "esbuild";
import crypto from "crypto";

// Custom base64 alphabet (CSS-safe characters only)
const BASE64_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function numberToBase64(num, minLength = 2) {
  if (num === 0) return "A".repeat(minLength);

  let result = "";
  while (num > 0) {
    result = BASE64_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
}

let cssClassCounter = 65;
const generateCounterClassName = () => {
  return numberToBase64(cssClassCounter++, 3);
};

export default defineConfig({
  plugins: [
    {
      name: "minify-raw-js",
      async transform(code, id) {
        // console.log("file:", id);
        if (id.includes(".js?raw")) {
          // console.log("minificando:", id);
          // console.log("minificando:", code);
          console.log("Processing with ?raw:", id);
          const match = code.match(/^export default "((?:.|\n)*)"$/);

          if (match && match[1]) {
            // The extracted raw code, unescaped
            const rawCode = JSON.parse(`"${match[1]}"`);
            console.log("Code extracted. Original length:", rawCode.length);

            const result = await transform(rawCode, {
              minify: true,
              loader: "js",
              // The format should be 'esm' or 'iife' depending on usage,
              // but since we are wrapping it back as a string, it doesn't matter much.
              format: "esm",
            });

            // console.log("Code minified. Minified:", result.code);

            // Re-wrap the minified code in the 'export default "..."' format
            // The JSON.stringify handles escaping characters.
            return `export default ${JSON.stringify(result.code)}`;
          }
        }
      },
    },
    tailwindcss(),
    sveltekit(),
  ],
  // assetsInclude: ["*/blurhash.js"],
  css: {
    modules: {
      generateScopedName: (name, filename, css) => {
        return generateCounterClassName();
        // Generate short names in production
        if (process.env.NODE_ENV === "production") {
          return `_${Math.random().toString(36).substr(2, 3)}`;
        }
        return name; // Keep original names in development
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          return "my-app";
        },
      },
    },
  },
});
