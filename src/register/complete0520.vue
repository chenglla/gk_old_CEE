<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="complete-wrapper">
      <div class="complete-return return-box">
        <div class="return__icon" @click="gotoPage(-1)">
          <i class="iconfont iconleft-arrow"></i> 考生所在地信息
        </div>
      </div>
      <div class="complete-content" ref="completeContent">
        <div>
          <div class="complete-card">
            <i class="iconfont iconbianji"></i>
            <div class="info-item">
              <div class="info-item__value">
<!--                <x-address @on-hide="logHide" @on-show="logShow" title="地区" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="选择地址" :show.sync="showAddress"></x-address>-->
<!--                <x-address @on-hide="logHide" @on-show="logShow" title="地区" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></x-address>-->
                <popup-picker title="省份" :data="provList" v-model="province" @on-change="changeProv" @on-show="onShowPro" placeholder="选择省份"></popup-picker>
                <div @click="getLocation" class="location_info"><i class="iconfont iconlocation1"></i>{{location}}</div>
              </div>
            </div>
            <div class="info-item" v-if="showNewGK">
              <div class="info-item__value">
                <div class="selectInfo">选课信息</div>
                <p class="selectFirstInfo">首选科目</p>
                <div class="newGK">
                  <checker v-model="singleChoice" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
<!--                    <checker-item value="1">物理</checker-item>-->
<!--                    <checker-item value="2">历史</checker-item>-->
                    <checker-item value="物理">物理</checker-item>
                    <checker-item value="历史">历史</checker-item>
                  </checker>
                </div>
                <p class="selectFirstInfo">再选科目<span>(需要修改，先取消一个，再选另一个)</span></p>
                <div class="newGK">
                  <checker v-model="multipleChoice" :max="2" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                    <checker-item value="化学">化学</checker-item>
                    <checker-item value="生物">生物</checker-item>
                    <checker-item value="地理">地理</checker-item>
                    <checker-item value="思想政治">思想政治</checker-item>
