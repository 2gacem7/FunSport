<template>
    <div>
        <div data-v-3acb992b="" class="CalendarTable">
            <div>
                <table class="table table--twoLines">
                    <thead>
                        <tr class="table__row table__row--head">
                            <th class="table__col table__col--date">Date</th>
                            <th class="table__col table__col--name">Nom de la compétition</th>

                            <th class="table__col">
                                Cat.
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table__row">
                            <td class="table__col table__col--date">
                                <div>
                                    1 oct.
                                </div>
                            </td>
                            <td class="table__col table__col--name table__col--etape">
                                <p>
                                    Coppa Bernocchi
                                </p>

                            </td>
                            <td class="table__col">
                                <span tag="span">
                                    1.Pro
                                </span>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>

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
                    headers: myHeaders,
                    redirect: 'follow'
                  };

                  await fetch("https://api.sportradar.us/csgo-t1/us/schedules/2020-10-07/schedule.json?api_key=m2xmrw2gf62v42anfjngmjqz", requestOptions)
                .then(response => response.text())
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
</style>