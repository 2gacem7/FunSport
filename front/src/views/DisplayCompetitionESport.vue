<template>
  <div id="competitionEsport">
    <Navbar />
    <TabBar />
    <div class="card-deck m-2">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h3>Competition</h3>
          <button class="btn btn-primary btnCustom" @click="go">Back</button>
          </div>
        <div class="card-body">
          {{ datas.name }}<br />

          Begin at: {{ datas.begin_at | moment("MMMM Do YYYY, h:mm:ss") }}
          <br />
          End at: {{ datas.end_at | moment("MMMM Do YYYY, h:mm:ss") }} <br />
          Status: <span v-if="datas.prizepool != null">{{ datas.status }}</span
          ><span v-else> Unknown</span><br />
          Prizepool:
          <span v-if="datas.prizepool != null">{{ datas.prizepool }}</span
          ><span v-else>Unknown</span>
        </div>
      </div>

      <div class="card">
        <div class="card-header h3">League</div>
        <div class="card-body">
          <h4 v-if="datas.league">
            {{ datas.league.name }}
            <img
              :src="datas.league.image_url"
              alt="No image league"
              height="50"
              width="100"
            />
          </h4>
        </div>
      </div>
    </div>
    <div class="card m-4">
      <div class="card-header h3"><span v-if="!datas.teams">No team</span><span v-else >{{ datas.teams.length }} teams</span></div>
      <div class="card-body card-deck">
        <div
          class="card bg-light no-border text-center"
          v-for="team in datas.teams"
          :key="team.id"
        >
          {{ team.name }}
          <div class="text-center">
            <img
              :src="team.image_url"
              class="center-block"
              alt="No image team"
              height="50"
              width="100"
            />
          </div>
          Location: {{ team.location }}
        </div>
      </div>
    </div>
    <div class="card m-4">
      <div class="card-header h3">{{ datas.matches.length }} matches</div>
      <div class="card-deck m-2">
        <div
          class="card m-4 bg-light p-2"
          v-for="match in datas.matches"
          :key="match.id"
          style="min-width:10rem;max-width: 30rem"
        >
          <h4>{{ match.name }}</h4>
          <br />
          Begin at: {{ match.begin_at }} <br />
          Status : {{ match.status }} <br />
          Number of game : {{ match.number_of_games }}<br />
          <span
            >Winner : <span v-if="match.winner != null">{{ match.winner }}</span
            ><span v-else>Unknown</span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";

/**
 * View where you can find all details for a specific competition (only ESport)
 * @displayName CompetitionESport
 */
export default {
  name: "CompetitionESport",
  components: {
    Navbar,
    TabBar,
    AddMySport,
  },
  data() {
    return {
      /**
       * The id of the competition to display
       */
      competitionId: "",
      /**
       * The id used in the route of the API
       */
      apiName: "",
      /**
       * Collect the datas to display
       */
      datas: [],

      isLoading: true,
    };
  },
  /**
   * This hook is used to set datas using the router params
   * @public
   */
  beforeMount() {
    this.matchId = this.$route.params.matchId;
    this.apiName = this.$route.params.apiname;
    this.datas = this.$route.params.datas;
  },

  methods: {
    /**
     * This method is used to go back in terms of variable in $store.state.tabSelected
     * @public
     */
    go() {
      this.$router.push({ name: this.$store.state.tabSelected.name });
    },
  },
};
</script>
<style>
.content {
  padding-top: 70px;
  padding-left: 220px;
}

 #matchEsport .card-header {
    font-family: Arial, Helvetica, sans-serif;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
    color: #ffffff !important;
    border-bottom: 1px solid #9cfdf9;
    background: #278cff;
    background: linear-gradient(90deg, #9cabfd 0%, #1f06ff 25%, #273dff 100%);
  }
</style>

