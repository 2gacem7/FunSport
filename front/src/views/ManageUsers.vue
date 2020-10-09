<template>
    <div id="ManageUsers">
        <Navbar />
        <TabBar />
        <div class="card mt-3 mb-3 align-item-center d-flex mx-auto" style="width:90%;background-color:#f4f4f4e3">
            <div class="card-header d-flex justify-content-between">
                <h4>Manage Users</h4>
                <button class="btn btn-warning" @click="createUser">Create new user</button>
            </div>
            <div class="card-body overflow-auto mx-auto" style="width:100%;">
                <div class="row mb-2 mt-2 p-2" style="width:100%;border-bottom:1px solid silver"
                    v-for="user in listUser" v-bind:key="user.id">
                    <div class="row d-flex justify-content-between" style="width:100%;">
                        <h5 class="m-2"> <span style="font-style:italic;"></span> email : {{ user.email }}</h5>
                        <p class="m-2">Admin: {{ user.isAdmin }} </p>
                    </div>
                    <button class="btn btn-success mr-2" @click="updateUser(user)">Update</button>
                    <button class="btn btn-danger mr-2" @click="deleteUser(user._id)">Delete</button>
                </div>
            </div>
        </div>
        <div v-if="createButton == true">
            <CreateUser />
        </div>
        <div v-if="updateButton == true">
            <UpdateUser />
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/NavBar.vue"
    import TabBar from "@/components/TabBar.vue";
    import CreateUser from '@/components/CreateUser.vue';
    import UpdateUser from '@/components/UpdateUser.vue';

    export default {
        name: 'ManageUsers',
        components: {
            Navbar,
            TabBar,
            CreateUser,
            UpdateUser,
        },
        data() {
            return {
                listUser: [],
                createButton: false,
                updateButton: false,
                userData: {}
            }
        },

        async mounted() {
            this.$store.dispatch('getUserData');
            this.$store.dispatch("getMySports");
            let list = [];
            await fetch("http://localhost:3000/users", {
                    "method": "GET",
                    "headers": {
                        "authorization": "Bearer " + this.$store.state.access_token
                    }
                })
                .then(res => res.clone().json())
                .then(json => list = json);
            this.listUser = list;
        },
        methods: {
            async updateUser(user) {
                this.userData = user;
                this.updateButton = true;
            },
            async deleteUser(id) {
                await fetch("http://localhost:3000/users/"+id, {
                        "method": "DELETE",
                        "headers": {
                            "authorization": "Bearer " + this.$store.state.access_token
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
                let list = [];
                await fetch("http://localhost:3000/users", {
                        "method": "GET",
                        "headers": {
                            "authorization": "Bearer " + this.$store.state.access_token
                        }
                    })
                    .then(res => res.clone().json())
                    .then(json => list = json);
                this.listUser = list;
            },
            createUser() {
                this.createButton = true;
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

    .card-body {
        background-color: rgb(72, 99, 255);
        font-family: 'Roboto Mono', monospace;
    }

    .card-header {
        background-color: rgba(72, 99, 255, 0.515);
        font-family: 'Roboto Mono', monospace;
    }
</style>