<template>
	<view class="waring">
		<!-- <view class="classify">
			<text>统计分类：</text>
			<text class="classify-item ci-active" @tap="handelType('year')">按年统计</text>
			<text class="classify-item" @tap="handelType('month')">按月统计</text>
		    <text class="classify-item" @tap="handelType('data')">按日统计</text>
		</view> -->
		<view class="choosedata">
			<!-- <text>选择时间：</text> -->
			<picker mode="date" :value="startDate" start="2015-09-01" end="2050-12-31" @change="startDateChange" fields="day">
				<view class="picker">
					<text class="cuIcon-calendar icon-time"></text>
					{{startDate}}
				</view>
			</picker>
			<view class="line">
				——
			</view>
			
			<picker mode="date" :value="endDate" :start="startDate" end="2050-12-31" @change="endDateChange" fields="day">
				<view class="picker">
					<text class="cuIcon-calendar icon-time"></text>
					{{endDate}}
				</view>
			</picker>
			<!-- <text @tap="handelDate">
				确定
			</text> -->
			
			<view class="cuIcon-close del" @tap="delDate">
				
			</view>
			
			
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in infoList" :key="index">
				<view class="title">
					<view class="text">
						设备预警
					</view>
					<view class="time">
						{{item.time}}
						
					</view>
				</view>
				<view class="dis">
					<!-- 设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知设备异常通知 -->
					{{item.contentl}}
				</view>
			</view>
			
			
		</view>
	
		<view class="bottom" >
			没有更多数据了
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				isNoData:true,
				page:1,
				size:10,
				startDate: '开始时间',
				endDate:'结束时间',
				classifyType:'date',
				start:'',
				startTime:'开始时间',
				endTime:'结束时间',
				infoList:[]
			}
		},
		onReachBottom() {
			console.log('refresh');
			this.page++
			this.getInfoList(this.page,this.size,'','');
		},
		mounted() {
			// var shshmyDate = new Date();
			// let year=shshmyDate.getFullYear()
			// let month=(shshmyDate.getMonth()+1);
			// month=month>10?month:'0'+month;
			// let date=shshmyDate.getDate();
			// date=date>10?date:'0'+date
			// this.startDate=year+'-'+month+'-'+date
			// this.endDate=this.startDate
			this.getInfoList(1,10);
		},
		methods: {
			delDate(){
				this.startDate=''
				this.endDate=''
			},
			handelDate(){
				console.log('提交日期',this.startDate,this.endDate)
			},
			toggleTab(item, index) {  
			        this.$refs.dateTime.show();  
					
			    }, 
			 onConfirm(e) {
			            console.log(e);
						this.startTime=e.selectRes;
						this.endTime=this.startTime;
			        },
			startDateChange(e) {
				this.startDate = e.detail.value
				this.endDate =e.detail.value
				console.log('选择开始时间')
				this.getInfoList(this.page,this.size,this.startDate,this.endDate);
			},
			endDateChange(e) {
				this.endDate = e.detail.value
				console.log('选择结束时间')
				this.getInfoList(this.page,this.size,this.startDate,this.endDate);
			},
			getInfoList(page,size,start,end){
				if(page>1){
					uni.showLoading()
				}
				var that=this;
				that.req.httpTokenRequest(
				{url:'/Api/Notice/getNoticeList',method:'GET'},
				{page:page,size:size,start:start,end:end}).then((res)=>{
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

<style scoped lang="scss">
	.waring{
		.classify{
			display: flex;
			.classify-item{
				display: block;
				background-color: #CCCCCC;
				color: #000000;
				width: 130upx;
				height: 40upx;
				line-height: 40upx;
				border-radius: 40upx;
				margin-left: 10upx;
				text-align: center;
			}
			.ci-active{
				background-color: #8799A3;
			}
		}
		.choosedata{
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 80upx;
			padding: 0 30upx;
			.line{
				color: #888;
			}
			.picker{
				// border-bottom: 1px solid #000;
				width: 240upx;
				line-height: 54upx;
				background-color: #fff;
				border:1px solid #e7e7e7;
				padding: 0px 5px;
				border-radius: 8upx;
				.icon-time{
					color: #888;
					margin-right: 10upx;
				}
			}
			.del{
				display: block;
				color: #888;
				text-align: center;
				width: 40upx;
				line-height: 40upx;
				border-radius: 50%;
				background-color: #e2e2e2;
			}
		}
		.content{
			display: flex;
			flex-direction: column;
			.item{
				background-color: #fff;
				box-shadow:0px 2px 4px 0px rgba(23,49,67,0.15);
				padding:40upx;
				.title{
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.text{
						font-size:32upx;
						font-weight:400;
						color:rgba(74,74,74,1);
						line-height:16upx;
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
					width:670upx;
					height:80upx;
					font-size:26upx;
					font-weight:400;
					color:rgba(178,178,178,1);
					line-height:40upx;
					text-align: justify;
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
