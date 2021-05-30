const app = getApp()
export const request = (url, data, method, success, fail, loading = true) => {
    if (loading) {
        // wx.showLoading({
        //     title: '正在加载中...',
        // });
    }
    let that = this;
    wx.request({
        url: "http://www.zero-face.top:9999/smart_power_diagnosis_platform" + url,
        data: data,
        method: 'GET' || method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { "token": app.globalData.token }, // 设置请求的 header
        success:
            function (res) {
                // success
                success(res)
            },
        fail:
            function (res) {
                // fail
                fail(res)
            },
        // complete: function () {
        //     complete
        //     wx.showLoading({
        //         title: '正在加载中...',
        //     });
        // }
    })
}