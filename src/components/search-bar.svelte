<script lang="ts">
  import s1 from "./styles.module.css";

  function handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLTextAreaElement;
    if (
      target &&
      (event.key === "Enter" || event.keyCode === 13 || event.charCode === 13)
    ) {
      event.preventDefault(); // Prevent the default action (inserting a new line)
    }
  }
</script>

<div
  class={s1.search_top_bar_ctn +
    " search-ctn relative lg:w-340 w-400 hidden md:flex"}
>
  <textarea
    class={s1.search_top_bar_input + " w-full"}
    cols="1"
    onkeydown={handleKeydown}
    placeholder="Buscar producto::"
  ></textarea>
  <i class="icon1-search absolute top-10 right-10"></i>
</div>
