<template>
  <div id="matchEsport" class="text-dark">
    <Navbar />
    <TabBar />
    <button class="btn btn-primary" @click="go">Back</button>

    <div class="card m-2 p-2">
      <span v-if="datas.league">
        League: {{ datas.league.name }}
        <img
          :src="datas.league.image_url"
          alt="No image league"
          height="50"
          width="100"
        />
      </span>
      Begin at: {{ datas.begin_at | moment("MMMM Do YYYY, h:mm:ss") }} <br />
      Status: {{ datas.status }}<br />
      <div v-if="datas.status == 'canceled'">Forfeit: {{ datas.forfeit }}</div>
      <div class="text-center">
        <span
          class=""
          v-for="(opponent, index) in datas.opponents"
          :key="opponent.id"
        >
          {{ opponent.opponent.name }}
          <img
            :src="opponent.opponent.image_url"
            alt="No image Team"
            height="50"
            width="100"
          />
          <span v-if="index % 2 == 0"> VS </span>
        </span>
      </div>
      Number of game: {{ datas.number_of_games }}<br />
      <div
        class="card m-2 p-2"
        v-for="(game, index) in datas.games"
        :key="index"
      >
        Game n° {{ index + 1 }}<br />
        Begin at:<span v-if="game.begin_at == null"> Unknown </span>
        <span v-else>{{ game.begin_at | moment("MMMM Do YYYY, h:mm:ss") }}</span
        ><br />
        Status: {{ game.status }}
        <div v-for="op in datas.opponents" :key="op.id">
          <div
            v-if="
              op.opponent.id != null &&
              datas.winner != null &&
              op.opponent.id == datas.winner.id
            "
          >
            Winner: {{ op.opponent.name }}
          </div>
        </div>
      </div>
      <div v-if="datas.status == 'finished'">
        Winner: {{ datas.winner.name }}
        <img
          :src="datas.winner.image_url"
          alt="No image Team"
          height="50"
          width="100"
        />
      </div>
    </div>
    <div class="card m-2 text-center">
      <h3>Actual pronostic</h3>

      <span
        class=""
        v-for="(opponent, index) in datas.opponents"
        :key="opponent.id"
      >
        {{ opponent.opponent.name }}
        <img
          :src="opponent.opponent.image_url"
          alt="No image Team"
          height="50"
          width="100"
        />
        <span v-if="resultPronostic[index] && resultPronostic[index].count">
          {{
            Math.round((resultPronostic[index].count / totalPronostic) * 100)
          }}
          %</span
        >
        <span v-else>
          0 %</span>
        <br /><span v-if="index % 2 == 0"> VS </span>
      </span>
      <span v-if="totalPronostic == 0"> No pronostic for this match</span><br />
    </div>

    <div class="card m-2">
      <h3>Commentaries</h3>
      <div v-if="commentaries.length == 0">
        No commentary available for this match
      </div>
      <div v-else>
        <div class="card m-2" v-for="commentary in commentaries" :key="commentary.id">
          <div v-if="commentary.commentary != ''">
            <div class="card-header d-flex">
              <span>Post the {{ commentary.createdAt  | moment("MMMM Do YYYY, h:mm  ")}} by {{ commentary.authorName.firstName }}: Winner {{ commentary.winnerId }}</span>
                          <button v-if="!commentary.isReported" class="btn btn-primary mr-2 ml-auto" @click="reportCommentary(commentary._id)">Report this commentary</button>

            </div>
            <div class="card-body">
              <span v-if="commentary.isReported"> Commentary reported. Waiting the admin's moderation </span>
              <span v-else>  {{ commentary.commentary }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="$store.state.UserData.id != '' && datas.status == 'not_started'"
      class="card m-2"
    >
      <h3>Do you want to pronostic this match?</h3>
      <select v-model="winnerInput">
        <option disabled selected="selected">Select the winner</option>
        <option v-for="opponent in datas.opponents" :key="opponent.id">
          {{ opponent.opponent.name }}
        </option>
      </select>
      <h3>your commentary (optional)</h3>
      <input v-model="commentaryInput" />
      <button class="btn btn-primary m-2" @click="sendPronostic">
        Send pronostic
      </button>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";

/**
 * View where you can find all details for the match selected (only ESport)
 * @displayName MatchEsport
 */
export default {
  name: "MatchESport",
  components: {
    Navbar,
    TabBar,
    AddMySport,
  },
  data() {
    return {
      /**
       * The id used in the route of the API
       */
      apiName: "",
      /**
       * The matchId given i the route parameter
       */
      matchId: "",
      /**
       * Collect all the datas for the current match
       */
      datas: [],
      /**
       * Collect all pronostic for the current match
       */
      pronostics: [],
      isLoading: true,
      /**
       * Save the user's input in the field Commentary
       */
      commentaryInput: "",
      /**
       * Save the user's input in the select Winner
       */
      winnerInput: "Select the winner",
      /**
       * Array with the 2 teams and the count of pronostic for each team
       */
      resultPronostic: [],
      /**
       * Number of pronostic for this match
       */
      totalPronostic: 0,
      /**
       * Collect all commentaries for the current match to display them
       */
      commentaries: [],
    };
  },
  /**
   * This hook is used to set datas using the router params
   * @public
   */
  mounted() {
    this.matchId = this.$route.params.matchId;
    this.apiName = this.$route.params.apiname;
    this.datas = this.$route.params.datas;
    this.getPronostics();
  },

  methods: {
    async reportCommentary(commentaryId){
      this.$store.commit("setAccessToken");
      const header = new Headers();
        header.append(
          "Authorization",
          "Bearer " + this.$store.state.access_token
        );

        const body = new FormData();
        let options = {
          method: "GET",
          headers: header,
        };
      await fetch(`http://localhost:3000/pronostics/${commentaryId}/report`, options).then(()=>{
          this.getPronostics()
        });
    },
    /**
     * This method is used to go back in terms of variable in $store.state.tabSelected
     * @public
     */
    go() {
      this.$router.push({ name: this.$store.state.tabSelected.name });
    },

    /**
     * This method is used to display the current pronostic for this match
     * @public
     */
    getResumePronostic() {
      this.resultPronostic = [];
      this.resultPronostic.push({
        team: this.datas.opponents[0].opponent,
        count: 0,
      });
      this.resultPronostic.push({
        team: this.datas.opponents[1].opponent,
        count: 0,
      });
      const result = this.resultPronostic;
      let totalPronostic = 0;
      let commentaries = [];
      this.pronostics.forEach(function (prono) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].team.name == prono.winnerId) {
            result[i].count = result[i].count + 1;
            totalPronostic++;
          }
        }
        if (prono.commentary != "") {
          commentaries.push(prono);
        }
      });

      this.commentaries = commentaries;
      this.totalPronostic = totalPronostic;
    },

    /**
     * This method is used to send the pronostic in database
     * @public
     */
    async sendPronostic() {
      if (this.winnerInput != "Select the winner") {
        this.$store.commit("setAccessToken");

        const header = new Headers();
        header.append(
          "Authorization",
          "Bearer " + this.$store.state.access_token
        );
        header.append("Content-type", "application/json");

        const body = new FormData();
        let options = {
          method: "POST",
          headers: header,
          body: JSON.stringify({
            matchId: this.matchId,
            commentary: this.commentaryInput,
            winnerId: this.winnerInput,
            type: this.apiName,
            createdAt: new Date()
          }),
        };
        await fetch(`http://localhost:3000/pronostics`, options).then(()=>{
          this.getPronostics()
        });
      } else {
        alert("You have to select the winner before");
      }
    },

    /**
     * This method is used to catch the pronostic already in the database for this match
     * @public
     */
    async getPronostics() {
      this.$store.commit("setAccessToken");

      let options = {
        method: "GET",
      };
      const datas = await fetch(
        `http://localhost:3000/pronostics/${this.apiName}/${this.matchId}`,
        options
      );
      const json = await datas.json();
      if (datas.ok) {
        this.pronostics = json;
        this.getResumePronostic();
      } else {
        console.log("Down");
      }
    },
  },
};
</script>
<style d>
.content {
  padding-top: 70px;
  padding-left: 220px;
}
</style>

