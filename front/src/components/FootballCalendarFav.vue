<template>
  <div class="card m-3 bg-light" style="max-height: 30rem; max-width: 30rem">
    <div class="card-header d-flex justify-content-between">
      <h3 v-if="infos[0]" class="text-center m-3">
        {{ infos[0].league_name }}'s Calendar
      </h3>
    </div>
    <div class="card-body m-0 p-0 overflow-auto text-dark">
      <div v-for="item in infos" :key="item.id">
        <p class="text-center font-weight-bold">{{ item.match_round }}</p>
        <p class="text-center">
          <router-link v-bind:to="'/football/' + item.match_id">
            <button class="btn btn-success justify-content-center btnADD">
              Pronostics
            </button>
          </router-link>
        </p>
        <div class="row d-flex justify-content-center m-0">
          <div>
            <p class="font-weight-bold text-center">
              {{ item.match_hometeam_name }}
            </p>
            <p :src="return_Score(item)" class="font-weight-bold text-center">
              <img :src="return_Link_Home(item)" alt="no team badge home" style="max-width: 4rem" />
              {{ item.match_hometeam_score }}
            </p>
          </div>

          <div class="ml-5">
            <p class="font-weight-bold text-center">
              {{ item.match_awayteam_name }}
            </p>
            <p class="font-weight-bold text-center">
              {{ item.match_awayteam_score }}
              <img :src="return_Link_Away(item)" alt="no team badge home" style="max-width: 4rem" />
            </p>
          </div>
        </div>
        <p class="text-center mt-3 mb-5">
          {{ item.match_date}}at
          {{ item.match_time }}
        </p>
      </div>
    </div>
    <button class="btn btn-danger p-1" style="width: 100%" @click="delToMyFavorites()">
      Unfav
    </button>
  </div>
</template>


<script>
  import ENV from "../../env.config";
  /**
   * Component card for display one league's calendar on dashboard
   * @displayName FootballCalendarFav
   */
  export default {
    name: "FootballCalendarFav",
    data() {
      return {
        infos: [],
      };
    },
    props: {
      /**
       * The id tournament of one league
       */
      id_tournament: String,
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
          "https://apiv2.apifootball.com/?action=get_events&from=2020-08-01&to=2021-06-30&league_id=" +
          this.id_tournament +
          "&APIkey=" +
          ENV.API_FOOTBALL,
          requestOptions
        )
        .then((response) => response.json())
        .then((result) => (this.infos = result))
    },

    methods: {
      /**
       * remove this team from my favorite
       *
       * @public
       */
      delToMyFavorites() {
        this.$emit("delfavorite", this.id);
      },
      /**
       * Return link to img for display badge home team in card
       *
       * @public
       */
      return_Link_Home(item) {
        return item.team_home_badge;
      },
      /**
       * Return link to img for display badge away team in card
       *
       * @public
       */
      return_Link_Away(item) {
        return item.team_away_badge;
      },
      /**
       * Format score for better UX
       *
       * @public
       */
      return_Score(item) {
        if (item.match_hometeam_score == "") {
          item.match_hometeam_score = "-";
        }

        if (item.match_awayteam_score == "") {
          item.match_awayteam_score = "-";
        }
      },
    },
  };
</script>

<style>

    .btnADD {
        background: #2cf956;
        background-image: -webkit-linear-gradient(top, #2cf956, #06d530);
        background-image: -moz-linear-gradient(top, #2cf956, #06d530);
        background-image: -ms-linear-gradient(top, #2cf956, #06d530);
        background-image: -o-linear-gradient(top, #2cf956, #06d530);
        background-image: -webkit-gradient(to bottom, #2cf956, #06d530);
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        color: #000000;
        font-family: Verdana;
        font-size: 11px;
        padding: 11px;
        -webkit-box-shadow: 1px 1px 20px 0 #24c691;
        -moz-box-shadow: 1px 1px 20px 0 #24c691;
        box-shadow: 1px 1px 20px 0 #24c691;
        text-shadow: 1px 1px 20px #ffffff;
        border: solid #ffffff 1px;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
        text-align: center;
    }


</style>