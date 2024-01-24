<script lang="ts">
  import { createEventDispatcher, setContext } from 'svelte';

  import { TextInput } from '@svelteuidev/core';
  import { MagnifyingGlass } from 'radix-icons-svelte';

  import { getGeocodingFromText } from '$lib/utils/apiWrappers';

  import Button from '$lib/components/Button.svelte';
  import Section from '$lib/components/Section.svelte';

  export let style = '';

  const dispatch = createEventDispatcher();

  let location: string = '';
  let searching: boolean = false;

  // Event Handler
  const search = async () => {
    if (!location || searching) return;
    try {
      searching = true;
      // Make API call to get the geocoding for the searched location
      const res = await getGeocodingFromText(location);
      // Dispatch the custom event
      dispatch('next');
      dispatch('searched', { keyword: location, results: res });
    } catch (err) {
      alert(err);
    } finally {
      searching = false;
    }
  };
</script>

<!-- <template> -->
<Section {style}>
  <TextInput
    required style="width: 300px;"
    placeholder="Name of the location"
    autofocus
    bind:value={location} />
  <Button
    style="align-self: flex-end;"
    disabled={!location}
    loading={searching}
    on:click={search}>
    <MagnifyingGlass slot="leftIcon" />
    Search
  </Button>
</Section>
<!-- </template> -->
