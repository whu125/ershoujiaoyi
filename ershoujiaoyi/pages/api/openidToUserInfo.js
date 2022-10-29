//这个函数判断数据库中是否有当前用户信息

//绑定在my.vue
//在数据库中查找 没有该用户显示登录 有的话直接读该用户数据
import
cloudApi
from "../../common/cloudApi.js"
export default async function(openid, userInfo) {

	console.log('55', openid.value)
	const db = uniCloud.database();
	//拿到openid现在检查数据库里面有没有
	const result = await db.collection('users')
		.where({
			openid: openid.value
		})
		.get()
	console.log('22', result.result.data)
	if (result.result.data.length > 0 && result.result.data[0].avatarUrl !=
		'') {



		userInfo.value.avatarUrl = result.result.data[0].avatarUrl
		userInfo.value.nickName = result.result.data[0].nickName;
		if (result.result.data[0].saying == "请设置你的个性签名")
			userInfo.value.saying = "ta还没有设置个性签名"

		else
			userInfo.value.saying = result.result.data[0].saying;
		// wechat.value = result.result.data.wechat;
		// console.log('这次', userInfo)
	}
	console.log('44', userInfo.value)

}
