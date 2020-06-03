<template>
  <div style="height: 100%;width: 100%;">
    <div class="bbs-detail__return">
      <div class="bbs-return return-box">
        <div class="return__icon" @click="gotoPage()">
          <i class="iconfont iconleft-arrow"></i>
          圈子
        </div>
      </div>
    </div>
    <div class="bbs-detail__content" ref="bbsWrapper">
      <div>
<!--      <div style="transform: none !important">-->
        <div class="list-loading" v-if="loading">
          <div class="loader"></div>
        </div>
        <div class="list-no-data" v-if="!loading && noData">
          圈子是空的，请返回
        </div>
        <template v-if="!loading && !noData">
          <div class="bbs-item" style="transform: none !important">
            <div class="bbs-base-box">
              <div class="bbs-item__info">
                <div class="bbs-ope">
                  <i class="iconfont iconiconfontmore" @click="openMenu('bbs', -1)"></i>
                </div>
                <div class="bbs-item__logo"><img :src="pic" alt=""></div>
<!--                <div class="bbs-item__logo">{{username.substring(0, 1)}}</div>-->
                <div class="bbs-item__name">{{username}}</div>
              </div>
              <div class="bbs-item__content">{{ask}}</div>
              <div class="bbs-item__time">{{time}}</div>
              <div class="bbs-item__good" @click="zan">
                {{hot}}
                <i v-if="!istrue" class="iconfont iconxinaixin"></i>
                <i v-else class="iconfont iconxinaixin2"></i>
              </div>
            </div>
            <div class="bbs-info-box">
              <div class="bbs-info-box-title">评论</div>
              <template v-if="infos.length === 0">
                <div class="list-no-data">暂无评论</div>
              </template>
              <div class="bbs-info__item" v-for="item in infos">
                <div class="bbs-info__header">
                  <div class="bbs-ope">
                    <i class="iconfont iconiconfontmore" @click="openMenu('comment', item)"></i>
                  </div>
<!--                  <jubao-->
<!--                    type="comment"-->
<!--                    :reportList="reportList"-->
<!--                    :isMy="isMyBbs"-->
<!--                    :isZan="istrue"-->
<!--                    :comid="item.id"-->
<!--                    :comopenid="item.openid"-->
<!--                    @refresh="getBbsInfo"-->
<!--                    @zan="zan"-->
<!--                  ></jubao>-->
                  <div class="bbs-item__logo"><img :src="item.pic" alt=""></div>
<!--                  <div class="bbs-item__logo">{{item.username.substring(0, 1)}}</div>-->
                  <div class="bbs-item__name">{{item.username}}</div>
                  <div class="bbs-info__time">{{item.createTime | formatDate }}</div>
                </div>
                <div class="bbs-item__content">{{item.ask}}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="bbs-info-my" :class="{'bbs-info-my--edit': edit}">
      <template v-if="!edit">
        <div class="bbs-edit-inline" @click="toggleEdit(true)">
          <span>请发表看法</span>
        </div>
      </template>
      <template v-else>
        <div class="bbs-edit-inline bbs-edit-box">
          <textarea ref="text" v-model="myInfo" @keyup.enter="feeback"></textarea>
        </div>
      </template>
      <div class="bbs-info-my-feeback" @click="feeback">{{fabu}}</div>
    </div>
    <actionsheet
      v-model="showMenu"
      :menus="menu"
      @on-click-menu="selMenu"
    ></actionsheet>
    <x-dialog
      v-model="jbDiag"
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
          <x-button type="warn" text="举报" @click.native="sendRep"></x-button>
