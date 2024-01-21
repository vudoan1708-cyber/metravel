<script lang="ts">
  import Search from './stages/Search.svelte';
  import ApproveLocation from './stages/ApproveLocation.svelte';
  import PopupContent from './stages/PopupContent.svelte';

  let currentStage: 'search' | 'approveLocation' | 'popup' | 'confirmation' = 'search';
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
      next: (): typeof currentStage => 'confirmation',
    },
    confirmation: {
      previous: (): typeof currentStage => 'popup',
      next: (): typeof currentStage => 'search',
    }
  };

  const components = {
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
      },
    },
    popup: {
      component: PopupContent,
      props: {
        style: 'pointer-events: auto;',
      },
    },
    confirmation: {
      component: null,
      props: {
        style: 'pointer-events: auto;',
      },
    },
  };

  // Event Handlers
  const nextStage = () => {
    currentStage = STAGES[currentStage].next();
  };
  const previousStage = () => {
    currentStage = STAGES[currentStage].previous();
  };
</script>

<!-- <template> -->
<div class="new-location">
  <svelte:component
    this={components[currentStage].component}
    {...components[currentStage].props}
    on:next={nextStage}
    on:previous={previousStage} />
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
