<script lang="ts">
  import { navigate } from "svelte-routing";
  import { firebase } from "../data/firebase";
  import nameToSlug from "../utils/nameToSlug";
  import { Team } from "../utils/types";
  import { getDatabase, ref, set } from "firebase/database";
  import { writable } from "svelte/store";

  const database = getDatabase(firebase);

  const error = writable<string | null>(null);

  const team: Team = {
    name: "",
    score: 0,
    logoUrl: "",
    players: [
      {
        name: "",
        imageUrl: "",
      },
      {
        name: "",
        imageUrl: "",
      },
      {
        name: "",
        imageUrl: "",
      },
      {
        name: "",
        imageUrl: "",
      },
    ],
  };

  const submitTeam = (): void => {
    const slug: string = nameToSlug(team.name);
    const reference = ref(database, `/teams/${slug}`);
    set(reference, team)
      .then(() => {
        navigate("/manager");
      })
      .catch(() => {
        error.set("Unable to create team");
      });
  };
</script>

<div class="team">
  {#if error}
    <p class="error"><span>Error:</span> {error}</p>
  {/if}
  <form
    on:submit={(e) => {
      e.preventDefault();
      submitTeam();
    }}
  >
    <p>Team name:</p>
    <input type="text" name="team-name" id="team-name" bind:value={team.name} />
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
</div>
