<template>
    <div id="Dashboard">
        <Navbar />
        <TabBar />
        <div class="card m-3" style="background-color:#f4f4f4e3">
            <div class="card-header">
                <h1 class="text text-center">My Favorite Sports</h1>
            </div>
            <div class="card-body">
                <div v-if="mySports.length == 0" class="row mt-2  justify-content-center">
                    <label class="card-text text-center">No favorite sports added</label>
                </div>
                <div v-else>
                    <div v-for="sport in mySports" v-bind:key="sport.name" class="row mt-2  p-3  justify-content-center">
                        <h3 class="card-text text-center">{{ sport.name }}</h3>
                        <button class="btn btn-danger btn-sm rounded-circle ml-5 mb-2 " @click="deleteSport(sport._id)">Del</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card m-3" style="background-color:#f4f4f4e3">
            <div class="card-header">
                <h1 class="text text-center">My Favorites</h1>
            </div>
            <div class="card-body">

            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/NavBar.vue";
    import TabBar from "@/components/TabBar.vue";

    export default {
        name: 'Dashboard',
        components: {
            Navbar,
            TabBar
        },
        data() {
            return {
                access_token:""
            }
        },
        async mounted() {
            if (this.$store.state.UserData.id == '') {
                this.$router.push({
                    path: '/login'
                });
            }
            this.$store.dispatch('getMySports');

        },
        computed: {
            mySports: function (){
                return this.$store.state.MySports;
            }
        },
        methods: {
            async deleteSport(id){
                const body = {
                    id: id
                }
                let mySports = [];
                await fetch("http://localhost:3000/mysports", {
                        "method": "DELETE",
                        "headers": {
                            "content-type": "application/json",
                            "authorization": "Bearer " + this.$store.state.access_token
                        },
                        "body": JSON.stringify(body)
                    })
                    .then(res => res.clone().json())
                    .then(json => mySports = json);
                this.$store.dispatch('getMySports');
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

    .card-body {
        background-color: rgb(72, 99, 255);
        font-family: 'Roboto Mono', monospace;
    }

    .card-header {
        background-color: rgba(72, 99, 255, 0.515);
        font-family: 'Roboto Mono', monospace;
    }
</style>