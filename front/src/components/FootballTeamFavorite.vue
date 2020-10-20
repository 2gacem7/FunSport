<template>
  <div class="card m-3 bg-light" style="max-height: 50rem; max-width: 40rem">
    <div class="card-header d-flex justify-content-between">
      <img
        v-if="infos[0]"
        :src="return_Link(infos[0].team_badge)"
        alt="no team badge"
        style="max-width: 7rem"
      />
      <h3 v-if="infos[0]" class="text-dark text-center">
        {{ infos[0].team_name }}'s informations
      </h3>
    </div>
    <div class="card-body m-0 p-0 overflow-auto text-dark" v-if="infos[0]">
      <h5 class="font-weight-bold text-center">Coach</h5>
      <div v-for="coach in infos[0].coaches" :key="coach.coach_name">
        <p class="text-center font-weight-bold">{{ coach.coach_name }}</p>
        <p class="text-center font-weight-bold">{{ coach.coach_country }}</p>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="h6 font-weight-bold text-center">Players</th>
            <th class="h6 font-weight-bold text-center">Stats</th>
            <th class="h6 font-weight-bold text-center">Position</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="player in infos[0].players"
            :key="player.player_key"
            class="w-100"
          >
            <td scope="col">
              <p class="font-weight-bold">{{ player.player_name }}</p>
              <p>{{ player.player_age }} years old</p>
              <p>
                <a class="font-weight-bold">Country:</a
                >{{ player.player_country }}
              </p>
            </td>
            <td scope="col" class="text-center row">
              <p>
                <img
                  src="../assets/soccer-field.png"
                  style="width: 2rem; height: 2rem"
                  class="mr-1"
                  alt="no image match played"
                />{{ player.player_match_played }}
                <img
                  src="../assets/ballon.png"
                  style="width: 1.5rem; height: 1.5rem"
                  class="mr-1"
                  alt="no image goals"
                />{{ player.player_goals }}
              </p>

              <p>
                <img
                  src="../assets/yellow-card.png"
                  style="width: 1.5rem; height: 1.5rem"
                  alt="no image yellow cards"
                />{{ player.player_yellow_cards }}
                <img
                  src="../assets/red-card.png"
                  style="width: 1.5rem; height: 1.5rem"
                  class="ml-2"
                  alt="no image red cards"
                />{{ player.player_red_cards }}
              </p>
            </td>
            <td scope="col" class="text-center">
              <p class="font-weight-bold">{{ player.player_type }}</p>
              <p class="font-weight-bold">N°{{ player.player_number }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      class="btn btn-danger p-1"
      style="width: 100%"
      @click="delToMyFavorites()"
    >
      Unfav
    </button>
  </div>
</template>

<script>
import ENV from "../../env.config";
/**
 * Component card for display all teams
 * @displayName FootballTeamFavorite
 */
export default {
  name: "FootballTeamFavorite",
  data() {
    return {
      infos: {},
    };
  },
  props: {
    /**
     * The id_tournament of the league
     */
    id_tournament: String,
    /**
     * The team id of the team
     */
    team_id: String,
    /**
     * The id of this card
     */
    id: "",
  },
  async mounted() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    await fetch(
      "https://apiv2.apifootball.com/?action=get_teams&league_id=" +
        this.id_tournament +
        "&team_id= " +
        this.team_id +
        "&APIkey=" +
        ENV.API_FOOTBALL,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => (this.infos = result));
  },

  methods: {
    /**
     * Remove this team from my favorites
     *
     * @public
     */
    delToMyFavorites() {
      this.$emit("delfavorite", this.id);
    },
    /**
     * Return link to img for display team badge in card
     *
     * @public
     */
    return_Link(infos) {
      return infos;
    },
  },
};
</script>