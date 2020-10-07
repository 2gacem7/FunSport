<template>
  <div class="home">
    <Navbar />
    <TabBar/>
    <b-card class=" col-md-4"><CalendarCsgo /></b-card>
  </div>
</template>

<script>
  import Navbar from "@/components/NavBar.vue";
      import TabBar from "@/components/TabBar.vue";
        import CalendarCsgo from "@/components/CalendarCsgo.vue";

  export default {
    name: "Home",
    components: {
      Navbar,
      TabBar,
      CalendarCsgo
    },
    data() {
      return {
        tabSelected:""
      };
    },
    mounted() {
      this.tabSelected = this.$store.state.sports[0].id
    },
    methods: {
      go(idTab){
        this.tabSelected = idTab
        this.$router.push({name:this.$store.state.sports[idTab].name})
      },
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
</style>