<template>
	<view class="info">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">消息中心</block>
		</cu-custom>
		<!-- <view class="notice" >
			<view class="notice-item" @tap="handelAllInfoStatu">
				<view class="cuIcon-notice">
					
				</view>
				所有消息标为已读
			</view>
			<view class="notice-item" @tap="handelAllDel">
				<view class="cuIcon-delete">
					
				</view>
				删除所有消息
			</view>
			
		</view> -->
		<!-- <view class="info-item" v-for="(item,index) in infoList" :key="index">
			<view class="info-time">
				2019年12月04日
				{{item.datetime}}
				
			</view>
			<view class="contentl">
				<view class="item">
					<view class="title">
						<view class="text">
							设备异常通知
							<view class="circle">
								
							</view>
						</view>
						<view class="time">
							10:09:20
							{{item.time}}
						</view>
					</view>
					<view class="dis">
						设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知
						{{item.contentl}}
					</view>
				</view>
				
				
			</view>
		</view> -->
		<!-- <view class="info-item" @longtap="handelInfoStatu()">
			<view class="info-time">
				2019年12月04日
				
			</view>
			<view class="contentl">
				<view class="item">
					<view class="title">
						<view class="text">
							设备异常通知
							<view class="circle">
								
							</view>
						</view>
						<view class="time">
							2019-12-04 10:09:20
							
						</view>
					</view>
					<view class="dis">
						设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知
						
					</view>
				</view>
				
			</view>
		</view> -->
	<!-- 	<view class="info-item " >
			<view class="info-time">
				2019年12月04日
				
			</view>
			<view class="contentl">
				<view class="item">
					<view class="title">
						<view class="text">
							设备异常通知
							<view class="circle">
								
							</view>
						</view>
						<view class="time">
							2019-12-04 10:09:20
							
						</view>
					</view>
					<view class="dis">
						设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知
						
					</view>
				</view>
				
			</view>
			
		</view> -->
		<!-- <checkbox-group name="" @change="changeCheck"> -->
		<view class="cu-list menu-avatar">
			
				
				
			
			<view class="cu-item"  v-for="(item,index) in infoList" :key="index" :class="modalName=='move-box-'+ index?'move-cur':''"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
			 
			 <checkbox  class="ckbox" style="transform:scale(0.7)" :checked="isChecked[index]" @tap="changeCheck(index)"/>
				<view class="info-item " >
					<!-- <view class="info-time">
						2019年12月04日
						
					</view> -->
					<!-- <view class="contentl"> -->
						<view class="iteml">
							 
							
							 	<view class="title">
							 		<view class="text">
							 			设备异常通知
							 			<view class="circle" v-if="item.status==1">
							 				
							 			</view>
							 		</view>
							 		<view class="time">
							 			<!-- 2019-12-04 10:09:20 -->
							 			{{item.time}}
							 		</view>
							 	</view>
							 	<view class="dis">
							 		{{item.contentl}}
							 		
							 	</view>
							 
						</view>
						
					<!-- </view> -->
					
				</view>
				<!-- <view class="move">
					<view class="bg-grey" @tap="handelInfoStatu(item.id)">标为已读</view>
					<view class="bg-red" @tap="handelDel(item.id)">删除</view>
				</view> -->
			</view>
			
			
		</view>
		<!-- </checkbox-group> -->
		<view class="checkInfo" v-if="!isNoData">
			<view class="check">
				<checkbox style="transform:scale(0.7)" :checked="isAllChecked" @tap="handelAllCheck"/>全选
			</view>
			
			<view class="right">
				<view class="readed" @tap="handelAllInfoStatu">
					标为已读
				</view>
				<!-- <view class="del" @tap="handelAllDel">
					删除
				</view> -->
			</view>
		</view>
		
		
		
		<view class="bottom" v-if="isNoData">
			暂无更多消息
		</view>
		<modelre v-on:ListenChild="ShowChild" :modalname="modalName"></modelre>
	
	</view>
</template>

