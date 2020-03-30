<template>
  <view class="dev bg-height">
    <cu-custom bgcolor="bg-white">
      <block slot="content">永生仪器</block>
    </cu-custom>
    <!-- <button open-type="openSetting" bindopensetting="callback">打开设置页</button> -->
    <noLogin v-if="devList.length<=0" ></noLogin>
    <view v-if="devList.length>0" class="dev-content animation-slide-right">
     
      <view class="content">
        <nodata v-if="data.t.length<=0" :text="'未获取到相关设备数据,请联系管理员'" :height="true"></nodata>
		<view v-else>
			<showDevData :datas="tData" v-if="TabCur===0" @changetemperature="designTemperature"></showDevData>
			<showDevData :datas="hData" v-if="TabCur===1"></showDevData>
			<showWaringData v-if="TabCur===2" :waringinfo="waringinfo"></showWaringData>
			<showChartLine v-if="TabCur===3" :datas="chartData"></showChartLine>
		</view>
        <scroll-view scroll-x class="bg-white nav margin-tb">
          <view class="flex text-center tablist">
            <view
              class="cu-item flex-sub cu-avatar"
              :class="index==TabCur?'activeTab':''"
              v-for="(item,index) in tabList"
              :key="index"
              @tap="tabSelect"
              :data-id="index"
            >
              <view :class="'ico iconfont '+item.icon"></view>
              {{item.name}}
			  <view v-if="index==2&&isWaring" class="cu-tag badge iconfont iconjinggao war">
				  
			  </view>
            </view>
          </view>
        </scroll-view>
      </view>
	  <picker @change="PickerChange" :value="index" :range="picker" style-="font-size:30upx">
	    <button class="cu-btn changedev text-center">{{devList[index].title}}</button>
	  </picker>
      <!-- <view @click="handelDevSign">
        查看备注
      </view> -->
    </view>
  </view>
</template>

