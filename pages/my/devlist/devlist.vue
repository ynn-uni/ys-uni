<template>
	
	<view class="devlist">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">设备列表</block>
		</cu-custom>
		<view class="add">
			<button class="cu-btn round bg-red add-btn bg-linear" @tap="showModal">
				<text class="cuIcon-add"></text>
				添加设备
			</button>
			<!-- <button @tap="delDevice()">del</button> -->
			<view class="cu-modal model" :class="modalName=='DialogModal3'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end cu-height">
						<view class="content">输入设备绑定信息</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-gray"></text>
						</view>
					</view>
					<view class="form-box">
						<!-- <form @submit="" @reset=""> -->
						<form >
							<view class="form-input" :class="isEdit?'justify-between':'justify-center'">
								<view :class="!isEdit?'margin-bottom':''">
									<input v-model="devTitle" type="text" value="" placeholder="输入设备名称" cursor-spacing="20"/>
								</view>
								<view class="mac flex align-center ">
									<input v-model="devMac" type="text" value="" placeholder="输入设备MAC地址" cursor-spacing="20"/>
									<button class="cu-btn mybtn" @tap="handelGetMac">扫一扫</button>
								</view>
								<view class="" v-if="isEdit">
									<input v-model="devName" type="text" value="" placeholder="输入设备用户名" cursor-spacing="20" />
								</view>
								<view class=""  v-if="isEdit">
									<input v-model="devPwd" value="" placeholder="输入设备密码" cursor-spacing="20" />
									<!-- <input v-model="devPwd" type="password" value="" placeholder="输入设备密码" cursor-spacing="20" /> -->
								</view>
							</view>
							<view class="addbtn">
								<button class="cu-btn round sure bg-linear" @tap="doubleTap" @touchstart="touchStart" @touchend="touchEnd">{{isEdit?'保存':'提交'}}</button>
							</view>
						</form>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar" v-if="devList.length">
			<view class='text-gray flex alc justify-center text-sm margin-bottom-xs'>*左滑设备信息块,可编辑/删除设备信息</view>
			<view class="cu-item dl-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in devList" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" >
			
				<view class="info" @tap="devDetail(index)">
					<view class="num">
						{{index>10?index+1:'0'+(index+1)}}
					</view>
					<view class="line"></view>
					<view class="name">
						{{item.title}}
					</view>
					<text class="cuIcon-right"></text>
					
				</view>
				<view class="move">
					<view class="bg-gray">
						<view class="bg-red" @tap="delDevice(item)">删除</view>
					</view>
					<view class="bg-gray">
						<view class="bg-red bg-black" @tap="editDevice(item)">编辑</view>
					</view>
					
				</view>
			</view>
			
		</view>
		<modelre @deldev="delDev"  ref="adddev"></modelre>
	</view>
</template>

