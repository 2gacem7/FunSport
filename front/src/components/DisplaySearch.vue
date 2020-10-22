<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header text-dark justify-content-between">
      <h3>Search a match or competition</h3>
    </div>
    <div class="m-1">
      <select
        class="py-1 m-2"
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
        class="m-2 mr-auto ml-1 p-0"
        placeholder="Search value"
        v-model="searchValue"
      />
      <button class="btn btn-primary m-2" @click="launchSearch">Search</button>
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
              <button v-if="match.button && $store.state.UserData.id != ''"
                class="btn btn-success btn-sm rounded-circle mb-2 btnADD" @click="addMatchToMyFavorite(match.id)">
                ADD
              </button>
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
            {{ competition.name }}<br/>
            Begin at:{{ competition.begin_at | moment("MMMM Do YYYY, h:mm:ss")
            }}<br />
            End at : <span v-if="competition.end_at == null">Unknown</span
            ><span v-else>{{
              competition.end_at | moment("MMMM Do YYYY, h:mm:ss")
            }}</span><br/>
            <span>Number of team: {{ competition.teams.length }}</span><br/>
            <span> Number of matches: {{ competition.matches.length }}</span>
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
     /**
       * The type of sport of this card
       */
      sport: String, // String display in the header
  },
  data() {
    return {
      type: "matches",
      searchValue: "",
      results: [],
    };
  },
  computed: {
    myFavorites: function () {
      return this.$store.state.MyFavorites;
    },
  },
  methods: {
    /**
     * Methods used to add a match in my favorite
     * @param matchId matchId given by the api pandascore
     * @public
     */
    addMatchToMyFavorite(matchId){
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: this.sport,
            type: "matches",
            match_id: matchId,
            apiName: this.apiName,
          },
        });
        for(let i = 0 ; i< this.results.length; i++){
          if(this.results[i].id === matchId){
            this.results[i].button = false;
          }
        }

    },
     /**
     * Methods used to go in a view for a specific match or competition
     * @param matchId matchId given by the api pandascore
     * @public
     */
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
    /**
     * Methods used to reset this.results
     * @public
     */
    resetData() {
      this.results = [];
    },
    /**
     * Methods used to launch the search
     * @public
     */
    launchSearch() {
      if (this.type == "competitions") {
        this.getCompetitions();
      } else if (this.type == "matches") {
        this.getMatches();
      }
    },
    /**
     * Methods used to get matches datas
    * api uses: pandascore
     * @public
     */
    async getMatches() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);
      let response = [];
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      await fetch(
        `https://api.pandascore.co/${this.apiName}/matches?search[name]=${this.searchValue}&sort=-scheduled_at`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => (response = result))
          .then((update) => {
            for (let i = 0; i < response.length; i++) {
              let check = false;
              for (let j = 0; j < this.myFavorites.length; j++) {
                if (response[i].id === this.$store.state.MyFavorites[j].data[0].match_id) {
                  check = true;
                }
              }
              if (check) {
                response[i].button = false;
              } else response[i].button = true;
            }
            this.results = response;
          })

    },
    /**
     * Methods used to get competitions datas
     * api uses: pandascore
     * @public
     */
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