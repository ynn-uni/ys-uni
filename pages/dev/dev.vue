<template>
  <view class="dev bg-height">
    <cu-custom bgcolor="bg-white">
      <block slot="content">永生仪器</block>
    </cu-custom>
    <button open-type="openSetting" bindopensetting="callback">打开设置页</button>
    <noLogin v-if="devList.length<=0" @haslogin="handelLogin"></noLogin>
    <!-- <noLogin v-if="!haveDev"></noLogin> -->
    <view v-if="devList.length>0" class="dev-content animation-slide-right">
      <picker @change="PickerChange" :value="index" :range="picker" style-="font-size:30upx">
        <button class="cu-btn changedev text-center">{{devList[index].title}}</button>
      </picker>
      <view class="content">
        <showDevData :datas="tData" v-if="TabCur===0"></showDevData>
        <showDevData :datas="hData" v-if="TabCur===1"></showDevData>
        <showWaringData v-if="TabCur===2" :waringinfo="waringinfo"></showWaringData>
        <showChartLine v-if="TabCur===3"></showChartLine>
        <scroll-view scroll-x class="bg-white nav margin-tb">
          <view class="flex text-center tablist">
            <view
              class="cu-item flex-sub"
              :class="index==TabCur?'activeTab':''"
              v-for="(item,index) in tabList"
              :key="index"
              @tap="tabSelect"
              :data-id="index"
            >
              <view :class="'iconfont '+item.icon"></view>
              {{item.name}}
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import showDevData from './components/showDevData.vue'
import showWaringData from './components/showWaringData.vue'
import showChartLine from './components/showChartLine.vue'
import noLogin from '@/components/noLogin.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      index: 0,
      isLogin: false,
      haveDev: false,
      TabCur: 0,
      scrollLeft: 0,
      tabIndex: 0,
      tabList: [
        {
          name: '温度',
          icon: 'iconwendukongzhi'
        },
        {
          name: '湿度',
          icon: 'iconshidukongzhi'
        },
        {
          name: '预警',
          icon: 'iconyujing'
        },
        {
          name: '数据',
          icon: 'iconshuju'
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
      waringinfo: {}
    }
  },
  components: {
    showDevData,
    showWaringData,
    showChartLine,
    noLogin
  },
  computed: {
    ...mapGetters(['token', 'devList', 'devListMac', 'userInfo']),
    picker() {
      let list = []
      this.devList.forEach(val => {
        list.push(val.title)
      })
      return list
    }
  },
  watch: {
    devListMac() {
      this.initsocket()
    }
  },
  onLoad() {
    this.initWebsocket().then(instance => {
      instance.onopen = evt => {
        instance.send({ mac: this.devListMac })
      }
      instance.onmessage = evt => {
        // console.log(evt.data);
        if (evt === 'PONG') return
        const json = JSON.parse(evt.data)
        this.waringinfo = json.e
        this.tData = this.setTemperatureData(json.t)
        this.hData = this.setHumidityData(json.h)
      }
    })
  },
  onShow() {
    this.checkUserLogin()
    if (!this.$store.state.isAppHide) {
      this.initsocket()
    }

    this.devList.forEach((val, index) => {
      if (val.mac == this.devListMac) {
        this.index = index
      } else {
        this.index = 0
      }
    })
  },
  methods: {
    ...mapActions('dev', ['initWebsocket', 'closeWebsocket']),
    ...mapMutations('user', ['updateDevListMac']),
    ...mapActions('user', ['fatchDevListByToken']),
    initsocket() {
      if (this.devList.length > 0) {
        this.initWebsocket().then(instance => {
          instance.onopen = evt => {
            this.$store.state.isAppHide = true
            instance.send({ mac: this.devListMac })
          }
          instance.onmessage = evt => {
            let data = JSON.parse(evt.data)
            console.log(data)
            // console.log(evt.data.t)
            this.waringinfo = data.e
          }
        })
      }
    },
    checkUserLogin(data) {
      if (this.devList.length > 0) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    PickerChange(e) {
      //选择设备
      this.index = e.detail.value //index为选择序列下标
      this.updateDevListMac(this.devList[this.index].mac)
      console.log(this.index)
    },
    handelLogin() {
      this.isLogin = true
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
      if (!data) return
      data = this.getLastData(data)
      return {
        label: '温度',
        current: +(data.Ta / 100).toFixed(2),
        setting: data.Ts,
				output: data.To,
				unit: '℃'
      }
    },
    setHumidityData(data) {
      if (!data) return
      data = this.getLastData(data)
      return {
        label: '湿度',
        current: +(data.Ha / 100).toFixed(2),
        setting: data.Hs,
				output: data.Ho,
				unit: '%'
      }
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
    padding: 25upx 20upx;
    .cu-item {
      // margin: 10upx 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 70upx;
      width: 100upx;
      height: 200upx;
      box-shadow: 0px 0px 20upx 0px rgba(120, 134, 238, 0.22);
      border-radius: 15upx;
      view {
        font-size: 60upx;
        color: $primaryColor;
      }
    }
    .activeTab {
      color: #ffffff;
      background: linear-gradient(135deg, #7285ed 0%, #b791f7 100%);
      view {
        color: #ffffff;
      }
    }
  }
  .changedev {
    display: block;
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
  }
}
</style>
