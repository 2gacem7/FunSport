<template>
  <div id="Dashboard">
    <Navbar />
    <TabBar />
    <div class="card m-3" style="background-color: #f4f4f4e3">
      <div class="card-header">
        <h1 class="text text-center">My Favorite Sports</h1>
      </div>
      <div class="card-body">
        <div
          v-if="mySports.length == 0"
          class="row mt-2 justify-content-center"
        >
          <label class="card-text text-center">No favorite sports added</label>
        </div>
        <div v-else>
          <div
            v-for="sport in mySports"
            v-bind:key="sport.name"
            class="row mt-2 p-3 justify-content-center"
          >
            <h3 class="card-text text-center">{{ sport.name }}</h3>
            <button
              class="btn btn-danger btn-sm rounded-circle ml-5 mb-2"
              @click="deleteSport(sport._id)"
            >
              Del
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="card m-3" style="background-color: #f4f4f4e3">
      <div class="card-header">
        <h1 class="text text-center">My Favorites</h1>
      </div>
      <div class="card-body card-deck m-0">
        <div v-for="favorite in myFavorites" :key="favorite.id">
          <Live
            v-if="
              favorite.data[0].type == 'component' &&
              favorite.data[0].name == 'live'
            "
            :id="favorite._id"
            :sport="favorite.data[0].sport"
            :apiName="favorite.data[0].apiName"
            :delButton="true"
            v-on:delfavorite="delToMyFavorites"
          />

          <LastResultsCsgo
            v-if="
              favorite.data[0].type == 'component' &&
              favorite.data[0].name == 'lastResult' &&
              favorite.data[0].sport == 'CS-GO'
            "
            :id="favorite._id"
            v-on:delfavorite="delToMyFavorites"
          />
          <CalendarCsgo
            v-if="
              favorite.data[0].type == 'component' &&
              favorite.data[0].name == 'calendar' &&
              favorite.data[0].sport == 'CS-GO'
            "
            :id="favorite._id"
            v-on:delfavorite="delToMyFavorites"
          />
          <Listcsgo
            v-if="
              favorite.data[0].type == 'component' &&
              favorite.data[0].name == 'listTeam' &&
              favorite.data[0].sport == 'CS-GO'
            "
            :id="favorite._id"
            v-on:delfavorite="delToMyFavorites"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";

import Live from "@/components/Live.vue";
import LastResultsCsgo from "@/components/LastResultsCsgo.vue";
import CalendarCsgo from "@/components/CalendarCsgo.vue";
import Listcsgo from "@/components/Listcsgo.vue";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    TabBar,
    Live,
    LastResultsCsgo,
    CalendarCsgo,
    Listcsgo,
  },
  data() {
    return {
      access_token: "",
    };
  },
  async mounted() {
    if (this.$store.state.UserData.id == "") {
      this.$router.push({
        path: "/login",
      });
    }
    this.$store.dispatch("getMySports");
    this.$store.dispatch("getMyFavorites");
  },
  computed: {
    mySports: function () {
      return this.$store.state.MySports;
    },
    myFavorites: function () {
      return this.$store.state.MyFavorites;
    },
  },
  methods: {
    async deleteSport(id) {
      const body = {
        id: id,
      };
      let mySports = [];
      await fetch("http://localhost:3000/mysports", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + this.$store.state.access_token,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.clone().json())
        .then((json) => (mySports = json));
      this.$store.dispatch("getMySports");
    },
    async delToMyFavorites(id) {
      this.$store.commit("setAccessToken");
      console.log("delFavorites do nothing", id);
      if (this.$store.state.access_token != '') {
        await fetch("http://localhost:3000/myfavorites", {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + this.$store.state.access_token
          },
          mode:'cors',
          body: JSON.stringify({sportFavoriteId:id}),
        })
        .then(this.$store.dispatch('getMyFavorites'));
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

.card-body {
  background-color: rgb(72, 99, 255);
  font-family: "Roboto Mono", monospace;
}

.card-header {
  background-color: rgba(72, 99, 255, 0.515);
  font-family: "Roboto Mono", monospace;
}
</style>