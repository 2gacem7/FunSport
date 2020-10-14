<template>
  <div class="text-center">
    <button v-if="!isInMySport() && $store.state.UserData.id !=''" class="btn btn-primary" @click="addToMySports">
      Add this sport
    </button>
  </div>
</template>

<script>
  /**
   * Button for add a sport to your favorite.
   * @displayName addMySport
   */
  export default {
    name: "addMySport",
    methods: {
      /**
       * Check if sport is in user Favorite
       *
       * @public
       */
      isInMySport() {
        for (let i = 0; i < this.$store.state.MySports.length; i++) {
          if (
            this.$store.state.tabSelected.id == this.$store.state.MySports[i].sportId
          ) {
            return true;
          }
        }
        return false;
      },
      /**
       * Add Sport to my favorite
       *
       * @public
       */
      async addToMySports() {
        /** Add this sport to your favorite
         * @event click
         * @type {Event}
         */
        await fetch("http://localhost:3000/mysports", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + this.$store.state.access_token,
          },
          body: JSON.stringify({
            sportId: this.$store.state.tabSelected.id,
          }),
        }).then(() => {
          this.$store.dispatch("getMySports");
        });
      },
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
</style>