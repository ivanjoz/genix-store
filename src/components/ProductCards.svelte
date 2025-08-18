<script>
  const { categoriaID = 0 } = $props();

  import { useProductosService } from "../services/productos.svelte";
  import ProductCard from "./ProductCard.svelte";
  import s1 from "./styles.module.css";

  const productos = useProductosService()

  // Load data when component mounts
  $effect(() => {

  })

    // Separate effect to watch state changes
  $effect(() => {
    console.log("=== STATE CHANGE ===")
    console.log("categorias:", productos.categorias)
    console.log("productos length:", productos.productos.length)
    console.log("productos data:", productos.productos)
  })
</script>

<div class="w-full flex justify-center overflow-x-hidden">
  <div
    class={"flex flex-wrap justify-center max-w-1680 w100-p12 " +
      s1.product_cards_ctn}
  >    
    {#each productos.productos as producto}
      <ProductCard css="w-240 m-12" {producto} />
    {/each}
  </div>
</div>
