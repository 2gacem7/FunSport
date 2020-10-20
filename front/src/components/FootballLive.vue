<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header d-flex justify-content-between">
      <h3 class="text-center">{{ sport }} Live</h3>
    </div>

    <div>
      <select v-model="league_id" v-on:click="getInfos">
        <option value="">All matches</option>
        <option value="148">Premier League</option>
        <option value="468">Liga</option>
        <option value="176">Ligue 1</option>
        <option value="262">Serie A</option>
        <option value="435">Bundesliga</option>
      </select>
      <button v-if="isFavorite && !delButton && $store.state.UserData.id != '' && league_id!==''"
        class="btn btn-success font-weight-bold" @click="addToMyFavorites">
        + favori
      </button>
    </div>
    <h3 class="card-header text-center text-dark">Match on live</h3>

    <div class="card-body m-0 p-0 w-100 overflow-auto text-dark">
      <div class="text-dark text-center font-weight-bold" v-if="info.error == 404">
        No live available
      </div>
      <div v-else class="border-bottom mb-5" v-for="item in info" :key="item.id">
        <p class="text-center font-weight-bold">
          {{ item.match_round }} {{ item.match_time }}
        </p>
        <p class="text-center mt-3">{{ item.match_status }}</p>
        <div class="row d-flex justify-content-center mb-5">
          <div>
            <p class="font-weight-bold text-center">
              {{ item.match_hometeam_name }}
            </p>
            <p class="font-weight-bold text-center">
              <img :src="return_Link_Home(item)" style="max-width: 4rem" />{{
                item.match_hometeam_score
              }}
            </p>
            <div v-for="goal in item.goalscorer" :key="goal.id">
              <div v-if="(goal.home_scorer = goal.home_scorer)">
                {{ goal.time }}' {{ goal.home_scorer }}
                <img src="../assets/ballon.png" style="width: 1.5rem; height: 1.5rem" class="mr-1" />
              </div>
            </div>
          </div>
          <div class="ml-5">
            <p class="font-weight-bold text-center">
              {{ item.match_awayteam_name }}
            </p>
            <p class="font-weight-bold text-center">
              {{ item.match_awayteam_score }}
              <img :src="return_Link_Away(item)" style="max-width: 4rem" />
            </p>
            <div v-for="goal in item.goalscorer" :key="goal.id">
              <div v-if="(goal.away_scorer = goal.away_scorer)">
                <img src="../assets/ballon.png" style="width: 1.5rem; height: 1.5rem" class="mr-1" />
                {{ goal.away_scorer }} {{ goal.time }}'
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import ENV from "../../env.config";
  /**
   * Component card for display matches on live
   * @displayName FootballLive
   */
  export default {
    name: "FootballLive",

    data() {
      return {
        info: {},
        infoLive: {},
        league_id: "",
        timer: 60000, // timer to refresh the live data 10s
        setTimer: "", // save the timer interval
        Home: "",
        isFavorite: false
      };
    },
    props: {
      /**
       * The id of this card
       */
      id: "",
      /**
       * The type of sport of this card
       */
      sport: String, // String display in the header
      /**
       * The api name (ex: football, cs-go, etc...)
       */
      apiName: String, // String used to search info for 1 sport in getInfos
      /**
       * The button for del this card in favorite
       */
      delButton: Boolean,
    },
    beforeMount() {
      this.getInfos();
      //this.getInfosRanking()
    },

    computed: {
      myFavorites: function () {
        return this.$store.state.MyFavorites;
      },
    },

    methods: {
      /**
       * Add this team to my favorites
       *
       * @public
       */
      addToMyFavorites() {
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: "football",
            type: "live",
            league_id: this.league_id,
          },
        });
      },
      /**
       * verify if the league's live is in user favorites
       *
       * @public
       */
      async isInMyFavorite() {
        let x = await this.$store.state.MyFavorites.length;
        for (let i = 0; i < x; i++) {
          if (this.$store.state.MyFavorites[i].data[0].sport == "football" && this.$store.state
            .MyFavorites[i].data[0].type == "live" && this.$store.state.MyFavorites[i].data[0]
            .league_id == this.league_id) {
            this.isFavorite = false
          }
        }
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
        this.isFavorite = true;
        this.isInMyFavorite();
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
          dd = "0" + dd;
        }

        if (mm < 10) {
          mm = "0" + mm;
        }
        today = yyyy + "-" + mm + "-" + dd;

        await fetch(
            `https://apiv2.apifootball.com/?action=get_events&match_live=1&to=${today}&from=${today}&league_id=` +
            this.league_id +
            "&APIkey=" +
            ENV.API_FOOTBALL,
            requestOptions
          )
          .then((response) => response.json())
          .then((result) => {
            this.info = result;
            if (this.setTimer == "") {
              this.setTimer = setInterval(() => {
                this.getInfos();
              }, this.timer);
            }
          })

      },
      /**
       * Return link to img for display team badge in card
       *
       * @public
       */
      return_Link_Home(item) {
        return item.team_home_badge;
      },
      return_Link_Away(item) {
        return item.team_away_badge;
      },
    },
  }
</script>