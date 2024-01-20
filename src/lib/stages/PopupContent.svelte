<script lang="ts">
  import { Textarea, InputWrapper, Input } from '@svelteuidev/core';

  import Section from "$lib/components/Section.svelte";

  export let style = '';

  let value: string = '';
</script>

<!-- <template> -->
<Section {style}>
  <Textarea
    label="Your story"
    placeholder="Anything story you want to write here for the popup content"
    style="width: 300px; height: 150px; resize: vertical;"
    bind:value />
  <Input type="file" style="width: 300px;" />
</Section>
<!-- </template> -->
