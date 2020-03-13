<template>
	<view class="set">
		<view class="cu-form-group"  @tap="doubleTap" @touchstart="touchStart" @touchend="touchEnd" >
			<view class="cu-left">
				<view class="title">个人中心</view>
			</view>
			<view class="cu-right">
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">接收短信通知</view>
			<view class="switch" >
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				<view class="switch-box" v-if="haveTel" @tap="handelSwitch('tel')"></view>
			</view>
			
		</view>
		<view class="cu-form-group">
			<view class="title">接收邮箱通知</view>
			<view class="switch" >
				<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB" />
				<view class="switch-box" v-if="haveEmail" @tap="handelSwitch('email')"></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				telstatus:0,
				emailstatus:0,
				haveTel:true,
				haveEmail:true,
				switchA: false,
				switchB: false,
				touchStartTime: 0, // 触摸开始时间
				touchEndTime: 0, // 触摸结束时间
				lastTapTime: 0 // 最后一次单击事件点击发生时间
			}
		},
		onShow() {
			// let tel=this.$store.state.tel;
			// if(tel){
			// 	this.switchA=true;
			// }
			let that=this;
			let tel=this.$store.state.tel;
			let email=this.$store.state.email;
			console.log(tel,email)
			if(tel){
				this.haveTel=false;
			}
			if(email){
				this.haveEmail=false;
			}
			//获取并设置用户状态信息
			this.req.httpTokenRequest({
				url:'/Api/User/getUserReceives',
				method:'GET'
			}).then((res)=>{
				console.log(res.data.data)
				that.telstatus=res.data.data.s1
				that.emailstatus=res.data.data.s2
				that.switchA=res.data.data.s1==1?true:false;
				that.switchB=res.data.data.s2==1?true:false;
				
			})
		},
		methods: {
			handelSwitch(str){
				if(str=='tel'){
					uni.showToast({
						title:'请绑定手机号',
						icon:'none'
					})
				}else if(str=='email'){
					uni.showToast({
						title:'请绑定邮箱',
						icon:'none'
					})
				}
			},
			SwitchA(e) {
				let that=this;
				let status=e.detail.value?1:0;
				that.telstatus=status;
				let tel=this.$store.state.tel;
				console.log(status,tel)
				if(tel){
					
					
					this.req.httpTokenRequest({
						url:'/Api/User/setUserReceives',
						method:'GET'
					},{
						s1:that.telstatus,
						s2:that.emailstatus
					}
					).then((res)=>{
						console.log(res)
						
							
						that.switchA = e.detail.value
					})
					
					
				}
				
			},
			SwitchB(e) {
				
				let that=this;
				let status=e.detail.value?1:0;
				that.emailstatus=status
				let email=this.$store.state.email;
				console.log(status,email)
				if(email){
					
					that.req.httpTokenRequest({
						url:'/Api/User/setUserReceives',
						method:'GET'
					},{
						s1:that.telstatus,
						s2:that.emailstatus
					}
					).then((res)=>{
						console.log(res)
						this.switchB = e.detail.value
					})
					
				}
				
			},
			touchStart(e) {
				console.log(e.timeStamp)
				
			  this.touchStartTime = e.timeStamp;
			},
			touchEnd(e) {
				console.log(e.timeStamp)
				
			  this.touchEndTime = e.timeStamp;
			},
			doubleTap(e) {
			  var vm = this;
			  // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
			  if (vm.touchEndTime - vm.touchStartTime < 350) {
			    // 当前点击的时间
				console.log(e)
				var path=e.currentTarget.dataset.path
			    var currentTime = e.timeStamp;
			    var lastTapTime = vm.lastTapTime;
			    // 更新最后一次点击时间
			    vm.lastTapTime = currentTime;
			    // 如果两次点击时间在300毫秒内，则认为是双击事件
			    if (currentTime - lastTapTime > 300) {
			      // do something 点击事件具体执行那个业务
			      this.handelUserInfo()
			      
			    }
			  }
			 
			},
			handelUserInfo(){
				console.log("click")
				uni.navigateTo({
					url:'/pages/my/set/userInfo/userInfo'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.set{
		color: #979797;
		.cu-form-group{
			border-top: 1px solid #E9E9E9;
			.cu-left{
				
				
				text{
					width: 60upx;
					height: 65upx;
					// margin-left: 20upx;
					
					font-size: 60upx;
				}
				.title{
					// margin-left: 37upx;
					font-size:30upx;
					font-weight:500;
					
				}
			}
			.cu-right{
				text{
					font-size: 30upx;
					font-weight: normal;
					// color: #979797;
				}
			}
			.switch{
				position: relative;
				.switch-box{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
				}
			}
		}
	}
</style>
