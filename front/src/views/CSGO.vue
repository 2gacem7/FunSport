<template>
  <div class="home">
    <Navbar />
    <TabBar/>
    <AddMySport />
    <div class="card-deck">

    <Listcsgo />
    <CalendarCsgo />
    <LastResultsCsgo />
    <Live sport="CS-GO" apiName="cs-go"/>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/NavBar.vue";
  import TabBar from "@/components/TabBar.vue";
  import Listcsgo from "@/components/Listcsgo.vue";
  import CalendarCsgo from "@/components/CalendarCsgo.vue";
  import AddMySport from "@/components/AddMySport.vue";
  import ENV from "../../env.config";
  import Live from "@/components/Live.vue"
  import LastResultsCsgo from "@/components/LastResultsCsgo.vue";


  export default {
    name: "CSGO",
    components: {
      Navbar,
      TabBar,
      AddMySport,
      CalendarCsgo,
      Live,
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
    font-family: "counter-strike";
    color: white;
  }
  .card-deck{
    font-family: "counter-strike";
  }
</style>