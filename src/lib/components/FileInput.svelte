<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Image } from 'radix-icons-svelte';
  import { Badge } from '@svelteuidev/core';

  export let disabled = false;
  export let style = '';
  export let title = '';
  export let id = '';

  const dispatch = createEventDispatcher();

  let files: FileList | null | undefined;

  const onChange = () => {
    if (disabled) return;
    dispatch('change', files);
  };
</script>

<!-- <template> -->
<label {style} {title}>
  <slot>
    <Image slot="leftIcon" size={22} />
    {#if files?.length}
      <Badge style="position: absolute; right: -5px; top: -5px;" size="xs">{files?.length}</Badge>
    {/if}
  </slot>
  <input
    type="file"
    accept="image/*, video/*"
    multiple
    {id}
    {disabled}
    bind:files
    on:change|stopPropagation={onChange} />
</label>
<!-- </template> -->

<style>
  label {
    position: relative;
    display: block;
    cursor: pointer;
  }

  label:hover {
    color: white;
  }

  input[type="file"] {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
  }
</style>
