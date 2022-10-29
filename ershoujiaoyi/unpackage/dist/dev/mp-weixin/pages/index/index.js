"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(SearchList)();
}
const SearchList = () => "../components/SearchList.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(0);
    const category = common_vendor.reactive(["\u4E0D\u9650", "\u6570\u7801\u8BBE\u5907", "\u670D\u9970\u978B\u5E3D", "\u7F8E\u5986\u4E2A\u62A4", "\u5403\u559D\u73A9\u4E50", "\u6587\u5177\u4E66\u7C4D", "\u95EE\u5377\u8D44\u6599", "\u65E5\u5E38\u7528\u54C1", "\u56FD\u6F6E\u6587\u521B", "\u5176\u4ED6\u95F2\u7F6E"]);
    const range = common_vendor.reactive(["\u4E0D\u9650", "\u6587\u7406\u5B66\u90E8-\u6E56\u6EE8", "\u6587\u7406\u5B66\u90E8-\u6842\u56ED", "\u6587\u7406\u5B66\u90E8-\u67AB\u56ED", "\u6587\u7406\u5B66\u90E8-\u6885\u56ED", "\u5DE5\u5B66\u90E8", "\u4FE1\u606F\u5B66\u90E8", "\u533B\u5B66\u90E8", "\u7F51\u5B89\u57FA\u5730", "\u5176\u4ED6\u5730\u533A"]);
    const showrange = common_vendor.reactive(["\u4E0D\u9650", "\u6E56\u6EE8", "\u6842\u56ED", "\u67AB\u56ED", "\u6885\u56ED", "\u5DE5\u5B66\u90E8", "\u4FE1\u606F\u5B66\u90E8", "\u533B\u5B66\u90E8", "\u7F51\u5B89\u57FA\u5730", "\u5176\u4ED6\u5730\u533A"]);
    const currIndex = common_vendor.ref(0);
    const currExit = common_vendor.ref("\u7269\u54C1\u5206\u7C7B");
    const currPositionExit = common_vendor.ref("\u4F4D\u7F6E\u4FE1\u606F");
    const where = common_vendor.ref({});
    const searchVal = common_vendor.ref();
    const handleChange = (e) => {
      currIndex.value = e.target.value;
      currExit.value = category[currIndex.value];
      if (currExit.value == "\u4E0D\u9650") {
        delete where.value.category;
        return;
      }
      where.value.category = currExit.value;
    };
    const handlePositionChange = (e) => {
      currIndex.value = e.target.value;
      currPositionExit.value = showrange[currIndex.value];
      if (currPositionExit.value == "\u4E0D\u9650") {
        delete where.value.position;
        return;
      }
      switch (currPositionExit.value) {
        case "\u6E56\u6EE8":
          where.value.position = "\u6587\u7406\u5B66\u90E8-\u6E56\u6EE8";
          break;
        case "\u6842\u56ED":
          where.value.position = "\u6587\u7406\u5B66\u90E8-\u6842\u56ED";
          break;
        case "\u67AB\u56ED":
          where.value.position = "\u6587\u7406\u5B66\u90E8-\u67AB\u56ED";
          break;
        case "\u6885\u56ED":
          where.value.position = "\u6587\u7406\u5B66\u90E8-\u6885\u56ED";
          break;
        default:
          where.value.position = currPositionExit.value;
      }
    };
    const searchInput = (e) => {
      searchVal.value = e.target.value;
      console.log("\u641C\u7D22\u503C\u662F", searchVal.value);
      where.value = `${new RegExp(searchVal.value, "i")}.test(userDescription)`;
      console.log(where.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(searchInput),
        b: common_vendor.t(currExit.value),
        c: category,
        d: common_vendor.o(handleChange),
        e: common_vendor.t(currPositionExit.value),
        f: range,
        g: common_vendor.o(handlePositionChange),
        h: common_vendor.p({
          where: where.value
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57280228"], ["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
