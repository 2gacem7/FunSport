<template>
    <div class="m-3 card" style="min-width: 30rem; max-height: 30rem; max-width: 50rem">
        <div class="card-header  d-flex justify-content-between">
            <button v-if="!delButton && $store.state.UserData.id !=''" class="btn btn-success font-weight-bold mb-2"
                @click="addToMyFavorites">
                + favori
            </button>
            <h3 class="text-center">{{ sport }} RANKING </h3>
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

        <div class="text-center m-2">
            <select v-if="isLoading" >
                <option disabled selected="true">Loading list</option>
                </select>
            <select v-else class="" v-model="id_tournament" v-on:click="getInfosRanking">
                <option disabled selected="true">Select a league</option>
                <option v-for="item in info" :key="item.id" v-bind:value="item.matches[0].tournament_id">
                    {{item.league.name}}
                </option>
            </select>
            <button v-if="id_tournament !== ''" @click="addTournamentToMyFavorite()"
                class="btn btn-success font-weight-bold mb-2 ml-3 btnADD">+ favori</button>
        </div>
        <div class="card-body m-0 p-0 w-100 overflow-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th class="h5 font-weight-bold text-center">Ranking</th>
                        <th class="h5 font-weight-bold text-center">Teams</th>
                    </tr>
                </thead>
                <tbody v-if="id_tournament == ''" class="text-center"> No league selected</tbody>
                <tbody v-else>

                    <tr v-for="item in infoRanking" :key="item.id" class="w-100">
                        <td scope="col" class="text-center font-weight-bold" style="width: 20%">
                            {{ item.rank }}
                        </td>
                        <td scope="col" class="text-center">
                            <p class="font-weight-bold">{{ item.team.name }}</p>
                            <p><img :src="return_Link_Teams(item)" alt="no team badge" style="max-width: 7rem" /></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import ENV from "../../env.config";
/**
 * Component card for display calendar for upcomming sport matchs
 * @displayName DisplayCalendar
 */

    /**
     * Component card for display calendar for upcomming sport matchs
     * @displayName DisplayRanking
     */
    export default {
        name: "DisplayRanking",
        data() {
            return {
                info: {},
                infoRanking: {},
                id_tournament: "",
                isLoading:true
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
            //this.getInfosRanking()
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
    async getInfos() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      if (this.id_tournament != "Loading") {
        await fetch(
          `https://api.pandascore.co/${this.apiName}/tournaments/past`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
              this.info = result
              this.isLoading=false})
          .catch((error) => console.log("error", error));
      }
    },
    /**
     * Return link to img for display in card
     *
     * @public
     */
    return_Link(item) {
      return item.league.image_url;
    },

        methods: {
            /**
             * Add this team to my favorites
             *
             * @public
             */
            addTournamentToMyFavorite() {
                this.$store.dispatch("addToMyFavorites", {
                    id: this.$store.state.tabSelected.id,
                    data: {
                        sport: this.sport,
                        type: "component",
                        id_tournament: this.id_tournament,
                        apiName: this.apiName,
                        name: "favoriteRanking",
                    },
                });
                this.getInfos();
            },

            /**
             * Add this sport calendar to my favorite
             *
             * @public
             */
            addToMyFavorites() {
                this.$store.dispatch("addToMyFavorites", {
                    id: this.$store.state.tabSelected.id,
                    data: {
                        sport: this.sport,
                        type: "component",
                        name: "ranking",
                        apiName: this.apiName,
                    },
                });
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
            async getInfos() {
                var myHeaders = new Headers();
                myHeaders.append(
                    "Authorization",
                    "Bearer " + ENV.API_PANDA_SPORT
                );

                var requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                };

                await fetch(`https://api.pandascore.co/${this.apiName}/tournaments/past`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => (this.info = result))
                    .catch((error) => console.log("error", error));
                    console.log(this.info)
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
             * Get datas ranking from api for display on the card
             *
             * @public
             */
            async getInfosRanking() {
                if (this.id_tournament !== "") {

                    var myHeaders = new Headers();
                    myHeaders.append(
                        "Authorization",
                        "Bearer " + ENV.API_PANDA_SPORT
                    );

                    var requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow",
                    };

                    await fetch(`https://api.pandascore.co/tournaments/` + this.id_tournament + `/standings`,
                            requestOptions)
                        .then((response) => response.json())
                        .then((result) => (this.infoRanking = result))
                        .catch((error) => console.log("error", error));
                }
            },
            /**
             * Return link to img for display in card
             *
             * @public
             */
            return_Link_Teams(item) {
                return item.team.image_url;
            },
        },
    };
</script>


<style>
    .btnADD {
        background: #2CF956;
        background-image: -webkit-linear-gradient(top, #2CF956, #06D530);
        background-image: -moz-linear-gradient(top, #2CF956, #06D530);
        background-image: -ms-linear-gradient(top, #2CF956, #06D530);
        background-image: -o-linear-gradient(top, #2CF956, #06D530);
        background-image: -webkit-gradient(to bottom, #2CF956, #06D530);
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        color: #000000;
        font-family: Verdana;
        font-size: 11px;
        padding: 11px;
        -webkit-box-shadow: 1px 1px 20px 0 #24C691;
        -moz-box-shadow: 1px 1px 20px 0 #24C691;
        box-shadow: 1px 1px 20px 0 #24C691;
        text-shadow: 1px 1px 20px #FFFFFF;
        border: solid #FFFFFF 1px;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
        text-align: center;
    }

    .btnADD:hover {
        border: solid #FFFFFF 1px;
        background: #06D530;
        color: #ffffff;
        background-image: -webkit-linear-gradient(top, #06D530, #2CF956);
        background-image: -moz-linear-gradient(top, #06D530, #2CF956);
        background-image: -ms-linear-gradient(top, #06D530, #2CF956);
        background-image: -o-linear-gradient(top, #06D530, #2CF956);
        background-image: -webkit-gradient(to bottom, #06D530, #2CF956);
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        text-decoration: none;
    }
</style>