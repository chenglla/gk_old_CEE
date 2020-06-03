<template>
  <div class="jubao-box">
    <div class="bbs-ope">
      <i class="iconfont iconiconfontmore" @click="openMenu"></i>
      <actionsheet
        v-model="showMenu"
        :menus="menu"
        @on-click-menu="selMenu"
      ></actionsheet>
    </div>
    <x-dialog
      v-model="repDiag"
      :hide-on-blur="true"
      dialog-width="100%"
      dialog-max-width="500px">
      <div class="report-box">
        <div class="report-item"
          v-for="item in reportList"
          :key="item.id"
          :class="{'active': item.id === repReason}"
          @click="repReason = item.id">
          <i v-if="item.id === repReason" class="iconfont icon103-copy"></i>
          <i v-else class="iconfont iconquan"></i>
          {{item.text}}
        </div>
        <div class="report-btns">
          <x-button type="warn" :text="repOkText" @click.native="sendRep"></x-button>
          <x-button type="default" text="取消" @click.native="repDiag = false"></x-button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
  import { deleteBbs, deleteComment, reportBbs, reportComment, lookSensitive } from '@/api/bbs.js' // eslint-disable-line
  import { Actionsheet, XDialog, CheckIcon, Checklist, XButton } from 'vux' // eslint-disable-line
  import _ from 'underscore'

  export default {
    components: { XButton, Actionsheet, XDialog, CheckIcon, Checklist },
    data () {
      return {
        showMenu: false,
        repDiag: false,
        repReason: ''
      }
    },
    props: {
      reportList: Array,
      type: String,
      isMy: Boolean,
      isZan: Boolean,
      // isMyP: Boolean,
      comid: Number, // 评论id
      comopenid: String
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      takeid () {
        return this.$route.params.id || ''
      },
      menu () {
        console.log('comopenid:', this.comopenid)
        console.log(this.openid)
        const bbsZan = this.isZan ? '取消点赞' : '点赞'
        if (this.isMy && this.type === 'bbs') {
          return { zan: bbsZan, delBbs: '删除圈子' }
        } else if (!this.isMy && this.type === 'bbs') {
          return { zan: bbsZan, repBbs: '举报圈子' }
        } else if ((this.isMy && this.type === 'comment') || (this.comopenid === this.openid && this.type === 'comment')) {
          return { delCom: '删除评论' }
        } else if (!this.isMy && this.type === 'comment') {
          return { repCom: '举报评论' }
        }
      },
      repOkText () {
        if (this.type === 'comment') {
          return '举报评论'
        } else if (this.type === 'bbs') {
          return '举报圈子'
        }
      }
    },
    mounted () {
    },
    methods: {
      openMenu () {
        this.showMenu = true
      },
      selMenu (menu) {
        if (menu === 'zan') {
          this.$emit('zan')
        } else if (menu === 'delBbs') {
          this.sendDelBbs()
        } else if (menu === 'delCom') {
          this.sendDelCom()
        } else if (menu === 'repBbs') {
          this.openRepDiag()
        } else if (menu === 'repCom') {
          this.openRepDiag()
        }
      },
      openRepDiag () {
        this.repReason = ''
        this.repDiag = true
      },
      sendRep () {
        if (this.repReason === '') {
          this.$vux.toast.text('请选择举报原因')
          return
        }
        if (this.type === 'bbs') {
          this.sendRepBbs()
        } else if (this.type === 'comment') {
          this.sendRepCom()
        }
      },
      sendRepBbs () {
        reportBbs({
          openid: this.openid,
          takeid: this.takeid,
          flag: this.repReason
        }).then(res => {
          if (res.data.code === 0) {
            this.$vux.toast.text('举报成功！')
            this.repDiag = false
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      sendRepCom () {
        reportComment({
          openid: this.openid,
          takeinfoid: this.comid,
          flag: this.repReason
        }).then(res => {
          if (res.data.code === 0) {
            this.$vux.toast.text('举报成功！')
            this.$emit('refresh')
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      sendDelBbs: _.debounce(function () {
        deleteBbs({
          openid: this.openid,
          takeid: this.takeid
        }).then(res => {
          // console.log('删除是走这里了么：')
          if (res.data.code === 0) {
            this.$vux.toast.text('删除成功！')
            setTimeout(() => {
              this.$router.go(-1)
            }, 500)
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      }, 100, true),
      sendDelCom: _.debounce(function (id) {
        deleteComment({
          openid: this.openid,
          takeid: this.takeid,
          takeinfoid: this.comid
        }).then(res => {
          if (res.data.code === 0) {
            this.$vux.toast.text('删除成功！')
            this.$emit('refresh')
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      }, 500, true)
    }
  }
</script>
<style lang="scss" scoped="">
  .jubao-box {
    position: absolute;
    right: 0;
    top: 6px;
  }
  .report-item {
    padding: 4px;
    text-align: left;
    padding-left: 30px;
    position: relative;
    color: #333;
    .iconfont {
      top: 2px;
      position: absolute;
      left: 8px;
    }
  }
  .report-box {
    padding: 20px;
  }
  .report-btns {
    margin: 20px 0 10px;
  }
</style>
