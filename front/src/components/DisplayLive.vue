<template>
  <div class="card m-3 bg-light" style="max-height: 30rem; max-width: 20rem">
    <div class="card-header  d-flex justify-content-between">
      <button v-if="isFavorite && !delButton && $store.state.UserData.id !=''" class="btn btn-success font-weight-bold mb-2" @click="addToMyFavorites">
        + favori
      </button>
      <h3 class="text-center">{{ sport }} En live</h3>
      <button v-if="delButton" class="btn btn-danger font-weight-bold mb-2" @click="delToMyFavorites">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
      </button>
    </div>
    <div class="card-body m-0 p-0 overflow-auto">
      <div v-if="isLoading" class="text-dark text-center">
        Chargement en cours
      </div>
      <div class="text-dark text-center font-weight-bold" v-else-if="infos.length == 0">
        No live available
      </div>
      <div v-else class="card text-dark m-0 p-0" v-for="oneMatch in infos" :key="oneMatch.id"
        style="max-height: 32rem; border-bottom: 1px solid red">
        <div class="card-header">
          Begin at :
          {{ oneMatch.match.begin_at | moment("MMMM Do YYYY, h:mm:ss") }}
        </div>
        <div class="card-body">
          <div>ChampionShip : {{ oneMatch.match.league.slug }}</div>
          <img :src="oneMatch.match.league.image_url" alt="no image League" width="100" />
          <div>Status : {{ oneMatch.match.status }}</div>
          <div>Match :</div>
          <div class="row">
            <span class="col-6 text-center" v-for="team in oneMatch.match.opponents" :key="team.id">
              {{ team.opponent.name }}
              <img :src="team.opponent.image_url" alt="no image Team" height="100" />
            </span>
          </div>
          <div class="row">
            <span class="col-6 text-center" v-for="result in oneMatch.match.results" :key="result.id">
              {{ result.score }}
            </span>
          </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-secondary" :href="oneMatch.match.official_stream_url">View in direct
          </a>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex text-dark">
      Last update {{ lastUpdate | moment("MMMM Do YYYY, h:mm:ss") }}
      <button class="btn btn-danger ml-auto mr-1" @click="getInfos">Refresh</button>
    </div>
  </div>
</template>


<script>
  import ENV from "../../env.config";
  /**
   * Component card for display all live for a sport
   * @displayName Live
   */
  export default {
    name: "Live",
    data() {
      return {
        infos: [],
        isLoading: true,
        lastUpdate: new Date(),
        timer: 10000, // timer to refresh the live data 10s
        setTimer: "", // save the timer interval
        isFavorite: true,
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
    async beforeMount() {
      this.getInfos();
      this.isInMyFavorite();
    },
    methods: {
      /**
       * Check if this sport live is in favorite user
       *
       * @public
       */
      async isInMyFavorite() {
        let x  = await this.$store.state.MyFavorites.length
        for(let i= 0 ; i < x ; i++){
          if (this.$store.state.MyFavorites[i].data[0].sport == this.sport && this.$store.state.MyFavorites[i].data[0].type == "component" && this.$store.state.MyFavorites[i].data[0].name == 'live' ) {
            this.isFavorite = false
          }
        }
      },
      /**
       * Delete this components in my favorites
       *
       * @public
       */
      delToMyFavorites() {
        clearInterval(this.setTimer);
        this.$emit("delfavorite", this.id);
      },
      /**
       * Add this sport live to my favorite
       *
       * @public
       */
      addToMyFavorites() {
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: this.sport,
            type: "component",
            name: "live",
            apiName: this.apiName,
          },
        });
        this.isFavorite = false;
      },
      /**
       * Get datas from api for display on the card
       *
       * @public
       */
      async getInfos() {
        const header = new Headers();
        header.append("Authorization", ENV.API_PANDA_SPORT);
        let options = {
          method: "GET",
          headers: header,
          mode: "cors",
          cache: "default",
        };

        const datas = await fetch(`https://api.pandascore.co/lives?token=${ENV.API_PANDA_SPORT}`, options);
        const json = await datas.json();
        if (datas.ok) {
          this.infos = [];
          json.forEach((detail) => {
            if (detail.event.game == this.apiName) {
              this.infos.push(detail);
            }
          });
          this.isLoading = false;
          this.lastUpdate = Date.now();
          if (this.setTimer == "") {
            this.setTimer = setInterval(() => {
              this.getInfos();
            }, this.timer);
          }
        } else {
          console.log("Down");
        }
      },
    },
  };
</script>


<style>
  .CalendarTable {
    background-color: white;
  }
</style>