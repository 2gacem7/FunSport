<template>
  <div class="home">
    <Navbar />
  </div>
</template>

<script>
  import Navbar from "@/components/NavBar.vue";
  export default {
    name: "Home",
    components: {
      Navbar,
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
</style>