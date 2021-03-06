//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);

        wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    console.log(res.code)
                    wx.request({
                        url: 'http://127.0.0.1:5000/userid',
                        method: 'POST',
                        data: {
                            code: res.code
                        },
                        header: {
                            // "content-type":"application/x-www-form-urlencoded"
                            'context-type': 'application/json;charset=utf-8',
                        },
                        success(res1) {
                            console.log(res1.data.token);
                            wx.setStorageSync('token', res1.data.token)
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        host:'http://127.0.0.1:5000'
    }
})