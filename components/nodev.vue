<template>
	<view class="nodev">
		<view class="nodev-content">
			<image class="logo" src="../static/images/nodev1.png" mode=""></image>
			<text class="welcome">嗨，欢迎使用永生仪器！</text>
			<image class="bg" src="../static/images/nodev2.png" mode=""></image>
			<!-- <text class="isadd">{{text.errMsg}}暂时还未添加设备</text> -->
			<text class="isadd">暂时还未添加设备</text>
			<!-- <input type="text" value="" placeholder="bbb" /> -->
			<view class="flex flex-wrap justify-between align-center bg-white btn-box">
				
				<!-- <button class="cu-btn btn active" @tap="handelDev()" open-type="getUserInfo"
				  bindgetuserinfo="bindGetUserInfo"> -->
				 <button class="cu-btn btn active" @tap="handelDev"  >
					<text class="lg cuIcon-add add"></text>
					添加设备
				</button>
				<!-- <button class="cu-btn btn active" @tap="handelDev()">测试</button> -->
				<button class="cu-btn btn active" @tap="handelInfo">查看更多产品</button>
			</view>
			<view class="cu-modal model" :class="modalName=='DialogModal3'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end cu-height">
						<view class="content">输入设备绑定信息</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-gray"></text>
						</view>
					</view>
					<view class="form-box">
						<!-- <form @submit="" @reset=""> -->
						<form >
							<view class="form-input">
								<view class="">
									<input v-model="devTitle" type="text" value="" placeholder="输入设备名称" />
								</view>
								<view class="">
									<input v-model="devMac" type="text" value="" placeholder="输入设备MAC地址" />
								</view>
								<view class="">
									<input v-model="devName" type="text" value="" placeholder="输入设备用户名" />
								</view>
								<view class="">
									<input v-model="devPwd" type="password" value="" placeholder="输入设备密码" />
								</view>
							</view>
							<view class="addbtn">
								<button class="cu-btn round bg-red" @tap="doubleTap" @touchstart="touchStart" @touchend="touchEnd">确认绑定</button>
							</view>
						</form>
					</view>
				</view>
			</view>
			<modelre v-on:ListenChild="ShowChild" :modalname="modalName"></modelre>
		</view>
	</view>
</template>

<script>
	// import req from '@/request/request.js'
	import modelre from '@/components/modelre.vue'
	import {isAuthorized} from '@/utils/loginreg.js'
	export default{
		data() {
			return {
				modalName: null,
				devTitle:'',
				devMac:'',
				devName:'',
				devPwd:'',
				code:'',
				touchStartTime: 0, // 触摸开始时间
				touchEndTime: 0, // 触摸结束时间
				lastTapTime: 0 // 最后一次单击事件点击发生时间
			}
		},
		components:{
			modelre
		},
		props:{
			text:{}
		},
		mounted() {
			console.log("monted")
			
		},
		methods:{
			
			ShowChild: function (data) {
				var that=this;
				console.log(data)
				if(data.msg=='确认手机授权'){
					let sendData={};
					sendData.sessionKey=that.$store.state.sessionKey;
					sendData.iv=data.iv;
					sendData.encryptedData=data.encryptedData;
					console.log(sendData)
					that.req.httpTokenRequest({
						url:'/Api/User/setUserPhone',
						method:'POST'
					},JSON.stringify(sendData)
					).then((res)=>{
						console.log(res)
						
							that.$store.state.tel=res.data.data.phone;
						
						
					})
				}
			     // this.modalName =null
				 that.modalName = 'DialogModal3'
			},
			handelDev(){
				var that=this
				
				var tel=this.$store.state.tel;
				if(tel){
					that.modalName = 'DialogModal3'
				}else{
					that.modalName = 'DialogModal4'
				}
				
			},
			
			hideModal(){
				this.modalName = null;
				// this.$emit("ListenChild","I am child.vue")
				
			},
			touchStart(e) {
				console.log(e.timeStamp)
			  this.touchStartTime = e.timeStamp;
			},
			touchEnd(e) {
				console.log(e.timeStamp)
			  this.touchEndTime = e.timeStamp;
			},
			doubleTap(e) {
			  var vm = this;
			  // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
			  if (vm.touchEndTime - vm.touchStartTime < 350) {
			    // 当前点击的时间
				console.log(e)
				
			    var currentTime = e.timeStamp;
			    var lastTapTime = vm.lastTapTime;
			    // 更新最后一次点击时间
			    vm.lastTapTime = currentTime;
			    // 如果两次点击时间在300毫秒内，则认为是双击事件
			    if (currentTime - lastTapTime > 350) {
			      // do something 点击事件具体执行那个业务
				  vm.makesure()
				  
			    }
			  }
			},
			makesure(){//添加设备
			var that=this;
				if(this.devTitle&&this.devMac&& this.devName && this.devPwd){
					var data={
						title:this.devTitle,
						mac: this.devMac,
						username: this.devName,
						password:this.devPwd
					}
					that.req.httpTokenRequest({
						url:'/Api/Device/addDevice',
						method:'GET'
					},data
					).then((res)=>{
						console.log(res)
						if(res.statusCode==200){
							that.$emit("isAddDevice","devdetail")
						}
					})
					// this.$emit("ListenChild","I am child.vue")
				}else{
					uni.showToast({
						title:'请输入设备信息',
						icon:'none'
					})
				}
			},
			handelInfo(){
				uni.switchTab({
				    url: '/pages/information/information'
				});
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.nodev{
		display: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.nodev-content{
			background-color: #fff;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.logo{
				margin-top: 73upx;
				width:140upx;
				height:185upx;
			}
			.welcome{
				margin-top: 28upx;
				font-size:26upx;
				font-weight:400;
				color:rgba(168,174,184,1);
				line-height:33upx;
			}
			.bg{
				margin-top: 30upx;
				width:476upx;
				height:404upx;
			}
			.isadd{
				display: block;
				text-align: center;
				color: #8a8a8a;
				font-size: 24upx;
				padding-top: 28upx;
				margin-bottom: 85upx;
			}
			.btn-box{
				padding: 0 100upx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				.btn{
					line-height: 82upx;
					width: 246upx;
					font-size: 26upx;
					color: #fff;
					background-color: #a4a4a4;
					.add{
						color: #fff;
					}
				}
				.active{
					background-color: #ea5a41;
				}
			}
			.model{
				.cu-dialog{
					height: 480upx;
					background-color: #fff;
					.cu-height{
						height: 50upx;
					}
					.form-box{
						// height: 100%;
						// padding: 0;
						background-color: #fff;
						
							form{
								
								padding: 10upx 0;
								height: 100%;
								.form-input{
									height: 260upx;
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									align-items: center;
									input{
										width: 518upx;
										height: 58upx;
										border: 1px solid #d2d3d6;
										color: #808080;
										font-size: 26upx;
										text-align: left;
										padding-left: 20upx;
										
									}
								}
								.addbtn{
									display: flex;
									justify-content: center;
									margin-top: 28upx;
								}
							}
						
						
					}
					
				}
				
				
			}
		}
	}
</style>
