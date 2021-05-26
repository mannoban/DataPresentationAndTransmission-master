export const request = (url, data, method, success, fail, loading = true) => {
    if (loading) {
        // wx.showLoading({
        //     title: '正在加载中...',
        // });
    }
    let that = this;
    wx.request({
        url: "http://10.111.243.52:8888/smart_power_diagnosis_platform" + url,
        data: data,
        method: 'GET' || method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiIyNDI1NDYiLCJleHAiOjE2MjIwMzQ1ODZ9.CYcYABZDgCEdRZ_DXj1j2DuPgvLT31mYTvcaTDaLrKY" }, // 设置请求的 header
        success:
            function (res) {
                // success
                console.log("请求成功");
                console.log(res);
                success(res)
            },
        // fail:
        //     function (res) {
        //         // fail
        //         console.log("请求失败");
        //         console.log(res);
        //         fail(res)
        //     },
        complete: function () {
            // complete
            // wx.showLoading({
            //     title: '正在加载中...',
            // });
        }
    })
}