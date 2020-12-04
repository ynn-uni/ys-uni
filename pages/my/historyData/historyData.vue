<template>
	<view class="historyData">
		<cu-custom :isBack="true" bgColor="bg-e">
			<block slot="backText">返回</block>
			<block slot="content">历史数据</block>
		</cu-custom>
		<view class="pick" v-if="devList.length">
			<picker @change="PickerChange" :value="index" :range="picker" style-="font-size:30upx">
				<view class="picker">
					{{devList[index].title}}
					<text class="cuIcon-triangledownfill arrow-bot"></text>
				</view>
			</picker>
			<picker  mode="date" :value="startDate" start="2015-09-01" :end="end" @change="startDateChange" fields="day">
				<view class="picker">
					{{showDate}}
					<text class="cuIcon-triangledownfill arrow-bot"></text>
				</view>
			</picker>
		</view>
		<view class="charts" v-show="!haveData">
			<canvas canvas-id="canvasArea1" id="canvasArea1" class="charts"  @touchstart="touchLineA" disable-scroll=true @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		</view>
		<noData v-if="haveData" :text="'没有找到相关数据'"></noData>
	</view>
</template>
<script>
	import noData from '@/components/noData.vue'
	import uCharts from '@/components/u-charts/u-charts.js';
	import {getDataList} from '../../../apis/index.js'
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	var _self;
	var canvaArea=null;
	export default {
		data() {
			return {
				dataList:[],
				page:1,
				size:500,
				haveData:true,
				devTitle:'',
				devlist:[],
				index: 0,//设备索引
				classifyType:'year',
				showDate:'',
				startDate: '开始时间',
				endDate:'结束时间',
				end:'',
				position:'right',
				cWidth:'750',//画布宽
				cHeight:'800',//画布高
				pixelRatio:1,//像素比
				Area:{categories:['0:00','','','','0:30','','','','','1:00','','','','','1:30','','','','','2:00'],
				series:[{name:'实时温度',data:[25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25]},
				{name:'设定温度',data:[20,26,10,0,24,58,9,64,66,55,33,44,13,54,25,85,45,56,24,26]},
				{name:'实时湿度',data:[60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60]},
				{name:'设定湿度',data:[25,13,89,45,65,25,16,58,79,62,35,29,46,58,24,16,43,15,46,58]}]},
			}
		},
		computed:{
			 ...mapGetters([ 'devList','devListMac','userInfo']),
			 picker(){
				 let list=[];
				 if(this.devList&&this.devList.length){
					  this.devList.forEach((val)=>{
							list.push(val.title)
						})
				 }
				 return list
			 }
		},
		components:{
			noData
		},
		mounted() {
			 _self=this;
			this.cWidth=uni.upx2px(740);
			this.cHeight=uni.upx2px(800);
			// this.showArea('canvasArea1',this.Area);
			this.initTime()
			if(this.devList&&this.devList.length){
				this.getHistoryData(this.startDate,this.endDate,this.devList[0].mac,this.page,this.size);
			}
			console.log(this.haveData)
		},
		methods: {
			initTime(){
				var shshmyDate = new Date();
				this.showDate=shshmyDate.getFullYear()+'年'+(shshmyDate.getMonth()+1)+'月'+shshmyDate.getDate()+'日';
				this.startDate=shshmyDate.getFullYear()+'-'+(shshmyDate.getMonth()+1)+'-'+shshmyDate.getDate()+' 00:00:00'
				this.endDate =shshmyDate.getFullYear()+'-'+(shshmyDate.getMonth()+1)+'-'+shshmyDate.getDate()+' 23:59:59'
				this.end=this.endDate;
			},
			getHistoryData(start,end,mac,page,size){
				uni.showLoading()
				var that=this;
				getDataList({start:start,end:end,mac:mac,page,size}).then((res)=>{
					console.log(res.data.data)
					this.dataList=res.data.data
					if(res.data.data&&res.data.data.length>0){
						console.log(res.data)
						that.haveData=false;
						that.Area.categories.splice(0);
						that.Area.series[0].data.splice(0);
						that.Area.series[1].data.splice(0);
						that.Area.series[2].data.splice(0);
						that.Area.series[3].data.splice(0);
						res.data.data.forEach((val,i)=>{
							// for(var i in val){
								// that.Area.categories.push(val['time']);
								var time=''
								if(i%100===0){
									var time=val['time'].split(' ')[1]
								}
								that.Area.categories.unshift(time);
								that.Area.series[0].data.unshift(Math.round((val['ta'])*10)/10);
								that.Area.series[1].data.unshift(val['ts']);
								that.Area.series[2].data.unshift(Math.round((val['ha'])*10)/10);
								that.Area.series[3].data.unshift(val['hs']);
							// }
						})
						
						that.showArea('canvasArea1',this.Area);
					}else{
						if(this.page===1){
							that.haveData=true;
						}
						
					}
					
					uni.hideLoading()
				})
			},
			PickerChange(e) {//选择设备
				var that=this;
				this.index = e.detail.value//index为选择序列下标
				that.getHistoryData(that.startDate,that.endDate,that.devList[that.index].mac,this.page,this.size);
			},
			delDate(){
				this.startDate='开始时间'
				this.endDate='结束时间'
			},
			startDateChange(e) {
				var that=this;
				var classifyType=this.classifyType;
				var time=e.detail.value.split('-');
				this.showDate=time[0]+'年'+time[1]+'月'+time[2]+'日'
				this.startDate = e.detail.value+' 00:00:00'
				this.endDate =e.detail.value+' 23:59:59'
				that.getHistoryData(that.startDate,that.endDate,that.devList[that.index].mac,this.page,this.size);
			},
			endDateChange(e) {
				this.endDate = e.detail.value
			},
			showArea(canvasId,chartData){//绘制图表
				canvaArea=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'area',
					fontSize:12,
					padding:[15,15,0,15],
					// padding:[0,0,0,0],
					legend:{
						show:true,
						position:'top',
						float:'center',
						itemGap:60,
						padding:0,
						lineHeight:22,
						margin:0
					},
					dataLabel:false,
					dataPointShape:false,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true,//开启图表拖动
					xAxis: {
						disabled:false,//是否显示x轴
						gridColor:'#fff',
						dashLength:10,
						type:'grid',
						gridType:'dash',
						itemCount:50,
						scrollShow:true,
						scrollAlign:this.position
					},
					yAxis: {
						axisLine:true,
						gridType:'dash',
						gridColor:'#fff',
						dashLength:10,
						splitNumber:5,
						fontSize:0,
						titleFontColor:'#fff'
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
				//下面是拖动滚动条到尽头的事件，不需要请删除
				canvaArea.addEventListener('scrollLeft', () => {
						console.log("已经到最【左】边啦");
						if(this.dataList.length){
								this.position='right'
							this.dataList=[]
							this.page+=1
							this.getHistoryData(this.startDate,this.endDate,this.devList[0].mac,this.page,this.size);
						}
						
				});
				//下面是拖动滚动条到尽头的事件，不需要请删除
				canvaArea.addEventListener('scrollRight', () => {
						console.log("已经到最【右】边啦");
						if(this.page>1){
							this.position='left'
							this.page-=1
							this.getHistoryData(this.startDate,this.endDate,this.devList[0].mac,this.page,this.size);
						}
						
				});
			},
			touchLineA(e){
				canvaArea.scrollStart(e);
			},
			moveLineA(e) {
				canvaArea.scroll(e);
			},
			touchEndLineA(e) {
				canvaArea.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaArea.touchLegend(e);
				canvaArea.showToolTip(e, {
					format: function (item, category) {
						let str=null
						if(item.name.indexOf('温度')>0){
							str='℃'
						}else if(item.name.indexOf('湿度')>0){
							str='%'
						}
						return item.name + ':' + item.data +str
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.historyData{
		min-height: 100vh;
		background-color: #FFFFFF;
		.classify{
			padding: 0 20upx;
			display: flex;
			height: 80upx;
			// justify-content: space-between;
			align-items: center;
			padding-left: 20upx;
			.classify-item{
				display: block;
				background-color: #e7e7e7;
				color: #000000;
				width: 130upx;
				height: 40upx;
				line-height: 40upx;
				border-radius: 40upx;
				margin-left: 10upx;
				text-align: center;
			}
			.ci-active{
				background-color: #cccccc;
			}
		}
		.dev{
			display: flex;
			.devTitle{
				border: 1px solid #e1e1e1;
				border-radius: 8upx;
			}
		}
		.pick{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20upx;
			padding: 0 40upx;
			position: relative;
			z-index: 1000;
			margin-bottom: 20upx;
			.picker{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 300upx;
				height: 64upx;
				padding: 0upx 20upx;
				border: 1px solid #e5e5e5;
				border-radius: 32upx;
				color: #353535;
				// background-color: #f6f6f6;
				.arrow-bot{
					color: #999999;
					font-size: 44upx;
				}
			}
			.line{
				width: 200upx;
				border-top: 1px solid #e5e5e5;
			}
		}
		.choosedata{
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 120upx;
			padding: 0 30upx;
			
			border-bottom: 1px solid rgba(234,234,234,1);
			font-size: 30upx;
			.picker{
				// border-bottom: 1px solid #000;
				margin: 0 10upx;
				color: #1e1e1e;
			}
		}
		.charts {
			margin-top: 120upx;
			padding-right: 10px;
			width: 100%;
			height: 800upx;
			background-color: #FFFFFF;
			transition:all 0.3s linear;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			z-index: 500;
			.chartsCan{
				width: 100%;
				padding-right: 10px;
				height: 800upx;
				background-color: #FFFFFF;
			}
		}
	}
</style>
