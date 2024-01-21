<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Image } from 'radix-icons-svelte';

  export let disabled = false;
  export let style = '';
  export let title = '';
  export let id = '';

  const dispatch = createEventDispatcher();

  let files: HTMLInputElement | undefined;

  const onChange = () => {
    if (disabled) return;
    dispatch('change', files?.files);
  }
</script>

<!-- <template> -->
<label {style} {title}>
  <slot>
    <Image slot="leftIcon" />
  </slot>
  <input
    type="file"
    accept="image/*, video/*"
    multiple
    {id}
    {disabled}
    bind:this={files}
    on:change|stopPropagation={onChange} />
</label>
<!-- </template> -->

<style>
  label {
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