<!--                    <checker-item value="1">化学</checker-item>-->
<!--                    <checker-item value="2">生物</checker-item>-->
<!--                    <checker-item value="3">地理</checker-item>-->
<!--                    <checker-item value="4">思想政治</checker-item>-->
                  </checker>
                </div>
                <!--              <popup-picker title="省份" :data="provList" v-model="province" @on-change="changeProv" placeholder="选择省份"></popup-picker>-->
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__value">
                <popup-picker title="类别" :data="cateList" v-model="category" @on-change="changeCate" placeholder="选择类别" @on-show="showCategory()"></popup-picker>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__value">
                <popup-picker title="批次" :data="batchList" v-model="batch" @on-change="changeBatch" placeholder="选择批次" @on-show="showBatch()"></popup-picker>
              </div>
            </div>
            <div class="info-item">
              <p style="font-size: 12px;font-family: KaiTi,serif">请填写您所在的省区及类别信息，便于提供精准服务!</p>
            </div>
            <div class="info-item">
              <div class="info-comfirm" v-if="pageType !== 'edit' && pageType !== 'predict'">
                <CheckIcon :value.sync="checkLincense"></CheckIcon>
                同意 <span class="info-confirm-link" @click="toggleLincese(true)">免责条款</span>
              </div>
              <div class="info-btn" @click="submit">提交</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ChinaAddressV4Data, Group, Selector, Checker, CheckerItem, CheckIcon, PopupPicker } from 'vux'
  import { getAllBatch, getAllCategory, getAllUserProvince, save, myInfo } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  import BScroll from 'better-scroll'
  export default {
    components: { Group, Selector, CheckIcon, PopupPicker, Checker, CheckerItem },
    data () {
      return {
        provList: [],
        cateList: [],
        batchList: [],
        province: [''],
        category: [''],
        batch: [''],
        value: [],
        showAddress: false,
        addressData: ChinaAddressV4Data,
        showNewGK: false, // 是否展示新高考
        singleChoice: '物理', // 单选结果
        multipleChoice: ['化学'], // 多选结果
        checkLincense: false,
        completeScroll: null,
        newGKList: ['北京', '上海', '浙江'],
        selectSubject: '',
        location: '正在定位',
        latitude: '', // 纬度
        longitude: '', // 经度
        getAddr: ''
      }
    },
    props: {
      show: Boolean,
      code: String
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      pageType () {
        return this.$route.query.type || ''
      }
    },
    mounted () {
      this.init()
      if (this.$store.state.user.locationInfo === '') {
        this.setWxjs()
      } else {
        this.location = this.$store.state.user.locationInfo
      }
      if (this.pageType === 'edit' || this.pageType === 'predict') {
        this.getUserInfo()
      } else {
        this.getList()
      }
    },
    methods: {
      gotoPage (name) {
        if (name === -1) {
          this.$router.go(-1)
        } else {
          this.$router.push({ name: name })
        }
      },
      init () {
        console.log('初始化：', this.$refs.completeContent)
        this.$nextTick(() => {
          this.completeScroll = new BScroll(this.$refs.completeContent, {
            click: true
          })
        })
      },
      getLocation () {
        // 获取经纬度
        // alert('获取经纬度！' + this.longitude + this.latitude)
        // console.log('获取经纬度！', this.longitude, this.latitude)
        const _this = this
        // wx.ready(function () {
          wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              _this.latitude = res.latitude
              _this.longitude = res.longitude
              console.log('纬经度：', _this.latitude, _this.longitude)
              // 获取经纬度
              var latLng = new qq.maps.LatLng(res.latitude, res.longitude)
              _this.getAddr.getAddress(latLng)
            },
            cancel: function (res) {
              _this.location = '重新定位'
              // _this.location = '定位失败'
              return false
              // alert('用户拒绝授权获取地理位置')
              // that.getShopFjStudio()
            }
          })
        // })
        // var latLng = new qq.maps.LatLng(this.latitude, this.longitude)
        // this.getAddr.getAddress(latLng)
      },
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
              _this.latitude = res.latitude
              _this.longitude = res.longitude
              console.log('纬经度：', _this.latitude, _this.longitude)
              // 获取经纬度
              var latLng = new qq.maps.LatLng(res.latitude, res.longitude)
              _this.getAddr.getAddress(latLng)
            },
            cancel: function (res) {
              _this.location = '重新定位'
              // alert('重新定位：' + JSON.stringify(res))
              // _this.location = '定位失败'
              return false
              // alert('用户拒绝授权获取地理位置')
              // that.getShopFjStudio()
            }
          })
        })
        wx.error(function (res) {
          console.log('微信js-sdk 配置失败000' + res.errMsg)
          // alert('微信js-sdk 配置失败000' + res.errMsg)
        })
        // 调取腾讯地图
        this.getAddr = new qq.maps.Geocoder({
          complete: function (res) {
            _this.address = res.detail
            var allAddress = res.detail.addressComponents
            // _this.address = res.detail.nearPois
            var address = res.detail.address
            _this.location = allAddress.province + allAddress.city + allAddress.district
            _this.$store.commit('SET_LOCATION', _this.location)
            // alert('地址：' + JSON.stringify(_this.address))
            _this.value = [allAddress.province + allAddress.city + allAddress.district]
            // _this.province = [allAddress.province]
            // alert(_this.province)
            console.log('地址：', address, allAddress.province, allAddress.city, allAddress.district)
            // alert('地址：' + address + allAddress.province + allAddress.city + allAddress.district)
          }
        })
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      logShow (str) {
        console.log('on-show')
      },
      doShowAddress () {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange (ids, names) {
        console.log(ids, names)
      },
      changeProv (value) {
        if (this.newGKList.indexOf(value[0]) > -1) {
          this.showNewGK = true
        } else {
          this.showNewGK = false
        }
        console.log(value[0])
      },
      changeCate (value) {
        console.log(value)
      },
      changeBatch (value) {
        console.log(value)
      },
      showCategory () {
        getAllCategory(this.province[0]).then(res => {
          this.cateList = [res.data.data]
        })
      },
      showBatch () {
        getAllBatch(this.province[0], this.category[0]).then(res => {
          this.batchList = [res.data.data]
        })
      },
      onShowPro () {
        // this.signWX()
      },
      toggleLincese (flag) {
        this.$vux.confirm.show({
          content: '使用提醒：在您使用高考预测系统前，请务必仔细阅读并透彻理解本声明。如果您使用本系统，您的行为将被视为对本声明全部内容的认可。若您使用本系统预测结果作为志愿填报，应当自行承担相应风险，我们不做任何形式的保证。中科智禾尊重并保护所有用户的个人隐私权，您个人资料，非经您亲自许可或根据相关法律、法规的强制性规定，不会主动地泄露给第三方。',
          onConfirm: () => {
            this.checkLincense = true
          }
        })
      },
      submit () {
        this.selectSubject = ''
        if (this.showNewGK === true) {
          this.selectSubject += this.singleChoice
          for (let i in this.multipleChoice) {
            this.selectSubject += ',' + this.multipleChoice[i]
          }
        }
        console.log('2222222', this.selectSubject, this.selectSubject.length)
        console.log('自选科目：', this.singleChoice, this.multipleChoice)
        const prov = this.province[0]
        const category = this.category[0]
        const batch = this.batch[0]
        if (prov === '') {
          errorMsg(this, '请选择省份')
          return
        }
        if (category === '') {
          errorMsg(this, '请选择类别')
          return
        }
        if (batch === '') {
          errorMsg(this, '请选择批次')
          return
        }
        if (!this.checkLincense) {
          errorMsg(this, '请同意免责条款')
          return
        }
        console.log('geihou', this.selectSubject.length)
        save({
          openid: this.openid,
          province: prov,
          category: category,
          batch: batch,
          subject: this.selectSubject
        }).then(res => {
        // save(this.openid, prov, category, batch).then(res => {
          if (res.data.code === 0) {
            if (this.pageType === 'predict') {
              this.$router.push({ name: 'predict' })
            } else {
              this.$router.push({ name: 'my' })
            }
          } else {
            errorMsg(this, res.data.msg)
          }
        })
      },
      getList () {
        getAllUserProvince().then(res => {
          this.provList = [res.data.data]
        })
      },
      getUserInfo () {
        myInfo(this.openid).then(res => {
          this.checkLincense = true
          if (res.data.code === 0) {
            this.batch = [res.data.data.batch || '暂无']
            this.category = [res.data.data.category || '暂无']
            this.province = [res.data.data.province || '暂无']
          }
          this.getList()
        })
      }
    }
  }
