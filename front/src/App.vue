<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "counter-strike";
  src: local("counter-strike"),
   url(./fonts/cs_regular.ttf) format("truetype");
}
@font-face {
  font-family: "dota2";
  src: local("dota2"),
   url(./fonts/TrajanPro-Bold.woff) format("woff");
}
@font-face {
  font-family: "football";
  src: local("football"),
   url(./fonts/SoccerLeague.ttf) format("truetype");
}

body{
  background-color: black;
}
</style>