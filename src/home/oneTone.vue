<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
      <div class="serviceInfo" ref="serviceInfo">
        <div>
          <div class="one-title">
            <span class="one-title__icon"></span>
            <span>一对一志愿填报服务</span>
            <span class="one-title__subtitle">- 中科智禾 出品</span>
            <span class="one-title__bacicon iconfont iconlaoshicopy"></span>
          </div>
          <div class="one-item">
            <p class="one__p--top">个性化、一对一的专家服务</p>
            <p class="one__p">从海量数据中汲取价值最大化的信息，特邀教育专家根据考生特点进行分析，量身订制一体化的指导推荐服务。</p>
          </div>
          <div class="one-item" v-if="show !== 0">
            <div v-if="show === 1">
              <div class="one-item__header">信息采集</div>
              <p style="margin-top: 10px" >为了精确的让专家了解考生情况并作出精准推荐，请下载下方word，如实填写个人信息。</p>
              <p>填写完成后您可以将该文件以姓名+一对一 .doc的命名格式发送至邮箱zkzh_edu@163.com。</p>
              <div @click="downloadExcel" class="one-item__btn">下载信息表</div>
              <p>将个人信息填写发送至指定邮箱后的一天内，您将收到简单版专家指导文档。</p>
              <p>若需要获取完整预测专家指导文档、电话联系专家沟通预测，需支付剩余尾款。</p>
              <p>如有疑问，请拨打客服电话。</p>
              <div @click="toPayWei" class="one-item__btn">付尾款</div>

            </div>
            <div v-else-if="show === 2">
              <div class="one-item__header">
                <i class="iconfont iconcheck35 one-item__ok"></i>
                支付成功，等待专家沟通
              </div>
              <div style="margin-top: 10px">
                <p>请及时查看您的邮件，同时确保您预留电话通畅，教育专家将会与您沟通。</p>
                <p>如有疑问，请拨打客服电话。</p>
              </div>
            </div>
          </div>

          <div class="one-item" >
            <div class="one-item__header">师资力量</div>
            <div style="text-indent: 2rem;margin-top: 7px">专家咨询推荐报考组由全国聘请知名专家教授组成，成员专家常年从事招生与推荐工作，历年辅导志愿填报无失误，是考生填报志愿的高级智囊团。</div>
          </div>

          <div class="one-item">
            <div class="one-item__header">服务流程</div>
            <div class="one-step">
              <div class="one-step__item">
                <span>支付服务定金</span>
              </div>
              <div class="one-step__item">
                <span >填写并发送个人信息至指定邮箱</span>
              </div>
              <div class="one-step__item">
                <span >获取简单版指导文档</span>
              </div>
              <div class="one-step__item">
                <span >支付服务尾款</span>
              </div>
              <div class="one-step__item">
                <span >获取完整版文档，专家在线电话沟通</span>
              </div>
            </div>
            <div class="one-item__header">服务费用</div>
            <div class="one__p one__fee">
              <p>服务总费用为6800元人民币，分两次交付。</p>
              <p>一期为200元定金，专家会通过邮件向您发送一份简单版报考指导文档。</p>
              <p>二期为6600元尾款，专家会发送完整版报考指导文档，同时请您保持电话畅通，专家致电您填写的联系电话，进一步沟通答疑。</p>
            </div>
          </div>

          <div class="one-item" v-if="show === 0">
            <div class="one-item__header">支付定金</div>
            <div v-if="show === 0">
              <div style="margin-top: 10px"  @click="toPayDing">
                <p>支付定金后，可以下载志愿填报表</p>
              </div>
              <div @click="toPayDing" class="one-item__btn">付定金</div>
            </div>
          </div>

          <div class="one-item">
            <div class="one-item__header">客服联系方式</div>
            <div class="one-kefu">
              <div>
                <i class="iconfont iconweibiaoti-"></i><span>电话：13381173397</span>
              </div>
              <div>
                <i class="iconfont icontubiao209"></i><span>邮箱 ：zkzh_edu@163.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>
