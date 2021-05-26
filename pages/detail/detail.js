// pages/charts/charts.js
const utils = require('../../components/request/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerMsg: {

    },
    message: [
      {
        trans_id: 1,
        status: 'true',
        temperature: '10℃',
        humidity: '20',
        smoke_concentration: '15',
        status_text: '异常'
      },
      {
        trans_id: 2,
        status: 'false',
        temperature: '10℃',
        humidity: '20',
        smoke_concentration: '15',
        status_text: '正常'
      },
      {
        trans_id: 3,
        status: 'true',
        temperature: '10℃',
        humidity: '20',
        smoke_concentration: '15',
        status_text: '异常'
      },
      {
        trans_id: 4,
        status: 'true',
        temperature: '10℃',
        humidity: '20',
        smoke_concentration: '15',
        status_text: '异常'
      }
    ]
  },
  goCharts: function (param) {
    wx.navigateTo({
      url: '../charts/charts',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 所有变压器信息
    utils.request("/trans-info/getlastinfo/1", this.data, 'GET', (res) => {
      that.setData({
        message: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})