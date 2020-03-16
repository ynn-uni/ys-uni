<template>
	 <transition name="fade">
	    <view class="devdetail">
	    	<view class="dev-info">
	    		<text class="devname">{{devTitle}}</text>
				<picker @change="PickerChange" :value="index" :range="picker" style-="font-size:30upx">
					<text class="choosedev-btn"></text>
				</picker>
	    		<text class="tool" @tap="handelRemarks"></text>
	    	</view>
	    	<!-- <view class="search dev-box">
	    		<image src="../static/images/devdetail13.png" mode=""></image>
	    		<text>储存物品名称名称</text>
				<text>{{data}}</text>
	    	</view> -->
	    	<view class="show-info">
	    		<view class="dev-box temperature">
	    			<view class="real-data">
	    				<!-- <image src="../static/images/devdetail11.png" mode=""></image> -->
						<image src="../static/images/devdetail12.png" mode=""></image>
	    				<text class="real-text">实时温度</text>
	    				<text class="real-num">{{realData.temperature.Ta}}℃</text>
	    			</view>
	    			<view class="out-data">
	    				<!-- <view class="output">
	    					<text>输出</text>
	    					<text>{{realData.temperature.To}}℃</text>
	    				</view> -->
						<view class="outputdata">
							<text>输出</text>
							<text  class="out-num">{{realData.temperature.To}}℃</text>
						</view>
	    				<image src="../static/images/devdetail1.png" mode=""></image>
						<!-- <image src="../static/images/devdetail2.png" mode=""></image> -->
						
	    			</view>
	    			<view class="design">
	    				<view class="bg-line">
	    					
	    				</view>
	    				<view class="design-title">
	    					设定温度
	    				</view>
	    				<view class="design-btn">
	    					
	    					<button class="cu-btn cuIcon move" @tap="subtract('t')">
	    						<text class="cuIcon-move"></text>
	    					</button>
	    					<text class="num">{{realData.temperature.Ts}}℃</text>
	    					<button class="cu-btn cuIcon add" @tap="add('t')">
	    						<text class="cuIcon-add"></text>
	    					</button>
	    				</view>
	    			</view>
	    		</view>
	    		<view class="dev-box temperature humidity">
	    			<view class="real-data">
	    				<image src="../static/images/devdetail11.png" mode=""></image>
	    				<text class="real-text">实时湿度</text>
	    				<text class="real-num">{{realData.humidity.Ha}}%</text>
	    			</view>
	    			<view class="out-data">
	    				<!-- <view class="output">
	    					<text>输出</text>
	    					<text>{{realData.humidity.Ho}}%</text>
	    				</view> -->
						<view class="outputdata">
							<text>输出</text>
							<!-- <text >{{realData.temperature.To}}℃</text> -->
							<text  class="out-num">{{realData.humidity.Ho}}%</text>
						</view>
	    				<image src="../static/images/devdetail1.png" mode=""></image>
	    			</view>
	    			<view class="design">
	    				<view class="bg-line">
	    					
	    				</view>
	    				<view class="design-title">
	    					设定湿度
	    				</view>
	    				<view class="design-btn">
	    					
	    					<button class="cu-btn cuIcon move" @tap="subtract('h')">
	    						<text class="cuIcon-move"></text>
	    					</button>
	    					<text class="num">{{realData.humidity.Hs}}%</text>
	    					<button class="cu-btn cuIcon add" @tap="add('h')">
	    						<text class="cuIcon-add"></text>
	    					</button>
	    				</view>
	    			</view>
	    		</view>
	    	</view>
	    	<view class="waring dev-box">
	    		<view class="title">
	    			监控预警
	    		</view>
	    		<uni-grid :column="5" :show-border="false"  :square="false" class="gride">
	    		    <uni-grid-item v-for="(item,index) in showWaringInfo" :key="index">
	    				<view class="gride-item" :class="item.more===undifined?'waring-info':''" @tap="handelMore(item.more)">
	    					<image :src="item.statu==0?'../static/images/devdetail7.png':'../static/images/devdetail8.png'" mode="" v-if="!item.more"></image>
	    					<text v-if="!item.more">{{item.name}}</text>
							<text class="w-info" :class="item.more" v-if="item.more"></text>
	    				</view>
						
						
					</uni-grid-item>
	    			
						
	    		</uni-grid>
				<!-- <view @tap="handelMore" >
					<view class=" waring-info" >
						<text class="cuIcon-more w-info"></text>
						<text class="more-info">更多</text>
					</view>
				</view> -->
	    	</view>
	    	<view class="chart dev-box">
	    		<view class="title title-tb">
	    			报表统计
					<!-- <view class="choose">
						<text :class="isActive?'active':''" @tap="chooseTb('wd')">温度</text>
						<text :class="isActive?'':'active'" @tap="chooseTb('sd')">湿度</text>
					</view> -->
	    		</view>
	    		<view class="qiun-charts" >
					<view class="charts">
						<canvas canvas-id="canvasArea1" id="canvasArea1" class="chartsCan"  @touchstart="touchArea"></canvas>
					</view>
	    			<!-- <view class="charts" v-show="!isActive">
	    				<canvas canvas-id="canvasArea2" id="canvasArea2" class="chartsCan" @touchstart="touchArea1"></canvas>
	    			</view> -->
					
	    		</view>
	    	</view>
	    </view>
	
	 </transition>
