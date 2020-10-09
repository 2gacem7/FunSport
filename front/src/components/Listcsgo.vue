<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 30rem">
    <div class="card-header justify-content-between">
      <button v-if="!delButton"
        class="btn btn-success font-weight-bold"
        @click="addToMyFavorites"
      >
        + favori
      </button>
      <h3 class="text-dark text-center">Team</h3>
      <button
        v-if="delButton"
        class="btn btn-danger font-weight-bold mb-2"
        @click="delToMyFavorites"
      >
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
            <td style="width: 100%">{{ item.name }}</td>
            <td>{{ item.location }}</td>
          </tr>
        </tbody>
      </table>
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
    addToMyFavorites() {
      this.$store.dispatch("addToMyFavorites", {
        id: this.$store.state.tabSelected.id,
        data: { sport: "CS-GO", type: "component", name: "listTeam" },
      });
    },
    delToMyFavorites() {
      this.$emit("delfavorite", this.id);
    },
    async getInfos() {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer UAX3kpsYwC0Na8XT0UsdoL3czT_UNFlv2VGqGerKTYmc4ndZXAU"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        "https://api.pandascore.co/csgo/teams?page[size]=20",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => (this.info = result))
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style scoped>
tbody {
  color: black;
  font-family: counter-strike;
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