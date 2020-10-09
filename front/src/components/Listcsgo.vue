<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 30rem">
    <div class="card-header justify-content-between">
      <button v-if="!delButton" class="btn btn-success font-weight-bold" @click="addToMyFavorites">
        + favori
      </button>
      <h3 class="text-dark text-center">{{ sport }} Team</h3>
      <button v-if="delButton" class="btn btn-danger font-weight-bold mb-2" @click="delToMyFavorites">
        - favori
      </button>
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
      <table class="table">
        <tbody class="card m-0 p-0 overflow-auto" style="max-height: 20rem">
          <tr v-for="item in info" :key="item.id" class="w-100">
            <td>
                <button class="btn btn-success btn-sm rounded-circle mb-2"
                @click="addTeamToMyFavorite(item)">Add</button>
            </td>
            <td style="width: 100%">
              {{item.name}}
            </td>
            <td>{{item.location}}</td>
          </tr>
        </tbody>
        </table>
    </div>
  </div>
  




</template>

<script>
  import ENV from "../../env.config";
  export default {
    name: "Listcsgo",

    data() {
      return {
        info: {},
      };
    },
    props: {
      id: "",
      sport: String, // String display in the header
      apiName: String, // String used to search info for 1 sport in getInfos
      delButton: Boolean,
    },
    beforeMount() {
      this.getInfos();
    },

    methods: {
      addTeamToMyFavorite(item) {
        const teamSlug = item.slug;
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: "CS-GO",
            type: "team",
            name: teamSlug
          },
        });

      },
      delToMyFavorites() {
        this.$emit("delfavorite", this.id);
      },
      addToMyFavorites() {
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: "CS-GO",
            type: "component",
            name: "list"
          },
        });
      },
      async getInfos() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        await fetch("https://api.pandascore.co/csgo/teams?sort=name&per_page=100", requestOptions)
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
    font-family: Arial, Helvetica, sans-serif;
  }

  thead {
    font-family: counter-strike;
    font-size: 25px;
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