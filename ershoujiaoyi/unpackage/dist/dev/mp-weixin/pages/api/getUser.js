"use strict";
var common_vendor = require("../../common/vendor.js");
var common_cloudApi = require("../../common/cloudApi.js");
function getUser(state, openid, userInfo) {
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
          const db = common_vendor.pn.database();
          const result = await db.collection("users").where({
            openid: openid.value
          }).get();
          userInfo.value.nickName = result.result.data[0].nickName;
          if (result.result.data.length > 0 && result.result.data[0].avatarUrl != "") {
            state.value = 1;
            userInfo.value.nickName = result.result.data[0].nickName;
            userInfo.value.avatarUrl = result.result.data[0].avatarUrl;
            userInfo.value.saying = result.result.data[0].saying;
            userInfo.value.wechat = result.result.data[0].wechat;
            userInfo.value.qq = result.result.data[0].qq;
          } else {
            state.value = 0;
          }
        }
      });
    }
  });
}
exports.getUser = getUser;
