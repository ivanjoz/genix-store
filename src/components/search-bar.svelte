<script lang="ts">
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

<div class="search-ctn relative lg:w-340 w-400">
  <textarea
    class="search w-full"
    cols="1"
    onkeydown={handleKeydown}
    placeholder="Buscar producto::"
  ></textarea>
  <i class="icon1-search absolute top-10 right-10"></i>
</div>

<style>
  .search-ctn,
  .search {
    height: 36px;
  }
  .search {
    box-shadow:
      #20202329 0px 1px 3px,
      #20202329 0px 1px 2px;
    padding-left: 0.8rem;
    line-height: 1;
    padding-top: calc(1rem - 4px);
    outline: none;
    border: none;
    background-color: #eae9ef;
    border-radius: 16px;
    resize: none;
    padding-top: 10px;
    padding-left: 14px;
  }
  .search-ctn > i {
    color: #6d698d;
  }
</style>
