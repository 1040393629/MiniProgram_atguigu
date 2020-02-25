// pages/list/list.js
let datas = require('../../datas/list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      datas:datas.list_data
    })
  },

  toDetail(e) {  //获取点击页面的标识符   e.currentTarget.dataset.index为标识符
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index='+ index,
    });
  },

  //点击轮播图跳转详情页事件
  swiperDetail(e) {    //标识符存放到target里面
    let index = e.target.dataset.index;
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    });
  },
})