<template>
  <div id="matchEsport">
    <Navbar />
    <TabBar />
    <AddMySport />
    <div class="card-deck m-0 p-0">
      <DisplayListTeam sport="CS-GO" apiName="csgo" />
      <DisplayCalendar sport="CS-GO" apiName="csgo"/>
      <DisplayLastResults sport="CS-GO" apiName="csgo" />
      <DisplayLive sport="CS-GO" apiName="cs-go" :delButton="false" />
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
    sportId:string,
  },
  data() {
    return {};
  },
  mounted() {},

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

        const datas = await fetch("https://api.pandascore.co/lives", options);
        const json = await datas.json();
        if (datas.ok) {
          this.infos = [];
          json.forEach((detail) => {
            if (detail.event.game == this.apiName) {
              this.infos.push(detail);
            }
          });
          this.isLoading = false;
          this.lastUpdate = Date.now();
          if (this.setTimer == "") {
            this.setTimer = setInterval(() => {
              this.getInfos();
            }, this.timer);
          }
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

