<template>
  <div id="ManageCommentary">
    <Navbar />
    <TabBar />
    <div
      class="card mt-3 mb-3 align-item-center d-flex mx-auto"
      style="width: 90%; background-color: #f4f4f4e3"
    >
      <div class="card-header d-flex justify-content-center">
        <h4>Manage Commentary</h4>
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
                <p v-if="!commentary.newsId" class="m-2">Sport: {{ commentary.type }}</p>
                <p v-else class="m-2">News</p>
              </div>
              <div class="row" style="width: 100%">
                <p class="m-2">Commentary: {{ commentary.commentary }}</p>
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
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";

export default {
  name: "ManageCommentary",
  components: {
    Navbar,
    TabBar,
  },
  data() {
    return {
      listCommentary: [],
    };
  },

  async mounted() {
    this.$store.dispatch("getUserData");
    this.getCommentary();
  },
  methods: {
    async moderateCommentary(commentaryID) {
      this.$store.commit("setAccessToken");

      await fetch(`http://localhost:3000/pronostics/${commentaryID}/reset`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {this.getCommentary()});
    },
    async moderateNewsCommentary(commentaryID) {
      this.$store.commit("setAccessToken");

      await fetch(`http://localhost:3000/commentaries/${commentaryID}/delete`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {this.getCommentary()});
      ;
    },
    async validateCommentary(commentaryID) {
      this.$store.commit("setAccessToken");

      await fetch(`http://localhost:3000/pronostics/${commentaryID}/validate`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      }).then(() => {this.getCommentary()});
    },
    async validateNewsCommentary(commentaryID) {
      this.$store.commit("setAccessToken");

      await fetch(
        `http://localhost:3000/commentaries/${commentaryID}/validate`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + this.$store.state.access_token,
          },
        }
      ).then(() => {this.getCommentary()});
    },
    async getCommentary() {
      let listPronostics = [];
      await fetch("http://localhost:3000/pronostics", {
        method: "GET",
        headers: {
          authorization: "Bearer " + this.$store.state.access_token,
        },
      })
        .then((res) => res.clone().json())
        .then((json) => (listPronostics = json));

      let listCommentaries = [];
      await fetch("http://localhost:3000/commentaries", {
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

.card-body {
  background-color: rgb(72, 99, 255);
  font-family: "Roboto Mono", monospace;
}

.card-header {
  background-color: rgba(72, 99, 255, 0.515);
  font-family: "Roboto Mono", monospace;
}
</style>