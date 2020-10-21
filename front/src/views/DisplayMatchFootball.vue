<template>
    <div id="matchEsport" class="text-dark">
        <Navbar />
        <TabBar />
        <button class="btn btn-primary" @click="go">Back</button>
        <div class="card m-2 p-2">
            <span v-if="infoMatch[0]">
                League: {{ infoMatch[0].league_name }}
                <img :src="return_Link(infoMatch[0].league_logo)" alt="No image league" height="100" width="100" />
            </span>
            <p v-if="infoMatch[0]" class="mt-2">Begin at: {{ infoMatch[0].match_date | moment("MMMM Do YYYY") }},
                {{ infoMatch[0].match_time | moment("h:mm:ss")}}</p>
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
                <p class="row justify-content-center font-weight-bold">Actual pronostics</p>
                <div class="row justify-content-center"
                    v-if="resultPronostic[0] && resultPronostic[0].count || resultPronostic[1] && resultPronostic[1].count">
                    <p>Winner:{{Math.round((resultPronostic[0].count/ totalPronostic) * 100)}}%</p>
                    <p class="ml-5" v-if="resultPronostic[1]">
                        Winner:{{Math.round((resultPronostic[1].count/ totalPronostic) * 100)}}%</p>
                </div>
                <div v-else>
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
                            <button v-if="!commentary.isReported" class="btn btn-primary mr-2 ml-auto"
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
            <h3>Do you want to pronostic this match?</h3>
            <select v-model="winnerInput">
                <option disabled selected="selected">Select the winner</option>
                <option>
                    {{ infoMatch[0].match_hometeam_name }}
                </option>
                <option>
                    {{ infoMatch[0].match_awayteam_name }}
                </option>
            </select>
            <h3>your commentary (optional)</h3>
            <input v-model="commentaryInput" />
            <button class="btn btn-primary m-2" @click="sendPronostic">
                Send pronostic
            </button>
        </div>
    </div>
</template>

<script>
    import ENV, { API_FOOTBALL } from "../../env.config";
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
                .catch(error => console.log('error', error));
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
                this.$router.push("/football");
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