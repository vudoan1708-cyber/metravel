<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { TextInput } from '@svelteuidev/core';
  import { MagnifyingGlass } from 'radix-icons-svelte';

  import Button from '$lib/components/Button.svelte';
  import Section from '$lib/components/Section.svelte';

  export let style = '';

  const dispatch = createEventDispatcher();

  let location: string = '';

  // Event Handler
  const search = () => {
    if (!location) return;
    // Make API call to get the geocoding for the searched location

    // Dispatch the custom event
    dispatch('next');
  };
</script>

<!-- <template> -->
<Section {style}>
  <TextInput
    required style="width: 300px;"
    placeholder="Name of the location"
    autofocus
    bind:value={location} />
  <Button style="align-self: flex-end;" disabled={!location} on:click={search}>
    <MagnifyingGlass slot="leftIcon" />
    Search
  </Button>
</Section>
<!-- </template> -->
