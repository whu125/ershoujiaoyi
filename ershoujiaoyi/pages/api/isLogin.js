//这个函数判断数据库中是否有当前用户信息

//绑定在my.vue
//在数据库中查找 没有该用户显示登录 有的话直接读该用户数据
import
cloudApi
from "../../common/cloudApi.js"


export default function(state, openid) {


	//onLoad的时候就要调用
	console.log('isLogin拿到了openid', openid.value)
	// const login = async (options) => {
	uni.login({
		provider: "weixin",
		success: (res) => {
			// console.log('res', res)
			let code = res.code;
			cloudApi.call({
				name: "login",
				data: {
					code: code
				},
				success: async (res) => {
					openid.value = res.result.openid
					console.log('最新的openid:', openid.value)
					// console.log('openid' + openid.value)
					//这里难道没有实现响应式吗？原来页面的openid不就变了吗
					const db = uniCloud.database();
					//拿到openid现在检查数据库里面有没有
					const result = await db.collection('users')
						.where({
							openid: openid.value
						})
						.get()

					if (result.result.data.length > 0 && result.result.data[0].avatarUrl !=
						'') {

						state.value = 1

						// console.log('这次', userInfo)
					} else {
						state.value = 0
					}


				}
			})

		}
	})
	console.log('isLogin设置后', openid)
	// }

}
