<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Input } from '@svelteuidev/core';

  import Section from '$lib/components/Section.svelte';
  import Button from '$lib/components/Button.svelte';
  import TextEditor from '$lib/components/TextEditor.svelte';

  import { journalEntry } from '$lib/stores';
  import { createJournal, getPresignedUrlAndUploadFile, updateJournal } from '$lib/utils/apiWrappers';

  import { ArrowLeft, ArrowRight } from 'radix-icons-svelte';

  import type { LatLngTuple } from 'leaflet';
  import type { JournalModelType } from '../../types';

  export let style = '';
  export let duplicatedLocation: JournalModelType & {
    _id: string;
  } | null | undefined = null;

  const dispatch = createEventDispatcher();

  // Event Handlers
  const back = () => {
    dispatch('previous');
  };

  let saving: boolean = false;
  const saveContent = async () => {
    saving = true;
    try {
      const div = document.createElement('div');
      const imgs = Array.from(editorDom.content?.querySelectorAll('img') || []).filter((img) => img.src);
      let idx: number = 0;
      for (const img of imgs || []) {
        const filePath: string = `${$journalEntry.place_id}/${dateFrom} --> ${dateTo}:${idx}`;
        const formData = new FormData();
        formData.append('filePath', filePath);
        formData.append('file', files[idx]);
        // TODO: Store the image in Cloudflare R2
        await getPresignedUrlAndUploadFile(formData);
        // Swap the src content with the image ID that is used to store and retrieve images from Cloudflare R2 to reduce db storage
        img.src = `#${filePath}`;
        idx += 1;
      }
      div.append(...editorDom.content?.childNodes as NodeListOf<ChildNode> || []);
      const res = !!duplicatedLocation
        ? await updateJournal({
          _id: duplicatedLocation._id,
          popup: {
            ...duplicatedLocation.popup,
            [`${dateFrom} --> ${dateTo}`]: div.outerHTML,
          },
        })
        : await createJournal({
          latlng: $journalEntry.latlng as LatLngTuple,
          popup: {
            [`${dateFrom} --> ${dateTo}`]: div.outerHTML,
          },
          place_id: $journalEntry.place_id as string,
          place_name: $journalEntry.place_name as string,
        });
      dispatch('next');
      if (res.success) {
        dispatch('successful');
        return;
      }
      dispatch('error');
    } catch (err: any) {
      alert(err.message);
    } finally {
      saving = false;
    }
  };

  let editorDom: { content: HTMLElement | null, isEmpty: boolean } = {
    content: null,
    isEmpty: true,
  };
  const handleChange = ({ detail }: { detail: { dom: HTMLElement, empty: boolean } }) => {
    editorDom.content = detail.dom;
    editorDom.isEmpty = detail.empty;
  };

  let dateFrom: Date;
  let dateTo: Date;
  const onDateChange = (direction: 'from' | 'to', e: CustomEvent<any>) => {
    if (direction === 'from') {
      // @ts-ignore
      dateFrom = e.target?.value;
    } else if (direction === 'to') {
      // @ts-ignore
      dateTo = e.target?.value;
    }
  };

  let uploading: boolean = false;
  const files: File[] = [];
  const uploadingFiles = () => {
    uploading = true;
  };
  const uploadedFiles = ({ detail }: { detail: File }) => {
    uploading = false;
    files.push(detail);
  };
</script>

<!-- <template> -->
<Section {style}>
  <label for="story">
    Your story
    <span class="dates">
      <label for="dateFrom">
        Date from
        <Input type="date" on:change={(e) => { onDateChange('from', e); }} />
      </label>
      <label for="dateTo">
        Date to
        <Input type="date" on:change={(e) => { onDateChange('to', e); }} />
      </label>
    </span>
    <TextEditor on:change={handleChange} on:fileUploading={uploadingFiles} on:fileUploaded={uploadedFiles} />
  </label>

  <span>
    <Button disabled={saving} on:click={back}>
      <ArrowLeft slot="leftIcon" />
      Back
    </Button>
    <Button disabled={editorDom.isEmpty || !dateFrom || !dateTo || uploading} loading={saving} on:click={saveContent}>
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

  .dates {
    margin-top: 4px;
    align-self: flex-start;
    font-size: 12px;
  }
</style>
