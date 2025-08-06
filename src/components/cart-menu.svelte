<script>
  export let css = "";
  import { layerOpenedState } from "./store.svelte";
  import angleSvg from "../assets/angle.svg?raw";
  import { parseSVG } from "../functions/helpers";

  function toggleCartDiv() {
    layerOpenedState.id = layerOpenedState.id === 1 ? 0 : 1;
  }
</script>

<div class={"relative w-120 " + (css || "")}>
  <button class="bn1 w-full" onclick={toggleCartDiv}>
    <i class="icon1-basket"></i>
    <span>Carrito</span>
  </button>

  {#if layerOpenedState.id === 1}
    <img class="absolute h-20 corner" alt="" src={parseSVG(angleSvg)} />
    <div class="cart-content absolute">¡Contenido del carrito aquí!</div>
  {/if}
</div>

<style>
  .corner {
    right: 40%;
    bottom: -10px;
    z-index: 121;
  }
  .cart-content {
    position: absolute;
    top: 50px;
    width: 48rem;
    right: -12rem;
    max-width: calc(82vw - 24px);
    height: calc(100vh - 140px);
    background-color: #fff;
    z-index: 120;
    box-shadow:
      #46466059 0 2px 18px -2px,
      #00000059 0 0 6px;
    border-radius: 11px;
    padding: 8px;
  }
</style>
