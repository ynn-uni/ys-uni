import Vue from 'vue'
import App from './App'
import store from './store'
import req from './request/request.js'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.req=req
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
