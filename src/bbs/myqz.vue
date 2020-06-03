<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="mybbs-info-wrapper">
      <div class="mybbs-info-return return-box">
        <div class="return__icon" @click="gotoPage">
          <i class="iconfont iconleft-arrow"></i>
        </div>
        <div class="mybbs-title">我发表的</div>
      </div>

        <div class="mybbs-tab">
          <div class="my-bbs-tab__item"
            v-for="(tab, tabIndex) in tabs"
            :class="{'active': tab === curTab}"
            :key="tab"
            @click="changeTab(tab, tabIndex)">{{tab}}</div>
        </div>
      <div class="mybbs-info-box" ref="content">
        <div>
          <div class="mybbs-item">
            <my-bbs-list
              :loading="loading"
              :type="listType"
              :title="curTab"
              :list="list"
            ></my-bbs-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { allBbs, allComment } from '@/api/index.js' // eslint-disable-line
  import BScroll from 'better-scroll'
  import myBbsList from './myBbsList'
  import _ from 'underscore'
  import { userGetDate } from '@/utils/common'
  export default {
    components: { myBbsList },
    data () {
      return {
        end: false,
        loading: false,
        page: 0,
        bbsScroll: null,
        curTab: '正在审核的圈子',
        checkingBbsList: [],
        failBbsList: [],
        passBbsList: [],
        checkingCommentList: [],
        failCommentList: [],
        passCommentList: [],
        checkingBbsTitle: '正在审核的圈子',
        failBbsTitle: '审核不通过的圈子',
        passBbsTitle: '审核通过的圈子',
        checkingCommentTitle: '正在审核的评论',
        failCommentTitle: '审核不通过的评论',
        passCommentTitle: '审核通过的评论',
        // tabs: ['审核中的圈子', '不通过的圈子', '通过的圈子', '审核中的评论', '不通过的评论', '通过的评论'],
        tabs: ['我的圈子', '我的评论'],
        listType: 'bbs',
        list: []
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      this.init()
      this.curTab = this.tabs[0]
      this.getTakelist(0)
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.bbsScroll = new BScroll(this.$refs.content, {
            click: true,
            pullDownRefresh: {
              threshold: 50,
              stop: 40
            },
            pullUpLoad: {
              threshold: 0,
              moreTxt: '加载中',
              noMoreTxt: '没有更多数据了'
            }
          })
          this.bbsScroll.on('pullingUp', (pos) => {
            this.nextPage()
            this.$nextTick(() => {
              this.bbsScroll.finishPullUp()
            })
          })
          this.bbsScroll.on('pullingDown', () => {
            this.reList()
            this.$nextTick(() => {
              this.bbsScroll.finishPullDown()
            })
          })
        })
      },
      nextPage: _.debounce(function () {
        console.log('dd')
        if (!this.end && !this.loading) {
          this.page++
          this.getBbs()
        }
      }, 50, true),
      reList: _.debounce(function () {
        // this.$emit('reList')
      }, 50, true),
      changeTab (tab, index) {
        this.curTab = tab
        this.getData(index)
      },
      getData (index) {
        this.page = 0
        this.getTakelist(index)
      },
      // 写的有问题，要改
      getTakelist (index) {
        if (index < 1) {
          this.listType = 'bbs'
        } else {
          this.listType = 'comment'
        }
        if (this.page === 0) {
          this.loading = true
        }
        if (index === 0) {
          allBbs({
          // passBbs({
            openid: this.openid,
            page: this.page
          }).then(res => {
            this.dealWithRes(res, 0)
          })
        } else if (index === 1) {
          allComment({
          // checkingComment({
            openid: this.openid,
            page: this.page,
            flag: 0
          }).then(res => {
            this.dealWithRes(res, 1)
          })
        }
      },
      // getTakelist (index) {
      //   if (index < 3) {
      //     this.listType = 'bbs'
      //   } else {
      //     this.listType = 'comment'
      //   }
      //   if (this.page === 0) {
      //     this.loading = true
      //   }
      //   if (index === 0) {
      //     checkingBbs({
      //       openid: this.openid,
      //       page: this.page
      //     }).then(res => {
      //       this.dealWithRes(res, 1)
      //     })
      //   } else if (index === 2) {
      //     passBbs({
      //       openid: this.openid,
      //       page: this.page
      //     }).then(res => {
      //       this.dealWithRes(res, 2)
      //     })
      //   } else if (index === 1) {
      //     failBbs({
      //       openid: this.openid,
      //       page: this.page
      //     }).then(res => {
      //       this.dealWithRes(res, 1)
      //     })
      //   } else if (index === 3) {
      //     checkingComment({
      //       openid: this.openid,
      //       page: this.page,
      //       flag: 1
      //     }).then(res => {
      //       this.dealWithRes(res, 3)
      //     })
      //   } else if (index === 4) {
      //     checkingComment({
      //       openid: this.openid,
      //       page: this.page,
      //       flag: 2
      //     }).then(res => {
      //       this.dealWithRes(res, 4)
      //     })
      //   } else if (index === 5) {
      //     checkingComment({
      //       openid: this.openid,
      //       page: this.page,
      //       flag: 0
      //     }).then(res => {
      //       this.dealWithRes(res, 5)
      //     })
      //   }
      // },
      dealWithRes (res, type) {
        this.loading = false
        if (this.page === 0) {
          this.list = []
          this.end = false
        }
        if (res.data.code === 0) {
          if (this.curTab === this.tabs[type]) {
            this.list = res.data.data.map(item => {
              if (item.createTime !== undefined) {
                item.time = userGetDate(new Date(item.createTime))
              }
              if (item.flag !== undefined) {
                const staMap = ['', 'checking', 'fail', 'del']
                item.status = staMap[item.flag]
              }
              // 0代表返回审核通过，1代表正在审核，2代表审核不通过，4代表圈子删除连带自己的信息一起被删除
              return item
            })
            if (res.data.data.length < 20) {
              this.end = true
            }
          }
        }
      },
      gotoPage () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss">
  .mybbs-info-wrapper {
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .mybbs-tab {
    background: #fbf9fe;
    padding: 10px 10px 0 10px;
    text-align: center;
  }
  .my-bbs-tab__item {
    padding: 4px 8px;
    display: inline-block;
    margin: 4px 8px 0 8px;
    font-size: 13px;
    border-bottom: 2px solid transparent;
    &.active {
      border-color: #5798ff;
      opacity: 1;
    }
  }

  .mybbs-info-box {
    position: relative;
    background: #fff;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 76px);
  }
  .mybbs-info-return {
    height: 56px;
    flex: none;
  }
  .mybbs-title {
    color: #fff;
    text-align: left;
    font-size: 14px;
    padding: 18px 40px;
  }
  .mybbs-item {
    padding-bottom: 20px;
  }
</style>
