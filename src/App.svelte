<script lang="ts">
  import { onMount } from "svelte";
  import { Route, Router } from "svelte-routing";
  import { getToken } from "./utils/tokenService";

  import UpdateScoreboard from "./lib/UpdateScoreboard.svelte";
  import Login from "./lib/Login.svelte";
  let isLoggedIn: boolean | null;
  let url: string = "";

  onMount(() => {
    isLoggedIn = !!getToken();
  });
</script>

<Router {url}>
  <main>
    {#if isLoggedIn}
      <Route path="/" component={UpdateScoreboard} />
    {:else}
      <Route path="/" component={Login} />
    {/if}
  </main>
</Router>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
