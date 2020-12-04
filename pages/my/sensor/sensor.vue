<template>
	<view class="sensor">
		<cu-custom :isBack="true" bgColor="bg-e">
			<block slot="backText">返回</block>
			<block slot="content">传感器设置</block>
		</cu-custom>
		<view class="content" v-if="devList.length">
			<form class="flex flex-direction align-center" @submit="makesure()">
				<view class="item">
					<view class="flex">
						
					
					<picker @change="PickerChangeDev" :value="indexDev" :range="devlist" style-="font-size:30upx">
						<view class="title text-center">
							{{devlist[indexDev]}}
						</view>
					 </picker>
					 <picker @change="PickerChange" :value="index" :range="picker" style-="font-size:30upx">
					 	<view class="title text-center">
					 		{{sensorData[index].name}}
					 	</view>
					  </picker>
					</view>
					<view class="flex flex-direction align-center justify-center ">
						<view class="flex margin-tb">
							<view class="name">
								温度上偏差
							</view>
							<input class="inp" type="number" v-model="sensorData[index].tTop" />
						</view>
						<view class="flex margin-tb">
							<view class="name">
								温度下偏差
							</view>
							<input class="inp" type="number" v-model="sensorData[index].tUnder" />
						</view>
						
						
					</view>
					<view class="flex flex-direction align-center justify-center ">
						<view class="flex margin-tb">
							<view class="name">
								湿度上偏差
							</view>
							<input class="inp" type="number" v-model="sensorData[index].hTop" />
						</view>
						<view class="flex margin-tb">
							<view class="name">
								湿度下偏差
							</view>
							<input class="inp" type="number" v-model="sensorData[index].hUnder"/>
						</view>
						
						
					</view>
				</view>
				
				<button form-type="submit" class="bg-linear btn">确定</button>
			</form>
			
		</view>
		<noData v-else :text="'暂无设备'"></noData>
	</view>
</template>

<script>
	import noData from '@/components/noData.vue'
	import { mapGetters} from 'vuex'
	import {setDeviceOffset,getDeviceOffset} from '../../../apis/index.js'
	export default {
		components:{
			noData
		},
		data() {
			return {
				index:0,
				indexDev:0,
				sensorData:[
					{
						name:'传感器一',
						tTop:0,
						tUnder:0,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器二',
						tTop:1,
						tUnder:0,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器三',
						tTop:0,
						tUnder:1,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器四',
						tTop:0,
						tUnder:0,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器五',
						tTop:0,
						tUnder:0,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器六',
						tTop:0,
						tUnder:0,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器七',
						tTop:0,
						tUnder:0,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器八',
						tTop:0,
						tUnder:0,
						hTop:0,
						hUnder:0
					},
					{
						name:'传感器九',
						tTop:0,
						tUnder:0,
						hTop:0,
						hUnder:0
					}
				]
			}
		},
		mounted() {
			if(this.devList&&this.devList.length){
				this.getDevSensor()
			}
			
		},
		computed:{
			...mapGetters([ 'devList']),
			picker() {
			  if(this.sensorData.length<1) return
			  let list = []
			  this.sensorData.forEach(val => {
			    list.push(val.name)
			  })
			  return list
			},
			devlist(){
				let list =[]
				this.devList.forEach((val)=>{
					list.push(val.title)
				})
				return list
			}
		},
		methods: {
			getDevSensor(){
				getDeviceOffset({mac:this.devList[this.indexDev].mac}).then((res)=>{
					console.log(res)
					this.initSensorData(res.data)
					console.log(this.sensorData)
				})
			},
			initSensorData(data){
				for(var i in data){
					this.sensorData.forEach((val,index)=>{
						
						if(i.split('_')[1]==(index+1)){
							if(i.split('_')[2]==1){
								val.tTop=data[i]||0
							}else if(i.split('_')[2]==2){
								val.tUnder=data[i]||0
							}else if(i.split('_')[2]==3){
								val.hTop=data[i]||0
							}else if(i.split('_')[2]==4){
								val.hUnder=data[i]||0
							}
						}
					})
				}
				
			},
			PickerChange(e) {
			  //选择设备
			  this.index = e.detail.value //index为选择序列下标
			  
			},
			PickerChangeDev(e) {
			  //选择设备
			  this.indexDev = e.detail.value //index为选择序列下标
			  
			},
			makesure(e){
				let obj={
					mac:this.devList[this.indexDev].mac,
					num:parseInt(this.index)+1,
					p1:this.sensorData[this.index].tTop,
					p2:this.sensorData[this.index].tUnder,
					p3:this.sensorData[this.index].hTop,
					p4:this.sensorData[this.index].hUnder
				}
				console.log(obj)
				setDeviceOffset(obj).then((res)=>{
					console.log(res)
					if(res.status==0){
						uni.showToast({
							title:'修改成功',
							icon:'none'
						})
					}
				})
				// console.log(this.sensorData[this.index].tTop,this.sensorData[this.index].tUnder,this.sensorData[this.index].hTop,this.sensorData[this.index].hUnder)
			}
		}
	}
</script>

<style scoped lang="scss">
	.sensor{
		background-color: #fff;
		min-height: 100vh;
		.content{
			margin-top: 40upx;
			.item{
				margin-top: 20upx;
				padding: 0upx 20upx;
				// border-bottom: 1px solid #eee;
				.title{
					font-size: 30upx;
					border: 1px solid #eee;
					border-radius: 10upx;
					line-height: 60upx;
					margin-bottom: 20px;
					width: 340upx;
					margin: 5upx;
				}
				.name{
					
				}
				.inp{
					border:1px solid #eee;
					margin-left: 20upx;
					margin-right: 20upx;
					border-radius: 10upx;
					width: 340upx;
					padding-left: 10upx;
					// padding: 10upx 10upx;
				}
			}
			.btn{
				margin-top: 60upx;
				font-size: 30upx;
				border:none;
				line-height: 60upx;
				border-radius: 60upx;
				width: 300upx;
			}
		}
	}
</style>
