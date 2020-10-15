<template>
  <div>
    <ul class="nav nav-tabs align-items-center bg-light">
      <li v-for="sport in $store.state.sports" :key="sport.id" class="nav-item">
        <a v-if="sport.name == $store.state.tabSelected.name" class="nav-link active" href="#"
          @click="go(sport._id, sport.name)">{{ sport.name }}</a>
        <a v-else class="nav-link" href="#" @click="go(sport._id, sport.name)">{{ sport.name }}</a>
      </li>
      <li v-show="$store.state.UserData.id != ''" class="nav-item">
        <a v-if="$store.state.tabSelected.name == 'Dashboard'" class="nav-link active" href="#"
          @click="goMyDashboard">My dashboard</a>
        <a v-else class="nav-link" href="#" @click="goMyDashboard">My dashboard</a>
      </li>
      <li v-show="$store.state.UserData.id != ''" class="nav-item">
        <a v-if="$store.state.tabSelected.name == 'MyProfile'" class="nav-link active" href="#" @click="goMyProfile">My
          profile</a>
        <a v-else class="nav-link" href="#" @click="goMyProfile">My profile</a>
      </li>
      <li v-show="$store.state.UserData.isAdmin === true" class="nav-item">
        <a v-if="$store.state.tabSelected.name == 'ManageUsers'" class="nav-link active" href="#"
          @click="goManageUsers">Manage Users</a>
        <a v-else class="nav-link" href="#" @click="goManageUsers">Manage Users</a>
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
      go(idTab, nameTab) {
        this.$store.commit("setTabSelected", {
          id: idTab,
          name: nameTab
        });
        this.$router.push({
          name: nameTab
        });
      },
      goMyProfile() {
        this.$store.commit("setTabSelected", {
          id: 99,
          name: "MyProfile"
        });
        this.$router.push({
          name: "MyProfile"
        });
      },
      goMyDashboard() {
        this.$store.commit("setTabSelected", {
          id: 100,
          name: "Dashboard"
        });
        this.$router.push({
          name: "Dashboard"
        });
      },
      goManageUsers() {
        this.$store.commit("setTabSelected", {
          id: 101,
          name: "ManageUsers"
        });
        this.$router.push({
          name: "ManageUsers"
        });
      }
    },
  };
</script>
<style>
  @font-face {
    font-family: "LEQUIPE Regular";
    src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot");
    src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot?#iefix") format("embedded-opentype"),
      url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff2") format("woff2"),
      url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff") format("woff"),
      url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.ttf") format("truetype"),
      url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.svg#LEQUIPE Regular") format("svg");
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