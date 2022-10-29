"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(release)();
}
const release = () => "../components/release.js";
const _sfc_main = {
  __name: "buy",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          placeholder: "\u6536:\u9700\u6C42/\u5176\u4ED6\u8BF4\u660E"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/release/buy.vue"]]);
wx.createPage(MiniProgramPage);
