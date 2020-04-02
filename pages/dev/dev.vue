<template>
  <view class="dev bg-height">
    <cu-custom bgcolor="bg-white">
      <block slot="content">永生仪器</block>
    </cu-custom>
    <!-- <button open-type="openSetting" bindopensetting="callback">打开设置页</button> -->
    <noLogin v-if="devList.length<=0" ></noLogin>
    <view v-if="devList.length>0" class="dev-content animation-slide-right">
    <!-- <view class="dev-content animation-slide-right"> -->
		
      <view class="content">
		  <view class="cu-btn changedev text-center flex align-center">
			 <picker @change="PickerChange" :value="index" :range="picker" style-="font-size:30upx">
				{{devList[index].title}}
			  </picker>
			  <view class="remark cuIcon-more" @click="handelDevSign">
			  </view>
		  </view>
        <nodata v-if="data.t.length<=0" :text="'未获取到相关设备数据,请联系管理员'" :height="true"></nodata>
		<view v-else>
			<showDev :datas="tData" :hdatas="hData" v-if="TabCur===0" @changetemperature="design"></showDev>
			<showWaringData v-if="TabCur===1" :waringinfo="waringinfo"></showWaringData>
			<showChartLine v-if="TabCur===2" :datas="chartData"></showChartLine>
			<showOtherChartLine v-if="TabCur===3" :datas="chartData"></showOtherChartLine>
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
              <view v-if="index==0" :class="'ico myico iconfont '+item.icon"></view>
			  <view v-else :class="'ico iconfont '+item.icon"></view>
              {{item.name}}
			  <view v-if="index==1&&isWaring" class="cu-tag badge iconfont iconjinggao war">
				  
			  </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
	  <view class="cu-modal model mymodel" :class="modalName=='designT'?'show':''">
	  	<view class="cu-dialog bg-white">
	  		<view class="cu-bar bg-white justify-end cu-height">
	  			<view class="content">设定温度</view>
	  			<view class="action" @tap="hideModal">
	  				<text class="cuIcon-close text-gray"></text>
	  			</view>
	  		</view>
	  		<view class="bg-white">
	  			<form class="form-box ">
	  				<view class="form-input">
	  					<view class="flex justify-center">
	  						<input v-model="t" value="" placeholder="输入设定温度" type="number" />
	  					</view>
	  					
	  				</view>
	  				<view class="addbtn">
						<button class="cu-btn round sure" @tap="hideModal">取消</button>
	  					<button class="cu-btn round sure bg-linear" @tap="makesure('t')">确认</button>
	  				</view>
	  			</form>
	  		</view>
	  	</view>
	  </view>
	  <view class="cu-modal model mymodel" :class="modalName=='designH'?'show':''">
	  	<view class="cu-dialog bg-white">
	  		<view class="cu-bar bg-white justify-end cu-height">
	  			<view class="content">设定湿度</view>
	  			<view class="action" @tap="hideModal">
	  				<text class="cuIcon-close text-gray"></text>
	  			</view>
	  		</view>
	  		<view class="bg-white">
	  			<form class="form-box ">
	  				<view class="form-input">
	  					<view class="flex justify-center">
	  						<input v-model="h" value="" placeholder="输入设定湿度" type="number" />
	  					</view>
	  					
	  				</view>
	  				<view class="addbtn">
	  						<button class="cu-btn round sure" @tap="hideModal">取消</button>
	  					<button class="cu-btn round sure bg-linear" @tap="makesure('h')">确认</button>
	  				</view>
	  			</form>
	  		</view>
	  	</view>
	  </view>
	
  </view>
</template>

