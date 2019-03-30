import { getCookie } from '@/utils'
import Vue from 'vue'
import router from '@/router'
const Fly = require("flyio/dist/npm/fly")
const request = new Fly

request.interceptors.request.use((request) => {
	if(getCookie('token')) {
		request.headers.Accept = 'application/json'
		request.headers.Authorization = 'Bearer ' + getCookie('token')
	}
	return request
})

request.interceptors.response.use(
	(response, promise) => {
		return promise.resolve(response.data)
	},
	(err, promise) => {
		if(err.status == 401) {		
			console.log('err msg:',err.response.data)
			Vue.prototype.$message({
				showClose: true,
				message: err.response.data,
				type: 'error'
			})
			
			router.replace({
				name: 'Login'
			})
		}
		if(err.status == 400) {
			Vue.prototype.$message({
				showClose: true,
				message: err.response.data,
				type: 'error'
			})
		}

		if(err.status == 403) {
			Vue.prototype.$message({
				showClose: true,
				message: '你没有操作权限',
				type: 'warning'
			})
		}
		return promise.resolve()
	}
)

export default request