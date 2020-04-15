import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import dev from './modules/dev';
import user from './modules/user';

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		isAppHide:true,//用户是否退出小程序
	},
	mutations:{
		updateIsAppHide(state,isAppHide){
			state.isAppHide=isAppHide
		}
	},
   modules: {
	 dev,
	 user
   },
   getters
})
export default store