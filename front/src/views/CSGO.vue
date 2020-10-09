<template>
  <div class="home">
    <Navbar />
    <TabBar/>
    <AddMySport />
    <div class="container-fluid row">
      <div class="ml-5 mt-5 card overflow-auto" style="min-width: 30rem; max-width: 35rem; max-height: 40rem"><CalendarCsgo /></div>
      <div class=" mt-5 ml-5 card overflow-auto" style="min-width: 30rem; max-width: 35rem; max-height: 40rem"><LastResultsCsgo /></div>
    </div>

    <b-card class=" container-fluid listcsgo bg-dark" style="max-width:30rem">
      <h4>CSGO Team's </h4>
      <Listcsgo />
    </b-card>

    CSGO
    <LiveCSGO />
  </div>
</template>

<script>
  import Navbar from "@/components/NavBar.vue";
  import TabBar from "@/components/TabBar.vue";
  import Listcsgo from "@/components/Listcsgo.vue";
  import CalendarCsgo from "@/components/CalendarCsgo.vue";
  import AddMySport from "@/components/AddMySport.vue";
  import ENV from "../../env.config";
  import LiveCSGO from "@/components/LiveCSGO.vue"
  import LastResultsCsgo from "@/components/LastResultsCsgo.vue";


  export default {
    name: "CSGO",
    components: {
      Navbar,
      TabBar,
      AddMySport,
      CalendarCsgo,
      LiveCSGO,
      Listcsgo,
      LastResultsCsgo
    },
    data() {
      return {};
    },
    mounted() {},

    methods: {

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
    font-family: counter-strike;
    color: white;
  }
</style>