<script>
	import modelre from '@/components/modelre.vue'
	export default {
		data() {
			return {
				listTouchStart: 0,
				listTouchDirection: null,
				modalName: null,
				isNoData:true,
				page:1,
				size:10,
				haveInfo:false,
				infoList:[],
				isChecked:[],
				isAllChecked:false
			}
		},
		components:{
			modelre
		},
		mounted(){
			if(!this.infoList.length){
				this.haveInfo=true;
			}
			
			this.getInfoList(this.page,this.size);
		},
		onReachBottom() {
			console.log('refresh');
			// this.page++
			// this.getInfoList(this.page,this.size);
			 
		 
		    
		},
		methods: {
			handelAllCheck(){
				this.isAllChecked=!this.isAllChecked
				
					this.isChecked.forEach((val,i)=>{
						if(this.isAllChecked){
							this.isChecked[i]=true;
						}else{
							this.isChecked[i]=false;
						}
						
					})
				
			},
			changeCheck(index){
				console.log(index)
				this.isChecked[index]=!this.isChecked[index]
				this.isAllChecked=this.isChecked.every((val)=>{
					return val==true;
				})
				// if(e.detail.value.length==this.isChecked.length){
				// 	this.isAllChecked=true
				// }else{
				// 	this.isAllChecked=false
				// }
				
				// if(val.length){
				// 	for(var i in val){
				// 		for(var j in this.isChecked){
				// 			if(j==val[i]){
				// 				this.isChecked[j]=true
				// 			}else{
				// 				this.isChecked[j]=false
				// 			}
				// 		}
						
				// 	}
				// }else{
				// 	for(var j in this.isChecked){
						
				// 			this.isChecked[j]=false
						
				// 	}
				// }
				
				console.log(this.isAllChecked)
				// this.isChecked[index]=!this.isChecked[index]
				// var isAll=this.isAll()
				// console.log(isAll)
				// if(isAll){
				// 	this.isAllChecked=true;
					
				// }
				// else{
				
				// }
			},
			
			// handelAllDel(){
			// 	console.log("gggg")
			// 	this.modalName='DialogModal7'
			// },
			// handelDel(){
			// 	this.modalName='DialogModal8'
			// },
			handelInfoStatu(){
				
				this.modalName='DialogModal6'
			},
			handelAllInfoStatu(){
				
				this.modalName='DialogModal5'
			},
			ShowChild: function (data) {
				var that=this;
				console.log(data)
				console.log(this.isChecked)
				var idlist='';
				for(var i in this.isChecked){
					if(this.isChecked[i]){
						idlist+=this.infoList[i].id+','
					}
				}
				console.log(idlist)
				if(data=='确定标记所有'){
					that.req.httpTokenRequest(
					{url:'/Api/Notice/setNoticeRead',method:'GET'},
					{ids:idlist}).then((res)=>{
						console.log(res)
						for(var i in that.isChecked){
							if(that.isChecked[i]){
								that.infoList[i].status=0
							}
						}
					})
				}else if(data=='确定标记该信息'){
					
				}else if(data=='确定删除所有'){
					
				}else if(data=='确定删除该信息'){
					
				}
			     this.modalName =null
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			getInfoList(page,size){
				if(page>1){
					uni.showLoading()
				}
				var that=this;
				that.req.httpTokenRequest(
				{url:'/Api/Notice/getNoticeList',method:'GET'},
				{page:page,size:size}).then((res)=>{
					console.log(res)
					var data=res.data.data.data
					if(data&&data.length>0){
						var newData=[];
						// console.log(data)
						for(var i in data){
							// var date='';
							// date=data[i].time.split(' ')[0];
							// var time=data[i].time.split(' ')[1];
							// var arr=date.split('-');
							// var datetime=arr[0]+'年'+arr[1]+'月'+arr[2]+'日'
							//status=1未读
							newData[i]={contentl:data[i].content,time:data[i].time,status:data[i].status,id:data[i].id},
							that.isChecked[i]=false
						}
						
						console.log(newData)
						if(page>1){
							that.infoList=that.infoList.concat(newData)
							
						}else if(page==1){
							that.infoList.splice(0);
							that.infoList=newData
						}
						console.log(that.infoList)
						that.isNoData=false
					}else{
						that.isNoData=true
					}
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info{
		padding-bottom: 89upx;
		.notice{
			padding: 8upx 20upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #b2b2b2;
			width: 100%;
			.notice-item{
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.cu-item{
			display: flex;
			// flex-direction: column;
			width:100%;
			// margin-bottom: 20upx;
			// margin-top: 20upx;
			height: 215upx;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			padding:0 10upx 0 5upx;
			margin-bottom: 10upx;
			// .title{
			// 	display: flex;
			// 	width: 100%;
			// 	justify-content: space-between;
			// }
			.info-item{
				height: 100%;
				width: 100%;
				
				// .info-time{
				// 	font-size:26upx;
				// 	font-weight:400;
				// 	color:rgba(178,178,178,1);
				// 	line-height:60upx;
				// 	padding-left: 34upx;
				// }
				// .contentl{
					// display: flex;
					// flex-direction: column;
					.iteml{
						width:100%;
						height: 100%;
						background-color: #fff;
						// box-shadow:0px 2px 4px 0px rgba(23,49,67,0.15);
						padding-left:20upx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						// align-items: center;
						
						// .ckbox {
						// 	width: 30upx;
						// 	height: 30upx;
						// }
						
							.title{
								display: flex;
								justify-content: space-between;
								align-items: center;
								
								.text{
									font-size:32upx;
									font-weight:400;
									color:rgba(74,74,74,1);
									line-height:16upx;
									position: relative;
									.circle{
										width: 10upx;
										height: 10upx;
										border-radius: 50%;
										background-color: #EA5242;
										position: absolute;
										top: -15upx;
										right: -20upx;
									}
								}
								.time{
									font-size:24upx;
									font-weight:400;
									color:rgba(178,178,178,1);
									line-height:40upx;
								}
							}
						
						
						.dis{
							margin-top: 16upx;
							// width:670upx;
							// height:80upx;
							font-size:26upx;
							font-weight:400;
							color:rgba(178,178,178,1);
							line-height:40upx;
							text-align: justify;
						}
					}
				// }
			}
			.move{
				height: 215upx;
			}
		}
		.checkInfo{
			position: fixed;
			bottom: 0;
			width:100%;
			height: 100upx;
			border-top: 1px solid rgba(234,234,234,1);
			background-color: #fff;
			display: flex;
			padding: 0 0 0 20upx;
			justify-content: space-between;
			align-items: center;
			background-color:#fff;
			.check{
				display: flex;
				align-items: center;
			}
			.right{
				display: flex;
				.readed,.del{
					width: 160upx;
					line-height: 100upx;
					font-size: 28upx;
					text-align: center;
					border-left:1px solid rgba(234,234,234,1);
				}
				// .readed{
				// 	background-color: green;
				// }
				// .del{
				// 	background-color: #ea302f;
				// }
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
