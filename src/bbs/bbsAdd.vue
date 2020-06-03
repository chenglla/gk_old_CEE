<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-box bbs-add-box">
      <div class="bbs__add">
        <div class="bbs-return return-box">
          <div class="return__icon" @click="gotoPage('/bbs/time')">
            <i class="iconfont iconleft-arrow"></i> 发布圈子
          </div>
        </div>
      </div>
    </div>
    <div class="bbs-add__content">
      <div class="bbs-add-textarea">
        <textarea v-model="ask" placeholder="请发布你的圈子" class="bbs-add-size"></textarea>
        <div class="bbs-add-btn" @click="addBbsFn">发布</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { addBbs } from '@/api/index'
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
      addBbsFn () {
        if (this.ask.trim() === '') {
          errorMsg(this, '不能为空')
          return
        }
        if (this.ask.trim().length < 10) {
          errorMsg(this, '圈子字数不能小于10个字')
          return
        }
        addBbs({
          openid: this.openid,
          ask: this.ask
        }).then(res => {
          this.gotoPage('/bbs/time')
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
  .bbs-add-box .bbs__add {
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
  .bbs-add__content {
    flex: 1;
    height: calc(100% - 50px);
    padding: 20px;
  }
  .bbs-add-textarea {
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
  .bbs-add-btn {
    position: absolute;
    bottom: 20px;
    right: 30px;
    background: #9ba3c5;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
  }
  .bbs-add-size{
    font-size: large;
  }
</style>
