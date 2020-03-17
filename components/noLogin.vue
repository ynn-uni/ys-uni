<template>
	<view class="nodev animation-slide-right">
		<view class="nodev-content">
			<image class="logo" src="../static/images/nodev1.png" mode=""></image>
			<text class="welcome">嗨，欢迎使用永生仪器！</text>
			<view class="flex flex-wrap justify-between align-center bg-white btn-box">
				
				<button v-if="!token" class="cu-btn btn active animation-slide-right" open-type="getUserInfo"
				@getuserinfo="getUserInfo">点击登录/注册</button>
				<!-- <button v-if="token&&!userInfo.phone"  class="cu-btn btn active animation-slide-right" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button> -->
				<button v-if="token&&devList.length<=0" class="cu-btn btn active animation-slide-right" @tap="handelDev">添加设备</button>
			</view>
			
		</view>
		<modelre v-on:ListenChild="ShowChild" :modalname="modalName"></modelre>
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
							<button class="cu-btn round bg-red" @tap="makesure" >确认绑定</button>
						</view>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {setUserPhone,addDevice} from '../apis/index.js'
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	import modelre from '@/components/modelre.vue'
	export default{
		data() {
			return {
				modalName: null,
				devTitle:'',
				devMac:'',
				devName:'',
				devPwd:'',
				sessionKey:''
			}
		},
		computed:{
			 ...mapGetters(['token', 'devList','userInfo']),
		},
		components:{
			modelre
		},
		props:{
			text:{}
		},
		mounted() {
			
		},
		methods:{
			...mapMutations('user', ['updateUserInfo']),
			...mapActions('user', [
			  'fatchDevListByToken',
			  'loginWithUserInfo'
			]),
			getUserInfo(evt) {
				
			  const {iv, encryptedData,errMsg} = evt.detail;
			  if (errMsg === 'getUserInfo:ok') {
				this.loginWithUserInfo({ iv, encryptedData });
				
			  }
			},
			handelDev(){
				var that=this
				that.modalName = 'DialogModal3'
				
			},
			getPhoneNumber(e){
				let data={}
				console.log(this.userInfo)
				data.sessionKey=this.userInfo.key;
				data.iv=e.detail.iv;
				data.encryptedData=e.detail.encryptedData;
				setUserPhone(data).then((res)=>{
					this.userInfo.phone=res.data.phone
					this.updateUserInfo(this.userInfo)
				})
			},
			hideModal(){
				this.modalName = null;
				// this.$emit("ListenChild","I am child.vue")
				
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
					addDevice(data).then((res)=>{
						if(res.msg==='添加设备数据成功'){
							this.fatchDevListByToken()
							this.$emit('haslogin')
						}
					})
					
				}else{
					uni.showToast({
						title:'请输入设备信息',
						icon:'none'
					})
				}
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.nodev{
		min-height: 100vh;
		.nodev-content{
			background-color: #fff;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.logo{
				margin-top: 300upx;
				width:140upx;
				height:185upx;
			}
			.welcome{
				margin-top: 28upx;
				font-size:24upx;
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
				font-size: 22upx;
				padding-top: 28upx;
				margin-bottom: 85upx;
			}
			.btn-box{
				padding: 0 100upx;
				width: 100%;
				display: flex;
				justify-content: center;
				.btn{
					line-height: 82upx;
					width: 246upx;
					font-size: 22upx;
					color: #fff;
					background-color: #a4a4a4;
					margin-top: 150upx;
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
										font-size: 22upx;
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
</style>
