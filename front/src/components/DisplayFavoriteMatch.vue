<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header text-dark justify-content-between">
    Todo Result match
    </div>
            <button class="btn btn-danger p-1" style="width:100%" @click="delToMyFavorites()">Unfav</button>

  </div>
</template>

<script>
import ENV from "../../env.config";
/**
 * Component card for display search tournement or match
 * @displayName DisplayFavoriteMatch
 */
export default {
  name: "DisplayFavoriteMatch",
  props: {
            /**
             * The slug name of team
             */
            name: String,
            /**
             * The id of this card
             */
            id: "",
            /**
             * The api name (ex: football, cs-go, etc...)
             */
            apiName: String, // String used to search info for 1 sport in getInfos
        },
  data() {
    return {
      type: "matches",
      searchValue: "",
      results: [],
    };
  },
  async mounted() {
            this.getInfo();
        },
  methods: {
            /**
             * remove this team from my favorite
             *
             * @public
             */
            delToMyFavorites() {
                this.$emit("delfavorite", this.id);
                this.getInfo();
            },
            /**
             * Get team data from api
             *
             * @public
             */
            async getInfo() {
                // let sportName;
                // if (this.apiName == "CS-GO") {
                //     sportName = 'csgo'
                // } else if (this.apiName == "DOTA2") {
                //     sportName = 'dota2'
                // } else if (this.apiName == "LOL") {
                //     sportName = 'lol'
                // }
                // let infos = [];
                // await fetch("https://api.pandascore.co/" + sportName +
                //         "/teams?sort=name&per_page=100&search%5Bslug%5D=" + this
                //         .name, {
                //             "method": "GET",
                //             "headers": {
                //                 "authorization": "Bearer " + ENV.API_PANDA_SPORT
                //             }
                //         })
                //     .then(response => response.json())
                //     .then(result => infos = result)
                //     .catch(err => {
                //         console.error(err);
                //     });
                // this.infos = infos;
            }
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
</style>