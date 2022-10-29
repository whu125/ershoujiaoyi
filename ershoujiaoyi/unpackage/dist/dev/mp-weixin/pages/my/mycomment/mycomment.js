"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_api_getUser = require("../../api/getUser.js");
require("../../../common/cloudApi.js");
if (!Math) {
  common_vendor.unref(SearchList)();
}
const SearchList = () => "../../components/SearchList.js";
const _sfc_main = {
  __name: "mycomment",
  setup(__props) {
    const where = common_vendor.ref({});
    console.log("where", where.value);
    const state = common_vendor.ref();
    const openid = common_vendor.ref();
    const userInfo = common_vendor.ref({});
    pages_api_getUser.getUser(state, openid, userInfo);
    common_vendor.watch(userInfo.value, () => {
      where.value.commentList = {
        username: userInfo.value.nickName
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: Object.getOwnPropertyNames(where.value).length != 0
      }, Object.getOwnPropertyNames(where.value).length != 0 ? {
        b: common_vendor.p({
          where: where.value,
          openid2: openid.value
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/my/mycomment/mycomment.vue"]]);
wx.createPage(MiniProgramPage);
