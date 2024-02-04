<script lang="ts">
  import { signIn } from '@auth/sveltekit/client';
  import { page } from '$app/stores';
</script>

<!-- <template> -->
<div class="user_login">
  {#if !$page.data.session}
    <span>You are not signed in</span>
    <button on:click={() => signIn('google', { callbackUrl: '/map' })}>
      Sign In with Google
    </button>
  {/if}
</div>
<!-- </template> -->

<style>
  .user_login {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
