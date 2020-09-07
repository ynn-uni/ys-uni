<template>
	<view class="my">
		<image class="index-bg" src="../../static/images/my-linear.png" />
		<cu-custom >
		  <block slot="content">
			  <view class="text">
			  	我的
			  </view>
			  
			</block>
		</cu-custom>
		<view class="bank">
			<view class="heade-info">
				<image src="../../static/images/head_03.gif" mode="" v-if="!token"></image>
				<text v-if="!token" @click="showModal">登录/注册</text>
				<!-- <text v-if="!token">电话号码</text> -->
				<view  class="head-img" v-if="token" @tap="handelUserInfo">
					<open-data type="userAvatarUrl"></open-data>    
				</view>
				
				<open-data v-if="token" type="userNickName" lang="zh_CN" class="nickName"></open-data> 
				<text v-if="token">{{mytel}}</text>
			</view>
			<view class="bg">
			</view>
		</view>
		<view class="otherinfo my-box">
			<view class="cu-form-group" @tap="doubleTap" data-path="/pages/my/set/set" @touchstart="touchStart" @touchend="touchEnd">
				<view class="cu-left">
					<!-- <image src="../../static/images/devtool.png" mode=""></image> -->
					 <view class="iconfont iconshebeizhongxin"></view>
					<view class="title">系统设置</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group" @tap="doubleTap" data-path="/pages/my/sensor/sensor" @touchstart="touchStart" @touchend="touchEnd">
				<view class="cu-left">
					<!-- <image src="../../static/images/devtool.png" mode=""></image> -->
					 <view class="iconfont1 cuIcon-circle"></view>
					<view class="title">传感器设置</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group" @tap="doubleTap" data-path="/pages/my/devlist/devlist" @touchstart="touchStart" @touchend="touchEnd">
				<view class="cu-left">
					<!-- <image src="../../static/images/devtool.png" mode=""></image> -->
					<view class="iconfont1 cuIcon-vipcard"></view>
					<view class="title">设备中心</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group" @tap="doubleTap" data-path="/pages/my/waring/waring" @touchstart="touchStart" @touchend="touchEnd">
				<view class="cu-left">
					<view class="iconfont iconyujing1"></view>
					<view class="title">历史故障</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group" @tap="doubleTap" data-path="/pages/my/historyData/historyData" @touchstart="touchStart" @touchend="touchEnd">
				<view class="cu-left">
					<!-- <image src="../../static/images/waring1.png" mode=""></image> -->
					<view class="iconfont iconshuju"></view>
					<view class="title">历史数据</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<!-- <view class="cu-form-group" @tap="doubleTap" data-path="/pages/my/info/info" @touchstart="touchStart" @touchend="touchEnd">
				<view class="cu-left">
					<view class="iconfont iconxiaoxi"></view>
					<view class="title">
						消息中心
						<view class="circle" v-if='showInfo'>
							
						</view>
						
					</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view> -->
			
			<view class="cu-form-group"  @click="doubleTap" data-path="/pages/my/Repair/Repair" @touchstart="touchStart"
			 @touchend="touchEnd" >
				<view class="cu-left">
					<view class="iconfont iconbaoxiu"></view>
					<view class="title">在线报修</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group"  @tap="doubleTap" data-path="/pages/my/help/help" @touchstart="touchStart" @touchend="touchEnd" >
				<view class="cu-left">
					<view class="iconfont iconshebeiguzhangyindao"></view>
					<view class="title">故障引导</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group"  @tap="doubleTap" data-path="/pages/my/about/about" @touchstart="touchStart" @touchend="touchEnd" >
				<view class="cu-left">
					<view class="iconfont iconbangzhu"></view>
					<view class="title">关于永生</view>
				</view>
				<view class="cu-right">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			
			
		</view>
		
		<modelre @ListenChild="hideModel" :modalname="modalName" ref="regist"></modelre>
	</view>
</template>

