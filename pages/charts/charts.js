const utils = require('../../components/request/request')
let siteId; //站点id
let transId; //变压器id
// 获取屏幕像素比
const getPixelRatio = function () {
  let pixelRatio = 0;
  wx.getSystemInfo({
    success: function (res) {
      // success
      pixelRatio = res.pixelRatio
    }
  })
  return pixelRatio
};
let dpr = getPixelRatio()

import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr //解决Echarts模糊问题
  });

  var option = {
    title: {
      text: '',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['温度', '湿度', '烟雾']
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { type: ['line', 'bar'] },
        restore: {},
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '温度',
        type: 'line',
        data: [30, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      },
      {
        name: '湿度',
        type: 'line',
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [
            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' },
            [{
              symbol: 'none',
              x: '90%',
              yAxis: 'max'
            }, {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: '最大值'
              },
              type: 'max',
              name: '最高点'
            }]
          ]
        }
      },
      {
        name: '烟雾',
        type: 'line',
        data: [15, 18, 20, 19, 15, 18, 15],
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      },
    ]
  };

  // 变压器详细信息接口
  utils.request(`/trans-info/gethistoryinfo/${siteId}/${transId}`, '', 'GET', (res) => {
    let message = res.data.data;
    option.series[0].data = [...message.temperature];
    option.series[1].data = [...message.humidity];
    option.series[2].data = [...message.smokeConcentration];
    chart.setOption(option);
  })
  canvas.setChart(chart);
  return chart;
}

Page({
  data: {
    queryChart: {},//上一个页面传递的参数
    current: 0,  //当前所在页面的 index
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    imgUrls: [
      './list_img/01.png',
      './list_img/02.png',
      './list_img/03.png',
      './list_img/04.png',
    ],
    item: [

    ],
    links: [
      // '/pages/charts/charts',
    ],
    //轮播图的切换事件
    swiperChange: function (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },

    //点击指示点切换
    chuangEvent: function (e) {
      console.log("点击指示点切换");
      this.setData({
        swiperCurrent: e.currentTarget.id
      })
    },

    //点击图片触发事件
    swipclick: function (e) {
      wx.switchTab({
        url: this.data.links[this.data.swiperCurrent]
      })
    },
    ec: {
      onInit: initChart
    }
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function (options) {
  },


  onLoad: function (options) {
    let that = this;
    let queryChart = JSON.parse(options.queryChart);
    that.setData({
      queryChart: queryChart
    })
    siteId = that.data.queryChart.siteId
    transId = that.data.queryChart.transId;

    // 获取变压器实时图片接口
    utils.request(`/trans-info/gethistoryinfo/${siteId}/${transId}`, '', 'GET', (res) => {
      let message = res.data.data;
      let picUrl = message.picture;
      that.setData({
        imgUrls: [...message.picture],
      })
    })

  },

})