</script>
<style lang="scss">
  .complete-wrapper {
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    .vux-cell-box {
      border-bottom: 1px solid #4859ad;
    }
    .weui-cell {
      padding-left: 0;
      padding-right: 0;
    }
    .weui-label {
      color: #3c4677;
      font-size: 14px;
    }
    .weui-icon-circle,
    .weui-icon-success-circle,
    .weui-icon-success {
      font-size: 14px;
    }
    .vux-cell-value {
      font-size: 14px;
      padding-right: 20px;
    }
  }
  .complete-content {
    position: relative;
    margin-top: 7%;
    /*background: #fbf9fe;*/
    overflow: hidden;
    /*padding-top: 7%;*/
    height: calc(100% - 56px);
  }
  .info-comfirm {
    margin: 80px 0 20px;
    font-size: 13px;
    opacity: 0.8;
  }
  .info-item {
    margin-bottom: 15px;
    .newGK {
      margin-left: 40px;
    }
  }
  .selectInfo {
    font-size: 15px;
    font-weight: bold;
  }
  .selectFirstInfo {
    text-indent: 1.5em;
    margin: 7px 0;
    span {
      font-size: 11px;
    }
  }
  .complete-return {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);
    height: 56px;
  }
  .complete-card {
    overflow: hidden;
    position: relative;
    background: #fff;
    margin: 5px 20px 60px;
    padding: 10px 30px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    & > .iconfont {
      position: absolute;
      bottom: -10px;
      right: 10px;
      font-size: 80px;
      opacity: 0.3;
      color: #4859ae;
    }
  }
  .info-btn {
    background: #347ff4;
    color: #fff;
    width: 140px;
    margin: 20px auto 60px;
    text-align: center;
    border-radius: 4px;
    padding: 6px 10px;
  }
  .info-confirm-link {
    text-decoration: underline;
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    margin: 0 15px 8px;
    font-size: 13px;
  }
  .demo1-item-selected {
    border: 1px solid green;
  }
  .location_info {
    font-size: 12px;
    margin: 10px 5px 5px 0;
    i {
      margin-right: 5px;
      font-size: 14px;
    }
  }
</style>
