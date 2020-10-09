<template>
    <div class="card m-3 bg-light" style="max-height: 30rem; max-width: 30rem">
        <div class="card-header d-flex justify-content-between">
            <h3 class="text-dark text-center m-3"> CSGO TEAM : {{ infos[0].name }} </h3>
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
    export default {
        name: "TeamCSGO",
        data() {
            return {
                infos: [],
            };
        },
        props: {
            name: String,
            id : ""
        },
        async mounted() {
            let infos = [];
            await fetch("https://api.pandascore.co/csgo/teams?sort=name&per_page=100&search%5Bslug%5D=" + this
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
        },
        methods: {
            delToMyFavorites() {
                this.$emit("delfavorite", this.id);
            },
        },
    };
</script>

<style scoped>
    .card {
        color: black;
    }

    h3 {
        font-family: counter-strike;
        color: black;
    }

    h4 {
        font-family: Arial, Helvetica, sans-serif;
        color: black;
    }
</style>