"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/release/index.js";
  "./pages/release/release.js";
  "./pages/release/buy.js";
  "./pages/my/contact/contact.js";
  "./pages/my/myrelease/myrelease.js";
  "./pages/my/myconlect/myconlect.js";
  "./pages/my/mycomment/mycomment.js";
  "./pages/my/personal/personal.js";
}
const _sfc_main = {
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
