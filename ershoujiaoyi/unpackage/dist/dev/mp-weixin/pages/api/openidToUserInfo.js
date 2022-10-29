"use strict";
var common_vendor = require("../../common/vendor.js");
async function openidToUserInfo(openid, userInfo) {
  console.log("55", openid.value);
  const db = common_vendor.pn.database();
  const result = await db.collection("users").where({
    openid: openid.value
  }).get();
  console.log("22", result.result.data);
  if (result.result.data.length > 0 && result.result.data[0].avatarUrl != "") {
    userInfo.value.avatarUrl = result.result.data[0].avatarUrl;
    userInfo.value.nickName = result.result.data[0].nickName;
    if (result.result.data[0].saying == "\u8BF7\u8BBE\u7F6E\u4F60\u7684\u4E2A\u6027\u7B7E\u540D")
      userInfo.value.saying = "ta\u8FD8\u6CA1\u6709\u8BBE\u7F6E\u4E2A\u6027\u7B7E\u540D";
    else
      userInfo.value.saying = result.result.data[0].saying;
  }
  console.log("44", userInfo.value);
}
exports.openidToUserInfo = openidToUserInfo;
