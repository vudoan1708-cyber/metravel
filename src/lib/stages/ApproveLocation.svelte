<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { ArrowLeft, Check, Cross2 } from 'radix-icons-svelte';

  import Button from '$lib/components/Button.svelte';
  import Section from '$lib/components/Section.svelte';
  import { journalEntry } from '$lib/stores';

  import type { GeocodingResultType } from '../../types';

  export let style = '';
  export let searchedKeyword: string | null = '';
  export let results: GeocodingResultType[] = [];
  export let locationSelected: GeocodingResultType | null = null;

  const dispatch = createEventDispatcher();

  const newStyle = `${style} width: 400px;`;

  // Event Handlers
  const back = () => {
    dispatch('previous');
  };
  const saveLocation = () => {
    const loc = locationSelected || results[0];
    journalEntry.set({ latlng: [ loc.lat, loc.lon ], place_id: loc.place_id, place_name: loc.formatted });
    dispatch('next');
  };
</script>

<!-- <template> -->
<Section style={newStyle}>
  {#if results.length === 1 || !!locationSelected}
    <p>Are you sure you want to save this location{`${locationSelected?.formatted ? `: ${locationSelected?.formatted}` : `: ${results[0].formatted}`}`}?</p>
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
  {:else if results.length > 1}
    <p>There are <strong>{results.length}</strong> results for your search, please pick one location</p>
    <span>
      <Button on:click={back}>
        <ArrowLeft slot="leftIcon" />
        Back
      </Button>
    </span>
  {:else}
    <p class="noResult">There is no result for <strong>{searchedKeyword}</strong></p>
    <span>
      <Button on:click={back}>
        <ArrowLeft slot="leftIcon" />
        Back
      </Button>
    </span>
  {/if}
</Section>
<!-- </template> -->

<style>
  span {
    display: flex;
    gap: 8px;
    align-self: flex-end;
  }

  strong {
    background-color: rgba(69, 69, 69, .5);
    padding: 2px;
    border-radius: 4px;
    border: 1px solid white;
  }
</style>