<script>
  import fileurl from '@/assets/file/school_info.doc'
  import BScroll from 'better-scroll'
  import { errorMsg } from '@/utils/common'
  import { getPayStatus } from '@/api/index'
  export default {
    data () {
      return {
        fileurl: fileurl,
        serviceScroll: null,
        show: 0
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      this.init()
      this.getStatus()
      if (this.$route.query.pay !== undefined) {
        if (this.$route.query.pay.toString() === '1') {
          this.show = 1
        } else if (this.$route.query.pay.toString() === '0') {
          this.show = 0
          errorMsg(this, '付款失败')
        } else if (this.$route.query.pay.toString() === '2') {
          this.show = 2
        }
      }
    },
    methods: {
      getStatus () {
        getPayStatus(this.openid).then(res => {
          this.show = res.data.data || 0
          console.log(this.show)
        })
      },
      init () {
        this.$nextTick(() => {
          this.serviceScroll = new BScroll(this.$refs.serviceInfo, {
            click: true
          })
        })
      },
      gotoPage (name) {
        this.$router.push({name: name})
      },
      downloadExcel () {
        window.open(fileurl, '_blank')
      },
      toPayDing () {
        return false
        // location.href = 'http://www.zhongkeruitong.top:11030/cee/pay/advancePayment?openid=' + this.openid
      },
      toPayWei () {
        location.href = 'http://www.zhongkeruitong.top:11030/cee/pay/payment?openid=' + this.openid
      }
    }
  }
</script>
<style lang="scss" scoped>
  .oto-wrapper {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 56px;
  }
  .returnicon{
    position: relative;
    left: 15px;
    top: 6px;
    z-index: 9;
    padding: 8px 6px;
    color: #fff;
  }
  .serviceInfo {
    height: calc(100% - 60px);
    overflow: hidden;
  }
  .one-title {
    padding-top: 20px;
    text-align: center;
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
  }
  .one-title__subtitle {
    position: absolute;
    left: 50%;
    font-size: 13px;
    bottom: -24px;
    opacity: 0.3;
    font-weight: 400;
  }
  .one-title__icon {
    background: url('../assets/img/woshou.png') no-repeat;
    width: 40px;
    height: 40px;
    display: block;
    background-size: contain;
    position: absolute;
    left: 50%;
    margin-left: -140px;
  }
  .one-title__bacicon {
    position: absolute;
    right: 0;
    font-size: 60px;
    opacity: 0.2;
    top: 34px;
    color: #a3d4ff;
  }
  .one-item{
    background: #fff;
    padding: 16px;
    margin: 20px 20px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .one-step {
    margin-bottom: 20px;
  }
  .one__fee {
    margin-top: 10px;
  }
  .one__p--top {
    padding-left: 50px;
    line-height: 40px;
    position: relative;
    &:before {
      content: "\e66b";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      opacity: 0.2;
      padding-right: 10px;
      position: absolute;
      left: 24px;
      top: -10px;
    }
  }
  .one__p {
    display: block;
    line-height: 1.5;
  }
  .one-item__header {
    font-size: 15px;
    font-weight: bold;
  }
  .iconfont{
    margin: 0 10px;
  }
  .one-step__item {
    text-align: center;
    padding-top: 10px;
  }
  .one-step__item {
    position: relative;
    span {
      background: #a0abde26;
      padding: 2px 6px;
      border-radius: 6px;
    }
    & + & {
      padding-top: 30px;
      &:before {
         font-family: "iconfont" !important;
         font-size: 16px;
         font-style: normal;
         -webkit-font-smoothing: antialiased;
         content: "\e622";
         position: absolute;
         left: 50%;
         top: 4px;
         transform: rotate(90deg);
         color: #08d206;
       }
    }
  }
  .one-item__btn {
    width: 100%;
    text-align: center;
    border-radius: 4px;
    margin: 16px 0;
    background: rgba(52, 127, 244, 0.8);
    color: #fff;
    padding: 4px 0;
  }
  .one-item__ok {
    border-radius: 18px;
    background: #7cbb5a;
    color: #fff;
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: inline-block;
    text-align: center;
    line-height: 18px;
  }
  .one-kefu {
    margin: 10px auto;
    text-align: center;
    display: block;
    & > div {
      display: inline-block;
      width: 240px;
      text-align: left;
      margin-bottom: 10px;
    }
  }
</style>
