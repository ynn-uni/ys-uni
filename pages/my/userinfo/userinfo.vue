<template>
	<view class="my">
		<view class="bank">
			<view class="heade-info">
				
				<view  class="head-img">
					<open-data type="userAvatarUrl"></open-data>    
				</view>
				
				<open-data  type="userNickName" lang="zh_CN" class="nickName"></open-data> 
				<!-- <text >18323084462</text> -->
			</view>
			<view class="bg">
			</view>
		</view>
		<form >
		<view class="otherinfo my-box">
			
					<view class="cu-form-group" data-path="/pages/my/devlist/devlist">
						<view class="cu-left">
							<!-- <image src="../../static/images/devtool.png" mode=""></image> -->
							<view class="title">电话</view>
							<input type="text" value="" v-model="tel" />
						</view>
						
						<button class="cu-btn cuIcon cu-right" @tap="handelClear('tel')">
							<text class="cuIcon-close"></text>
						</button>
							
						
					</view>
					<!-- <view class="cu-form-group margin-top">
						<view class="title">邮件</view>
						<input placeholder="两字短标题" name="input"></input>
					</view> -->
					<view class="cu-form-group" data-path="/pages/my/waring/waring">
						<view class="cu-left">
							<!-- <image src="../../static/images/waring1.png" mode=""></image> -->
							<view class="title">邮箱</view>
							<input type="text" value="" v-model="email"/>
						</view>
						<button class="cu-btn cuIcon cu-right" @tap="handelClear('email')">
							<text class="cuIcon-close"></text>
						</button>
					</view>
					
				
				
			
		
			
		</view>
		<button class="sure" @tap="handelMakeSure">确认修改</button>
		</form>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				tel:'',
				email:''
			}
		},
		onShow() {
			this.tel=this.$store.state.tel;
			this.email=this.$store.state.email;
		},
		methods:{
			handelClear(str){
				if(str=='tel'){
					this.tel=''
				}else{
					this.email=''
				}
			},
			handelMakeSure(){
				var that=this;
				var telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
				var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;  
				if(!this.tel&&!this.email){
					
					uni.showToast({
						title:'请填写手机号或邮箱',
						icon:'none'
					})
					return false;
				}else if(!telReg.test(this.tel)){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
					this.tel='';
					return false;
				}else if(!emailReg.test(this.email)){
					uni.showToast({
						title:'请输入正确的邮箱',
						icon:'none'
					})
					this.email='';
					return false;
				}else{
					that.req.httpTokenRequest({
						url:'/Api/User/setUserPhoneOrEmail',
						method:'GET'
					},{
						phone:this.tel,
						email:this.email
					}
					).then((res)=>{
						console.log(res)
						// this.switchB = e.detail.value
						uni.showToast({
							title:'修改成功',
							icon:'none'
						})
						that.$store.state.tel=this.tel;
						that.$store.state.email=this.email;
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		.bank{
			height: 330upx;
			background:#ea302f;
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
					border: 1px solid #ea302f;
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
				background-image: url('../../../static/images/head_06.gif');
				background-repeat: no-repeat;
				background-size: cover;
				position: absolute;
				bottom: 0;
				// background-size: contain;
			}
		}
		.otherinfo{
			margin: 58upx 40upx;
			border-bottom: 1px solid #E9E9E9;
			.cu-form-group{
				border-top: 1px solid #E9E9E9;
				.cu-left{
					display: flex;
					image{
						width: 50upx;
						height: 50upx;
						margin-left: 27upx;
					}
					.title{
						margin-left: 37upx;
						font-size:30upx;
						font-weight:500;
						color:rgba(50,72,92,1);
					}
				}
				.cu-right{
					display: block;
					background-color: #C8C7CC;
					width: 34upx;
					height: 34upx;
					border: 1px solid #C8C7CC;
					border-radius: 50%;
					
					text{
						text-align: center;
						line-height: 30upx;
						font-size: 30upx;
						font-weight: normal;
						color: #fff;
					}
				}
				
			}
			
		}
		.sure{
			width:232upx;
			line-height:70upx;
			background:rgba(234,91,66,1);
			border-radius:35upx;
			font-size:28upx;
			font-weight:400;
			color:rgba(255,255,255,1);
			letter-spacing:2upx;
		}
	}
</style>
