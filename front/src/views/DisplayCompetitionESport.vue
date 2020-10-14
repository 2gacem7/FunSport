<template>
  <div id="competitionEsport">
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
    this.datas = this.$route.params.datas
  },

  methods: {

  }
}
</script>
<style>
.content {
  padding-top: 70px;
  padding-left: 220px;
}
</style>

