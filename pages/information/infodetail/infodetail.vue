<template>
	<view class="infodetail">
		<view class="title">
			{{detailData.title}}
		</view>
		<view class="userinfo">
			<text class="name">{{detailData.userInfo.name}}</text>
			<text class="time">{{detailData.userInfo.time}}</text>
		</view>
		<image :src="detailData.imgUrl" mode=""></image>
		<view class="content">
			{{detailData.dis}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData:{
					title:'用户体验设计师面试中可能会问及的10个高频问题5个高频问题',
					userInfo:{
						name:'中国经济网',
						time:'10月29日'
					},
					imgUrl:'../../../static/images/infodetail1.png',
					dis:'7月7日上午，水利部召开会商会，分析研判雨水情及防御形势，对强降雨防范工作作出安排部署。 强调此次强降雨过程范围广，部分区域降雨强度大，前期降雨过程多，江河水位偏高，堤防防守压力大，要求各地务必高度重视，对山洪灾害防御、水库安全度汛、水工程运行监管、堤防巡查防守等采取更加有针对性的措施，全力做好各项防御工作'
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.infodetail{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 30upx;
		
		.title{
			margin-top: 35upx;
			font-size:32upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(67,67,67,1);
			line-height:60upx;
			letter-spacing:1px;
		}
		.userinfo{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			line-height: 33upx;
			font-size:24upx;
			font-weight:400;
			color:rgba(155,155,155,1);
			line-height:33upx;
			margin-top: 6upx;
			width: 100%;
			.name{
				margin-left: 10upx;
			}
			.time{
				margin-left: 90upx;
			}
		}
		image{
			margin-top: 40upx;
			width:690upx;
			height:396upx;
		}
		.content{
			margin-top: 20upx;
			width:690upx;
			font-size:28upx;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:60upx;
			text-align: justify;
		}
	}
</style>
