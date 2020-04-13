<template>
  <view class="showwaring animation-fade">
    <view class="box">
		<!-- <view class="title">
			预警状态
		</view> -->
      <uni-grid :column="5" :show-border="false" :square="false" class="gride">
        <uni-grid-item v-for="(item,index) in waringData" :key="index">
          <view
            class="gride-item flex justify-center align-center flex-direction my-item"
            :class="{'status-error' : item.status}"
          >
            <view v-if="item.icon==='sos'" class="myicon">{{item.name}}</view>
            <view v-else :class="'myicon iconfont '+item.icon "></view>
            <view class="text">{{item.name}}</view>
          </view>
        </uni-grid-item>
      </uni-grid>
	  <view class="border-top">
	  	
	  </view>
	  <!-- <view class="title">
	  	开关状态
	  </view> -->
	  <uni-grid :column="5" :show-border="false" :square="false" class="gride ">
	    <uni-grid-item v-for="(item,index) in waringDataStatus" :key="index">
	      <view
	        class="gride-item flex justify-center align-center flex-direction my-item status-default"
	        :class="{'status-success' : item.status}"
	      >
	        <view v-if="item.icon==='sos'" class="myicon">{{item.name}}</view>
	        <view v-else :class="'myicon iconfont '+item.icon "></view>
	        <view class="text">{{item.name}}</view>
	      </view>
	    </uni-grid-item>
	  </uni-grid>
    </view>
  </view>
</template>

<script>
import uniGrid from '@/components/uni-grid/uni-grid.vue'
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'

export default {
  data() {
    return {
      waringData: [
        {
          id: 'e1',
          name: '超温',
          icon: 'iconchaowen',
          status: 0 //正常
        },
        {
          id: 'e2',
          name: '断水',
          icon: 'iconduanshui',
          status: 0 //正常
        },
        {
          id: 'e3',
          name: '水堵',
          icon: 'iconshuidu',
          status: 0 //正常
        },
        {
          id: 'e4',
          name: '温度错误',//温偏差
          icon: 'iconwenpiancha',
          status: 0 //正常
        },
        {
          id: 'e5',
          name: '湿度错误',//湿偏差
          icon: 'iconshipiancha',
          status: 0 //正常
        },
        {
          id: 'e6',
          name: '电源错误',
          icon: 'icondianyuancuowu',
          status: 0 //正常
        },
        {
          id: 'e7',
          name: 'sos',
          icon: 'sos',
          status: 0 //正常
        },
        {
          id: 'e8',
          name: '内存错误',
          icon: 'iconneicuncuowu',
          status: 0 //正常
        },
		{
		  id: 'e9',
		  name: '系统错误',
		  icon: 'iconxitongcuowu',
		  status: 0 //正常
		}
		
        
      ],
	  waringDataStatus:[
		  
		  {
		    id: 'e10',
		    name: '压缩机一',
		    icon: 'iconyasuoji',
		    status: 0 //正常
		  },
		  {
		    id: 'e11',
		    name: '压缩机二',
		    icon: 'iconyasuoji',
		    status: 0 //正常
		  },
		  {
		    id: 'e12',
		    name: '风机',
		    icon: 'iconfengji',
		    status: 0 //正常
		  },
		  {
		    id: 'e13',
		    name: '照明',
		    icon: 'iconzhaoming',
		    status: 0 //正常
		  },
		  {
		    id: 'e14',
		    name: '温度控制',
		    icon: 'iconwendukongzhi',
		    status: 0 //正常
		  },
		  {
		    id: 'e15',
		    name: '湿度控制',
		    icon: 'iconshidukongzhi',
		    status: 0 //正常
		  }
		  
	  ]
    }
  },
  props: {
    waringinfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    uniGrid,
    uniGridItem
  },
	watch:{
		waringinfo(){
			this.init()
		}
	},
  mounted() {
    this.init()
  },

  methods: {
    init() {
		if(!this.waringinfo) return
		this.waringinfo['e6']=this.waringinfo['e6']==0?1:0
      this.waringData.map(i => {
		  if(i.id.split('e')[1]<9){
			   i.status = this.waringinfo[i.id]
		  }
       
      })
	  this.waringDataStatus.map(i => {
		  if(i.id.split('e')[1]>8){
			  i.status = this.waringinfo[i.id]
		  }
	  })
    }
  }
}
</script>

<style lang="scss" scoped>
.showwaring {
  width: 100%;
  padding: 0upx 20upx;
  padding-top: 20upx;
  height: 690upx;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    width: 100%;
  }
  .border-top{
	  border-top: 1px solid #e1e1e1;
	  margin: 10upx 0;
  }
  .title{
	  font-size: 34upx;
	  color: $uni-text-color;
	  padding: 10upx 0;
  }
  .my-item {
    margin: 10upx 0;
    .myicon {
      margin-bottom: 10upx;
      color: $primaryColor;
      font-size: 40upx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 100upx;
      height: 100upx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20upx 0px rgba(119, 134, 238, 0.22);
    }
    .text {
      font-size: 30upx;
      color: #313131;
    }
    &.status-error .myicon {
      color: #fff;
      background: #f38181;
    }
	&.status-default .myicon {
	  background: #EEEEEE;
	}
	&.status-success .myicon {
	  color: #fff;
	  background: $uni-color-success;
	}
	
  }
}
</style>
