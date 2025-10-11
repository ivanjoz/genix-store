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
    /*
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
    */
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

<div class="_2 flex justify-between text-white h-48"></div>
<div id="sh-0" class="flex justify-between w-full h-68">
  header
</div>
<div id="sh-1" class="_1 h-58 md:h-68 top-48 absolute flex items-center justify-between w-full left-0 -58 md:h-68 top-48"
>
  <div>_</div>
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
  <CartMenu isMobile={true} id={2} css="absolute w-full top-[100%] left-0"/>
</div>

<style>
  ._2 {
    background-color: #336686;
    padding: 0 80px 0 80px;
  }
</style>
