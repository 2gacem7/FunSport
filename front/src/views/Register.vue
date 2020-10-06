<template>
    <div id="register">
        <Navbar />

        <div class="container pt-3" style="padding-bottom:100vh;">
            <div class="card" style="background-color:#f4f4f4e3;margin-top:100px">
                <div class="card-header">
                    <h1>Register</h1>
                </div>
                <div class="card-body w-100 mx-auto">
                    <div class="row mt-3" v-if="info === true">
                        <span class="text-danger" v-if="msg.general" style="background-color:#f4f4f4e3;">{{ msg.general }}</span>
                    </div>
                    <div class="row mt-2">
                        <label>Name</label>
                    </div>
                    <div class="row mt-2">
                        <input type="text" name="name" required placeholder="nom" v-model="name">
                    </div>
                    <div class="row mt-3">
                        <span class="text-danger" v-if="msg.name" style="background-color:#f4f4f4e3;">{{msg.name}}</span>
                    </div>
                    <div class="row mt-2">
                        <label>Mail Adress</label>
                    </div>
                    <div class="row mt-2">
                        <input type="text" name="email" required placeholder="email" v-model="email">
                    </div>
                    <div class="row mt-3">
                        <span class="text-danger" v-if="msg.email" style="background-color:#f4f4f4e3;">{{msg.email}}</span>
                    </div>
                    <div class="row mt-2">
                        <label>Password</label>
                    </div>
                    <div class="row mt-2">
                        <input type="password" name="password" required v-model="password">
                    </div>
                    <div class="row mt-3">
                        <span class="text-danger" v-if="msg.password" style="background-color:#f4f4f4e3;">{{msg.password}}</span>
                    </div>
                    <div class="row mt-2">
                        <label>Password Confirm</label>
                    </div>
                    <div class="row mt-2">
                        <input type="password" name="passwordComfirme" required v-model="passwordComfirme">
                    </div>
                    <div class="row mt-3">
                        <span class="text-danger" v-if="msg.passwordComfirme" style="background-color:#f4f4f4e3;">{{msg.passwordComfirme}}</span>
                    </div>
                    <div class="row mt-2">
                        <button class="btn btn-info" @click="register()">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/NavBar.vue"

    export default {
        name: 'Register',
        components: {

            Navbar,

        },
        data() {
            return {
                name: "",
                email: "",
                password: "",
                passwordComfirme: "",
                msg: [],
                validator: [],
                info: false,
            }
        },
        watch: {
            email(value) {
                this.email = value;
                this.validateEmail(value);
            },
            name(value) {
                this.name = value;
                this.validateName(value);
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
            if (document.cookie.length > 0) {
                let cookieArray = document.cookie.split(';');
                for (let i = 0; i < cookieArray.length; i++) {
                    if (cookieArray[i].indexOf("My_Dashboard_Token") != -1) {
                        this.$router.push({
                            path: '/'
                        });
                    }
                }
            }
            this.validator['email'] = false;
            this.validator['name'] = false;
            this.validator['password'] = false;

        },
        methods: {
            validateEmail(value) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    this.msg['email'] = '';
                    this.validator['email'] = true;
                } else {
                    this.msg['email'] = 'Adresse Email incorecte';
                    this.validator['email'] = false;
                }
            },
            validateName(value) {
                if (/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
                    this.msg['name'] = '';
                    this.validator['name'] = true;
                } else {
                    this.msg['name'] = 'Votre nom doit contenir entre 3 et 16 caractere et ou chiffre';
                    this.validator['name'] = false;
                }
            },
            validatePassword(value) {
                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/.test(value)) {
                    this.msg['password'] = '';
                } else {
                    this.msg['password'] =
                        'Votre mot de passe doit posseder minimum 8 caracteres (1 majuscule, 1 minuscule, 1 chiffre, 1 caractere spécial au minimum)';
                }
            },
            validatePasswordComfirme(value) {
                if (this.password === this.passwordComfirme) {
                    this.msg['passwordComfirme'] = '';
                    this.validator['password'] = true;
                } else {
                    this.msg['passwordComfirme'] = 'Comfirmation differente du mot de passe';
                    this.validator['password'] = false;
                }
            },
            async register() {
                if (this.validator.name === true && this.validator.email === true && this.validator.password ===
                    true) {
                    let body = {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                    let requestStatus;
                    await fetch("http://localhost:3000/users", {
                            "method": "POST",
                            "headers": {
                                "content-type": "application/json"
                            },
                            "body": JSON.stringify(body)
                        })
                        .then(res => {
                            requestStatus = res.status
                        })
                    if (requestStatus === 400) {
                        this.info = true;
                        this.msg['general'] = "Compte existant pour " + this.email;
                    } else {
                        let userData = {};
                        await fetch("http://localhost:3000/auth/login/", {
                                "method": "Post",
                                "headers": {
                                    "content-type": "application/json"
                                },
                                "body": JSON.stringify(body)
                            })
                            .then(res => res.clone().json())
                            .then(json => userData = json);
                        const date = new Date(Date.now() + 86400000)
                        document.cookie = "My_Dashboard_Token=" + userData.access_token + "; expires=" + date +
                            "; path=/;SameSite=LAX;";
                        this.$store.dispatch('getUserData');
                        this.$router.push({
                            path: '/'
                        });
                    }
                } else {
                    this.info = true;
                    this.msg['general'] = "Informations manquante dans le formulaire";
                }
            }

        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
.card-body{
  background-color: rgb(72, 99, 255);
  font-family: 'Roboto Mono', monospace;
}
.card-header{
  background-color: rgba(72, 99, 255, 0.515);
  font-family: 'Roboto Mono', monospace;
}
</style>