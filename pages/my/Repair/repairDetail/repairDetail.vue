<template>
	<view class="repair">
		<cu-custom :isBack="true" bgColor="#eee">
			<block slot="backText">返回</block>
			<block slot="content">报修详情</block>
		</cu-custom>
		<view class="rep">
			
		
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
					详细信息:
				</view>
				<textarea value="" v-model="dis"/>
			</view>
			
			<view class="">
				报修状态：{{status}}
			</view>
			
		</form>
		</view>
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
				dis:'',
				status:null
			}
		},
		onLoad(option) { 
			console.log( option.data)
			var data=JSON.parse(option.data);
		          this.name=data.name;
				  this.tel=data.phone;
				  this.address=data.address;
				  this.dis=data.content;
				  this.status=data.status;
		        },  
		methods: {
			
			            
			 
		}
	}
</script>

<style lang="scss" scoped>
	.repair{
		
		min-height: 100vh;
		background-color: #FFFFFF;
		.rep{
			padding: 22upx 32upx;
			form{
				.in-group{
					margin-bottom: 40upx;
					.text{
						font-size:28upx;
						font-weight:400;
						color:rgba(19,41,54,1);
						line-height:33upx;
					}
					/deep/ input{
						margin-top: 6upx;
						width:688upx;
						height:60upx;
						opacity:0.34;
						color: #000;
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
				
				
			}
		}
	     
		
	}
</style>
