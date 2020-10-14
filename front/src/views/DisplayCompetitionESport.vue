<template>
  <div id="matchEsport">
    <Navbar />
    <TabBar />
    <AddMySport />
    <button class="btn btn-primary" @click="$router.go(-1)">Back</button>
    <div class="card-deck m-0 p-0">
      {{ datas}}
    </div>
    {{ pronostics}}
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
  data() {
    return {
      competitionId:"",
      apiName:"",
      datas: [],
      pronostics:[],
      isLoading: true,
    }
  },
  mounted() {
    this.matchId = this.$route.params.matchId
    this.apiName = this.$route.params.apiname
    this.getDatas()
  },

  methods: {
    async getDatas() {
      const header = new Headers();
      header.append("Authorization", ENV.API_PANDA_SPORT);
      let options = {
        method: "GET",
        headers: header,
        mode: "cors",
        cache: "default",
      };
      const datas = await fetch(`https://api.pandascore.co/${this.apiName}/tournaments?sort=begin_at`, options);
    
      const json = await datas.json();
      if (datas.ok) {
        json.forEach(function(match){
          if (match.id === this.matchId){
            this.datas = match;
          }
        })
        this.isLoading = false;
      } else {
        console.log("Down");
      }
    },

  }
}
</script>
<style>
.content {
  padding-top: 70px;
  padding-left: 220px;
}
</style>

