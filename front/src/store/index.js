import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserData: {
      id: "",
      email: "",
      firstName:"",
      lastName: "",
      phone: ""
    },
    MySports: []
  },
  mutations: {
  },
  actions: {
    async getUserData() {
      let profile = null;
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
            const cookiename = "My_FunSport_Token=";
            const access_token = cookieArray[i].substring(cookiename.length, cookieArray[i].length);
            await fetch("http://localhost:3000/profile", {
              "method": "GET",
              "headers": {
                "authorization": "Bearer " + access_token
              }
            })
              .then(res => res.clone().json())
              .then(json => profile = json);
            this.state.UserData.id = profile.id;
            this.state.UserData.email = profile.email;
            this.state.UserData.firstName = profile.firstName;
            this.state.UserData.lastName = profile.lastName;
            this.state.UserData.phone = profile.phone;
          }
        }
      }
    },

  },
  modules: {},
  methods: {
  }
})