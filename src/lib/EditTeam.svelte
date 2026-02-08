<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { getDatabase, ref, get, set } from "firebase/database";
  import { navigate } from "svelte-routing";
  import { firebase } from "../data/firebase";
  import { Team } from "../utils/types";

  export let slug: string;
  let team: Team | undefined;
  const error = writable<string | null>(null);

  const database = getDatabase(firebase);
  const reference = ref(database, `/teams/${slug}`);

  onMount(() => {
    get(reference).then((res) => {
      const data = res.val();
      if (data) {
        team = data;
      }
    });
  });

  const submitTeam = (): void => {
    set(reference, team)
      .then(() => {
        navigate("/manager");
      })
      .catch(() => {
        error.set("Unable to update team");
      });
  };
</script>

<div class="team">
  <h1>Edit Team</h1>
  {#if error}
    <p class="error"><span>Error:</span> {error}</p>
  {/if}
  {#if team}
    <form
      on:submit={(e) => {
        e.preventDefault();
        submitTeam();
      }}
    >
      <p>Team name:</p>
      <input
        type="text"
        name="team-name"
        id="team-name"
        bind:value={team.name}
      />
      <p>Logo URL:</p>
      <input
        type="text"
        name="logo-url"
        id="logo-url"
        bind:value={team.logoUrl}
      />
      {#each team.players as _, i}
        <p>Player {i + 1} Name:</p>
        <input type="text" bind:value={team.players[i].name} />
        <p>Player {i + 1} Picture URL:</p>
        <input type="text" bind:value={team.players[i].imageUrl} />
      {/each}
      <button type="submit">Save</button>
    </form>
  {:else}
    <p>No such team exists.</p>
  {/if}
</div>
