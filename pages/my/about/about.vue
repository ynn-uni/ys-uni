<template>
	<view class="help">
		
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于永生</block>
		</cu-custom>
		<view class="content">
			永生仪器是生命科学领域温湿度控制仪器、药品检验解决方案的制造商和供应商。永生仪器自2000年成立以来，一直专注于为制药企业和研究机构提供药品稳定性试验箱、步入式试验室以及药品实验系统的全方位解决方案。
			早在中国加入WTO，永生仪器率先研发出药品稳定性考察试验仪器，及时填补了国内在药品检验领域实验仪器的空白。因此，永生仪器成为全国首家系统设计药品试验箱的制造商。
		</view>
		<view class="content">
			永生仪器历来视产品质量为企业发展的根本。2001年，永生仪器通过了ISO9001质量体系认证，并获得《中国质量万里行》国家质量合格用户放心首选品牌证书。直到2018年，永生仪器已将上万台药品稳定性检查仪器投放在客户实验室内昼夜不停地正常运行，客户数量超过5000个。		
		</view>
		<view class="content">
			在海外市场方面，永生仪器亦凭借专业的质量和服务，将产品供给香港、台湾、南非、泰国、越南、巴西和澳大利亚等国家的制药企业客户使用。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.help{
		padding: 20upx 0upx;
		position: fixed;
		top: 0;
		bottom: 0;
		background-color: #fff;
		.title{
			text-align: center;
			font-size:32upx;
			font-weight:400;
			color:rgba(67,67,67,1);
			line-height:60upx;
			letter-spacing:1px;
		}
		.content{
			padding: 0 34upx;
			font-size:30upx;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:60upx;
			text-align: justify;
			text-indent: 56upx;
		}
	}

</style>
