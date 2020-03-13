<template>
	
	<view class="repair">
	<view class="add">
		<button class="cu-btn round bg-red add-btn" @tap="handelRepair">
			<image class="addicon" src="../../../static/images/add.png" mode=""></image>
			添加报修
		</button>
		<!-- <button @tap="delDevice()">del</button> -->
		
	</view>
		<view class=" menu-avatar cu-list">
			
			<view class=" dl-item" v-for="(item,index) in repairList" :key='index' @tap="handelDetail(item)">
			
				<view class="info" >
					<!-- <view class="num">
						{{index>10?index+1:'0'+(index+1)}}
					</view>
					<view class="line"></view> -->
					<view class="dis">
						<!-- {{item.name}} -->
						<view class="inf">
							<view class="name">
								{{item.name}}
							</view>
							<view class="tel">
								{{item.time}}
							</view>
						</view>
						
						<view class="contentl">
							{{item.content}}
						</view>
					</view>
					<text class="cuIcon-right"></text>
					
				</view>
				
			</view>
			
		</view>
		
		<view class="bottom" v-if="isNoData">
			暂无更多数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				size:10,
				isNoData:false,
				repairList:[]
			}
		},
		onShow() {
			this.getRepairList(this.page,this.size)
		},
		methods: {
			getRepairList(page,size){
				var that=this;
				that.req.httpTokenRequest(
				{url:'/Api/Repair/getRepairList',method:'GET'},
				{page:page,size:size}).then((res)=>{
					
					that.repairList=res.data.data.data;
					console.log(that.repairList)
				})
			},
			handelDetail(data){
				uni.navigateTo({
					url:'/pages/my/Repair/repairDetail/repairDetail?data='+JSON.stringify(data)
				})
			},
			handelRepair(){
				uni.navigateTo({
					url:'/pages/my/Repair/postRepair/postRepair'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.repair{
		.add{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 104upx;
			width:100%;
			padding: 0 34upx;
			.add-btn{
				display: flex;
				justify-content: space-between;
				width:190upx;
				background:linear-gradient(137deg,rgba(234,93,67,1) 0%,rgba(231,67,53,1) 100%);
				border-radius:33upx;
				font-size:26upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:62upx;
				.addicon{
					width: 23upx;
					height: 28upx;
				}
			}
			
		}
		.cu-list{
			margin: 0 34upx;
			overflow: hidden;
			
			.dl-item{
				background:rgba(255,255,255,1);
				box-shadow:0px 2upx 4upx 0px rgba(236,236,236,0.5);
				border-radius:20upx;
				border:1px solid rgba(234,234,234,1);
				height: 140upx;
				margin-bottom: 26upx;
				
				// margin-left: 2upx;
				.info{
					height: 140upx;
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
						height:78upx;
						background:rgba(216,216,216,1);
						margin-right: 33upx;
					}
					.dis{
						// font-size:32upx;
						margin-left: 20upx;
						font-weight:500;
						color:rgba(84,84,84,1);
						// height:80upx;
						// margin-right: 166upx;
						width: 565upx;
						.inf{
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
						.contentl{
							margin-top: 8upx;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
						}
					}
					text{
						display: block;
						margin-left: 35upx;
						margin-right: 10upx;
						color:rgba(168,174,184,1);
					}
				}
				
			}
		}
	
		.bottom{
			margin-top: 10upx;
			text-align: center;
			font-size: 28upx;
			color: #a8aeb8;
			
		}
	}
</style>
