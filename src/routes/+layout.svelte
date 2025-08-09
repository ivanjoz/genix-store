<script lang="ts">
  // @render 'svelte';
  import "../app.css";
  import "../lib/fontello-prerender.css";
  import blurhashScript from "../lib/blurhash.js?raw";
  // import '../lib/fontello-embedded.css';
  let { children } = $props();
</script>

<svelte:head>
  {@html `<script type="text/javascript">${blurhashScript}</script>`}
</svelte:head>

{@render children()}
