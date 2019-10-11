//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  navigateToStudent: function () {
    wx.navigateTo({
      url: '../student/student'
    })
  },
  navigateToEmployee: function () {
    wx.navigateTo({
      url: '../employee/employee'
    })
  },
  onLoad: function () {


    // console.log(wx)
    // console.log(app)
    // const db = wx.cloud.database()
    // db.collection('test').get({
    //   success: console.log,
    //   fail: console.error
    // })

    // if (app.globalData.userInfo) {
    //   console.log("app.globalData.userInfo")
    //   console.log(app.globalData.userInfo)
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     console.log("res.userInfo")
    //     console.log(res.userInfo)
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // }

  },

})
