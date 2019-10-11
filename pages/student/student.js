// pages/student/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_option: "none",
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['2016', '2017', '2018', '2019'], //下拉列表的数据
    index: 0, //选择的下拉列 表下标

    name_validate: "black",
    major_validate:"black",
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
      show_option: "block" ? this.data.show : "none"
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标

    this.setData({
      index: Index,
      show: !this.data.show,
    });
    // 隐藏下拉菜单
    setTimeout(e => {
      this.setData({
        show_option: "none"
      });
    }, 300)

  },

  // 复原黑色
  resetNameValidate(){
    this.setData({
      name_validate: "black",
    });
  },
  resetMajorValidate(){
    this.setData({
      major_validate: "black"
    });
  },


  // 表单上传
  formSubmit: function(e) {
    // wx.navigateTo({
    //   url: '../commit/commit'
    // })

    // console.log(e.detail.value.username)
    // console.log(e.detail.value.major)
    // console.log(e.detail.value.grade)
    let username = e.detail.value.username;
    let major = e.detail.value.major;
    let grade = e.detail.value.grade;

    if (username.length === 0) {
      
      // 标注红色
      this.setData({
        name_validate: "red"
      });

      wx.showToast({
        title: '请输入姓名',
        duration: 2000,
        icon: 'none',
      })
    } 
    
    if (major.length === 0) {
      
      // 标注红色
      this.setData({
        major_validate: "red"
      });

      wx.showToast({
        title: '请输入专业名称',
        duration: 2000,
        icon: 'none',
      })
    }

    // console.log(e.detail.value.rank)
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
    //     success: function (res) {
    //       wx.showToast({
    //         title: '保存成功',
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
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

  }
})