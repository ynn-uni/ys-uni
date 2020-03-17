<template>
	<view class="infodetail">
		<cu-custom :isBack="true" bgColor="bg-e" >
			<block slot="backText">返回</block>
			<block slot="content">产品详情</block>
		</cu-custom>
		<view class="img-box" :style="{width:imgwidth,height:imgheight}">
			<image class="img-content" :src="detailData.content"  @load="imageLoad" ></image>
		</view>
	</view>
</template>

<script>
	import {getProductDetails} from '@/apis'
	export default {
		data() {
			return {
				detailData:{},//详情信息
				imgwidth:'',//
				imgheight:'',
				id:''
			}
		},
		onLoad(option){
			var that=this;
			this.id=option.id;
			getProductDetails({id:that.id}).then((res)=>{
				that.detailData=res.data
			})
			
		},
		methods: {
			imageLoad(e) {
			    var $width = e.detail.width; //获取图片真实宽度
			    var $height = e.detail.height; //获取图片真实高度
			    this.imgwidth= $width+'rpx'
			    this.imgheight= $height+'rpx'
			  }
			 
		}
	}
</script>

<style lang="scss" scoped>
	.infodetail{
		min-height: 100vh;
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
