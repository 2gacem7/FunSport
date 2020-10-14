<template>
  <div class="card bg-light m-3">
    <div v-if="isLoading" class="text-dark text-center"> Chargement en cours </div>
    <div v-else>
      <div class="text-dark" v-if="infos.length == 0">No live available </div>
      <div class="card-header row justify-content-between ">
        <span class="col-2 text-dark ">En Live</span>
        <button class="col-2 btn btn-success " @click="addToMyFavorites">Add to my favorite component</button>
      </div>

      <div class="card-body card-deck">

        <div class="card text-dark" v-for="oneMatch in infos" :key="oneMatch.id" style="max-width:30rem;">

          <div class="card-header">Begin at : {{ oneMatch.match.begin_at}}</div>
          <div class="card-body">
            <div>ChampionShip : {{oneMatch.match.league.slug}} </div>
            <img :src="oneMatch.match.league.image_url" alt="Image League" width="100" />
            <div>Status : {{ oneMatch.match.status}}</div>
            <div >Match : </div>
            <div class="row">
              <span class="col-6 text-center" v-for="team in oneMatch.match.opponents" :key="team.id">
                {{ team.opponent.name}}
                <img :src="team.opponent.image_url" alt="Image Team" height="100" />

              </span>
            </div>
            <div class="row">
              <span class="col-6 text-center" v-for="result in oneMatch.match.results" :key="result.id">
                {{ result.score }}
              </span>
            </div>
          </div>
          <div class="card-footer">
              <a class="btn btn-secondary" :href="oneMatch.match.official_stream_url">View in direct </a>
          </div>
        </div>
      </div>
      <div class="card-footer text-dark">Last update {{ lastUpdate }}
        <button class="btn btn-danger" @click="getInfos">Refresh</button>
      </div>
    </div>
  </div>
</template>


<script>
  import ENV from "../../env.config"
  export default {
    name: "LiveCSGO",
    data(){
      return{
        infos:[],
        isLoading:true,
        lastUpdate:""
      }
    },

    beforeMount() {
      this.getInfos();
    },

    methods: {
      addToMyFavorites(){
        this.$store.dispatch('addToMyFavorites',{id:this.$store.state.tabSelected.id,data:{sport:"CSGO", type:"component", name:"live"}})
      },
      async getInfos() {
        const header = new Headers()
        header.append("Authorization",ENV.API_PANDA_SPORT)
        let options= { method: 'GET',
          headers: header,
          mode: 'cors',
          cache: 'default' };

        const datas = await fetch("https://api.pandascore.co/lives", options)

        const json = await datas.json()
        if (datas.ok){
          this.infos=[]
          json.forEach (detail => {
            if (detail.event.game == "cs-go"){
              this.infos.push(detail)
            }
          } )
          this.isLoading = false
          this.lastUpdate= Date.now()
          console.log(this.infos)
        } else {
          console.log("Down")
        }

      },
    }
  }
</script>


<style>
.CalendarTable {
  background-color: white;
  color: black;
}
                
