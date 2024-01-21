<script lang="ts">
  import { onMount } from 'svelte';

  import { schema } from 'prosemirror-schema-basic';
  import { EditorState, Plugin } from 'prosemirror-state';
  import { EditorView, Decoration, DecorationSet } from 'prosemirror-view';
  import { Schema, DOMParser } from 'prosemirror-model';
  import { addListNodes } from 'prosemirror-schema-list';
  import { exampleSetup } from 'prosemirror-example-setup';

  import 'prosemirror-menu/style/menu.css';

  export let style = '';

  let editorView: HTMLDivElement;

  // Event Handler
  const onEditorFocus = () => {
    window.view?.dom?.focus();
  };

  onMount(() => {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const newSchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks,
    });

    let state = EditorState.create({
      doc: DOMParser.fromSchema(newSchema).parse(document.querySelector('#content') as Element),
      plugins: exampleSetup({ schema: newSchema }),
    });
    window.view = new EditorView(editorView, { state });
    // Auto-focus
    window.view.dom.focus();

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
            let widget = document.createElement('placeholder');
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
  });
</script>

<!-- <template> -->
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
    height: 200px;
    background-color: var(--backgroundColor);
    border-radius: 4px;
    padding: 4px;
    cursor: text;
  }

  :global(.ProseMirror.ProseMirror-example-setup-style.ProseMirror-focused:focus-visible) {
    outline: none;
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
