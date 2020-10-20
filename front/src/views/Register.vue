<template>
  <div id="register">
    <Navbar />
    <div class="container pt-3" style="padding-bottom: 100vh">
      <div class="card" style="background-color: #f4f4f4e3; margin-top: 100px">
        <div class="card-header">
          <h1>Register</h1>
        </div>
        <div class="card-body w-100 mx-auto">
          <div class="row mt-3" v-if="info === true">
            <span
              class="text-danger"
              v-if="msg.general"
              style="background-color: #f4f4f4e3"
              >{{ msg.general }}</span
            >
          </div>
          <div class="row mt-2">
            <label>firstName</label>
          </div>
          <div class="row mt-2">
            <input
              type="text"
              name="name"
              required
              placeholder="firstName"
              v-model="firstName"
            />
          </div>
          <div class="row mt-3">
            <span
              class="text-danger"
              v-if="msg.firstName"
              style="background-color: #f4f4f4e3"
              >{{ msg.firstName }}</span
            >
          </div>
          <div class="row mt-2">
            <label>LastName</label>
          </div>
          <div class="row mt-2">
            <input
              type="text"
              name="name"
              required
              placeholder="LastName"
              v-model="lastName"
            />
          </div>
          <div class="row mt-3">
            <span
              class="text-danger"
              v-if="msg.lastName"
              style="background-color: #f4f4f4e3"
              >{{ msg.lastName }}</span
            >
          </div>
          <div class="row mt-2">
            <label>Phone</label>
          </div>
          <div class="row mt-2">
            <input
              type="text"
              name="phone"
              required
              placeholder="phone"
              v-model="phone"
            />
          </div>
          <div class="row mt-3">
            <span
              class="text-danger"
              v-if="msg.phone"
              style="background-color: #f4f4f4e3"
              >{{ msg.phone }}</span
            >
          </div>
          <div class="row mt-2">
            <label>Mail Adress</label>
          </div>
          <div class="row mt-2">
            <input
              type="text"
              name="email"
              required
              placeholder="email"
              v-model="email"
            />
          </div>
          <div class="row mt-3">
            <span
              class="text-danger"
              v-if="msg.email"
              style="background-color: #f4f4f4e3"
              >{{ msg.email }}</span
            >
          </div>
          <div class="row mt-2">
            <label>Password</label>
          </div>
          <div class="row mt-2">
            <input
              type="password"
              name="password"
              required
              v-model="password"
            />
          </div>
          <div class="row mt-3">
            <span
              class="text-danger"
              v-if="msg.password"
              style="background-color: #f4f4f4e3"
              >{{ msg.password }}</span
            >
          </div>
          <div class="row mt-2">
            <label>Password Confirm</label>
          </div>
          <div class="row mt-2">
            <input
              type="password"
              name="passwordComfirme"
              required
              v-model="passwordComfirme"
            />
          </div>
          <div class="row mt-3">
            <span
              class="text-danger"
              v-if="msg.passwordComfirme"
              style="background-color: #f4f4f4e3"
              >{{ msg.passwordComfirme }}</span
            >
          </div>
          <div class="row mt-2">
            <button class="btn btn-info" @click="register()">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from "../../env.config";
import Navbar from "@/components/NavBar.vue";
/**
 * View where the new user can register
 * @displayName Register
 */
