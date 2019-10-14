// pages/employee/employee.js

const validate = require('../../utils/validate.js')
let app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name_validate: "black",
    company_validate: "black",
    job_validate: "black",
    modify: false,
    query_btn: "填写问卷",
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

    if (options.modify == "true") {
      this.setData({
        modify: true,
        query_btn: "提交修改",
      });
    } else {
      this.setData({
        modify: false,
        query_btn: "填写问卷",
      });

    }

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
      if (this.data.modify) {
        db.collection('guest').where({
          _openid: app.globalData.openid
        }).get({
          success: res => {
            db.collection('guest').doc(res.data[0]._id).update({
              data: {
                "name": username,
                "company": company,
                "job": job,
              },
              success: res => {
                wx.reLaunch({
                  url: '../commit/commit'
                })
              }
            })
          },
          fail: err => {
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
      } else {

        wx.navigateToMiniProgram({
          appId: 'wxd947200f82267e58',
          path: "pages/wjxqList/wjxqList?activityId=46959595",
          success: (res) => {

            // 查询当前用户是否已经入库
            db.collection('guest').count().then(res => {
              // 判断是否入库了
              if (!res.total) {
                db.collection('employee').count().then(res => {

                  db.collection('guest').add({
                    data: {
                      "index": "B" + (res.total + 1),
                      "name": username,
                      "company": company,
                      "job": job,
                      "student": false,
                      "query": false,
                    },
                    success: res => {
                      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                      console.log(this)
                      this.goBackHome()
                    },
                    fail: err => {
                      console.error('[数据库] [新增记录] 失败：', err)
                    }
                  })

                  db.collection('employee').add({
                    data: {

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
              // NOTE 已经存在则忽略
              else {
                db.collection('guest').where({
                  _openid: app.globalData.openid
                }).get({
                  success: res => {
                    db.collection('guest').doc(res.data[0]._id).update({
                      data: {
                        "name": username,
                        "company": company,
                        "job": job,
                      },
                      success:this.goBackHome
                    })
                  },
                  fail: err => {
                    console.error('[数据库] [查询记录] 失败：', err)
                  }
                })
              }

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

    }
  },
  goBackHome: function () {
    // 回到首页
    wx.navigateBack({
      delta: 2222,
      complete: res => {
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })
  }
})