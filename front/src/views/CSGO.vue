<template>
  <div id="csgo">
    <Navbar />
    <TabBar />
    <AddMySport />
    <div class="card-deck m-0 p-0">
      <DisplayListTeam sport="CS-GO" apiName="csgo" />
      <DisplayCalendar sport="CS-GO" apiName="csgo"/>
      <DisplayLastResults sport="CS-GO" apiName="csgo" />
      <DisplayLive sport="CS-GO" apiName="cs-go" :delButton="false" />
      <DisplayRanking sport="CS-GO" apiName="csgo" />
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";

import DisplayListTeam from "@/components/DisplayListTeam.vue";
import DisplayCalendar from "@/components/DisplayCalendar.vue";
import DisplayLive from "@/components/DisplayLive.vue"
import DisplayLastResults from "@/components/DisplayLastResults.vue";
import DisplayRanking from "@/components/DisplayRanking.vue";


export default {
  name: "CSGO",
  components: {
    Navbar,
    TabBar,
    AddMySport,
    DisplayCalendar,
    DisplayLive,
    DisplayListTeam,
    DisplayLastResults,
    DisplayRanking
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
