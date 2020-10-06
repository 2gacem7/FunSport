<template>
  <div v-if="loaded">
    <div v-if="loaded" class="card-header  d-flex justify-content-between">
      Covid Widget
      <button class="btn btn-info" v-on:click="editWidget">Edit</button>
      <button class="btn btn-danger" v-on:click="delWidget">Del</button>
    </div>
    <div class="card-body overflow-auto"  style="max-height:200px;min-height:200px">
      <p>Pays : {{ info.ccountry}}</p>

      <p class="card-text">Nouveaux infectés {{ info.value.response[0].cases.new }}</p>
      <p class="card-text">Nouveaux morts {{ info.value.response[0].deaths.new }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetCovid",
  data() {
    return {
      info: {
        value: {},
      },
      port: 3005,
      loaded: false,
      timer: 7000 ,
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
        .then((res) => res.json())
        .then((res) => {
          this.info = res;
          this.loaded = true;
        });
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
.card-body{
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(143, 255, 143);
}
.card-header{
  font-family: 'Montserrat', sans-serif;
  background-color: rgba(143, 255, 143, 0.534);
}
</style>