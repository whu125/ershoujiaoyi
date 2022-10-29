const appId = "wx2920aee7ce7d649d"
const appSecret = "c031a4d150f429970053983d1c3e5eff"

// const jwt = require("jsonwebtoken")

// function getToken(openid) {
// 	return jwt.sign({
// 		openid: openid
// 	}, appSecret, {
// 		expiresIn: 60 * 60 * 24
// 	})
// 	//有点不理解 是要每天重新登录吗？
// }

// function verifyToken(token) {
// 	return jwt.verify(token, appSecret)
// }

module.exports = {
	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
	appId: appId,
	appSecret: appSecret
	// getToken: getToken,
	// verifyToken: verifyToken
}
