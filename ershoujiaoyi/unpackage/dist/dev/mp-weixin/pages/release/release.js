"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(release)();
}
const release = () => "../components/release.js";
const _sfc_main = {
  __name: "release",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          placeholder: "\u51FA:\u95F2\u7F6E/\u54C1\u724C/\u65B0\u65E7\u7A0B\u5EA6"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/release/release.vue"]]);
wx.createPage(MiniProgramPage);