<script>
import showOtherChartLine from './components/showOtherChartLine.vue'
import showDevData from './components/showDevData.vue'
import showDev from './components/showDev.vue'
import showWaringData from './components/showWaringData.vue'
import showChartLine from './components/showChartLine.vue'
import noLogin from '@/components/noLogin.vue'
import nodata from '@/components/noData.vue'
import {setDeviceTemperatureOrHumidity} from '../../apis/index.js'
import { mapState ,mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
	  modalName:null,
      isCanDesign:0,//温湿度是否可修改
      index: 0,
      isLogin: false,
      haveDev: false,
      TabCur: 0,
	  t:null,
	  h:null,
      scrollLeft: 0,
      tabIndex: 0,
      data:{},
      tabList: [
        {
          name: '温/湿度',
          icon: 'iconwenshiduchuanganqi_o'
        },
        
        {
          name: '预警',
          icon: 'iconyujing'
        },
        {
          name: '数据',
          icon: 'iconshuju'
        },
		{
		  name: '其他',
		  icon: 'iconshuju'
		},
		// {
		//   name: '其他',
		//   icon: 'iconshidukongzhi'
		// }
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
	  seetingt:{},
	  seetingh:{},
	  chartData:[],
      waringinfo: {},
	  otherData:[],
	  isWaring:false
    }
  },
  components: {
    showDevData,
    showWaringData,
    showChartLine,
	showOtherChartLine,
    noLogin,
    nodata,
	showDev
  },
  computed: {
    ...mapGetters(['token', 'devList', 'devListMac', 'userInfo','socketInstance']),
	...mapState (['isAppHide']),
    picker() {
	  if(!this.devList) return
      let list = []
      this.devList.forEach(val => {
        list.push(val.title)
      })
      return list
    }
  },
  watch: {
    devListMac(val,old) {
		if(val!=old){
			this.initsocket()
		}
    },
	seetingt(){
	  this.isCanDesign=0
	},
	seetingh(){
	  this.isCanDesign=0
	}
  },
  onShow() {
	  
    if(this.isAppHide) {
	  this.initMac()
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
		  if(json.p){
			 
			  console.log( json.p.p4)
		  }
          
		  this.checkWaring(this.waringinfo )
          this.tData = this.setTemperatureData(json.t)
          this.hData = this.setHumidityData(json.h)
      	  this.chartData=this.setChartData(json)
		  this.otherData=this.serOtherData(json.p)
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
		for(var i=0;i<this.devList.length;i++){
			if (this.devList[i].mac == this.devListMac) {
			  this.index = i
			  this.initsocket()
			  return
			}else{
				this.index = 0
			}
		}	
		this.initsocket()
		this.updateIsAppHide(false)
		
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
	  this.seetingt=data.Ts
      return {
        label: '温度',
        current: Number(data.Ta).toFixed(1),
        setting: Number(data.Ts).toFixed(1),
				output: Number(data.To).toFixed(1),
				unit: '℃'
      }
    },
    setHumidityData(data) {
      if (!data.length) return
      data = this.getLastData(data)
	  this.seetingh=data.Hs
      return {
        label: '湿度',
        current: Number(data.Ha).toFixed(1),
        setting: Number(data.Hs).toFixed(1),
				output: Number(data.Ho).toFixed(1),
				unit: '%'
      }
    },
	design(obj){
		let t=this.tData.setting
		let h=this.hData.setting
		if(this.isCanDesign){
		  return uni.showToast({
		  	title:'设定中，请稍后再试',
			  icon:'none'
		  })
		}
		if(obj.name=='t'){
			if(obj.seeting=='-'){
				t--
			}else if(obj.seeting=='+'){
				t++
			}else{
				this.showHModel(obj.seeting)
			}
		}else{
			if(obj.seeting=='-'){
				h--
			}else if(obj.seeting=='+'){
				h++
			}else{//designT
				this.showHModel(obj.seeting)
			}
		}
		console.log(t,h)
	},
	makesure(str){
		if(str=='t'&&!this.t){
			uni.showToast({
				title:'请填写设定温度',
				icon:'none'
			})
			return false
		}else if(str=='h'&&!this.h){
			uni.showToast({
				title:'请填写设定湿度',
				icon:'none'
			})
			return false
		}
		let t=this.t?this.t:this.tData.setting
		let h=this.h?this.h:this.hData.setting
		console.log(t,h)
		this.hideModal()
	},
	showHModel(str){
		this.modalName=str
	},
	hideModal(){
		this.modalName=null
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
    serOtherData(data){
		if(!data) return;
		let newData=[
			{ name: 'p1', data: [] },
			{ name: 'p2', data: [] },
			{ name: 'p3', data: [] },
			{ name: 'p4', data: [] },
			{ name: 'p5', data: [] },
			{ name: 'p6', data: [] },
			{ name: 'p7', data: [] },
			{ name: 'p8', data: [] },
			{ name: 'p9', data: [] },
			{ name: 'p10', data: [] },
			{ name: 'p11', data: [] },
			{ name: 'p12', data: [] },
			{ name: 'p13', data: [] },
			{ name: 'p14', data: [] },
			{ name: 'p15', data: [] },
			{ name: 'p16', data: [] },
			{ name: 'p17', data: [] },
			{ name: 'p18', data: [] }];
			data.forEach((val)=>{
				console.log(val)
			})
			
			// if(data.length<20){
			//   data.t.forEach((val)=>{
			//     newData[0].data.push(parseInt(val.Ta).toFixed(2))
			//     newData[1].data.push(val.To)
			//   })
			//   data.h.forEach((val)=>{
			//     newData[2].data.push( parseInt(val.Ha).toFixed(2))
			//     newData[3].data.push(val.Ho)
			//   })
			// 		this.isCanDesign=0
			// }else{
			//   newData=this.chartData
			//   this.chartData.forEach((val,index)=>{
			//     newData[index].data=val.data.slice(1)
			//   })
			//   data.t.forEach((val)=>{
			//     newData[0].data.push(parseInt(val.Ta).toFixed(2))
			//     newData[1].data.push(val.To)
			//   })
			//   data.h.forEach((val)=>{
			//     newData[2].data.push( parseInt(val.Ha).toFixed(2))
			//     newData[3].data.push(val.Ho)
			//   })
			// }
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
     padding: 20upx 20upx;
		/deep/.cu-item,.cu-avatar {
		  // margin: 10upx 0;
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  align-items: center;
		  line-height: 70upx;
		  width: 100upx !important;
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
		  .myico{
			  font-size: 80upx;
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
		position: relative;
		.remark{
			font-size: 40upx;
			position: absolute;
			right: 20upx;
			width: 80upx;
		}
    }
	.mymodel{
		
		.form-box{
			height: 400upx;
			background-color: #fff;
			.form-input{
				margin-top: 50upx;
				input{
					text-align: left;
					background-color: #fff;
					width: 60%;
					padding-left: 10upx;
					height: 60upx;
					border: 1px solid #EEEEEE;
					border-radius: 10upx;
				}
			}
			.addbtn{
				background-color: #fff;
				margin-top: 80upx;
				margin-bottom: 30upx;
				button{
					margin: 0 40upx;
				}
			}
		}
		
	}
}
</style>
