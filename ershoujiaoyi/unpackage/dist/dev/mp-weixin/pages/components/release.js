"use strict";
var common_vendor = require("../../common/vendor.js");
var common_cloudApi = require("../../common/cloudApi.js");
var pages_api_getUser = require("../api/getUser.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_file_picker2 + _easycom_uni_popup2 + _easycom_uni_popup_message2 + _easycom_uni_card2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_popup + _easycom_uni_popup_message + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "release",
  props: ["placeholder"],
  setup(__props) {
    const props = __props;
    const oldPrice = common_vendor.ref();
    const newPrice = common_vendor.ref();
    const message = common_vendor.ref();
    const msgType = common_vendor.ref("success");
    const messageText = common_vendor.ref("\u8FD9\u662F\u4E00\u6761\u6210\u529F\u63D0\u793A");
    const files = common_vendor.ref();
    const fileNumber = common_vendor.ref(0);
    const newitem = common_vendor.reactive({
      oldPrice: "",
      newPrice: "",
      description: "",
      itemimage1: "",
      itemimage2: "",
      itemimage3: "",
      position: "",
      category: ""
    });
    const userInfo = common_vendor.ref({});
    const popup2 = common_vendor.ref();
    const canCommit = common_vendor.ref(false);
    const description = common_vendor.ref("");
    const range = common_vendor.reactive(["\u6587\u7406\u5B66\u90E8-\u6E56\u6EE8", "\u6587\u7406\u5B66\u90E8-\u6842\u56ED", "\u6587\u7406\u5B66\u90E8-\u67AB\u56ED", "\u6587\u7406\u5B66\u90E8-\u6885\u56ED", "\u5DE5\u5B66\u90E8", "\u4FE1\u606F\u5B66\u90E8", "\u533B\u5B66\u90E8", "\u7F51\u5B89\u57FA\u5730", "\u5176\u4ED6\u5730\u533A"]);
    const category = common_vendor.reactive(["\u6570\u7801\u8BBE\u5907", "\u670D\u9970\u978B\u5E3D", "\u7F8E\u5986\u4E2A\u62A4", "\u5403\u559D\u73A9\u4E50", "\u6587\u5177\u4E66\u7C4D", "\u95EE\u5377\u8D44\u6599", "\u65E5\u5E38\u7528\u54C1", "\u56FD\u6F6E\u6587\u521B", "\u5176\u4ED6\u95F2\u7F6E"]);
    const loginstate = common_vendor.ref();
    const openid = common_vendor.ref(0);
    const currIndex = common_vendor.ref(0);
    const currExit = common_vendor.ref("");
    const currCategoryExit = common_vendor.ref("");
    const type = common_vendor.ref("");
    const popup = common_vendor.ref("");
    const imageValue = common_vendor.reactive([]);
    const imageStyles = common_vendor.reactive({
      width: 100,
      height: 100,
      border: {
        color: "#f7f7f7",
        width: 2,
        style: "solid",
        radius: "2px"
      }
    });
    pages_api_getUser.getUser(loginstate, openid, userInfo);
    common_vendor.onUpdated(() => {
      isCanCommit();
    });
    common_vendor.watch(loginstate, () => {
      console.log(loginstate);
      if (loginstate.value == 0) {
        console.log("\u5E94\u8BE5\u8BF7\u6C42\u767B\u5F55\u4E86");
        popup2.value.open("center");
        setTimeout(() => {
          popup2.value.close();
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        }, 3e3);
      }
    });
    const getData = () => {
      newitem.description = description.value;
      newitem.position = currExit.value;
      newitem.category = currCategoryExit.value;
    };
    const success = (res) => {
      fileNumber.value = res.tempFilePaths.length;
      console.log("\u6587\u4EF6\u6570\u91CF", fileNumber.value);
      switch (fileNumber.value) {
        case 0:
          break;
        case 1:
          newitem.itemimage1 = res.tempFilePaths[0];
          console.log("\u6587\u4EF6\u4E0A\u4F20\u91CC\u9762", newitem.itemimage1);
          break;
        case 2:
          newitem.itemimage1 = res.tempFilePaths[0];
          newitem.itemimage2 = res.tempFilePaths[1];
          break;
        case 3:
          newitem.itemimage1 = res.tempFilePaths[0];
          newitem.itemimage2 = res.tempFilePaths[1];
          newitem.itemimage3 = res.tempFilePaths[2];
          break;
      }
      console.log("\u8FD9\u91CC\u6267\u884C\u4E86\u5417");
      common_cloudApi.cloudApi.call({
        name: "release",
        data: {
          newitem,
          userInfo: userInfo.value,
          openid: openid.value
        },
        success: (res2) => {
          messageText.value = `\u53D1\u5E03\u6210\u529F`;
          message.value.open();
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/index/index",
              success: () => {
                common_vendor.index.$emit("update");
              }
            });
          }, 2e3);
        }
      });
    };
    const toggle = (a) => {
      type.value = a;
      console.log(type.value);
      popup.value.open(type.value);
    };
    const handleChange = (e) => {
      currIndex.value = e.target.value;
      currExit.value = range[currIndex.value];
    };
    const handleCategoryChange = (e) => {
      currIndex.value = e.target.value;
      currCategoryExit.value = category[currIndex.value];
    };
    const isCanCommit = () => {
      if (description.value != "" && currExit.value != "" && currCategoryExit.value != "") {
        canCommit.value = true;
      } else {
        canCommit.value = false;
      }
    };
    const commit = () => {
      getData();
      if (files.value.files.length == 0) {
        common_cloudApi.cloudApi.call({
          name: "release",
          data: {
            newitem,
            userInfo: userInfo.value,
            openid: openid.value
          },
          success: (res) => {
            messageText.value = `\u53D1\u5E03\u6210\u529F`;
            message.value.open();
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/index/index",
                success: () => {
                  common_vendor.index.$emit("update");
                }
              });
            }, 2e3);
          }
        });
      }
      files.value.upload();
    };
    const priceCommit = () => {
      if (oldPrice.value == null)
        newitem.oldPrice = "";
      else
        newitem.oldPrice = oldPrice.value;
      if (newitem.oldPrice >= 1e4)
        newitem.oldPrice = 9999;
      if (newPrice.value == null)
        newitem.newPrice = "";
      else
        newitem.newPrice = newPrice.value;
      if (newitem.newPrice >= 1e4)
        newitem.newPrice = 9999;
      popup.value.close();
    };
    return (_ctx, _cache) => {
      return {
        a: props.placeholder,
        b: description.value,
        c: common_vendor.o(($event) => description.value = $event.detail.value),
        d: common_vendor.sr(files, "5fb87972-0", {
          "k": "files"
        }),
        e: common_vendor.o(success),
        f: common_vendor.o(($event) => common_vendor.isRef(imageValue) ? imageValue.value = $event : null),
        g: common_vendor.p({
          fileMediatype: "image",
          mode: "grid",
          ["auto-upload"]: false,
          limit: 3,
          ["image-styles"]: imageStyles,
          modelValue: imageValue
        }),
        h: common_vendor.o(($event) => toggle("bottom")),
        i: newPrice.value,
        j: common_vendor.o(($event) => newPrice.value = $event.detail.value),
        k: oldPrice.value,
        l: common_vendor.o(($event) => oldPrice.value = $event.detail.value),
        m: common_vendor.o(priceCommit),
        n: type.value === "left" || type.value === "right" ? 1 : "",
        o: common_vendor.sr(popup, "5fb87972-1", {
          "k": "popup"
        }),
        p: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        q: common_vendor.t(currExit.value),
        r: range,
        s: common_vendor.o(handleChange),
        t: common_vendor.t(currCategoryExit.value),
        v: category,
        w: common_vendor.o(handleCategoryChange),
        x: !canCommit.value,
        y: common_vendor.o(commit),
        z: common_vendor.p({
          type: msgType.value,
          message: messageText.value,
          duration: 2e3
        }),
        A: common_vendor.sr(message, "5fb87972-2", {
          "k": "message"
        }),
        B: common_vendor.p({
          type: "message"
        }),
        C: common_vendor.p({
          ["is-shadow"]: true
        }),
        D: common_vendor.sr(popup2, "5fb87972-4", {
          "k": "popup2"
        }),
        E: common_vendor.p({
          ["background-color"]: "transparent",
          ["mask-click"]: false
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5fb87972"], ["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/components/release.vue"]]);
wx.createComponent(Component);
