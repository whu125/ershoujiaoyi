'use strict';
// const {
// 	appId,
// 	appSecret,

// } = require("wx-common");

// const {
// 	openid
// } = require("login");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event1 : ', event)

	const {
		qq,
		wechat,
		openid
		// token
	} =
	event
	// console.log("openid" + openid)
	const db = uniCloud.database();

	// const openid = db.collection("users").openid

	// const dbCmd = db.command
	// const payload = verifyToken(token)

	// console.log(payload)
	// const res = await uniCloud.httpclient.request(
	// 	"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId +
	// 	"&secret=" + appSecret + "&js_code=" + code +
	// 	"&grant_type=authorization_code ", {
	// 		dataType: "json"
	// 	}
	// )

	// const openid = res.data.openid

	const dbRes = await db.collection("Itemlists").where({
		// openid: dbCmd.eq(payload.openid)
		userid: openid,
		//openid怎么传进来?
	}).update({
		userWechat: wechat,
		userQQ: qq
	})
	//不知道这里是更新一条还是更新多条
	//返回数据给客户端
	return dbRes.data
	//这里不知为啥是undefined 先不管了
};
