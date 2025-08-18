import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { transform } from "esbuild";
import fs from 'fs'

// Custom base64 alphabet (CSS-safe characters only)
const BASE64_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
globalThis.cssClassCounter = 65;

const numberToBase64 = (num) => {
  let value = "";
  while (num > 0) {
    value = BASE64_CHARS[num % 62] + value;
    num = Math.floor(num / 62);
  }
  return value;
}

const generateCounterClassName = () => {
  return numberToBase64(globalThis.cssClassCounter++);
};

let cssClasses: string[] = []
const cssNamesMap: Map<string,string> = new Map()
let isPrerender = false

const closeBundlePlugin = () => {
  return {
    name: 'close-plugin',    
    configResolved(config) {
      isPrerender = config.build.ssr
      if(isPrerender){
        fs.writeFileSync("css-build.txt","")
      } else {
        try {
          const cssfile = fs.readFileSync("css-build.txt", { encoding: "utf-8" })
          const lines = cssfile.split("\n")
          for(const line of lines){
            const [minifiedCode,key] = line.split(" ")
            cssNamesMap.set(key,minifiedCode)
          }
          console.log(`se agregaron ${lines.length} css clases minificadas.`)
          globalThis.cssClassCounter += lines.length + 1
        } catch (error) {
          console.log("No se encontró: css-build.txt")
        }
      }
    },
    transform(_, id) {
      if(isPrerender && cssClasses.length > 0){
        const cssClassesToAppend = [...cssClasses]
        cssClasses = []        
        fs.appendFileSync("css-build.txt",cssClassesToAppend.join("\n"))
        console.log(`\nagregadas ${cssClassesToAppend.length} clases .css`)
      }
    },
  };
};

export default defineConfig({
  plugins: [
    {
      name: "minify-raw-js",
      async transform(code, id) {
        // console.log("file:", id);
        if (id.includes(".js?raw")) {
          console.log("Processing with ?raw:", id);
          const match = code.match(/^export default "((?:.|\n)*)"$/);

          if (match && match[1]) {
            // The extracted raw code, unescaped
            const rawCode = JSON.parse(`"${match[1]}"`);
            console.log("Code extracted. Original length:", rawCode.length);

            const result = await transform(rawCode, {
              minify: true, loader: "js", format: "esm",
            });
            // Re-wrap the minified code in the 'export default "..."' format
            // The JSON.stringify handles escaping characters.
            return `export default ${JSON.stringify(result.code)}`;
          }
        }
      },
    },
    tailwindcss(),
    sveltekit(),
    closeBundlePlugin()
  ],
  // assetsInclude: ["*/blurhash.js"],
  css: {
    modules: {
      generateScopedName: (name, filename_, css) => {
        const filename = filename_.split("/src/")[1]
        // Generate short names in production
        if (process.env.NODE_ENV === "production") {
          const key = `${name}__${filename}`
          if(cssNamesMap.has(key)){
            return cssNamesMap.get(key) as string
          }
          const minifiedCode = generateCounterClassName()
          cssClasses.push(`${minifiedCode} ${key}`)
          // console.log(`[${code}] ${name} | ${filename}`)
          return minifiedCode;
        } else {
          return name +"__"+ generateCounterClassName();
        }
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
