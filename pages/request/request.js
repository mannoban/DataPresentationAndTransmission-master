

export const request = (url, data, method, success, fail, loading = true) => {
    // 加载中
    if (loading) {
        wx.showLoading({
            title: '正在加载中...',
        });
    }
    wx.request({
        url: "http://10.111.31.1:8888//smart_power_diagnosis_platform" + url,
        data: data,
        method: method || 'GET',
        header: { "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiIyNDI1NDYiLCJleHAiOjE2MjIwMzQ1ODZ9.CYcYABZDgCEdRZ_DXj1j2DuPgvLT31mYTvcaTDaLrKY" },
        success: (res) => {
            console.log("请求成功");
            console.log(res);
        },

        fail: (res) => {
            console.log("请求失败");
            console.log(res);
        },

        complete: () => {
            wx.hideLoading();
        }
    })
}
