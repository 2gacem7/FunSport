<template>
  <div class="card bg-light" style="max-height: 30rem; min-width: 20rem; max-width: 20rem">
      <div class="card-header justify-content-between">
        {{ isInMyFavorite}}
        <button v-if="!isInMyFavorite"
          class="btn btn-success font-weight-bold mb-2"
          @click="addToMyFavorites"
        >
          + favori
        </button>
        <h3 class="text-dark text-center">{{ sport }} En live</h3>
      </div>

      <div class="card-body">
        <div v-if="isLoading" class="text-dark text-center">
      Chargement en cours
    </div>
        <div class="text-dark text-center font-weight-bold" v-else-if="infos.length == 0">No live available</div>

        <div
          v-else
          class="card text-dark"
          v-for="oneMatch in infos"
          :key="oneMatch.id"
           style="max-height: 32rem"
        >
          <div class="card-header">
            Begin at : {{ oneMatch.match.begin_at }}
          </div>
          <div class="card-body">
            <div>ChampionShip : {{ oneMatch.match.league.slug }}</div>
            <img
              :src="oneMatch.match.league.image_url"
              alt="Image League"
              width="100"
            />
            <div>Status : {{ oneMatch.match.status }}</div>
            <div>Match :</div>
            <div class="row">
              <span
                class="col-6 text-center"
                v-for="team in oneMatch.match.opponents"
                :key="team.id"
              >
                {{ team.opponent.name }}
                <img
                  :src="team.opponent.image_url"
                  alt="Image Team"
                  height="100"
                />
              </span>
            </div>
            <div class="row">
              <span
                class="col-6 text-center"
                v-for="result in oneMatch.match.results"
                :key="result.id"
              >
                {{ result.score }}
              </span>
            </div>
          </div>
          <div class="card-footer">
            <a
              class="btn btn-secondary"
              :href="oneMatch.match.official_stream_url"
              >View in direct
            </a>
          </div>
        </div>
      </div>
      <div class="card-footer text-dark">
        Last update {{ lastUpdate | moment("MMMM Do YYYY, h:mm:ss")}}
        <button class="btn btn-danger" @click="getInfos">Refresh</button>
      </div>
    </div>
  </div>
</template>


<script>
import ENV from "../../env.config";
export default {
  name: "Live",
  data() {
    return {
      infos: [],
      isLoading: true,
      lastUpdate: "",
      timer: 10000, // timer to refresh the live data
      setTimer: "", // save the timer interval
    };
  },
  props: {
    sport: String, // String display in the header
    apiName: String, // String used to search info for 1 sport in getInfos
  },
  mounted(){
    this.getInfos()
  },
  computed:{
    isInMyFavorite:function(){
      for(let favorite in this.$store.state.MyFavorites){
        if (favorite.sport == this.sport && favorite.type == 'component' && favorite.name==this.apiName){
          return true
        }
      }
      return false
    }
  },
  methods: {
    delToMyFavorites() {
      clearInterval(this.setTimer);
    },
    addToMyFavorites() {
      this.$store.dispatch("addToMyFavorites", {
        id: this.$store.state.tabSelected.id,
        data: { sport: "CSGO", type: "component", name: "live" },
      });
    },
    async getInfos() {
      const header = new Headers();
      header.append("Authorization", ENV.API_PANDA_SPORT);
      let options = {
        method: "GET",
        headers: header,
        mode: "cors",
        cache: "default",
      };

      const datas = await fetch("https://api.pandascore.co/lives", options);
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
        if (this.setTimer == ""){
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
  color: black;
}
</style>
