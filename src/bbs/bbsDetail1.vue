<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-detail__return">
      <div class="bbs-return return-box">
        <div class="return__icon" @click="gotoPage()">
          <i class="iconfont iconleft-arrow"></i>
          圈子
        </div>
      </div>
    </div>
    <div class="bbs-detail__content" ref="bbsWrapper">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && noData">
        圈子是空的，请返回
      </div>
      <template v-if="!loading && !noData">
        <div class="bbs-item">
          <div class="bbs-base-box">
            <div class="bbs-item__info" style="float:left;">
              <div class="bbs-item__logo">{{username.substring(0, 1)}}</div>
              <div class="bbs-item__name">{{username}}</div>
            </div>
            <div @click="transshow" style="margin-left: 83%">
              <i class="iconfont iconiconfontmore">
                <Actionsheet v-model="showQA" :menus="menus1" @on-click-menu="click"></Actionsheet>
              </i>
            </div>
            <x-dialog v-model="showQT" @on-show="showJian" :hide-on-blur="hideOn"  dialog-width="100%" dialog-max-width="500px">
              <div class="check-item"
                v-for="item in options"
                :key="item.id"
                :class="{'active': item.key === flag}"
                @click="flag = item.key"
              >
                <i v-if="item.key === flag" class="iconfont icon103-copy"></i>
                <i v-else class="iconfont iconquan"></i>
                {{item.value}}
              </div>
              <div>
                <x-button type="default" text="确认" :plain="plain" @click.native="queRen" button-plain-warn-active-color="#fff" style="width: 50%;float: left"></x-button>
                <x-button type="default" text="取消" :plain="plain" @click.native="quXiao" style="width: 50%"></x-button>
              </div>
            </x-dialog>
            <div class="bbs-item__content" style="margin-top: 15px">{{ask}}</div>
            <div class="bbs-item__time">{{time}}</div>
            <div class="bbs-item__good">{{hot}}
              <i v-show="!istrue" @click="zan" class="iconfont iconxinaixin" ></i>
              <i v-show="istrue" @click="zan" class="iconfont iconxinaixin2" ></i>
<!--              <i v-if="!hasGood" @click="zan" class="iconfont iconxinaixin"></i>-->
<!--              <i v-if="hasGood" @click="zan" class="iconfont iconxinaixin2"></i>-->
            </div>
          </div>
          <div class="bbs-info-box">
            <div class="bbs-info-box-title">评论</div>
            <template v-if="infos.length === 0">
              <div class="list-no-data">暂无评论</div>
            </template>
            <div class="bbs-info__item" v-for="item in infos">
              <div>
                <div class="bbs-item__logo">{{item.username.substring(0, 1)}}</div>
                <div class="bbs-item__name">{{item.username}}</div>
                <div class="bbs-info__time">{{item.time}}</div>
              </div>
              <div @click="transPshow(item.openid)" style="margin-left: 3px">
                <i class="iconfont iconiconfontmore">
                  <Actionsheet v-model="showPA" :menus="menus2" @on-click-menu="clickP(item.id)" :show-cancel="true" @on-click-menu-cancel="quXiaoButton"></Actionsheet>
                </i>
              </div>
              <x-dialog v-model="showPT" @on-show="showJianP" :hide-on-blur="hideOn"  dialog-width="100%" dialog-max-width="500px">
                <Checklist :value="jubaoReason" :options="options" title="请选择举报原因" style="width: 100%" @on-change="changeP"></Checklist>
                <div>
                  <x-button type="default" text="确认" :plain="plain" @click.native="queRenP(item.id)" button-plain-warn-active-color="#fff" style="width: 50%;float: left"></x-button>
                  <x-button type="default" text="取消" :plain="plain" @click.native="quXiaoP" style="width: 50%"></x-button>
                </div>
              </x-dialog>
              <div class="bbs-item__content">{{item.ask}}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="bbs-info-my" :class="{'bbs-info-my--edit': edit}">
      <template v-if="!edit">
        <div class="bbs-edit-inline" @click="toggleEdit(true)">
          <input type="" name="" placeholder="请发表看法">
        </div>
      </template>
      <template v-else>
        <div class="bbs-edit-inline bbs-edit-box">
          <textarea ref="text" @blur="toggleEdit(false)" v-model="myInfo" @keyup.enter="feeback"></textarea>
        </div>
      </template>
      <div class="bbs-info-my-feeback" @click="feeback">发布</div>
    </div>
  </div>
