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
            Time widgets
            <button class="btn btn-warning" @click="cancel">Close</button>
          </div>
          <div class="card-body mx-auto">
            <div class="row m-2">Select Your timezone</div>
            <div class="row m-2">
              <select name="timezone" v-model="tmpTimezone">
                  <option
                  v-if="loading" disabled> Loading</option>
                <option
                  v-for="timezone in listTimezone"
                  v-bind:key="timezone"
                  :value="timezone"
                >{{ timezone }}</option>
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
  name: "addWidgetTime",
  data() {
    return {
      listTimezone: [],
      tmpTimezone: "",
      port:3002,
      loading:true,
    };
  },
  props: {
    add: Boolean,
    update: Boolean,
    infoW: "",
    dataW: Object,
  },
  async mounted() {
    await fetch("http://worldtimeapi.org/api/timezone", {
      method: "GET",
      headers: {},
    })
      .then((res) => res.clone().json())
      .then((json) => {this.listTimezone = json
      this.loading=false});

      if (this.infoW != ""){
            this.tmpTimezone = this.infoW.timezone;

      }

  },
  methods: {
    cancel() {
      this.$parent.addWidgetTimeButton = false;
        this.$parent.updateWidgetTimeButton = false;

    },
    async addWidgetTime() {
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
      let widgetSaved;
      await fetch(`http://localhost:${this.port}/widget`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: this.$store.state.UserData[0].id,
          timezone: this.tmpTimezone,
        }),
      })
        .then((res) => res.json())
        .then((res) => (widgetSaved = res));

      let body = {
        widgetId: widgetSaved._id,
        userId: this.$store.state.UserData[0].id,
        typeWidget: "time",
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
        timezone: this.tmpTimezone,
        widgetId: this.infoW.widgetId,
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