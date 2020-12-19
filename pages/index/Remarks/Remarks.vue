<template>
	<view class="remarks">
		<cu-custom :isBack="true" bgColor="bg-e" >
			<block slot="backText">返回</block>
			<block slot="content">设备日志</block>
		</cu-custom>
		<view class="remark-item" v-for="(item,index) in signData" :key='index'>
			<view class="title">
				日志{{index+1}}
			</view>
			<view class="dis" v-text="item">
				<!-- {{item}} -->
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {getDeviceSign} from '@/apis'
	export default {
		data() {
			return {
				signData:[]
			}
		},
		computed: {
     ...mapGetters(['devListMac']),
    },
		onShow() {
			this.getData()
		},
		methods: {
			getData(){
				var mac=this.devListMac
				getDeviceSign({mac}).then((res)=>{
					var data=res.data
						for(var i in data){
							if(data[i]){
								this.signData.push(data[i])
							}
						}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.remarks{
		min-height: 100vh;
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
