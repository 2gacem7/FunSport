<template>
  <div id="lol" style="background-color:rgba(131, 58, 180, 1)">
    <Navbar />
    <TabBar />
    <div id="bannerLOL">
      <AddMySport />
    </div>
    <div class="card-deck m-0 p-0 justify-content-between">
      <DisplayLive sport="LOL" apiName="lol" :delButton="false" />
      <DisplaySearch apiName="lol" />
      <DisplayRanking sport="LOL" apiName="lol" />
      <DisplayListTeam sport="LOL" apiName="lol" />
    </div>
    <div class="card-deck m-0 p-0 justify-content-between">
      <DisplayCalendar sport="LOL" apiName="lol" />
      <img class="mb-5 mr-5 ml-5" style="margin-top: -35px" src="../assets/lol_logo.png">
      <DisplayLastResults sport="LOL" apiName="lol" />
    </div>
  </div>
</template>

<script>
  import ENV from "../../env.config";
  import Navbar from "@/components/NavBar.vue";
  import TabBar from "@/components/TabBar.vue";
  import AddMySport from "@/components/AddMySport.vue";

  import DisplayLive from "@/components/DisplayLive.vue";
  import DisplayLastResults from "@/components/DisplayLastResults.vue";
  import DisplayListTeam from "@/components/DisplayListTeam.vue";
  import DisplayCalendar from "@/components/DisplayCalendar.vue";
  import DisplayRanking from "@/components/DisplayRanking.vue";

  import DisplaySearch from "@/components/DisplaySearch.vue";


/**
 * View where you can find all components for the LOL game
 * @displayName LOL
 */
  export default {
    name: "Lol",
    components: {
      Navbar,
      TabBar,
      AddMySport,
      DisplayLive,
      DisplayLastResults,
      DisplayCalendar,
      DisplayListTeam,
      DisplayRanking,
      DisplaySearch
    },
  };
</script>
<style>
@import url(//db.onlinewebfonts.com/c/5522a80b4a47626c01fb49f6fad2de65?family=ITC+Friz+Quadrata);
  @font-face {
    font-family: "ITC Friz Quadrata";
    src: url("//db.onlinewebfonts.com/t/5522a80b4a47626c01fb49f6fad2de65.eot");
    src: url("//db.onlinewebfonts.com/t/5522a80b4a47626c01fb49f6fad2de65.eot?#iefix") format("embedded-opentype"),
      url("//db.onlinewebfonts.com/t/5522a80b4a47626c01fb49f6fad2de65.woff2") format("woff2"),
      url("//db.onlinewebfonts.com/t/5522a80b4a47626c01fb49f6fad2de65.woff") format("woff"),
      url("//db.onlinewebfonts.com/t/5522a80b4a47626c01fb49f6fad2de65.ttf") format("truetype"),
      url("//db.onlinewebfonts.com/t/5522a80b4a47626c01fb49f6fad2de65.svg#ITC Friz Quadrata") format("svg");
  }

  .content {
    padding-top: 70px;
    padding-left: 220px;
  }

  .update {
    font-size: 0.75rem !important;
  }

  #lol .card {
    overflow: auto;
    -webkit-box-shadow: 0px 0px 12px 10px rgb(207, 100, 243);
    -moz-box-shadow: 0px 0px 12px 10px rgba(207, 100, 243);
    box-shadow: 0px 0px 12px 10px rgba(207, 100, 243);
  }

  #lol .card-header {
    font-family: "ITC Friz Quadrata";
    text-shadow: 0px 0px 10px rgba(202, 109, 231, 0.91);
    color: #ffffff !important;
    border-bottom: 1px solid rgb(255, 206, 251);
    background: rgb(131, 58, 180);
    background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(29, 225, 253, 1) 76%, rgba(69, 252, 115, 1) 100%);
  }

  #lol .card-header button {
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

  #lol .card-header button:hover {
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

  #lol .card-body {
    overflow: auto;
  }

  #bannerLOL {
    height: 490px;
    background-image: url("../assets/lol_banner.png");
    background-size: 100vw;
    background-repeat: no-repeat;
  }

  #bannerLOL div button {
    margin-top: 240px;
    box-shadow: 4px 0px 29px 9px #ba1bc2;
    background: linear-gradient(to bottom, #cdb2f7 5%, #ff05b8 100%);
    background-color: #f75ccb;
    border-radius: 34px;
    border: 1px solid #ba1bc2;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 2px 0px #490a4d;
  }

  #bannerLOL div button:hover {
    background: linear-gradient(to bottom, #ff05b8 5%, #cdb2f7 100%);
    background-color: #f75ccb;
  }

  #bannerLOL div button:active {
    position: relative;
    top: 1px;
  }
</style>