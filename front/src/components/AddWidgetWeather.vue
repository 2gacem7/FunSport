<template>
  <div id="addWidgetWeather">
    <div id="pop" class="container-flex mx-4 mt-5 fixed-top">
      <div class="row justify-content-center">
        <div
          class="card align-item-center d-flex"
          style="position: absolute; z-index:10; background-color:#1a1a1a;color:white;border:1px solid silver !important"
        >
          <div
            class="card-header d-flex justify-content-between"
            style="border:1px solid white !important"
          >
            Weather widgets
            <button class="btn btn-warning" @click="cancel">Close</button>
          </div>
          <div class="card-body d-flex">
            <div v-for="service in $store.state.ServicesAvailable" v-bind:key="service.id">
              <select v-if="service.name == 'weather'" name="widgetType" v-model="typeSelected">
                <option disabled value>Choisissez</option>
                <option
                  v-for="widget in service.widgets"
                  v-bind:key="widget.name"
                  :value="widget.name"
                >{{ widget.description}}</option>
              </select>
            </div>
            <input id="inputCity" placeholder="Name of a city" v-model="input" />
            <button v-if="add" class="btn btn-success" v-on:click="addWidget">Add Widget</button>
            <button v-if="update" class="btn btn-success" v-on:click="updateWidget">Update Widget</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addWidgetWeather",
  data() {
    return {
      input: "",
      typeSelected: "",
      port: 3001,
    };
  },
  props: {
    add: Boolean,
    update: Boolean,
    info: "",
    data: Object,
  },
  mounted() {
    if (this.info != ""){
      this.typeSelected = this.info.nameWidget;
          this.input = this.info.city;
    }

  },
  methods: {
    cancel() {
      this.$parent.addWidgetWeatherButton = false;
      this.$parent.updateWidgetWeatherButton = false;
    },
    async addWidget() {
      let access_token = this.$parent.getCookie();

      let body = {
        userId: this.$store.state.UserData[0].id,
        city: this.input,
        nameWidget: this.typeSelected,
      };
      let requestStatus;
      let widgetSaved;
      await fetch(`http://localhost:${this.port}/widget`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => (widgetSaved = res));


      body = {
        widgetId: widgetSaved._id,
        userId: this.$store.state.UserData[0].id,
        typeWidget: "weather",
      };

      await fetch("http://localhost:3000/widgets", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + access_token,
        },
        body: JSON.stringify(body),
      });
      (this.$parent.addWidgetWeatherButton = false),
        this.$store.dispatch("getUserData");
    },
    async updateWidget() {
      let access_token = this.$parent.getCookie();

      let body = {
        userId: this.$store.state.UserData[0].id,
        city: this.input,
        nameWidget: this.typeSelected,
        widgetId: this.info.widgetId,
      };


      let widgetSaved;
      await fetch(`http://localhost:${this.port}/widget`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.status == 200) {

        }
      });
      this.$parent.updateWidgetWeatherButton = false;
      document.location.reload(true);

    },
  },
};
</script>