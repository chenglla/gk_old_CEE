<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-box feedback-box">
      <div class="bbs__add">
        <div class="bbs-return return-box">
          <div class="return__icon" @click="gotoPage('/bbs/time')">
            <i class="iconfont iconleft-arrow"></i> 意见反馈
          </div>
        </div>
      </div>
    </div>
    <div class="feedback__content">
      <div class="feedback-textarea">
        <textarea v-model="ask" placeholder="请告诉我们您的意见或建议" class="feedback-size"></textarea>
        <div class="feedback-btn" @click="feedbackFn">发送</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { sendFeedback } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  export default {
    data () {
      return {
        ask: ''
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    methods: {
      // 去页面
      gotoPage (path) {
        this.$router.push({ path: path })
      },
      feedbackFn () {
        if (this.ask.trim() === '') {
          errorMsg(this, '不能为空')
          return
        }
        if (this.ask.trim().length < 10) {
          errorMsg(this, '圈子字数不能小于10个字')
          return
        }
        sendFeedback({
          openid: this.openid,
          ask: this.ask
        }).then(res => {
          this.gotoPage('/my')
        })
      }
    }
  }
</script>
<style lang="scss">
  .bbs-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
  }
  .feedback-box .bbs__add {
    height: 50px;
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  .bbs-return {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 50px;
    body &.return-box .return__icon.return__icon {
      color: #fff;
      font-size: 16px;
    }
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  .feedback__content {
    flex: 1;
    height: calc(100% - 50px);
    padding: 20px;
  }
  .feedback-textarea {
    padding: 20px 10px 60px 10px;
    box-shadow: 0 6px 7px #ddd;
    background: #fff;
    position: relative;
    textarea {
      border: 0;
      width: 100%;
      height: 300px;
      max-height: 100%;
    }
  }
  .feedback-btn {
    position: absolute;
    bottom: 20px;
    right: 30px;
    background: #9ba3c5;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
  }
  .feedback-size{
    font-size: large;
  }
</style>
