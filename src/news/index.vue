<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;background-color:#fff;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;line-height: 45px;text-align: center">
        高考资讯
      </div>
    </div>
    <div class="new_select">
<!--    <div style="background-color:#fff;border-bottom: 1px solid #ececec;z-index:20;position: fixed;width: 100%;">-->
      <popup-picker :data="[provinceList]" :value="province" @on-change="onChangePro" placeholder="请选择"></popup-picker>
<!--      <popup-picker title="地区" :data="[provinceList]" :value="province" @on-change="onChangePro" placeholder="请选择"></popup-picker>-->
    </div>
    <div class="news-list" :ref="'newsWrapper'">
      <div  class="news-list-wrapper" ref="newList">
        <div class="news-item" :class="{'news-img': item.articleImg && item.articleImg !== ''}"
             v-for="(item, index) in newsList"
             @click.stop="jumpToDetail(item.artId)"
            :key="index">
          <div class="title">{{item.title}}</div>
          <div class="author">{{item.articleSource}}</div>
          <div class="time">{{item.articleDate}}</div>
          <div class="img" v-if="item.articleImg && item.articleImg !== ''">
            <img :src="item.articleImg">
          </div>
          <div class="bbs-item_bottom">
            <span v-if="item.toTop === 1" class="top_one">
              置顶
            </span>
            <span>{{item.readnum}}人阅读</span>
<!--            <span @click.stop="gotoDian(1, item.artId, index)"><i class="iconfont iconup"></i></span>-->
<!--            <span @click.stop="gotoDian(1, item.artId)"><i class="iconfont iconup"></i>{{item.likenum}}</span>-->
<!--            <span @click.stop="gotoDian(0, item.artId, index)"><i class="iconfont iconcai1"></i></span>-->
<!--            <span @click.stop="gotoDian(0, item.artId)"><i class="iconfont iconcai1"></i>{{item.dontlikenum}}</span>-->
<!--            <span><i class="iconfont iconup"></i>{{item.likenum}}</span>-->
<!--            <span><i class="iconfont iconcai1"></i>{{item.dontlikenum}}</span>-->
            <span v-if="item.toTop === 1">
              <i class="iconfont iconremen2"></i>
            </span>
          </div>
