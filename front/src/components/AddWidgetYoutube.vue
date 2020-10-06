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
            Youtube widgets
            <button class="btn btn-warning" @click="cancel">Close</button>
          </div>
          <div class="card-body mx-auto">

          <div class="row m-2">Select Your country</div>
            <div class="row m-2">
              <select name="countrySelection" v-model="regionCode">
                <option value="IT">Italie</option>
                <option value="FR">France</option>
                <option value="CH">Chine</option>
              </select>
            </div>

            <div class="row m-2">
              <button v-if="add" class="btn btn-success" @click="addWidgetTime()">Add Widget</button>
              <button v-if="update" class="btn btn-success" @click="updateWidget()">Update Widget</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addWidgetYoutube",
  data() {
    return {
      regionCode: "",
      port: 3003,
      loading: true,
    };
  },
  props: {
    add: Boolean,
    update: Boolean,
    info: "",
    data: Object,
  },
  async mounted() {

    if (this.info != "") {
      this.regionCode = this.info.regionCode;
    }
  },
  methods: {
    cancel() {
      this.$parent.addWidgetYoutubeButton = false;
      this.$parent.updateWidgetYoutubeButton = false;
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
          regionCode: this.regionCode,
        }),
      })
        .then((res) => res.json())
        .then((res) => (widgetSaved = res));

      let body = {
        widgetId: widgetSaved._id,
        userId: this.$store.state.UserData[0].id,
        typeWidget: "youtube",
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
      this.$parent.addWidgetYoutubeButton = false;
    },

    async updateWidget() {
      let access_token = this.$parent.getCookie();

      let body = {
        userId: this.$store.state.UserData[0].id,
        regionCode: this.regionCode,
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
      this.$parent.updateWidgetYoutubeButton = false;
      document.location.reload(true);
    },
  },
};
</script>