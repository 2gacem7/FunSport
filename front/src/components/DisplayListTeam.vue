<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 30rem">
    <div class="card-header d-flex justify-content-between">
      <h3 class="text-center">{{ sport }} Team</h3>
    </div>
    <div class="card-body m-0 p-0 w-100">
      <table class="table m-0">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Team</th>
            <th class="h5 font-weight-bold text-center">Country</th>
          </tr>
        </thead>
      </table>
      <table class="table">
        <tbody class="card m-0 p-0 overflow-auto cardInside" style="max-height: 20rem">
          <tr v-for="item in info" :key="item.id" class="w-100">
            <td>
              <button v-if="item.button && $store.state.UserData.id != ''"
                class="btn btn-success btn-sm rounded-circle mb-2 btnADD" @click="addTeamToMyFavorite(item)">
                ADD
              </button>
              <button v-else class="btn btn-success btn-sm rounded-circle mb-2 btnADD" disabled>
                ADD
              </button>
            </td>
            <td style="width: 100%">
              {{ item.name }}
            </td>
            <td>{{ item.location }}</td>
          </tr>
          <tr v-if="info.length == 0">
            No more teams
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer d-flex">
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
   * Component card for display all teams
   * @displayName DisplayListTeam
   */
  export default {
    name: "DisplayListTeam",

    data() {
      return {
        info: [],
        page: 1,
      };
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
    beforeMount() {
      this.getInfos();
    },
    computed: {
      myFavorites: function () {
        return this.$store.state.MyFavorites;
      },
    },
    methods: {
      /**
       * Add this team to my favorites
       *
       * @public
       */
      addTeamToMyFavorite(item) {
        const teamSlug = item.slug;
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: this.sport,
            type: "team",
            name: teamSlug,
          },
        });
        this.getInfos();
      },
      /**
       * display next page of results
       *
       * @public
       */
      async next() {
        this.page++;
        this.getInfos();
      },
      /**
       * display previous page of results
       *
       * @public
       */
      async prev() {
        if (this.page > 1) {
          this.page--;
          this.getInfos();
        }
      },

      /**
       * Get datas from api for display on the card
       *
       * @public
       */
      async getInfos() {
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
            `https://api.pandascore.co/${this.apiName}/teams?sort=name&per_page=10&page[number]=${this.page}`,
            requestOptions
          )
          .then((response) => response.json())
          .then((result) => (response = result))
          .then((update) => {
            for (let i = 0; i < response.length; i++) {
              let check = false;
              for (let j = 0; j < this.myFavorites.length; j++) {
                if (
                  response[i].slug ===
                  this.$store.state.MyFavorites[j].data[0].name
                ) {
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
    },
  };
</script>

<style scoped>
  tbody {
    font-family: Arial, Helvetica, sans-serif;
  }

  thead {
    font-size: 25px;
  }

  .cardInside {
    box-shadow: none !important;
  }

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