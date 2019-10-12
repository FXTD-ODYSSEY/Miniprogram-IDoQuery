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
      wx.navigateTo({
        url: '../student/student'
      })
  },

  navigateToEmployee: function() {
    wx.navigateTo({
      url: '../employee/employee'
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

  

})