<!--          <x-button type="warn" :text="repOkText" @click.native="sendRep"></x-button>-->
          <x-button type="default" text="取消" @click.native="jbDiag = false"></x-button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
  import _ from 'underscore'
  import BScroll from 'better-scroll'
  // import jubao from './jubao'
  import { getBbsDetail, zan, feedbackBbs } from '@/api/index'
  import { lookSensitive, deleteBbs, deleteComment, reportBbs, reportComment } from '@/api/bbs'
  import { msg, errorMsg } from '@/utils/common'
  import {formatDate} from '../utils/date.js'
  export default {
    // components: { jubao },
    data () {
      return {
        showMenu: false,
        reportList: [],
        plain: true,
        value: [],
        options: [],
        fabu: '发布',
        showQA: false,
        showPA: false,
        showPT: false,
        showQT: false,
        menus1: {},
        menus2: {},
        flag: 0,
        hideOn: true,
        noData: false,
        loading: false,
        hasGood: false,
        ask: '',
        username: '',
        time: '',
        hot: '',
        infos: [],
        edit: false,
        myInfo: '',
        istrue: false,
        faId: '',
        pingId: '',
        take_openid: '',
        takeinfoid: '',
        index: '',
        textareaEvt: null,
        bbsScroll: null,
        pic: '',
        detailTpye: 'bbs', // 默认是圈子
        jbDiag: false,
        repReason: '',
        comment: '', // 评论信息
        jbType: '', // 举报类型
      }
    },
    mounted () {
      console.log('柱子那个了')
      this.getSensitive()
      this.getBbsInfo()
      this.loading = true
      this.textareaEvt = this.$refs.bbsWrapper.addEventListener('click', this.textClickEvt)
      this.init()
    },
    beforeDestroy () {
      this.$refs.bbsWrapper.removeEventListener('click', this.textClickEvt)
      this.textareaEvt = null
    },
    filters: {
      formatDate (time) {
        const date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      bbsId () {
        return this.$route.params.id
      },
      isMyBbs () {
        return this.openid === this.take_openid
      },
      menu () {
        // return {delBbs: '删除圈子'}
        // console.log('comopenid:', this.comopenid)
        // console.log(this.openid)
        // const bbsZan = this.isZan ? '取消点赞' : '点赞'
        if (this.isMyBbs && this.detailTpye === 'bbs') {
          return { delBbs: '删除圈子' }
          // return { zan: bbsZan, delBbs: '删除圈子' }
        } else if (!this.isMy && this.detailTpye === 'bbs') {
          return { jbBbs: '举报圈子' }
          // return { zan: bbsZan, repBbs: '举报圈子' }
        } else if ((this.isMy && this.detailTpye === 'comment') || (this.comment.openid === this.openid && this.detailTpye === 'comment')) {
          return { delCom: '删除评论' }
        } else if (!this.isMy && this.detailTpye === 'comment') {
          return { jbCom: '举报评论' }
        }
      },
    },
    methods: {
      openMenu: _.debounce(function (val, com) {
        console.log('圈子还是评论：', val, com.openid, this.openid)
        this.detailTpye = val // 判断是圈子还是评论
        this.comment = com
        this.showMenu = true
      }, 100, true),
      selMenu (menu) {
        console.log('选择菜单：', menu)
        if (menu === 'zan') {
          this.$emit('zan')
        } else if (menu === 'delBbs') {
          this.sendDelBbs()
        } else if (menu === 'delCom') {
          this.sendDelCom()
        } else if (menu === 'jbBbs') {
          this.openRepDiag('bbs')
        } else if (menu === 'jbCom') {
          this.openRepDiag('comment')
        }
      },
      sendDelBbs: _.debounce(function () {
        deleteBbs({
          openid: this.openid,
          takeid: this.bbsId
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
          takeid: this.bbsId,
          takeinfoid: this.comment.id
        }).then(res => {
          if (res.data.code === 0) {
            this.$vux.toast.text('删除成功！')
            this.getBbsInfo()
            // this.$emit('refresh')
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      }, 500, true),
      openRepDiag (val) {
        console.log('举报', val)
        this.repReason = ''
        this.jbDiag = true
        this.jbType = val
      },
      sendRep () { // 举报
        console.log('jubaoleme:')
        if (this.repReason === '') {
          this.$vux.toast.text('请选择举报原因')
          return
        }
        if (this.jbType === 'bbs') {
          console.log('举报圈子')
          this.sendRepBbs()
        } else if (this.jbType === 'comment') {
          console.log('举报评论')
          this.sendRepCom()
        }
      },
      sendRepBbs () {
        reportBbs({
          openid: this.openid,
          takeid: this.bbsId,
          flag: this.repReason
        }).then(res => {
          if (res.data.code === 0) {
            this.$vux.toast.text('举报成功！')
            this.jbDiag = false
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      sendRepCom () {
        reportComment({
          openid: this.openid,
          takeinfoid: this.comment.id,
          flag: this.repReason
        }).then(res => {
          if (res.data.code === 0) {
            this.$vux.toast.text('举报成功！')
            this.jbDiag = false
            // this.$emit('refresh')
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getSensitive () { // 举报原因获取
        console.log('举报原因没有获取到：')
        lookSensitive().then(res => {
          this.reportList = res.data.data
        })
      },
      init () {
        this.$nextTick(() => {
          this.bbsScroll = new BScroll(this.$refs.bbsWrapper, {
            click: true
          })
        })
      },
      textClickEvt: _.debounce(function (e) {
        if (e.target.tagName !== 'TEXTAREA' && e.target.className !== 'bbs-info-my-feeback') {
          this.toggleEdit(false)
        }
      }, 200),
      // 去页面
      gotoPage () {
        this.$router.go(-1)
      },
      // 获取圈子详情
      getBbsInfo () {
        this.loading = true
        getBbsDetail(this.bbsId, this.openid).then(res => {
          this.loading = false
          this.edit = false
          if (res.data.code === 0) {
            console.log('44444444444', res.data)
            this.ask = res.data.data.takeDTO.ask
            this.pic = res.data.data.takeDTO.pic
            this.take_openid = res.data.data.takeDTO.openid
            this.username = res.data.data.takeDTO.username
            this.time = res.data.data.takeDTO.time
            this.hot = res.data.data.takeDTO.hot
            this.istrue = res.data.data.takeDTO.istrue
            this.infos = res.data.data.takeInfos || []
            // if (this.infos.length !== 0) {
            //   this.infos.map(item => {
            //     // console.log('item2:', item)
            //     if (item.createTime.toString().length === 13) {
            //       item.time = (new Date(item.createTime)).toJSON().split('.')[0].replace('T', ' ')
            //     } else {
            //       item.time = ''
            //     }
            //   })
            // }
            this.hasGood = false
            this.$nextTick(() => {
              this.bbsScroll = new BScroll(this.$refs.bbsWrapper, {
                click: true
              })
              // this.bbsScroll.refresh()
            })
          } else {
            msg(this, '圈子获取错误，请返回')
            this.noData = true
          }
        })
      },
      zan: _.debounce(function () {
        zan(this.openid, this.bbsId).then(res => {
          if (res.data.code === 0) {
            this.istrue = res.data.data.istrue
            this.hot = res.data.data.count
          }
          return false
        })
      }, 500, true),
      toggleEdit (flag) {
        this.edit = flag
        if (flag) {
          this.myInfo = ''
          this.$nextTick(() => {
            this.$refs.text.focus()
          })
        }
      },
      feeback () {
        this.fabu = '发布中'
        const tmp = this.myInfo
        if (this.myInfo.length < 10) {
          errorMsg(this, '评论字数不能小于10个字')
          this.$nextTick(() => {
            this.toggleEdit(true)
            this.myInfo = tmp
            this.$nextTick(() => {
              this.$refs.text.focus()
            })
          })
          return
        }
        feedbackBbs({
          openid: this.openid,
          ask: this.myInfo,
          takeid: this.bbsId
        }).then(res => {
          if (res.data.code === 0) {
            this.fabu = '发布'
            this.getBbsInfo()
          } else {
            errorMsg(this, res.data.msg)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*.bbs-item{*/
  /*  transform: unset !important;*/
  /*}*/
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
  .bbs-detail__content {
    flex: auto;
    height: calc(100% - 76px);
    background: #fff;
    word-break: break-word;
    overflow: hidden;
  }
  .bbs-item {
    margin: 0 0 10px 0;
    padding: 0;
    box-shadow: none;
  }
  .bbs-base-box,
  .bbs-info-box {
    padding: 16px 20px;
    position: relative;
  }
  .bbs-ope {
    position: absolute;
    right: 20px;
  }
  .bbs-info-box {
    border-top: 10px solid #ddd;
  }
  .bbs-info-box-title {
    font-weight: bold;
    color: #4f5b63;
    margin-bottom: 14px;
  }
  .bbs-info__item {
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    margin-right: -20px;
    padding-right: 20px;
    padding-bottom:6px;
    .bbs-item__logo,
    .bbs-item__name {
      margin-bottom: 0;
    }
  }
  .bbs-item__logo {
    height: 35px;
    width:35px;
    img {
      height: 100%;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .bbs-info__header {
    position: relative;
  }
  .bbs-info-my {
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ddd;
    width: 100%;
    left: 0;
    height: 40px;
    background: #fff;
    &.bbs-info-my--edit {
      height: 100px;
    }
    .bbs-edit-inline {
      padding: 10px 50px 10px 10px;
      textarea {
        border: 0;
        resize: none;
        width: 100%;
        height: 80px;
      }
      input {
        border: 0
      }
    }
    .bbs-info-my-feeback {
      position: absolute;
      right: 4px;
      bottom: 4px;
      color: #9aa3c5;
      padding: 4px 8px;
      z-index: 9;
    }
  }
  .actionStyle{
    position: absolute;
    z-index: 1000;
    height: 100px;
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
