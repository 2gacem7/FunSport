<template>
  <div class="ml-5 card " style="max-height: 30rem; min-width: 30rem; max-width: 30rem">
    <div class="card-header justify-content-between">
      <button class="btn btn-success font-weight-bold">+ favori</button>
      <h3 class="text-dark text-center">Team</h3>
    </div>
    <div class="card-body m-0 p-0 w-100">
      <table class="table">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Team</th>
            <th class="h5 font-weight-bold text-center">Country</th>
          </tr>
        </thead>
      </table>
      <div class="card overflow-auto m-0 p-0 w-100" style="max-height: 32rem">
        <table class="table">
          <tbody v-for="item in info" :key="item.id">
            <tr>
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.location}}</td>
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

        await fetch("https://api.pandascore.co/csgo/teams?page[size]=20", requestOptions)
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
    color: black;
    font-family: counter-strike;
  }

  thead {
    font-family: counter-strike;
    font-size: 25px
  }

  th {
    font-family: counter-strike;
    color: black;
  }
  h3 {
    font-family: counter-strike;
    color: black;
  }
</style>