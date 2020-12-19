<template>
	<view class="help">
		<cu-custom :isBack="true" bgColor="bg-e">
			<block slot="backText">返回</block>
			<block slot="content">{{info.name}}</block>
		</cu-custom>
		<!-- <view class="title">
			帮助中心
		</view> -->
		<view class="content">
			<!-- <view class="text">
				永生仪器售后服务中心，致力于为客户提供及时、专业、高效的设备维修及使用人员培训服务。我们认为公司的品牌竞争力不仅建立在我们提供先进、可靠的产品基础上，而且依赖于我们所提供的及时优质的服务。
				为此，我们培养了一支优秀可靠的技术服务队伍，完善的培训和实践经验令售后服务工程师实现技能的持续提升，为客户持续提供高品质专业化服务。
				我们相信，我们的资深售后服务工程师能时刻为身处各地的永生设备保驾护航。
			</view> -->
			<view v-if="info.type==1" class="img-box" :style="{width:imgwidth,height:imgheight}">
				<image class="img-content" :src="info.source"  @load="imageLoad" @tap="ViewImage"></image>
			</view>
			<video v-else class="course_image" id="myVideo" :src="info.source" controls >
			</video>
			<!-- <view class="text">
				永生仪器售后服务中心，致力于为客户提供及时、专业、高效的设备维修及使用人员培训服务。我们认为公司的品牌竞争力不仅建立在我们提供先进、可靠的产品基础上，而且依赖于我们所提供的及时优质的服务。
				为此，我们培养了一支优秀可靠的技术服务队伍，完善的培训和实践经验令售后服务工程师实现技能的持续提升，为客户持续提供高品质专业化服务。
				我们相信，我们的资深售后服务工程师能时刻为身处各地的永生设备保驾护航。
			</view> -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUri: 'https://player.alicdn.com/video/aliyunmedia.mp4',
				info:{},
				imgwidth:'',//
				imgheight:'',
			}
		},
		onLoad(option) { 
				console.log(option)
				this.info=option
    },
		methods: {
			imageLoad(e) {
			    var $width = e.detail.width; //获取图片真实宽度
			    var $height = e.detail.height; //获取图片真实高度
			    this.imgwidth= $width+'rpx'
			    this.imgheight= $height+'rpx'
				},
		 ViewImage(e) {
      uni.previewImage({
        urls: [this.info.source],
        current: e.currentTarget.dataset.url,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片')
          },
          fail: function(err) {
            console.log(err.errMsg)
          }
        }
      })
    },
		}
	}
</script>

<style lang="scss" scoped>
	.help{
		padding: 20upx 0upx;
		min-height: 100vh;
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
			padding: 0upx 34upx;
			.text{
				font-size:30upx;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:60upx;
				text-align: justify;
				text-indent: 56upx;
			}
			.img-box{
			.img-content{
					// margin-top: 20upx;
					width: 100%;
					height: 100%;
				}
			}
			
			video{
				width:100%;
			}
		}
	}

</style>
