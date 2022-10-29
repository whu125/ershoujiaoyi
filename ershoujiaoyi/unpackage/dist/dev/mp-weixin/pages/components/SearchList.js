"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_getUser = require("../api/getUser.js");
require("../../common/cloudApi.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_unicloud_db2 + _easycom_uni_popup2 + _easycom_uni_card2 + _easycom_uni_popup_dialog2)();
}
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_unicloud_db + _easycom_uni_popup + _easycom_uni_card + _easycom_uni_popup_dialog)();
}
const _sfc_main = {
  __name: "SearchList",
  props: ["where", "openid2"],
  setup(__props) {
    const props = __props;
    console.log("props\u6536\u5230", props.where);
    common_vendor.ref();
    const itemlist = common_vendor.ref({});
    const placeholder = common_vendor.ref();
    const userInfo = common_vendor.ref({});
    const loginstate = common_vendor.ref();
    const openid = common_vendor.ref(0);
    const doneId = common_vendor.ref();
    common_vendor.ref(0);
    const commentText = common_vendor.ref();
    const udb = common_vendor.ref();
    common_vendor.ref(true);
    const popup = common_vendor.ref();
    const popup2 = common_vendor.ref();
    const alertDialog = common_vendor.ref();
    const alertDialogDone = common_vendor.ref();
    const alertDialogDelete = common_vendor.ref();
    const type = common_vendor.ref();
    const isDark = common_vendor.ref(false);
    const commentIndex = common_vendor.ref();
    const wechat = common_vendor.ref();
    const qq = common_vendor.ref();
    const test = () => {
      console.log("\u70B9\u5230\u4E86");
    };
    const noLogin = () => {
      setTimeout(() => {
        popup2.value.close();
        common_vendor.index.switchTab({
          url: "/pages/my/my"
        });
      }, 3e3);
    };
    const changeconlect = (id, conlectNumber, isconlect) => {
      if (loginstate.value == 0) {
        popup2.value.open("center");
        noLogin();
        return;
      }
      for (let i = 0; i < 9999; i++) {
        if (isconlect == true) {
          if (itemlist.value[i]._id == id) {
            for (let j = 0; j < itemlist.value[i].conlectList.length; j++) {
              if (itemlist.value[i].conlectList[j].useropenid == openid.value) {
                itemlist.value[i].conlectList.splice(j, 1);
              }
            }
            common_vendor.pn.callFunction({
              name: "updateConlect",
              data: {
                conlectList: itemlist.value[i].conlectList,
                id
              },
              success: (res) => {
                console.log(res);
              }
            });
            itemlist.value[i].conlectNumber--;
            console.log("\u8BBE\u7F6E\u524D", itemlist.value[i].isConlect);
            itemlist.value[i].isConlect = false;
            console.log("\u8BBE\u7F6E\u540E", itemlist.value[i].isConlect);
            break;
          }
        }
        if (isconlect == false) {
          if (itemlist.value[i]._id == id) {
            itemlist.value[i].conlectList.push({
              useropenid: openid.value
            });
            itemlist.value[i].conlectNumber++;
            itemlist.value[i].isConlect = true;
            common_vendor.pn.callFunction({
              name: "updateConlect",
              data: {
                conlectList: itemlist.value[i].conlectList,
                id
              },
              success: (res) => {
                console.log(res);
              }
            });
            break;
          }
        }
      }
      console.log("111", isconlect);
      console.log("\u4F20\u8FDB\u6765\u7684id\u662F", id);
      while (1) {
        if (isconlect == false) {
          isconlect = true;
          break;
        }
        if (isconlect == true) {
          isconlect = false;
          break;
        }
      }
    };
    const getConnect = (a, wechat1, qq1) => {
      console.log(qq1);
      wechat.value = wechat1;
      qq.value = qq1;
      type.value = a;
      console.log(popup);
      popup.value.open(type.value);
    };
    const clickImg = (image) => {
      common_vendor.index.previewImage({
        urls: [image],
        current: "",
        success: function(res) {
        },
        fail: function(res) {
        },
        complete: function(res) {
        }
      });
    };
    const clickComment = (id, index, userId) => {
      if (loginstate.value == 0) {
        popup2.value.open("center");
        noLogin();
        return;
      }
      commentText.value = "";
      for (let i = 0; i < index; i++) {
        if (itemlist.value[i].commentState = 1) {
          itemlist.value[i].commentState = 0;
        }
      }
      for (let i = 0; i < index; i++) {
        if (userId == null) {
          placeholder.value = "\u8BF7\u8F93\u5165\u8BC4\u8BBA\u5185\u5BB9";
          itemlist.value[i].tempresponce = "";
        } else {
          placeholder.value = `\u56DE\u590D${userId}`;
          itemlist.value[i].tempresponce = userId;
        }
        if (itemlist.value[i]._id == id) {
          itemlist.value[i].commentState = 1;
          break;
        }
      }
    };
    const cancelComment = (id) => {
      for (let i = 0; i < 9999; i++) {
        if (itemlist.value[i]._id == id) {
          itemlist.value[i].commentState = 0;
          break;
        }
      }
    };
    const copy = (mes) => {
      common_vendor.index.setClipboardData({
        data: mes
      });
      popup.value.close();
    };
    const sendComment = (id, commentText1, oldcommentList, index) => {
      for (let i = 0; i < index; i++) {
        if (itemlist.value[i]._id == id) {
          itemlist.value[i].commentState = 0;
          if (itemlist.value[i].tempresponce == null)
            itemlist.value[i].commentList.push({
              username: userInfo.value.nickName,
              responceId: "",
              content: commentText.value,
              index: itemlist.value[i].commentList.length + 1
            });
          else {
            console.log("11", itemlist.value[i].tempresponce);
            itemlist.value[i].commentList.push({
              username: userInfo.value.nickName,
              responceId: itemlist.value[i].tempresponce,
              content: commentText.value,
              index: itemlist.value[i].commentList.length + 1
            });
          }
          common_vendor.pn.callFunction({
            name: "sendComment",
            data: {
              id,
              commentList: itemlist.value[i].commentList
            },
            success: (res) => {
              commentText.value = "";
            }
          });
          itemlist.value[i].tempresponce = null;
          break;
        }
      }
    };
    const dialogToggle = (id, isdone) => {
      console.log("\u4F20\u8FDB\u6765\u4E86done", isdone);
      doneId.value = id;
      if (isdone == false)
        alertDialog.value.open();
      else
        alertDialogDone.value.open();
    };
    const done = (isdone) => {
      for (let i = 0; i < 9999; i++) {
        if (itemlist.value[i]._id == doneId.value) {
          console.log("\u4F20\u8FDB\u6765\u4E86id", doneId.value);
          itemlist.value[i].isDone = isdone;
          common_vendor.pn.callFunction({
            name: "updateIsDone",
            data: {
              id: doneId.value,
              isDone: itemlist.value[i].isDone
            },
            success: (res) => {
            }
          });
          break;
        }
      }
    };
    const confirmDelete = () => {
      udb.value.remove(doneId.value);
    };
    const confirmDeleteComment = () => {
      for (let i = 0; i < 9999; i++) {
        if (itemlist.value[i]._id == doneId.value) {
          for (let j = 0; j < itemlist.value[i].commentList.length; j++) {
            if (itemlist.value[i].commentList[j].index == commentIndex.value) {
              itemlist.value[i].commentList.splice(j, 1);
              common_vendor.pn.callFunction({
                name: "sendComment",
                data: {
                  id: doneId.value,
                  commentList: itemlist.value[i].commentList
                },
                success: (res) => {
                }
              });
              break;
            }
          }
          break;
        }
      }
    };
    const deleteComment = (name, index, id) => {
      isDark.value = true;
      console.log("isDark", isDark);
      if (name == userInfo.value.nickName) {
        doneId.value = id;
        commentIndex.value = index;
        alertDialogDelete.value.open();
      }
    };
    const toPersonal = (openid2) => {
      common_vendor.index.navigateTo({
        url: `/pages/my/personal/personal?openid=${openid2}`
      });
    };
    common_vendor.onPullDownRefresh(() => {
      udb.value.reset();
      udb.value.refresh();
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    common_vendor.onReachBottom(() => {
      console.log("\u62C9\u5230\u5E95\u4E86", itemlist);
      udb.value.loadMore();
      console.log("\u4E91\u7AEF\u7684data", itemlist);
    });
    common_vendor.onShow(() => {
      console.log("loginstate.value:", loginstate.value);
      if (loginstate.value == 0)
        pages_api_getUser.getUser(loginstate, openid, userInfo);
    });
    pages_api_getUser.getUser(loginstate, openid, userInfo);
    common_vendor.watch(props.where, () => {
      udb.value.reset();
      udb.value.refresh();
    });
    common_vendor.watch(loginstate, () => {
      console.log("\u8BE5\u4E0A\u4F20\u6700\u65B0\u8054\u7CFB\u65B9\u5F0F\u4E86");
      common_vendor.pn.callFunction({
        name: "updateItemlistsConnect",
        data: {
          qq: userInfo.value.qq,
          wechat: userInfo.value.wechat,
          openid: openid.value
        },
        success: (res) => {
        }
      });
    });
    common_vendor.index.$on("update", function(data) {
      udb.value.reset();
      udb.value.refresh();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          error,
          options
        }, s0, i0) => {
          return common_vendor.e({
            a: itemlist.value = data
          }, (itemlist.value = data) ? {} : {}, {
            b: loading
          }, loading ? {} : {}, {
            c: common_vendor.f(itemlist.value, (data1, k1, i1) => {
              return common_vendor.e({
                a: common_vendor.f(data1.conlectList, (useritem, k2, i2) => {
                  return common_vendor.e({
                    a: useritem.useropenid == openid.value
                  }, useritem.useropenid == openid.value ? common_vendor.e({
                    b: data1.isConlect = true
                  }, (data1.isConlect = true) ? {} : {}) : {}, {
                    c: useritem.useropenid != openid.value && data1.isConlect != true
                  }, useritem.useropenid != openid.value && data1.isConlect != true ? common_vendor.e({
                    d: data1.isConlect = false
                  }, (data1.isConlect = false) ? {} : {}) : {}, {
                    e: useritem.useropenid
                  });
                }),
                b: data1.userHead,
                c: common_vendor.o(($event) => toPersonal(data1.userid)),
                d: common_vendor.t(data1.userId),
                e: common_vendor.t(data1.userTime),
                f: common_vendor.t(data1.userDescription),
                g: data1.isDone == true
              }, data1.isDone == true ? {} : {}, {
                h: common_vendor.n(data1.isDone ? "Donebgc" : ""),
                i: data1.itemimage1 != ""
              }, data1.itemimage1 != "" ? {
                j: data1.itemimage1,
                k: data1.itemimage1 != "",
                l: common_vendor.o(($event) => clickImg(data1.itemimage1)),
                m: data1.itemimage2,
                n: data1.itemimage2 != "",
                o: common_vendor.o(($event) => clickImg(data1.itemimage2)),
                p: data1.itemimage3,
                q: data1.itemimage3 != "",
                r: common_vendor.o(($event) => clickImg(data1.itemimage3))
              } : {}, (props.openid2 == null ? openid.value != 0 : props.openid != 0) ? common_vendor.e({
                s: props.openid2 == null ? data1.userid == openid.value : data1.userid == props.openid2
              }, (props.openid2 == null ? data1.userid == openid.value : data1.userid == props.openid2) ? {
                t: common_vendor.o(($event) => dialogToggle(data1._id, data1.isDone))
              } : {}, {
                v: props.openid2 == null ? data1.userid != openid.value : data1.userid != props.openid2
              }, (props.openid2 == null ? data1.userid != openid.value : data1.userid != props.openid2) ? {
                w: common_vendor.o(($event) => getConnect("bottom", data1.userWechat, data1.userQQ))
              } : {}, {
                x: data1.conlectList.length == 0,
                y: common_vendor.o(($event) => changeconlect(data1._id, data1.conlectNumber, false)),
                z: data1.isConlect == false && data1.conlectList.length != 0,
                A: common_vendor.o(($event) => changeconlect(data1._id, data1.conlectNumber, false)),
                B: data1.isConlect == true,
                C: common_vendor.o(($event) => changeconlect(data1._id, data1.conlectNumber, true)),
                D: data1.conlectList.length != 0
              }, data1.conlectList.length != 0 ? {
                E: common_vendor.t(data1.conlectList.length)
              } : {}, {
                F: data1.commentList.length != 0 && data1.commentState == 0
              }, data1.commentList.length != 0 && data1.commentState == 0 ? {
                G: common_vendor.t(data1.commentList.length)
              } : {}, {
                H: common_vendor.o(($event) => clickComment(data1._id, data.length)),
                I: data1.commentState == 0,
                J: data1.commentState == 0,
                K: data1.commentState == 1,
                L: common_vendor.o(($event) => cancelComment(data1._id)),
                M: data1.commentState == 1,
                N: common_vendor.o(test),
                O: common_vendor.o((...args) => _ctx.share && _ctx.share(...args)),
                P: common_vendor.o(test)
              }) : {}, {
                Q: common_vendor.t(data1.nowPrice == "" ? data1.nowPrice : `\xA5${data1.nowPrice}`),
                R: common_vendor.t(data1.oldPrice == "" ? data1.oldPrice : `\xA5${data1.oldPrice}`),
                S: common_vendor.t(data1.position),
                T: data1.commentState == 1,
                U: data1.commentState == 1,
                V: common_vendor.o(($event) => sendComment(data1._id, commentText.value, data1.commentList, data.length)),
                W: common_vendor.f(data1.commentList, (item2, k2, i2) => {
                  return common_vendor.e({
                    a: item2.responceId == ""
                  }, item2.responceId == "" ? {
                    b: common_vendor.t(item2.username)
                  } : {}, {
                    c: item2.responceId != ""
                  }, item2.responceId != "" ? {
                    d: common_vendor.t(item2.username),
                    e: common_vendor.t(item2.responceId)
                  } : {}, {
                    f: common_vendor.t(item2.content),
                    g: item2.index,
                    h: common_vendor.o(($event) => clickComment(data1._id, data.length, item2.username), item2.index),
                    i: common_vendor.o(($event) => deleteComment(item2.username, item2.index, data1._id), item2.index)
                  });
                }),
                X: data1.commentList.length != 0,
                Y: data1._id
              });
            }),
            d: i0,
            e: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "395c8614-0"
        }),
        b: props.openid2 == null ? openid.value != 0 : props.openid != 0,
        c: placeholder.value,
        d: commentText.value,
        e: common_vendor.o(($event) => commentText.value = $event.detail.value),
        f: common_vendor.sr(udb, "395c8614-0", {
          "k": "udb"
        }),
        g: common_vendor.p({
          collection: "Itemlists",
          ["page-size"]: 5,
          ["page-data"]: "add",
          orderby: "ordertime desc",
          where: props.where
        }),
        h: common_vendor.t(wechat.value),
        i: common_vendor.o(($event) => copy(wechat.value)),
        j: common_vendor.t(qq.value),
        k: common_vendor.o(($event) => copy(qq.value)),
        l: common_vendor.sr(popup, "395c8614-1", {
          "k": "popup"
        }),
        m: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        n: common_vendor.p({
          ["is-shadow"]: true
        }),
        o: common_vendor.sr(popup2, "395c8614-2", {
          "k": "popup2"
        }),
        p: common_vendor.p({
          ["background-color"]: "transparent",
          ["mask-click"]: false
        }),
        q: common_vendor.o(($event) => confirmDelete()),
        r: common_vendor.o(($event) => done(true)),
        s: common_vendor.p({
          type: "info",
          cancelText: "Done",
          confirmText: "\u5220\u9664",
          title: "\u63D0\u793A",
          content: "\u4F60\u60F3\u5982\u4F55\u5904\u7406\u8FD9\u6761\u4FE1\u606F"
        }),
        t: common_vendor.sr(alertDialog, "395c8614-4", {
          "k": "alertDialog"
        }),
        v: common_vendor.p({
          type: "dialog"
        }),
        w: common_vendor.o(($event) => confirmDelete()),
        x: common_vendor.o(($event) => done(false)),
        y: common_vendor.p({
          type: "info",
          cancelText: "\u4E0A\u67B6",
          confirmText: "\u5220\u9664",
          title: "\u63D0\u793A",
          content: "\u4F60\u60F3\u5982\u4F55\u5904\u7406\u8FD9\u6761\u4FE1\u606F"
        }),
        z: common_vendor.sr(alertDialogDone, "395c8614-6", {
          "k": "alertDialogDone"
        }),
        A: common_vendor.p({
          type: "dialog"
        }),
        B: common_vendor.o(($event) => confirmDeleteComment()),
        C: common_vendor.o(() => {
        }),
        D: common_vendor.p({
          type: "info",
          cancelText: "\u53D6\u6D88",
          confirmText: "\u5220\u9664",
          title: "\u63D0\u793A",
          content: "\u4F60\u60F3\u5220\u9664\u8FD9\u6761\u8BC4\u8BBA\u5417"
        }),
        E: common_vendor.sr(alertDialogDelete, "395c8614-8", {
          "k": "alertDialogDelete"
        }),
        F: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-395c8614"], ["__file", "C:/Users/86189/Desktop/\u524D\u7AEF\u9879\u76EE/ershoujiaoyi/pages/components/SearchList.vue"]]);
wx.createComponent(Component);
