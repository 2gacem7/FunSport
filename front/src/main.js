import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';

VMdPreview.use(githubTheme);
VueMarkdownEditor.use(vuepressTheme);
VueMarkdownEditor.lang.use('en-US', enUS);
Vue.use(VueMarkdownEditor);
Vue.use(VMdPreview);

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
