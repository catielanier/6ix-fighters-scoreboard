<script lang="ts">
  import { onMount } from "svelte";
  import { Route, Router } from "svelte-routing";
  import { getToken } from "./utils/tokenService";

  import UpdateScoreboard from "./lib/UpdateScoreboard.svelte";
  import Login from "./lib/Login.svelte";
  import Matchup from "./lib/Matchup.svelte";
  import VersusScreen from "./lib/VersusScreen.svelte";
  import Scoreboard from "./lib/Scoreboard.svelte";
  import Leaderboard from "./lib/Leaderboard.svelte";
  import TeamManager from "./lib/TeamManager.svelte";
  import AddTeam from "./lib/AddTeam.svelte";
  import EditTeam from "./lib/EditTeam.svelte";

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
      <Route path="/manager" component={TeamManager} />
      <Route path="/manager/add" component={AddTeam} />
      <Route exact path="/manager/edit/:slug" component={EditTeam} />
    {:else}
      <Route path="/" component={Login} />
    {/if}
    <Route path="/matchup" component={Matchup} />
    <Route path="/versus" component={VersusScreen} />
    <Route path="/scoreboard" component={Scoreboard} />
    <Route path="/leaderboard" component={Leaderboard} />
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
