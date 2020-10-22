<template>
    <div id="matchEsport" class="text-dark">
        <Navbar />
        <TabBar />
        <div class="card m-2">
            <div class="card-header d-flex justify-content-between" v-if="infoMatch[0]">
                <h2 class="m-3">{{ infoMatch[0].league_name }}</h2>
                <button class="btn btn-primary btnCustom" @click="go">Back</button>
            </div>
            <img class="row mx-auto m-3" :src="return_Link(infoMatch[0].league_logo)" alt="No image league" height="100"
                width="100" />
            <h4 v-if="infoMatch[0]" class="m-3">Begin at: {{ infoMatch[0].match_date | moment("MMMM Do YYYY") }},
                {{ infoMatch[0].match_time | moment("h:mm:ss")}}</h4>
            <div class="row justify-content-center">
                <div v-if="infoMatch[0]">
                    <p class="font-weight-bold text-center">{{infoMatch[0].match_hometeam_name}}</p>
                    <p class="font-weight-bold text-center">
                        <img :src="return_Link(infoMatch[0].team_home_badge)" alt="no Team badge"
                            style="max-width: 4rem" />
                        {{infoMatch[0].match_hometeam_score}}</p>
                </div>
                <div v-if="infoMatch[0]" class="ml-5">
                    <p class="font-weight-bold text-center">{{infoMatch[0].match_awayteam_name}}</p>
                    <p class="font-weight-bold text-center"> {{infoMatch[0].match_awayteam_score}} <img
                            :src="return_Link(infoMatch[0].team_away_badge)" alt="no Team badge"
                            style="max-width: 4rem" />
                    </p>
                </div>
                <p class="row m-0 justify-content-center font-weight-bold">Actual pronostics</p>
                <div class="row m-0 justify-content-center"
                    v-if="resultPronostic[0] && resultPronostic[0].count || resultPronostic[1] && resultPronostic[1].count">
                    <p>Winner:{{Math.round((resultPronostic[0].count/ totalPronostic) * 100)}}%</p>
                    <p class="ml-5" v-if="resultPronostic[1]">
                        Winner:{{Math.round((resultPronostic[1].count/ totalPronostic) * 100)}}%</p>
                </div>
                <div class="m-3" v-else>
                    No pronostic for this match
                </div>
            </div>
        </div>
        <div class="card m-2">
            <h3>Commentaries</h3>
            <div v-if="commentaries.length == 0">
                No commentary available for this match
            </div>
            <div>
                <div class="card m-2" v-for="commentary in commentaries" :key="commentary.id">
                    <div v-if="commentary.commentary != ''">
                        <div class="card-header d-flex">
                            <span>Post the {{ commentary.createdAt  | moment("MMMM Do YYYY, h:mm  ")}} by
                                {{ commentary.authorName.firstName }}: Winner {{ commentary.winnerId }}</span>
                            <button v-if="!commentary.isReported" class="btn btn-primary m-5 report"
                                @click="reportCommentary(commentary._id)">Report this commentary</button>
                        </div>
                        <div class="card-body">
                            <span v-if="commentary.isReported"> Commentary reported. Waiting the admin's moderation
                            </span>
                            <span v-else> {{ commentary.commentary }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="infoMatch[0] && infoMatch[0].match_status !== 'Finished'" class="card m-2">
            <h3 class="m-2">Do you want to pronostic this match?</h3>
            <select class="m-2" v-model="winnerInput">
                <option disabled selected="selected">Select the winner</option>
                <option>
                    {{ infoMatch[0].match_hometeam_name }}
                </option>
                <option>
                    {{ infoMatch[0].match_awayteam_name }}
                </option>
            </select>
            <h3 class="m-2">Your commentary (optional)</h3>
            <input class="m-2" v-model="commentaryInput" />
            <button class="btn btn-primary m-2 btnCustom" @click="sendPronostic">
                Send pronostic
            </button>
        </div>
    </div>
</template>

<script>
    import ENV, {
        API_FOOTBALL
    } from "../../env.config";
    import Navbar from "@/components/NavBar.vue";
    import TabBar from "@/components/TabBar.vue";
    /**
     * Component card for display all teams
     * @displayName DisplayMatchFootball
     */
    export default {
        name: "DisplayMatchFootball",
        components: {
            Navbar,
            TabBar
        },

        data() {
            return {
                infoMatch: [],
                matchId: this.$route.params.matchId,
                winnerInput: "Select the winner",
                commentaryInput: "",
                commentaries: [],
                resultPronostic: [],
                pronostics: [],
                totalPronostic: 0,
            };
        },
        props: {
            /**
             * The id of this card
             */
            id: "",
            /**
             * The name of league
             */
            leagueName: String,
        },
        async mounted() {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            await fetch("https://apiv2.apifootball.com/?action=get_events&match_id=" + this.matchId +
                    "&APIkey=" + ENV.API_FOOTBALL,
                    requestOptions)
                .then(response => response.json())
                .then(result => this.infoMatch = result)
            this.getPronostics();
        },


        methods: {
            /**
             * Return link to img for display league logo and team badges in the view
             *
             * @public
             */
            return_Link(infoMatch) {
                return infoMatch;
            },
            /**
             * This method is used to go back in terms of variable in $store.state.tabSelected
             * @public
             */
            go() {
                this.$router.push({
                    name: this.$store.state.tabSelected.name
                });
            },
            /**
             * This method is used to send the pronostic in database
             * @public
             */
            async sendPronostic() {
                if (this.winnerInput != "Select the winner") {
                    this.$store.commit("setAccessToken");

                    const header = new Headers();
                    header.append(
                        "Authorization",
                        "Bearer " + this.$store.state.access_token
                    );
                    header.append("Content-type", "application/json");

                    const body = new FormData();
                    let options = {
                        method: "POST",
                        headers: header,
                        body: JSON.stringify({
                            matchId: this.matchId,
                            commentary: this.commentaryInput,
                            winnerId: this.winnerInput,
                            type: "football",
                            createdAt: new Date()
                        }),
                    };
                    await fetch(`http://${ENV.API_BACKEND}/pronostics`, options).then(() => {
                        this.getPronostics()
                    });
                } else {
                    alert("You have to select the winner before");
                }
            },
            /**
             * This method is used to catch the pronostic already in the database for this match
             * @public
             */
            async getPronostics() {
                this.$store.commit("setAccessToken");
                let options = {
                    method: "GET",
                };
                const datas = await fetch(
                    `http://${ENV.API_BACKEND}/pronostics/${this.apiName}/${this.matchId}`,
                    options
                );
                const json = await datas.json();
                if (datas.ok) {
                    this.pronostics = json;
                    this.getResumePronostic();
                } else {
                    console.log("Down");
                }
            },
            /**
             * This method is used to catch the commentaries that are in the database for this match
             * @public
             */
            async reportCommentary(commentaryId) {
                this.$store.commit("setAccessToken");
                const header = new Headers();
                header.append(
                    "Authorization",
                    "Bearer " + this.$store.state.access_token
                );

                const body = new FormData();
                let options = {
                    method: "GET",
                    headers: header,
                };
                await fetch(`http://${ENV.API_BACKEND}/pronostics/${commentaryId}/report`, options).then(() => {
                    this.getPronostics()
                });
            },

            /**
             * This method is used to catch the pronostic already in the database for this match
             * @public
             */
            async getPronostics() {
                this.$store.commit("setAccessToken");

                let options = {
                    method: "GET",
                };
                const datas = await fetch(
                    `http://${ENV.API_BACKEND}/pronostics/football/${this.matchId}`,
                    options
                );
                const json = await datas.json();
                if (datas.ok) {
                    this.pronostics = json;
                    this.getResumePronostic();
                } else {
                    console.log("Down");
                }
            },
            /**
             * This method is used to display the current pronostic for this match
             * @public
             */
            getResumePronostic() {
                this.resultPronostic = [];
                this.resultPronostic.push({
                    team: this.infoMatch[0].match_hometeam_name,
                    count: 0,
                });
                this.resultPronostic.push({
                    team: this.infoMatch[0].match_awayteam_name,
                    count: 0,
                });
                const result = this.resultPronostic;
                let totalPronostic = 0;
                let commentaries = [];
                this.pronostics.forEach(function (prono) {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].team == prono.winnerId) {
                            result[i].count = result[i].count + 1;
                            totalPronostic++;
                        }
                    }
                    if (prono.commentary != "") {
                        commentaries.push(prono);
                    }
                });
                this.commentaries = commentaries;
                this.totalPronostic = totalPronostic;
            },
        },
    };
