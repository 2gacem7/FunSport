<template>
  <div id="ManageCommentary">
    <Navbar />
    <TabBar />
    <div
      class="card mt-3 mb-3 align-item-center d-flex mx-auto"
      style="width: 90%; background-color: #f4f4f4e3"
    >
      <div class="card-header d-flex justify-content-between">
        <h2>Manage News</h2>
        <button class="btn btn-warning" @click="createNews">
          Create news
        </button>
      </div>
      <div class="card-body overflow-auto mx-auto" style="width: 100%">
        <div v-if="listNews.length == 0">Nothing to display</div>
        <div v-else>
          <div v-for="news in listNews" v-bind:key="news._id">
            <div
              v-if="news.authorId != ''"
              class="row mb-2 mt-2 p-2"
              style="width: 100%; border-bottom: 1px solid silver"
            >
              <div class="row" style="width: 100%">
                <h4 class="row m-2">Sport: {{ news.sport }}</h4>
                <h4 class="row m-2">Author: {{ news.author }}</h4>
                <h4 class="row m-2">Title: {{ news.title }}</h4>
              </div>

              <button class="btn btn-warning mr-2" @click="editNews(news)">
                Edit news
              </button>
              <button class="btn btn-danger mr-2" @click="deleteNews(news._id)">
                Delete news
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="modalVisible == true">
        <CreateNews :data="selectedNewsData" />
      </div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import CreateNews from "@/components/CreateNews.vue";

/**
 * Views used to manage the news
 * @displayName Manage News
 */
export default {
  name: "ManageNews",
  components: {
    Navbar,
    TabBar,
    CreateNews,
  },
  data() {
    return {
      /**
     * The list of all news
     */
      listNews: [],
      /**
     * check if the modal need to be display or not
     */
      modalVisible: false,
      /**
     * Save the news selected to edit or delete it
     */
      selectedNewsData: {},
    };
  },

  async mounted() {
    this.$store.dispatch("getUserData");
    this.getNews();
  },
  methods: {
    /**
     * Methods used to show modal to create a new and initialize the selectedNews
     * @public
     */
    createNews() {
      this.selectedNewsData = {};
      this.modalVisible = true;
    },
    /**
     * Methods used to show modal to edit a new and initialize the selectedNews
     * @param news Object with all data in
     * @public
     */
    async editNews(news) {
      this.selectedNewsData = news;
      this.modalVisible = true;
    },
     /**
     * Methods used to  delete a specific news
     * @param newsId Id a the news to delete
     * @public
     */
    async deleteNews(newsId) {
      this.$store.commit("setAccessToken");

      await fetch(`http://${ENV.API_BACKEND}/news/${newsId}`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {
        this.getNews();
      });
    },
    /**
     * Methods used to get all news to display them
     * @public
     */
    async getNews() {
      let list = [];
      await fetch(`http://${ENV.API_BACKEND}/news`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      })
        .then((res) => res.clone().json())
        .then((json) => (list = json));
      this.listNews = list;
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