</template>

<script>
	// import req from '@/request/request.js'
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker.js';
	import {heartcheck,realData,waringInfo} from '@/utils/devdetail.js'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	var _self;
	var canvaArea=null;
	var canvaArea1=null;
   
	export default {
		data() {
			return {
				isCanDesign:0,//温湿度是否可修改
				devlist:[],//设备列表
				devTitle:'',//设备标题
				realData:realData,//用于图表实时的温度湿度
				waringInfo:waringInfo,//警告信息总量
				showWaringInfo:[],
				isMore:false,//是否显示更多
				deviceData:{},//设备数据
				sendData:{},//发送的设备信息
				data:'devname',//备注
				token:'',
				devMac:'',//发送的设备MAC
				cWidth:'',//画布宽
				cHeight:'',//画布高
				pixelRatio:1,//像素比
				textarea:'',
				index: null,//设备索引
				picker: [],//替换设备下弹框信息列表
				// isActive:true,//温湿度图表切换标志
				Area:{categories:[1,2,3],series:[{name:'实时温度',data:[10,20,50]},{name:'输出温度',data:[30,40,30]},{name:'实时湿度',data:[50,60,60]},{name:'输出湿度',data:[70,80,10]}]},//图表数据对象
				AreaH:{categories:[],series:[{name:'实时湿度',data:[]},{name:'输出湿度',data:[]}]},
				limit:0,//设置重连次数（断开后超过一定次数不再重连每次间隔5秒）
				heartCheck:heartcheck,//心跳链接对象,
				change:true
			}
		},
		props:{
			devlist1:{}//接收index传过来的list列表
		},
		 components: {
			 uniGrid,
			 uniGridItem
		},
		
		
		mounted() {
			console.log(this.$store.state.isHide)
			// console.log(isActive)
			_self=this;
			var that=this;
			
			// uni.showLoading()
				
				
				//#ifdef MP-ALIPAY
				uni.getSystemInfo({
					success: function (res) {
						if(res.pixelRatio>1){
							//正常这里给2就行，如果pixelRatio=3性能会降低一点
							//_self.pixelRatio =res.pixelRatio;
							_self.pixelRatio =2;
							// this.linkSocket();
						}
					}
				});
				//#endif
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(600);
				// this.showArea("canvasArea1",that.Area);
				
				console.log('devdetail-monted');
				console.log(that.$store.state.token);
				// 获取缓存token
				
				if(that.$store.state.devIndex!='*'){
					that.index=that.$store.state.devIndex;
				}
				
				 that.token=that.$store.state.token;
				 if(that.devlist1.length>0){//如果父组件有传设备列表直接使用设备列表数据，初始化信息并连接socket
					 that.devlist=that.devlist1;
					 that.devDetailInit()
				 }else{//无设备列表信息（即直接从我的-设备列表跳转过来，先获取设备列表再初始化信息）
					 that.req.httpTokenRequest({
						url:'/Api/Device/getDeviceList',
						method:'GET'
					 }).then((res)=>{ 
						 console.log(res)
						 that.devlist=res.data.data;
						 that.devDetailInit()
					 })
				 }
				 
				
			
			
		},
		
		
		methods: {
			devDetailInit(){//初始化
				var that=this;
				console.log(that.devlist)
				// that.devlist=res.data.result.data
				console.log(that.$store.state.devMac)
				console.log(that.index)
				if(that.devlist[that.index]&&that.devlist[that.index].mac!=that.$store.state.devMac){
					console.log("我的-1")
					//设备存在且设备mac更改（连接保持更换设备mac，重新创建连接，从我的-设备，跳转之设备详情且设备发生改变的情况）
					that.devMac=that.devlist[that.index].mac
				}else if(that.devlist[that.index]&&that.devlist[that.index].mac==that.$store.state.devMac){
					//设备存在且设备mac未更改（直接将store中保存的mac赋值，重新创建连接，从我的-设备，跳转之设备详情且设备未发生改变的情况）
					console.log("我的-2")
					that.devMac=that.$store.state.devMac
				}else{
					//设备不存在（首次打开设备详情页或显示的设备已被删除）
					// let index=that.devlist.length-1
					that.devMac=that.devlist[0].mac
					that.index=0
				}
				that.$store.state.devMac=that.devMac
				// console.log(that.devlist.length-1)
				console.log(that.index)
				console.log(that.devMac)
				
				//获取到设备信息后连接socket
				console.log(this.$store.state.isHide)
				if(this.$store.state.isHide==false){//isHide为false会重新连接socket
					console.log("b-------alabala")
					that.linkSocket()
				}else{
					console.log("未重连socket")
					// that.realData=that.$store.state.realData;
					that.Area=that.$store.state.Area
					// that.AreaH=that.$store.state.AreaH
					// that.waringInfo=that.$store.state.waringInfo
					// console.log(that.Area)
					that.showArea("canvasArea1",that.Area);
					// that.showArea1("canvasArea2",that.AreaH);
					uni.hideLoading();
					that.initEventHandle();
				}
				// that.linkSocket()
				that.picker.splice(0)
				for(var i in that.devlist){
					that.picker.push(that.devlist[i].title)
				}
				that.devTitle=that.picker[that.index]
			},
			linkSocket(){
			  let that = this;
			  wx.connectSocket({
			    // url: app.globalData.wsUrl + 'websocket?' + this.data.taskId + '&' + this.data.userId,47.107.151.209
						  // url: 'ws://123.207.231.244',
						   url: 'ws://47.107.151.209:9503',
						   // url: 'ws://192.168.1.65:9503',
			    success:()=> {
					that.$store.state.isHide=true;
					that.$store.state.isAppHide=true;
			      console.log('建立连接成功')
			      that.initEventHandle()
			    }
			  })
			},
			initEventHandle(){//封装socket各事件
				var that=this;
				//已经创建链接，从我的-设备列表跳转过来
				if(that.$store.state.devIndex!=that.$store.state.oldIndex&&that.$store.state.devIndex!='*'&&this.$store.state.isHide==true){
					this.$store.state.oldIndex=that.index;
					// var sendData={id:that.devMac,token:that.token};
					// var sendData={"mac":that.devMac,"token":that.token};
					var sendData={"mac":that.devMac};
					console.log(sendData)
					this.heartCheck.reset().start(sendData)
				}
				console.log("kkk:"+that.index)
				wx.onSocketMessage((res) => {
					var taht=this;
					console.log("接收到消息")
					console.log(res)
				  //收到消息
				  if (res.data == "PONG"){
					this.heartCheck.reset().start('ping')
				  }else{
					//处理数据
					// this.data=res.data
					console.log("可以处理数据")
					console.log(JSON.parse(res.data))
					var data=JSON.parse(res.data)
					that.deviceData=data;
					
					that.isCanDesign=that.deviceData.u;
					that.realData.temperature.Ta=Math.round((that.deviceData.t[0].Ta)*10)/10
					that.realData.temperature.To=that.deviceData.t[0].To
					that.realData.temperature.Ts=that.deviceData.t[0].Ts
					that.realData.humidity.Ha=Math.round((that.deviceData.h[0].Ha)*10)/10
					that.realData.humidity.Ho=that.deviceData.h[0].Ho
					that.realData.humidity.Hs=that.deviceData.h[0].Hs
					console.log(that.realData)
					//重置预警信息
					that.waringInfo.splice(0)
					for(var i in that.deviceData.e){
						if(i=='e1'){
							that.waringInfo.push({name:'超温',statu:that.deviceData.e[i]})
						}else if(i=='e2'){
							that.waringInfo.push({name:'断水',statu:that.deviceData.e[i]})
						}else if(i=='e3'){
							that.waringInfo.push({name:'水堵',statu:that.deviceData.e[i]})
						}else if(i=='e4'){
							that.waringInfo.push({name:'温偏差',statu:that.deviceData.e[i]})
						}else if(i=='e5'){
							that.waringInfo.push({name:'湿偏差',statu:that.deviceData.e[i]})
						}else if(i=='e6'){
							that.waringInfo.push({name:'电源错误',statu:that.deviceData.e[i]})
							// that.waringInfo.push({name:'电源错误',statu:1})
						}else if(i=='e7'){
							that.waringInfo.push({name:'SOS',statu:that.deviceData.e[i]})
						}else if(i=='e8'){
							that.waringInfo.push({name:'内存错误',statu:that.deviceData.e[i]})
						}else if(i=='e9'){
							that.waringInfo.push({name:'系统错误',statu:that.deviceData.e[i]})
						}else if(i=='e10'){
							that.waringInfo.push({name:'压缩机一',statu:that.deviceData.e[i]})
						}else if(i=='e11'){
							that.waringInfo.push({name:'压缩机二',statu:that.deviceData.e[i]})
						}else if(i=='e12'){
							that.waringInfo.push({name:'风机状态',statu:that.deviceData.e[i]})
						}else if(i=='e13'){
							that.waringInfo.push({name:'照明状态',statu:that.deviceData.e[i]})
						}
						// else if(i=='e14'){
						// 	that.waringInfo.push({name:'温度控制',statu:that.deviceData.e[i]})
						// }else if(i=='e15'){
						// 	that.waringInfo.push({name:'湿度控制',statu:that.deviceData.e[i]})
						// }
						
					}
					
					
					
					
					// if(that.isMore==false){
					// 	that.showWaringInfo=that.waringInfo.slice(0,7)
					// 	that.showWaringInfo[that.showWaringInfo.length]={more:'cuIcon-more'}
					// }else{
						that.showWaringInfo=that.waringInfo;
					// 	that.showWaringInfo[that.showWaringInfo.length]={more:'cuIcon-back'}
					// }
					
					console.log(that.showWaringInfo)
					
					
					console.log(that.$store.state)
					data.t=data.t.reverse();
					data.h=data.h.reverse();
					let dataArr=data;
					console.log(dataArr)
					//重置横纵坐标数据
					that.resetArea(that.Area,dataArr);
					// that.resetArea(that.AreaH,dataArr.h,1);
					
					that.$store.state.Area=that.Area
					// that.$store.state.AreaH=that.AreaH
					uni.hideLoading()
					// console.log(that.$store.state.Area)
					// console.log(that.$store.state.AreaH)
					//绘制canvas
					console.log("绘制图形")
					// console.log(that.Area)
					this.showArea("canvasArea1",that.Area);
					
				  }
				})
				
				wx.onSocketOpen(()=>{
				  console.log('WebSocket连接打开')
				  this.timer=0
				  // var sendData={"mac":that.devMac,"token":that.token};
				   var sendData={"mac":that.devMac};
				  console.log(sendData)
				  that.$store.state.oldIndex=that.index;
				  that.$store.state.devIndex=that.index;
				  this.heartCheck.reset().start(sendData)
				})
				wx.onSocketError((res)=>{ 
				  console.log('WebSocket连接打开失败')
				 
				  this.reconnect()
				})
				wx.onSocketClose((res)=> {
				  console.log('WebSocket 已关闭！')
				   if(this.$store.state.isAppHide==true&&this.$store.state.isHide==true){
					   this.reconnect()
				   }
				  
				})
			  },
			  reconnect(){//重连socket
				
			   if (this.lockReconnect) return;
			   this.lockReconnect = true;
			   clearTimeout(this.timer)
			   console.log(this.limit)
			   // if (this.limit<1000){
			     this.timer = setTimeout(() => {
					 console.log("尝试重连第"+this.limit+"次")
			       this.linkSocket();
			       this.lockReconnect = false;
			     }, 5000);
			     this.limit++
			   // }else{
				  //  console.log("连接已彻底断开")
			   // }
			 },
			handelMore(str){//更多
				if(str){
					var that=this;
					this.isMore=!this.isMore;
					if(that.isMore==false){
						that.showWaringInfo=that.waringInfo.slice(0,7)
						that.showWaringInfo[that.showWaringInfo.length]={more:'cuIcon-more'}
					}else{
						that.showWaringInfo=that.waringInfo.slice(0,15);
						that.showWaringInfo[that.showWaringInfo.length]={more:'cuIcon-back'}
					}
					
					console.log(that.showWaringInfo.length)
				}
				
			},
			handelRemarks(){
				uni.navigateTo({
					url:'/pages/index/Remarks/Remarks'
				})
			},
			PickerChange(e) {//选择设备
				this.index = e.detail.value//index为选择序列下标
				this.$store.state.devIndex=this.index
				this.$store.state.oldIndex=this.index;
				this.devTitle=this.picker[this.index]//更换设备标题
				this.devMac=this.devlist[this.index].mac//更换设备mac并存至store状态中
				this.$store.state.devMac=this.devMac
				// let sendData={id:this.devMac,token:this.token};
				//该百年设备后重新发送设备信息
				 // var sendData={"content":{"mac":this.devMac,"token":this.token}};
				 // var sendData={"mac":this.devMac,"token":this.token};
				  var sendData={"mac":this.devMac};
				console.log(sendData)
				this.heartCheck.reset().start(sendData)
				
			},
			resetArea(area,data){//重置图表数据
				var that=this;
				area.categories.splice(0)
				for(var i=0;i<20;i++){
					area.categories.push(i);
				}
				if(data.t.length>1&&data.h.length>1){
					console.log("数据长度为20")
					area.series[0].data.splice(0);
					area.series[1].data.splice(0);
					area.series[2].data.splice(0);
					area.series[3].data.splice(0);
					
				}else{
					console.log("数据长度为1")
					area.series[0].data.splice(0,1);
					area.series[1].data.splice(0,1);
					area.series[2].data.splice(0,1);
					area.series[3].data.splice(0,1);
					
				}
				
				console.log(area)
				console.log(data)
				// if(num==0){
					for(var i in data.t){
						// console.log(data.t[i])
						// area.categories.push(i)
						if(data.t[i].Ta!==null){
							area.series[0].data.push(Math.round((data.t[i].Ta)*10)/10);
						}
						if(data.t[i].To!==null){
							area.series[1].data.push(data.t[i].To);
						}
						
					}
					
				// }else{
					for(var i in data.h){
						// area.categories.push(i)
						if(data.h[i].Ha!==null){
						area.series[2].data.push(Math.round((data.h[i].Ha)*10)/10);
						}
						if(data.h[i].Ho!==null){
							area.series[3].data.push(data.h[i].Ho);
						}
						
					}
					console.log(area.categories.length)
					console.log(area.series[0].data.length)
					that.$store.state.Area=area
				// }
				
				
			},
			showArea(canvasId,chartData){//绘制温度图表
				
				canvaArea=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'area',
					fontSize:12,
					padding:[8,8,8,8],
					// padding:[0,0,0,0],
					legend:{
						show:true,
						position:'top',
						float:'center',
						itemGap:60,
						padding:0,
						lineHeight:18,
						margin:0,
						
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					xAxis: {
						disabled:true,
						axisLine:true,
						type:'grid',
						gridColor:'#fff',
						gridType:'dash',
						dashLength:10,
						boundaryGap:'justify'
					},
					yAxis: {
						// disabled:true,
						axisLine:true,
						gridType:'dash',
						gridColor:'#fff',
						dashLength:10,
						splitNumber:5,
						fontSize:0,
						titleFontColor:'#fff'
						// format: function (val) {
						// 	return val + '℃ '
						// }
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						area:{
							type: 'curve',
							opacity:0.2,
							addLine:true,
							width:2,
							gradient:true
						}
					}
				});
				
			},
			
			touchArea(e) {
				console.log("0")
				// canvaArea.touchLegend(e);
				var i=0;
				canvaArea.showToolTip(e, {
					format: function (item, category) {
						var str='';
						if(i==0||i==1){
							str='℃'
						}else{
							str='%'
						}
						i++
						return item.name + ':' + item.data +str
					}
				});
			},
			
			subtract(str){
				if(this.isCanDesign==1){
					var mac=this.$store.state.devMac;
					var t=this.realData.temperature.Ts;
					var h=this.realData.humidity.Hs;
					if(str=='t' ){
						
						t--;
						// this.realData.humidity.Ts--;
						this.design(mac,25,60)
					}else{
						h--;
						// this.realData.humidity.Hs--
						this.design(mac,t,h)
					}
				}else{
					uni.showToast({
						title:'状态锁定暂时无法修改',
						icon:'none'
					})
				}
				
			},
			add(str){
				if(this.isCanDesign==1){
					var mac=this.$store.state.devMac;
					var t=this.realData.temperature.Ts;
					var h=this.realData.humidity.Hs;
					if(str=='t'){
						t++;
						// this.realData.temperature.Ts++;
						this.design(mac,t,h)
					}else{
						h++;
						// this.realData.humidity.Hs++;
						this.design(mac,t,h)
					}
				}else{
					uni.showToast({
						title:'状态锁定无法修改',
						icon:'none'
					})
				}
			},
			design(mac,t,h){
				var that=this;
				that.req.httpTokenRequest(
				{url:'/Api/Device/setDeviceTemperatureOrHumidity',method:'GET'},
				{mac:mac,
				temperature:t,
				humidity:h}).then((res)=>{
					console.log(res)
				});
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.devdetail{
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.dev-box{
			width:710upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 2upx 4upx 0upx rgba(240,240,240,0.5);
			border-radius:8upx;
			border:1px solid rgba(234,234,234,1);
			.title{
				line-height: 64upx;
				border-bottom: 1px solid rgba(234,234,234,1);
				font-size:32upx;
				font-weight:500;
				color:rgba(134,134,134,1);
				padding-left: 30upx;
			}
		}
		.dev-info{
			font-size:36upx;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:45upx;
			display: flex;
			justify-content: center;
			position: relative;
			width: 100%;
			height: 98upx;
			.devname{
				line-height: 45upx;
				margin-top: 27upx;
			}
			.choosedev-btn{
				position: absolute;
				width: 46upx;
				height: 46upx;
				background-image: url('../static/images/devdetail9.png');
				background-repeat: no-repeat;
				background-size: contain;
				top: 25upx;
				right: 145upx;
			}
			.tool{
				position: absolute;
				width: 50upx;
				height: 50upx;
				background-image: url('../static/images/info_icon.png');
				background-repeat: no-repeat;
				background-size: contain;
				top: 23upx;
				right: 30upx;
			}
		}
		.search{
			display: flex;
			align-items: center;
			margin-top: 10px;
			padding: 10upx 0;
			image{
				margin-left: 53upx;
				width:50upx;
				height:39upx;
			}
			text{
				margin-left: 26upx;
				width:406upx;
				height:40upx;
				font-size:32upx;
				font-weight:400;
				color:rgba(153,154,154,1);
				line-height:40upx;
				letter-spacing:2upx;
			}
		}
		.show-info{
			width:710upx;
			display: flex;
			justify-content: space-between;
			margin-top: 10upx;
			.temperature{
				width:346upx;
				height:290upx;
				.real-data{
					display: flex;
					align-items: center;
					height: 80upx;
					border-bottom: 1px solid rgba(234,234,234,1);
					image{
						width: 30upx;
						height: 50upx;
						margin-left: 24upx;
					}
					.real-text{
						font-size:30upx;
						font-weight:500;
						color:rgba(134,134,134,1);
						margin-left: 8upx;
						margin-right: 20upx;
					}
					.real-num{
						font-size:30upx;
						font-weight:500;
						color:rgba(255,111,57,1);
						line-height:56upx;
						width: 110upx;
						text-align: right;
					}
				}
				.out-data{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10upx 26upx 0 21upx;
					height: 90upx;
					z-index: 1;
					position: relative;
					// width: 100%;
					.output{
						width: 90upx;
						height: 90upx;
						background-image: url('../static/images/devdetail5.png');
						background-repeat: no-repeat;
						background-size: contain;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						text{
							font-size:24upx;
							font-weight:500;
							color:rgba(77,77,77,1);
							line-height:30upx;
						}
					}
					image{
						width:148upx;
						height:52upx;
					}
					.outputdata{
						width: 160upx;
						display: flex;
						// flex-direction: column;
						align-items: center;
						// justify-content: center;
						font-size: 28upx;
						color: #4d4d4d;
						.out-num{
							font-size: 32upx;
							margin-left: 8upx;
						}
					}
				}
				.design{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;
					.bg-line{
						width: 327upx;
						height: 20upx;
						background-image: url('../static/images/devdetail14.gif');
						background-repeat: no-repeat;
						background-size: contain;
						position: absolute;
						top: -2upx;
						z-index: 0;
					}
					.design-title{
						font-size:26upx;
						font-weight:500;
						color:rgba(134,134,134,1);
						line-height:20upx;
						z-index: 1;
						margin-top: 30upx;
					}
					.design-btn{
						width:188upx;
						height:47upx;
						border-radius:47upx;
						border:1px solid rgba(234,234,234,1);
						margin-top: 12upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 4upx;
						.add,.move{
							display: block;
							width:38upx;
							height: 38upx;
							line-height:38upx;
							border-radius: 50%;
							text-align: center;
							font-size: 16upx;
							background-image: url('../static/images/devdetail4.png');
							background-repeat: no-repeat;
							background-size: contain;
						}
						.num{
							font-size:26upx;
							font-weight:500;
							color:rgba(138,138,138,1);
							line-height:48upx;
						}
					}
				}
			}
			.humidity{
				.real-data{
					image{
						width:43upx;
						height:47upx;
					}
				}
				.out-data{
					.output{
						background-image: url('../static/images/devdetail5.png');
					}
				}
			}
		}
		.waring{
			margin-top: 40upx;
			.gride{
				width: 100%;
			// 	display: flex;
			// 	flex-wrap: wrap;
			// 	justify-content: space-between;
			// 	align-items: center;
				padding: 22upx 10upx 0 10upx;
				.gride-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					text-align: center;
					margin-top: 20upx;
					margin-bottom: 40upx;
					width: 100%;
					height: 100%;
					image{
						width: 60upx;
						height: 60upx;
					}
					text{
						display: flex;
						margin-top: 12upx;
						font-size:28upx;
						font-weight:500;
						color:rgba(49,49,49,1);
						line-height:14upx;
						letter-spacing: 2upx;
					}
					
				}
				.waring-info{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					.w-info{
						font-size: 48upx;
						color: #868686;
					}
					
				}
			}
			
		}
		.chart{
			margin-top: 40upx;
			margin-bottom: 20upx;
			.title-tb{
				display: flex;
				justify-content: space-between;
				padding-right: 30upx;
				.choose{
					text{
						font-size: 26upx;
						margin-left: 10upx;
						// background-color: #e1e1e1;
					}
					.active{
						color: #ED3E0C;
					}
				}
			}
			/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
			.qiun-charts {
				width: 100%;
				height: 600upx;
				background-color: #FFFFFF;
				position: relative;
				.charts {
					width: 100%;
					height: 600upx;
					background-color: #FFFFFF;
					transition:all 0.3s linear;
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					.chartsCan{
						width: 100%;
						height: 600upx;
						background-color: #FFFFFF;
					}
				}
				
			}
			
		}
	}
	
</style>
