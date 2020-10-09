<template>
  <div class="home">
    <Navbar />
    <TabBar />
    <AddMySport />
    <div class="card-deck m-0 p-0">
      <Listcsgo sport="LOL" apiName="lol" />

      <LastResults sport="LOL" apiName="lol" />
      <CalendarCsgo sport="LOL" apiName="lol" />

      <Live sport="LOL" apiName="lol" :delButton="false" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";
import ENV from "../../env.config";
import Live from "@/components/Live.vue";
import LastResults from "@/components/LastResults.vue";
import Listcsgo from "@/components/Listcsgo.vue";
  import CalendarCsgo from "@/components/CalendarCsgo.vue";


export default {
  name: "Lol",
  components: {
    Navbar,
    TabBar,
    AddMySport,
    Live,
    LastResults,
          CalendarCsgo,

    Listcsgo,
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