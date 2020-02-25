// pages/moviesDetail/moviesDetail.js
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moiveDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      moiveDetail:appDatas.data.moviesArr[options.index]
    })
  },
})