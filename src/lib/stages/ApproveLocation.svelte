<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Check, Cross2 } from 'radix-icons-svelte';

  import Button from '$lib/components/Button.svelte';
  import Section from '$lib/components/Section.svelte';

  export let style = '';

  const dispatch = createEventDispatcher();

  // Event Handlers
  const back = () => {
    dispatch('previous');
  };
  const saveLocation = () => {
    dispatch('next');
  };
</script>

<!-- <template> -->
<Section {style}>
  <p>Are you sure you want to save this location?</p>
  <span>
    <Button on:click={back}>
      <Cross2 slot="leftIcon" />
      No
    </Button>
    <Button on:click={saveLocation}>
      <Check slot="leftIcon" />
      Yes
    </Button>
  </span>
</Section>
<!-- </template> -->

<style>
  span {
    display: flex;
    gap: 8px;
    align-self: flex-end;
  }
</style>
