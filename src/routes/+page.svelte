<script>
  import Header from "../components/headers.svelte";
  import ProductCards from "../components/ProductCards.svelte";
</script>

<Header />

<div class="h-800 demo flex">
  <div>hola</div>
  <ProductCards />
</div>
<div class="h-800 demo flex"></div>

<style>
  .demo {
    background-color: bisque;
  }
</style>
