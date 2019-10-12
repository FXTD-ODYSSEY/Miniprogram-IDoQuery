module.exports = {
  inputValidate: (input, err_msg, callback) => {
    if (input.length === 0) {
      wx.showToast({
        title: err_msg,
        icon: 'none',
      })
      callback()
      return false
    } else {
      return true
    }
  }
}