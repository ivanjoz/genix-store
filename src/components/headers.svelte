<script lang="ts">
  import { onMount } from "svelte";
  import SearchBar from "./search-bar.svelte";
  import CartMenu from "./cart-menu.svelte";
  import UsuarioMenu from "./usuario-menu.svelte";
    import { layerOpenedState } from "./store.svelte";

  // State for mobile menu
  let mobileMenuOpen = $state(false);
  let isScrolled = $state(false);
  let isSubheaderFixed = $state(false);
  let subheaderElement: HTMLElement;

  // Handle scroll effect
  onMount(() => {
    const handleScroll = () => {
      // console.log("comparison:", window.scrollY, subheaderElement.offsetTop);

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
<div class="sub-header s1 flex items-center justify-between w-full left-0 {isSubheaderFixed
    ? 'h-47 md:h-52 top-0 fixed z-110'
    : 'h-58 md:h-68 top-48 absolute'}"
>
  <div></div>
  <SearchBar />
  <div class="flex h-42">
    <CartMenu css="mr-8 hidden md:block relative w-120 h-full" id={1}/>
    <UsuarioMenu />
    <button class="block md:hidden" onclick={ev => {
      ev.stopPropagation()
      layerOpenedState.id = layerOpenedState.id ? 0 : 2
    }}>
      <i class="icon1-basket"></i>
    </button>
  </div>
  <CartMenu isMobile={true} id={2}/>
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

  .sub-header.s1 {
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 2px 6px,
      rgba(0, 0, 0, 0.2) 0px 2px 8px;
    z-index: 200;
  }

  /* Custom styles for smooth transitions */
  :global(body) {
    scroll-behavior: smooth;
  }
</style>