<!--          <div class="feed">-->
<!--            <span @click.stop="gotoOption(1, item.artId)"><i class="iconfont iconup"></i>顶</span>-->
<!--            <span @click.stop="gotoOption(0, item.artId)"><i class="iconfont iconcai1"></i>踩</span>-->
<!--          </div>-->
        </div>
      </div>
      <template v-if="loading">
        <loading></loading>
      </template>
      <div class="no-course" v-if="!loading && noNews">
        <no-data :text="'当前没有技术资讯'"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'underscore'
  import bus from '@/eventBus.js'
  import {myInfo, articleFeed, getFeedNum, getArticleProvnceList, getArticleByProvnce} from '@/api/index'
  // import { Search } from 'vux'
  import BScroll from 'better-scroll'
  import request from '../utils/request'
  import noData from '../components/noData'
  import loading from '../components/loading'
  // import newsList from './newsList'
  export default {
    name: 'news',
    components: { noData, loading },
    data () {
      return {
        newsScroll: null,
        loading: false,
        newsList: [],
        page: 1,
        label: '',
        curTab: 'all',
        key: '',
        placeholder: '搜索',
        list: [],
        provinceList: [],
        province: [],
        menuNav: [{
          text: '推荐', id: '0'
        }, {
          text: '高考', id: '1'
        }, {
          text: '志愿', id: '2'
        }, {
          text: '心理', id: '3'
        }],
        scrollTop: ''
      }
    },
    computed: {
      noNews () {
        return this.newsList.length === 0
      },
      openid () {
        return this.$store.state.user.openid
      },
      toUrl () {
        return this.$store.state.user.returnUrl
      }
    },
    mounted () {
      this.$store.commit('SET_RETURN_URL', '/home')
      // this.page = 0
      this.label = this.menuNav[0].text
      // this.getList()
      this.getUserInfo()
      // this.getArticleProvnceList()
      // bus.$on('clearNews', () => {
      //   this.newsList = []
      //   this.page = 0
      //   this.scrollTop = '0'
      // })
    },
    activated () {
      if (this.newsList.length === 0) {
        this.loading = true
        // this.getList()
      } else {
        this._initScroll()
      }
      // bus.$on('clearNews', () => {
      //   this.newsList = []
      //   this.page = 0
      //   this.scrollTop = '0'
      // })
    },
    deactivated () {
      console.log(this.$refs.newList)
      if (this.$refs.newList !== undefined && this.$refs.newList.style.transform !== '') {
        this.scrollTop = this.$refs.newList.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
        console.log(this.scrollTop)
        this.newsScroll = null
      }
      bus.$off('clearNews')
    },
    // beforeDestory () {
    //   bus.$off('clearNews')
    // },
    methods: {
      returnBack () {
        this.newsList = []
        if (this.toUrl !== '') {
          this.$router.push({ path: this.toUrl })
        } else {
          this.$router.go(-1)
        }
      },
      getUserInfo () {
        myInfo(this.openid).then(res => {
          this.province.push(res.data.data.province || '暂无')
          this.newsList = []
          console.log(this.province)
          this.getArticleProvnceList()
          this.getArticleByProvnce()
        })
      },
      onChangePro (val) {
        this.province = val
        this.newsList = []
        this.getArticleByProvnce()
        console.log('pro:', val)
      },
      getArticleProvnceList () { // 获取资讯省份
        getArticleProvnceList().then(res => {
          if (res.data.code === 0) {
            this.provinceList = res.data.data
          }
          console.log(res.data)
        })
      },
      getArticleByProvnce (resolve) {
        this.loading = true
        getArticleByProvnce({
          openid: this.openid,
          province: this.province[0],
          page: this.page,
          pageSize: 20
        }).then(res => {
          if (resolve !== undefined) {
            resolve()
          }
          console.log(res.data)
          if (this.newsList.length === 0) {
            this.newsList = res.data.data.map(item => {
              return item
            })
            this.$nextTick(() => {
              this._initScroll()
            })
          } else {
            const title = this.newsList.map(item => item.title)
            res.data.data.map(item => {
              if (title.indexOf(item.title) === -1) {
                this.newsList.push(item)
              }
            })
            this.$nextTick(() => {
              this.newsScroll.refresh()
            })
          }
          this.loading = false
        })
      },
      gotoDian (val, id, index) {
        console.log(typeof val, val)
        articleFeed({
          openid: this.openid,
          artId: id,
          type: val
        }).then(res => {
          if (res.data.code === 0) {
            var ding = document.querySelectorAll('.iconup')
            var cai = document.querySelectorAll('.iconcai1')
            if (val === 0) { // 不喜欢
              cai[index].style.color = 'green'
            } else { // 喜欢
              ding[index].style.color = 'red'
            }
            // this.getList()
            // this.getFeedNum(id)
          }
          console.log('pinglun', res.data)
        })
      },
      getFeedNum (id) { // 获取阅读数以及顶和踩的数量
        getFeedNum({
          artId: id
        }).then(res => {
          this.numList = res.data.data
          console.log('数量：', res.data)
        })
      },
      changeTab (tab) {
        this.curTab = tab
      },
      _initScroll () {
        const start = this.scrollTop || 0
        this.newsScroll = new BScroll(this.$refs.newsWrapper, {
          startY: start,
          click: true,
          pullDownRefresh: {
            threshold: 50,
            stop: 40
          },
          pullUpLoad: {
            threshold: 50,
            moreTxt: '加载中',
            noMoreTxt: '没有更多数据了'
          }
        })
        this.newsScroll.on('pullingUp', () => {
          this.page++
          new Promise((resolve) => {
            // this.getList(resolve)
            this.getArticleByProvnce(resolve)
          }).then((newData) => {
            this.newsScroll && this.newsScroll.finishPullUp()
          })
        })
        this.newsScroll.on('pullingDown', () => {
          // this.page = 0
          console.log('pullingDown')
          new Promise((resolve) => {
            // this.getList(resolve)
          }).then((newData) => {
            this.newsScroll && this.newsScroll.finishPullDown()
          })
        })
        console.log(this.newsScroll)
      },
      changeLabel (item) {
        this.label = item.text
        // this.page = 0
        this.newsScroll.scrollTo(0, 0, 500)
        this.newsList = []
        // this.getList()
      },
      getList: _.debounce(function (resolve) {
        if (this.page === 0) {
          this.loading = true
        }
        request({
          url: 'article/getArticleList',
          // url: 'http://zhiheyikaoqin.cn/cee/article/getArticleList',
          method: 'post',
          data: {
            openid: this.openid,
            page: this.page,
            pageSize: 20,
            label: this.label
          }
        }).then(res => {
          // this.loading = false
          if (resolve !== undefined) {
            resolve()
          }
          // if (res.data && res.data.data && res.data.data.length < 20) {
          //   this.end = true
          // }
          // const title = this.newsList.map(item => item.title)
          // res.data.data.map(item => {
          //   if (title.indexOf(item.title) === -1) {
          //     this.newsList.push(item)
          //   }
          // })
          // this.newsList = this.newsList.sort((a, b) => {
          //   return Number(a.ranking) - Number(b.ranking)
          // })
          // this.$nextTick(() => {
          //   this.newsScroll.refresh()
          // })

          if (this.newsList.length === 0) {
            console.log('是否0', this.newsList.length)
            this.newsList = res.data.data.map(item => {
              return item
            })
            this.$nextTick(() => {
              this._initScroll()
            })
          } else {
            const title = this.newsList.map(item => item.title)
            res.data.data.map(item => {
              if (title.indexOf(item.title) === -1) {
                this.newsList.push(item)
              }
            })
            // this.newsList = this.newsList.concat(res.data.data.map(item => {
            //   return item
            // }))
            this.$nextTick(() => {
              this.newsScroll.refresh()
            })
          }
          console.log('资讯列表', this.newsList)
          this.loading = false
        })
      }, 50, true),
      jumpToDetail (id) {
        this.$router.push({ path: '/news/' + id })
      },
      gotoOption (val, artid) {
        console.log(typeof val, val)
        articleFeed({
          openid: this.openid,
          artId: artid,
          type: val
        }).then(res => {
          console.log('pinglun', res.data)
        })
      }
    }
  }
