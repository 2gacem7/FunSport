<template>
  <div id="matchEsport" class="text-dark">
    <Navbar />
    <TabBar />
    <AddMySport />
    <button class="btn btn-primary" @click="go">Back</button>

    <div v-if="isLoading">Loading</div>
    <div v-else class="card m-2 p-2">
      {{ datas}}
      League: {{ datas.league.name}}
      <img
        :src="datas.league.image_url"
        alt="No image league"
        height="50"
        width="100"
      />
      Begin at: <br>
      Status: {{ datas.status}}<br>
      <div v-if="datas.status=='canceled'">Forfeit: {{datas.forfeit}}</div>
      <div class="text-center">
        <span class="" v-for="(opponent,index) in datas.opponents" :key="opponent.id">
          {{ opponent.opponent.name}}
          <img
            :src="opponent.opponent.image_url"
            alt="No image Team"
            height="50"
            width="100"
          />
          <span v-if="index%2==0"> VS </span>

        </span>
      </div>
      Number of game: {{ datas.number_of_games}}<br>
      <div class="card m-2 p-2" v-for="(game,index) in datas.games" :key=index>
        Game n° {{index+1}}<br>
        Begin at: {{game.begin_at}}<br>
        Status: {{ game.status}}
        Winner: {{ game.winner}}

      </div>
    </div>
    <div class="card m-2">
      <div v-if="pronostics.length == 0">
        No pronostic available for this match
      </div>
      <div v-else>
        {{ pronostics}}
      </div>
    </div>
    <div v-if="datas.status=='not_start'" class="card m-2">
      <h3>Do you want to pronostic this match?</h3>
      <select v-model="selectInput" >
        <option v-for="opponent in datas.opponents" :key="opponent.id">
          {{opponent.opponent.name}}
        </option>
      </select>
      <h3> your commentary (optional)</h3>
      <input v-model="commentaryInput"/>
      <button class="btn btn-primary m-2 card-footer " @click="sendPronostic" >Send pronostic </button>
    </div>

  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";



export default {
  name: "MatchESport",
  components: {
    Navbar,
    TabBar,
    AddMySport,
  },
  props:{
  },
  data() {
    return {
      apiName:"",
      matchId:"",
      datas: [],
      pronostics:[],
      isLoading: true,
      commentaryInput:"",
      selectInput:"",
    }
  },
  mounted() {
    this.matchId = this.$route.params.matchId
    this.apiName = this.$route.params.apiname
    this.getDatas()
    this.getPronostics()
  },

  methods: {
    go() {
      this.$router.push({name:this.$store.state.tabSelected.name});
    },
    sendPronostic(){
      console.log('Send pronostic')
    },
    async getPronostics() {
      this.$store.commit('setAccessToken')

      const header = new Headers();
      header.append("Authorization", 'Bearer '+this.$store.state.access_token);
      let options = {
        method: "GET",
        headers: header,
        /* mode: "cors", */
        /* cache: "default", */
      };
      const datas = await fetch(`http://localhost:3000/pronostics/${this.matchId}`, options);
      const json = await datas.json();
      console.log(datas)
      if (datas.ok) {
        this.pronostics = json;
      } else {
        console.log("Down");
      }
    },
    async getDatas() {
      const header = new Headers();
      header.append("Authorization", ENV.API_PANDA_SPORT);
      let options = {
        method: "GET",
        headers: header,
        mode: "cors",
        cache: "default",
      };
      const datas = await fetch(`https://api.pandascore.co/${this.apiName}/matches`, options);
      const json = await datas.json();
      if (datas.ok) {

        json.forEach((match)=>{
          if (match.id == this.matchId){
            console.log(match)
            this.datas = match;
            this.isLoading = false;
          }

        })
      } else {
        console.log("Down");
      }
    },

  }
}
</script>
<style d>
.content {
  padding-top: 70px;
  padding-left: 220px;
}

body {
  background-color: rgb(29, 28, 28);
  color: black;
}

.update {
  font-size: 0.75rem !important;
}

h4 {
  font-family: "counter-strike";
  color: black;
}
.card-deck{
  font-family: "counter-strike";
}
</style>

