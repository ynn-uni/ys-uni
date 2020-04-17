<template>
  <view class="showdev animation-fade flex align-center flex-direction justify-between">
	
	  <view class="box flex align-center flex-direction">
	  	<view class="real flex align-center justify-center">
	  		<view class="left">
	  			{{ datas.current }}
	  		</view>
	  		<view class="right">
	  			<view class="ht">
	  				℃
	  			</view>
	  			<view class="name">
	  				实时温度
	  			</view>
	  		</view>
	  		
	  	</view>
	  	<view class="desi flex justify-center align-center">
	  	  <!-- <button class="cu-btn des-btn" @click="handelTemperature('-')">
	  	    <text class="cuIcon-move"></text>
	  	  </button> -->
	  	  <view class="text margin-lr flex align-center" @click="showModel('designT')">
	  	    <view class="name">设定{{ datas.label }}:</view>
					<view class="des">
						{{ datas.setting }}
					</view>
			
	  	  </view>
	  	
	  	  <!-- <button class="cu-btn des-btn" @click="handelTemperature('+')">
	  	    <text class="cuIcon-add"></text>
	  	  </button>
		  -->
	  	</view>
	  	
	  	<view class="precent flex justify-center align-center">
	  	  <view class="margin-right-xs out">输出</view>
	  	  <view class="cu-progress round bg-bgc">
	  	    <view class="bg-percent" :style="[{ width: datas.output + '%'||'0%'}]"></view>
	  	  </view>
	  	  <view class="margin-left-xs">{{ datas.output }}℃</view>
	  	</view>
	  </view>
	  <view class="box flex align-center flex-direction">
	  	<view class="real flex align-center justify-center">
	  		<view class="left">
	  			<!-- 66 -->
	  			{{ hdatas.current }}
	  		</view>
	  		<view class="right">
	  			<view class="ht">
	  			 %
	  			</view>
	  			<view class="name">
	  				实时湿度
	  			</view>
	  		</view>
	  		
	  	</view>
	  	<view class="desi flex justify-center align-center">
	  	  <!-- <button class="cu-btn des-btn" @click="handelHu('-')">
	  	    <text class="cuIcon-move"></text>
	  	  </button> -->
	  	  <view class="text margin-lr flex align-center" @click="showModel('designH')">
	  	   
	  	    <view class="name">设定{{ hdatas.label }}:</view>
			<view class="des">
				 {{ hdatas.setting }}
			</view>
	  	  </view>
	  	
	  	 <!-- <button class="cu-btn des-btn" @click="handelHu('+')">
	  	    <text class="cuIcon-add"></text>
	  	  </button> -->
	  	</view>
	  	
	  	<view class="precent flex justify-center align-center">
	  	  <view class="margin-right-xs out">输出</view>
	  	  <view class="cu-progress round bg-bgc">
	  	    <view class="bg-percent" :style="[{ width: hdatas.output + '%'||'0%'}]"></view>
	  	  </view>
	  	  <view class="margin-left-xs">{{ hdatas.output }}%</view>
	  	</view>
	  </view>
		
  </view>
</template>

<script>
import cmdCircle from '@/components/cmd-circle/cmd-circle.vue'
import uCharts from '@/components/u-charts/u-charts.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
var _self
var canvaArcbar1 = null

export default {
  data() {
    return {
		t:{},
		h:{},
      cWidth3: '', //圆弧进度图
      cHeight3: '', //圆弧进度图
      arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
      pixelRatio: 1,
      chartData: {
        series: [
          {
            name: null,
            data: null,
            color: '#838af1',
            type: 'arcbar'
          }
        ]
      }
    }
  },
  props: {
    datas: {
      type: Object,
      default: () => {
        return {
          label: '',
          setting: '',
          current: '',
          output: '',
          unit: ''
        }
      }
    },
	hdatas: {
	  type: Object,
	  default: () => {
	    return {
	      label: '',
	      setting: '',
	      current: '',
	      output: '',
	      unit: ''
	    }
	  }
	}
  },
  watch: {
    datas() {
      this.t=this.datas
	  
    },
	hdatas() {
		this.h=this.hdatas
		
	}
  },
  mounted() {
    
  },

  methods: {
	showModel(str){
		this.$emit('changetemperature',{seeting:str})
	},
	handelTemperature(str){
		this.$emit('changetemperature',{name:'t',seeting:str})
		
	},
	handelHu(str){
		this.$emit('changetemperature',{name:'h',seeting:str})
		
	},
  
  }
}
</script>

<style lang="scss" scoped>
.showdev {
  // margin-top: 40upx;
  height: 690upx;
  .qiun-columns {
    .qiun-charts {
      width: 600upx;
      height: 500upx;
      background-color: #ffffff;
      overflow: hidden;
      .charts {
        width: 600upx;
        height: 500upx;
        background-color: #ffffff;
      }
    }
  }
  
  .box{
	  width:690upx;
	  height:335upx;
	  background:rgba(255,255,255,1);
	  border-radius:12upx;
	  box-shadow: 0px 0px 20upx 0px rgba(120, 134, 238, 0.22);
	  padding-bottom: 10upx;
	  
  }
  
  .real{
	  .left{
		  font-size:144upx;
		  // font-family:DIN-Medium;
		  font-weight:normal;
		  color:rgba(81,68,169,1);
		  margin-right: 30upx;
		  font-style: italic;
	  }
	  .right{
		  .ht{
			  font-size:48upx;
			  font-family:SourceHanSansCN-Medium,SourceHanSansCN;
			  font-weight:500;
			  color:rgba(51,51,51,1);
		  }
		  .name{
			  font-size:36upx;
			  font-family:SourceHanSansCN-Medium,SourceHanSansCN;
			  font-weight:500;
			  color:rgba(51,51,51,1);
		  }
		  
	  }
  }
  .desi {
    color: #333333;
    .text {
      text-align: center;
      font-size: 44upx;
      padding: 0 80upx;
      .name {
        color: #a6a6a6;
        font-size: 34upx;
      }
	  .des{
	  	 border:1px solid #eee;
		 margin-left: 20upx;
		 border-radius: 10upx;
		 width: 140upx;
	  }
    }
    .des-btn {
      width: 68upx;
      height: 68upx;
      background-color: #fff;
	  border-radius: 50%;
      box-shadow: 0px 0px 20upx 0px rgba(120, 134, 238, 0.22);
      text {
        color: #ee7777;
        font-weight: 700;
      }
    }
  }
  .precent {
    padding: 0 20upx;
    width: 100%;
	margin-top: 20upx;
    .out {
      display: block;
      width: 84upx;
    }
  }

  .bg-percent {
    background-color: #838af1;
    border-radius: 20upx;
	
  }
  .bg-bgc {
    background-color: #eeeeee;
  }
}
</style>
