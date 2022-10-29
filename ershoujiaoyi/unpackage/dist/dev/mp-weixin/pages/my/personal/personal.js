"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_api_openidToUserInfo = require("../../api/openidToUserInfo.js");
if (!Math) {
  common_vendor.unref(SearchList)();
}
const SearchList = () => "../../components/SearchList.js";
const _sfc_main = {
  __name: "personal",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    const openid = common_vendor.ref();
    const where = common_vendor.ref({});
    common_vendor.onLoad((option) => {
      console.log("777", option.openid);
      openid.value = option.openid;
      pages_api_openidToUserInfo.openidToUserInfo(openid, userInfo);
    });
    common_vendor.watch(userInfo.value, () => {
      where.value.userId = userInfo.value.nickName;
      console.log("12345", where.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value != null
      }, userInfo.value != null ? {
        b: userInfo.value.avatarUrl,
        c: common_vendor.t(userInfo.value.nickName),
        d: common_vendor.t(userInfo.value.saying),
        e: common_vendor.o((...args) => _ctx.inputDialogToggle && _ctx.inputDialogToggle(...args))
      } : {}, {
        f: Object.getOwnPropertyNames(where.value).length != 0
      }, Object.getOwnPropertyNames(where.value).length != 0 ? {
        g: common_vendor.p({
          where: where.value
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f66e585"], ["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/my/personal/personal.vue"]]);
wx.createPage(MiniProgramPage);
