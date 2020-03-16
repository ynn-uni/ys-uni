<template>
	<view class="nodev">
		<view class="nodev-content">
			<image class="logo" src="../static/images/nodev1.png" mode=""></image>
			<text class="welcome">嗨，欢迎使用永生仪器！</text>
			<!-- <image class="bg" src="../static/images/nodev2.png" mode=""></image>
			<text class="isadd">暂时还未登录</text> -->
			<view class="flex flex-wrap justify-between align-center bg-white btn-box">
				
				<button class="cu-btn btn active" @tap="handelToDev" >
					点击登录/注册
				</button>
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
				sessionKey:''
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
			ShowChild: function (data) {//用户确认授权
				var that=this;
				console.log("点击弹出框按钮")
				if(data=='点击确认'){
					isAuthorized(that.$store.state.sessionKey).then(res=>{
						console.log(res)
						if(res=='DialogModal1'){
							// this.showModal()
						}else{
							console.log("token:"+res)
							// this.haveUserInfo=true
							uni.setStorage({
								key:'token',
								data:res,
								 success() {
									that.$store.state.token=res
									that.haveUserInfo=true;
									that.token=res;
									console.log("跳转至首页")
									that.$emit("isAddDevice","nodev")
									// uni.switchTab({
									//     url: '/pages/index/index'
									// });
									console.log("设置缓存成功")
								 },
								 fail() {
									 console.log('缓存失败了')
									
								 }
							});
						}
					})
				}else{
					console.log('拒绝授权')
				}
				
				 this.modalName =null
			},
			handelDev(){
				var that=this
				 // that.modalName = 'DialogModal1'
				uni.login({
				     success(res){
					 console.log(res.code);
					 that.code=res.code
					 // console.log(data)
					 that.req.httpRequest({
						 url:'/Api/User/loginWithWechat',
						 method:'GET'
					 },
					 {code:that.code}).then((r)=>{
						 console.log(r)
							var tel=r.data.data.phone;
							var email=r.data.data.email
							if(tel){
								 that.$store.state.tel=tel;
							}else if(email){
								 that.$store.state.email=email;
							}else{
								that.$store.state.sessionKey=r.data.data.key
							}		
						 if(r.data.code==200){
							 
						   console.log(r.data.data.token)
						   uni.setStorage({
							key:'token',
							data:r.data.data.token,
							 success() {
								 console.log("转至首页")
								 that.$store.state.token=r.data.data.token
								 that.$store.state.isLogin=true
								 // uni.switchTab({
								 //     url: '/pages/index/index'
								 // });
								that.$emit("isAddDevice","nodev")
								
							 },
							 fail() {
								 console.log('缓存失败了')
							 }
						   });
						 }else{
							 console.log("不含有用户注册信息,sessionkey:"+r.data.data.key)
							 that.sessionKey=r.data.data.key;	
							  that.modalName = 'DialogModal1'
						 }
					 })
				  
				     }
				   })
				   
			},
			handelToDev(){
				
				var sessionKey=this.$store.state.sessionKey;
				console.log(sessionKey)
				if(sessionKey){
					console.log("不含有用户注册信息,sessionkey:")
					this.sessionKey=sessionKey	
					 this.modalName = 'DialogModal1'
				}
			},
			// showModal() {
			// 	var that=this;
			// 	wx.getSetting({
			// 	     success(res) {
			// 	       if (res.authSetting['scope.userInfo']) {
			// 									console.log("已经授权")
			// 	         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
			// 	         wx.getUserInfo({
			// 	           success(res) {
			// 	             console.log(res.userInfo)
			// 				 that.modalName = 'DialogModal3'
			// 	           }
			// 	         })
			// 	       }
			// 	     }
			// 	   })
				
			// },
			hideModal(){
				this.modalName = null;
				// this.$emit("ListenChild","I am child.vue")
				
			},
			makesure(){
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
							that.$emit("isAddDevice","I am nodev")
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
	}
</style>
