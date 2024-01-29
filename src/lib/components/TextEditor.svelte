<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  import { schema } from 'prosemirror-schema-basic';
  import { EditorState, Plugin } from 'prosemirror-state';
  import { EditorView, Decoration, DecorationSet } from 'prosemirror-view';
  import { Schema, DOMParser, Node } from 'prosemirror-model';
  import { addListNodes } from 'prosemirror-schema-list';
  import { exampleSetup } from 'prosemirror-example-setup';

  import 'prosemirror-menu/style/menu.css';
  import 'prosemirror-view/style/prosemirror.css';
  import 'prosemirror-example-setup/style/style.css';

  import FileInput from '$lib/components/FileInput.svelte';
  import { createPlaceholder } from '$lib/utils/createPlaceholder';

  export let style = '';

  const dispatch  = createEventDispatcher();

  let editorView: HTMLDivElement;

  // Event Handler
  const onEditorFocus = () => {
    window.view?.dom?.focus();
  };

  let placeholderPlugin = new Plugin({
    state: {
      init() { return DecorationSet.empty },
      apply(tr, set) {
        // Adjust decoration positions to changes made by the transaction
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        // @ts-ignore
        let action = tr.getMeta(this);
        if (action && action.add) {
          let widget = createPlaceholder();
          let deco = Decoration.widget(action.add.pos, widget, { id: action.add.id });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(set.find(undefined, undefined,
                                  (spec) => spec.id == action.remove.id));
        }
        return set;
      },
    },
    props: {
      decorations(state) { return this.getState(state) },
    },
  });

  const uploadFile = (file: File) => {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      // Some extra delay to make the asynchronicity visible
      setTimeout(() => reader.readAsDataURL(file), 250);
    });
  }

  const findPlaceholder = (state: EditorState, id: {}) => {
    let decos = placeholderPlugin.getState(state);
    let found = decos?.find(undefined, undefined, (spec) => spec.id === id);
    return found?.length ? { from: found[0].from, to: found[0].to } : null;
  };

  const startImageUpload = (view: EditorView, file: File) => {
    dispatch('fileUploading');
    // A fresh object to act as the ID for this upload
    let id = {};

    // Replace the selection with a placeholder
    let tr = view.state.tr;
    if (!tr.selection.empty) tr.deleteSelection();
    tr.setMeta(placeholderPlugin, { add: { id, pos: tr.selection.from } });
    view.dispatch(tr);

    uploadFile(file)
      .then((url) => {
        let pos = findPlaceholder(view.state, id);
        // If the content around the placeholder has been deleted, drop
        // the image
        if (pos === null) return;
        // Otherwise, insert it at the placeholder's position, and remove
        // the placeholder
        const imgNode = newSchema.nodes.image.create({ src: url });
        view.dispatch(view.state.tr
                      .replaceWith(pos.from, pos.to, imgNode)
                      .setMeta(placeholderPlugin, { remove: { id } }));
        dispatch('fileUploaded', file);
      })
      .catch(() => {
        // On failure, just clean up the placeholder
        view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
      });
  };

  const handleChange = ({ detail: files }: {detail: FileList | null | undefined}) => {
    if (window.view.state.selection.$from.parent.inlineContent && files?.length) {
      const promises = Array.from(files).map((file: File) => startImageUpload(window.view, file));
      Promise.all(promises);
    }
    window.view.focus();
  };

  let newSchema: Schema;
  onMount(() => {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    newSchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks,
    });

    let state = EditorState.create({
      doc: DOMParser.fromSchema(newSchema).parse(document.querySelector('#content') as Element),
      plugins: exampleSetup({ schema: newSchema }).concat(placeholderPlugin),
    });

    window.view = new EditorView(editorView, {
      state,
      dispatchTransaction(tr) {
        window.view.updateState(window.view.state.apply(tr));
        dispatch('change', {
          dom: window.view.dom,
          empty: (
            window.view.dom.childNodes.length === 1
              && window.view.dom.childNodes[0].childNodes.length === 1
              && window.view.dom.childNodes[0].childNodes[0].nodeName === 'BR'
          ),
        });
      },
    });
    // Auto-focus
    window.view.dom.focus();
  });
</script>

<!-- <template> -->
<FileInput
  id="uploadStory"
  style="align-self: flex-end;"
  title="Upload media files"
  on:change={handleChange} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="editor" {style}
  bind:this={editorView}
  on:click|stopPropagation={onEditorFocus}
  on:keydown>
  <div id="content"></div>
</div>
<!-- </template> -->

<style>
  .editor {
    --backgroundColor: rgba(0, 0, 0, 0.808);

    width: 400px;
    min-height: 200px;
    background-color: var(--backgroundColor);
    border-radius: 4px;
    padding: 4px;
    cursor: text;
  }

  :global(.ProseMirror.ProseMirror-example-setup-style) {
    max-height: 250px;
    overflow: auto;
  }
  :global(.ProseMirror.ProseMirror-example-setup-style.ProseMirror-focused:focus-visible) {
    outline: none;
  }
  :global(.ProseMirror.ProseMirror-example-setup-style img) {
    width: 25%;
  }
  :global(.ProseMirror-menubar) {
    background-color: var(--backgroundColor);
    color: rgb(210, 210, 210);
  }
  :global(.ProseMirror-prompt) {
    position: absolute;
    background-color: rgba(212, 212, 212);
    padding: 8px;
    border-radius: 4px;
    z-index: 1000;
  }
  :global(.ProseMirror-prompt-buttons) {
    text-align: right;
    margin-top: 8px;
  }
</style>
