<template>
    <div>
        <button class="btn-success font-weight-bold">+ favori</button>
        <h3 class="text-dark text-center">Calendar competition</h3>
        <table class="table">
            <thead>
                <tr>
                    <th class="h5 font-weight-bold">Dates</th>
                    <th class="h5 font-weight-bold">Tournaments</th>
                    <th class="h5 font-weight-bold"> Competitors</th>
                    <th class="h5 font-weight-bold"> Streams</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <p>15/02/2020 </p>
                        <p>15/02/2020 </p>
                    </td>
                    <td>Twitch challenge</td>
                    <td>tocard vs cool</td>
                    <td>https://www.twitch.tv/team/esl</td>
                </tr>
                <tr>
                    <td>
                        <p>15/09/2020</p>
                        <p> 15/11/2021</p>
                    </td>
                    <td>??? anonyme</td>
                    <td>tocard vs cool</td>
                    <td>www.youtube.fr/....</td>
                </tr>

                <tr>
                    <td>
                        <p>15/09/2020</p>
                        <p> 15/11/2021</p>
                    </td>
                    <td>??? anonyme</td>
                    <td>tocard vs cool</td>
                    <td>www.youtube.fr/....</td>
                </tr>

                <tr>
                    <td>
                        <p>15/09/2020</p>
                        <p> 15/11/2021</p>
                    </td>
                    <td>??? anonyme</td>
                    <td>tocard vs cool</td>
                    <td>www.youtube.fr/....</td>
                </tr>

                <tr>
                    <td>
                        <p>15/09/2020</p>
                        <p> 15/11/2021</p>
                    </td>
                    <td>??? anonyme</td>
                    <td>tocard vs cool</td>
                    <td>www.youtube.fr/....</td>
                </tr>

                <tr>
                    <td>
                        <p>15/09/2020</p>
                        <p> 15/11/2021</p>
                    </td>
                    <td>??? anonyme</td>
                    <td>tocard vs cool</td>
                    <td>www.youtube.fr/....</td>
                </tr>
                

                
                
            </tbody>

        </table>

    </div>


</template>


<script>
    //import API_SPORT_RADAR_CSGO from "@/env.config"
    export default {
        name: "CalendarCsgo",

        beforeMount() {
            this.getInfos();
        },

        methods: {

            async getInfos() {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + this.myToken);

                var requestOptions = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },

                    redirect: 'follow'
                };

                await fetch(
                        "https://api.sportradar.us/csgo-t1/us/schedules/2020-10-07/schedule.json?api_key=m2xmrw2gf62v42anfjngmjqz",
                        requestOptions)
                    .then(response => response.json())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));

                console.log(response)


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