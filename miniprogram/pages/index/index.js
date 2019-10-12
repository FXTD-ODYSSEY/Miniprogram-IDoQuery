//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //页面跳转函数
  navigateToStudent: function() {
    // 调用云函数 获取 openid 再跳转
    this.getOpenID(e => {
      wx.navigateTo({
        url: '../student/student'
      })
    })
  },

  navigateToEmployee: function() {
    // 调用云函数 获取 openid 再跳转
    this.getOpenID(e => {
      wx.navigateTo({
        url: '../employee/employee'
      })
    })
  },

  onLoad: function() {

    // NOTE 是否已经微信登录
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }

    // const db = wx.cloud.database()
    // db.collection('test').get({
    //   success: console.log,
    //   fail: console.error
    // })
    // 查询数据库 判断用户是否已经填写问卷
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counters').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        // wx.showToast({
        //   icon: 'none',
        //   title: '查询记录失败'
        // })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },

  getUserInfo: function(e) {
    // NOTE 没有获取授权跳过
    if (e.detail.userInfo === undefined) return

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getOpenID: function(callback) {
    if (app.globalData.openid === undefined) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          callback()
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
      callback()
    }
  }

})