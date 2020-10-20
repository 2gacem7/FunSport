<template>
    <div class="m-3 card" style="max-height: 30rem; max-width: 50rem; min-width: 30rem">
        <div class="card-header d-flex justify-content-between">
            <h3 class="text-dark text-center">Live</h3>
        </div>
        <h3 class="card-header text-center text-dark">Match on live</h3>
        <div class="card-body m-0 p-0 w-100 overflow-auto text-dark">
            <div class="text-dark text-center font-weight-bold" v-if="info.error == 404">
                No live available
            </div>
            <div v-else class="border-bottom mb-5" v-for="item in info" :key="item.id">
                <p class="text-center font-weight-bold">
                    {{ item.match_round }} {{ item.match_time }}
                </p>
                <p class="text-center mt-3">{{ item.match_status }}</p>
                <div class="row d-flex justify-content-center mb-5">
                    <div>
                        <p class="font-weight-bold text-center">
                            {{ item.match_hometeam_name }}
                        </p>
                        <p class="font-weight-bold text-center">
                            <img :src="return_Link_Home(item)" style="max-width: 4rem" />
                            {{item.match_hometeam_score}}
                        </p>
                        <div v-for="goal in item.goalscorer" :key="goal.id">
                            <div v-if="(goal.home_scorer = goal.home_scorer)">
                                {{ goal.time }}' {{ goal.home_scorer }}
                                <img src="../assets/ballon.png" style="width: 1.5rem; height: 1.5rem" class="mr-1" />
                            </div>
                        </div>
                    </div>
                    <div class="ml-5">
                        <p class="font-weight-bold text-center">
                            {{ item.match_awayteam_name }}
                        </p>
                        <p class="font-weight-bold text-center">
                            {{ item.match_awayteam_score }}
                            <img :src="return_Link_Away(item)" style="max-width: 4rem" />
                        </p>
                        <div v-for="goal in item.goalscorer" :key="goal.id">
                            <div v-if="(goal.away_scorer = goal.away_scorer)">
                                <img src="../assets/ballon.png" style="width: 1.5rem; height: 1.5rem" class="mr-1" />
                                {{ goal.away_scorer }} {{ goal.time }}'
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-danger p-1" style="width:100%" @click="delToMyFavorites()">Unfav</button>
    </div>
</template>

<script>
    import ENV from "../../env.config";
    /**
     * Component card for display all teams
     * @displayName FootballLiveFavori
     */
    export default {
        name: "FootballLiveFavori",

        data() {
            return {
                info: [],
                timer: 600000,
                setTimer: "",
            };
        },
        props: {
            /**
             * The id of this card
             */
            id: "",
            sport: String, // String display in the header
            /**
             * The button for del this card in favorite
             */
            delButton: Boolean,
            /**
             * The league id of the league
             */
            league_id: String
        },
        async mounted() {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            var today = new Date();

            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = "0" + dd;
            }

            if (mm < 10) {
                mm = "0" + mm;
            }
            today = yyyy + "-" + mm + "-" + dd;

            await fetch(
                    `https://apiv2.apifootball.com/?action=get_events&match_live=1&to=${today}&from=${today}&league_id=` +
                    this.league_id +
                    "&APIkey=" +
                    ENV.API_FOOTBALL,
                    requestOptions
                )
                .then((response) => response.json())
                .then((result) => {
                    this.info = result;
                    if (this.setTimer == "") {
                        this.setTimer = setInterval(() => {
                            this.getInfos();
                        }, this.timer);
                    }
                })
        },

        methods: {
            /**
             * Remove this team from my favorites
             *
             * @public
             */
            delToMyFavorites() {
                this.$emit("delfavorite", this.id);
            },
            /**
             * Return link to img for display team (home) badge in card
             *
             * @public
             */
            return_Link_Home(item) {
                return item.team_home_badge;
            },
            /**
             * Return link to img for display team (away) badge in card
             *
             * @public
             */
            return_Link_Away(item) {
                return item.team_away_badge;
            },
        },
    };
</script>