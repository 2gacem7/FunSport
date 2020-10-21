<template>
  <div id="ManageCommentary">
    <Navbar />
    <TabBar />
    <div
      class="card mt-3 mb-3 align-item-center d-flex mx-auto"
      style="width: 90%; background-color: #f4f4f4e3"
    >
      <div class="card-header d-flex justify-content-center">
        <h2>Manage Commentary</h2>
      </div>
      <div class="card-body overflow-auto mx-auto" style="width: 100%">
        <div v-if="listCommentary.length == 0">Nothing to moderate</div>
        <div v-else>
          <div v-for="commentary in listCommentary" v-bind:key="commentary._id">
            <div
              v-if="commentary.commentary != ''"
              class="row mb-2 mt-2 p-2"
              style="width: 100%; border-bottom: 1px solid silver"
            >
              <div class="row" style="width: 100%">
                <h4 v-if="!commentary.newsId" class="m-2">Sport: {{ commentary.type }}</h4>
                <h4 v-else class="m-2">News</h4>
              </div>
              <div class="row" style="width: 100%">
                <h4 class="m-2">Commentary: {{ commentary.commentary }}</h4>
              </div>
              <div v-if="!commentary.newsId">
                <button
                  class="btn btn-warning mr-2"
                  @click="validateCommentary(commentary._id)"
                >
                  Validate Commentary
                </button>
                <button
                  class="btn btn-danger mr-2"
                  @click="moderateCommentary(commentary._id)"
                >
                  Moderate Commentary
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-warning mr-2"
                  @click="validateNewsCommentary(commentary._id)"
                >
                  Validate Commentary
                </button>

                <button
                  class="btn btn-danger mr-2"
                  @click="moderateNewsCommentary(commentary._id)"
                >
                  Moderate Commentary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";

/**
 * View where you can manage the reported commentaries
 * @displayName ManageCommentary
 */
export default {
  name: "ManageCommentary",
  components: {
    Navbar,
    TabBar,
  },
  data() {
    return {
       /**
       * The list of the commentaries reported
       */
      listCommentary: [],
    };
  },

  async mounted() {
    this.$store.dispatch("getUserData");
    this.getCommentary();
  },
  methods: {
    /**
     * Methods used to moderate a specific commentary (clean the field commentary in pronostic)
     * @param commentaryID Id of the commentary to moderate
     * @public
     */
    async moderateCommentary(commentaryID) {
      this.$store.commit("setAccessToken");
      await fetch(`http://${ENV.API_BACKEND}/pronostics/${commentaryID}/reset`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {this.getCommentary()});
    },
    /**
     * Methods used to delete  a specific news for moderation
     * @param newsId Id of the news to moderate
     * @public
     */
    async moderateNewsCommentary(newsId) {
      this.$store.commit("setAccessToken");
      await fetch(`http://${ENV.API_BACKEND}/commentaries/${newsId}/delete`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {this.getCommentary()});
      ;
    },
    /**
     * Methods used to validate a specific commentary
     * @param commentaryID Id of the commentary to validate
     * @public
     */
    async validateCommentary(commentaryID) {
      this.$store.commit("setAccessToken");
      await fetch(`http://${ENV.API_BACKEND}/pronostics/${commentaryID}/validate`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {this.getCommentary()});
    },
     /**
     * Methods used to validate a specific news
     * @param newsId Id of the news
     * @public
     */
    async validateNewsCommentary(newsId) {
      this.$store.commit("setAccessToken");
      await fetch(
        `http://${ENV.API_BACKEND}/commentaries/${newsId}/validate`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + this.$store.state.access_token,
          },
        }
      ).then(() => {this.getCommentary()});
    },
    /**
     * Methods used to get all news and pronostics reported
     * @public
     */
    async getCommentary() {
      let listPronostics = [];
      await fetch(`http://${ENV.API_BACKEND}/pronostics`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      })
        .then((res) => res.clone().json())
        .then((json) => (listPronostics = json));

      let listCommentaries = [];
      await fetch(`http://${ENV.API_BACKEND}/commentaries`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      })
        .then((res) => res.clone().json())
        .then((json) => (listCommentaries = json));
      this.listCommentary = listPronostics.concat(listCommentaries);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

  .card-header {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
    color: #ffffff !important;
    border-bottom: 3px solid rgb(255, 255, 255);
    background: rgb(131, 58, 180);
    background: linear-gradient(90deg, rgba(194, 6, 62, 0.527) 0%, rgba(6, 188, 194, 0.527) 50%, rgb(69, 252, 124) 100%);
  }

  .card-body {
    background: rgb(174, 238, 230);
    background: -moz-radial-gradient(circle, rgba(174, 238, 230, 1) 17%, rgba(31, 121, 236, 1) 100%);
    background: -webkit-radial-gradient(circle, rgba(174, 238, 230, 1) 17%, rgba(31, 121, 236, 1) 100%);
    background: radial-gradient(circle, rgba(174, 238, 230, 1) 17%, rgba(31, 121, 236, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#aeeee6", endColorstr="#1f79ec", GradientType=1);
  }
</style>