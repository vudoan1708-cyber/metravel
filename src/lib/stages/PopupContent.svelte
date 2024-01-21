<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Textarea } from '@svelteuidev/core';

  import Section from "$lib/components/Section.svelte";
  import Button from '$lib/components/Button.svelte';
  import FileInput from '$lib/components/FileInput.svelte';

  import { ArrowLeft, ArrowRight } from 'radix-icons-svelte';
  import TextEditor from '$lib/components/TextEditor.svelte';

  export let style = '';

  const dispatch = createEventDispatcher();

  let value: string = '';
  let files: HTMLInputElement

  // Event Handlers
  const back = () => {
    dispatch('previous');
  };
  const saveContent = () => {
    dispatch('next');
  };

  const handleChange = ({ detail }) => {

  };
</script>

<!-- <template> -->
<Section {style}>
  <label for="story">
    Your story
    <FileInput
      id="uploadStory"
      style="align-self: flex-end;"
      title="Upload media files"
      on:change={handleChange} />
    <TextEditor />
  </label>

  <span>
    <Button on:click={back}>
      <ArrowLeft slot="leftIcon" />
      Back
    </Button>
    <Button disabled={!value}>
      <ArrowRight slot="leftIcon" />
      Next
    </Button>
  </span>
</Section>
<!-- </template> -->

<style>
  span {
    display: flex;
    gap: 8px;
    align-self: flex-end;
  }

  label[for="story"] {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
  }
</style>
