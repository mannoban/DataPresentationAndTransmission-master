const { $Message } = require('../../dist/base/index');
const utils = require('../../components/request/request')
Page({
  data: {
    visible2: false,
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: false,
    toggle2: false,
    actions2: [
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],
    actions: [
      {
        name: '已解决',
        color: '#fff',
        fontsize: '20',
        width: 100,
        background: '#ed3f14'
      }
    ],

    warn_message: [
      {
        transId: '01',
        location: '陕西省西安市未央区',
        errMsg: '温度'
      },
      {
        transId: '02',
        location: '北京市朝阳区',
        errMsg: '湿度'
      },
      {
        transId: '03',
        location: '陕西省西安市未央区',
        errMsg: '烟雾'
      },
      {
        transId: '04',
        location: '陕西省西安市未央区',
        errMsg: '温度'
      }
    ]
  },
  handleCancel2() {
    this.setData({
      visible2: false,
      toggle: this.data.toggle ? false : true
    });
    console.log(this.data.toggle, 111111111)
  },
  handleClickItem2() {
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
      actions2: action
    });

    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        visible2: false,
        actions2: action,
        toggle: this.data.toggle ? false : true
      });

    }, 2000);
  },

  // 发送已解决请求
  handlerCloseButton(e) {
    // 删除前端数据
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let warn_message = this.data.warn_message;
    warn_message.splice(index, 1)
    this.setData({
      warn_message: warn_message,
      toggle2: this.data.toggle2 ? false : true
    });
  },
  actionsTap() {
    this.setData({
      visible2: true
    });
  },
  // 跳转详情页面
  goCharts: function (e) {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this; //解决this指向问题
    // 预警信息接口
    utils.request("/transfrom/getwarntrans", this.data, 'GET', (res) => {
      that.setData({
        warn_message: res.data.data
      })
    })
  }

});



