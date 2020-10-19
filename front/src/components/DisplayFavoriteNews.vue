<template>
  <div class="card m-3 bg-light" style="max-height: 30rem; max-width: 20rem">
    <div class="card-header">News</div>

    <div v-if="infos.content" class="card-body">
      <h3>{{ infos.title }}</h3>
      <span>
        created at: {{ infos.createdAt | moment("MMMM Do YYYY, h:mm") }}</span
      ><br />
      <span>{{ infos.sport }}</span
      ><br />

      <span>{{ extract }}</span>
    </div>

    <div class="card-footer d-flex text-dark">
      <button
        class="btn btn-danger p-1"
        style="width: 100%"
        @click="delToMyFavorites()"
      >
        Unfav
      </button>
    </div>
  </div>
</template>


<script>
import ENV from "../../env.config";
/**
 * Component card for display a extract of a specific news in dashboard
 * @displayName DisplayFavoriteNews
 */
export default {
  name: "DisplayFavoriteNews",
  data() {
    return {
      /**
       * Containing the data arriving by the fetch       */
      infos: [],
    };
  },
  props: {
    /**
     * The id of this card. Use for the deletion
     */
    id: "",

    /**
     * The api name (ex: football, cs-go, etc...)
     */
    newsId: String, // String used to search info for 1 sport in getInfos
    /**
     * The button for del this card in favorite
     */
    delButton: Boolean,
  },
  mounted() {
    this.getInfos();
  },
  computed:{
     /**
     * Methods used to return a extract of the content
     * @public
     */
    extract:function(){
      return this.infos.content.substr(0, 50);
    }
  },
  methods: {
    /**
     * Delete this components in my favorites
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
    async getInfos() {
      const header = new Headers();
      header.append(
        "Authorization",
        "Bearer " + this.$store.state.access_token
      );
      let options = {
        method: "GET",
        headers: header,
        mode: "cors",
        cache: "default",
      };

      const datas = await fetch(
        `http://localhost:3000/news/${this.newsId}`,
        options
      );
      const json = await datas.json();
      if (datas.ok) {
        this.infos = json;
        console.log(this.infos);
      } else {
        console.log("Down");
      }
    },
  },
};
</script>


<style>
.CalendarTable {
  background-color: white;
}
</style>