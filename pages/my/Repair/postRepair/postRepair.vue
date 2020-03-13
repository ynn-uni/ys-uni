<template>
	<view class="repair">
		<form >
			<view class="in-group">
				<view class="text">
					联系人
				</view>
				<input type="text" value="" v-model="name"/>
			</view>
			<view class="in-group">
				<view class="text">
					联系电话
				</view>
				<input type="tel" value="" v-model="tel"/>
			</view>
			<view class="in-group">
				<view class="text">
					联系地址
				</view>
				<input type="text" value="" v-model="address"/>
			</view>
			<view class="in-group">
				<view class="text">
					详细信息
				</view>
				<textarea value="" v-model="dis"/>
			</view>
			
			<view class="btn">
				<button class="cu-btn" @tap="makesure">提交</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	// import req from '@/request/request.js'
	export default {
		data() {
			return {
				name:'',
				tel:'',
				address:'',
				dis:''
			}
		},
		mounted() {  
		            // uni.login({  
		            //     success: function(res) {  
		            //         // 获取code  
		            //         console.log(JSON.stringify(res));  
		            //     }  
		            // });  
		        },  
		methods: {
			makesure(){
				console.log("mak")
				if(this.name&&this.tel&&this.address&&this.dis){
					var obj={
						name:this.name,
						phone:this.tel,
						address:this.address,
						content:this.dis
					};
					console.log(obj)
					this.req.httpTokenRequest({
						'url':'/Api/Repair/addRepair',
						'method':'GET',
						// 'contentType':'multipart/form-data'
					},obj).then((res)=>{
						console.log(res)
						if(res.data.status==0){
							uni.showToast({
								title:'已成功提交报修',
								icon:'none'
							})
							setTimeout(function(){
								uni.navigateBack()
							},1500)
						}
					})
					
					
				}else{
					
					uni.showToast({
						title:'请填写基本信息',
						icon:'none'
					})
					return false;
				}
			}
			            
			 
		}
	}
</script>

<style lang="scss" scoped>
	.repair{
		padding: 82upx 32upx;
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		form{
			.in-group{
				margin-bottom: 40upx;
				.text{
					font-size:28upx;
					font-weight:400;
					color:rgba(19,41,54,1);
					line-height:33upx;
				}
				input{
					margin-top: 6upx;
					width:688upx;
					height:60upx;
					opacity:0.34;
					border:1px solid rgba(110,116,123,1);
				}
				textarea{
					margin-top: 6upx;
					width:100%;
					height:240upx;
					background:rgba(255,255,255,1);
					opacity:0.34;
					border:1px solid rgba(110,116,123,1);
				}
			}
			.btn{
				text-align: center;
				button{
					width:232upx;
					height:70upx;
					background:rgba(234,91,66,1);
					border-radius:35upx;
					font-size:28upx;
					font-weight:400;
					color:rgba(255,255,255,1);
					letter-spacing:2upx;
				}
			}
			
		}
		
	}
</style>
