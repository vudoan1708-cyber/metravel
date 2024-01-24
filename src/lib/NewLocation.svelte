<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Search from './stages/Search.svelte';
  import ApproveLocation from './stages/ApproveLocation.svelte';
  import PopupContent from './stages/PopupContent.svelte';

  export let searchedKeyword: string | null = '';
  export let searchedLocations: any[] = [];

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
        results: searchedLocations,
      },
    },
    popup: {
      component: PopupContent,
      props: {
        style: 'pointer-events: auto;',
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
</script>

<!-- <template> -->
<div class="new-location">
  <svelte:component
    this={components[currentStage].component}
    {...components[currentStage].props}
    on:next={nextStage}
    on:previous={previousStage}
    on:searched />
</div>
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
