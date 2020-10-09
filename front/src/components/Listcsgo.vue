<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 30rem">
    <div class="card-header justify-content-between">
      <button class="btn btn-success font-weight-bold">+ favori</button>
      <h3 class="text-dark text-center">Team</h3>
    </div>
    <div class="card-body m-0 p-0 w-100">
      <table class="table m-0">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Team</th>
            <th class="h5 font-weight-bold text-center">Country</th>
          </tr>
        </thead>
      </table>
        <table class="table" >
          <tbody  class="card m-0 p-0 overflow-auto" style="max-height: 20rem">
            <tr v-for="item in info" :key="item.id"  class="w-100" >
              <td  style="width: 100%">{{item.name}}</td>
              <td  >{{item.location}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
  import ENV from "../../env.config"
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
        myHeaders.append("Authorization", ENV.API_PANDA_SPORT);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        await fetch("https://api.pandascore.co/csgo/teams?page[size]=20", requestOptions)
          .then(response => response.json())
          .then(result => this.info = result)
          .catch(error => console.log('error', error));
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