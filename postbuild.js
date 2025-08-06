// post-build.js
// This script runs after the SvelteKit build to inline CSS into the final HTML files.

import fs from 'fs/promises';
import path from 'path';

// --- CONFIGURATION ---
// The directory where SvelteKit outputs the final static site.
// This is typically 'build' for adapter-static.
const BUILD_DIR = 'build';
// ---------------------

/**
 * Recursively finds all HTML files in a given directory.
 * @param {string} dir - The directory to search in.
 * @returns {Promise<string[]>} A promise that resolves to an array of HTML file paths.
 */
async function findHtmlFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? findHtmlFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files).filter((file) => file.endsWith('.html'));
}

/**
 * The main function to process HTML files and inline CSS.
 */
async function inlineCss() {
  console.log('--- Starting CSS inlining script ---');

  try {
    const htmlFiles = await findHtmlFiles(BUILD_DIR);

    if (htmlFiles.length === 0) {
      console.warn(`No HTML files found in the '${BUILD_DIR}' directory. Exiting.`);
      return;
    }

    console.log(`Found ${htmlFiles.length} HTML file(s) to process.`);

    // A regex to find the SvelteKit-generated CSS link tag.
    // It specifically looks for a link tag pointing to a .css file inside the immutable assets folder.
    const cssLinkRegex = /<link href="(\.?\/?_app\/immutable\/assets\/[^"]+\.css)" rel="stylesheet">/;

    for (const htmlPath of htmlFiles) {
      try {
        // 1. Read the HTML file content
        let htmlContent = await fs.readFile(htmlPath, 'utf-8');
        const match = htmlContent.match(cssLinkRegex);

        if (match && match[1]) {
          const cssRelativePath = match[1];
          const linkTag = match[0];

          // 2. Construct the full path to the CSS file
          // The path in the href is relative to the HTML file's location.
          const cssFullPath = path.join(path.dirname(htmlPath), cssRelativePath);

          // 3. Read the CSS file content
          const cssContent = await fs.readFile(cssFullPath, 'utf-8');

          // 4. Create the inline style tag
          const styleTag = `<style>${cssContent}</style>`;

          // 5. Replace the original link tag with the new style tag
          htmlContent = htmlContent.replace(linkTag, styleTag);

          // 6. Write the modified content back to the HTML file
          await fs.writeFile(htmlPath, htmlContent, 'utf-8');

          console.log(`✅ Inlined CSS for: ${path.basename(htmlPath)}`);
        } else {
          console.log(`⏩ Skipped: No SvelteKit CSS link found in ${path.basename(htmlPath)}.`);
        }
      } catch (fileError) {
        console.error(`❌ Error processing file ${htmlPath}:`, fileError);
      }
    }
  } catch (error) {
    console.error('❌ An error occurred during the inlining process:', error);
  }

  console.log('--- CSS inlining script finished ---');
}

// Run the script
inlineCss();
