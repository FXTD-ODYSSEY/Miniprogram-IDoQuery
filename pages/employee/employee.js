// pages/employee/employee.js

let app = getApp();

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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit: function(e) {
    wx.navigateTo({
      url: '../commit/commit'
    })
    // console.log(e.detail.value)
    // console.log(e.detail.value.username)
    // console.log(e.detail.value.tel)
    // console.log(e.detail.value.idcard)
    // console.log(e.detail.value.rank)
    // var that = this;
    // var username = e.detail.value.username;
    // var tel = e.detail.value.tel;
    // var idcard = e.detail.value.idcard;
    // var rank = e.detail.value.rank;
    // if (!(idcard.length === 15 || idcard.length === 18)) {
    //   wx.showToast({
    //     title: '请输入15或18位数身份证号码',
    //     duration: 2000
    //   })
    // } else {
    //   wx.request({
    //     method: "POST",
    //     url: "",
    //     data: {
    //       'username': username,
    //       'tel': tel,
    //       'idcard': idcard,
    //       'rank': rank
    //     },
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: function(res) {
    //       wx.showToast({
    //         title: '保存成功',
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
  }
})
