let utils = require('../../components/request/request')
// 获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    buttonBol: "block",
    display: "none",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onLoad: function () {
    let that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
            }
          })
        }
      }
    });
  },

  bindGetUserInfo(e) {
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      this.login(userInfo)
    }
    this.setData({
      userInfo: userInfo,
      display: "block",
      buttonBol: "none"
    })
    // console.log(this.data.userInfo);
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      fail: (res) => {

      }

    })
  },

  login: function (personObj) {
    let that = this
    wx.login({
      success: function (res) {
        // success
        wx.request({
          url: 'http://www.zero-face.top:9999/smart_power_diagnosis_platform/user-info/code',
          data: {
            code: res.code,
            avatarUrl: personObj.avatarUrl,
            nickName: personObj.nickName,
            language: personObj.language,
            province: personObj.province,
            city: personObj.city,
          },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded", //POST请求的时候这样写
          },
          success: function (res) {
            // console.log(res.data.data.openid);
            // console.log(res.data.data.token);
            app.globalData.token = res.data.data.token
          },
          fail: function () {
            // fail
          },
        })



      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }


})



