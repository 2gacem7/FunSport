<template>
  <div id="news" style="background-color: rgb(29, 28, 28)">
    <Navbar />
    <TabBar />
    <div id="myCarousel" class="carousel slide carousel-fade" data-ride="carousel"
      style="border:none!important;border-bottom:2px solid white!important" v-if=" windowWidth > 850 && lastNews.length > 2">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img v-if="lastNews[0].sport == 'CSGO'" class="d-block w-100" src="../assets/carroussel_CSGO.png">
          <img v-else-if="lastNews[0].sport == 'LOL'" class="d-block w-100" src="../assets/carroussel_LOL.png">
          <img v-else-if="lastNews[0].sport == 'DOTA2'" class="d-block w-100" src="../assets/carroussel_DOTA2.png">
          <img v-else-if="lastNews[0].sport == 'FOOTBALL'" class="d-block w-100"
            src="../assets/carroussel_FOOTBALL.png">
          <div class="carousel-caption">
            <h5 class="p-4">{{ lastNews[0].title }}</h5>
            <small>
              <v-md-preview :text="'Preview: '+ getResume(lastNews[0].content)+'...'"></v-md-preview>
            </small>
            <button class="btn btn-primary w-25 newsButton" @click="goToNews(lastNews[0])">
              View
            </button>
          </div>
        </div>
        <div class="carousel-item">
          <img v-if="lastNews[1].sport == 'CSGO'" class="d-block w-100" src="../assets/carroussel_CSGO.png">
          <img v-else-if="lastNews[1].sport == 'LOL'" class="d-block w-100" src="../assets/carroussel_LOL.png">
          <img v-else-if="lastNews[1].sport == 'DOTA2'" class="d-block w-100" src="../assets/carroussel_DOTA2.png">
          <img v-else-if="lastNews[1].sport == 'FOOTBALL'" class="d-block w-100"
            src="../assets/carroussel_FOOTBALL.png">
          <div class="carousel-caption">
            <h5 class="p-4">{{ lastNews[1].title }}</h5>
            <small>
              <v-md-preview :text="'Preview: '+ getResume(lastNews[1].content)+'...'"></v-md-preview>
            </small>
            <button class="btn btn-primary w-25 newsButton" @click="goToNews(lastNews[1])">
              View
            </button>
          </div>
        </div>
        <div class="carousel-item">
          <img v-if="lastNews[2].sport == 'CSGO'" class="d-block w-100" src="../assets/carroussel_CSGO.png">
          <img v-else-if="lastNews[2].sport == 'LOL'" class="d-block w-100" src="../assets/carroussel_LOL.png">
          <img v-else-if="lastNews[2].sport == 'DOTA2'" class="d-block w-100" src="../assets/carroussel_DOTA2.png">
          <img v-else-if="lastNews[2].sport == 'FOOTBALL'" class="d-block w-100"
            src="../assets/carroussel_FOOTBALL.png">
          <div class="carousel-caption">
            <h5 class="p-4">{{ lastNews[2].title }}</h5>
            <small>
              <v-md-preview :text="'Preview: '+ getResume(lastNews[2].content)+'...'"></v-md-preview>
            </small>
            <button class="btn btn-primary w-25 newsButton" @click="goToNews(lastNews[2])">
              View
            </button>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="row m-4  justify-content-center selectContainer">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Options</label>
        </div>
        <select class="custom-select" v-model="sportSelected" id="selectionSport" @change="getNews">
          <option>ALL</option>
          <option v-for="sport in $store.state.sports" :key="sport.id">
            {{ sport.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="card m-2 " v-if="listNews.length == 0">No result for you</div>
    <div class="row row-cols-1 row-cols-md-3 m-0 justify-content-center" v-else>
      <div v-for="news in listNews" :key="news.id" class="card m-5 p-3">
        <div class="col mb-4">
          <h2 class="text text-center">{{ news.title }}</h2>
          <span class="row">Created at: {{ news.createdAt | moment("MMMM Do YYYY, h:mm") }}</span>
          <span class="row">Sport: {{ news.sport }}</span>
          <span class="row">Author: {{ news.author }}</span>

          <v-md-preview class="row" :text="'Preview: '+ getResume(news.content)+'...'"></v-md-preview>

          <div class="d-flex justify-content-between">
            <button class="btn btn-primary newsButton" @click="goToNews(news)">
              View
            </button>
            <button v-if="$store.state.UserData.id != '' && !isInMyFavorite(news._id)"
              class="btn btn-primary newsButton" @click="addToMyFavorites(news)">
              Add
            </button>
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
  import AddMySport from "@/components/AddMySport.vue";

  import DisplayListTeam from "@/components/DisplayListTeam.vue";
  import DisplayCalendar from "@/components/DisplayCalendar.vue";
  import DisplayLive from "@/components/DisplayLive.vue";
  import DisplayLastResults from "@/components/DisplayLastResults.vue";
  import DisplayRanking from "@/components/DisplayRanking.vue";

  import DisplaySearch from "@/components/DisplaySearch.vue";

  /**
   * View where you can find all news
   * @displayName News
   */
  export default {
    name: "News",
    components: {
      Navbar,
      TabBar,
      AddMySport,
      DisplayCalendar,
      DisplayLive,
      DisplayListTeam,
      DisplayLastResults,
      DisplayRanking,
      DisplaySearch,
    },
    data() {
      return {
        /**
         * array containing  all news available
         */
        listNews: [],
        /**
         * id for the element selected in select HTML
         */
        sportSelected: "ALL",
        /**
         * array containing last 3 news
         */
        CSGO: "../assets/carroussel_CSGO.png",
        LOL: "../assets/carroussel_LOL.png",
        DOTA2: "../assets/carroussel_DOTA2.png",
        FOOTBALL: "../assets/carroussel_FOOTBALL.png",
        lastNews: [],
        windowWidth: window.innerWidth
      };
    },
    /**
     * This hook is used to get news
     * @public
     */
    mounted() {
      this.getNews();
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    },
    methods: {
      /**
       * Check if this sport live is in favorite user
       *
       * @public
       */
      isInMyFavorite(newsId) {
        for (let i = 0; i < this.$store.state.MyFavorites.length; i++) {
          if (
            this.$store.state.MyFavorites[i].data[0].type == "news" &&
            this.$store.state.MyFavorites[i].data[0].name == newsId
          ) {
            return true;
          }
        }
        return false;
      },

      /**
       * Methods used to return a extract of the content
       * @public
       */
      getResume(content) {
        return content.substr(0, 50);
      },
      /**
       * Methods used to get all news to display them
       * @public
       */
      async getNews() {
        let list = [];
        let urlFiltered;
        if (this.sportSelected == "ALL") {
          urlFiltered = `http://${ENV.API_BACKEND}/news`;
        } else {
          urlFiltered = `http://${ENV.API_BACKEND}/news/filter/${this.sportSelected}`;
        }
        await fetch(urlFiltered, {
            method: "GET",
            headers: {
              authorization: "Bearer " + this.$store.state.access_token,
            },
          })
          .then((res) => res.clone().json())
          .then((json) => (list = json));
        this.listNews = list;
        for (let i = list.length - 1; i > list.length - 4; i--) {
          this.lastNews.push(list[i]);
        }
      },
      /**
       * This method is used to add a news in your favorite
       * @public
       */
      addToMyFavorites(news) {
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: news.sport,
            type: "news",
            name: news._id,
          },
        });
      },

      /**
       * This method is used to go in detailNews
       * @public
       */
      goToNews(news) {
        this.$router.push({
          name: "detailNews",
          params: {
            newsId: news._id,
            datas: news,
          },
        });
      },
    },
  };
