<template>
  <div class="">
    <div class="card-header d-flex justify-content-between">
      Youtube Widget
      <button class="btn btn-info" v-on:click="editWidget">Edit</button>
      <button class="btn btn-danger" v-on:click="delWidget">Del</button>
    </div>
    <div class="card-body overflow-auto" style="max-height:200px;min-height:200px">
      <h4 class="card-text text-center" style="border-bottom:1px solid silver">Top 25 for {{ info.regionCode}}</h4>
      <div v-if="!loading">
        <div v-for="(video,index) in info.value.items" v-bind:key="index" class="card-text text-center">
          <a  :href="'https://www.youtube.com/watch?v='+video.id">Video n°{{increment(index)}}</a>
        </div>
      </div>
      <div v-if="loading">Loading</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetYoutube",
  data() {
    return {
      info: {},
      regionCode: "",
      port: 3003,
      loading: true,
      timer: 5000,
      setTimer:""
    };
  },
  props: {
    datas: {},
  },
  beforeMount() {
    this.fetchData();
  },
  mounted(){
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
        .then((json) => {
          this.info = json;
          this.loading = false;
        });
      this.$parent.lastUpdate = Date.now();
    },
    increment(value) {
      return value + 1;
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
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
.card-body{
  background-color: rgb(255, 72, 72);
  font-family: 'Roboto Mono', monospace;
}
.card-header{
  background-color: rgba(255, 72, 72, 0.515);
  font-family: 'Roboto Mono', monospace;
}
</style>