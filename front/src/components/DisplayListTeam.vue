<template>
  <div class="m-3 card" style="max-height: 30rem; max-width: 30rem">
    <div class="card-header  d-flex justify-content-between">
      <button v-if="!delButton" class="btn btn-success font-weight-bold" @click="addToMyFavorites">
        + favori
      </button>
      <h3 class="text-center">{{ sport }} Team</h3>
      <button v-if="delButton" class="btn btn-danger font-weight-bold mb-2" @click="delToMyFavorites">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
      </button>
    </div>
    <div class="card-body m-0 p-0 w-100">
      <table class="table m-0">
        <thead>
          <tr>
            <th class="h5 font-weight-bold text-center">Team</th>
            <th class="h5 font-weight-bold text-center">Country</th>
          </tr>
        </thead>
      </table>
      <table class="table">
        <tbody class="card m-0 p-0 overflow-auto cardInside" style="max-height: 20rem">
          <tr v-for="item in info" :key="item.id" class="w-100">
            <td>
              <button class="btn btn-success btn-sm rounded-circle mb-2" @click="addTeamToMyFavorite(item)">Add</button>
            </td>
            <td style="width: 100%">
              {{item.name}}
            </td>
            <td>{{item.location}}</td>
          </tr>
          <tr v-if="info.length==0"> No more teams </tr>
        </tbody>
        <tfoot>
          <p>
            <button v-if="page>1" @click="prev()">prev</button>
            <button v-if="info.length>0" @click="next()">next</button>
          </p>
        </tfoot>
      </table>
    </div>
  </div>

</template>

<script>
  import ENV from "../../env.config";

  export default {
    name: "DisplayListTeam",

    data() {
      return {
        info: {},
        page: 1,
      };
    },
    props: {
      id: "",
      sport: String, // String display in the header
      apiName: String, // String used to search info for 1 sport in getInfos
      delButton: Boolean,
    },
    beforeMount() {
      this.getInfos();
    },

    methods: {
      addTeamToMyFavorite(item) {
        const teamSlug = item.slug;
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: this.sport,
            type: "team",
            name: teamSlug
          },

        });
      },
      async next() {
        this.page++;
        this.getInfos();
      },
      async prev() {
        if (this.page > 1) {
          this.page--;
          this.getInfos();
        }
      },

      delToMyFavorites() {
        this.$emit("delfavorite", this.id);
      },
      addToMyFavorites() {
        this.$store.dispatch("addToMyFavorites", {
          id: this.$store.state.tabSelected.id,
          data: {
            sport: this.sport,
            type: "component",
            name: "list",
            apiName: this.apiName,
          },
        });
      },
      async getInfos() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + ENV.API_PANDA_SPORT);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        await fetch(`https://api.pandascore.co/${this.apiName}/teams?sort=name&per_page=10&page[number]=${this.page}`,
            requestOptions)
          .then(response => response.json())
          .then(result => this.info = result)
          .catch(error => console.log('error', error));
      },
    }
  }
</script>

<style scoped>
tbody {
  font-family: Arial, Helvetica, sans-serif;
}

  thead {
    font-size: 25px;
  }
  .cardInside{
    box-shadow: none!important;
  }
</style>