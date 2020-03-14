<template>
	<view class="showdev animation-fade">
		<view class="qiun-columns flex justify-center align-center">
				<view class="qiun-charts" >
					<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
				</view>
			</view>
		<view class="desi flex justify-center align-center">
			<button class="cu-btn des-btn">
				<text class="cuIcon-move"></text>
			</button>
			<view class="text margin-lr">
				50%
				<view class="name">
					设定温度
				</view>
			</view>
			
			<button class="cu-btn des-btn" >
				<text class="cuIcon-add"></text>
			</button>
		</view>
		
			
		<view class="precent flex margin-top justify-center align-center">
			<view class="margin-right-xs out">输出</view>
			<view class="cu-progress round bg-bgc">
				<view class="bg-percent" :style="[{ width:'80%'}]"></view>
			</view>
			<view class="margin-left-xs">80%</view>
		</view>
		
	</view>
	
</template>

<script>
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaArcbar1=null;
	
	export default {
		data() {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				textarea:'',
				chartData: {
					categories: [],
					series: [{
						color: "#838af1",
						data: null,
						index: 0,
						legendShape: "circle",
						name: null,
						pointShape: "circle",
						show: true,
						type: "arcbar",
						_proportion_: 1.184999565
					}]
				},
				
			}
		},
		props:{
			data:{
				type:Object,
				default:()=>{}
			}
		},
		computed:{
			chartdata(){
				this.chartData.series[0].data=this.data.real
				this.chartData.series[0].name=this.data.relname
				return this.chartData;
			}
		},
		components: {
			cmdCircle
		},
		mounted() {
			// console.log(this.data)
			// this.chartData.series[0].data=this.data.real
			// this.chartData.series[0].name=this.data.realname
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth3=uni.upx2px(600);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(500);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(38);
			this.showArcbar("canvasGauge",this.chartdata)
		},
		
		methods: {
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:12,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: '#333333',
						fontSize: 65*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#333333',
						fontSize: 25*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'default',
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
						}
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.showdev{
		margin-top: 40upx;
		.qiun-columns{
			.qiun-charts {
				width: 600upx;
				height: 500upx;
				background-color: #FFFFFF;
				overflow: hidden;
				.charts {
						width: 600upx;
						height: 500upx;
						background-color: #FFFFFF;
					}
			}
		}
		.desi{
			position: relative;
			z-index: 1000;
			top: -30upx;
			color: #333333;
			.text{
				text-align: center;
				font-size: 44upx;
				padding: 0 80upx;
				.name{
					color: #a6a6a6;
					font-size: 24upx;
				}
			}
			.des-btn{
				width: 100upx;
				height: 68upx;
				box-shadow:0px 0px 20upx 0px rgba(120,134,238,0.22);
				text{
					color:#ee7777 ;
					font-weight: 700;
				}
			}
		}
		.precent{
			
			padding: 0 20upx;
			width: 100%;
			.out{
				display: block;
				width: 84upx;
			}
		}
		
		.bg-percent{
			background-color: #838af1;
			border-radius: 20upx;
		}
		.bg-bgc{
			background-color: #eeeeee;
			
		}
	}
</style>
