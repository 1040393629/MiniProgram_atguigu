//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    msg: "广东汉子",
    userInfo: {},
    isShow: true
  },

  //生命周期函数 页面加载函数
  onLoad: function(options) {
    this.getUserInfo();
  },
  getUserInfo() {    //4.获取用户信息和判断用户是否授权写进一个函数里
      //1.获取用户信息
      wx.getUserInfo({
        success: (data) => {
          console.log(data); //用户数据存储在data.userInfo中

          //2.获取到用户信息存储到userInfo中
          this.setData({
            userInfo: data.userInfo
          });
        },
        fail: () => {
          console.log("获取用户信息失败");
        }
      });

      //3.判断用户是否授权 通过getSetting方法返回的authSetting中的scope.userInfo
      wx.getSetting({
        success: (data) => {
          if (data.authSetting['scope.userInfo']) { //用户授权了隐藏授权按钮
            this.setData({
              isShow: false
            });
            console.log(this.data.isShow);
          } else { //否则显示授权按钮
            this.setData({
              isShow: true
            });
          }
        }
      });
    },

  //5.判断用户是否运行授权
  handleUserInfo(data) {
    if (data.detail.rawData) { //如果存在rawData 则说明用户允许授权
      this.getUserInfo();
    }
  },

  //6.点击小程序之旅跳转页面
  handleClick(){
    console.log("点击了");
    wx.switchTab({
      url: '/pages/list/list',
    })
  }
})