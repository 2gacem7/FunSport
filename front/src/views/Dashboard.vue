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
                    <div v-for="sport in mySports" v-bind:key="sport.name" class="row mt-2  justify-content-center">
                        <h3 class="card-text text-center">{{ sport.name }}</h3>
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
    import Navbar from "@/components/NavBar.vue"
    import TabBar from "@/components/TabBar.vue";

    export default {
        name: 'Dashboard',
        components: {
            Navbar,
            TabBar
        },
        data() {
            return {
                mySports: []
            }
        },

        async mounted() {
            if (this.$store.state.UserData.id == '') {
                this.$router.push({
                    path: '/login'
                });
            }
            if (document.cookie.length > 0) {
                let cookieArray = document.cookie.split(';');
                for (let i = 0; i < cookieArray.length; i++) {
                    if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
                        const cookiename = "My_FunSport_Token=";
                        const access_token = cookieArray[i].substring(cookiename.length, cookieArray[i].length);
                        let mySport = [];
                        await fetch("http://localhost:3000/mysports", {
                                "method": "GET",
                                "headers": {
                                    "authorization": "Bearer " + access_token
                                }
                            })
                            .then(res => res.clone().json())
                            .then(json => mySport = json);
                        let myFinalSports = [];
                        mySport.forEach(async sport => {
                            let tmp = null;
                            await fetch("http://localhost:3000/sports/" + sport.sportId, {
                                    "method": "GET",
                                    "headers": {
                                        "authorization": "Bearer " + access_token
                                    }
                                })
                                .then(res => res.clone().json())
                                .then(json => tmp = json);
                            myFinalSports.push(tmp)
                        })
                        this.mySports = myFinalSports;
                        this.$store.state.MySports = myFinalSports;
                    }
                }
            }

        },
        methods: {}
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