<template>
  <div id="addWidgetTime">
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
            Todo widgets
            <button class="btn btn-warning" @click="cancel">Close</button>
          </div>
          <div class="card-body mx-auto">
            <label for="area">Title</label>
            <input type="text" id="area" v-model="title"/><br>
            <label for="textarea">Todo</label>
            <input id="textarea" type="textarea" v-model="text"/>
          </div>
            <div class="row m-2">
              <button v-if="add" class="btn btn-success" @click="addWidgetTime()">Add Widget</button>
            <button v-if="update" class="btn btn-success" @click="updateWidget()">Update Widget</button>

            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: "addWidgetTodo",
  data() {
    return {
      title: [],
      text: "",
      port:3004,
    };
  },
  props: {
    add: Boolean,
    update: Boolean,
    info: "",
    data: Object,
  },
  async mounted() {
    if (this.info != ""){
            this.title = this.info.title;
            this.text = this.info.content;
      }

  },
  methods: {
    cancel() {
      this.$parent.addWidgetTodoButton = false;
      this.$parent.updateWidgetTodoButton = false;

    },
    async addWidgetTime() {
      let access_token = this.$parent.getCookie();

      let widgetSaved;
      await fetch(`http://localhost:${this.port}/widget`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: this.$store.state.UserData[0].id,
          title: this.title,
          content:this.text
        }),
      })
        .then((res) => res.json())
        .then((res) => (widgetSaved = res));

      let body = {
        widgetId: widgetSaved._id,
        userId: this.$store.state.UserData[0].id,
        typeWidget: "todo",
      };

      await fetch("http://localhost:3000/widgets", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + access_token,
        },
        body: JSON.stringify(body),
      });
      document.location.reload(true);
            this.$parent.addWidgetTimeButton = false;

    },

    async updateWidget() {
      let access_token = this.$parent.getCookie();

      let body = {
        userId: this.$store.state.UserData[0].id,
        title: this.title,
        content:this.text,
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
      this.$parent.updateWidgetTimeButton = false;
            document.location.reload(true);

    },
  },
};
</script>