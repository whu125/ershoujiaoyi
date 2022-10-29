"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_api_isLogin = require("../../api/isLogin.js");
var pages_api_getConnect = require("../../api/getConnect.js");
var common_cloudApi = require("../../../common/cloudApi.js");
const _sfc_main = {
  __name: "contact",
  setup(__props) {
    const openid = common_vendor.ref();
    const loginstate = common_vendor.ref(0);
    const state = common_vendor.ref(1);
    const wechatValue = common_vendor.ref("");
    const tempWechatValue = common_vendor.ref("");
    const qqValue = common_vendor.ref("");
    const tempQQValue = common_vendor.ref("");
    pages_api_isLogin.isLogin(loginstate, openid);
    console.log("openid\u88AB\u66F4\u65B0\u4E86\u5417", openid);
    common_vendor.watch(openid, () => pages_api_getConnect.getConnect(openid, qqValue, wechatValue));
    const change = () => {
      state.value = 0;
    };
    const changeback = () => {
      state.value = 1;
    };
    const changecommit = () => {
      state.value = 1;
      wechatValue.value = tempWechatValue.value;
      qqValue.value = tempQQValue.value;
      common_cloudApi.cloudApi.call({
        name: "updateConnect",
        data: {
          qq: qqValue.value,
          wechat: wechatValue.value,
          openid: openid.value
        },
        success: (res) => {
        }
      });
    };
    const getWechat = (e) => {
      tempWechatValue.value = e.target.value;
    };
    const getQQ = (e) => {
      tempQQValue.value = e.target.value;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.value == 1
      }, state.value == 1 ? {
        b: common_vendor.t(wechatValue.value)
      } : {}, {
        c: state.value == 0
      }, state.value == 0 ? {
        d: common_vendor.o(getWechat)
      } : {}, {
        e: state.value == 1
      }, state.value == 1 ? {
        f: common_vendor.t(qqValue.value)
      } : {}, {
        g: state.value == 0
      }, state.value == 0 ? {
        h: common_vendor.o(getQQ)
      } : {}, {
        i: state.value == 1
      }, state.value == 1 ? {
        j: common_vendor.o(change)
      } : {}, {
        k: state.value == 0
      }, state.value == 0 ? {
        l: common_vendor.o(changecommit)
      } : {}, {
        m: state.value == 0
      }, state.value == 0 ? {
        n: common_vendor.o(changeback)
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-df336ff2"], ["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/my/contact/contact.vue"]]);
wx.createPage(MiniProgramPage);
