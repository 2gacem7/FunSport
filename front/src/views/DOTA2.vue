<template>
  <div id="dota2">
    <Navbar />
    <TabBar />
    <AddMySport />
    <div class="card-deck m-0 p-0">
      <DisplayListTeam sport="DOTA-2" apiName="dota2" />
      <DisplayCalendar sport="DOTA-2" apiName="dota2"/>
      <DisplayLastResults sport="DOTA-2" apiName="dota2" />
      <DisplayLive sport="DOTA-2" apiName="dota2" :delButton="false" />
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


export default {
  name: "DOTA2",
  components: {
    Navbar,
    TabBar,
    AddMySport,
    DisplayCalendar,
    DisplayLive,
    DisplayListTeam,
    DisplayLastResults
  },
  data() {
    return {};
  },
  mounted() {},

  methods: {

  }
}
</script>
<style scoped>
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
</style>

