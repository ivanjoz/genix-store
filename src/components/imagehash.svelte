<script lang="ts">
  import { Env } from "../env";
  import s1 from "./styles.module.css";

  export let src = "";
  export let css = "";
  export let hash = "";
  export let alt = "";
  export let size = 4;
  let imageSrc = "";
  let placeholderSrc = "";
  let placeholderClass: string | undefined = undefined;
  let showPlaceholder = true

  if (hash?.length > 0) {
    imageSrc =
      Env.S3_URL +
      "images/" +
      hash.substring(0, 12).replaceAll(".", "/").replaceAll("-", "=") +
      ".webp";
    placeholderSrc = "/?"+hash;
    placeholderClass = "_bhi_";
  } else {
    const sl = src.split(".")
    const ext = sl[sl.length - 1]
    imageSrc = src
    if(sl.length < 2 || !["jpeg","jpg","webp","avif","png"].includes(ext)){
      imageSrc += `-x${size}.avif`
    }
    imageSrc = Env.makeImageRoute(imageSrc)
  }
</script>

<div class={[s1.image_hash_ctn, css || ""].join(" ")}>
  {#if showPlaceholder}
    <img src={placeholderSrc} class={placeholderClass} loading="lazy" alt="" /> 
  {/if}
  <img src={imageSrc} {alt} loading="lazy"
    onload={() => { showPlaceholder = false }}
  />
</div>
