<template>
  <div id="login">
    <Navbar />
    <form class="login" @submit.prevent="login">
      <div class="container pt-3">
        <div class="card" style="background-color: #f4f4f4e3; margin-top: 100px">
          <div class="card-header">
            <h1>Login</h1>
          </div>
          <div class="card-body w-100 text-center">
            <div class="row mt-3" v-if="info">
              <span class="text-danger" style="background-color: #f4f4f4e3">{{ msg.general }}</span>
            </div>
            <div class="row">
              <label>Mail adress</label>
            </div>
            <div class="row mt-3">
              <input required v-model="email" type="text" placeholder="Email" />
            </div>
            <div class="row mt-3">
              <span class="text-danger" v-if="msg.email" style="background-color: #f4f4f4e3">{{ msg.email }}</span>
            </div>
            <div class="row mt-3">
              <label>Password</label>
            </div>
            <div class="row mt-3">
              <input required v-model="password" type="password" />
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
  import ENV, { API_BACKEND } from "../../env.config";
  import Navbar from "@/components/NavBar.vue";
  /**
 * Views used tologin a user
 * @displayName Login
 */
  export default {
    name: "Login",
    components: {
      Navbar,
    },
    data() {
      return {
         /**
       * Variable saves the user's input in email field
       */
        email: "",
         /**
       * Variable saves the user's input in password field
       */
        password: "",
         /**
       * Variable saves the error messages
       */
        msg: [],
         /**
       * State if error in validation
       */
        info : false,
      };
    },
    /**
   * This hook is used to set datas using the router params
   * @public
   */
    async mounted() {
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(";");
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
            this.$router.push({
              path: "/",
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
      /**
     * Methods used to validate the format of the Email
     * @param value Email to check
     * @public
     */
      validateEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          this.msg["email"] = "";
        } else {
          this.msg["email"] = "Adresse Email incorecte";
        }
      },
      /**
     * Methods used to check if credentials matchs with the database
     * @public
     */
      async login() {
        let response = {};
        let profile = {};
        const body = {
          email: this.email,
          password: this.password,
        };
        let requestStatus;
        await fetch(`http://${ENV.API_BACKEND}/auth/login/`, {
            method: "Post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(body),
          })
          .then((res) => res.clone().json())
          .then((json) => (response = json))
          .catch(err => {
            console.error(err);
          });
        if (response.statusCode == 500) {
         this.msg["general"] = "Login Fail invalid credential";
         this.info = true;
        } else {
          const date = new Date(Date.now() + 86400000);
          document.cookie =
            "My_FunSport_Token=" +
            response.access_token +
            "; expires=" +
            date +
            "; path=/;SameSite=LAX;";

          await fetch(`http://${ENV.API_BACKEND}/profile`, {
              method: "GET",
              headers: {
                authorization: "Bearer " + response.access_token,
              },
            })
            .then((res) => res.clone().json())
            .then((json) => (profile = json));
          this.$store.state.UserData.id = profile.id;
          this.$store.state.UserData.email = profile.email;
          this.$store.state.UserData.firstName = profile.firstName;
          this.$store.state.UserData.lastName = profile.lastName;
          this.$store.state.UserData.phone = profile.phone;
          this.$store.state.UserData.isAdmin = profile.isAdmin;
          this.$store.dispatch("getMySports");
          this.$router.push({
            path: "/",
          });
        }
      },
    },
  };
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

  .card-header {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
    color: #ffffff !important;
    border-bottom: 3px solid rgb(255, 255, 255);
    background: rgb(131, 58, 180);
    background: linear-gradient(90deg, rgba(194, 6, 62, 0.527) 0%, rgba(6, 188, 194, 0.527) 50%, rgb(69, 252, 124) 100%);
  }

  .card-body {
    background: rgb(174, 238, 230);
    background: -moz-radial-gradient(circle, rgba(174, 238, 230, 1) 17%, rgba(31, 121, 236, 1) 100%);
    background: -webkit-radial-gradient(circle, rgba(174, 238, 230, 1) 17%, rgba(31, 121, 236, 1) 100%);
    background: radial-gradient(circle, rgba(174, 238, 230, 1) 17%, rgba(31, 121, 236, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#aeeee6", endColorstr="#1f79ec", GradientType=1);
  }
</style>