<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 50rem">
    <div class="card-header d-flex justify-content-between">
      <button
        v-if="!delButton && $store.state.UserData.id != ''"
        class="btn btn-success font-weight-bold"
        @click="addToMyFavorites"
      >
        + favori
      </button>
      <h3 class="text-center">{{ sport }} Last results</h3>
      <button
        v-if="delButton"
        class="btn btn-danger font-weight-bold mb-2"
        @click="delToMyFavorites"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-trash"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
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
            <th class="h5 font-weight-bold text-center">Winner</th>
          </tr>
        </thead>
        <tbody v-for="item in info" :key="item.id">
          <tr>
            <td class="text-center">
              <p class="m-0 font-weight-bold">Start:</p>
              <span v-if="item.begin_at == null">Unknown</span
              ><span v-else>
                {{ item.begin_at | moment("MMMM Do YYYY") }}</span
              >
              <p  class="m-0 mt-2 font-weight-bold">End:</p>
              <span v-if="item.end_at == null">Unknown</span
              ><span v-else>
                {{ item.end_at | moment("MMMM Do YYYY") }}</span
              >
            </td>
            <td class="text-center">
              {{ item.league.name }}
              <img
                :src="return_Link(item)"
                style="max-width: 7rem"
                class="mb-5"
              />
            </td>
            <td class="text-center">{{ item.name }}</td>
            <td v-if="item.winner != null" class="text-center">
              {{ item.winner.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer d-flex ">
        <button class="btn btn-primary ml-2 mr-auto " v-if="page > 1" @click="prev()">prev</button>
        <button class="btn btn-primary mr-2 ml-auto" v-if="info.length > 0" @click="next()">next</button>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
/**
 * Generic component card for display last matches results
 * @displayName DisplayLastResults
 */
export default {
  name: "DisplayLastResults",
  data() {
    return {
      info: {},
      page: 1,
    };
  },
  beforeMount() {
    this.getPastInfos();
  },
  props: {
    /**
     * The id of this card
     */
    id: "",
    /**
     * The type of sport of this card
     */
    sport: String, // String display in the header
    /**
     * The api name (ex: football, cs-go, etc...)
     */
    apiName: String, // String used to search info for 1 sport in getInfos
    /**
     * The button for del this card in favorite
     */
    delButton: Boolean,
  },
  methods: {
    /**
     * Add this components to my favorites
     *
     * @public
     */
    addToMyFavorites() {
      this.$store.dispatch("addToMyFavorites", {
        id: this.$store.state.tabSelected.id,
        data: {
          sport: this.sport,
          type: "component",
          name: "lastResult",
          apiName: this.apiName,
        },
      });
    },
    /**
     * display next page of results
     *
     * @public
     */
    async next() {
      this.page++;
      this.getPastInfos();
    },
    /**
     * display previous page of results
     *
     * @public
     */
    async prev() {
      if (this.page > 1) {
        this.page--;
        this.getPastInfos();
      }
    },
    /**
     * Delete this components in my favorites
     *
     * @public
     */
    delToMyFavorites() {
      this.$emit("delfavorite", this.id);
    },
    /**
     * Get datas from api for display on the card
     *
     * @public
     */
    async getPastInfos() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      await fetch(
        `https://api.pandascore.co/${this.apiName}/matches/past?page[size]=10&page[number]=${this.page}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => (this.info = result))
        .catch((error) => console.log("error", error));
    },
    /**
     * Return link to img for display in card
     *
     * @public
     */
    return_Link(item) {
      return item.league.image_url;
    },
    /**
     * Format date for better UX
     *
     * @public
     */
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
</style>