<template>
  <div id="detailNews" class="text-dark">
    <Navbar />
    <TabBar />
    <div class="card m-2 detailNews" v-if="datas.createdAt">
      <div class="card-header d-flex justify-content-between">
        <h2>{{datas.title}}</h2>
        <button class="btn btn-primary btnCustom" @click="go">Back</button>
      </div>
      <h4 class="m-2">Sport : {{ datas.sport }} </h4>
      <v-md-preview :text="datas.content"></v-md-preview>
      <span class="m-4">Create at: {{ datas.createdAt | moment("MMMM Do YYYY, h:mm:ss") }} by:
        {{ datas.author }} </span><br />
      <div class="card m-2">
        <h3 class="m-2">Commentaries</h3>
        <div  class="m-2" v-if="commentaries.length == 0">
          No commentary available for this news
        </div>
        <div v-else class="overflow-auto" style="height:500px">
          <div class="card m-2 "  v-for="commentary in commentaries" :key="commentary.id">
            <div v-if="commentary.commentary != ''">
              <div class="card-header d-flex">
                <span>Post the
                  {{ parseFloat(commentary.createdAt) | moment("MMMM Do YYYY, h:mm") }} by
                  {{ commentary.userId }}</span>
                <button v-if="!commentary.isReported && $store.state.UserData.id!=''"
                  class="btn btn-primary mr-2 ml-auto report" @click="reportCommentary(commentary._id)">
                  Report this commentary
                </button>
              </div>
              <div class="card-body m-2">
                <span class="m-2" v-if="commentary.isReported">
                  Commentary reported. Waiting the admin's moderation
                </span>
                <span class="m-2" v-else> {{ commentary.commentary }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-2" v-if="$store.state.UserData.id != ''">
        <h3 class="m-2">Your commentary</h3>
        <textarea class="w-100" v-model="commentaryInput" />
        <button class="btn btn-primary m-2 btnCustom" @click="sendCommentary">
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
          `http://${ENV.API_BACKEND}/commentaries/${commentaryId}/report`,
          options
        ).then(() => {
          this.getCommentaries();
        });
      },
      /**
       * This method is used to go back in terms of variable in $store.state.tabSelected
       * @public
       */
      go() {
        /**
         * This method is used to go in detailNews
         * @public
         */
        this.$router.push({
          name: this.$store.state.tabSelected.name
        });
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
          await fetch(`http://${ENV.API_BACKEND}/commentaries`, options).then(() => {
            this.getCommentaries();
            this.commentaryInput = ""

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
          `http://${ENV.API_BACKEND}/commentaries/${this.newsId}`,
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
<style >
  .content {
    padding-top: 70px;
    padding-left: 220px;
  }

  .detailNews {
    font-size: bold;
    -webkit-box-shadow: 0px 0px 5px 5px #9cfdf9;
    -moz-box-shadow: 0px 0px 5px 5px #9cfdf9;
    box-shadow: 0px 0px 5px 5px #9cfdf9;
  }

  .detailNews .card-header{
    font-family: Arial, Helvetica, sans-serif;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
    color: #ffffff !important;
    border-bottom: 1px solid #9cfdf9;
    background: #278cff;
    background: linear-gradient(90deg,  #9cabfd 0%, #1f06ff 25%, #273dff 100%);
  }

  .btnCustom{
    background: linear-gradient(to bottom, #67fdf6 5%, #3665ff 100%);
    background-color: #3665ff;
    border-radius: 34px;
    border: 1px solid #67fdf6;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 2px 0px #041312;
  }
  .btnCustom:hover{
    background: linear-gradient(to bottom, #3665ff 5%, #17fff3 100%);
    background-color: #3665ff;
    border: 1px solid #67fdf6;
  }

  .report{
    background: linear-gradient(to bottom, #fa0e0e 5%, #f85e16 100%);
    background-color: #f8e916;
    border-radius: 34px;
    border: 1px solid #fa0e0e;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 2px 0px #041312;
  }
  .report:hover{
    background: linear-gradient(to bottom, #f8e916 5%, #fa0e0e 100%);
    background-color: #f8e916;
    border: 1px solid #fa0e0e;
  }

  span{
    font-size: larger;
  }
</style>