<script lang="ts">
  export let css: string = "";
  import { layerOpenedState } from "./store.svelte";
  import angleSvg from "../assets/angle.svg?raw";
  import { parseSVG } from "../functions/helpers";
  import s1 from "./styles.module.css"
  import ArrowSteps from "../core/ArrowSteps.svelte"
  import { Ecommerce, Globals } from "../stores/globals.svelte";
  import Input from "../core/Input.svelte";

  let userForm = {}

  function toggleCartDiv() {
    layerOpenedState.id = layerOpenedState.id === 1 ? 0 : 1;
  }
</script>

<div class={"relative w-120 " + (css || "")}>
  <button class={["bn1 w-full",layerOpenedState.id === 1 ? s1.button_menu_top : ""].join(" ")} 
    onclick={toggleCartDiv}>
    <i class="icon1-basket"></i>
    <span>Carrito</span>
  </button>

  {#if layerOpenedState.id === 1}
    <img class="absolute h-20 _1" alt="" src={parseSVG(angleSvg)} />
    <div class="_2 absolute p-12">
      <ArrowSteps selected={Ecommerce.cartOption}
        columnsTemplate={Globals.deviceType === 3 ? "1fr 1fr 1fr 0.7fr" : ""}
        onSelect={e => {
          Ecommerce.cartOption = e.id
        }}
        options={[ 
          { id: 1, name: 'Carrito', icon: "icon-basket" }, 
          { id: 2, name: 'Datos de Envío', icon: "icon-doc-inv-alt" }, 
          { id: 3, name: 'Pago', icon: "icon-shield" }, 
          { id: 4, 
            name: 'Confirmación', 
            icon: "icon-ok" 
          },
        ]}
      >
        {#snippet optionRender(e)}
          <div class="flex items-center mt-1 ff-semibold">
            <i class={`text-[18px] ${e.icon} mr-2`}></i>
            <div class="mr-6 text-left lh-11">{e.name}</div>
          </div>
        {/snippet}
      </ArrowSteps>
      {#if Ecommerce.cartOption === 1}

      {/if}
      {#if Ecommerce.cartOption === 2}
        <div class="mt-8 mb-8 fs18 ff-bold">Total a pagar: </div>
        <div class="grid grid-cols-12 gap-12">
          <Input label="Nombres" css="col-span-6" saveOn={userForm} save="nombres" required={true} />
          <Input label="Apellidos" css="col-span-6" saveOn={userForm} save="apellidos" required={true} />
          <Input label="Correo Electrónico" css="col-span-6" saveOn={userForm} save="email" required={true} />
          <Input label="Dirección" css="col-span-12" saveOn={userForm} save="direccion" required={true} />
          <Input label="Referencia" css="col-span-12" saveOn={userForm} save="referencia" />
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  ._1 {
    right: 40%;
    bottom: -10px;
    z-index: 121;
  }
  ._2 {
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
  }
</style>
