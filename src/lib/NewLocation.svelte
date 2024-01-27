<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Notification } from '@svelteuidev/core';

  import { journalEntry } from '$lib/stores';

  import { Check, Cross2 } from 'radix-icons-svelte';

  import Search from './stages/Search.svelte';
  import ApproveLocation from './stages/ApproveLocation.svelte';
  import PopupContent from './stages/PopupContent.svelte';

  import type { GeocodingResultType, JournalModelType } from '../types';

  export let searchedKeyword: string | null = '';
  export let searchedLocations: GeocodingResultType[] = [];
  export let locationSelected: GeocodingResultType | null = null;
  export let storedLocations: Array<JournalModelType & { _id: string }> = [];

  const dispatch = createEventDispatcher();

  let currentStage: 'search' | 'approveLocation' | 'popup' = 'search';
  const STAGES = {
    search: {
      previous: (): typeof currentStage => 'search',
      next: (): typeof currentStage => 'approveLocation',
    },
    approveLocation: {
      previous: (): typeof currentStage => 'search',
      next: (): typeof currentStage => 'popup',
    },
    popup: {
      previous: (): typeof currentStage => 'search',
      next: (): typeof currentStage => 'search',
    },
  };

  $: components = {
    search: {
      component: Search,
      props: {
        style: 'pointer-events: auto;',
      },
    },
    approveLocation: {
      component: ApproveLocation,
      props: {
        style: 'pointer-events: auto;',
        searchedKeyword,
        locationSelected,
        results: searchedLocations,
      },
    },
    popup: {
      component: PopupContent,
      props: {
        style: 'pointer-events: auto;',
        duplicatedLocation: storedLocations.find((loc) => (
          loc.place_id ===  (locationSelected || searchedLocations[0])?.place_id
        )),
      },
    },
  };

  // Event Handlers
  const nextStage = () => {
    currentStage = STAGES[currentStage].next();
    dispatch('stageChange', currentStage);
  };
  const previousStage = () => {
    currentStage = STAGES[currentStage].previous();
    dispatch('stageChange', currentStage);
  };
  let successful: boolean = false;
  const toggleSuccessState = (state: boolean) => {
    successful = state;
    if (successful) dispatch('successful');
  };

  let error: boolean = false;
  const toggleErrorState = (state: boolean) => {
    error = state;
  };
</script>

<!-- <template> -->
<div class="new-location">
  <svelte:component
    this={components[currentStage].component}
    {...components[currentStage].props}
    on:next={nextStage}
    on:previous={previousStage}
    on:searched
    on:successful={() => { toggleSuccessState(true); }}
    on:error={() => { toggleErrorState(true); }} />
</div>

{#if successful}
  <Notification
    title="Successful"
    style="position: absolute; top: 0; right: 0; z-index: 2000;"
    icon={Check}
    color="teal"
    on:close={() => { toggleSuccessState(false); }}>
    Your story on {$journalEntry.place_name} has been successfully saved to the database
  </Notification>
{/if}
{#if error}
  <Notification
    title="Failed"
    style="position: absolute; top: 0; right: 0; z-index: 2000;"
    icon={Cross2}
    color="red"
    on:close={() => { toggleErrorState(false); }}>
    Internal server error
  </Notification>
{/if}
<!-- </template> -->

<style>
  .new-location {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1000;
    pointer-events: none;
  }
</style>
