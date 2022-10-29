"use strict";
var common_vendor = require("../../common/vendor.js");
var common_cloudApi = require("../../common/cloudApi.js");
var pages_api_getUser = require("../api/getUser.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const state = common_vendor.ref(0);
    const inputDialog = common_vendor.ref();
    common_vendor.ref("Be mentally stronger just like you said.");
    const inputDialogToggle = () => {
      inputDialog.value.open();
    };
    const dialogInputConfirm = (val) => {
      if (isNull(val))
        return;
      userInfo.value.saying = val;
      common_cloudApi.cloudApi.call({
        name: "updateSaying",
        data: {
          saying: userInfo.value.saying,
          openid: openid.value
        },
        success: (res) => {
        }
      });
      inputDialog.value.close();
    };
    const userInfo = common_vendor.ref({});
    const openid = common_vendor.ref();
    common_vendor.ref();
    const isNull = (str) => {
      if (str == "")
        return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      console.log("\u68C0\u6D4B", re.test(str));
      return re.test(str);
    };
    pages_api_getUser.getUser(state, openid, userInfo);
    common_vendor.onMounted(() => {
    });
    const login = async (options) => {
      common_vendor.index.getUserProfile({
        desc: "\u6211\u5C31\u662F\u60F3\u7528",
        success: (res) => {
          userInfo.value = Object.assign(userInfo.value, res.userInfo);
          common_cloudApi.cloudApi.call({
            name: "getUserinfo",
            data: {
              userInfo: userInfo.value,
              openid: openid.value
            },
            success: async (res2) => {
              state.value = 1;
              const db = common_vendor.pn.database();
              const result = await db.collection("users").where({
                openid: openid.value
              }).get();
              userInfo.value.saying = result.result.data[0].saying;
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value.avatarUrl,
        b: common_vendor.t(userInfo.value.nickName),
        c: common_vendor.t(userInfo.value.saying),
        d: common_vendor.o(inputDialogToggle),
        e: common_vendor.sr("inputClose", "0be17cc6-1,0be17cc6-0"),
        f: common_vendor.o(dialogInputConfirm),
        g: common_vendor.p({
          mode: "input",
          title: "\u8BF7\u8F93\u5165\u4E2A\u6027\u7B7E\u540D",
          value: "",
          placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
        }),
        h: common_vendor.sr(inputDialog, "0be17cc6-0", {
          "k": "inputDialog"
        }),
        i: common_vendor.p({
          type: "dialog"
        }),
        j: state.value == 1
      }, state.value == 1 ? {} : {}, {
        k: state.value == 0
      }, state.value == 0 ? {
        l: common_vendor.o(login)
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0be17cc6"], ["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