</script>

<style lang="scss"  scoped="">
  .check-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 45px;
  }
  .return__icon{
    margin-left: 10px;
    margin-top: 10px;
    color: #fff;
  }
  .new_select {
    width: 30%;
    position: absolute;
    z-index: 5;
    right: 5px;
    top: 5px;
  }
  /*.news-box {*/
  /*  position: relative;*/
  /*  height: calc(100% - 50px);*/
  /*  overflow: auto;*/
  /*  -webkit-overflow-scrolling: touch;*/
  /*  flex: 1;*/
  /*  .news__search{*/
  /*    width: 100%;*/
  /*    z-index: 500;*/
  /*    height: 8% ;*/
  /*    position: fixed;*/
  /*    top: 0px;*/
  /*    background: #647cfb;*/
  /*    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;*/
  /*  }*/
  /*}*/
  .news-list {
    margin-top: 10px;
    margin-bottom: 56px;
    height: calc(100% - 56px);
    .no-data {
      padding-top: 200px;
    }
  }
  .news-item {
    background: #fff;
    margin-bottom: 0px;
    padding: 10px 16px;
    position: relative;
    padding-right: 20px;
    &.news-img {
      min-height: 80px;
      padding-right: 120px;
      .img {
        position: absolute;
        width: 70px;
        height: 70px;
        right: 20px;
        top: 14px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .title {
      font-size: 16px;
    }
    .author,
    .time {
      margin-right: 10px;
      font-size: 12px;
      display: inline-block;
      color: #aaa;
    }
    .feed {
      margin-top: 3px;
      color: #aaa;
      .iconfont {
        font-size: 12px;
        margin-right: 5px;
      }
      span {
        font-size: 12px;
        margin-right: 10px;
      }
    }
    & + & {
      border-top: 1px solid #f5f5f5;
    }
  }
  .news-title {
    color: #fff;
    text-align: center;
    font-size: 16px;
    padding: 16px 10px 16px 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .bbs-item_bottom {
    margin-top: 2px;
    color: #aaa;
    font-size: 12px;
    /*display: flex;*/
    .iconfont {
      margin: 0 7px;
    }
    .top_one {
      color: #FF6666;
    }
    span {
      /*flex: 1;*/
      margin: 0 3px;
    }
    span:first-child {
      margin: 0;
      /*color: #FF6666;*/
      /*flex: 2;*/
    }
    span:nth-child(3) {
      /*margin-left: 30%;*/
      color: #FF6666;
    }
  }
</style>
<style>
  body .vux-cell-value {
     color: #fff;
  }
</style>
