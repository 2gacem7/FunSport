<template>
    <div class="card m-3 bg-light" style="max-height:30rem;max-width: 30rem" v-if="infos[0]">
        <div class="card-header d-flex justify-content-between">
            <h3 class="text-dark text-center m-3"> {{ apiName }} TEAM : {{ infos[0].name }} </h3>
            <img v-if="infos[0].image_url != null" :src="infos[0].image_url" alt="" class="mx-auto" style="width:05rem">
        </div>
        <div class="card-body m-0 p-0 overflow-auto">
            <div class="row m-0 p-0 d-flex justify-content-between" v-for="player in infos[0].players" :key="player.id">
                <h4> Player : {{  player.name }} {{  player.last_name}} </h4>
            </div>
        </div>
        <button class="btn btn-danger p-1" style="width:100%" @click="delToMyFavorites()">Unfav</button>
    </div>
</template>


<script>
    import ENV from "../../env.config";
    /**
     * Component card for display one team on dashboard
     * @displayName TeamCSGO
     */
    export default {
        name: "EsportTeam",
        data() {
            return {
                infos: [],
            };
        },
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
                let sportName;
                if (this.apiName == "CS-GO") {
                    sportName = 'csgo'
                } else if (this.apiName == "DOTA2") {
                    sportName = 'dota2'
                } else if (this.apiName == "LOL") {
                    sportName = 'lol'
                }
                let infos = [];
                await fetch("https://api.pandascore.co/" + sportName +
                        "/teams?sort=name&per_page=100&search%5Bslug%5D=" + this
                        .name, {
                            "method": "GET",
                            "headers": {
                                "authorization": "Bearer " + ENV.API_PANDA_SPORT
                            }
                        })
                    .then(response => response.json())
                    .then(result => infos = result)
                    .catch(err => {
                        console.error(err);
                    });
                this.infos = infos;
            }
        },
    };
</script>

<style scoped>
</style>