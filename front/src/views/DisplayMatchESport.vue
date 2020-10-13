<template>
  <div id="matchEsport">
    <Navbar />
    <TabBar />
    <AddMySport />
    <button class="btn btn-primary" @click="$router.go(-1)">Back</button>
    <div class="card-deck m-0 p-0">
      {{ datas}}
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
    matchId: string,
    apiName:string,
  },
  data() {
    return {
        datas: [],
        isLoading: true,
    }
  },
  mounted() {
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


        const datas = await fetch(`https://api.pandascore.co/${this.apiName}/matches/${this.matchId}`, options);
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

body {
  background-color: rgb(29, 28, 28);
  color: white;
}

.update {
  font-size: 0.75rem !important;
}

h4 {
  font-family: "counter-strike";
  color: white;
}
.card-deck{
  font-family: "counter-strike";
}
</style>

