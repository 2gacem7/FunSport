<template>
  <div id="csgo">
    <Navbar />
    <TabBar />
    <div id="banner">
      <AddMySport />
    </div>
    <div class="card-deck m-0 p-0 justify-content-between">
      <DisplayLive sport="CS-GO" apiName="cs-go" :delButton="false" />
      <DisplaySearch sport="CS-GO"  apiName="csgo" />
      <DisplayRanking sport="CS-GO" apiName="csgo" />
      <DisplayListTeam sport="CS-GO" apiName="csgo" />
    </div>
    <div class="card-deck m-0 p-0 justify-content-between">
      <DisplayCalendar sport="CS-GO" apiName="csgo" />
      <img class="m-5" src="../assets/sniper.png">
      <DisplayLastResults sport="CS-GO" apiName="csgo" />
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
 * View where you can find all components for the CSGO game
 * @displayName CSGO
 */
  export default {
    name: "CSGO",
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
  }
</script>
<style>
  .content {
    padding-top: 70px;
    padding-left: 220px;
  }

  .update {
    font-size: 0.75rem !important;
  }

  #csgo .card {
    overflow: auto;
    -webkit-box-shadow: 0px 0px 12px 10px rgba(194, 6, 6, 1);
    -moz-box-shadow: 0px 0px 12px 10px rgba(194, 6, 6, 1);
    box-shadow: 0px 0px 12px 10px rgba(194, 6, 6, 1);
  }

  #csgo .card-header {
    font-family: "counter-strike";
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
    color: #ffffff !important;
    border-bottom: 1px solid rgba(194, 6, 6, 1);
    background: rgb(131, 58, 180);
    background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
  }

  #csgo .card-header button {

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

  #banner {
    height: 350px;
    width: 100;
    background-image: url("../assets/csgo_banner.jpg");
    background-size: 100vw;
    background-repeat: no-repeat;
    -webkit-box-shadow: 0px 13px 22px -11px rgba(173, 9, 9, 1);
    -moz-box-shadow: 0px 13px 22px -11px rgba(173, 9, 9, 1);
    box-shadow: 0px 13px 22px -11px rgba(173, 9, 9, 1);
  }

  #banner div button {
    margin-top: 175px;
    box-shadow: 4px 0px 29px 9px #c21b1b;
    background: linear-gradient(to bottom, #eb6161 5%, #ff0505 100%);
    background-color: #eb6161;
    border-radius: 34px;
    border: 1px solid #ab1919;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 2px 0px #662828;
  }

  #banner div button:hover {
    background: linear-gradient(to bottom, #ff0505 5%, #eb6161 100%);
    background-color: #ff0505;
  }

  #banner div button:active {
    position: relative;
    top: 1px;
  }
</style>

<style scoped>
  body {
    background-color: rgb(29, 28, 28);
    color: white;
  }
</style>