<script lang="ts">
    import { formatN, formatTime } from "../functions/helpers";
  import type { IProducto } from "../services/productos.svelte";

  const { 
    producto = null as IProducto, css = ""
  } = $props();

  import ImageHash from "./imagehash.svelte";
  import s1 from "./styles.module.css";
</script>

<div class="relative _8">
  <div class={["relative min-h-180 _1 p-6 rounded-[10px] mb-14 sm:mb-24", css].join(" ")}>
    <ImageHash css="w-full h-[36vw] md:h-200" src={producto.Image?.n} />
    <div class="w-full _3 relative z-10">
      <div class="text-center mt-6 mb-4 min-h-26 md:min-h-32 flex items-center justify-center">
        {producto.Nombre}
      </div>
      <div class="px-4 ff-bold fs17">s/. {formatN(producto.PrecioFinal/100,2)}</div>
    </div>
    <div class="_2 absolute hidden rounded-b-[10px] h-36 items-center justify-center w-full bottom-0 left-0 select-none">
      Agregar <i class="icon1-basket"></i>
    </div>
  </div>
</div>

<style>
  ._1 {
    background-color: white;
    box-shadow: rgba(54, 56, 67, 0.2) 0px 2px 8px 0px;
  }
  ._2 {
    color: rgb(100, 67, 160);
  }
  @media (min-width: 739px) {
    ._8:hover ._1 {
      padding-bottom: 22px;
      margin-bottom: -10px;
      outline: 2px solid rgb(202, 173, 255);
    }
    ._8:hover ._2{
      display: flex;
      background-color: rgb(228, 221, 248);
      cursor: pointer;
    }
    ._8:hover ._3{
      background-color: white;
      margin-top: -14px;
      margin-bottom: 14px;
    }
    ._2:hover, ._8 ._2:hover {
      background-color: rgb(111, 82, 179);
      height: 38px;
      padding-bottom: 2px;
      margin-bottom: -2px;
      margin-left: -2px;
      margin-right: -2px;
      width: calc(100% + 4px);
      color: white;
    }
  }

  @media (max-width: 740px) {
    ._8 ._2 {
      display: flex;
      background-color: rgb(228, 221, 248);
      cursor: pointer;
    }
    ._8 ._1 {
      padding-bottom: 38px;
      border-bottom: 2px solid rgb(172, 153, 226);
    }
  }

</style>