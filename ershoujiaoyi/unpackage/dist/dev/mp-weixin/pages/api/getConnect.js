"use strict";
var common_vendor = require("../../common/vendor.js");
async function getConnect(openid, qq, wechat) {
  console.log("\u4F20\u8FDB\u6765\u7684\u662Fqq", qq.value);
  console.log("\u4F20\u8FDB\u6765\u7684\u662Fopenid", openid.value);
  const db = common_vendor.pn.database();
  const result = await db.collection("users").where({
    openid: openid.value
  }).get();
  console.log(result.result.data);
  if (result.result.data.length > 0 && result.result.data[0].avatarUrl != "") {
    console.log("11", result.result.data[0]);
    qq.value = result.result.data[0].qq;
    wechat.value = result.result.data[0].wechat;
  }
  console.log("\u8BBE\u7F6E\u540E", wechat.value);
}
exports.getConnect = getConnect;
