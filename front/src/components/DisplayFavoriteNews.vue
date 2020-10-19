<template>
  <div class="card m-3 bg-light" style="max-height: 30rem; max-width: 20rem">

        <div class="card-header">
          {{ infos.title}}
          </div>

         <div class="card-body">
           {{ infos._id}}
         </div>

        <div class="card-footer d-flex text-dark">
       <button class="btn btn-danger p-1" style="width:100%" @click="delToMyFavorites()">Unfav</button>
    </div>
  </div>
</template>


<script>
  import ENV from "../../env.config";
  /**
   * Component card for display all live for a sport
   * @displayName Live
   */
  export default {
    name: "Live",
    data() {
      return {
        infos: [],
        isLoading: true,
        lastUpdate: "",

      };
    },
    props: {
      /**
       * The id of this card
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
    methods: {
      /**
       * Check if this sport live is in favorite user
       *
       * @public
       */
      isInMyFavorite() {
        this.$store.state.MyFavorites.forEach(function (favorite) {
          if (
            favorite.type == "news" &&
            favorite.name == this.newsId
          ) {
            return true;
          }
        });
        return false;
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
      async getInfos() {
        const header = new Headers();
        header.append("Authorization", "Bearer " + this.$store.state.access_token);
        let options = {
          method: "GET",
          headers: header,
          mode: "cors",
          cache: "default",
        };

        const datas = await fetch(`http://localhost:3000/news/${this.newsId}`, options);
        const json = await datas.json();
        if (datas.ok) {
          this.infos = json;
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