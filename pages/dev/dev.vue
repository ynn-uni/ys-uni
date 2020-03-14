<template>
	<view class="dev bg-height">
		<cu-custom  >
			<block slot="content">永生仪器</block>
		</cu-custom>
		<view class="content">
			<showDevData :data="tData" v-if="TabCur===0"></showDevData>
			<showDevData :data="hData" v-if="TabCur===1"></showDevData>
			<scroll-view scroll-x class="bg-white nav margin-tb">
				<view class="flex text-center tablist">
					<view class="cu-item flex-sub" :class="index==TabCur?'activeTab':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
						<view :class="'iconfont '+item.icon"></view>
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<button class="cu-btn changedev text-center">
			永生仪器BH20190001
		</button>
		
	</view>
</template>

<script>
	import showDevData  from './components/showDevData.vue'
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabIndex:0,
				tabList:[
					{
						name:"温度",
						icon:"iconwendukongzhi"
					},
					{
						name:"湿度",
						icon:"iconshidukongzhi"
					},
					{
						name:"预警",
						icon:"iconyujing"
					},
					{
						name:"数据",
						icon:"iconshuju"
					}
					
				],
				tData: {
					out:40,
					real:0.29,
					set:60,
					realname:'实时温度',
					setname:'设定温度'
				},
				hData: {
					out:30,
					real:0.59,
					set:50,
					realname:'实时湿度',
					setname:'设定湿度'
				}
			};
		},
		components: {
			showDevData
		},
		methods: {
			tabSelect(e) {
				console.log(e)
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dev{
		min-height: 100vh;
		background-color: #fff;
		.tablist{
			padding: 30upx 20upx;
			.cu-item{
				// margin: 10upx 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				line-height: 70upx;
				width: 100upx;
				height: 200upx;
				box-shadow:0px 0px 20upx 0px rgba(120,134,238,0.22);
				border-radius: 15upx;
				view{
					font-size: 60upx;
					color: $primaryColor;
				}
				
			}
			.activeTab{
				color: #FFFFFF;
				background:linear-gradient(135deg,#7285ED 0%,#B791F7 100%);
				view{
					color: #FFFFFF;
				}
			}
		}
		.changedev{
			display: block;
			margin: 0 auto;
			width:690upx;
			height:80upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 20upx 0px rgba(120,134,238,0.22);
			border-radius:14upx;
			font-size:30upx;
			color:rgba(51,51,51,1);
			line-height:70upx;
			letter-spacing:2upx;
		}
		
	}
</style>
