// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'

Vue.config.productionTip = false
import './net/request'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
MuseUI.theme.add('teal', {
  primary: '#009688',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b'
}, 'light').use('teal')

Vue.use(MuseUI)

import Toast from 'muse-ui-toast';

Vue.use(Toast);

import store from './store/index.js'
import './permission'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
