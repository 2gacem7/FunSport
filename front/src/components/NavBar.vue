<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light text-black">
      <router-link class="brand font-weight-bold" :to="{name: 'Home'}">FunESport</router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Login'}" v-if="this.$store.state.UserData.id == ''">Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Register'}" v-if="this.$store.state.UserData.id == ''">
              Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
          </li>
          <li class="nav-item">
            <button class="btn btn-danger nav-link" @click="logout()"
              v-if="this.$store.state.UserData.id != ''">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    components: {},
    data() {
      return {
        value: "",
      };
    },
    methods: {
      logout() {
        document.cookie = "My_FunSport_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=LAX;";
        this.$store.state.tabSelected = this.$store.state.sports[0].name
        this.$router.push({name:this.$store.state.sports[0].name})
        document.location.reload(true);




      }
    }
  };
</script>
<style>
@font-face {font-family: "LEQUIPE Regular"; src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot"); src: url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.woff") format("woff"), url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/99ec515cf2e0c3afd21659c007955a32.svg#LEQUIPE Regular") format("svg"); }
  a {
    text-decoration: none;
    color: black;
  }

  a:link {
    text-decoration: none;
  }
.brand{
  font-family: LEQUIPE Regular,sans-serif;
  font-size: 30px;
  color: #d61e00
}
  .navbar {
    background-color: whitesmoke !important;
  }
</style>