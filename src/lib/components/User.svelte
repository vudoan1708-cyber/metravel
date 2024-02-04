<script lang="ts">
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";

  import { signOut } from '@auth/sveltekit/client';

  export let style = '';

  // Event Handler
  let openList = false;
  const onImgClick = (value?: boolean): void => {
    openList = value === undefined ? !openList : value;
  };
</script>

<!-- <template> -->
{#if $page.data.session}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="wrapper" {style} on:mouseleave={() => { onImgClick(false); }}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="user_img"
      title={$page.data.session.user?.name}
      aria-roledescription="button"
      on:click={() => { onImgClick(); }}
      on:keydown>
      <img src={$page.data.session.user?.image || ''} alt={$page.data.session.user?.name} class:active={openList} />
    </div>

    {#if openList}
      <ul transition:slide={{ duration: 200 }}>
        <li>My plan</li>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={() => signOut()} on:keydown>Sign out</li>
      </ul>
    {/if}
  </div>
{/if}
<!-- </template> -->

<style>
  .wrapper {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
  }

  .user_img {
    position: relative;
    width: 50%;
    cursor: pointer;
  }

  .user_img img {
    border-radius: 50%;
    width: 100%;
    border: none;
  }

  .user_img img:hover,
  .user_img img.active {
    border: 2px dashed rgba(0, 0, 0, 0.464);
  }

  ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    list-style: none;
    overflow-x: hidden;
    padding: 8px;
    background-color: rgba(255, 255, 255, .5);
  }

  ul li {
    padding: 4px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, .5);
    cursor: pointer;
    transition: background-color .2s ease-in-out;
  }
  ul li:hover {
    background-color: rgba(219, 244, 255, 0.75);
  }
  ul li:not(li:last-child) {
    border-bottom: 1px solid black;
  }
</style>
