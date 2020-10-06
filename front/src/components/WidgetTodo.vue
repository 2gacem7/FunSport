<template>
  <div class="">
    <div class="card-header d-flex justify-content-between">
      Todo Widget
      <button class="btn btn-info" v-on:click="editWidget">Edit</button>
      <button class="btn btn-danger" v-on:click="delWidget">Del</button>
    </div>
    <div class="card-body overflow-auto" style="max-height:200px;min-height:200px">
      <h4 class="card-text text-center" style="border-bottom:1px solid silver">{{ info.title }}</h4>
        <p class="card-text text-center" >{{ info.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetTodo",
  data() {
    return {
      info: {},
      time: "",
      port: 3004,
      timer: 10000,
      setTimer:""
    };
  },
  props: {
    datas: {},
  },
  async beforeMount() {
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
@import url('https://fonts.googleapis.com/css2?family=Kufam:wght@500&display=swap');
.card-body{
  background-color: rgb(255, 218, 98);
  font-family: 'Kufam', cursive;
}
.card-header{
  background-color: rgba(255, 218, 98, 0.549);
  font-family: 'Kufam', cursive;
}
</style>