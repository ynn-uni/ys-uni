<template>
  <view class="showchartline animation-fade flex justify-center align-center">
	  <view class="change flex justify-between align-center">
			<button class="cu-btn round sure" @tap="before">上一组</button>
			<button class="cu-btn round sure" @tap="next">下一组</button>
	  </view>
    <view class="qiun-charts flex justify-around flex-direction align-center">
		<view class="item flex align-center" v-for="(item,index) in Area.series" :key="index">
			<view class="name">
				{{item.name}}:
			</view>
			<view class="num">
				{{item.data[19]||'0'}}
			</view>
		</view>
     <!-- <view class="charts flex justify-center align-center">
        <canvas canvas-id="canvasArea1" id="canvasArea1" class="chartsCan" @touchstart="touchArea"></canvas>
      </view> -->
    </view>
  </view>
</template>
<script>
import uCharts from '@/components/u-charts/u-charts.js'
import { isJSON } from '@/common/checker.js'
var _self
var canvaArea = null
export default {
  data() {
    return {
		n:0,
		size:6,
	  statr:0,
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      textarea: '',
      Area: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        series: [
          { name: '传感器1温度', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: '传感器1湿度', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: '传感器2温度', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: '传感器2湿度', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
        ]
      } //图表数据对象
    }
  },
  props:{
	  datas: {
	    type: Array,
	    default: () => []
	  }
  },
  watch:{
	  datas() {
		let n=this.n
	    this.initData(n)
	    // this.showArea('canvasArea1', this.Area)
	  },
	  n() {
	  		let n=this.n
			this.initData(n)
			// this.showArea('canvasArea1', this.Area)
	  }
  },
  mounted() {
	  _self = this
	  this.cWidth = uni.upx2px(750)
	  this.cHeight = uni.upx2px(660)
	  let n=this.n
	  this.initData(n)
	  // this.showArea('canvasArea1', this.Area)
  },
  methods: {
	  before(){
		  if(this.n==0){
			  this.n=12
		  }else{
			 this.n=this.n-this.size
		  }
		  
	  },
	  next(){
		  if(this.n==12){
		  	this.n=0
		  }else{
		  	this.n=this.n+this.size
		  }
	  },
	  initData(n){
        if(this.datas.length<=0) return;
		  this.Area.categories=[]
          this.Area.series=[]
		  for(var i=0;i<this.datas[0].data.length;i++){
			  this.Area.categories.push(i)
		  }
		  this.Area.series=this.datas.slice(n,n+this.size)
		  console.log(this.Area.series)
	  },
    showArea(canvasId, chartData) {
      canvaArea = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'area',
        fontSize: 12,
        padding: [8, 8, 20, 8],
        legend: {
          show: true,
          position: 'top',
          float: 'center',
          itemGap: 60,
          padding: 10,
          lineHeight: 18,
          margin: 0
        },
        dataLabel: false,
        dataPointShape: true,
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: false,
        xAxis: {
          disabled: true,
          axisLine: true,
          type: 'grid',
          gridColor: '#fff',
          gridType: 'dash',
          dashLength: 10,
          boundaryGap: 'justify'
        },
        yAxis: {
          axisLine: true,
          gridType: 'dash',
          gridColor: '#fff',
          dashLength: 10,
          splitNumber: 5,
          fontSize: 0,
          titleFontColor: '#fff',
		  format:(e)=>{
			  return e.toFixed(0)
		  }
        },
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          area: {
            type: 'curve',
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: true
          }
        }
      })
    },
    touchArea(e) {
      var i = 0
      canvaArea.showToolTip(e, {
        format: function(item, category) {
			
          return item.name + ':' + item.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.showchartline {
  width: 100%;
  height: 690upx;
  flex-direction: column;
  padding: 0 30upx;
  padding-top: 20upx;
  position: relative;
  .change{
	  padding: 0 30upx;
	  width: 100%;
	  position: absolute;
	  bottom: 0;
	  // z-index: 10;
	  button{
		  height: 40upx;
	  }
  }
  .qiun-charts {
    width: 100%;
    height: 620upx;
    background-color: #ffffff;
    position: relative;
	top: -40upx;
	.item{
		width: 500upx;
		.name{
			font-size: 40rpx;
			font-weight: bold;
			color: #545454;
			line-height: 59rpx;
			margin-right: 20rpx;
		}
		.num{
			font-size: 32rpx;
			font-weight: 500;
			color: #545454;
			line-height: 45rpx;
			width: 458rpx;
		}
	}
    .charts {
      width: 100%;
      height: 660upx;
      background-color: #ffffff;
      transition: all 0.3s linear;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      .chartsCan {
        width: 100%;
        height: 660upx;
        background-color: #ffffff;
      }
    }
  }

  // .charts {
  // 	width: 750upx;
  // 	height: 500upx;
  // 	background-color: #FFFFFF;
  // }
}
</style>
