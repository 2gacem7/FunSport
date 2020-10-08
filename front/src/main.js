import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(require('vue-moment'))
new Vue({
  router,
  store,
  async beforeCreate(){
    await this.$store.dispatch('getSports');

    await this.$store.dispatch('getUserData');
    await this.$store.dispatch('getMySports');


  },
  created: function (){
    document.title = 'FunSport !';
  },
  render: function (h) { return h(App) }
}).$mount('#app')
