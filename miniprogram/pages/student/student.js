// pages/student/student.js
const validate = require('../../utils/validate.js')

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
    major_validate: "black",
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
    setTimeout(e => {
      this.setData({
        show_option: this.data.show ? "block" : "none"
      });
    }, 300)

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
  resetNameValidate() {
    this.setData({
      name_validate: "black",
    });
  },
  resetMajorValidate() {
    this.setData({
      major_validate: "black"
    });
  },


  // 表单上传
  formSubmit: function(e) {

    let username = e.detail.value.username;
    let major = e.detail.value.major;
    let grade = e.detail.value.grade;

    let check1 = validate.inputValidate(username, '请输入姓名', e => {
      this.setData({
        name_validate: "red"
      });
    })
    let check2 = validate.inputValidate(major, '请输入专业名称', e => {
      this.setData({
        major_validate: "red"
      });
    })

    if (check1 && check2) {

      wx.navigateToMiniProgram({
        appId: 'wxd947200f82267e58',
        path: "pages/wjxqList/wjxqList?activityId=46959014",
        success(res) {
          // 完成问卷跳转到确认页面
          wx.navigateTo({
            url: '../commit/commit'
          })
        },
        fail(res) {
          // 完成问卷跳转到确认页面
          wx.showToast({
            title: '报名失败 - 请允许跳转并完成问卷填写',
            icon: 'none',
          })
        }
      })

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})