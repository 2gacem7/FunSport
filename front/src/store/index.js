import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserData: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      isAdmin: ""
    },
    access_token: "",
    MySports: [],
    MyFavorites: [],
    sports: [
      { id: 0, name: "CS-GO" },
      { id: 1, name: "LOL" }
    ],
    tabSelected: {
      id: "",
      name: ""
    }
  },
  mutations: {
    setSports(state, payload) {
      state.sports = payload
      state.tabSelected = {
        id: state.sports[0]._id,
        name: state.sports[0].name
      }
    },
    setTabSelected(state, payload) {
      state.tabSelected = payload
    },
    setMyFavorites(state, payload) {
      state.MyFavorites = payload
    },
    setAccessToken(state) {
      let access_token = ""
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(";")
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
            const cookiename = "My_FunSport_Token="
            access_token = cookieArray[i].substring(
              cookiename.length,
              cookieArray[i].length
            )
          }
        }
      }
      state.access_token = access_token
    },
  },
  actions: {
    async getSports(context) {
      await fetch("http://localhost:3000/sports")
        .then(res => res.json())
        .then(res => context.commit('setSports', res));
    },
    async getMyFavorites(context) {
      context.commit('setAccessToken')
      if (context.state.access_token != '') {
        await fetch("http://localhost:3000/myfavorites",
          {
            "method": "GET",
            "headers": {
              "authorization": "Bearer " + context.state.access_token
            },
            mode:'cors'
          }
        )
          .then(res => res.json())
          .then(res => context.commit('setMyFavorites', res));
      }
    },
    async addToMyFavorites(context,value) {
      context.commit('setAccessToken')
      if (context.state.access_token != '') {
        await fetch("http://localhost:3000/myfavorites", {
          method: "Post",
          headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + context.state.access_token
          },
          mode:'cors',
          body: JSON.stringify(value),
        })
          .then(context.dispatch('getMyFavorites'));
      }
    },

    async getUserData() {
      let profile = null;
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
            const cookiename = "My_FunSport_Token=";
            const access_token = cookieArray[i].substring(cookiename.length, cookieArray[i].length);
            this.state.access_token = access_token;
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
            this.state.UserData.isAdmin= profile.isAdmin;
          }
        }
      }
    },
    async getMySports() {
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
            const cookiename = "My_FunSport_Token=";
            const access_token = cookieArray[i].substring(cookiename.length, cookieArray[i].length);
            let mySports = [];
            await fetch("http://localhost:3000/mysports", {
              "method": "GET",
              "headers": {
                "authorization": "Bearer " + access_token
              }
            })
              .then(res => res.clone().json())
              .then(json => mySports = json);
            for (let i = 0; i < mySports.length; i++) {
              let tmp = null;
              await fetch("http://localhost:3000/sports/" + mySports[i].sportId, {
                "method": "GET",
                "headers": {
                  "authorization": "Bearer " + access_token
                }
              })
                .then(res => res.clone().json())
                .then(json => tmp = json);
              mySports[i].name = tmp.name
            }
            this.state.MySports = mySports;
          }
        }
      }
    }

  },
  modules: {},
  methods: {
  }
})
