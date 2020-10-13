<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header  d-flex justify-content-between">
      <button v-if="!delButton"
        class="btn btn-success font-weight-bold mb-2"
        @click="addToMyFavorites"
      >
        + favori
      </button>
      <h3 class="text-dark text-center">{{ sport }} Calendar matches</h3>
      <button
        v-if="delButton"
        class="btn btn-danger font-weight-bold mb-2"
        @click="delToMyFavorites"
      >
       <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
      </button>
    </div>
    <div class="card-body m-0 p-0 w-100 overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Dates</th>
            <th class="h5 font-weight-bold text-center">Leagues</th>
            <th class="h5 font-weight-bold text-center">Matches</th>
            <th class="h5 font-weight-bold text-center">Streams</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info" :key="item.id" class="w-100">
            <td scope="col" class="text-center" style="width: 20%">
              <p :src="return_Date(item)">Start: {{ item.begin_at }}</p>
              <p>End: {{ item.end_at }}</p>
            </td>
            <td scope="col" class="text-center">
              {{ item.league.name }}
              <img :src="return_Link(item)" style="max-width: 7rem" />
            </td>
            <td scope="col" class="text-center">{{ item.name }}</td>
            <td
              v-if="item.live_url"
              scope="col"
              class="text-center"
              style="width: 20%"
            >
              <a :href="item.live_url">{{ item.live_url }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import ENV from "../../env.config";
export default {
  name: "CalendarCsgo",

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
        data: {
          sport: "CS-GO",
          type: "component",
          name: "calendar",
        },
      });
    },
    delToMyFavorites() {
      this.$emit("delfavorite", this.id);
    },
    async getInfos() {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + ENV.API_PANDA_SPORT
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch("https://api.pandascore.co/csgo/matches", requestOptions)
        .then((response) => response.json())
        .then((result) => (this.info = result))
        .catch((error) => console.log("error", error));
    },

    return_Link(item) {
      return item.league.image_url;
    },

    return_Date(item) {
      if (item.begin_at == null) {
        item.begin_at = "unknown";
      }

      if (item.end_at == null) {
        item.end_at = "unknown";
      }
    },
  },
};
</script>


<style>
.CalendarTable {
  background-color: white;
  color: black;
}

thead {
  font-family: counter-strike;
  font-size: 25px;
}
</style>