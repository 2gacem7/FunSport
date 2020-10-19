<template>
    <div class="m-3 card" style="min-height: 40rem; min-width: 30rem; max-width: 50rem">
        <div class="card-header d-flex justify-content-between">
            <h3 v-if="info[0]" class="text-dark text-center">{{info[0].match_hometeam_name}} vs {{info[0].match_awayteam_name}} </h3>
        </div>
        <h3 class="card-header text-center text-dark">Match</h3>
        <div class="card-body m-0 p-0 w-100 overflow-auto text-dark">
            <div v-for="item in info" :key="item.id">
                <p class="text-center font-weight-bold">{{item.match_round}}</p>
                <div class="row d-flex justify-content-center">
                    <div>
                        <p class="font-weight-bold text-center">{{item.match_hometeam_name}}</p>
                        <p :src="return_Score(item)" class="font-weight-bold text-center"><img
                                :src="return_Link_Home(item)" alt="no Team badge" style="max-width: 4rem" />
                            {{item.match_hometeam_score}}</p>
                           <div v-for="goal in item.goalscorer" :key="goal.id">
              <div v-if="(goal.home_scorer = goal.home_scorer)">
                {{ goal.time }}' {{ goal.home_scorer }}
                <img
                  src="../assets/ballon.png"
                  style="width: 1.5rem; height: 1.5rem"
                  class="mr-1"
                />
              </div>
            </div> 
                    </div>
                    <div class="ml-5">
                        <p class="font-weight-bold text-center">{{item.match_awayteam_name}}</p>
                        <p class="font-weight-bold text-center"> {{item.match_awayteam_score}} <img
                                :src="return_Link_Away(item)" alt="no Team badge" style="max-width: 4rem" />
                        </p>
                        <div v-for="goal in item.goalscorer" :key="goal.id">
              <div v-for="goal in item.goalscorer" :key="goal.id">
              <div v-if="(goal.away_scorer = goal.away_scorer)">
                <img
                  src="../assets/ballon.png"
                  style="width: 1.5rem; height: 1.5rem"
                  class="mr-1"
                />
                {{ goal.away_scorer }} {{ goal.time }}'
              </div>
            </div>
            </div>
                    </div>
                </div>
                <p class="text-center mt-3 mb-5">
                    {{item.match_date}} at {{item.match_time}}
                </p>
            </div>
        </div>
        <button class="btn btn-danger p-1" style="width:100%" @click="delToMyFavorites()">Unfav</button>
    </div>
</template>

<script>
    import ENV from "../../env.config";
    /**
     * Component card for display all teams
     * @displayName FootballMatchFavorite
     */
    export default {
        name: "FootballMatchFavorite",
        data() {
            return {
                info: []
            };
        },
        props: {
            /**
             * The id of the match
             */
            match_id: String,
            /**
             * The id of this card
             */
            id: ""
        },
        async mounted() {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            await fetch("https://apiv2.apifootball.com/?action=get_events&APIkey=" + ENV.API_FOOTBALL +
                    "&match_id=" + this.match_id,
                    requestOptions)
                .then(response => response.json())
                .then(result => this.info = result)
                .catch(error => console.log('error', error));
            console.log(this.info)
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