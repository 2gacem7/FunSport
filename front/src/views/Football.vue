<template>
  <div id="football" style="background-color:#06D530;height:140vh">
    <Navbar />
    <TabBar />
    <div id="bannerFootball">
      <AddMySport />
    </div>
    <div class="card-deck m-0 p-0">
      <FootballRanking />
      <FootballCalendar />
      <FootballLive />

    </div>
  </div>
</template>

<script>
  import ENV from "../../env.config";
  import Navbar from "@/components/NavBar.vue";
  import TabBar from "@/components/TabBar.vue";
  import AddMySport from "@/components/AddMySport.vue";

  import FootballRanking from "@/components/FootballRanking.vue";
  import FootballCalendar from "@/components/FootballCalendar.vue";
  import FootballLive from "@/components/FootballLive.vue";


  export default {
    name: "Football",
    components: {
      Navbar,
      TabBar,
      AddMySport,
      FootballRanking,
      FootballCalendar,
      FootballLive,
    },
    data() {
      return {};
    },
    mounted() {},

    methods: {

    }
  }
</script>

<style>
  #football .card {
    overflow: auto;
    -webkit-box-shadow: 0px 0px 12px 10px rgb(244, 255, 34);
    -moz-box-shadow: 0px 0px 12px 10px rgb(244, 255, 34);
    box-shadow: 0px 0px 12px 10px rgb(244, 255, 34);
  }

  #football .card-header {
    font-family: "football";
    letter-spacing: 3px;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
    color: #ffffff !important;
    border-bottom: 1px solid rgba(194, 6, 6, 1);
    background: rgb(24, 154, 0);
    background: linear-gradient(90deg, rgba(24, 154, 0, 1) 0%, rgba(239, 252, 69, 1) 100%);
  }

  #football .card button {
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

  #csgo .card-header button:hover {
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

  #csgo .card-body {
    overflow: auto;
  }

  #bannerFootball {
    height: 700px;
    width: 100;
    background-image: url("../assets/football_banner.jpg");
    background-size: 100vw;
    background-size: 90v;
    background-repeat: no-repeat;
    -webkit-box-shadow: 0px 13px 22px -11px rgb(1, 112, 4);
    -moz-box-shadow: 0px 13px 22px -11px rgb(1, 112, 4);
    box-shadow: 0px 13px 22px -11px rgb(1, 112, 4);
  }

  #bannerFootball div button {
    margin-top: 380px;
    box-shadow: 4px 0px 29px 9px rgb(1, 112, 4);
    background: linear-gradient(to bottom, rgb(48, 255, 55) 5%, rgb(0, 130, 4) 100%);
    background-color: rgb(0, 130, 4);
    border-radius: 34px;
    border: 1px solid rgb(48, 255, 55);
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 2px 0px rgb(0, 130, 4);
  }

  #bannerFootball div button:hover {
    background: linear-gradient(to bottom, rgb(0, 130, 4) 5%, rgb(48, 255, 55) 100%);
    background-color: #ff0505;
  }

  #banner div button:active {
    position: relative;
    top: 1px;
  }
</style>

<style scoped>
  body {
    background-color: rgb(11, 169, 169);
    color: white;
  }
</style>