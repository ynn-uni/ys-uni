<template>
	<view class="devlist">
	<cu-custom :isBack="true">
		<block slot="backText">返回</block>
		<block slot="content">故障引导列表</block>
	</cu-custom>
	<view class=" menu-avatar cu-list">
		<view class=" dl-item" v-for="(item,index) in data" :key='index' @tap="handelDetail">
			<view class="info" >
				<view class="num">
					{{index>10?index+1:'0'+(index+1)}}
				</view>
				<view class="line"></view>
					<view class="name">
						{{item.name}}
					</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[{id:0,name:'故障一'},{id:1,name:'故障二'},{id:2,name:'故障三'}]
			}
		},
		methods: {
			handelDetail(){
				uni.navigateTo({
					url:'/pages/my/help/helpdetail/helpdetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.devlist{
		.cu-list{
			margin: 0 34upx;
			overflow: hidden;
			.dl-item{
				background:rgba(255,255,255,1);
				box-shadow:0px 2upx 4upx 0px rgba(236,236,236,0.5);
				border-radius:20upx;
				border:1px solid rgba(234,234,234,1);
				line-height: 100upx;
				margin-top: 26upx;
				.info{
					display: flex;
					align-items: center;
					.num{
						font-size:40upx;
						font-weight:bold;
						color:rgba(84,84,84,1);
						line-height:59upx;
						margin-right: 20upx;
						margin-left: 20upx;
					}
					.line{
						width:2upx;
						height:70upx;
						background:rgba(216,216,216,1);
						margin-right: 33upx;
					}
					.name{
						font-size:32upx;
						font-weight:500;
						color:rgba(84,84,84,1);
						line-height:45upx;
						// margin-right: 166upx;
						width: 458upx;
					}
					text{
						display: block;
						margin-right: 10upx;
						color:rgba(168,174,184,1);
					}
				}
			}
		}
	}
</style>
