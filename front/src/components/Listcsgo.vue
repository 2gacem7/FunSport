<template>
  <div class="container-fluid mt-4">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>Team</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody v-for="item in info" :key="item.id">
        <tr>
          <td v-text="item.name"></td>
          <td v-text="item.location"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    //import API_SPORT_RADAR_CSGO from "@/env.config"
    export default {
        name: "Listcsgo",

        data() {

            return {
                info: {},
            }

        },

        beforeMount() {
            this.getInfos();
        },

        methods: {
            async getInfos() {

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer UAX3kpsYwC0Na8XT0UsdoL3czT_UNFlv2VGqGerKTYmc4ndZXAU");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                await fetch("https://api.pandascore.co/csgo/teams?page[size]=5", requestOptions)
                    .then(response => response.json())
                    .then(result => this.info = result)
                    .catch(error => console.log('error', error));

                console.log(this.info)

            },
        }
    }
</script>

<style scoped>
  tbody {
    color: white;
  }
  thead {
    font-family: counter-strike;
    font-size:25px   
  }
</style>