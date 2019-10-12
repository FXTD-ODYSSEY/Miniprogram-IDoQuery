// pages/employee/employee.js

const validate = require('../../utils/validate.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name_validate: "black",
    company_validate: "black",
    job_validate: "black",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 复原黑色
  resetNameValidate() {
    this.setData({
      name_validate: "black",
    });
  },
  resetCompanyValidate() {
    this.setData({
      company_validate: "black"
    });
  },
  resetJobValidate() {
    this.setData({
      job_validate: "black"
    });
  },

  formSubmit: function(e) {

    let username = e.detail.value.username;
    let company = e.detail.value.company;
    let job = e.detail.value.job;

    let check1 = validate.inputValidate(username, '请输入姓名', e => {
      this.setData({
        name_validate: "red"
      });
    })
    let check2 = validate.inputValidate(company, '请输入公司名称', e => {
      this.setData({
        company_validate: "red"
      });
    })
    let check3 = validate.inputValidate(job, '请输入岗位名称', e => {
      this.setData({
        job_validate: "red"
      });
    })

    if (check1 && check2 && check3) {
      
      wx.navigateToMiniProgram({
        appId: 'wxd947200f82267e58',
        path: "pages/wjxqList/wjxqList?activityId=46959595",
        success(res) {
          // 记录数据到数据库中

         
        },
        fail(res) {
          // 完成问卷跳转到确认页面
          wx.showToast({
            title: '问卷跳转失败',
            icon : 'none',
          })
        }
      })

    }
  }
})