</template>
<script>
  import _ from 'underscore'
  import BScroll from 'better-scroll'
  import { getBbsDetail, zan, feedbackBbs, deleteTakeQ, reportTakeQ, lookSensitive, reportTakeP, deleteTakeP } from '@/api/index.js'
  import { msg, errorMsg } from '@/utils/common'
  import { Actionsheet, XDialog, CheckIcon, Checklist, XButton } from 'vux'
  export default {
    components: {XButton, Actionsheet, XDialog, CheckIcon, Checklist},
    data () {
      return {
        plain: true,
        jubaoReason: [''],
        value: [],
        options: [],
        // checkicon: false,
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
        bbsId: '',
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
        take_openid: ''
      }
    },
    mounted () {
      this.getSensitive()
      this.bbsId = this.$route.params.id
      this.getBbsInfo()
      this.loading = true
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      takeid () {
        return this.$route.params.id || ''
      }
    },
    methods: {
      // quXiaoButton (key) {
      //   console.log('取消')
      //   this.showPA = false
      //   this.showPT = false
      // },
      clickP (id) {
        console.log(this.menus2['menus'])
        if (this.menus2['menus'] === '删除') {
          this.deleteP(id)
        }
        if (this.menus2['menus'] === '举报') {
          this.jubaoP()
        }
      },
      click (key) {
        console.log(key)
        if (key === 'menu1') {
          this.flag = ''
          this.jubaoQ()
        }
        if (key === 'menu2') {
          this.zan()
        }
        if (key === 'menu3') {
          this.deleteQ()
        }
        if (key === 'menu4') {
          this.showQA = false
        }
      },
      // change (key) {
      //   console.log('key:', key[0])
      //   // this.flag = 1 // ????
      //   this.flag = key[0]
      //   this.jubaoReason.push(key[0])
      // },
      // changeP (key) {
      //   // console.log('key:', key[0])
      //   // // this.flag = 1 // ????
      //   // this.flag = key[0]
      //   // this.jubaoReason.push(key[0])
      // },
      showJian () {
        console.log('弹窗可见触发。。。。。')
      },
      showJianP () {
        console.log('弹窗可见触发。。。。。')
      },
      getSensitive () {
        lookSensitive().then(res => {
          console.log(11111)
          console.log(res.data.data)
          this.options = res.data.data.map(item => ({
            key: item.id,
            value: item.text,
            id: item.id
          }))
          console.log(this.options)
        })
      },
      queRen () {
        if (this.jubaoReason.length > 0) {
          console.log(this.jubaoReason)
          this.sendJubao()
        }
      },
      quXiao () {
        this.showQT = false
        // this.showQA = true
      },
      queRenP (id) {
        console.log('评论举报')
        if (this.jubaoReason.length > 0) {
          console.log(this.jubaoReason)
          console.log('测试')
          this.sendJubaoP(id)
        }
      },
      quXiaoP () {
        this.showPT = false
      },
      jubaoP () {
        this.showPT = true
        this.showPA = false
      },
      sendJubao () {
        if (!this.showQT) {
          return
        }
        if (this.flag === '') {
          this.$vux.toast.text('请选择举报原因')
          return
        }
        reportTakeQ({
          openid: this.openid, takeid: this.takeid, flag: this.flag
        }).then(res => {
          if (res.data.code === 0) {
            this.$vux.toast.text('举报成功！')
            this.showQT = false
            console.log(this.value)
          }
        })
      },
      sendJubaoP (id) {
        if (!this.showPT) {
          return
        }
        if (this.flag === '') {
          this.$vux.toast.text('请选择举报原因')
          return
        }
        reportTakeP({
          openid: this.openid,
          takeinfoid: id,
          flag: this.flag
        }).then(res => {
          console.log(res.data.code)
          if (res.data.code === 0) {
            this.$vux.toast.text('举报成功！')
            this.showPT = false
            console.log(this.value)
          }
        })
      },
      jubaoQ () {
        this.showQT = true
        this.showQA = false
      },
      deleteQ () {
        deleteTakeQ({openid: this.openid, takeid: this.takeid}).then(res => {
          console.log(res.data.code)
          if (res.data.code === 0) {
            this.$vux.toast.text('删除成功！')
          }
        })
      },
      deleteP (id) {
        deleteTakeP({openid: this.openid, takeid: this.takeid, takeinfoid: id}).then(res => {
          console.log(res.data.code)
          if (res.data.code === 0) {
            this.$vux.toast.text('删除成功！')
            this.getBbsInfo()
          }
        })
      },
      transshow () {
        if (this.istrue) {
          if (this.take_openid === this.openid) {
            this.menus1 = {
              menu2: '取消赞',
              menu3: '删除',
              menu4: '取消'
            }
          } else {
            this.menus1 = {
              menu1: '举报',
              menu2: '取消赞',
              menu4: '取消'
            }
          }
        } else {
          if (this.take_openid === this.openid) {
            this.menus1 = {
              menu2: '点赞',
              menu3: '删除',
              menu4: '取消'
            }
          } else {
            this.menus1 = {
              menu1: '举报',
              menu2: '点赞',
              menu4: '取消'
            }
          }
        }
        console.log(this.istrue)
        // this.getBbsInfo()
        this.showQA = true
      },
      transPshow (id) {
        if (id === this.openid) {
          this.menus2 = {
            menus: '删除'
          }
        } else {
          this.menus2 = {
            menus: '举报'
          }
        }
        this.showPA = true
      },
      // 去页面
      gotoPage (name) {
        this.$router.go(-1)
      },
      // 获取圈子详情
      getBbsInfo () {
        this.loading = true
        getBbsDetail(this.bbsId, this.openid).then(res => {
          this.loading = false
          this.edit = false
          if (res.data.code === 0) {
            this.ask = res.data.data.takeDTO.ask
            this.take_openid = res.data.data.takeDTO.openid
            console.log('res.data.data.takeOpenid:', res.data.data.takeDTO.openid)
            console.log('this.openid:', this.openid)
            if (this.istrue) {
              if (res.data.data.takeDTO.openid === this.openid) {
                this.menus1 = {
                  menu2: '取消赞',
                  menu3: '删除',
                  menu4: '取消'
                }
              } else {
                this.menus1 = {
                  menu1: '举报',
                  menu2: '取消赞',
                  menu4: '取消'
                }
              }
            } else {
              if (res.data.data.takeDTO.openid === this.openid) {
                this.menus1 = {
                  menu2: '点赞',
                  menu3: '删除',
                  menu4: '取消'
                }
              } else {
                this.menus1 = {
                  menu1: '举报',
                  menu2: '点赞',
                  menu4: '取消'
                }
              }
            }
            // console.log(this.menus1)
            let items = []
            // console.log(res.data.data.takeInfos[0].takeInfo)
            for (items in res.data.data.takeInfos) {
              console.log('item:', items)
              console.log('items:', res.data.data.takeInfos[items].openid)
              console.log('this.openid:', this.openid)
              if (res.data.data.takeInfos[items].openid === this.openid) {
                this.menus2 = {
                  // menu1: '举报',
                  menus: '删除'
                  // menuq: '取消'
                }
              } else {
                this.menus2 = {
                  menus: '举报'
                  // menuq: '取消'
                }
              }
              // console.log(this.menus2)
            }
            this.username = res.data.data.takeDTO.username
            this.time = res.data.data.takeDTO.time
            this.hot = res.data.data.takeDTO.hot
            this.istrue = res.data.data.takeDTO.istrue
            this.infos = res.data.data.takeInfos || []
            if (this.infos.length !== 0) {
              this.infos.map(item => {
                console.log('item2:', item)
                if (item.createTime.toString().length === 13) {
                  item.time = (new Date(item.createTime)).toJSON().split('.')[0].replace('T', ' ')
                } else {
                  item.time = ''
                }
              })
            }
            this.hasGood = false
            this.$nextTick(() => {
              this.bbsScroll = new BScroll(this.$refs.bbsWrapper, {
                click: true
              })
              this.bbsScroll.refresh()
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
      // ss (value) {
      //   console.log(value)
      // },
      feeback () {
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
    height: calc(100% - 50px);
    background: #fff;
    word-break: break-word;
  }
  .bbs-item {
    margin: 0 0 10px 0;
    padding: 0;
    box-shadow: none;
  }
  .bbs-base-box,
  .bbs-info-box {
    padding: 16px 20px;
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
    margin-bottom: 10px;
    margin-right: -20px;
    padding-right: 20px;
  }
  .bbs-info__item .bbs-item__content {
    padding-left: 45px;
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
      z-index: 1;
    }
  }
  .check-item {
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
</style>
