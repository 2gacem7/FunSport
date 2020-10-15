<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header text-dark justify-content-between">
      <h3>Search a match or competition</h3>
    </div>
    <div class="d-flex m-1">
      <select
        class="py-1"
        v-model="type"
        required
        name="formSelect"
        id="formSelect"
        @change="resetData"
      >
        <option value="matches">Matches</option>
        <option value="competitions">Competitions</option>
      </select>
      <input
        class="mr-2 mr-auto ml-1  p-0"
        placeholder="Search value"
        v-model="searchValue"
      />
      <button class="btn btn-primary mr-2" @click="launchSearch">Search</button>
      </div>
      <div class="h5 bg-light text-dark font-weight-bold text-center">
        Results
      </div>

    <div class="card-body text-dark overflow-auto p-1">
      <div v-if="type == 'matches' && results.length != 0">
        <div v-for="match in results" :key="match.id">
          <div
            v-if="match.scheduled_at != null && match.opponents[1]"
            class="card m-3"
          >
            <div class="card-header">
              Scheduled at:
              {{ match.scheduled_at | moment("MMMM Do YYYY, h:mm:ss") }}
            </div>
            <div class="card-body">
              <div v-for="(opponent, index) in match.opponents" :key="index">
                <div>
                  {{ opponent.opponent.name }}
                  <img
                    :src="opponent.opponent.image_url"
                    alt="No image Team"
                    height="50"
                  />
                </div>
                <div v-if="index % 2 == 0" class="text-center">VS</div>
              </div>
            </div>
            <button class="btn btn-success" @click="goViewMatch(match.id)">
              View
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="type == 'competitions' && results.length != 0">
        <div
          class="card m-2"
          v-for="competition in results"
          :key="competition.id"
        >
          <div class="card-header">
            {{ competition.league.name }}
            <img
              :src="competition.league.image_url"
              alt="No image Competition"
              height="50"
            />
          </div>
          <div class="card-body">
            Begin at:{{ competition.begin_at | moment("MMMM Do YYYY, h:mm:ss")
            }}<br />
            End at : <span v-if="competition.end_at == null">Unknown</span
            ><span v-else>{{
              competition.end_at | moment("MMMM Do YYYY, h:mm:ss")
            }}</span>
          </div>
          <div class="card-footer">
            <button
              class="btn btn-success"
              @click="goViewMatch(competition.id)"
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center">No result available. Try again</div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
/**
 * Component card for display search tournement or match
 * @displayName DisplaySearch
 */
export default {
  name: "DisplaySearch",
  props: {
    /**
     * The api name (ex: football, cs-go, etc...)
     */
    apiName: String, // String used to search info for 1 sport in getInfos
  },
  data() {
    return {
      type: "matches",
      searchValue: "",
      results: [],
    };
  },
  methods: {
    goViewMatch(matchId) {
      let data;
      for (let key in this.results) {
        if (this.results[key].id === matchId) {
          data = this.results[key];
        }
      }
      if (this.type == "matches") {
        this.$router.push({
          name: "match",
          params: {
            matchId: matchId,
            apiname: this.apiName,
            datas: data,
          },
        });
      } else if (this.type == "competitions") {
        this.$router.push({
          name: "competition",
          params: {
            competitionId: matchId,
            apiname: this.apiName,
            datas: data,
          },
        });
      }
    },
    resetData() {
      this.results = [];
    },
    launchSearch() {
      if (this.type == "competitions") {
        this.getCompetitions();
      } else if (this.type == "matches") {
        this.getMatches();
      }
    },
    async getMatches() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      this.results = await fetch(
        `https://api.pandascore.co/${this.apiName}/matches?search[name]=${this.searchValue}&sort=-scheduled_at`,
        requestOptions
      )
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
    },
    async getCompetitions() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      this.results = await fetch(
        `https://api.pandascore.co/${this.apiName}/tournaments?search[slug]=${this.searchValue}&sort=-begin_at`,
        requestOptions
      )
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
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