</script>

<style>
    .content {
        padding-top: 70px;
        padding-left: 220px;
    }

    #competitionEsport .card-header {
        font-family: Arial, Helvetica, sans-serif;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.91);
        color: #ffffff !important;
        border-bottom: 1px solid #9cfdf9;
        background: #278cff;
        background: linear-gradient(90deg, #9cabfd 0%, #1f06ff 25%, #273dff 100%);
    }

    .btnCustom {
        background: linear-gradient(to bottom, #67fdf6 5%, #3665ff 100%);
        background-color: #3665ff;
        border-radius: 34px;
        border: 1px solid #67fdf6;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 17px;
        padding: 10px 31px;
        text-decoration: none;
        text-shadow: 0px 2px 0px #041312;
    }

    .btnCustom:hover {
        background: linear-gradient(to bottom, #3665ff 5%, #17fff3 100%);
        background-color: #3665ff;
        border: 1px solid #67fdf6;
    }

    .report {
        background: linear-gradient(to bottom, #fa0e0e 5%, #f85e16 100%);
        background-color: #f8e916;
        border-radius: 34px;
        border: 1px solid #fa0e0e;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 17px;
        padding: 10px 31px;
        text-decoration: none;
        text-shadow: 0px 2px 0px #041312;
    }

    .report:hover {
        background: linear-gradient(to bottom, #f8e916 5%, #fa0e0e 100%);
        background-color: #f8e916;
        border: 1px solid #fa0e0e;
    }

    span {
        font-size: larger;
    }
</style>