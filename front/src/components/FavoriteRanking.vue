<template>
    <div class="card m-3 bg-light" style="max-height: 30rem; max-width: 30rem">
        <div class="card-header d-flex justify-content-between">
            <h3 class="text-center m-3"> {{ leagueName }} </h3>
        </div>
        <div class="card-body m-0 p-0 overflow-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th class="h5 font-weight-bold text-center">Rank</th>
                        <th class="h5 font-weight-bold text-center">Teams</th>

                    </tr>
                </thead>
                <tbody v-for="item in infoRanking" :key="item.team.id">
                    <tr>
                        <td class="text-center">
                            {{ item.rank }}
                        </td>
                        <td class="text-center ">
                            <p class="font-weight-bold">{{item.team.name}}</p>
                            <img :src="return_Link(item)" alt="no team badge" style="max-width: 6rem" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="btn btn-danger p-0" style="width:100%" @click="delToMyFavorites()">Unfav</button>
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
                infoRanking: [],
            };
        },
        props: {
            /**
             * The id tournament of the league
             */
            id_tournament: "",
            /**
             * The id of this card
             */
            id: "",
            /**
             * The name of league
             */
            leagueName: String,
        },
        async mounted() {
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
                return item.team.image_url;
            },
        },
    };
</script>


<style>
    .CalendarTable {
        background-color: white;
    }

    thead {
        font-size: 25px;
    }
</style>