<script>
	import {setUserPhone,addDevice,delDevice,updateDevice} from '../../../apis/index.js'
	import modelre from '@/components/modelre.vue'
	import { mapGetters, mapActions, mapMutations ,mapState} from 'vuex';
	export default {
		data() {
			return {
				isEdit:false,
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				devlist:[],
				devTitle:'',
				devMac:'',
				devName:'',
				devPwd:'',
				delid:null,
				touchStartTime: 0, // 触摸开始时间
				touchEndTime: 0, // 触摸结束时间
				lastTapTime: 0 // 最后一次单击事件点击发生时间
			}
		},
		computed:{
			 ...mapGetters([ 'devList','devListMac','userInfo']),
			 ...mapState (['isAppHide']),
		},
		components:{
			modelre
		},
		onShow(){
			this.getDevList();
		},
		methods: {
		...mapMutations('user',['updateDevListMac']),
			...mapActions('user', [
			  'fatchDevListByToken'
			]),
			...mapMutations(['updateIsAppHide']),
			handelGetMac(){
				uni.scanCode({
						success:  (res)=> {
								console.log('条码类型：' + res.scanType);
								console.log('条码内容：' + res.result);
								this.devMac=res.result
						}
				});
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
			showModal() {
				this.modalName = 'DialogModal3'
				
			},
			hideModal(){
				this.modalName = null;
				this.isEdit=false
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
			    // 当前点击的时间
			    var currentTime = e.timeStamp;
			    var lastTapTime = vm.lastTapTime;
			    // 更新最后一次点击时间
			    vm.lastTapTime = currentTime;
			    // 如果两次点击时间在300毫秒内，则认为是双击事件
			    if (currentTime - lastTapTime > 300) {
			      // do something 点击事件具体执行那个业务
				  console.log("jjjj")
				  vm.makesure()
			    }
			  }
			},
			updateDevice(data){
				updateDevice(data).then((res)=>{
					console.log(res)
					this.fatchDevListByToken()
						// this.devlist.push(data)
						this.devTitle=null;
						this.devMac=null;
						this.devName=null;
						this.devPwd=null;
						this.modalName=null
						this.isEdit=false
				})
			},
			addDevice(data){
				addDevice(data).then((res)=>{
					if(res.msg==='添加设备数据成功'){
						this.fatchDevListByToken()
						// this.devlist.push(data)
						this.devTitle=null;
						this.devMac=null;
						this.devName=null;
						this.devPwd=null;
						this.modalName=null
						// this.$emit('haslogin')
					}
				})
			},
			makesure(){
				var that=this;
				if(this.isEdit){
						
						if(this.devTitle&&this.devMac&&this.devName&&this.devPwd){
							var data={
								title:this.devTitle,
								mac: this.devMac,
								username: this.devName,
								password:this.devPwd
							}
							this.updateDevice(data)
							}else{
								uni.showToast({
									title:'请输入完整的设备信息',
									icon:'none'
								})
							}
					}else{
						if(this.devTitle&&this.devMac){
							var data={
								title:this.devTitle,
								mac: this.devMac,
								username: this.devName,
								password:this.devPwd
							}
							this.addDevice(data)
						}else{
							uni.showToast({
								title:'请输入完整的设备信息',
								icon:'none'
							})
						}
					
				}
				
			},
			delDevice(item){
				var that=this;
				var id=parseInt(id);
				// 弹出是否删除
				this.$refs.adddev.showModalDel()
				// this.modalName = 'DialogModal2'
				this.delid=item;
				
			},
			editDevice(item){
				this.modalName = 'DialogModal3'
				this.isEdit=true
				console.log(item)
				this.devTitle=item.title
				this.devMac=item.mac
				this.devName=item.username
				this.devPwd=item.password
			},
			delDev(){
				
				delDevice({id:parseInt(this.delid.id)}).then((res)=>{
					this.fatchDevListByToken()
					this.updateIsAppHide(true)
					
				})
			},
			
			devDetail(index){
				this.updateIsAppHide(true)
				uni.reLaunch({
					url:'/pages/index/index'
				})
				this.updateDevListMac(this.devList[index].mac)
			},
			getDevList(){
				this.devlist=this.devList
			}
		}
	}
</script>

<style lang="scss" scoped>
	.devlist{
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
			.model{
				.cu-dialog{
					height: 480upx;
					background-color: #fff;
					.cu-height{
						height: 50upx;
					}
					.form-box{
						// height: 100%;
						// padding: 0;
						background-color: #fff;
						
							form{
								
								padding: 10upx 0;
								height: 100%;
								.form-input{
									height: 260upx;
									display: flex;
									flex-direction: column;
									align-items: center;
									input{
										width: 518upx;
										height: 58upx;
										border: 1px solid #d2d3d6;
										color: #808080;
										font-size: 26upx;
										text-align: left;
										padding-left: 20upx;
										
									}
									.mac{
										.mybtn{
											padding: 0;
											width: 140rpx;
											margin-left: 10rpx;
										}
										input{
											width: 368upx;
											height: 58upx;
											border: 1px solid #d2d3d6;
											color: #808080;
											font-size: 26upx;
											text-align: left;
											padding-left: 20upx;
										}
									}
								}
								.addbtn{
									display: flex;
									justify-content: center;
									margin-top: 28upx;
									.sure{
										color: #fff;
										}
								}
							}
					}	
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
				margin-bottom: 26upx;
				// margin-left: 2upx;
				.info{
					display: flex;
					align-items: center;
					.num{
						font-size:40upx;
						font-weight:bold;
						color:rgba(84,84,84,1);
						line-height:59upx;
						margin-right: 20upx;
					}
					.line{
						width:2upx;
						height:70upx;
						background:rgba(216,216,216,1);
						margin-right: 33upx;
					}
					.name{
						font-size:32upx;
						font-weight:500;
						color:rgba(84,84,84,1);
						line-height:45upx;
						// margin-right: 166upx;
						width: 458upx;
					}
					text{
						display: block;
						margin-right: 30upx;
						color:rgba(168,174,184,1);
					}
				}
				.move{
					.null{
						width: 2px;
					}
					.bg-red{
						border-radius:10upx;
						margin-left: 1upx;
						height: 100%;
					}
					
				}
			}
		}
	}
</style>
