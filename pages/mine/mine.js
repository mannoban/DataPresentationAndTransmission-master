// index.js
// 获取应用实例
const app = getApp()
// let login = require("../../components/Login/login")

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    });
    // 登录
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       console.log(res.code);
    //       //发起网络请求
    //       wx.request({
    //         url: "http://10.111.243.52:8888/smart_power_diagnosis_platform/user-info/code",
    //         header: {
    //           "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         method: 'POST',
    //         data: {
    //           code: res.code
    //         },
    //         success: function (res) {
    //           const that = this
    //           console.log("======");
    //           console.log(res);
    //           console.log(res.data.data.token);
    //           if (res.data.status == "success") {
    //             let token = res.data.data.token;
    //             window.localStorage.setItem("token", token);
    //             console.log(token);
    //           }
    //         },
    //         fail: function (res) {
    //         }
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //   }
    // })
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})
