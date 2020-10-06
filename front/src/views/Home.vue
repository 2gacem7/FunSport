<template>
  <div class="home">
    <Navbar />
    <sidebar v-if="this.$store.state.UserData[0].id != ''" />
    <addService v-if="subButton" />

    <addWidgetWeather v-if="addWidgetWeatherButton" :add="true" :update="false" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />
    <addWidgetWeather v-if="updateWidgetWeatherButton" :add="false" :update="true" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />

    <addWidgetTodo v-if="addWidgetTodoButton" :add="true" :update="false" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />
    <addWidgetTodo v-if="updateWidgetTodoButton" :add="false" :update="true" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />

    <addWidgetCovid v-if="addWidgetCovidButton" :add="true" :update="false" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />
    <addWidgetCovid v-if="updateWidgetCovidButton" :add="false" :update="true" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />

    <addWidgetYoutube v-if="addWidgetYoutubeButton" :add="true" :update="false" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />
    <addWidgetYoutube v-if="updateWidgetYoutubeButton" :add="false" :update="true" :data="dataWidgetSelected"
      :info="infoWidgetSelected" />

    <addWidgetTime v-if="addWidgetTimeButton" :add="true" :update="false" :dataW="dataWidgetSelected"
      :infoW="infoWidgetSelected" />
    <addWidgetTime v-if="updateWidgetTimeButton" :add="false" :update="true" :dataW="dataWidgetSelected"
      :infoW="infoWidgetSelected" />

    <div class="content">
      <div v-if="this.$store.state.UserData[0].widgets.length == 0 && this.$store.state.UserData[0].id.length != 0">
        No
        widgets added
      </div>
      <div class="text-center" v-if="this.$store.state.UserData[0].id.length == 0">
        Login or Create an account for access
        to your Dashboard !
      </div>
      <div class="card-group w-100" v-if="this.$store.state.UserData[0].widgets.length != 0">
        <div class="card m-3" style="color:black;max-width:300px;min-width:300px"
          v-for="widget in this.$store.state.UserData[0].widgets" v-bind:key="widget.id">
          <WidgetWeather :datas="widget" v-if="widget.typeWidget == 'weather'" v-on:editwidget="editWidget"
            v-on:delwidget="delWidget" />
          <WidgetTime :datas="widget" v-if="widget.typeWidget == 'time'" v-on:editwidget="editWidget"
            v-on:delwidget="delWidget" />
          <WidgetTodo :datas="widget" v-if="widget.typeWidget == 'todo'" v-on:editwidget="editWidget"
            v-on:delwidget="delWidget" />
          <WidgetCovid :datas="widget" v-if="widget.typeWidget == 'covid'" v-on:editwidget="editWidget"
            v-on:delwidget="delWidget" />
          <WidgetYoutube :datas="widget" v-if="widget.typeWidget == 'youtube'" v-on:editwidget="editWidget"
            v-on:delwidget="delWidget" />
        </div>
      </div>
      <p v-if="this.$store.state.UserData[0].widgets.length != 0" class="update">Last update {{ lastUpdate | moment("dddd, MMMM Do YYYY, H:mm:ss") }}</p>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import WidgetWeather from "@/components/WidgetWeather.vue";
  import addWidgetWeather from "@/components/AddWidgetWeather.vue";
  import WidgetTime from "@/components/WidgetTime.vue";
  import addWidgetTime from "@/components/AddWidgetTime.vue";
  import WidgetTodo from "@/components/WidgetTodo.vue";
  import addWidgetTodo from "@/components/AddWidgetTodo.vue";
  import WidgetCovid from "@/components/WidgetCovid.vue";
  import addWidgetCovid from "@/components/AddWidgetCovid.vue";
  import WidgetYoutube from "@/components/WidgetYoutube.vue";
  import addWidgetYoutube from "@/components/AddWidgetYoutube.vue";
  import sidebar from "@/components/Sidebar.vue";
  import addService from "@/components/AddService.vue";

  import Navbar from "@/components/NavBar.vue";
  export default {
    name: "Home",
    components: {
      // EditService,
      Navbar,
      sidebar,
      addService,
      addWidgetWeather,
      WidgetWeather,
      addWidgetTime,
      WidgetTime,
      addWidgetTodo,
      WidgetTodo,
      addWidgetYoutube,
      WidgetYoutube,
      addWidgetCovid,
      WidgetCovid,
    },
    data() {
      return {
        services: [],
        serviceVisible: {},
        editModalVisible: false,
        subButton: false,

        addWidgetWeatherButton: false,
        updateWidgetWeatherButton: false,

        addWidgetTimeButton: false,
        updateWidgetTimeButton: false,

        addWidgetYoutubeButton: false,
        updateWidgetYoutubeButton: false,

        addWidgetCovidButton: false,
        updateWidgetCovidButton: false,

        addWidgetTodoButton: false,
        updateWidgetTodoButton: false,

        dataWidgetSelected: {},
        infoWidgetSelected: {},
        lastUpdate: "",
      };
    },
    mounted() {
      this.lastUpdate = Date.now();
      // this.getAboutJSON();
    },
    methods: {
      getCookie() {
        let access_token = "";
        if (document.cookie.length > 0) {
          let cookieArray = document.cookie.split(";");
          for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].indexOf("My_Dashboard_Token") != -1) {
              const cookiename = "My_Dashboard_Token=";
              access_token = cookieArray[i].substring(
                cookiename.length,
                cookieArray[i].length
              );
            }
          }
        }
        return access_token;
      },
      editWidget(widgetId, datas, info) {
        this.dataWidgetSelected = datas;
        this.infoWidgetSelected = info;
        if (datas.typeWidget == "weather") {
          this.updateWidgetWeatherButton = true;
        } else if (datas.typeWidget == "time") {
          this.updateWidgetTimeButton = true;
        } else if (datas.typeWidget == "todo") {
          this.updateWidgetTodoButton = true;
        } else if (datas.typeWidget == "youtube") {
          this.updateWidgetYoutubeButton = true;
        } else if (datas.typeWidget == "covid") {
          this.updateWidgetCovidButton = true;
        }

        this.lastUpdate = Date.now();
      },
      async delWidget(widgetId, port) {
        let body = {
          widgetId: widgetId
        };
        let result = false;
        await fetch(`http://localhost:${port}/widget`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        }).then((res) => {
          if (res.status == "200") {
            result = true;
          }
        });

        if (result) {
          body = {
            widgetId: widgetId,
          };
          const access_token = this.getCookie();
          await fetch("http://localhost:3000/widgets", {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              authorization: "Bearer " + access_token,
            },
            body: JSON.stringify(body),
          });
          this.$store.dispatch("getUserData");
          this.lastUpdate = Date.now();
        }
      },
      async getAboutJSON() {
        let data = {
          customer: {
            host: "",
          },
          server: {
            current_time: "",
            services: [],
          },
        };
        // await fetch(`http://checkip.dyndns.org/`, {
        //     method: "GET",
        //     headers: {
        //       "content-type": "text/plain, application/json",
        //       "Access-Control-Allow-Origin": "*"
        //     },
        //   })
        //   .then(res =>{
        //     this.data.customer.host = res
        //     console.log(res)
        //   })
        const moment = require('moment');
        const today = moment()
        data.server.current_time = today.format("dddd, MMMM Do YYYY, H:mm:ss");

        for (let port = 3001; port < 3006; port++)
          await fetch(`http://localhost:${port}/about`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => res.json())
          .then((res) => {
            data.server.services.push(res);
          });
        console.log(JSON.stringify(data));

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