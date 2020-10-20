<template>
    <div class="m-3 card" style="min-height: 30rem;max-height: 30rem; max-width: 50rem">
        <div class="card-header d-flex justify-content-between">

            <h3 class="text-center">{{ sport }} Calendar </h3>

        </div>

        <div>
            <select v-model="id_tournament" v-on:click="getInfos">
                <option value="148">Premier League</option>
                <option value="468">Liga</option>
                <option value="176">Ligue 1</option>
                <option value="262">Serie A</option>
                <option value="195">Bundesliga</option>
            </select>
            <button v-if="id_tournament !== ''" class="btn btn-success font-weight-bold" @click="addToMyFavorites">
                + favori
            </button>

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
        <h3 class="card-header text-center text-dark">Match</h3>
        <div class="card-body m-0 p-0 w-100 overflow-auto text-dark">

            <div v-for="item in info" :key="item.id">
                <p class="text-center font-weight-bold">{{item.match_round}}
                    <router-link v-bind:to="'/football/' + item.match_id">
                        <button class="btn btn-success justify-content-center">
                            View
                        </button>
                    </router-link>
                </p>
                <div class="row d-flex justify-content-center">
                    <div>
                        <p class="font-weight-bold text-center">{{item.match_hometeam_name}}</p>
                        <p :src="return_Score(item)" class="font-weight-bold text-center">
                            <img :src="return_Link_Home(item)" alt="no Team badge" style="max-width: 4rem" />
                            {{item.match_hometeam_score}}</p>
                    </div>

                    <div class="ml-5">
                        <p class="font-weight-bold text-center">{{item.match_awayteam_name}}</p>
                        <p class="font-weight-bold text-center"> {{item.match_awayteam_score}} <img
                                :src="return_Link_Away(item)" alt="no Team badge" style="max-width: 4rem" />
                        </p>
                    </div>

                </div>
                <p class="text-center mt-3 mb-5">
                    {{ item.match_date | moment("MMMM Do YYYY") }} at {{ item.match_time| moment("h:mm:ss")}}<br />
                    <button v-if="item.button && $store.state.UserData.id != ''"
                        class="btn btn-success btn-sm rounded-circle mb-2 btnADD"
                        @click="addMatchToMyFavorite(item)">ADD</button>
                    <button v-else class="btn btn-success btn-sm rounded-circle mb-2 btnADD" disabled>
                        ADD
                    </button>
                </p>

            </div>
        </div>
    </div>
</template>


<script>
    import ENV from "../../env.config";
    /**
     * Component card for display football calendar
     * @displayName FootballCalendar
     */

    export default {
        name: "FootballCalendar",

        data() {
            return {
                info: [],
                infoRanking: [],
                id_tournament: "",
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
             * Add this match to my favorites
             *
             * @public
             */
            addMatchToMyFavorite(item) {
                const matchId = item.match_id;
                this.$store.dispatch("addToMyFavorites", {
                    id: this.$store.state.tabSelected.id,
                    data: {
                        sport: "football",
                        type: "matchFavori",
                        match_id: matchId
                    },
                });
                this.getInfos();
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
                        sport: "football",
                        type: "calendar",
                        id_tournament: this.id_tournament,
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
                let response = [];
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                await fetch(
                        "https://apiv2.apifootball.com/?action=get_events&from=2020-08-03&to=2021-06-30&league_id=" +
                        this.id_tournament + "&APIkey=" + ENV.API_FOOTBALL,
                        requestOptions)
                    .then(response => response.json())
                    .then((result) => (response = result))
                    .then((update) => {
                        for (let i = 0; i < response.length; i++) {
                            let check = false;
                            for (let j = 0; j < this.myFavorites.length; j++) {
                                if (response[i].match_id === this.$store.state.MyFavorites[j].data[0]
                                    .match_id) {
                                    check = true;
                                }
                            }
                            if (check) {
                                response[i].button = false;
                            } else response[i].button = true;
                        }
                        this.info = response;
                    })                  
            },
            /**
             * Return link to img for display badge home team in card
             *
             * @public
             */
            return_Link_Home(item) {
                return item.team_home_badge;
            },

            /**
             * Return link to img for display badge away team in card
             *
             * @public
             */
            return_Link_Away(item) {
                return item.team_away_badge;
            },

            /**
             * Format score for better UX
             *
             * @public
             */
            return_Score(item) {
                if (item.match_hometeam_score == "") {
                    item.match_hometeam_score = "-";
                }

                if (item.match_awayteam_score == "") {
                    item.match_awayteam_score = "-";
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