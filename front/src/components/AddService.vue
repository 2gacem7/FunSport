<template>
    <div id="addService">
        <div id="pop" class="container-flex mx-4   mt-5 fixed-top">
            <div class="row justify-content-center">
                <div class="card align-item-center d-flex " style="position: absolute; z-index:10; background-color:#1a1a1a;color:white;border:1px solid silver !important">
                    <div class="card-header d-flex justify-content-between" style="border:1px solid white !important">
                        List of services
                        <button class="btn btn-warning" @click="cancel">Close</button>
                    </div>
                    <div class="card-body d-flex">
                        <div class="m-3 p-3" v-for="service in servicesList" v-bind:key="service.id">
                            <label>{{ service.name }}</label>
                            <input type="checkbox" :name="service" v-model="service.checked">
                        </div>
                        <div class="row w-100 mt-2">
                            <button class="btn btn-secondary" @click="applyService()">Update subs</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addService',
        components: {},
        data() {
            return {
                servicesList: [{
                        name: "weather",
                        checked: false
                    },
                    {
                        name: "covid",
                        checked: false
                    },
                    {
                        name: "youtube",
                        checked: false
                    },
                    {
                        name: "time",
                        checked: false
                    },
                    {
                        name: "todo",
                        checked: false
                    }
                ],
            }
        },
        mounted() {
            this.$store.state.UserData[0].services.forEach(service => {
                this.servicesList.forEach(list => {
                    if (service == list.name) {
                        list.checked = true;
                    }
                })
            });
        },
        methods: {
            cancel() {
                this.$parent.subButton = false;
            },
            async applyService() {
                let newList = [];
                this.servicesList.forEach(list => {
                    if (list.checked) {
                        newList.push(list.name)
                    }
                });
                let body = {
                    services: newList
                }
                if (document.cookie.length > 0) {
                    let cookieArray = document.cookie.split(';');
                    for (let i = 0; i < cookieArray.length; i++) {
                        if (cookieArray[i].indexOf("My_Dashboard_Token") != -1) {
                            const cookiename = "My_Dashboard_Token=";
                            const access_token = cookieArray[i].substring(cookiename.length, cookieArray[i].length);
                            await fetch("http://localhost:3000/services", {
                                    "method": "PUT",
                                    "headers": {
                                        "content-type": "application/json",
                                        "authorization": "Bearer "+ access_token
                                    },
                                    "body": JSON.stringify(body)
                                })
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                            document.location.reload(true);
                        }
                    }
                }
            }
        },
    }
</script>