<template>
    <div class="m-3 card" style="min-width: 30rem; max-height: 30rem; max-width: 50rem">
        <div class="card-header  d-flex justify-content-between">
            <h3 class="text-center">{{ sport }} RANKING </h3>
        </div>

        <div class="text-center m-2">
            <select v-if="isLoading">
                <option disabled selected="true">Loading list</option>
            </select>
            <select v-else class="" v-model="id_tournament" v-on:click="getInfosRanking">
                <option disabled selected="true">Select a league</option>
                <option v-for="item in info" :key="item.id" v-bind:value="item.matches[0].tournament_id">
                    {{item.league.name}}
                </option>
            </select>
            <button v-if="isFavorite && id_tournament !== ''" @click="addTournamentToMyFavorite()"
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
                info: [],
                infoRanking: [],
                id_tournament: "",
                isLoading: true,
                isFavorite:true,
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
        methods: {
            /**
             * Check if this sport live is in favorite user
             *
             * @public
             */
            async isInMyFavorite() {
                let x = await this.$store.state.MyFavorites.length
                for (let i = 0; i < x; i++) {
                    if (this.$store.state.MyFavorites[i].data[0].sport == this.sport && this.$store.state
                        .MyFavorites[i].data[0].type == "component" && this.$store.state.MyFavorites[i].data[0]
                        .id_tournament == this.id_tournament) {
                        this.isFavorite = false
                    }
                }
            },
            /**
             * Add this team to my favorites
             *
             * @public
             */
            addTournamentToMyFavorite() {
                let leagueName = "";
                for (let i = 0; i < this.info.length; i++) {
                    if (this.info[i].matches[0].tournament_id === this.id_tournament) {
                        leagueName = this.info[i].league.name;
                    }
                }
                this.$store.dispatch("addToMyFavorites", {
                    id: this.$store.state.tabSelected.id,
                    data: {
                        sport: this.sport,
                        type: "component",
                        id_tournament: this.id_tournament,
                        apiName: this.apiName,
                        leagueName: leagueName,
                        name: "favoriteRanking",
                    },
                });
                this.getInfos();
                this.isFavorite = false;
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
                await fetch(
                        `https://api.pandascore.co/${this.apiName}/tournaments/past?token=${ENV.API_PANDA_SPORT}`,
                        requestOptions
                    )
                    .then((response) => response.json())
                    .then((result) => {
                        this.info = result
                    })
                    .catch((error) => console.log("error", error));
                this.isLoading = false;
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
                    this.isFavorite = true;
                    this.isInMyFavorite();

                    await fetch(`https://api.pandascore.co/tournaments/` + this.id_tournament + `/standings?token=${ENV.API_PANDA_SPORT}`,
                    )
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