//这个函数判断数据库中是否有当前用户信息

//绑定在my.vue
//在数据库中查找 没有该用户显示登录 有的话直接读该用户数据
import
cloudApi
from "../../common/cloudApi.js"
export default async function(openid, qq, wechat) {
	console.log('传进来的是qq', qq.value)
	console.log('传进来的是openid', openid.value)

	const db = uniCloud.database();
	//拿到openid现在检查数据库里面有没有
	const result = await db.collection('users')
		.where({
			openid: openid.value
		})
		.get()
	console.log(result.result.data)
	if (result.result.data.length > 0 && result.result.data[0].avatarUrl !=
		'') {

		console.log('11', result.result.data[0])
		qq.value = result.result.data[0].qq;
		wechat.value = result.result.data[0].wechat;
		// wechat.value = result.result.data.wechat;
		// console.log('这次', userInfo)
	}
	console.log('设置后', wechat.value)

}