<script>
	import modelre from '@/components/modelre.vue'
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				showInfo:false,
				modalName:null,
				isLogin:false,
				// code:'',
				// token:'',
				tel:'',
				touchStartTime: 0, // 触摸开始时间
				touchEndTime: 0, // 触摸结束时间
				lastTapTime: 0 // 最后一次单击事件点击发生时间
			}
		},
		computed:{
			 ...mapGetters(['token', 'userInfo']),
			 mytel(){
				 var tel=''
				 if(this.userInfo.phone){
					 var phone=this.userInfo.phone
					 tel=phone.substr(0, 3) + '****' +phone.substr(7)
				 }
				 return tel
			 }
		},
		components:{
			modelre
		},
		onShow(){
			// console.log(this.token)
			var that=this;
			this.isLogin=this.$store.state.isLogin;
			this.tel=this.$store.state.tel;
			var isLogin=this.$store.state.isLogin;
			//消息提示
			if(isLogin){
				that.req.httpTokenRequest(
				{url:'/Api/Notice/getNoticeList',method:'GET'}).then((res)=>{
					console.log(res)
					if(res.data.data.data.length>0){
						var data=res.data.data.data
						for(var i in data){
							if(data[i].status==1){
								that.showInfo=true
							}
						}
					}
				})
			}
		},
		
		methods: {
			handelUserInfo(){
				uni.navigateTo({
					url:'/pages/my/userinfo/userinfo'
				})
			},
			touchStart(e) {
			  this.touchStartTime = e.timeStamp;
			},
			touchEnd(e) {
			  this.touchEndTime = e.timeStamp;
			},
			doubleTap(e) {
			  var vm = this;
			  // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
			  if (vm.touchEndTime - vm.touchStartTime < 350) {
			    // 当前点击的时间
				var path=e.currentTarget.dataset.path
			    var currentTime = e.timeStamp;
			    var lastTapTime = vm.lastTapTime;
			    // 更新最后一次点击时间
			    vm.lastTapTime = currentTime;
			    // 如果两次点击时间在300毫秒内，则认为是双击事件
			    if (currentTime - lastTapTime > 350) {
			      // do something 点击事件具体执行那个业务
				  if(path=='/pages/my/about/about'||path=='/pages/my/help/help'){
					  vm.handelHelp(path);
				  }else{
					  vm.handelInfo(path)
				  }
			    }
			  }
			},
			handelInfo(path){
				var that=this
				if(that.token){
					// 已经登陆
					uni.navigateTo({
						 url: path
					});
				}else{
					that.$refs.regist.showModal()
				}
					
			},
			
			handelHelp(path){
				uni.navigateTo({
					 url: path
				})
			},
			
			showModal() {
				this.$refs.regist.showModal()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.my{
		min-height: 100vh;
		background-color: #FFFFFF;
		overflow: auto;
		.text{
			color: #fff;
		}
		.index-bg {
		  position: absolute;
		  top: 0;
		  width: 100%;
		  height: 430upx;
		}
		.bank{
			height: 330upx;
			// background:#ea302f;
			position: relative;
			.heade-info{
				display: flex;
				width:100%;
				flex-direction: column;
				align-items: center;
				// background-image: url('../../static/images/head_06.gif');
				image{
					width:120upx;
					height:120upx;
					border-radius: 50%;
				}
				.head-img{
					width:120upx;
					height:120upx;
					border-radius: 50%;
					// border: 1px solid #ea302f;
					overflow: hidden;
				}
				text,.nickName{
					font-size:26upx;
					font-weight:500;
					color:#fff;
					line-height:24upx;
					margin-top: 20upx;
				}
				
			}
			.bg{
				width: 100%;
				height: 98upx;
				// background-image: url('../../static/images/head_06.gif');
				background-repeat: no-repeat;
				background-size: cover;
				position: absolute;
				bottom: 0;
				// background-size: contain;
			}
		}
		.otherinfo{
			margin: 40upx 40upx;
			border-bottom: 1px solid #E9E9E9;
			.cu-form-group{
				border-top: 1px solid #E9E9E9;
				
				.cu-left{
					display: flex;
					align-items: center;
					.iconfont,.iconfont1{
						font-size: 74upx;
						color: $primaryColor;
					}
					image{
						width: 50upx;
						height: 50upx;
						margin-left: 27upx;
					}
					text{
						width: 60upx;
						height: 65upx;
						margin-left: 20upx;
						color:#EA5242;
						font-size: 60upx;
					}
					.title{
						margin-left: 37upx;
						font-size:30upx;
						font-weight:500;
						color:rgba(50,72,92,1);
						position: relative;
						.circle{
							width: 10upx;
							height: 10upx;
							border-radius: 50%;
							background-color: #EA5242;
							position: absolute;
							top: 0;
							right: 0;
						}
						.num{
							color: red;
							font-size: 22upx;
							position: absolute;
							font-weight: 700;
							top: -15upx;
							right: 0;
						}
					}
				}
				.cu-right{
					text{
						font-size: 30upx;
						font-weight: normal;
						color: #979797;
					}
				}
				
			}
		}
		
		
	}
</style>
