<template>
	<view class="infodetail">
		<!-- <view class="info-detail">
			
		
		<view class="title">
			{{detailData.title}}
		</view>
		
		<image class="cover" :src="detailData.cover" mode=""></image>
		<view class="content">
			{{detailData.brief}}
		</view>
		</view> -->
		<!-- <image src='' bindload="imageLoad" ></image> -->
		
		<view class="img-box" :style="{width:imgwidth,height:imgheight}">
			<image class="img-content" :src="detailData.content"  @load="imageLoad" ></image>
		</view>
		<!-- <view class="feature">
			<view class="fe-title">
				<view class="fe-line"></view>
				<text>产品特点</text>
				<view class="fe-line"></view>
			</view>
			<view class="icon-list">
				<view class="icon-item">
					<image src="../../st../../../static/images/fe2.png" mode=""></image>
					<text>产品特点1</text>
				</view>
				<view class="icon-item">
					<image src="../../st../../../static/images/fe2.png" mode=""></image>
					<text>产品特点2</text>
				</view>
				<view class="icon-item">
					<image src="../../st../../../static/images/fe3.png" mode=""></image>
					<text>产品特点3</text>
				</view>
				<view class="icon-item">
					<image src="../../st../../../static/images/fe4.png" mode=""></image>
					<text>产品特点4</text>
				</view>
			</view>
			<view class="fe-title">
				<view class="fe-line"></view>
				<text>联系我们</text>
				<view class="fe-line"></view>
			</view>
			<image class="connect" src="../../../static/images/product2.png" mode=""></image>
			<view class="tel">
				<image src="../../../static/images/tel01.png" mode=""></image>
				<text>400-457-8754</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	// import req from '@/request/request.js'
	export default {
		data() {
			return {
				detailData:{},//详情信息
				imgwidth:'',//
				imgheight:'',
				id:''
			}
		},
		// imageLoad: function(e) {
		//     var $width = e.detail.width; //获取图片真实宽度
		//     var $height = e.detail.height; //获取图片真实高度
		// 	console.log($height)
		   
		//   },
		
		
		onLoad(option){
			var that=this;
			console.log(option.id)
			this.id=option.id;
			that.req.httpRequest(
			{
				url:'/Api/Product/getProductDetails',
				method:'GET'
			},
			{
				id:that.id
			}).then((res)=>{
				console.log(res)
				that.detailData=res.data.data
			})
		},
		methods: {
			imageLoad(e) {
			    var $width = e.detail.width; //获取图片真实宽度
			    var $height = e.detail.height; //获取图片真实高度
			    this.imgwidth= $width+'rpx'
			    this.imgheight= $height+'rpx'
			   console.log(this.imgwidth,this.imgheight)
			  }
			 
		}
	}
</script>

<style lang="scss" scoped>
	.infodetail{
		background: #fff;
		.info-detail{
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
			.cover{
				// margin-top: 40upx;
				width:690upx;
				height:396upx;
			}
			
			.content{
				// margin-top: 20upx;
				width:690upx;
				text-align: justify;
				font-size:28upx;
				font-weight:400;
				color:rgba(67,67,67,1);
				line-height:54upx;
			}
		}
		.img-box{
			.img-content{
				// margin-top: 20upx;
				width: 100%;
				height: 100%;
			}
		}
		
		// .feature{
		// 	display: flex;
		// 	flex-direction: column;
		// 	align-items: center;
		// 	width: 100%;
		// 	.fe-title{
		// 		display: flex;
		// 		align-items: center;
		// 		margin-top: 40upx;
		// 		.fe-line{
		// 			margin: 0 4upx;
		// 			width: 30upx;
		// 			border-top: 2px solid rgba(67,67,67,1);
		// 		}
		// 		text{
		// 			font-size:28upx;
		// 			font-weight:500;
		// 			color:rgba(67,67,67,1);
		// 			line-height:30upx;
		// 		}
		// 	}
		// 	.icon-list{
		// 		display: flex;
		// 		align-items: center;
		// 		justify-content: space-between;
		// 		width: 100%;
		// 		padding: 0 30upx;
		// 		.icon-item{
		// 			display: flex;
		// 			flex-direction: column;
		// 			align-items: center;
		// 			image{
		// 				width:87upx;
		// 				height:87upx;
		// 			}
		// 			text{
		// 				margin-top: 20upx;
		// 				font-size:18upx;
		// 				font-weight:500;
		// 				color:rgba(255,65,0,1);
		// 				line-height:25upx;
		// 			}
		// 		}
		// 	}
		// 	.connect{
		// 		width:336upx;
		// 		height:306upx;
		// 	}
		// 	.tel{
		// 		display: flex;
		// 		align-items: center;
		// 		width:501upx;
		// 		height:80upx;
		// 		background:linear-gradient(134deg,rgba(252,207,191,1) 0%,rgba(231,52,31,1) 51%,rgba(233,3,14,1) 100%);
		// 		margin-top: 70upx;
		// 		margin-bottom: 64upx;
		// 		image{
		// 			width: 60upx;
		// 			height: 60upx;
		// 			vertical-align: top;
		// 			margin-top: 0;
		// 			margin-left: 80upx;
		// 			margin-right: 30upx;
		// 		}
		// 		text{
		// 			font-size:28upx;
		// 			font-weight:500;
		// 			color:rgba(255,255,255,1);
		// 			line-height:40upx;
		// 			letter-spacing:2upx;
		// 		}
		// 	}
		// }
	}
</style>
