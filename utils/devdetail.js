

export const heartcheck={
	timeout: 1000,
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function () {
	  clearTimeout(this.timeoutObj);
	  clearTimeout(this.serverTimeoutObj);
	  return this;
	},
	start: function (message) {
	  if(message=='ping'){
		  this.timeoutObj = setTimeout(()=> {
			console.log("发送ping");
			console.log(message)
			uni.sendSocketMessage({
			  data:"ping",
			  success(){
				console.log("发送ping成功");
			  }
			});
			this.serverTimeoutObj = setTimeout(() =>{
			  uni.closeSocket(); 
			}, 5000);
		  }, this.timeout);
	  }else{
		  uni.sendSocketMessage({
			data:JSON.stringify(message),
			success(){
			  console.log("发送设备数据成功");
			}
		  });
	  }
	 
	}
}

export const realData={//用于图表实时的温度湿度
	temperature:{
		Ta:'26',
		To:'25',
		Ts:'26'
	},
	humidity:{
		Ha:'65',
		Ho:'25',
		Hs:'68'
	}
}


export const waringInfo=[//警告信息
	{name:'超温',statu:0},
	{name:'断水',statu:0},
	{name:'水堵',statu:0},
	{name:'温度错误',statu:0},
	{name:'湿度错误',statu:0},
	{name:'电源错误',statu:0},
	{name:'SOS',statu:0},
	{name:'内存错误',statu:0},
	{name:'系统错误',statu:0},
	{name:'压缩机一',statu:0},
	{name:'压缩机二',statu:0},
	{name:'风机状态',statu:0},
	{name:'照明状态',statu:0},
	{name:'温度控制',statu:0},
	{name:'湿度控制',statu:0},
]

