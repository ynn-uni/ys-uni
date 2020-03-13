<template>
	<view class="help">
		<!-- <view class="title">
			帮助中心
		</view> -->
		<view class="content">
			<view class="text">
				永生仪器售后服务中心，致力于为客户提供及时、专业、高效的设备维修及使用人员培训服务。我们认为公司的品牌竞争力不仅建立在我们提供先进、可靠的产品基础上，而且依赖于我们所提供的及时优质的服务。
				为此，我们培养了一支优秀可靠的技术服务队伍，完善的培训和实践经验令售后服务工程师实现技能的持续提升，为客户持续提供高品质专业化服务。
				我们相信，我们的资深售后服务工程师能时刻为身处各地的永生设备保驾护航。
			</view>
			
			<video class="course_image" id="myVideo" :src="videoUri" controls v-if="videoUri">
			</video>
			<view class="text">
				永生仪器售后服务中心，致力于为客户提供及时、专业、高效的设备维修及使用人员培训服务。我们认为公司的品牌竞争力不仅建立在我们提供先进、可靠的产品基础上，而且依赖于我们所提供的及时优质的服务。
				为此，我们培养了一支优秀可靠的技术服务队伍，完善的培训和实践经验令售后服务工程师实现技能的持续提升，为客户持续提供高品质专业化服务。
				我们相信，我们的资深售后服务工程师能时刻为身处各地的永生设备保驾护航。
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUri: 'https://player.alicdn.com/video/aliyunmedia.mp4'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.help{
		padding: 20upx 34upx;
		position: fixed;
		top: 0;
		bottom: 0;
		background-color: #fff;
		overflow: auto;
		.title{
			text-align: center;
			font-size:32upx;
			font-weight:400;
			color:rgba(67,67,67,1);
			line-height:60upx;
			letter-spacing:1px;
		}
		.content{
			.text{
				font-size:30upx;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:60upx;
				text-align: justify;
				text-indent: 56upx;
			}
			
			video{
				width:100%;
			}
		}
	}

</style>
