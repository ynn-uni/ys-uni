import { register,login, getDeviceList } from '../../apis';
export default {
  namespaced: true,
  state: {
    userInfo: {},
    token: '',
    code: '',
	devList:[],
	devListMac:'',
    requesting: false
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateToken(state, token) {
      state.token = token;
    },
    updateCodeOnce(state, code) {
      state.code = code;
    },
	updateDevList(state, devlist) {
	  state.devList = devlist;
	},
	updateDevListMac(state, devListMac) {
	  state.devListMac = devListMac;
	},
    updateRequestingStatus(state, status) {
      state.requesting = status;
    }
  },
  actions: {
    // 登录
    wxLogin({ commit, dispatch }) {
      dispatch('getWxCode');
      dispatch('checkUserSetting');
    },
    getWxCode({state, commit }) {
      return uni.login().then(res => {
        const [error, data] = res;
        if (error) {
          console.error(error);
        }
		
        commit('updateCodeOnce', data.code);
		
      });
    },
    // 检查用户授权设置
    checkUserSetting({state,dispatch }) {
		
      uni.getSetting().then(res => {
		  
        const [error, data] = res;
        if (error) {
          console.error(error);
        }
		// console.log("已经授权",data)
        if (data.authSetting['scope.userInfo']) {
			console.log("已经授权",data)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          dispatch('getWxUserInfo');
        }
      });
    },
    // 获取微信的用户信息
    getWxUserInfo({ state, dispatch }) {
      uni
        .getUserInfo({
          withCredentials: true
        })
        .then(res => {
          const [error, data] = res;
          if (error) {
            console.error(error);
          }
          if (data) {
            const { iv, encryptedData } = data;
            if (state.code) {
              dispatch('loginWithUserInfo', { iv, encryptedData });
            } else {
              console.log('code is not exsit');
            }
          }
        });
    },
    // 在后端登录或注册
    loginWithUserInfo({ state, commit, dispatch },payload) {
      return login({
        code: state.code
      }).then(res => {
        // commit('updateCodeOnce', null);
		const {email,phone,key}=res.data;
		const userinfo= {email,phone,key};
		
		commit('updateUserInfo', userinfo);
		console.log(state.userInfo)
		if(res.status===0){
			commit('updateToken', res.data.token);
			
			dispatch('fatchDevListByToken');
		}else{
			dispatch('registerWithUserInfo',payload);
		}
        
      });
    },
	registerWithUserInfo({ state, commit, dispatch }, payload) {
		// console.log(state.code)
	  return register({
	    sessionKey: state.userInfo.key,
	    ...payload // iv, encryptedData
	  }).then(res => {
		  console.log(res)
	    commit('updateCodeOnce', null);
	    commit('updateToken', res.data.token);
	    const {email,phone}=res.data;
	    const userinfo= {email,phone};
	    commit('updateUserInfo', userinfo);
		dispatch('fatchDevListByToken');
	  });
	},
    // 从后端获取用户信息
    fatchDevListByToken({ state,commit }) {
      getDeviceList().then(res => {
        console.log(res);
        commit('updateDevList', res.data);
		if(res.data.length>0&&state.devListMac==''){
			commit('updateDevListMac', res.data[0].mac);
		}
		
      });
    }
  }
};
