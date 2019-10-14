// pages/done/done.js
const validate = require('../../utils/validate.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    validate.getOpenID(id => {

      const db = wx.cloud.database()
      // 查询当前用户是否已经入库
      db.collection('guest').where({
        _openid: id
      }).count().then(res => {
        // 判断是否入库了
        if (!res.total) {
          // 回跳到首页
          wx.reLaunch({
            url: '../index/index'
          })
        } else {
          // NOTE 更新问卷完成状态
          db.collection('guest').where({
            _openid: id
          }).get({
            success: res => {
              if (!res.data[0].query) {
                db.collection('guest').doc(res.data[0]._id).update({
                  data: {
                    "query": true,
                  }
                })
              }
              wx.reLaunch({
                url: '../commit/commit'
              })

            },
            fail: err => {
              console.error('[数据库] [更新记录] 失败：', err)
            }
          })
        }

      })

    })

  },
})