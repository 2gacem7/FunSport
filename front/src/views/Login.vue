<template>
  <div id="login">
    <Navbar />
    <form class="login" @submit.prevent="login">
      <div class="container pt-3">
        <div class="card " style="background-color:#f4f4f4e3;margin-top:100px">
          <div class="card-header">
            <h1>Login</h1>
          </div>
          <div class="card-body w-100 text-center">
            <div class="row">
              <label>Mail adress</label>
            </div>
            <div class="row mt-3">
              <input required v-model="email" type="text" placeholder="Email" />
            </div>
            <div class="row mt-3">
              <span class="text-danger" v-if="msg.email" style="background-color:#f4f4f4e3;">{{msg.email}}</span>
            </div>
            <div class="row mt-3">
              <label>Password</label>
            </div>
            <div class="row mt-3">
              <input required v-model="password" type="password" />
            </div>
            <div class="row mt-3">
              <span class="text-danger" v-if="msg.general" style="background-color:#f4f4f4e3;">{{msg.general}}</span>
            </div>
            <div class="row mt-3">
              <button type="submit" class="btn btn-info">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Navbar from "@/components/NavBar.vue"
  export default {
    name: 'Login',
    components: {
      Navbar,
    },
    data() {
      return {
        email: "",
        password: "",
        msg: []
      }
    },
    async mounted() {
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
            this.$router.push({
              path: '/'
            });
          }
        }
      }
    },
    watch: {
      email(value) {
        this.email = value;
        this.validateEmail(value);
      }
    },
    methods: {
      validateEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          this.msg['email'] = '';
        } else {
          this.msg['email'] = 'Adresse Email incorecte';
        }
      },
      async login() {
        let response = {};
        let profile = {};
        const body = {
          email: this.email,
          password: this.password
        }
        await fetch("http://localhost:3000/auth/login/", {
            "method": "Post",
            "headers": {
              "content-type": "application/json"
            },
            "body": JSON.stringify(body)
          })
          .then(res => res.clone().json())
          .then(json => response = json);
        const date = new Date(Date.now() + 86400000)
        document.cookie = "My_FunSport_Token=" + response.access_token + "; expires=" + date +
          "; path=/;SameSite=LAX;";

         await fetch("http://localhost:3000/profile", {
          "method": "GET",
          "headers": {
            "authorization": "Bearer " + response.access_token
          }
        })
        .then(res => res.clone().json())
        .then(json => profile = json);
        this.$store.state.UserData.id = profile.id;
        this.$store.state.UserData.email = profile.email;
        this.$store.state.UserData.firstName = profile.firstName;
        this.$store.state.UserData.lastName = profile.lastName;
        this.$router.push({
          path: '/'
        });
      }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
.card-body{
  background-color: rgb(72, 99, 255);
  font-family: 'Roboto Mono', monospace;
}
.card-header{
  background-color: rgba(72, 99, 255, 0.515);
  font-family: 'Roboto Mono', monospace;
}
</style>