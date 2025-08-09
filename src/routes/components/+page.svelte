<script>
  import Input from "../../core/Input.svelte";

  let form = {};
</script>

<div>
  <h1>Componentes</h1>
  <Input label="Nombre Usuario" saveOn={form} save="nombre"></Input>

  <button
    onclick={() => {
      console.log(form);
    }}>Enviar</button
  >
</div>
