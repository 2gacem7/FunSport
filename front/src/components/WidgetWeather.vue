<template>
  <div class>
    <div class="card-header d-flex justify-content-between">
      Weather Widget
      <button class="btn btn-info" v-on:click="editWidget">Edit</button>
      <button class="btn btn-danger" v-on:click="delWidget">Del</button>
    </div>
    <div class="card-body overflow-auto" style="max-height:200px;min-height:200px">
      <div v-if="loading" > Loading</div>
      <div v-else>
      <h2 v-if="info.value=='No ressource found'" class="card-text text-center">No city found</h2>
      <div v-else>
        <div v-if="info.nameWidget == 'city_temperature'">
          <h4 class="card-text text-center">Temperature in {{ info.city }}</h4>
          <h2 class="card-text text-center">{{ Math.round(info.value - 273.15)}} °C</h2>
        </div>
        <div v-if="info.nameWidget == 'city_humidity'">
          <h4 class="card-text text-center">Humidity in {{ info.city }}</h4>
          <h2 class="card-text text-center">{{ info.value}} %</h2>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetWeather",
  data() {
    return {
      info: {},
      port: 3001,
      timer: 3000,
      setTimer: "",
      loading:true
    };
  },
  props: {
    datas: Object,
    infos: Object,
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    this.setTimer = setInterval(() => {
      this.fetchData();
    }, this.timer);
  },
  methods: {
    async fetchData() {
      await fetch(
        `http://localhost:${this.port}/widget/${this.datas.widgetId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then(res=> res.json())
        .then(res => {
          this.info = res;
          this.loading=false
          this.$parent.lastUpdate = Date.now();
        });
    },
    editWidget() {

      this.$emit("editwidget", this.datas.widgetId, this.datas, this.info);
    },
    delWidget() {
      clearInterval(this.setTimer);
      this.$emit("delwidget", this.datas.widgetId, this.port);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
.card-body {
  background-color: rgb(127, 225, 255);
  font-family: "Pacifico", cursive;
}
.card-header {
  background-color: rgba(127, 225, 255, 0.645);
  font-family: "Pacifico", cursive;
}
</style>