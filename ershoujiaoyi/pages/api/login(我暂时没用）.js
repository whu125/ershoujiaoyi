//这个函数用来登录和建立数据表
import
cloudApi
from "../../common/cloudApi.js"
export default async function(state, userInfo, openid, nickName) {
	console.log('传进来的state是', state)

	uni.getUserProfile({
		desc: "我就是想用",
		success: (res) => {

			if (userInfo.value != null)
				userInfo.value = Object.assign(userInfo.value, res.userInfo)
			else userInfo.value = res.userInfo

			console.log(userInfo.value)
			console.log(openid)
			cloudApi.call({
				name: 'getUserinfo',
				data: {
					// userInfo.value
					// openid
					userInfo: userInfo.value,
					openid: openid
				},
				success: (res) => {

					//这里修改state没有成功
					console.log('最新的state', state)

				}
			})
			// userInfo.value = res.userInfo


		}
	})
}
