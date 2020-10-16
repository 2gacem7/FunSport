<template>
    <div class="card m-3 bg-light" style="max-height: 30rem; max-width: 30rem">
        <div class="card-header d-flex justify-content-between">
            <h3 class="text-dark text-center m-3" v-if="infos[0]"> {{infos[0].league_name}} </h3>
        </div>
        <div class="card-body m-0 p-0 overflow-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th class="h5 font-weight-bold text-center">Rank</th>
                        <th class="h5 font-weight-bold text-center">Teams</th>
                        <th class="h5 font-weight-bold text-center">Points</th>
                    </tr>
                </thead>
                <tbody v-for="item in infos" :key="item.id">
                    <tr>
                        <td class="text-center">
                            {{item.overall_league_position}}
                        </td>
                        <td class="text-center">
                            <p>{{item.team_name}}</p>
                            <p><img :src="return_Link(item)" alt="no team badge home" style="max-width: 7rem" class="mb-5" /></p>
                        </td>
                        <td class="text-center">
                            {{item.overall_league_PTS}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="btn btn-danger p-1" style="width:100%" @click="delToMyFavorites()">Unfav</button>
    </div>
</template>


<script>
    import ENV from "../../env.config";
    /**
     * Component card for display all teams
     * @displayName FootballTournament
     */
    export default {
        name: "FootballTournament",
        data() {
            return {
                infos: [],
            };
        },
        props: {
            /**
             * The id tournament of the league
             */
            id_tournament: String,
            /**
             * The id of this card
             */
            id : ""
        },
        async beforeMount() {
            var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                await fetch("https://apiv2.apifootball.com/?action=get_standings&league_id="+this.id_tournament+"&APIkey=" + ENV.API_FOOTBALL,
                        requestOptions)
                    .then(response => response.json())
                    .then(result => this.infos=result)
                    .catch(error => console.log('error', error)); 
        },

        methods: {
            /**
             * Remove this league from my favorites
             *
             * @public
             */
            delToMyFavorites() {
                this.$emit("delfavorite", this.id);
            },
            /**
             * Return link to img for display team badge in the card
             *
             * @public
             */
            return_Link(item) {
                return item.team_badge;
            },
        },

            
    };
</script>