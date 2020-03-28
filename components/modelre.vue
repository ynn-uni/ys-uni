<template>
	<view class="cu-modal" 
	:class="modalname=='DialogModal1'?'show':modalname=='DialogModal2'?'show':modalname=='DialogModal4'?'show':modalname=='DialogModal5'?'show':modalname=='DialogModal6'?'show':modalname=='DialogModal7'?'show':modalname=='DialogModal8'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">提示</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl">
				{{modalname=='DialogModal1'?'获取微信授权?':modalname=='DialogModal2'?'确定删除该设备？':modalname=='DialogModal4'?'获取手机授权?':modalname=='DialogModal5'?'确定将选中消息标为已读?':modalname=='DialogModal6'?'确定将该消息标记为已读?':modalname=='DialogModal7'?'确定删除选中消息?':modalname=='DialogModal8'?'确定将该消息删除?':''}}
				
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<!-- 弹出授权框 -->
					<button class="cu-btn bg-green margin-left" @tap="makesure('点击确认')" open-type="getUserInfo"
				  @getuserinfo="getUserInfo" v-if="modalname=='DialogModal1'">确定</button>
					<!-- 确定 -->
					<button class="cu-btn bg-green margin-left" @tap="delDev('点击确认')" v-if="modalname=='DialogModal2'">确定</button>
					<button class="cu-btn bg-green margin-left" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap="makesure('点击确认')" v-if="modalname=='DialogModal4'">确定</button>
					<button class="cu-btn bg-green margin-left" @tap="makesure('确定标记所有')" v-if="modalname=='DialogModal5'">确定</button>
					<button class="cu-btn bg-green margin-left" @tap="makesure('确定标记该信息')" v-if="modalname=='DialogModal6'">确定</button>
					<button class="cu-btn bg-green margin-left" @tap="makesure('确定删除所有')" v-if="modalname=='DialogModal7'">确定</button>
					<button class="cu-btn bg-green margin-left" @tap="makesure('确定删除该信息')" v-if="modalname=='DialogModal8'">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {setUserPhone} from '../apis/index.js'
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default{
		data(){
			return{
				modalname:null
			}
			
		},
		computed:{
			 ...mapGetters([ 'userInfo','code']),
		},
		props:{
			// modalname:'',
			
		},
		
		methods:{
			...mapMutations('user', [
			  'updateUserInfo'
			]),
			...mapActions('user', [
			  'loginWithUserInfo'
			]),
			getUserInfo(evt) {
			  const {iv, encryptedData,errMsg} = evt.detail;
			  if (errMsg === 'getUserInfo:ok') {
				this.loginWithUserInfo({ iv, encryptedData });
				
			  }
			},
			getPhoneNumber(e){
				let data={}
				data.sessionKey=this.userInfo.key;
				// data.sessionKey=this.code;
				data.iv=e.detail.iv;
				data.encryptedData=e.detail.encryptedData;
				setUserPhone(data).then((res)=>{
					this.userInfo.phone=res.data.phone
					this.updateUserInfo(this.userInfo)
				})
			},
			hideModal(e) {
				this.modalname=null
			},
			showModal() {
				 this.modalname = 'DialogModal1'
			},
			showModalPhone() {
				 this.modalname = 'DialogModal4'
			},
			showModalDel(){
				this.modalname = 'DialogModal2'
			},
			makesure(str){
				this.hideModal()
			},
			delDev(){
				this.$emit('deldev')
				this.hideModal()
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.padding-xl{
		border:none;
		background-color: #fff;
	}
</style>
