<script lang="ts">
  import type { IProducto } from "../services/productos.svelte";

  const { 
    producto = null as IProducto, css = ""
  } = $props();

  import ImageHash from "./imagehash.svelte";
  import s1 from "./styles.module.css";
</script>

<div class={["min-h-320", css, s1.product_card_ctn].join(" ")}>
  <ImageHash css="w-full h-200" src={producto.Image?.n} />
  <div class="text-center mt-6 mb-6">{producto.Nombre}</div>
  <div>Precio</div>
</div>
