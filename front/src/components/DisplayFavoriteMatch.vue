<template>
  <div class="card m-3 bg-light" style="max-height: 32rem; max-width: 22rem">
    <div class="card-header text-center">
      <h3>{{ sport }}</h3>
      {{ infos.name }}
    </div>
    <div class="card-body m-0 p-0 w-100">
      <div class="w-100 overflow-auto">
        <table class="table">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Dates</th>
            <th class="h5 font-weight-bold text-center">Leagues</th>
            <th class="h5 font-weight-bold text-center">Winner</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="infos.league">
            <td class="text-center">
              <p class="m-0 font-weight-bold">Start:</p>
              <span v-if="infos.begin_at == null">Unknown</span
              ><span v-else>
                {{ infos.begin_at | moment("MMMM Do YYYY") }}</span
              >
              <p class="m-0 mt-2 font-weight-bold">End:</p>
              <span v-if="infos.end_at == null">Unknown</span
              ><span v-else> {{ infos.end_at | moment("MMMM Do YYYY") }}</span>
            </td>
            <td class="text-center">
              {{ infos.league.name }}
              <img
                :src="infos.league.image_url"
                style="max-width: 7rem"
                class="mb-5"
                alt="no league image"
              />
            </td>
            <td v-if="infos.winner" class="text-center">
              {{ infos.winner.name }}
            </td>
            <td v-else class="text-center">unknown</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="card-footer d-flex text-dark">
        <button
          class="btn btn-danger m-0 p-0"
          style="width: 100%"
          @click="delToMyFavorites()"
        >
          Unfav
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
/**
 * Component card for display search tournement or match
 * @displayName DisplayFavoriteMatch
 */
export default {
  name: "DisplayFavoriteMatch",
  props: {
    /**
     * The slug name of team
     */
    matchId: Number,
    /**
     * The id of this card
     */
    id: "",
    /**
     * The api name used to fetch url(ex: football, cs-go, etc...)
     */
    apiName: String, // String used to search info for 1 sport in getInfos
    /**
     * The name of the favorite sport
     */
    sport: String,
  },
  data() {
    return {
      infos: [],
      type: "matches",
      searchValue: "",
      results: [],
    };
  },
  async beforeMount() {
    this.getInfo();
  },
  methods: {
    /**
     * remove this team from my favorite
     *
     * @public
     */
    delToMyFavorites() {
      this.$emit("delfavorite", this.id);
      this.getInfo();
    },
    /**
     * Get team data from api
     *
     * @public
     */
    async getInfo() {
      let sportName;
      if (this.apiName == "CS-GO") {
        sportName = "csgo";
      } else if (this.apiName == "DOTA2") {
        sportName = "dota2";
      } else if (this.apiName == "LOL") {
        sportName = "lol";
      }
      let infos = [];
      await fetch("https://api.pandascore.co/matches/" + this.matchId, {
        method: "GET",
        headers: {
          authorization: "Bearer " + ENV.API_PANDA_SPORT,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          infos = response;
          this.infos = response;
        });
    },
  },
};
</script>
<style>
@font-face {
  font-family: "LEQUIPE Regular";
  src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot");
  src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot?#iefix")
      format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff2")
      format("woff2"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff")
      format("woff"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.ttf")
      format("truetype"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.svg#LEQUIPE Regular")
      format("svg");
}

a {
  text-decoration: none;
  color: black;
}

a:link {
  text-decoration: none;
}

.brand {
  font-family: LEQUIPE Regular, sans-serif;
  font-size: 30px;
  color: #d61e00;
}

.navbar {
  background-color: whitesmoke !important;
}
</style>