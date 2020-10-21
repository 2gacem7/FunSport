<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header d-flex justify-content-between">
      <button v-if="isFavorite && !delButton && $store.state.UserData.id != ''" class="btn btn-success font-weight-bold"
        @click="addToMyFavorites">
        + favori
      </button>
      <h3 class="text-center">{{ sport }} Last results</h3>
      <button v-if="delButton" class="btn btn-danger font-weight-bold mb-2" @click="delToMyFavorites">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
      </button>
    </div>
    <div class="card-body m-0 p-0 w-100 overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Dates</th>
            <th class="h5 font-weight-bold text-center">Leagues</th>
            <th class="h5 font-weight-bold text-center">Matches</th>
            <th class="h5 font-weight-bold text-center">Winner</th>
          </tr>
        </thead>
        <tbody v-for="item in info" :key="item.id">
          <tr>
            <td class="text-center">
              <button v-if="item.button && $store.state.UserData.id != ''"
                class="btn btn-success btn-sm rounded-circle mb-2 btnADD" @click="addMatchToMyFavorite(item)">
                ADD
              </button>
              <button v-else class="btn btn-success btn-sm rounded-circle mb-2 btnADD" disabled>
                ADD
              </button>
              <p class="m-0 font-weight-bold">Start:</p>
              <span v-if="item.begin_at == null">Unknown</span><span v-else>
                {{ item.begin_at | moment("MMMM Do YYYY") }}</span>
              <p class="m-0 mt-2 font-weight-bold">End:</p>
              <span v-if="item.end_at == null">Unknown</span><span v-else>
                {{ item.end_at | moment("MMMM Do YYYY") }}</span>
            </td>
            <td class="text-center">
              {{ item.league.name }}
              <img :src="return_Link(item)" style="max-width: 7rem" class="mb-5" alt="no league image" />
            </td>
            <td class="text-center">{{ item.name }}</td>
            <td v-if="item.winner != null" class="text-center">
              {{ item.winner.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer d-flex ">
      <button class="btn btn-primary ml-2 mr-auto" v-if="page > 1" @click="prev()">
        prev
      </button>
      <button class="btn btn-primary ml-2 mr-auto" v-else disabled>
        prev
      </button>
      <p> page n°{{ page }}</p>
      <button class="btn btn-primary mr-2 ml-auto" v-if="info.length > 0" @click="next()">
        next
      </button>
      <button class="btn btn-primary mr-2 ml-auto" v-else disabled>
        next
      </button>
    </div>
  </div>
</template>

<script>
  import ENV from "../../env.config";
  /**
   * Generic component card for display last matches results
   * @displayName DisplayLastResults
   */
  export default {
    name: "DisplayLastResults",
    data() {
      return {
        info: {},
        page: 1,
        isFavorite: true,
      };
    },
    async beforeMount() {
      this.getPastInfos();
      this.isInMyFavorite();
    },
    props: {
      /**
       * The id of this card
       */
      id: "",
      /**
       * The type of sport of this card
       */
      sport: String, // String display in the header
      /**
       * The api name (ex: football, cs-go, etc...)
       */
      apiName: String, // String used to search info for 1 sport in getInfos
      /**
       * The button for del this card in favorite
       */
      delButton: Boolean,

    },
    computed: {
      myFavorites: function () {
        return this.$store.state.MyFavorites;
      },
    },
    methods: {
      /**
       * Add this components to my favorites
       *
       * @public
       */
      async isInMyFavorite() {
        let x  = await this.$store.state.MyFavorites.length;
        for(let i= 0 ; i < x ; i++){
          if (this.$store.state.MyFavorites[i].data[0].sport == this.sport && this.$store.state.MyFavorites[i].data[0].type == "component" && this.$store.state.MyFavorites[i].data[0].name == 'calendar' ) {
            this.isFavorite = false
          }
        }
      },
      /**
       * Add this components to my favorites
       *
       * @public
       */
      addToMyFavorites() {
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: this.sport,
            type: "component",
            name: "lastResult",
            apiName: this.apiName,
          },
        });
        this.isFavorite = false;
      },
      addMatchToMyFavorite(item) {
        const matchId = item.id;
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: this.sport,
            type: "matches",
            match_id: matchId,
            apiName: this.apiName,
          },
        });
        this.getPastInfos();
      },
      /**
       * display next page of results
       *
       * @public
       */
      async next() {
        this.page++;
        this.getPastInfos();
      },
      /**
       * display previous page of results
       *
       * @public
       */
      async prev() {
        if (this.page > 1) {
          this.page--;
          this.getPastInfos();
        }
      },
      /**
       * Delete this components in my favorites
       *
       * @public
       */
      delToMyFavorites() {
        this.$emit("delfavorite", this.id);
      },
      /**
       * Get datas from api for display on the card
       *
       * @public
       */
      async getPastInfos() {
        let response = [];
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        await this.$store.dispatch("getMyFavorites");
        await fetch(
            `https://api.pandascore.co/${this.apiName}/matches/past?page[size]=10&page[number]=${this.page}?token=${ENV.API_PANDA_SPORT}`,
            requestOptions
          )
          .then((response) => response.json())
          .then((result) => (response = result))
          .then((update) => {
            for (let i = 0; i < response.length; i++) {
              let check = false;
              for (let j = 0; j < this.myFavorites.length; j++) {
                if (response[i].id === this.$store.state.MyFavorites[j].data[0].match_id) {
                  check = true;
                }
              }
              if (check) {
                response[i].button = false;
              } else response[i].button = true;
            }
            this.info = response;
          })
          .catch((error) => console.log("error", error));
      },
      /**
       * Return link to img for display in card
       *
       * @public
       */
      return_Link(item) {
        return item.league.image_url;
      },
      /**
       * Format date for better UX
       *
       * @public
       */
      return_Date(item) {
        if (item.begin_at == null) {
          item.begin_at = "unknown";
        }

        if (item.end_at == null) {
          item.end_at = "unknown";
        }
      },
    },
  };
</script>

<style scoped>
  .btnADD {
    background: #2cf956;
    background-image: -webkit-linear-gradient(top, #2cf956, #06d530);
    background-image: -moz-linear-gradient(top, #2cf956, #06d530);
    background-image: -ms-linear-gradient(top, #2cf956, #06d530);
    background-image: -o-linear-gradient(top, #2cf956, #06d530);
    background-image: -webkit-gradient(to bottom, #2cf956, #06d530);
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    color: #000000;
    font-family: Verdana;
    font-size: 11px;
    padding: 11px;
    -webkit-box-shadow: 1px 1px 20px 0 #24c691;
    -moz-box-shadow: 1px 1px 20px 0 #24c691;
    box-shadow: 1px 1px 20px 0 #24c691;
    text-shadow: 1px 1px 20px #ffffff;
    border: solid #ffffff 1px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    text-align: center;
  }

  .btnADD:hover {
    border: solid #ffffff 1px;
    background: #06d530;
    color: #ffffff;
    background-image: -webkit-linear-gradient(top, #06d530, #2cf956);
    background-image: -moz-linear-gradient(top, #06d530, #2cf956);
    background-image: -ms-linear-gradient(top, #06d530, #2cf956);
    background-image: -o-linear-gradient(top, #06d530, #2cf956);
    background-image: -webkit-gradient(to bottom, #06d530, #2cf956);
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    text-decoration: none;
  }
</style>