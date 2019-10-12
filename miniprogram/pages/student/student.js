// pages/student/student.js
const app = getApp()
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
          // 记录数据到数据库中

          const db = wx.cloud.database()

          // 查询当前用户是否已经入库
          db.collection('guest').where({
            _openid: app.globalData.openid
          }).count().then(res => {
            // 判断是否入库了
            if (!res.total) {
              db.collection('guest').count().then(res => {

                db.collection('guest').add({
                  data: {
                    "index": res.total + 1,
                    "name": username,
                    "major": major,
                    "grade": grade,
                  },
                  success: res => {
                    console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                  },
                  fail: err => {
                    console.error('[数据库] [新增记录] 失败：', err)
                  }
                })

              })
            } 
            // else {
            //   db.collection('guest').where({
            //     _openid: app.globalData.openid
            //   }).get({
            //     success: res => {
            //       db.collection('guest').doc(res.data[0]._id).update({
            //         data: {
            //           "name": username,
            //           "major": major,
            //           "grade": grade,
            //         },
            //       })
            //     },
            //     fail: err => {
            //       console.error('[数据库] [查询记录] 失败：', err)
            //     }
            //   })
            // }

          })

        },
        fail(res) {
          // 完成问卷跳转到确认页面
          wx.showToast({
            title: '问卷跳转失败',
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
    validate.getOpenID(id => {
      this.setData({
        openid: id
      });
    })
  },
})