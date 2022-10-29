'use strict';
// const {
// 	appId,
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const {
		id,
		isDone
	} =
	event


	// console.log("openid" + openid)
	const db = uniCloud.database();

	// const openid = res.data.openid
	const dbRes = await db.collection("Itemlists").where({
		// openid: dbCmd.eq(payload.openid)
		_id: id,
		//openid怎么传进来?
	}).update({
		isDone: isDone
	})
	//返回数据给客户端
	return dbRes.data
	//这里不知为啥是undefined 先不管了
};
