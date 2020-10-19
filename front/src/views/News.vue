<template>
  <div id="dota2" style="background-color: rgb(255, 174, 145)">
    <Navbar />
    <TabBar />

    <div class="row mt-2 justify-content-center">
      <select v-model="sportSelected" id="selectionSport" @change="getNews">
        <option>ALL</option>
        <option v-for="sport in $store.state.sports" :key="sport.id">
          {{ sport.name }}
        </option>
      </select>
    </div>
<div class="card m-2" v-if="listNews.length == 0">No result for you</div>
  <div v-else>
    <div v-for="news in listNews" :key="news.id" class="card m-2">
      <h2>Title : {{ news.title }}</h2>
      <span
        >Created at: {{ news.createdAt | moment("MMMM Do YYYY, h:mm") }}</span
      >
      <span>Sport: {{ news.sport }}</span>
      <span>Author: {{ news.author }}</span>

      <v-md-preview :text="getResume(news.content)"></v-md-preview>

      <div class="d-flex justify-content-between">
        <button class="btn btn-primary w-25" @click="goToNews(news)">
          View
        </button>
        <button
          class="btn btn-primary w-25"
          @click="addToMyFavorites(news._id)"
        >
          Add
        </button>
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
    };
  },
  /**
   * This hook is used to get news
   * @public
   */
  mounted() {
    this.getNews();
  },
  methods: {
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
        urlFiltered = `http://localhost:3000/news`;
      } else {
        urlFiltered = `http://localhost:3000/news/${this.sportSelected}`;
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
    },
    /**
     * This method is used to add a news in your favorite
     * @public
     */
    addToMyFavorites(newsId) {
      console.log("Todo", newsId);
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

#dota2 .card {
  overflow: auto;
  -webkit-box-shadow: 0px 0px 12px 10px rgba(250, 89, 30, 1);
  -moz-box-shadow: 0px 0px 12px 10px rgba(250, 89, 30, 1);
  box-shadow: 0px 0px 12px 10px rgba(250, 89, 30, 1);
}

#dota2 .card-header {
  font-family: "dota2";
  font-weight: bolder;
  text-shadow: 0px 0px 10px rgba(253, 156, 29, 1);
  color: #ffffff !important;
  border-bottom: 1px solid rgba(253, 156, 29, 1);
  background: rgb(255, 90, 0);
  background: linear-gradient(
    90deg,
    rgba(255, 90, 0, 1) 0%,
    rgba(253, 156, 29, 1) 76%,
    rgba(239, 252, 69, 1) 100%
  );
}

#dota2 .card-header button {
  background: #2cf956;
  background-image: -webkit-linear-gradient(top, #2cf956, #06d530);
  background-image: -moz-linear-gradient(top, #2cf956, #06d530);
  background-image: -ms-linear-gradient(top, #2cf956, #06d530);
  background-image: -o-linear-gradient(top, #2cf956, #06d530);
  background-image: -webkit-gradient(to bottom, #2cf956, #06d530);
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  color: #000000;
  font-family: Verdana;
  font-size: 11px;
  padding: 11px;
  -webkit-box-shadow: 1px 1px 20px 0 #24c691;
  -moz-box-shadow: 1px 1px 20px 0 #24c691;
  box-shadow: 1px 1px 20px 0 #24c691;
  text-shadow: 1px 1px 20px #ffffff;
  border: solid #ffffff 1px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
}

#dota2 .card-header button:hover {
  border: solid #ffffff 1px;
  background: #06d530;
  color: #ffffff;
  background-image: -webkit-linear-gradient(top, #06d530, #2cf956);
  background-image: -moz-linear-gradient(top, #06d530, #2cf956);
  background-image: -ms-linear-gradient(top, #06d530, #2cf956);
  background-image: -o-linear-gradient(top, #06d530, #2cf956);
  background-image: -webkit-gradient(to bottom, #06d530, #2cf956);
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  text-decoration: none;
}

#dota2 .card-body {
  overflow: auto;
}

#bannerDOTA {
  height: 600px;
  background-image: url("../assets/dota_banner.jpg");
  background-size: 100vw;
  background-repeat: no-repeat;
  -webkit-box-shadow: 0px 13px 22px -11px rgba(250, 89, 30, 1);
  -moz-box-shadow: 0px 13px 22px -11px rgba(250, 89, 30, 1);
  box-shadow: 0px 13px 22px -11px rgba(250, 89, 30, 1);
}

#bannerDOTA div button {
  margin-top: 300px;
  box-shadow: 4px 0px 29px 9px #ffa856;
  background: linear-gradient(to bottom, #ffbc57 5%, #ff6905 100%);
  background-color: #ffbc57;
  border-radius: 34px;
  border: 1px solid #ff6905;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 10px 31px;
  text-decoration: none;
  text-shadow: 0px 2px 0px #ffbc57;
}

#bannerDOTA div button:hover {
  background: linear-gradient(to bottom, #ff6905 5%, #ffbc57 100%);
  background-color: #ffbc57;
}

#bannerDOTA div button:active {
  position: relative;
  top: 1px;
}
</style>
