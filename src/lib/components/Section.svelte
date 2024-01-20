<script lang="ts">
  export let style = '';
</script>

<!-- <template> -->
<section {style}>
  <slot />

  <!-- TODO: Collapsible button here -->
</section>
<!-- </template> -->

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 8px;
    background-color: rgba(0, 0, 0, .5);
    color: rgb(207, 207, 207);
  }
</style>
