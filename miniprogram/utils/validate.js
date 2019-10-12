const app = getApp()
module.exports = {
  getOpenID:  (callback) => {
    if (app.globalData.openid === undefined) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          callback(res.result.openid)
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          wx.showToast({
            icon: 'none',
            title: 'openID获取失败'
          })
        }
      })
    } else {
      callback(app.globalData.openid)
    }
  },
  inputValidate: (input, err_msg, callback) => {
    if (input.length === 0) {
      wx.showToast({
        title: err_msg,
        icon: 'none',
      })
      callback()
      return false
    } else {
      return true
    }
  }
}