</script>
<style>
  .content {
    padding-top: 70px;
    padding-left: 220px;
  }

  .carousel-caption h5 {
    font-size: 35px;
    color: black;
    background-color: rgba(255, 255, 255, 0.467);
    border-radius: 5px;
    text-shadow: 4px 4px 16px rgb(255, 255, 255);
  }

  .carousel-caption small {
    color: rgb(255, 255, 255);
    background-color: rgba(255, 255, 255, 0.467) !important;
    border-radius: 5px !important;
    text-shadow: 4px 4px 16px rgb(255, 255, 255) !important;
  }

  .newsButton {
    box-shadow: 4px 0px 29px 9px #9cfdf9;
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

  .newsButton:hover {
    background: linear-gradient(to bottom, #3665ff 5%, #67fdf6 100%);
    background-color: #3665ff;
    border: 1px solid #67fdf6;
  }

  #news .card {
    overflow: auto;
    -webkit-box-shadow: 0px 0px 5px 5px #9cfdf9;
    -moz-box-shadow: 0px 0px 5px 5px #9cfdf9;
    box-shadow: 0px 0px 5px 5px #9cfdf9;
  }

  #news .input-group {
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 5px 5px #9cfdf9;
    -moz-box-shadow: 0px 0px 5px 5px #9cfdf9;
    box-shadow: 0px 0px 5px 5px #9cfdf9;
  }
</style>