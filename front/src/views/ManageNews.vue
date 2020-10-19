<template>
  <div id="ManageCommentary">
    <Navbar />
    <TabBar />
    <div
      class="card mt-3 mb-3 align-item-center d-flex mx-auto"
      style="width: 90%; background-color: #f4f4f4e3"
    >
      <div class="card-header d-flex justify-content-center">
        <h4>Manage News</h4>
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
                <p class="m-2">Sport: {{ news.sport }}</p>
                <p class="m-2">Author: {{ news.author }}</p>
                                <p class="m-2">Title: {{ news.title }}</p>

              </div>

              <button
                class="btn btn-warning mr-2"
                @click="editNews(news._id)"
              >
                Edit news
              </button>
              <button
                class="btn btn-danger mr-2"
                @click="deleteNews(news._id)"
              >
              Delete news
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";

export default {
  name: "ManageNews",
  components: {
    Navbar,
    TabBar,
  },
  data() {
    return {
      listNews: [],
    };
  },

  async mounted() {
    this.$store.dispatch("getUserData");
    this.getNews();
  },
  methods: {
    async editNews(newsId) {
      console.log('Edit news')

    },
    async deleteNews(commentaryID) {
      this.$store.commit("setAccessToken");

      await fetch(`http://localhost:3000/news/${commentaryId}`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {this.getNews()});
      ;
    },
    async getNews() {
      let list = [];
      await fetch("http://localhost:3000/news", {
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

.card-body {
  background-color: rgb(72, 99, 255);
  font-family: "Roboto Mono", monospace;
}

.card-header {
  background-color: rgba(72, 99, 255, 0.515);
  font-family: "Roboto Mono", monospace;
}
</style>