<script>
import showDevData from './components/showDevData.vue'
import showWaringData from './components/showWaringData.vue'
import showChartLine from './components/showChartLine.vue'
import noLogin from '@/components/noLogin.vue'
import nodata from '@/components/noData.vue'
import {setDeviceTemperatureOrHumidity} from '../../apis/index.js'
import { mapState ,mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isCanDesign:0,//温湿度是否可修改
      index: 0,
      isLogin: false,
      haveDev: false,
      TabCur: 0,
      scrollLeft: 0,
      tabIndex: 0,
      data:{},
      tabList: [
        {
          name: '温度',
          icon: 'iconwendukongzhi'
        },
        {
          name: '湿度',
          icon: 'iconshidukongzhi'
        },
        {
          name: '预警',
          icon: 'iconyujing'
        },
        {
          name: '数据',
          icon: 'iconshuju'
        }
      ],
      tData: {
        label: '温度',
        current: 0,
        setting: 0,
				output: 0,
				unit: '℃'
      },
      hData: {
				label: '温度',
        current: 0,
        setting: 0,
        output: 0,
				unit: '%'
      },
	  seeting:{},
	  chartData:[],
      waringinfo: {},
	  isWaring:false
    }
  },
  components: {
    showDevData,
    showWaringData,
    showChartLine,
    noLogin,
    nodata
  },
  computed: {
    ...mapGetters(['token', 'devList', 'devListMac', 'userInfo','socketInstance']),
	...mapState (['isAppHide']),
    picker() {
      let list = []
      this.devList.forEach(val => {
        list.push(val.title)
      })
      return list
    }
  },
  watch: {
    devListMac() {
      this.initsocket()
    },
	seeting(){
	  this.isCanDesign=0
	}
  },
  onLoad() {
	  
  	if (!this.isAppHide) {
	  this.initMac()
  	  this.initsocket()
  	}
  },
  onShow() {
	  
    if (this.isAppHide) {
	  this.initMac()
      this.initsocket()
    }
    
  },
 
  methods: {
    ...mapActions('dev', ['initWebsocket', 'closeWebsocket']),
    ...mapMutations('user', ['updateDevListMac']),
	...mapMutations( ['updateIsAppHide']),
    initsocket() {
		if(this.socketInstance){
			this.socketInstance.close()
		}
		
      this.initWebsocket().then(instance => {
		  this.updateIsAppHide(false)
        instance.onopen = evt => {
          instance.send({ mac: this.devListMac })
        }
        instance.onmessage = evt => {
			console.log(evt)
          if (evt.data === 'PONG') return
          const json = JSON.parse(evt.data)
          this.data=json
		  if(json.e.e1!==null){
			  this.waringinfo = json.e
		  }
          
		  this.checkWaring(this.waringinfo )
          this.tData = this.setTemperatureData(json.t)
          this.hData = this.setHumidityData(json.h)
      	  this.chartData=this.setChartData(json)
        }
      })
    },
	checkWaring(data){
		if(data.length<=0) return
		for(var i in data){
			if(data[i]==1){
				this.isWaring=true
			}
		}
	},
    initMac(){
		this.devList.forEach((val, index) => {
		  if (val.mac == this.devListMac) {
		    this.index = index
		  } else {
		    this.index = 0
		  }
		})
	},
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    PickerChange(e) {
      //选择设备
      this.index = e.detail.value //index为选择序列下标
      this.updateDevListMac(this.devList[this.index].mac)
    },
    
    getLastData(data) {
      if (Array.isArray(data)) {
        const length = data.length
        return data[length - 1]
      } else {
        return data
      }
    },
    setTemperatureData(data) {
      if (!data.length) return
      data = this.getLastData(data)
      return {
        label: '温度',
        current: +(data.Ta / 100).toFixed(2),
        setting: data.Ts,
				output: data.To,
				unit: '℃'
      }
    },
    setHumidityData(data) {
      if (!data.length) return
      data = this.getLastData(data)
      return {
        label: '湿度',
        current: +(data.Ha / 100).toFixed(2),
        setting: data.Hs,
				output: data.Ho,
				unit: '%'
      }
    },
	designTemperature(str){
		console.log(str,this.isCanDesign)
		let t=this.tData.setting
		let h=this.hData.setting
		if(this.isCanDesign){
		  return uni.showToast({
		  	title:'温度设定中',
			  icon:'none'
		  })
		}
		if(str=='-'){
			t--
		}else{
			t++
		}
		this.setDevTandH(t,h)
	},
	setDevTandH(t,h){
		let obj={
			mac:this.devListMac,
			temperature:t,
			humidity:h
		}
		setDeviceTemperatureOrHumidity(obj).then((res)=>{
			this.isCanDesign=1
		})
		
	},
    setChartData(data){
      if(!data.t||!data.h) return;
      let newData=[{ name: '实时温度', data: [] },
            { name: '输出温度', data: [] },
            { name: '实时湿度', data: [] },
            { name: '输出湿度', data: [] }];
      if(data.t.length>1){
        this.chartData=[]
        data.t.forEach((val)=>{
          newData[0].data.push(parseInt(val.Ta).toFixed(2))
          newData[1].data.push(val.To)
        })
        data.h.forEach((val)=>{
          newData[2].data.push( parseInt(val.Ha).toFixed(2))
          newData[3].data.push(val.Ho)
        })
		this.isCanDesign=0
      }else{
        newData=this.chartData
        this.chartData.forEach((val,index)=>{
          newData[index].data=val.data.slice(1)
        })
        data.t.forEach((val)=>{
          newData[0].data.push(parseInt(val.Ta).toFixed(2))
          newData[1].data.push(val.To)
        })
        data.h.forEach((val)=>{
          newData[2].data.push( parseInt(val.Ha).toFixed(2))
          newData[3].data.push(val.Ho)
        })
      }
      return newData
    },
    handelDevSign(){
      uni.navigateTo({
        url:'/pages/dev/Remarks/Remarks'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dev {
  min-height: 100vh;
  background-color: #fff;
  overflow: auto;
  // padding-bottom: 100upx;
  .tablist {
    padding: 25upx 20upx;
    /deep/.cu-item,.cu-avatar {
      // margin: 10upx 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 70upx;
      width: 100upx;
      height: 200upx;
      box-shadow: 0px 0px 20upx 0px rgba(120, 134, 238, 0.22);
      border-radius: 15upx;
	  background-color: #fff;
	  font-size: 34upx;
	  color: #333333;
      .ico {
        font-size: 60upx;
        color: $primaryColor;
      }
	  .war{
		  width: 30upx;
		  height: 30upx;
		  line-height: 30upx;
		  font-size: 34upx;
		  left: 5upx;
		  top:5upx
	  }
    }
    .activeTab {
      color: #ffffff;
      background: linear-gradient(135deg, #7285ed 0%, #b791f7 100%);
      .ico {
        color: #ffffff;
      }
    }
  }
  .changedev {
    display: block;
    margin: 0 auto;
    width: 690upx;
    height: 80upx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20upx 0px rgba(120, 134, 238, 0.22);
    border-radius: 14upx;
    font-size: 30upx;
    color: rgba(51, 51, 51, 1);
    line-height: 70upx;
    letter-spacing: 2upx;
    margin-top: 20upx;
    margin-bottom: 20upx;
  }
}
</style>
