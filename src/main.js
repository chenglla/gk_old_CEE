// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import App from './App'
import axios from 'axios'
import vueTap from 'vue-js-tap'
import echarts from 'echarts'
// import './assets/iconfont/iconfont.css'
import { Previewer, XDialog, Actionsheet, XAddress, XInput, PopupPicker, XTable, ToastPlugin, XTextarea, ConfirmPlugin, LoadingPlugin, Calendar, DatetimePlugin, Toast, XButton } from 'vux'
// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)
// import FastClick from 'fastclick'
FastClick.attach(document.body)
Vue.use(VueRouter)
Vue.use(vueTap)
Vue.component('previewer', Previewer)
Vue.component('actionsheet', Actionsheet)
Vue.component('x-dialog', XDialog)
Vue.component('toast', Toast)
Vue.component('x-address', XAddress)
Vue.component('x-input', XInput)
Vue.component('calendar', Calendar)
Vue.component('x-button', XButton)
Vue.component('x-textarea', XTextarea)
Vue.component('x-table', XTable)
Vue.component('popup-picker', PopupPicker)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
Vue.prototype.$axios = axios
Vue.prototype.echarts = echarts
FastClick.attach(document.body)
// Vue.prototype.HOST = '/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
