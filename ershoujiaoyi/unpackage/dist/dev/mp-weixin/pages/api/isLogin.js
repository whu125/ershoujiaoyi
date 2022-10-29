"use strict";
var common_vendor = require("../../common/vendor.js");
var common_cloudApi = require("../../common/cloudApi.js");
function isLogin(state, openid) {
  console.log("isLogin\u62FF\u5230\u4E86openid", openid.value);
  common_vendor.index.login({
    provider: "weixin",
    success: (res) => {
      let code = res.code;
      common_cloudApi.cloudApi.call({
        name: "login",
        data: {
          code
        },
        success: async (res2) => {
          openid.value = res2.result.openid;
          console.log("\u6700\u65B0\u7684openid:", openid.value);
          const db = common_vendor.pn.database();
          const result = await db.collection("users").where({
            openid: openid.value
          }).get();
          if (result.result.data.length > 0 && result.result.data[0].avatarUrl != "") {
            state.value = 1;
          } else {
            state.value = 0;
          }
        }
      });
    }
  });
  console.log("isLogin\u8BBE\u7F6E\u540E", openid);
}
exports.isLogin = isLogin;
