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
				  bindgetuserinfo="bindGetUserInfo" v-if="modalname=='DialogModal1'">确定</button>
					<!-- 确定 -->
					<button class="cu-btn bg-green margin-left" @tap="makesure('点击确认')" v-if="modalname=='DialogModal2'">确定</button>
					<button class="cu-btn bg-green margin-left" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="modalname=='DialogModal4'">确定</button>
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
	import {isAuthorized} from '@/utils/loginreg.js'
	export default{
		data(){
			return{
				iv:'',
				encryptedData:''
			}
			
		},
		props:{
			modalname:'',
			
		},
		getPhoneNumber(e){
			console.log(e)
			this.iv=e.detail.iv;
			this.encryptedData=e.detail.encryptedData;
			
		},
		methods:{
			getPhoneNumber(e){
				console.log(e)
				this.iv=e.detail.iv;
				this.encryptedData=e.detail.encryptedData;
				let detail={};
				detail.msg="确认手机授权";
				detail.iv=this.iv;
				detail.encryptedData=this.encryptedData
				console.log(detail)
				this.$emit("ListenChild",detail)
			},
			hideModal(e) {
				this.$emit("ListenChild","拒绝授权")
			},
			makesure(str){
				console.log(str)
				if(str){
					this.$emit("ListenChild",str)
				}else{
					this.$emit("ListenChild","点击确认")
				}
				
			},
			// makesureTel(){
				
				
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.padding-xl{
		border:none;
		background-color: #fff;
	}
</style>
