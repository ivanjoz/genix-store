<script lang="ts">
  import { onMount } from "svelte";
  import s1 from "./styles.module.css";

  export let src = "";
  export let css = "";
  export let hash = "";
  export let alt = "";
  let imageSrc = "";
  let placeholderSrc = "";
  let placeholderClass: string | undefined = undefined;

  if (hash?.length > 0) {
    imageSrc =
      "images/" +
      hash.substring(0, 12).replaceAll(".", "/").replaceAll("-", "=") +
      ".webp";
    placeholderSrc = hash;
    placeholderClass = "_bhi_";
  } else {
    imageSrc = src;
  }
</script>

<div class={[s1.image_hash_ctn, css || ""].join(" ")}>
  <img src={placeholderSrc} class={placeholderClass} loading="lazy" alt="" />
  <img src={imageSrc} {alt} />
</div>

<style></style>
