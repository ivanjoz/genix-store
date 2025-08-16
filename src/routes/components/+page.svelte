<script>
  import Input from "../../core/Input.svelte";

  let form = {};
</script>

<div class="p-12 flex">
  <div class="mr-20">
    <div class="h-40">
      <div class="text-[24px]">Componentes</div>
    </div>
    <Input label="Nombre Usuario das das dasd asd asdas" css="w-200 m-6" saveOn={form} save="nombre"></Input>

    <Input label="Nombre Usuario 2" css="w-200 m-6" saveOn={form} save="nombre"></Input>

    <button
      onclick={() => {
        console.log(form);
      }}>Enviar</button
    >
  </div>
  <div class="bg1 p-16">
    <div class="h-40">
      <div class="text-[24px]">Componentes</div>
    </div>
    <Input label="Nombre Usuario das das dasd asd asdas" css="w-200 m-6" saveOn={form} save="nombre"></Input>

    <Input label="Nombre Usuario 2" css="w-200 m-6" saveOn={form} save="nombre"></Input>

    <button
      onclick={() => {
        console.log(form);
      }}>Enviar</button
    >
  </div>
</div>

<style>
  .bg1 {
    background-color: #e9eef1;
  }
</style>