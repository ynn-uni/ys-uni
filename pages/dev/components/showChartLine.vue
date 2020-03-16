<template>
  <view class="showchartline animation-fade flex justify-center align-center">
    <view class="qiun-charts flex justify-center align-center">
      <view class="charts flex justify-center align-center">
        <canvas canvas-id="canvasArea1" id="canvasArea1" class="chartsCan" @touchstart="touchArea"></canvas>
      </view>
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
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      textarea: '',
      Area: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        series: [
          { name: '实时温度', data: [10, 20, 50, 10, 20, 50, 10, 20, 50, 10] },
          { name: '输出温度', data: [30, 40, 30, 30, 40, 30, 30, 40, 30, 30] },
          { name: '实时湿度', data: [50, 60, 90, 50, 60, 90, 50, 60, 90, 20] },
          { name: '输出湿度', data: [70, 80, 10, 70, 80, 10, 70, 80, 10, 80] }
        ]
      } //图表数据对象
    }
  },
  mounted() {
    _self = this
    //#ifdef MP-ALIPAY
    uni.getSystemInfo({
      success: function(res) {
        if (res.pixelRatio > 1) {
          //正常这里给2就行，如果pixelRatio=3性能会降低一点
          //_self.pixelRatio =res.pixelRatio;
          _self.pixelRatio = 2
        }
      }
    })
    //#endif
    this.cWidth = uni.upx2px(750)
    this.cHeight = uni.upx2px(660)
    _self.showArea('canvasArea1', _self.Area)
  },
  methods: {
    showArea(canvasId, chartData) {
      //绘制温度图表

      canvaArea = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'area',
        fontSize: 12,
        padding: [8, 8, 8, 8],
        // padding:[0,0,0,0],
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
          // disabled:true,
          axisLine: true,
          gridType: 'dash',
          gridColor: '#fff',
          dashLength: 10,
          splitNumber: 5,
          fontSize: 0,
          titleFontColor: '#fff'
          // format: function (val) {
          // 	return val + '℃ '
          // }
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
      console.log('0')
      // canvaArea.touchLegend(e);
      var i = 0
      canvaArea.showToolTip(e, {
        format: function(item, category) {
          var str = ''
          if (i == 0 || i == 1) {
            str = '℃'
          } else {
            str = '%'
          }
          i++
          return item.name + ':' + item.data + str
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
  .qiun-charts {
    width: 100%;
    height: 660upx;
    background-color: #ffffff;
    position: relative;
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
