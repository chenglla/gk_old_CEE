<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="keepAlive"></router-view>
      <!--这里是会被缓存的组件-->
    </keep-alive>
    <router-view v-if="!keepAlive"></router-view>
    <router-view name="nav"></router-view>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import { getWx } from '@/api/index'
  // import wx from 'weixin-js-sdk'
  export default {
    name: 'app',
    data () {
      return {
        configContent: [],
        address: []
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      keepAlive () {
        return this.$route.meta.keepAlive || false
      }
    },
    watch: {
      '$route': function () {
        this.checkRedict()
      }
    },
    mounted () {
    // alert('appMountedCookieOpenid:' + document.cookie.split(';')[0].split('=')[1])
    // alert('appMountedLocalStorageOpenid:' + localStorage.openid)
      document.documentElement.style.fontSize = 14 * document.documentElement.clientWidth / 320 + 'px'
      if (localStorage.openid !== '') {
        this.$store.commit('SET_OPENID', localStorage.openid)
        // return
      }
    // if (localStorage.openid === undefined) {
    //   this.$store.commit('SET_OPENID', document.cookie.split(';')[0].split('=')[1])
    // }
      if (document.cookie.split(';')[0].split('=')[1] !== '') {
      // alert('if里面；' + document.cookie.split(';')[0].split('='))
        this.$store.commit('SET_OPENID', document.cookie.split(';')[0].split('=')[1])
      }
    // this.setWxjs()
    },
    methods: {
      checkRedict () {
        request({
          // url: 'http://zhiheyikaoqin.cn/cee/user/findUserInfo?openid=' + this.openid,
          url: 'user/findUserInfo?openid=' + this.openid,
          method: 'get'
        }).then(res => {
          if (res.data.code === 0) {
            this.$store.commit('SET_USER_NAME', res.data.data.userNickname)
            this.$store.commit('SET_USER_IMG', res.data.data.userHeaderimgurl)
            this.$store.commit('SET_INFO_OBJ', {
              prov: res.data.data.province || '',
              categ: res.data.data.category || '',
              batch: res.data.data.batch || ''
            })
            if (this.$route.name !== 'complete' && res.data.data.province === null && this.$route.name !== 'agent') {
              setTimeout(() => {
                this.$router.push({ path: '/complete' })
              }, 3000)
            }
          } else {
            if (this.$route.name !== 'complete' && this.$route.name !== 'agent') {
              setTimeout(() => {
                this.$router.push({ path: '/complete' })
              }, 3000)
            }
          }
        }).catch(res => {
          if (this.$route.name !== 'complete' && this.$route.name !== 'agent') {
            setTimeout(() => {
              this.$router.push({ path: '/complete' })
            }, 3000)
          }
        })
      },
      // setWxjs () { // 微信分享接口
      //   /* eslint-disable */
      //   var _this = this
      //   getWx().then(res => {
      //     if (res.data.code === 0) {
      //       const share = {
      //         title: res.data.data.title,
      //         desc: res.data.data.desc,
      //         link: res.data.data.link,
      //         imgUrl: res.data.data.imgUrl
      //       }
      //       wx.config({
      //         debug: true,
      //         appId: res.data.data.appId,
      //         timestamp: res.data.data.timestamp,
      //         nonceStr: res.data.data.nonceStr,
      //         signature: res.data.data.signature,
      //         jsApiList: ['checkJsApi', 'openLocation', 'getLocation', 'updateAppMessageShareData', 'updateTimelineShareData']
      //       })
      //       // console.log()
      //       wx.ready(() => {
      //         wx.checkJsApi({
      //           jsApiList: ['getLocation'],
      //           success: function (res) {
      //             //          alert(JSON.stringify(res));
      //             if (res.checkResult.getLocation === false) {
      //               alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
      //               return false
      //             }
      //           }
      //         })
      //         wx.getLocation({
      //           type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //           success: function (res) {
      //             // 将微信定位拿到的经纬度赋值给高德地图
      //             _this.lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //             _this.lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //             _this.mapCenter = [_this.lng, _this.lat];
      //             _this.showMap = false
      //             _this.loaded = true;
      //             var map = new AMap.Map('amap',{
      //               center:[111.740586, 40.854099],
      //               resizeEnable:true,
      //               zoom:10
      //             });
      //             console.log(map)
      //             var geocoder = new AMap.Geocoder({
      //               radius: 100,
      //               extensions: "all"
      //             });
      //             console.log(geocoder)
      //             // 将当前定位的坐标转换为地址信息
      //             geocoder.getAddress([_this.lng ,_this.lat], function(status, result) {
      //               if (status === 'complete' && result.info === 'OK') {
      //                 if (result && result.regeocode) {
      //                   _this.$nextTick(()=>{
      //                     console.log(result)
      //                     _this.address = result.regeocode.formattedAddress;
      //                   });
      //                 }
      //               }
      //             });
      //             console.log(latitude, longitude)
      //             alert(latitude + longitude)
      //             alert('位置：', res)
      //           },
      //           cancel: function (res) {
      //             alert('用户拒绝授权获取地理位置');
      //           }
      //         });
      //         wx.updateAppMessageShareData(share)
      //         wx.updateTimelineShareData(share)
      //       })
      //       wx.error(function (res) {
      //         alert('配置：' + res.errMsg);
      //       });
      //     }
      //   })
      //   /* eslint-enable */
      // },
      setWxjs () {
        let url = encodeURIComponent(window.location.href.split('#')[0])
        // alert('url是啥：' + url)
        // console.log('url是啥：' + url)
        this.$axios.get('http://zhongkeruitong.top/score_analysis/wechat/getSign?url=' + url).then(res => {
          if (res.data.code === 0) {
            this.configContent = res.data.data
            this.signWX()
          }
        })
      },
      signWX () {
        let _this = this
        // alert('appid'+this.configContent.appId+'signature'+this.configContent.signature+'nonceStr'+this.configContent.nonceStr+'jsapi_ticket'+this.configContent.jsapi_ticket+'url'+this.configContent.url)
        // this.configContent = JSON.stringify(this.configContent)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: this.configContent.appId, // 必填，公众号的唯一标识
          timestamp: this.configContent.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.configContent.nonceStr, // 必填，生成签名的随机串
          signature: this.configContent.signature, // 必填，签名
          jsApiList: ['checkJsApi', 'openLocation', 'getLocation', 'updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        })
        wx.checkJsApi({
          jsApiList: ['getLocation'],
          success: function (res) {
            // alert(JSON.stringify(res));
            if (res.checkResult.getLocation === false) {
              alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！')
              return false
            }
          }
        })
        wx.ready(function () {
          wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              // 获取经纬度
              var latLng = new qq.maps.LatLng(res.latitude, res.longitude)
              getAddr.getAddress(latLng)
            },
            cancel: function (res) {
              alert('用户拒绝授权获取地理位置')
              // that.getShopFjStudio()
            }
          })
        })
        wx.error(function (res) {
          console.log('微信js-sdk 配置失败000' + res.errMsg)
          // alert('微信js-sdk 配置失败000' + res.errMsg)
        })
        // 调取腾讯地图
        var getAddr = new qq.maps.Geocoder({
          complete: function (res) {
            _this.address = res.detail
            var allAddress = res.detail.addressComponents
            // _this.address = res.detail.nearPois
            var address = res.detail.address
            // alert('地址：' + JSON.stringify(_this.address))
            console.log('地址：', address, allAddress.province, allAddress.city, allAddress.district)
            // alert('地址：' + address + allAddress.province + allAddress.city + allAddress.district)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/index.scss'; // 全局自定义样式
  html, body,
  #app,
  .app-main {
    width: 100%;
    height: 100%;
    margin: 0;
    /*letter-spacing: 0.1em;*/
    font-family: 宋体,serif;
  }
  #app {
    display: flex;
    overflow: hidden;
  }
</style>
