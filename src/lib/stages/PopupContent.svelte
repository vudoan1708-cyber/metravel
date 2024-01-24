<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Section from "$lib/components/Section.svelte";
  import Button from '$lib/components/Button.svelte';

  import { ArrowLeft, ArrowRight } from 'radix-icons-svelte';
  import TextEditor from '$lib/components/TextEditor.svelte';

  export let style = '';

  const dispatch = createEventDispatcher();

  // Event Handlers
  const back = () => {
    dispatch('previous');
  };

  let saving: boolean = false;
  const saveContent = () => {
    saving = true;
    const div = document.createElement('div');
    div.append(...editorDom.content?.childNodes as NodeListOf<ChildNode> || []);
    console.log('editorDom', editorDom);
    dispatch('next');
  };

  let editorDom: { content: HTMLElement | null, isEmpty: boolean } = {
    content: null,
    isEmpty: true,
  };
  const handleChange = ({ detail }: { detail: { dom: HTMLElement, empty: boolean } }) => {
    editorDom.content = detail.dom;
    editorDom.isEmpty = detail.empty;
  };
</script>

<!-- <template> -->
<Section {style}>
  <label for="story">
    Your story
    <TextEditor on:change={handleChange} />
  </label>

  <span>
    <Button on:click={back}>
      <ArrowLeft slot="leftIcon" />
      Back
    </Button>
    <Button disabled={editorDom.isEmpty} on:click={saveContent}>
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
