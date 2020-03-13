import req from '@/request/request.js';





export const isAuthorized=(code)=>{
	console.log(code)
		let that=this;
		let data={};
		data.sessionKey=code;
			return new Promise(function (resolve, reject) {
				uni.getSetting({
					 success(res) {
						 console.log(res)
					   if (res.authSetting['scope.userInfo']) {
						console.log("scope.userInfo")
						
						 // 已经授权，可以直接调用 getUserInfo 获取头像昵称
						 uni.getUserInfo({
						   success(res) {
							 console.log(res);
							 data.encryptedData=res.encryptedData;
							 data.iv=res.iv;
							 // 获取授权后向后台发送code
								//  getPhoneNumber().then(res=>{
								// 	console.log(res);
								// 	resolve(res);
								// })
								console.log(data);
								req.httpRequest({
									url:'/Api/User/registerWithWechat',
									method:'POST'
								},data).then((r)=>{
									console.log(r)
										resolve(r.data.data.token);
								})
								// uni.request({
								// 	 url: 'http://192.168.1.65/Api/User/registerWithWechat',
									
								// 	 method:'POST',
								// 	 data: data,
								// 	  success(r) {
								// 			console.log(r)
										
								// 				resolve(r.data.result.token);						
								// 	  }
								// })
						   }
						 })
						 
					   }else{
						   
						   console.log('没授权')
						   resolve('DialogModal1')
						  
						   // that.showModal()
					   }
					 }
				   })
			  })
		
			
				
				 
			}



