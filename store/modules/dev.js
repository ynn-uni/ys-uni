import WebsocketUtils from '../../utils/websocket';
import { socketUrl } from '../../configs/index';

export default {
	//humidity  temperature
  namespaced: true,
  state: {
    socketInstance: null,
	temperature:{},//温度数据
	humidity:{},//湿度数据
	waring:{},//预警数据
	lineData:{}//图表数据
  },
  mutations: {
    updateSocketInstance(state, task) {
      state.socketInstance = task;
    },
	updateTemperature(state, temperature) {
	  state.temperature = temperature;
	},
	updateHumidity(state, humidity) {
	  state.humidity = humidity;
	},
	updateWaring(state, waring) {
	  state.waring = waring;
	},
	updateLineData(state, lineData) {
	  state.lineData = lineData;
	}
   
  },
  actions: {
    initWebsocket(context) {
      const { commit, rootState,dispatch } = context;
      
      return new Promise((resolve, reject) => {
        const instance = new WebsocketUtils({
          url: socketUrl
        });
        
        commit('updateSocketInstance', instance);
		// dispatch('sendDevMac',rootState.user.devListMac)
        resolve(instance);
      });
    },
    closeWebsocket({ state, commit }) {
      state.socketInstance.close();
    },
	//{"mac":that.devMac}
    sendDevMac({ state }, mac) {
      state.socketInstance.send({
        mac
      });
    },
   
  }
};
