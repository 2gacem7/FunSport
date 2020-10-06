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
            Covid widgets
            <button class="btn btn-warning" @click="cancel">Close</button>
          </div>
          <div class="card-body mx-auto">
            <div class="row m-2">Select Your country</div>
            <div class="row m-2">
              <select name="countrySelection" v-model="country">
                <option v-if="loading" value="loading" selected disabled>Loading</option>

                <option
                  v-else
                  v-for="country in listCountry"
                  v-bind:key="country.id"
                  :value="country"
                >{{ country}}</option>
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
  name: "addWidgetCovid",
  data() {
    return {
      country: "",
      port: 3005,
      loading: true,
      listCountry: [],
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
      this.country = this.info.ccountry;
    }

    await fetch(`https://covid-193.p.rapidapi.com/statistics`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d6414fca4emsh4d564c9bb7be02ep10e199jsn0e7b0c47ca27",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        for (let i = 0; i < res.response.length; i++) {
          this.listCountry.push(res.response[i].country);
        }
        this.loading = false;
      });
  },
  methods: {
    cancel() {
      this.$parent.addWidgetCovidButton = false;
      this.$parent.updateWidgetCovidButton = false;
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
          country: this.country,
        }),
      })
        .then((res) => res.json())
        .then((res) => (widgetSaved = res));

      let body = {
        widgetId: widgetSaved._id,
        userId: this.$store.state.UserData[0].id,
        typeWidget: "covid",
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
      this.$parent.addWidgetCovidButton = false;
    },

    async updateWidget() {
      let access_token = this.$parent.getCookie();

      let body = {
        userId: this.$store.state.UserData[0].id,
        country: this.country,
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
      this.$parent.updateWidgetCovidButton = false;
      document.location.reload(true);
    },
  },
};
</script>