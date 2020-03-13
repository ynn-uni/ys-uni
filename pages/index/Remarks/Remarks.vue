<template>
	<view class="remarks">
		
		<view class="remark-item" v-for="(item,index) in signData" :key='index'>
			<view class="title">
				备注{{index+1}}
			</view>
			<view class="dis">
				{{item}}
			</view>
		</view>
		<!-- <view class="remark-item">
			<view class="title">
				备注2
			</view>
			<view class="dis">
				设备备注详
			</view>
		</view>
		<view class="remark-item">
			<view class="title">
				备注3
			</view>
			<view class="dis">
				设备备注详
			</view>
		</view>
		<view class="remark-item">
			<view class="title">
				备注4
			</view>
			<view class="dis">
				设备备注详设备备注详情
			</view>
		</view>
		<view class="remark-item">
			<view class="title">
				备注5
			</view>
			<view class="dis">
				设备备注详情设备备注详情
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signData:[]
			}
		},
		onShow() {
			console.log(this.$store.state.devMac)
			var mac=this.$store.state.devMac
			this.req.httpTokenRequest(
			{url:'/Api/Device/getDeviceSign',method:'GET'},
				{mac:mac}).then((res)=>{
					console.log(res.data.data)
					var data=res.data.data
					
					for(var i in data){
						if(data[i]){
							this.signData.push(data[i])
						}
					}
					// res.data.data
				})
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.remarks{
		// position: fixed;
		// top: 0;
		// left: 0;
		// bottom: 0;
		// right: 0;
		background-color: #f5f5f5;
		.remark-item{
			background-color: #fff;
			margin-top: 34upx;
			padding: 0 34upx;
			.title{
				font-size:32upx;
				font-weight:400;
				color:rgba(74,74,74,1);
				line-height:80upx;
				width: 680upx;
				border-bottom: 1px solid #f5f5f5;
			}
			.dis{
				font-size:32upx;
				font-weight:400;
				color:rgba(74,74,74,1);
				line-height:60upx;
				padding: 10upx 0;
			}
		}
	}
</style>
