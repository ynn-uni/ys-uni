<template>
	
	<view class="content" :style="{position:haveDev=='devdetail'?'static':'fixed'}">
		<Nodev :text="testdata" v-if="haveDev=='nodev'" v-on:isAddDevice="ShowChild"></Nodev>
		<Devdetail v-if="haveDev=='devdetail'" :devlist1="devlist"></Devdetail>
		<noLogin v-if="haveDev=='noLogin'" v-on:isAddDevice="ShowChild"></noLogin>
	</view>
</template>

<script>
	// import req from'@/request/request.js'
	import Nodev from '@/components/nodev.vue' 
	import Devdetail from '@/components/devdetail.vue' 
	// import Devdetail from './devdetail/devdetail.vue' 
	import noLogin from '@/components/noLogin.vue' 
	export default {
		data() {
			return {
				text: {},
				testdata:{},
				haveDev:'',
				devlist:[]
			}
		},
		components:{
			Nodev,
			Devdetail,
			noLogin
		},
		onHide(){
			// this.$store.state.isHide=true;
			console.log("离开设备详情页面，保持连接不断")
		},
		onPullDownRefresh() {
		       // this.$store.state.isHide=false;
			   uni.closeSocket();
		       console.log("下拉刷新")
			   this.init()
			   this.$store.state.isHide=false;
			   this.$store.state.isAppHide==false;
			   setTimeout(function(){
				   uni.stopPullDownRefresh()
			   },2000)
		  },
		onShow() {
			if(this.$store.state.isHide==false||this.$store.state.isAppHide==false){
				
			console.log("index")
			this.init()
				
			
			}
			
		},
		onLoad() {
			if(this.$store.state.isHide==true){
			console.log("index")
			this.init()
			}
			
		},
		bindGetUserInfo(e) {
		    console.log(e.detail.userInfo)
		  },
		
		
		
		methods: {
			init(){
				this.haveDev=this.$store.state.haveDev;
				var that=this;
				
				if(that.$store.state.isLogin){
					this.getDevList();
					
				}else{
					uni.login({
					     success(res){
						 console.log(res.code);
						 that.code=res.code
						 // console.log(data)
						 that.req.httpRequest({
							 url:'/Api/User/loginWithWechat',
							 method:'GET'
						 },{code:that.code}).then((r)=>{
							 console.log(r)
							 var tel=r.data.data.phone;
							 var email=r.data.data.email;
							 if(tel){
							 	 that.$store.state.tel=tel;
							 }
							 if(email){
								  that.$store.state.email=email;
							 }
							 	that.$store.state.sessionKey=r.data.data.key
							 
							 if(r.data.status==0 ){
								 // that.haveDev = 'noLogin'
							   uni.setStorage({
								key:'token',
								data:r.data.data.token,
								 success() {
									 that.$store.state.token=r.data.data.token
									 that.$store.state.isLogin=true;
									 console.log("设置缓存成功:"+r.data.data.token)
									 that.getDevList();
									
								 },
								 fail() {
									 console.log('缓存失败了')
								 }
							   });
							 }else{
								   that.haveDev = 'noLogin'
							 }
						 })
					  
					     }
					   })
				}
			},
			 ShowChild: function (data) {
			      this.haveDev =data
			    },
			getDevList(){
				var that=this;
				that.req.httpTokenRequest({
						url:'/Api/Device/getDeviceList',
						method:'GET'
					}).then((res)=>{
						console.log(res.data.data)
						that.devlist=res.data.data
						if(that.devlist&&that.devlist.length>0){
							// that.haveDev = 'nodev'
							that.haveDev="devdetail"
						}else{
							that.haveDev = 'nodev'	
						}
				 })
				
			}
		}
	}
</script>

<style lang="scss">
	.content{
	  // position: absolute;
	 
	  top: 0;
	  bottom: 0;
	  width: 100%;
	  background: #fff;
	  overflow: auto;
	}
</style>
