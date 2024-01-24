<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { ArrowLeft, Check, Cross2 } from 'radix-icons-svelte';

  import Button from '$lib/components/Button.svelte';
  import Section from '$lib/components/Section.svelte';

  export let style = '';
  export let searchedKeyword: string | null = '';
  export let results: any[] = [];

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
  {#if results.length === 1}
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
  {:else if results.length > 1}
    <p>There are {results.length} results for your search, please pick one location and click Yes to save it</p>
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
