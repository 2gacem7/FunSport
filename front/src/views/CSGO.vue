<template>
  <div class="home">
    <Navbar />
    <TabBar/>
    <b-card class=" container-fluid listcsgo bg-dark" style="max-width:30rem">
     <h4>CSGO Team's </h4>
      <Listcsgo />
    </b-card>
    <AddMySport />
    CSGO
    <b-card class=" col-md-4"><CalendarCsgo /></b-card>
  </div>
</template>

<script>
  import Navbar from "@/components/NavBar.vue";
  import TabBar from "@/components/TabBar.vue";
  import Listcsgo from "@/components/Listcsgo.vue";

      
        import CalendarCsgo from "@/components/CalendarCsgo.vue";

      import AddMySport from "@/components/AddMySport.vue";

  export default {
    name: "CSGO",
    components: {
      Navbar,
      TabBar,
      Listcsgo,
      AddMySport,
      CalendarCsgo
    },
    data() {
      return {
      };
    },
    mounted() {

    },
    methods: {

      getCookie() {
        let access_token = "";
        if (document.cookie.length > 0) {
          let cookieArray = document.cookie.split(";");
          for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
              const cookiename = "My_FunSport_Token=";
              access_token = cookieArray[i].substring(
                cookiename.length,
                cookieArray[i].length
              );
            }
          }
        }
        return access_token;
      },
    },
  };
</script>
<style>
  .content {
    padding-top: 70px;
    padding-left: 220px;
  }

  body {
    background-color: rgb(29, 28, 28);
    color: white;
  }

  .update {
    font-size: 0.75rem !important;
  }
  h4{
  font-family: counter-strike;
  color:white;
}

</style>