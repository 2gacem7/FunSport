<template>
  <div>
    <ul class="nav nav-tabs align-items-center bg-light">
      <li class="nav-item">
        <a
          v-if="$store.state.tabSelected.name == 'News'"
          class="nav-link active"
          @click="goToNews"
        >
          News</a
        >
        <a v-else class="nav-link" @click="goToNews"> News</a>
      </li>
      <li v-for="sport in $store.state.sports" :key="sport.id" class="nav-item">
        <a
          v-if="sport.name == $store.state.tabSelected.name"
          class="nav-link active"
          @click="go(sport._id, sport.name)"
          >{{ sport.name }}</a
        >
        <a
          v-else
          class="nav-link"
          href="#"
          @click="go(sport._id, sport.name)"
          >{{ sport.name }}</a
        >
      </li>
      <li v-show="$store.state.UserData.id != ''" class="nav-item">
        <a
          v-if="$store.state.tabSelected.name == 'Dashboard'"
          class="nav-link active"
          @click="goMyDashboard"
          >My dashboard</a
        >
        <a v-else class="nav-link" href="#" @click="goMyDashboard"
          >My dashboard</a
        >
      </li>
      <li v-show="$store.state.UserData.id != ''" class="nav-item">
        <a
          v-if="$store.state.tabSelected.name == 'MyProfile'"
          class="nav-link active"
          @click="goMyProfile"
          >My profile</a
        >
        <a v-else class="nav-link" href="#" @click="goMyProfile">My profile</a>
      </li>
      <li v-show="$store.state.UserData.isAdmin === true" class="nav-item">
        <a
          v-if="$store.state.tabSelected.name == 'ManageUsers'"
          class="nav-link active"
          @click="goManageUsers"
          >Manage Users</a
        >
        <a v-else class="nav-link" href="#" @click="goManageUsers"
          >Manage Users</a
        >
      </li>
      <li v-show="$store.state.UserData.isAdmin === true" class="nav-item">
        <a
          v-if="$store.state.tabSelected.name == 'ManageNews'"
          class="nav-link active"
          @click="goManageNews"
          >Manage News</a
        >
        <a v-else class="nav-link" href="#" @click="goManageNews"
          >Manage News</a
        >
      </li>
      <li v-show="$store.state.UserData.isAdmin === true" class="nav-item">
        <a
          v-if="$store.state.tabSelected.name == 'ManageCommentary'"
          class="nav-link active"
          @click="goManageCommentary"
          >Manage Commentary</a
        >
        <a v-else class="nav-link" href="#" @click="goManageCommentary"
          >Manage Commentary</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * Tabar on header of all views in this app for navigate in views
 * @displayName TabBar
 */
export default {
  name: "TabBar",
  methods: {
    /**
     * Method to go in specific route and commit mutations in store
     * @public
     */
    go(idTab, nameTab) {
      if (this.$store.state.tabSelected.name != nameTab) {
        this.$store.commit("setTabSelected", {
          id: idTab,
          name: nameTab,
        });
        this.currentTab = nameTab;
        this.$router.push({
          name: nameTab,
        });
      }
    },
    /**
     * Method to go in MyProfile route
     * @public
     */
    goMyProfile() {
      if (this.$store.state.tabSelected.name != "MyProfile") {
        this.$store.commit("setTabSelected", {
          id: 99,
          name: "MyProfile",
        });
        this.$router.push({
          name: "MyProfile",
        });
      }
    },
    /**
     * Method to go in News route
     * @public
     */
    goToNews() {
      if (this.$store.state.tabSelected.name != "News") {
        this.$store.commit("setTabSelected", {
          id: 1,
          name: "News",
        });
        this.$router.push({
          name: "News",
        });
      }
    },
    /**
     * Method to go in MyDashboard route
     * @public
     */
    goMyDashboard() {
      if (this.$store.state.tabSelected.name != "Dashboard") {
        this.$store.commit("setTabSelected", {
          id: 100,
          name: "Dashboard",
        });
        this.$router.push({
          name: "Dashboard",
        });
      }
    },
    /**
     * Method to go in ManageUsersroute
     * @public
     */
    goManageUsers() {
      if (this.$store.state.tabSelected.name != "ManageUsers") {
        this.$store.commit("setTabSelected", {
          id: 101,
          name: "ManageUsers",
        });
        this.$router.push({
          name: "ManageUsers",
        });
      }
    },
    /**
     * Method to go in ManageNews route
     * @public
     */
    goManageNews() {
      if (this.$store.state.tabSelected.name != "ManageNews") {
        this.$store.commit("setTabSelected", {
          id: 101,
          name: "ManageNews",
        });
        this.$router.push({
          name: "ManageNews",
        });
      }
    },
    /**
     * Method to go in ManageCommentary route
     * @public
     */
    goManageCommentary() {
      if (this.$store.state.tabSelected.name != "ManageCommentary") {
        this.$store.commit("setTabSelected", {
          id: 102,
          name: "ManageCommentary",
        });
        this.$router.push({
          name: "ManageCommentary",
        });
      }
    },
  },
};
</script>
<style>
@font-face {
  font-family: "LEQUIPE Regular";
  src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot");
  src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot?#iefix")
      format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff2")
      format("woff2"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff")
      format("woff"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.ttf")
      format("truetype"),
    url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.svg#LEQUIPE Regular")
      format("svg");
}

a {
  text-decoration: none;
  color: black;
}

a:link {
  text-decoration: none;
}

.brand {
  font-family: LEQUIPE Regular, sans-serif;
  font-size: 30px;
  color: #d61e00;
}

.navbar {
  background-color: whitesmoke !important;
}

.nav-tabs {
  border-bottom: 1px solid black !important;
}
</style>