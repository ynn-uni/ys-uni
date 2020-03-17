<template>
	<view class="nodata">
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
		}
</style>
