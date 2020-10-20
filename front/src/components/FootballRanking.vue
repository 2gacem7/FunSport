<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header d-flex justify-content-between">
      <h3 class="text-center">Ranking</h3>
    </div>
    <div>
      <select v-model="id_tournament" v-on:click="getInfos">
        <option value="148">Premier League</option>
        <option value="468">Liga</option>
        <option value="176">Ligue 1</option>
        <option value="262">Serie A</option>
        <option value="195">Bundesliga</option>
      </select>
      <button
        v-if="id_tournament !== ''"
        class="btn btn-success font-weight-bold"
        @click="addToMyFavorites"
      >
        + favori
      </button>

      <button
        v-if="delButton"
        class="btn btn-danger font-weight-bold mb-2"
        @click="delToMyFavorites"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-trash"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div>

    <div class="card-body m-0 p-0 w-100 overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center"></th>
            <th class="h5 font-weight-bold text-center">Rank</th>
            <th class="h5 font-weight-bold text-center">Teams</th>
            <th class="h5 font-weight-bold text-center">Points</th>
          </tr>
        </thead>
        <tbody v-for="item in info" :key="item.id">
          <tr>
            <td>
              <button
                v-if="id_tournament !== ''"
                class="btn btn-success btn-sm rounded-circle mb-2 btnADD"
                @click="addTeamToMyFavorite(item)"
              >
                ADD
              </button>
            </td>
            <td class="text-center">
              {{ item.overall_league_position }}
            </td>
            <td class="text-center">
              <p>{{ item.team_name }}</p>
              <p>
                <img
                  :src="return_Link(item)"
                  alt="no team badge"
                  style="max-width: 5rem"
                />
              </p>
            </td>
            <td class="text-center">
              {{ item.overall_league_PTS }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import ENV from "../../env.config";
/**
 * Component card for display all teams
 * @displayName FootballRanking
 */
export default {
  name: "FootballRanking",

  data() {
    return {
      info: [],
      infoRanking: [],
      id_tournament: "",
    };
  },
  props: {
    /**
     * The id of this card
     */
    id: "",
    /**
     * The button for del this card in favorite
     */
    delButton: Boolean,
  },

  methods: {
    /**
     * Add this team to my favorites
     *
     * @public
     */
    addTeamToMyFavorite(item) {
      const teamId = item.team_id;
      this.$store.dispatch("addToMyFavorites", {
        id: this.$store.state.tabSelected.id,
        data: {
          sport: "football",
          type: "team",
          id_tournament: this.id_tournament,
          team_id: teamId,
        },
      });
      this.getInfos();
    },
    /**
     * Add one league to my favorites
     *
     * @public
     */
    addToMyFavorites() {
      this.$store.dispatch("addToMyFavorites", {
        id: this.$store.state.tabSelected.id,
        data: {
          sport: "football",
          type: "tournament",
          id_tournament: this.id_tournament,
        },
      });
    },
    /**
     * Delete this ranking in my favorites
     *
     * @public
     */
    delToMyFavorites() {
      this.$emit("delfavorite", this.id);
    },
    /**
     * Get datas from api for display on the card
     *
     * @public
     */
    async getInfos() {
      if (this.id_tournament !== "") {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        await fetch(
          "https://apiv2.apifootball.com/?action=get_standings&league_id=" +
            this.id_tournament +
            "&APIkey=" +
            ENV.API_FOOTBALL,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => (this.info = result));
      }
    },
    /**
     * Return link to img for display team badge in card
     *
     * @public
     */
    return_Link(item) {
      return item.team_badge;
    },
  },
};
</script>