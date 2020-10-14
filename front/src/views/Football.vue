<template>
  <div id="football">
    <Navbar />
    <TabBar />
    <AddMySport />
    <div class="card-deck m-0 p-0">
      <FootballRanking />
      <FootballCalendar />
      
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";

import FootballRanking from "@/components/FootballRanking.vue";
import FootballCalendar from "@/components/FootballCalendar.vue";


export default {
  name: "Football",
  components: {
    Navbar,
    TabBar,
    AddMySport,
    FootballRanking,
    FootballCalendar
  },
  data() {
    return {};
  },
  mounted() {},

  methods: {

  }
}
</script>