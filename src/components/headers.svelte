<script lang="ts">
  import { onMount } from "svelte";
  import SearchBar from "./search-bar.svelte";
  import CartMenu from "./cart-menu.svelte";
  import UsuarioMenu from "./usuario-menu.svelte";

  // State for mobile menu
  let mobileMenuOpen = $state(false);
  let isScrolled = $state(false);
  let isSubheaderFixed = $state(false);
  let subheaderElement: HTMLElement;

  // Handle scroll effect
  onMount(() => {
    const handleScroll = () => {
      console.log("comparison:", window.scrollY, subheaderElement.offsetTop);

      if (window.scrollY > subheaderElement.offsetTop) {
        isSubheaderFixed = true;
      } else {
        isSubheaderFixed = false;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Close mobile menu when clicking outside
  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<div class="header flex justify-between text-white h-48"></div>
<div
  class="sub-header flex justify-between w-full {isSubheaderFixed
    ? 'h-52'
    : 'h-68'}"
  bind:this={subheaderElement}
>
  hola
</div>
<div
  class="sub-header flex items-center justify-between w-full left-0 {isSubheaderFixed
    ? 'h-52 top-0 fixed z-110'
    : 'h-68 top-48 absolute'}"
>
  <div></div>
  <SearchBar />
  <div class="flex">
    <CartMenu css="mr-8" />
    <UsuarioMenu />
  </div>
</div>

<style>
  .header {
    background-color: #336686;
    padding: 0 80px 0 80px;
  }
  .sub-header {
    background-color: #ffffff;
    padding: 0 80px 0 80px;
    transition: height 0.3s ease;
  }

  /* Custom styles for smooth transitions */
  :global(body) {
    scroll-behavior: smooth;
  }
</style>
