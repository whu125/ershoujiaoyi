'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let time = new Date()

	let year = time.getFullYear()
	let month = time.getMonth() + 1
	let day = time.getDate()
	let hour = time.getHours() + 8
	if (hour >= 24)
		hour = hour - 24
	if (hour < 10)
		hour = '0' + hour

	let minute = time.getMinutes()
	if (minute < 10)
		minute = '0' + minute
	let second = time.getSeconds()
	if (second < 10)
		second = '0' + second

	const {
		newitem,
		openid,
		userInfo
	} = event
	let ItemData
	console.log(userInfo)
	// let time = new date()
	ItemData = {
		userid: openid,
		userHead: userInfo.avatarUrl,
		userId: userInfo.nickName,
		userWechat: userInfo.wechat,
		userQQ: userInfo.qq,
		ordertime: time,
		userTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
		userDescription: newitem.description,
		itemimage1: newitem.itemimage1,
		itemimage2: newitem.itemimage2,
		itemimage3: newitem.itemimage3,
		conlectNumber: 0,
		commentState: 0,
		isDone: false,
		nowPrice: newitem.newPrice,
		oldPrice: newitem.oldPrice,
		position: newitem.position,
		category: newitem.category,
		conlect: false,
		conlectList: [],
		commentList: []
	}
	const db = uniCloud.database();
	await db.collection("Itemlists").add(ItemData)
	//返回数据给客户端
	return event
};
