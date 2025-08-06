<script>
  export let css = "";
  export let hash = "";

  import ImageHash from "./imagehash.svelte";
  import s1 from "./styles.module.css";
</script>

<div class={["min-h-320", css, s1.product_card_ctn].join(" ")}>
  <ImageHash css="w-full h-200" {hash} />
  <div class="text-center mt-6 mb-6">Nombre del producto</div>
  <div>Precio</div>
</div>
