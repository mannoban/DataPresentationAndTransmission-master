// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
  },


  
  globalData: {
    userInfo: null,
    hostPre: "http://10.111.31.1:8888//smart_power_diagnosis_platform/",
    token: "",
  }
})
