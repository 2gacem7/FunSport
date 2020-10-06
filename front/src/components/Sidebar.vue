<template>
    <div class="sidebar">
        <div class="sidebar-container">
            <div class="sidebar-logo">
                <h5>My Dashboard</h5>
            </div>
            <ul class="sidebar-navigation">
                <li class="header">Hello {{ this.$store.state.UserData[0].email }} !</li>
                <li class="header">My Subscription</li>
                <li v-for="service in this.$store.state.UserData[0].services" v-bind:key="service.id">
                    <a @click="addWidget(service)">
                        <i class="fa" aria-hidden="true"></i> {{ service }}
                    </a>
                </li>
                <li>
                    <a @click="addServices()">
                        <i class="fa" aria-hidden="true"></i> Update my services
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sidebar",
        components: {},
        data() {
            return {
                value: "",
            };
        },
        methods: {
            async addServices(){
                this.resetButton()
                this.$parent.subButton = true;
            },

            async addWidget(service){
                if(service == "weather"){
                    this.resetButton()
                    this.$parent.addWidgetWeatherButton = true;

                }

                if(service == "time"){
                    this.resetButton()
                    this.$parent.addWidgetTimeButton = true;

                }
                if(service == "todo"){
                    this.resetButton()
                    this.$parent.addWidgetTodoButton = true;

                }
                if(service == "youtube"){
                    this.resetButton()
                    this.$parent.addWidgetYoutubeButton = true;
                }
                if(service == "covid"){
                    this.resetButton()
                    this.$parent.addWidgetCovidButton = true;
                }
            },
            resetButton(){
                this.$parent.subButton=false,

                this.$parent.addWidgetWeatherButton= false,
                this.$parent.updateWidgetWeatherButton= false,

                this.$parent.addWidgetTimeButton= false,
                this.$parent.updateWidgetTimeButton= false,

                this.$parent.addWidgetYoutubeButton= false,
                this.$parent.updateWidgetYoutubeButton= false,

                this.$parent.addWidgetCovidButton= false,
                this.$parent.updateWidgetCovidButton= false,

                this.$parent.addWidgetTodoButton= false,
                this.$parent.updateWidgetTodoButton= false
            }
        }
    };
</script>

<style>
    .sidebar-container {
        position: fixed;
        width: 220px;
        height: 100%;
        top: 70px;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background: #1a1a1a;
        color: #fff;
    }


    .sidebar-logo {
        padding: 10px 15px 10px 30px;
        font-size: 20px;
        background-color: #2574A9;
    }

    .sidebar-navigation {
        padding: 0;
        margin: 0;
        list-style-type: none;
        position: relative;
    }

    .sidebar-navigation li {
        background-color: transparent;
        position: relative;
        display: inline-block;
        width: 100%;
        line-height: 20px;
    }

    .sidebar-navigation li a {
        padding: 10px 15px 10px 30px;
        display: block;
        color: #fff;
    }

    .sidebar-navigation li .fa {
        margin-right: 10px;
    }

    .sidebar-navigation li a:active,
    .sidebar-navigation li a:hover,
    .sidebar-navigation li a:focus {
        text-decoration: none;
        outline: none;
    }

    .sidebar-navigation li::before {
        background-color: #2574A9;
        position: absolute;
        content: '';
        height: 100%;
        left: 0;
        top: 0;
        -webkit-transition: width 0.2s ease-in;
        transition: width 0.2s ease-in;
        width: 3px;
        z-index: -1;
    }

    .sidebar-navigation li:hover::before {
        width: 100%;
    }

    .sidebar-navigation .header {
        font-size: 12px;
        text-transform: uppercase;
        background-color: #151515;
        padding: 10px 15px 10px 30px;
    }

    .sidebar-navigation .header::before {
        background-color: transparent;
    }
</style>