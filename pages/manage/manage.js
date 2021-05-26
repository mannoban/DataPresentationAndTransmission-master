// pages/test/test.js
const { $Message } = require('../../dist/base/index');
const utils = require('../../components/request/request')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headerMsg: {
      status: "异常",
      siteCount: 0,
      transCount: 0,
      commonSiteCount: 0,
      errSiteCount: 0,
      repairCount: 0
    },
    message: [
      // {
      //   siteId: "01",
      //   location: "陕西科技大学站",
      //   transNumbers: 2,
      //   status: "正常"
      // },
      // {
      //   siteId: "02",
      //   location: "陕西科技大学站",
      //   transNumbers: 4,
      //   status: "正常"
      // },
      // {
      //   siteId: "03",
      //   location: "陕西科技大学站",
      //   transNumbers: 5,
      //   status: "正常"
      // },
      // {
      //   siteId: "04",
      //   location: "西安工业大学站",
      //   transNumbers: 6,
      //   status: "正常"
      // }
    ]
  },
  handleWarning() {
    $Message({
      content: '这是一条警告提醒',
      type: 'warning'
    });
  },


  // 查询搜索的接口方法
  search: function () {
    // 判断输入
    let pattern = /[\u4E00-\u9FA5\uf900-\ufa2d]/;
    let str = this.data.name
    if (!pattern.test(str)) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的站点名称"
      })
    } else {
      wx.navigateTo({
        url: '../detail/detail',
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
    }
  },

  // 跳转预警页面
  warning: function () {
    wx.switchTab({
      url: '../warn/warn',
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

  // 跳转详情页面
  goDetail: function () {
    wx.navigateTo({
      url: '../detail/detail',
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

  // 更改状态里的值
  /*   transformBool: function (obj) {
      console.log("====");
      console.log(obj);
      if (obj == "正常") {
        obj = true;
      } else {
        obj = false
      }
      return obj
    }, */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this; //解决this指向问题

    // 获取所有站点信息
    utils.request("/ele-site/get_all_siteinfo", this.data, 'GET', (res) => {
      const message = [];
      for (const item of res.data.data) {
        message.push({
          siteId: item.siteId,
          location: item.location,
          transNumbers: item.transNumbers,
          status: item.status
          // status: that.transformBool(item.status),
        });
      }
      that.setData({
        message: message
      })
    });

    // 顶部所有信息接口
    utils.request("/ele-site/getallstatus", this.data, 'GET', (res) => {
      that.setData({
        headerMsg: res.data.data
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