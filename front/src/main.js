import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(require('vue-moment'))
new Vue({
  router,
  store,
  async beforeCreate(){
    await this.$store.dispatch('getUserData');
  },
  created: function (){
    document.title = 'My Dashboard !';
  },
  render: function (h) { return h(App) }
}).$mount('#app')
