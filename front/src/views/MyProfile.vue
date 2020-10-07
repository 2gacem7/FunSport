<template>
    <div id="MyProfile">
        <Navbar />
        <TabBar />
        <div class="container pt-3">
            <div class="card" style="background-color:#f4f4f4e3;">
                <div class="card-header">
                    <h1 class="text text-center">My Account</h1>
                </div>
                <div class="card-body">
                    <div class="row mt-3 justify-content-center" v-if="info === true">
                        <span class="text-danger text-center" v-if="msg.general"
                            style="background-color:#f4f4f4e3;">{{ msg.general }}</span>
                    </div>
                    <div class="row mt-2  justify-content-center">
                        <label class="card-text text-center">FirstName</label>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <input type="text" name="name" required :placeholder="firstName" v-model="newFirstName">
                    </div>
                    <div class="row mt-3 justify-content-center">
                        <span class="card-text text-center" v-if="msg.firstName"
                            style="background-color:#f4f4f4e3;">{{msg.firstName}}</span>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <label class="card-text text-center">LastName</label>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <input type="text" name="name" required :placeholder="lastName" v-model="newLastName">
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <span class="card-text text-center" v-if="msg.lastName"
                            style="background-color:#f4f4f4e3;">{{msg.lastName}}</span>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <label>Phone</label>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <input type="text" name="phone" required :placeholder="phone" v-model="newPhone">
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <span class="text-danger" v-if="msg.phone"
                            style="background-color:#f4f4f4e3;">{{msg.phone}}</span>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <label>Mail Adress</label>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <input type="text" name="email" required :placeholder="email" v-model="newEmail">
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <span class="text-danger" v-if="msg.email"
                            style="background-color:#f4f4f4e3;">{{msg.email}}</span>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <label>Password</label>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <input type="password" name="password" required v-model="password">
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <span class="text-danger" v-if="msg.password"
                            style="background-color:#f4f4f4e3;">{{msg.password}}</span>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <label>Password Confirm</label>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <input type="password" name="passwordComfirme" required v-model="passwordComfirme">
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <span class="text-danger" v-if="msg.passwordComfirme"
                            style="background-color:#f4f4f4e3;">{{msg.passwordComfirme}}</span>
                    </div>
                    <div class="row mt-2 justify-content-center">
                        <button class="btn btn-info" @click="update()">Update my account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/NavBar.vue"
    import TabBar from "@/components/TabBar.vue";

    export default {
        name: 'Dashboard',
        components: {
            Navbar,
            TabBar
        },
        data() {
            return {
                firstName: "",
                newFirstName: "",
                lastName: "",
                newLastName: "",
                phone: "",
                newPhone: "",
                email: "",
                newEmail: "",
                password: "",
                passwordComfirme: "",
                msg: [],
                validator: [],
                info: false,
            }
        },
        watch: {
            newEmail(value) {
                this.newEmail = value;
                this.validateEmail(value);
            },
            newFirstName(value) {
                this.newFirstName = value;
                this.validateFirstName(value);
            },
            newLastName(value) {
                this.newLastName = value;
                this.validateLastName(value);
            },
            newPhone(value) {
                this.newPhone = value;
                this.validatePhone(value);
            },
            password(value) {
                this.password = value;
                this.validatePassword(value);
            },
            passwordComfirme(value) {
                this.passwordComfirme = value;
                this.validatePasswordComfirme(value);
            },
        },
        async mounted() {
            this.firstName = this.$store.state.UserData.firstName;
            this.lastName = this.$store.state.UserData.lastName;
            this.phone = this.$store.state.UserData.phone;
            this.email = this.$store.state.UserData.email;
            this.validator['email'] = false;
            this.validator['firstName'] = false;
            this.validator['lastName'] = false;
            this.validator['phone'] = false;
            this.validator['password'] = false;

        },
        methods: {
            validateEmail(value) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    this.msg['email'] = '';
                    this.validator['email'] = true;
                } else {
                    this.msg['email'] = 'Incorrect email address';
                    this.validator['email'] = false;
                }
            },
            validateFirstName(value) {
                if (/^[a-zA-Z0-9_]{1,16}$/.test(value)) {
                    this.msg['firstName'] = '';
                    this.validator['firstName'] = true;
                } else {
                    this.msg['firstName'] = 'Your fisrtname must contain between 1 and 16 characters';
                    this.validator['firstName'] = false;
                }
            },
            validateLastName(value) {
                if (/^[a-zA-Z0-9_]{1,16}$/.test(value)) {
                    this.msg['lastName'] = '';
                    this.validator['lastName'] = true;
                } else {
                    this.msg['lastName'] = 'Your lastname must contain between 1 and 16 characters';
                    this.validator['lastName'] = false;
                }
            },
            validatePhone(value) {
                if (/^(\d\d\s){4}(\d\d)$/.test(value)) {
                    this.msg['phone'] = '';
                    this.validator['phone'] = true;
                } else {
                    this.msg['phone'] = 'Your number must be like 00 00 00 00 00';
                    this.validator['phone'] = false;
                }
            },
            validatePassword(value) {
                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/.test(value)) {
                    this.msg['password'] = '';
                } else {
                    this.msg['password'] =
                        'Your password must have a minimum of 8 characters (1 uppercase, 1 lowercase, 1 number, 1 special character minimum)';
                }
            },
            validatePasswordComfirme(value) {
                if (this.password === this.passwordComfirme) {
                    this.msg['passwordComfirme'] = '';
                    this.validator['password'] = true;
                } else {
                    this.msg['passwordComfirme'] = 'Comfirmation dosen\'t match';
                    this.validator['password'] = false;
                }
            },
            async update() {
                let body = {};
                if (this.validator.phone === true) {
                    body.phone = this.newPhone;
                    this.$store.state.UserData.phone = this.newPhone;
                };
                if (this.validator.password === true) {
                    body.password = this.password;
                }
                if (this.validator.firstName === true) {
                    body.firstName = this.newFirstName;
                    this.$store.state.UserData.firstName = this.newFirstName;
                }
                if (this.validator.lastName === true) {
                    body.lastName = this.newLastName;
                    this.$store.state.UserData.lastName = this.newLastName;
                }
                if (this.validator.email === true) {
                    body.email = this.newEmail;
                    this.$store.state.UserData.email = this.newEmail;
                }
                if (document.cookie.length > 0) {
                    let cookieArray = document.cookie.split(';');
                    for (let i = 0; i < cookieArray.length; i++) {
                        if (cookieArray[i].indexOf("My_FunSport_Token") != -1) {
                            const cookiename = "My_FunSport_Token=";
                            const access_token = cookieArray[i].substring(cookiename.length, cookieArray[i].length);
                            let requestStatus;
                            await fetch("http://localhost:3000/users", {
                                    "method": "PATCH",
                                    "headers": {
                                        "authorization": "Bearer " + access_token,
                                        "content-type": "application/json"
                                    },
                                    "body": JSON.stringify(body)
                                })
                                .then(res => {
                                    requestStatus = res.status
                                })
                            if (requestStatus === 500) {
                                this.badRequest = true;
                                this.info = false;
                                this.msg.general = "Please Check the form errors";
                            } else {
                                this.msg.general = "User Updated";
                                this.info = true;
                                this.badRequest = false;
                            }

                        }
                    }
                }
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