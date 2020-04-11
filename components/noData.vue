<template>
	<view class="nodata flex justify-center align-center" :class="[height?'he':'',mt?'mt':'']">
		{{text}}
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		props:{
			text:{
				type:String,
				default:'没有更多数据啦！'
				},
			height:{
				type:Boolean
			},
			mt:{
				type:Boolean
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.nodata{
		line-height: 36upx;
		text-align: center;
		font-size: 30upx;
		color: #a8aeb8;
		margin-bottom: 8upx;
		padding: 0 60upx;
		}
		.he{
			height: 690upx;
			margin-bottom: 0upx;
		}
		.mt{
			margin-top: 20upx;
		}
</style>
