<template>
	<view class="historyData">
		<cu-custom :isBack="true" bgColor="bg-e">
			<block slot="backText">返回</block>
			<block slot="content">历史数据</block>
		</cu-custom>
		
		
		<view class="pick">
			
			
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
		
		
		<view class="charts" v-show="!noData">
			<canvas canvas-id="canvasArea1" id="canvasArea1" class="charts"  @touchstart="touchLineA" disable-scroll=true @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		</view>
		<view class="bottom" v-show="noData">
			该设备该时间段无数据
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {getDataList} from '../../../apis/index.js'
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	var _self;
	var canvaArea=null;
	export default {
		data() {
			return {
				noData:false,
				devTitle:'',
				devlist:[],
				index: 0,//设备索引
				// picker: [],//替换设备下弹框信息列表
				classifyType:'year',
				showDate:'',
				startDate: '开始时间',
				endDate:'结束时间',
				end:'',
				cWidth:'750',//画布宽
				cHeight:'800',//画布高
				pixelRatio:1,//像素比
				Area:{categories:[1,'','','',5,'','','','',10,'','','','',15,'','','','',20],
				series:[{name:'实时温度',data:[25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25]},
				{name:'输出温度',data:[20,26,10,0,24,58,9,64,66,55,33,44,13,54,25,85,45,56,24,26]},
				{name:'实时湿度',data:[60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60]},
				{name:'输出湿度',data:[25,13,89,45,65,25,16,58,79,62,35,29,46,58,24,16,43,15,46,58]}]},
			}
		},
		computed:{
			 ...mapGetters([ 'devList','devListMac','userInfo']),
			 picker(){
				 let list=[];
				 this.devList.forEach((val)=>{
					 list.push(val.title)
				 })
				 return list
			 }
		},
		mounted() {
			
			 _self=this;
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
			this.cWidth=uni.upx2px(740);
			this.cHeight=uni.upx2px(800);
			
			this.initTime()
			
			this.getHistoryData(this.startDate,this.endDate,this.devList[0].mac);
			
		},
		methods: {
			initTime(){
				var shshmyDate = new Date();
				this.showDate=shshmyDate.getFullYear()+'年'+(shshmyDate.getMonth()+1)+'月'+shshmyDate.getDate()+'日';
				this.startDate=shshmyDate.getFullYear()+'-'+(shshmyDate.getMonth()+1)+'-'+shshmyDate.getDate()+' 00:00:00'
				this.endDate =shshmyDate.getFullYear()+'-'+(shshmyDate.getMonth()+1)+'-'+shshmyDate.getDate()+' 23:59:59'
				this.end=this.endDate;
			},
			getHistoryData(start,end,mac){
				uni.showLoading()
				var that=this;
				getDataList({start:start,end:end,mac:mac}).then((res)=>{
					console.log(res)
					if(res.data&&res.data.length>0){
						that.noData=false;
						that.Area.categories.splice(0);
						that.Area.series[0].data.splice(0);
						that.Area.series[1].data.splice(0);
						that.Area.series[2].data.splice(0);
						that.Area.series[3].data.splice(0);
						for(var i in res.data){
							that.Area.categories.push(i);
							that.Area.series[0].data.push(Math.round((res.data[i].ta)*10)/10);
							that.Area.series[1].data.push(res.data[i].to);
							that.Area.series[2].data.push(Math.round((res.data[i].ha)*10)/10);
							that.Area.series[3].data.push(res.data[i].ho);
						}
						that.showArea('canvasArea1',this.Area);
					}else{
						that.noData=true;
					}
					
					uni.hideLoading()
				})
				
			},
			PickerChange(e) {//选择设备
				var that=this;
				this.index = e.detail.value//index为选择序列下标
				that.getHistoryData(that.startDate,that.endDate,that.devList[that.index].mac);
			},
			delDate(){
				this.startDate='开始时间'
				this.endDate='结束时间'
			},


			
			startDateChange(e) {
				var that=this;
				console.log(e.detail.value)
				var classifyType=this.classifyType;
				
					var time=e.detail.value.split('-');
					this.showDate=time[0]+'年'+time[1]+'月'+time[2]+'日'
				
				this.startDate = e.detail.value+' 00:00:00'
				this.endDate =e.detail.value+' 23:59:59'
				that.getHistoryData(that.startDate,that.endDate,that.devList[that.index].mac);
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
						margin:0,
						
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
						disabled:true,
						
						gridColor:'#fff',
						
						dashLength:10,
						
						type:'grid',
						gridType:'dash',
						itemCount:50,
						scrollShow:true,
						scrollAlign:'right'
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
						return item.name + ':' + item.data 
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
			.del{
				
			}
		}
		.charts {
			margin-top: 100upx;
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
		.bottom{
			margin-top: 10upx;
			text-align: center;
			font-size: 28upx;
			color: #a8aeb8;
		}
	}
</style>
