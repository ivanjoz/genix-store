<script>
  import ProductCard from "./ProductCard.svelte";

  const imageHashArray = [
    "7ogGDobEysilemePeJeJl4l5almwpQQ=",
    "8xgGHAL22YjoiIa4WJcqd6BwFw==",
    "MqcNHwj3iKeKinSHiUaIx1eIiM94+I4H",
    "OwgGBwL4h3iHeIeKdpd3uGd3eQoIB4MC",
    "nucNFwLCytpbiJZ/iFaJ12mXDZqGsFkL",
    "uwgGHwD2aYl3mGd5h2iYl2iKeaB4B48L",
    "7ogGDobEysilemePeJeJl4l5almwpQQ=",
    "8xgGHAL22YjoiIa4WJcqd6BwFw==",
    "MqcNHwj3iKeKinSHiUaIx1eIiM94+I4H",
    "OwgGBwL4h3iHeIeKdpd3uGd3eQoIB4MC",
    "nucNFwLCytpbiJZ/iFaJ12mXDZqGsFkL",
    "uwgGHwD2aYl3mGd5h2iYl2iKeaB4B48L",
  ];
</script>

<div class="w-full">
  <div class="flex flex-wrap justify-center">
    {#each imageHashArray as hash}
      <ProductCard css="w-240 m-12" {hash} />
    {/each}
  </div>
</div>
