<template>
  <div id="dota2" class="pb-5" style="background-color:rgb(255, 174, 145)">
    <Navbar />
    <TabBar />
    <div id="bannerDOTA" v-if="windowWidth > 1000">
      <AddMySport />
    </div>
    <div v-else class="addDOTA2 w-100 mx-auto">
      <AddMySport />
    </div>
    <div class="card-deck m-0 p-0 justify-content-between">
      <DisplayLive sport="DOTA2" apiName="dota2" :delButton="false" />
      <DisplaySearch sport="DOTA2" apiName="dota2" />
      <DisplayRanking sport="DOTA2" apiName="dota2" />
      <DisplayListTeam sport="DOTA2" apiName="dota2" />
    </div>
    <div class="card-deck m-0 p-0 justify-content-between">
      <DisplayCalendar sport="DOTA2" apiName="dota2" />
      <img v-if="windowWidth > 1000" class="m-5 p-5" style="margin-top: -35px" src="../assets/dota2_logo.png">
      <DisplayLastResults sport="DOTA2" apiName="dota2" />
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
  import DisplayLive from "@/components/DisplayLive.vue"
  import DisplayLastResults from "@/components/DisplayLastResults.vue";
  import DisplayRanking from "@/components/DisplayRanking.vue";

  import DisplaySearch from "@/components/DisplaySearch.vue";


  /**
   * View where you can find all components for the DOTA2 game
   * @displayName DOTA2
   */
  export default {
    name: "DOTA2",
    components: {
      Navbar,
      TabBar,
      AddMySport,
      DisplayCalendar,
      DisplayLive,
      DisplayListTeam,
      DisplayLastResults,
      DisplayRanking,
      DisplaySearch
    },
    data() {
      return {
        windowWidth: window.innerWidth
      };
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    },
  }
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
    background: linear-gradient(90deg, rgba(255, 90, 0, 1) 0%, rgba(253, 156, 29, 1) 76%, rgba(239, 252, 69, 1) 100%);
  }

  #dota2 .card-header button {
    background: #2CF956;
    background-image: -webkit-linear-gradient(top, #2CF956, #06D530);
    background-image: -moz-linear-gradient(top, #2CF956, #06D530);
    background-image: -ms-linear-gradient(top, #2CF956, #06D530);
    background-image: -o-linear-gradient(top, #2CF956, #06D530);
    background-image: -webkit-gradient(to bottom, #2CF956, #06D530);
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    color: #000000;
    font-family: Verdana;
    font-size: 11px;
    padding: 11px;
    -webkit-box-shadow: 1px 1px 20px 0 #24C691;
    -moz-box-shadow: 1px 1px 20px 0 #24C691;
    box-shadow: 1px 1px 20px 0 #24C691;
    text-shadow: 1px 1px 20px #FFFFFF;
    border: solid #FFFFFF 1px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    text-align: center;
  }

  #dota2 .card-header button:hover {
    border: solid #FFFFFF 1px;
    background: #06D530;
    color: #ffffff;
    background-image: -webkit-linear-gradient(top, #06D530, #2CF956);
    background-image: -moz-linear-gradient(top, #06D530, #2CF956);
    background-image: -ms-linear-gradient(top, #06D530, #2CF956);
    background-image: -o-linear-gradient(top, #06D530, #2CF956);
    background-image: -webkit-gradient(to bottom, #06D530, #2CF956);
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

  .addDOTA2 div button{
    margin-top: 10px;
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

   .addDOTA2 div button:hover{
    background: linear-gradient(to bottom, #ff6905 5%, #ffbc57 100%);
    background-color: #ffbc57;
  }

    .addDOTA2 div button:active {
    position: relative;
    top: 1px;
  }


</style>