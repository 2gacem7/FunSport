<template>
  <div id="lol">
    <Navbar />
    <TabBar />
    <AddMySport />
    <div class="card-deck m-0 p-0">
      <DisplayListTeam sport="LOL" apiName="lol" />
      <DisplayCalendar sport="LOL" apiName="lol" />
      <DisplayLastResults sport="LOL" apiName="lol" />
      <DisplayLive sport="LOL" apiName="lol" :delButton="false" />
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";

import DisplayLive from "@/components/DisplayLive.vue";
import DisplayLastResults from "@/components/DisplayLastResults.vue";
import DisplayListTeam from "@/components/DisplayListTeam.vue";
import DisplayCalendar from "@/components/DisplayCalendar.vue";


export default {
  name: "Lol",
  components: {
    Navbar,
    TabBar,
    AddMySport,
    DisplayLive,
    DisplayLastResults,
    DisplayCalendar,
    DisplayListTeam,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getCookie() {
      let access_token = "";
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(";");
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
            const cookiename = "My_FunSport_Token=";
            access_token = cookieArray[i].substring(
              cookiename.length,
              cookieArray[i].length
            );
          }
        }
      }
      return access_token;
    },
  },
};
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
</style>
