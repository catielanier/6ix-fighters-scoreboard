<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { Link } from "svelte-routing";
  import { getDatabase, onValue, ref, remove } from "firebase/database";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
  import { TeamShort } from "../utils/types";
  import { firebase } from "../data/firebase";

  library.add(faPenToSquare, faTrash);

  const database = getDatabase(firebase);

  type TeamDbRow = {
    name: string;
    logoUrl: string;
  };

  const teams = writable<TeamShort[]>([]);

  const deleteTeam = (slug: string): void => {
    const deleteRef = ref(database, `/teams/${slug}`);
    remove(deleteRef);
  };

  onMount(() => {
    const reference = ref(database, "/teams");
    onValue(reference, (res) => {
      const data = res.val() as Record<string, TeamDbRow> | null;
      if (data) {
        const teamData: TeamShort[] = Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            { slug: key, name: value.name, logoUrl: value.logoUrl },
          ]),
        );
        teams.set(teamData);
      }
    });
  });
</script>

<div class="teams">
  {#if $teams.length}
    <div class="team-grid">
      {#each $teams as team}
        <div class="logo">
          <img src={team.logoUrl} alt={team.name} />
        </div>
        <div class="team-name">
          {team.name}
        </div>
        <div class="edit-team">
          <Link to={`/manager/${team.slug}`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
        </div>
        <div class="delete-team">
          <button on:click={() => deleteTeam(team.slug)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      {/each}
    </div>
  {:else}
    <p>No teams created.</p>
  {/if}
</div>
