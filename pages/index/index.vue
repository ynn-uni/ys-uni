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
        <nodata v-if="!datas.t" :text="'未获取到设备数据,请检查设备是否开启及网络是否连通'" :height="true"></nodata>
		<view v-else>
			<showDev :datas="tData" :hdatas="hData" v-if="TabCur===0" @changetemperature="design"></showDev>
			<showWaringData v-if="TabCur===1" :waringinfo="waringinfo"></showWaringData>
			<showChartLine v-if="TabCur===2" :datas="chartData"></showChartLine>
			<showOtherChartLine v-if="TabCur===3" :datas="otherData"></showOtherChartLine>
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
			  <view v-else :class="'ico '+item.icon"></view>
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
						<button class="cu-btn round sure " @tap="hideModal">取消</button>
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
let cc=0
export default {
  data() {
    return {
			modalName:null,
			designSuccess:1,
      isCanDesign:0,//温湿度是否可修改
	  	u:0,
      index: 0,
      isLogin: false,
      haveDev: false,
      TabCur: 0,
			t:null,
			h:null,
      scrollLeft: 0,
      tabIndex: 0,
      datas:{},
      tabList: [
        {
          name: '温/湿度',
          icon: 'iconwenshiduchuanganqi_o'
        },
        {
          name: '预警',
          icon: 'iconfont iconyujing'
        },
        {
          name: '数据',
          icon: 'iconfont iconshuju'
        },
				{
					name: '其他',
					icon: 'cuIcon-cascades'
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
			seetingt:{},
			seetingh:{},
			chartData:[],
			timeList:[],
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
			if(this.isCanDesign==1){
				this.designSuccess=1
			}
		},
		seetingh(){
			if(this.isCanDesign==1){
				this.designSuccess=1
			}
		}
  },
  onShow() {
    if(this.isAppHide&&this.devList&&this.devList.length>0) {
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
					if (evt.data === 'PONG'){
						// this.datas={} 
						return
					} 
					const json = JSON.parse(evt.data)
					this.datas=json
					if(json.e.e1!==null){
						this.waringinfo = json.e
						this.isCanDesign=json.e.e16
					}
					this.checkWaring(this.waringinfo )
					this.tData = this.setTemperatureData(json.t)
					this.hData = this.setHumidityData(json.h)
					this.chartData=this.setChartData(json)
					this.otherData=this.serOtherData(json.p)
					if(json.u){
						this.u=json.u
					}
        }
      })
    },
		checkWaring(data){
			this.isWaring=false
			if(data.length<=0) return
			for(var i in data){
				if(data[i]==1&&i.split('e')[1]<9&&i!='e6'){
					this.isWaring=true
				}else if(data['e6']==0){
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
			console.log('u:'+this.u,'iscandesign:'+this.designSuccess)
			if(this.u==0){
				return uni.showToast({
					title:'暂时无法设定数据，请稍后再试',
					icon:'none'
				})
			}else if(this.designSuccess==0){
				return uni.showToast({
								title:'数据设定中，请稍后再试',
								icon:'none'})
			}else{
				if(obj.name=='t'){
					if(obj.seeting=='-'){
						t--
						this.setDevTandH(t,h)
					}else if(obj.seeting=='+'){
						t++
						this.setDevTandH(t,h)
					}else{
						this.showHModel(obj.seeting)
					}
				}else{
					if(obj.seeting=='-'){
						h--
						this.setDevTandH(t,h)
					}else if(obj.seeting=='+'){
						h++
						this.setDevTandH(t,h)
					}else{//designT
						this.showHModel(obj.seeting)
					}
				}
			}
		},
		makesure(str){
			if(str=='t'&&!this.t){
				return uni.showToast({
					title:'请填写设定温度',
					icon:'none'
				})
			}else if(str=='h'&&!this.h){
				return uni.showToast({
					title:'请填写设定湿度',
					icon:'none'
				})
			}else{
				let t=this.t?this.t:this.tData.setting
				let h=this.h?this.h:this.hData.setting
				console.log(t,h)
				this.setDevTandH(t,h)
			}
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
				this.designSuccess=0
				this.h=null;
				this.t=null;
			})
			
		},
    setChartData(data){
      if(!data.t||!data.h) return;
      let newData=[{ name: '实时温度', data: [] },
            { name: '设定温度', data: [] },
            { name: '实时湿度', data: [] },
            { name: '设定湿度', data: [] }];
      if(data.t.length>1){
        this.chartData=[]
        data.t.forEach((val)=>{
          newData[0].data.push(parseInt(val.Ta).toFixed(2))
          newData[1].data.push(val.Ts)
        })
        data.h.forEach((val)=>{
          newData[2].data.push( parseInt(val.Ha).toFixed(2))
          newData[3].data.push(val.Hs)
        })
		
      }else{
        newData=this.chartData
        this.chartData.forEach((val,index)=>{
          newData[index].data=val.data.slice(1)
        })
        data.t.forEach((val)=>{
          newData[0].data.push(parseInt(val.Ta).toFixed(2))
          newData[1].data.push(val.Ts)
        })
        data.h.forEach((val)=>{
          newData[2].data.push( parseInt(val.Ha).toFixed(2))
          newData[3].data.push(val.Hs)
        })
      }
      return newData
    },
    serOtherData(data){
			if(!data) return;
			let newData=[
					{ name: '传感器1温度', data: [] },
					{ name: '传感器1湿度', data: [] },
					{ name: '传感器2温度', data: [] },
					{ name: '传感器2湿度', data: [] },
					{ name: '传感器3温度', data: [] },
					{ name: '传感器3湿度', data: [] },
					{ name: '传感器4温度', data: [] },
					{ name: '传感器4湿度', data: [] },
					{ name: '传感器5温度', data: [] },
					{ name: '传感器5湿度', data: [] },
					{ name: '传感器6温度', data: [] },
					{ name: '传感器6湿度', data: [] },
					{ name: '传感器7温度', data: [] },
					{ name: '传感器7湿度', data: [] },
					{ name: '传感器8温度', data: [] },
					{ name: '传感器8湿度', data: [] },
					{ name: '传感器9温度', data: [] },
					{ name: '传感器9湿度', data: [] }
				];
				if(data.length){
					this.otherData=[]
					data.forEach((val,index)=>{
						for(var i in val){
							newData.forEach((el,index2)=>{
								if(i.split('p')[1]==(index2+1)){
									el.data.push(Number(val[i]).toFixed(1))
									// el.data.push(val[i])
								}
							})
						}
					})
				}else{
					newData=this.otherData
					this.otherData.forEach((val,index)=>{
						newData[index].data=val.data.slice(1)
					})
					for(var i in data){
						newData.forEach((el,index2)=>{
							if(i.split('p')[1]==(index2+1)){
								el.data.push(Number(data[i]).toFixed(1))
								// el.data.push(data[i])
							}
						})
					}
				}
				return newData
		},
		handelDevSign(){
      uni.navigateTo({
        url:'/pages/index/Remarks/Remarks'
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
