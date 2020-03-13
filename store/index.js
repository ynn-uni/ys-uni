import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		isLogin:false,//是否登录
		haveDev:'',
		loginStatu:true,//登录状态
		token:'',
		devIndex:'*',//设备索引
		oldIndex:'',//上一个设备索引
		devMac:'',//设备MAC
		devId:'',//设备id
		pid:'',//产品id
		isHide:false,
		isAppHide:false,//用户是否推出小程序
		AreaT:{},//温度图表数据
		AreaH:{},//湿度图表数据
		tel:'',//用户手机号
		email:'',//邮箱
		sessionKey:''
		// realData:{},
		// waringInfo:[]
	},
    mutations: {},
    actions: {}
})
export default store