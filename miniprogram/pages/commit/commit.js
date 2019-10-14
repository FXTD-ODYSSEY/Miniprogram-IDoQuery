// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "index": 0,
    "name": "",
    "major": "",
    "grade": "",
    "company": "",
    "job": "",
    "student": true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('guest').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        let data = res.data[0];
        if (data.student) {
          this.setData({
            "index": data.index,
            "name": data.name,
            "major": data.major,
            "grade": data.grade,
          })
        } else {
          this.setData({
            "student": false,
            "name": data.name,
            "index": data.index,
            "company": data.company,
            "job": data.job,
          })
        }
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },
  modifyData: function() {
    if (this.data.student) {
      wx.navigateTo({
        url: '../student/student?modify=true'
      })

    } else {
      wx.navigateTo({
        url: '../employee/employee?modify=true',
      })
    }

  }
})