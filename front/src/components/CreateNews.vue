<template>
  <div id="createUser">
    <div id="pop" class="container-flex mx-4 mt-5 fixed-top">
      <div class="row justify-content-center">
        <div
          class="card align-item-center d-flex"
          style="width: 80%; height: 80vh; position: absolute; z-index: 10"
        >
          <div class="card-header d-flex justify-content-between">
            <h4>Create News</h4>
            <button class="btn btn-warning" @click="cancel()">Cancel</button>
          </div>
          <div class="card-body overflow-auto">
            <div class="row mt-3 justify-content-center" v-if="info === true">
              <span
                class="text-danger"
                v-if="msg.general"
                style="background-color: #f4f4f4e3"
                >{{ msg.general }}</span
              >
            </div>
            <div class="row mt-2 justify-content-center">
              <label>Select the sport</label>
            </div>
            <div class="row mt-2 justify-content-center">
              <select v-model="sportSelected" id="selectionSport">
                <option v-for="sport in $store.state.sports" :key="sport.id">
                  {{ sport.name }}
                </option>
              </select>
            </div>

            <div class="row mt-2 justify-content-center">
              <label>Title</label>
            </div>
            <div class="row mt-2 justify-content-center">
              <input
                type="text"
                name="name"
                required
                placeholder="Title"
                v-model="title"
              />
            </div>

            <div class="row mt-2 justify-content-center">
              <label>Content</label>
            </div>
            <div class="row mt-2 justify-content-center">
              <v-md-editor
                v-model="content"
                placeholder="content"
                height="400px"
              ></v-md-editor>
            </div>
          </div>
          <button
            v-if="Object.keys(this.data).length == 0"
            class="btn btn-success p-4"
            style="width: 100%"
            @click="submit()"
          >
            Create
          </button>

          <button
            v-else
            class="btn btn-success p-4"
            style="width: 100%"
            @click="update()"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
/**
 * Pop Up window for create or update a news
 * @displayName createNews
 */
export default {
  name: "createNews",
  data() {
    return {
      /**
       * The v-model for the title
       */
      title: "",
      /**
       * The v-model for the content
       */
      content: "",
      /**
       * The v-model for the selected sport
       */
      sportSelected: this.$store.state.sports[0].name,
    };
  },
  props: {
    /**
       * props from ManageNews when edit news is selected
       */
    data: Object,
  },

  async mounted() {
    if (Object.keys(this.data).length > 0) {
      this.title = this.data.title;
      this.content = this.data.content;
      this.sportSelected = this.data.sport;
    } else {
      this.sportSelected = this.$store.state.sports[0].name;
    }
  },
  methods: {
    /**
     * Methods used to create a new news
     *
     * @public
     */
    async submit() {
      if (this.title != "") {
        let body = {
          title: this.title,
          content: this.content,
          sport: this.sportSelected,
        };
        let requestStatus;
        await fetch(`http://${ENV.API_BACKEND}/news`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + this.$store.state.access_token,
          },
          body: JSON.stringify(body),
        }).then((res) => {
          requestStatus = res.status;
        });
        this.$parent.modalVisible = false;
        this.$parent.getNews();
      } else {
        this.info = true;
        this.msg["general"] = "Information missing in the form";
      }
    },
    /**
     * Methods used to update a news
     *
     * @public
     */
    async update() {
      let body = {
        title: this.title,
        content: this.content,
        sport: this.sportSelected,
      };
      let requestStatus;
      await fetch(`http://${ENV.API_BACKEND}/news/${this.data._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + this.$store.state.access_token,
        },
        body: JSON.stringify(body),
      }).then((res) => {
        requestStatus = res.status;
      });
      this.$parent.modalVisible = false;
      this.$parent.getNews();
    },
    /**
     * Close this Pop Up
     *
     * @public
     */
    cancel() {
      this.$parent.modalVisible = false;
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