export default {
  name: "Register",
  components: {
    Navbar,
  },
  data() {
    return {
      /**
       * Variable saves the user's input in firstName field
       */
      firstName: "",
      /**
       * Variable saves the user's input in lastName field
       */
      lastName: "",
      /**
       * Variable saves the user's input in phone field
       */
      phone: "",
      /**
       * Variable saves the user's input in email field
       */
      email: "",
      /**
       * Variable saves the user's input in password field
       */
      password: "",
      /**
       * Variable saves the user's input in confirmation password field
       */
      passwordComfirme: "",
      /**
       * Variable saves the error messages
       */
      msg: [],
      /**
       * Variable saves the state of each validator
       */
      validator: [],
      /**
       * State if error in validation
       */
      info: false,
    };
  },
  watch: {
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
    firstName(value) {
      this.firstName = value;
      this.validateFirstName(value);
    },
    lastName(value) {
      this.lastName = value;
      this.validateLastName(value);
    },
    phone(value) {
      this.phone = value;
      this.validatePhone(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
    passwordComfirme(value) {
      this.passwordComfirme = value;
      this.validatePasswordComfirme(value);
    },
  },
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
    this.validator["email"] = false;
    this.validator["firstName"] = false;
    this.validator["lastName"] = false;
    this.validator["phone"] = false;
    this.validator["password"] = false;
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
        this.validator["email"] = true;
      } else {
        this.msg["email"] = "Incorrect email address";
        this.validator["email"] = false;
      }
    },
    /**
     * Methods used to validate the format of the FirstName
     * @param value firstName to check
     * @public
     */
    validateFirstName(value) {
      if (/^[a-zA-Z0-9_]{1,16}$/.test(value)) {
        this.msg["firstName"] = "";
        this.validator["firstName"] = true;
      } else {
        this.msg["firstName"] =
          "Your fisrtname must contain between 1 and 16 characters";
        this.validator["firstName"] = false;
      }
    },
    /**
     * Methods used to validate the format of the lasttName
     * @param value lastName to check
     * @public
     */
    validateLastName(value) {
      if (/^[a-zA-Z0-9_]{1,16}$/.test(value)) {
        this.msg["lastName"] = "";
        this.validator["lastName"] = true;
      } else {
        this.msg["lastName"] =
          "Your lastname must contain between 1 and 16 characters";
        this.validator["lastName"] = false;
      }
    },
    /**
     * Methods used to validate the format of the phone
     * @param value phone to check
     * @public
     */
    validatePhone(value) {
      if (/^(\d\d\s){4}(\d\d)$/.test(value)) {
        this.msg["phone"] = "";
        this.validator["phone"] = true;
      } else {
        this.msg["phone"] = "Your number must be like 00 00 00 00 00";
        this.validator["phone"] = false;
      }
    },
    /**
     * Methods used to validate the format of the password
     * @param value password to check
     * @public
     */
    validatePassword(value) {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/.test(value)) {
        this.msg["password"] = "";
      } else {
        this.msg["password"] =
          "Your password must have a minimum of 8 characters (1 uppercase, 1 lowercase, 1 number, 1 special character minimum)";
      }
    },
    /**
     * Methods used to validate the format of the confirmation password
     * @param value confirmation password to check if equal password
     * @public
     */
    validatePasswordComfirme(value) {
      if (this.password === this.passwordComfirme) {
        this.msg["passwordComfirme"] = "";
        this.validator["password"] = true;
      } else {
        this.msg["passwordComfirme"] = "Comfirmation dosen't match";
        this.validator["password"] = false;
      }
    },
    /**
     * Methods used to register a new user
     * @public
     */
    async register() {
      if (
        this.validator.firstName === true &&
        this.validator.lastName === true &&
        this.validator.email === true &&
        this.validator.phone &&
        this.validator.password === true
      ) {
        let body = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password,
        };
        let requestStatus;
        await fetch(`http://${ENV.API_BACKEND}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        }).then((res) => {
          requestStatus = res.status;
        });
        if (requestStatus === 400) {
          this.info = true;
          this.msg["general"] = "Account existing for " + this.email;
        } else {
          let userData = {};
          await fetch(`http://${ENV.API_BACKEND}/auth/login/`, {
            method: "Post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(body),
          })
            .then((res) => res.clone().json())
            .then((json) => (userData = json));
          const date = new Date(Date.now() + 86400000);
          document.cookie =
            "My_FunSport_Token=" +
            userData.access_token +
            "; expires=" +
            date +
            "; path=/;SameSite=LAX;";
          this.$store.dispatch("getUserData");
          this.$store.dispatch("getMySports");
          this.$router.push({
            path: "/",
          });
        }
      } else {
        this.info = true;
        this.msg["general"] = "Information missing in the form";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
.card-body {
  background-color: rgb(72, 99, 255);
  font-family: "Roboto Mono", monospace;
}
.card-header {
  background-color: rgba(72, 99, 255, 0.515);
  font-family: "Roboto Mono", monospace;
}
</style>