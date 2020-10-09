<template>
  <div class="m-3 card " style="max-height: 30rem; max-width: 50rem">
    <div class="card-header justify-content-between">
      <button class="btn btn-success font-weight-bold" @click="addToMyFavorites">+ favori</button>
      <h3 class="text-dark text-center">Last results</h3>
    </div>
    <div class="card-body m-0 p-0 w-100 overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Dates</th>
            <th class="h5 font-weight-bold text-center">Leagues</th>
            <th class="h5 font-weight-bold text-center">Matches</th>
            <th class="h5 font-weight-bold text-center">Winner</th>
          </tr>
        </thead>
        <tbody v-for="item in info" :key="item.id">
          <tr>
            <td class="text-center">
              <p :src="return_Date(item)"> {{item.begin_at}}</p>
              <p>{{item.end_at}}</p>
            </td>
            <td class="text-center">
              {{item.league.name}}
              <img :src="return_Link(item)" style="max-width:7rem" class="mb-5" />
            </td>
            <td class="text-center">{{item.name}}</td>
            <td class="text-center">{{item.winner.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import ENV from "../../env.config"
  export default {
    name: "LastResultsCsgo",
    data() {

      return {
        info: {},
      }

    },

    beforeMount() {
      this.getPastInfos();
    },

    methods: {
      addToMyFavorites() {
        this.$store.dispatch('addToMyFavorites', {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: "CSGO",
            type: "component",
            name: "lastResult"
          }
        })
      },
      async getPastInfos() {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", ENV.API_PANDA_SPORT);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        await fetch("https://api.pandascore.co/csgo/matches/past", requestOptions)
          .then(response => response.json())
          .then(result => this.info = result)
          .catch(error => console.log('error', error));

      },

      return_Link(item) {
        return item.league.image_url
      },

      return_Date(item) {
        if (item.begin_at == null) {

          item.begin_at = "unknown"
        }

        if (item.end_at == null) {

          item.end_at = "unknown"
        }

      }

    }
  }
</script>

<style>
  tbody {
    color: black;
  }
</style>