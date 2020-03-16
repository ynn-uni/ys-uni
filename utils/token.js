
export function getToken() {
	let token=null;
	uni.getStorage({
			key: 'token',
			success: function(ress) {
				 token = ress.data;
				console.log("token:"+token)
				},
		})
	
  return token;
}
export function setToken(token='') {
  uni.setStorage({
  	key:'token',
  	data:token,
  	 success() {
  		 this.$store.commit('user/updateToken',token);
  	 },
  	 fail() {
  		 console.log('缓存失败了')
  	 }
     });
}
