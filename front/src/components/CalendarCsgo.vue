<template>
    <div>
        <button class="btn-success font-weight-bold" @click="addToMyFavorites">+ favori</button>
        <h3 class="text-dark text-center">Calendar matches</h3>
        <table class="table">
            <thead>
                <tr>
                    <th class="h5 font-weight-bold">Dates</th>
                    <th class="h5 font-weight-bold">Leagues</th>
                    <th class="h5 font-weight-bold"> Matches</th>
                    <th class="h5 font-weight-bold"> Streams</th>
                </tr>
            </thead>
            <tbody v-for="item in info" :key="item.id">
                <tr>
                    <td>
                        <p :src="return_Date(item)"> Start: {{item.begin_at}}</p>
                        <p> End: {{item.end_at}}</p>
                    </td>
                    <td>{{item.league.name}} <img :src="return_Link(item)" style="max-width:7rem"></td>
                    <td>{{item.name}}</td>
                    <td>{{item.live_url}}</td>
                </tr>



            </tbody>

        </table>

    </div>


</template>


<script>
    //import API_SPORT_RADAR_CSGO from "@/env.config"
    export default {
        name: "CalendarCsgo",

        data() {

            return {
                info: {},
            }

        },

        beforeMount() {
            this.getInfos();
        },

        methods: {
            addToMyFavorites(){
        this.$store.dispatch('addToMyFavorites',{id:this.$store.state.tabSelected.id,data:{sport:"CSGO", type:"Calendar", name:""}})
      },
            async getInfos() {

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer 9iph8bGmiI4n69l_HcOATG7FsQLI5RIgHxakEY9F5tZaKr_3CWo");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                await fetch("https://api.pandascore.co/csgo/matches", requestOptions)
                    .then(response => response.json())
                    .then(result => this.info = result)
                    .catch(error => console.log('error', error));

            },

            return_Link(item) {
                return item.league.image_url
            },

            return_Date(item) {
                if (item.begin_at == null) {

                    item.begin_at = "unkonwn"
                }

                if (item.end_at == null) {

                    item.end_at = "unkonwn"
                }

            },


        }
    }
</script>


<style>
    .CalendarTable {
        background-color: white;
        color: black;
    }

    thead {
        font-family: counter-strike;
        font-size: 25px
    }
</style>