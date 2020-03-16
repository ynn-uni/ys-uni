


// const baseUrl = 'http://192.168.1.65';  
// const baseUrl = 'http://123.207.231.244'; 

 const baseUrl = 'http://47.107.151.209:9501';
 // const baseUrl = 'http://192.168.1.65:9501';
const httpRequest = (opts, data) => {
	
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        method: opts.method,
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise
};
let token=null;

uni.getStorage({
		key: 'token',
		success: function(ress) {
			 token = ress.data;
			// console.log("token:"+token)
			},
	})


//带Token请求
const httpTokenRequest = (opts, data) => {
	 
	 let promise = new Promise(function(resolve, reject) {
		 // if(token){
			//  //此token是登录成功后后台返回保存在storage中的
			//  let httpDefaultOpts = {
			//      url: baseUrl+opts.url,
			//      data: data,
			//      method: opts.method,
			//  	header:{
			//  			'token': token,
			//  			},
			       
			//    }
			   
			//  uni.request(httpDefaultOpts).then(
			//      (res) => {
			//          resolve(res[1])
			//      }
			//  ).catch(
			//      (response) => {
			//          reject(response)
			//      }
			//  )
		 // }else{
			 uni.getStorage({
			 		key: 'token',
			 		success: function(ress) {
			 			 token = ress.data;
			 			console.log("token:"+token)
			 					
			 					//此token是登录成功后后台返回保存在storage中的
			 					let httpDefaultOpts = {
			 					    url: baseUrl+opts.url,
			 					    data: data,
			 					    method: opts.method,
			 						header:{
			 								'token': token,
			 								},
			 					      
			 					  }
			 					  
			 					uni.request(httpDefaultOpts).then(
			 					    (res) => {
			 					        resolve(res[1])
			 					    }
			 					).catch(
			 					    (response) => {
			 					        reject(response)
			 					    }
			 					)
			 		}
			 		
			 	});
		 // }
		 
		 
	    
	  })
	  return promise;
	 
};
 
export default {
	    baseUrl,
		httpRequest,
		httpTokenRequest					
}

