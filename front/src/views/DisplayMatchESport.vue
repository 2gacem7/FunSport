<template>
  <div id="matchEsport" class="text-dark">
    <Navbar />
    <TabBar />
    <div class="card m-2">
      <div class="card-header d-flex justify-content-between">
        <h2 >{{datas.name}}</h2>
        <button class="btn btn-primary btnCustom" @click="go">Back</button>
      </div>
      <h4 class="m-2">Begin at: {{ datas.begin_at | moment("MMMM Do YYYY, h:mm:ss") }}</h4>
      <h5 class="m-2">Status: {{ datas.status }}</h5>
      <div v-if="datas.status == 'canceled'">Forfeit: {{ datas.forfeit }}</div>
      <div class="text-center m-2">
        <span  v-for="(opponent, index) in datas.opponents" :key="opponent.id">
          <img :src="opponent.opponent.image_url" alt="No image Team" height="50" width="100" />
          <span v-if="index % 2 == 0" class="m-4"> VS </span>
        </span>
      </div>
      <h5 class="m-2">Number of game: {{ datas.number_of_games }}</h5>
      <div class="card m-2 p-2" v-for="(game, index) in datas.games" :key="index">
        Game n° {{ index + 1 }}<br />
        Begin at:<span v-if="game.begin_at == null"> Unknown </span>
        <span v-else>{{ game.begin_at | moment("MMMM Do YYYY, h:mm:ss") }}</span><br />
        Status: {{ game.status }}
        <div v-for="op in datas.opponents" :key="op.id">
          <div v-if="
              op.opponent.id != null &&
              datas.winner != null &&
              op.opponent.id == datas.winner.id
            ">
            Winner: {{ op.opponent.name }}
          </div>
        </div>
      </div>
      <div v-if="datas.status == 'finished'">
        Winner: {{ datas.winner.name }}
        <img :src="datas.winner.image_url" alt="No image Team" height="50" width="100" />
      </div>
    </div>
    <div class="card m-2 text-center">
      <h2 class="m-3">Actual pronostic</h2>

      <span class="m-3" v-for="(opponent, index) in datas.opponents" :key="opponent.id">
        <h3>{{ opponent.opponent.name }} <span v-if="resultPronostic[index] && resultPronostic[index].count">
            {{
            Math.round((resultPronostic[index].count / totalPronostic) * 100)
          }}
            %</span>
          <span v-else>
            0 %</span></h3>

        <br /><h1 v-if="index % 2 == 0"> VS </h1>
      </span>
      <span v-if="totalPronostic == 0"> No pronostic for this match</span><br />
    </div>

    <div class="card m-2">
      <h3 class="m-3">Commentaries</h3>
      <div class="m-3" v-if="commentaries.length == 0">
        No commentary available for this match
      </div>
      <div v-else>
        <div class="card m-2" v-for="commentary in commentaries" :key="commentary.id">
          <div v-if="commentary.commentary != ''">
            <div class="card-header d-flex">
              <span>Post the {{ commentary.createdAt  | moment("MMMM Do YYYY, h:mm  ")}} by
                {{ commentary.authorName.firstName }}: Winner {{ commentary.winnerId }}</span>
              <button v-if="!commentary.isReported" class="btn btn-primary m-5 report"
                @click="reportCommentary(commentary._id)">Report this commentary</button>

            </div>
            <div class="card-body">
              <span class="m-3" v-if="commentary.isReported"> Commentary reported. Waiting the admin's moderation </span>
              <span class="m-3" v-else> {{ commentary.commentary }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$store.state.UserData.id != '' && datas.status == 'not_started'" class="card m-2">
      <h3 class="m-3">Do you want to pronostic this match?</h3>
      <select class="m-3" v-model="winnerInput">
        <option disabled selected="selected">Select the winner</option>
        <option v-for="opponent in datas.opponents" :key="opponent.id">
          {{ opponent.opponent.name }}
        </option>
      </select>
      <h3 class="m-3">Your commentary (optional)</h3>
      <input class="m-3" v-model="commentaryInput" />
      <button  class="btn btn-primary m-2 btnCustom" @click="sendPronostic">
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
      /**
       * This method is used to report a specific commentary
       * @param commentaryId
       * @public
       */
      async reportCommentary(commentaryId) {
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
        await fetch(`http://${ENV.API_BACKEND}/pronostics/${commentaryId}/report`, options).then(() => {
          this.getPronostics()
        });
      },
      /**
       * This method is used to go back in terms of variable in $store.state.tabSelected
       * @public
       */
      go() {
        this.$router.push({
          name: this.$store.state.tabSelected.name
        });
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
          await fetch(`http://${ENV.API_BACKEND}/pronostics`, options).then(() => {
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
          `http://${ENV.API_BACKEND}/pronostics/${this.apiName}/${this.matchId}`,
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
<style >
  .content {
    padding-top: 70px;
    padding-left: 220px;
  }



  #competitionEsport .card-header {
    font-family: Arial, Helvetica, sans-serif;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
    color: #ffffff !important;
    border-bottom: 1px solid #9cfdf9;
    background: #278cff;
    background: linear-gradient(90deg, #9cabfd 0%, #1f06ff 25%, #273dff 100%);
  }

  .btnCustom {
    background: linear-gradient(to bottom, #67fdf6 5%, #3665ff 100%);
    background-color: #3665ff;
    border-radius: 34px;
    border: 1px solid #67fdf6;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 2px 0px #041312;
  }

  .btnCustom:hover {
    background: linear-gradient(to bottom, #3665ff 5%, #17fff3 100%);
    background-color: #3665ff;
    border: 1px solid #67fdf6;
  }

  .report {
    background: linear-gradient(to bottom, #fa0e0e 5%, #f85e16 100%);
    background-color: #f8e916;
    border-radius: 34px;
    border: 1px solid #fa0e0e;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 2px 0px #041312;
  }

  .report:hover {
    background: linear-gradient(to bottom, #f8e916 5%, #fa0e0e 100%);
    background-color: #f8e916;
    border: 1px solid #fa0e0e;
  }

  span {
    font-size: larger;
  }
</style>