<template>
	<view class="imformation">
		<cu-custom bgColor="bg-e">
		  <block slot="content">
			  <view class="text">
			  	产品列表
			  </view>
			</block>
		</cu-custom>
		<view class="classifi">
			<view class="text" @tap="handelAll">
				全部
			</view>
			<view class="sel">
				<xfl-select
				:list="list.name"
				:clearable="false"
				:isCanInput="false" 
				:isAll="isAll"
				:placeholder = "placeholder"
				@change="change"
				v-on:isAll="notAll"
				>
				</xfl-select>
			</view>
			<view class="sel">
				<xfl-select
				:list="list1.name"
				:clearable="false"
				:isCanInput="false"
				:isAll="isAll"
				:placeholder = "placeholder"
				:initValue="nnn"
				@change="change"
				v-on:isAll="notAll"
				>
				</xfl-select>
			</view>
		</view>
		<view class="card-list">
			<view class="cu-card article no-card card-item" v-for="(item,index) in productList" :key="index" 
			 @tap="doubleTap" :data-proid="item.id" @touchstart="touchStart" @touchend="touchEnd">
				<view class="cu-item shadow">	
					<view class="content">
						<image :src="item.cover"></image>
						<view class="desc">
							<view class="text-title">
								{{item.title}}
							</view>
							<view class="text-contents">{{item.brief}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<noData v-if="isNoData"></noData>
	</view>
</template>

<script>
  import noData from '@/components/noData.vue'
  import {getProductCategoryList,getProductList} from '@/apis'
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	export default {
		components:{
			 xflSelect,
			 noData
		},
		data() {
			return {
				
				touchStartTime: 0, // 触摸开始时间
				touchEndTime: 0, // 触摸结束时间
				lastTapTime: 0 ,// 最后一次单击事件点击发生时间
				isAll:'',
				placeholder:'请选择',
				isNoData:false,
				pid:'',//分类id
				page:1,
				size:10,
				// 下拉框数据
				list: {name:[],id:[]},
				list1:{name:[],id:[]},
				check1:'',
				check2:'',
				cardCur: 0,
				productList: []//产品列表
				
			}
			
		},
		onLoad(){
			this.init();
			
		},
		onPullDownRefresh() {
			   setTimeout(function(){
			   	 uni.stopPullDownRefresh()
			   },2000)
			   this.init()
			   
		  },
		 onReachBottom() {//触底事件
			 this.page++
			 if(this.pid){
				  this.all(this.page,this.size,this.pid);
			 }else{
				  this.all(this.page,this.size,'');
			 }
		 
		    
		},
		methods: {
			init(){
				var that=this;
				getProductCategoryList({pid:0}).then((res)=>{
					var data=res.data
					for(var i in data){
						that.list.name.unshift(data[i].name)
						that.list.id.unshift(data[i].id)
					}
				})
				this.pid=this.$store.state.pid;
				this.all(this.page,this.size,this.pid);
			},
			change({newVal, oldVal, index, orignItem}){//分类
				if(newVal!='请选择'&&this.list.name[index]===newVal){
					this.list1.name.splice(0)
					var that=this;
					getProductCategoryList({pid:this.list.id[index],}).then((res)=>{
					var data=res.data
					for(var i in res.data){
							that.list1.name.push(res.data[i].name)
							that.list1.id.push(res.data[i].id)
						}
				})
				}else{
					this.page=1
					this.pid=parseInt(this.list1.id[index])
					this.$store.state.pid=this.pid;
					this.all(this.page,this.size,this.pid);
				}
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			touchStart(e) {
				
			  this.touchStartTime = e.timeStamp;
			},
			touchEnd(e) {
				
			  this.touchEndTime = e.timeStamp;
			},
			doubleTap(e) {
			  var vm = this;
			  // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
			  if (vm.touchEndTime - vm.touchStartTime < 350) {
			   
				var id=e.currentTarget.dataset.proid
			    var currentTime = e.timeStamp;
			    var lastTapTime = vm.lastTapTime;
			    // 更新最后一次点击时间
			    vm.lastTapTime = currentTime;
			    // 如果两次点击时间在300毫秒内，则认为是双击事件
			    if (currentTime - lastTapTime > 350) {
			      // do something 点击事件具体执行那个业务
				 
				  vm.handelDetail(id)
			    }
			  }
			},
			handelDetail(id){
				uni.navigateTo({
				    url: '/pages/information/product/product?id='+id
				});
			},
			handelProduct(id){
				uni.navigateTo({
				    url: '/pages/information/infodetail/infodetail?id='+id
				});
			},
			all(page,size,pid){//获取产品列表
				if(page>1){
					uni.showLoading()
				}
				var obj={}
				if(page==1){
					this.productList.splice(0)
				}
				if(pid){
					obj={page,size,type:pid}
				}else{
					this.page=page;
					this.pid='';
					obj={page,size}
				}
				var that=this;
				getProductList(obj).then((res)=>{
					var data=res.data.data
						if(data.length>0){
							that.productList=that.productList.concat(data)
						}else{
							that.isNoData=true
						}
						setTimeout(()=>{
							uni.hideLoading()
						},500)
						
				})
			},
			handelAll(){//点击全部触发
				this.isAll='all'//设置isAll值为all,清空选择框内显示值
				this.list1.name.splice(0)
				this.all(1,10,'')
			},
			notAll(){//配合xfl-select子组件设置isAll数值
				this.isAll='notAll'//设置isAll值为notall,正常显示选择内容
			}
		
		}
	}
</script>

<style scoped lang="scss">
		
	.imformation{
		// background-color: rgba(245,245,245,1);
		min-height: 100vh;
		overflow: auto;
		.card-list{
			display: flex;
			flex-direction: column;
			// position: relative;
			// top: -30upx;
			padding: 0 8upx;
			// margin-top: 30upx;
			.card-item{
				border-radius: 6upx;
				padding: 20upx;
				background-color: #fff;
				margin-bottom: 25upx;
				box-shadow:0px 2px 4px 0px rgba(0,0,0,0.12);
				.content{
					image{
						width:240upx;
						height:211upx;
					}
					.desc{
						width: 425upx;
						display: block;
						// justify-content: space-between;
						.text-title{
							margin-top: 10upx;
							font-size:32upx;
							font-weight:400;
							color:rgba(67,67,67,1);
							line-height:32upx;
							overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
						.text-contents{
							margin-top: 14upx;
							font-size:26upx;
							font-weight:400;
							color:rgba(67,67,67,1);
							line-height:40upx;
							// height: 96upx;
							text-align: justify;
							overflow : hidden;
						    text-overflow: ellipsis;
						    display: -webkit-box;
						    -webkit-line-clamp: 4;
						    -webkit-box-orient: vertical;
						}
						.user-info{
							display: flex;
							align-items: center;
							image{
								width:50upx;
								height:50upx;
							}
							.text{
								display: flex;
								justify-content: space-between;
								width: 380upx;
								margin-left: 20upx;
								text{
									font-size:22upx;
									font-weight:400;
									color:rgba(155,155,155,1);
									line-height:25upx;
								}
							}
							
						}
					}
					
				}

			}
		}
		.classifi{
			display: flex;
			width: 100%;
			padding: 0 30upx;
			justify-content: space-between;
			align-items: center;
			height: 119upx;
			.text{
				font-size:30upx;
				font-weight:500;
				color:rgba(168,174,184,1);
				line-height:12upx;
				margin-top: 16upx;
			}
			.sel{
				width:300upx;
				height:62upx;
				border-radius:22px;
				border:0px solid rgba(19,41,54,1);
				font-size:24upx;
				line-height:28upx;
				
			}
		}
		
	}
	
	.cu-card.article>.cu-item {
		padding-bottom: 0upx;
		.content {
			display: flex;
			padding: 0 0rpx;
		}
		
	}
	
</style>
