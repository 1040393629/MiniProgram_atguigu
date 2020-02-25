// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
let appDatas = getApp();
console.log(appDatas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    isCollected:false,
    index:0,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  //options获取到从list传递来的index,进行赋值
    let index = options.index;
    this.setData({
      detailObj:datas.list_data[options.index],
      index
    });

    //3.获取本地缓存数据
    let storageObj = wx.getStorageSync("isCollected");

    //4. 如果刚上来为空 要给缓存初始化一个空对象 才能进行对象操作
    if (!storageObj) {
      wx.setStorageSync("isCollected", {});
    }

    //5.根据本地缓存数据判断用户是否收藏
    if (storageObj[options.index]){    //收藏了
       this.setData({
         isCollected:true
       });
    }

    //5.一打开页面需要判断页面是否在播放 及时切换对应的图片和按钮
    if (appDatas.data.isPlay && appDatas.data.pageIndex == index){
      this.setData({
        isMusicPlay:true
      })
    }

    //3.监听音乐播放
    wx.onBackgroundAudioPlay(()=>{   //音乐播放
      //切换对应的背景图片
      this.setData({
        isMusicPlay:true
      });

    //4.当音乐播放时候 后退从新进入的时候 修改appDatas的值 切换对应的背景和图标
    appDatas.data.isPlay = true;
    appDatas.data.pageIndex = index;
    })
    wx.onBackgroundAudioPause(()=>{    //音乐暂停
      this.setData({
        isMusicPlay: false
      });
    appDatas.data.isPlay = false;   //修改appDatas值
    })
  },

  //1.点击收藏事件
  handleCollection(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    })
    let title = isCollected?"收藏成功":"取消收藏";
    wx.showToast({
      title,
      icon:"success"
    });

    //2.点击收藏按钮将数据缓存到本地  key:vaule{0:false,1:true}
    let{index} = this.data;
    wx.getStorage({
      key: 'isCollected',
      success: function(datas) {
        let obj = datas.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success:() =>{
            console.log("缓存成功");
          }
        });
      },
    })
  },

  //点击音乐播放事件
  handleMusicPlay(){
    //1.获取标识符 控制暂停播放图标切换
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    });

    //2.控制音乐播放
    if(isMusicPlay){
      console.log("音乐播放");
      //获取数据
      let { dataUrl,title } = this.data.detailObj.music;
      console.log(dataUrl,title);
      wx.playBackgroundAudio({   //播放音乐 
        dataUrl,
        title
      });
    }else {                      //暂停音乐
      wx.pauseBackgroundAudio();
    }
  },

  //点击分享事件
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈','分享到qq空间','分享到微博'
      ],
    })
  }
})