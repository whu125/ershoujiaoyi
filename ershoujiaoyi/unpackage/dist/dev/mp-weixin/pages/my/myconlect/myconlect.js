"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_api_isLogin = require("../../api/isLogin.js");
require("../../../common/cloudApi.js");
if (!Math) {
  common_vendor.unref(SearchList)();
}
const SearchList = () => "../../components/SearchList.js";
const _sfc_main = {
  __name: "myconlect",
  setup(__props) {
    const where = common_vendor.ref({});
    const state = common_vendor.ref();
    const openid = common_vendor.ref();
    pages_api_isLogin.isLogin(state, openid);
    common_vendor.watch(openid, () => {
      where.value.conlectList = {
        useropenid: openid.value
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/my/myconlect/myconlect.vue"]]);
wx.createPage(MiniProgramPage);
