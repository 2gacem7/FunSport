<template>
  <div id="matchEsport" class="text-dark">
    <Navbar />
    <TabBar />
    <AddMySport />
    <button class="btn btn-primary" @click="go">Back</button>

    <div class="card m-2 p-2">
      <span v-if="datas.league"> League: {{ datas.league.name}}
        <img
          :src="datas.league.image_url"
          alt="No image league"
          height="50"
          width="100"
        />
      </span>
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
        <div v-for="op in datas.opponents" :key="op.id">
          <div v-if="op.opponent.id != null && datas.winner != null && op.opponent.id == datas.winner.id">
            Winner: {{ op.opponent.name}}

          </div>
        </div>
      </div>
      <div v-if="datas.status=='finished'">
        Winner: {{ datas.winner.name}}
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

      <span class="" v-for="(opponent,index) in datas.opponents" :key="opponent.id">
        {{ opponent.opponent.name}}
        <img
          :src="opponent.opponent.image_url"
          alt="No image Team"
          height="50"
          width="100"
        />
        <span v-if="resultPronostic[index] && resultPronostic[index].count"> {{ Math.round(resultPronostic[index].count/totalPronostic * 100)}} %</span>
        <br><span v-if="index%2==0"> VS </span>

      </span>
      <span v-if="totalPronostic == 0"> No pronostic for this match</span><br>
    </div>

    <div class="card m-2">
      <h3>Commentaries</h3>
      <div v-if="commentaries.length == 0">
        No commentary available for this match
      </div>
      <div v-else>
        <div v-for="(commentary,index) in commentaries" :key="commentary.id">
          <div v-if="commentary.commentary != ''"> Commentary: Winner {{ commentary.winnerId }} / {{ commentary.commentary}}
          </div>
        </div>
      </div>
    </div>
    <div v-if="datas.status=='not_started'" class="card m-2">
      <h3>Do you want to pronostic this match?</h3>
      <select v-model="winnerInput" >
        <option disabled selected="selected">Select the winner </option>
        <option v-for="opponent in datas.opponents" :key="opponent.id">
          {{opponent.opponent.name}}
        </option>
      </select>
      <h3> your commentary (optional)</h3>
      <input v-model="commentaryInput"/>
      <button class="btn btn-primary m-2" @click="sendPronostic" >Send pronostic </button>
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
      winnerInput:"Select the winner",
      resultPronostic:[],
      totalPronostic:0,
      commentaries:[],
    }
  },
  mounted() {
    this.matchId = this.$route.params.matchId
    this.apiName = this.$route.params.apiname
    this.datas=this.$route.params.datas
    this.getPronostics()
  },

  methods: {
    go() {
      this.$router.push({name:this.$store.state.tabSelected.name});
    },
    getResumePronostic(){
      this.resultPronostic=[]
      this.resultPronostic.push({team:this.datas.opponents[0].opponent, count:0})
      this.resultPronostic.push({team:this.datas.opponents[1].opponent, count:0})
      const result = this.resultPronostic
      let totalPronostic = 0
      let commentaries= []
      this.pronostics.forEach(function(prono){
        for(let i=0; i < result.length; i++){
          if (result[i].team.name == prono.winnerId ){
            result[i].count =result[i].count+1
            totalPronostic ++
          }
        }
        if (prono.commentary !=""){
          commentaries.push(prono)
        }
      })
      this.commentaries = commentaries
      this.totalPronostic = totalPronostic

    },
    async sendPronostic(){
      if (this.winnerInput != 'Select the winner'){
        this.$store.commit('setAccessToken')

        const header = new Headers();
        header.append("Authorization", 'Bearer '+this.$store.state.access_token);
        header.append("Content-type", 'application/json');

        const body = new FormData()
        let options = {
          method: "POST",
          headers: header,
          body: JSON.stringify({
            matchId:this.matchId,
            commentary: this.commentaryInput,
            'winnerId': this.winnerInput,
            'type': this.apiName})
        }
        await fetch(`http://localhost:3000/pronostics`, options)
          .then(this.getPronostics())
      } else {
        alert('You have to select the winner before')
      }
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
      if (datas.ok) {
        this.pronostics = json;
        this.getResumePronostic()
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

</style>

