import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserData: [{
      id: "",
      name: "",
      email: "",
      services: [],
      widgets: [],
    }],
    ServicesAvailable: [{
      name: "weather",
      widgets: [{
        name: "city_temperature",
        description: "Display temperature for a city",
        params: [{
          name: "city",
          type: "string",
        }]
      },
      {
        name: "city_humidity",
        description: "Display humidity for a city",
        params: [{
          name: "city",
          type: "string",
        }]
      }]
    },
    {
      name: "rss",
      widgets: [{
        name: "article_list",
        description: "Display the list of the last articles",
        params: [{
          name: "link",
          type: "string",
        },
        {
          name: "number",
          type: "integer",
        }
        ]
      }]
    },

    ]
  },
  mutations: {
  },
  actions: {
    async getUserData() {
      let profile = null;
      let list = null;
      if (document.cookie.length > 0) {
        let cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
          if (cookieArray[i].indexOf("My_Dashboard_Token") != -1) {
            const cookiename = "My_Dashboard_Token=";
            const access_token = cookieArray[i].substring(cookiename.length, cookieArray[i].length);
            await fetch("http://localhost:3000/profile", {
              "method": "GET",
              "headers": {
                "authorization": "Bearer " + access_token
              }
            })
              .then(res => res.clone().json())
              .then(json => profile = json);
            this.state.UserData[0].id = profile.id;
            this.state.UserData[0].email = profile.email;

            await fetch("http://localhost:3000/services", {
              "method": "GET",
              "headers": {
                "authorization": "Bearer " + access_token
              }
            })
              .then(res => res.clone().json())
              .then(json => list = json);
            this.state.UserData[0].services = list;

            let widgets = null;
            await fetch("http://localhost:3000/widgets", {
              "method": "GET",
              "headers": {
                "authorization": "Bearer " + access_token
              }
            })
              .then(res => res.clone().json())
              .then(json => widgets = json);
            this.state.UserData[0].widgets = widgets;
          }
        }

      }
    },




  },
  modules: {},
  methods: {


  }
})