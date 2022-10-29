"use strict";
var common_vendor = require("./vendor.js");
function call(option) {
  return new Promise((resolve, reject) => {
    if (!option.data)
      option.data = {};
    common_vendor.index.showLoading({
      title: "\u52A0\u8F7D\u4E2D"
    });
    common_vendor.pn.callFunction({
      name: option.name,
      data: option.data,
      success: (res) => {
        console.log(res);
        if (option.success)
          option.success(res);
        resolve(res);
      },
      fail: (err) => {
        console.log(err);
        if (option.fail)
          option.fail(err);
        reject();
      },
      complete: () => {
        common_vendor.index.hideLoading();
        if (option.complete)
          option.complete();
      }
    });
  });
}
var cloudApi = {
  call
};
exports.cloudApi = cloudApi;
