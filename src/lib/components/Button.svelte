<script lang="ts">
  import { Button } from '@svelteuidev/core';

  export let disabled = false;
  export let loading = false;
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xs';
  export let title = '';
  export let style = '';

  const newStyles = {
    padding: '8px',
    gap: '4px',
    textDecoration: 'none !important',
    // '&:hover': {
    //   boxShadow: '0 4px 20px #228be6',
    // },
  };
</script>

<!-- <template> -->
<Button
  override={newStyles}
  {disabled}
  {title}
  {style}
  {size}
  {loading}
  on:click>
  <slot name="leftIcon" />
  <slot />
</Button>
<!-- </template> -->
