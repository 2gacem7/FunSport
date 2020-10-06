<template>
  <div class="">
    <div class="card-header d-flex justify-content-between">
      Time Widget
      <button class="btn btn-info" v-on:click="editWidget">Edit</button>
      <button class="btn btn-danger" v-on:click="delWidget">Del</button>
    </div>
    <div class="card-body overflow-auto" style="max-height:200px;min-height:200px">
      <h4 class="card-text text-center">Now in {{ info.timezone }}</h4>
      <h2 class="card-text text-center" >{{ time }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetTime",
  data() {
    return {
      info: {},
      time: "",
      port: 3002,
      timer: 1000,
      setTimer:""
    };
  },
  props: {
    datas: {},
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    this.setTimer=setInterval(() => {
      this.fetchData();
    }, this.timer);
  },

  methods: {
    async fetchData() {
      await fetch(
        `http://localhost:${this.port}/widget/` + this.datas.widgetId,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => res.clone().json())
        .then((json) => (this.info = json));
      let arrDate = this.info.value.datetime.split("T");
      this.time = arrDate[1].split(".")[0];
      this.$parent.lastUpdate = Date.now();
    },
    editWidget() {
      this.$emit("editwidget", this.datas.widgetId, this.datas, this.info);
    },
    delWidget() {
            clearInterval(this.setTimer)

      this.$emit("delwidget", this.datas.widgetId, this.port);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@600&display=swap');
.card-body{
  font-family: 'Grenze Gotisch', cursive;
  background-color: rgb(230, 105, 255);
}
.card-header{
  font-family: 'Grenze Gotisch', cursive;
  background-color: rgba(230, 105, 255, 0.515)
}
</style>