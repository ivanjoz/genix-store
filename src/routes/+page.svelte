<script lang="ts">
  import Header from "../components/headers.svelte";
  import MainCarrusel from "../components/MainCarrusel.svelte";
  import ProductCards from "../components/ProductCards.svelte";
  import type { ICategoriaProducto } from "../components/types";

  let categorias: ICategoriaProducto[] = [
    { Name: "Perfumes", Image: "images/categoria_1.webp" },
    { Name: "Casacas", Image: "images/casaca_icon_sm3.webp" },
    { Name: "Zapatos", Image: "images/categoria_1.webp" },
    { Name: "Relojes", Image: "images/categoria_1.webp" },
    { Name: "Decoración", Image: "images/categoria_1.webp" },
  ];
</script>

<Header />

<MainCarrusel {categorias} />
<div class="h-800 demo">
  <div>hola</div>
  <ProductCards />
</div>
<div class="h-800 demo flex"></div>

<style>
  .demo {
    background-color: #f0eff3;
  }
</style>
