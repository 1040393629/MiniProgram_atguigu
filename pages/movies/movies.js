// pages/movies/movies.js
const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250';
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: MOVIE_URL,
      success: (datas) =>{
        //获取数据
        this.setData({
          movieArr:datas.data.subjects
        });

        //把拿到的数据赋值给全局moviesArr
        appDatas.data.moviesArr = datas.data.subjects;
      }
    })
  },
})