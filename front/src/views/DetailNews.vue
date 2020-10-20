<template>
  <div id="detailNews" class="text-dark">
    <Navbar />
    <TabBar />
    <button class="btn btn-primary" @click="go">Back</button>

    <div class="card m-2 p-2" v-if="datas.createdAt">
      <span
        >Create at: {{ datas.createdAt | moment("MMMM Do YYYY, h:mm:ss") }} by:
        {{ datas.author }} </span
      ><br />
      <span>Sport : {{ datas.sport }} </span>
      <label>Content: </label><br />
      <v-md-preview :text="datas.content"></v-md-preview>
      <div class="card m-2">
        <h3>Commentaries</h3>
        <div v-if="commentaries.length == 0">
          No commentary available for this news
        </div>
        <div v-else>

          <div
            class="card m-2"
            v-for="commentary in commentaries"
            :key="commentary.id"
          >
            <div v-if="commentary.commentary != ''">
              <div class="card-header d-flex">
                <span
                  >Post the
                  {{ parseFloat(commentary.createdAt) | moment("MMMM Do YYYY, h:mm") }} by
                  {{ commentary.userId }}</span
                >
                <button
                  v-if="!commentary.isReported && $store.state.UserData.id!=''"
                  class="btn btn-primary mr-2 ml-auto"
                  @click="reportCommentary(commentary._id)"
                >
                  Report this commentary
                </button>
              </div>
              <div class="card-body">
                <span v-if="commentary.isReported">
                  Commentary reported. Waiting the admin's moderation
                </span>
                <span v-else> {{ commentary.commentary }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$store.state.UserData.id != ''">
        <h3>Your commentary</h3>
        <input v-model="commentaryInput" />
        <button class="btn btn-primary m-2" @click="sendCommentary">
          Send commentary
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import AddMySport from "@/components/AddMySport.vue";

/**
 * View where you can find all details for the news selected
 * @displayName DetailNews
 */
export default {
  name: "DetailNews",
  components: {
    Navbar,
    TabBar,
  },
  data() {
    return {
      /**
       * id for a specific news
       */
      newsId: "",

      /**
       * Collect all the datas for the current news
       */
      datas: [],
      /**
       * Save the user's input in the field Commentary
       */
      commentaryInput: "",
      /**
       * Collect all commentaries for the current news to display them
       */
      commentaries: [],
    };
  },
  /**
   * This hook is used to set datas using the router params
   * @public
   */
  async mounted() {
    this.newsId = this.$route.params.newsId;
    this.datas = this.$route.params.datas;
    this.getCommentaries();
  },

  methods: {
    /**
     * This method is used to report a specific commentary
     * @public
     */
    async reportCommentary(commentaryId) {
      this.$store.commit("setAccessToken");
      const header = new Headers();
      header.append(
        "Authorization",
        "Bearer " + this.$store.state.access_token
      );
      const body = new FormData();
      let options = {
        method: "GET",
        headers: header,
      };
      await fetch(
        `http://localhost:3000/commentaries/${commentaryId}/report`,
        options
      ).then(() => {
        this.getCommentaries();
      });
    },
    /**
     * This method is used to go back in terms of variable in $store.state.tabSelected
     * @public
     */
    go() {/**
     * This method is used to go in detailNews
     * @public
     */
      this.$router.push({ name: this.$store.state.tabSelected.name });
    },

    /**
     * This method is used to send the commentary in database
     * @public
     */
    async sendCommentary() {
      if (this.commentaryInput != "") {
        this.$store.commit("setAccessToken");

        const header = new Headers();
        header.append(
          "Authorization",
          "Bearer " + this.$store.state.access_token
        );
        header.append("Content-type", "application/json");

        const body = new FormData();
        let options = {
          method: "POST",
          headers: header,
          body: JSON.stringify({
            newsId: this.newsId,
            commentary: this.commentaryInput,
          }),
        };
        await fetch(`http://localhost:3000/commentaries`, options).then(() => {
          this.getCommentaries();
                this.commentaryInput= ""

        });
      } else {
        alert("Type your commentary before");
      }
    },

    /**
     * This method is used to catch the commentary already in the database for this news
     * @public
     */
    async getCommentaries() {
      this.$store.commit("setAccessToken");

      let options = {
        method: "GET",
      };
      const datas = await fetch(
        `http://localhost:3000/commentaries/${this.newsId}`,
        options
      );
      const json = await datas.json();
      if (datas.ok) {
        this.commentaries = json;
      } else {
        console.log("Down");
      }
    },
  },
};
</script>
<style d>
.content {
  padding-top: 70px;
  padding-left: 220px;
}
</style>

