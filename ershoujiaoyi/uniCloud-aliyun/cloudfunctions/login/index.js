'use strict';
const {
	appId,
	appSecret

} = require("wx-common");

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();
	const {
		code
	} = event
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId +
		"&secret=" + appSecret + "&js_code=" + code +
		"&grant_type=authorization_code ", {
			dataType: "json"
		}
	)
	// console.log('res', res)
	const openid = res.data.openid
	// console.log(openid)
	// const token = getToken(openid)
	let dbRes = await db.collection("users").where({
		openid: openid
	}).limit(1).get()

	let userData
	if (dbRes.affectedDocs <= 0) {




		console.log(res)
		//返回数据给客户端
		userData = {
			openid: openid,
			nickName: "未登录用户",
			avatarUrl: "",
			saying: "请设置你的个性签名",
			qq: "尚未设置",
			wechat: "尚未设置"
		}
		await db.collection("users").add(userData)
	} else {
		userData = dbRes.data[0]
	}


	// userData["token"] = token
	userData["openid"] = openid

	return userData
};
