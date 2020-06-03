~<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-box">
      <div class="bbs__add bbs_index">
        <div class="bbs-return return-box">
          <div class="return__icon" @click="gotoPage('home')">
            <i class="iconfont iconleft-arrow"></i>
          </div>
          <div class="bbs__add-btn" @click="gotoPage('bbsAdd')">
            <i class="iconfont iconiconjia"></i>
          </div>
        </div>
      </div>
      <bbs-tab
        @changeTab="changeTab"
        :curTab="curTab"></bbs-tab>
    </div>
    <bbs-list
      ref="list"
      :list="list"
      :loading="loading"
      :end="end"
      @change="getIndex"
      @nextPage="nextPage"></bbs-list>
  </div>
</template>
<script>
  import _ from 'underscore'
  import bbsTab from './bbsTab'
  import bbsList from './bbsList'
  import { getTimeBbs, getHotBbs, getMyBbs } from '@/api/index.js'
  export default {
    components: { bbsTab, bbsList },
    data () {
      return {
        curTab: '',
        loading: false,
        key: '',
        placeholder: '搜索',
        list: [],
        req: {
          page: 0
        },
        page: 0,
        end: false,
        index: 0,
        nowpage: 0
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      this.curTab = this.$route.params.type
      this.clearQuery()
      this.getBbs()
      this.loading = true
      this.$nextTick(() => {
        this.$refs.list.init()
      })
    },
    activated () {
      this.curTab = this.$route.params.type
      if (this.list.length === 0) {
        this.loading = true
        this.getBbs()
      }
    },
    // deactivated () {
    //   this.getBbs()
    //   // console.log(this.$refs.newList)
    //   // if (this.$refs.newList !== undefined && this.$refs.newList.style.transform !== '') {
    //   //   this.scrollTop = this.$refs.newList.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
    //   //   console.log(this.scrollTop)
    //   //   this.newsScroll = null
    //   // }
    // },
    watch: {
      '$route': _.debounce(function () {
        this.nowpage = Math.max(this.page, this.nowpage)
        this.page = Math.floor(this.index / 20)
        this.getBbs()
      }),
      // index () {
      //   this.nowpage = Math.max(this.page, this.nowpage)
      //   this.page = Math.floor(this.index / 20)
      // },
      curTab () {
        this.clearQuery()
        this.getBbs()
        this.loading = true
        this.$nextTick(() => {
          this.$refs.list.init()
        })
      }
    },
    methods: {
      getIndex (index) {
        this.index = index
      },
      clearQuery () {
        this.page = 0
        this.list = []
        this.req = {
          page: 0
        }
      },
      // 去页面
      gotoPage (name) {
        if (name === 'bbsAdd') {
          this.clearQuery()
          // this.curTab = 'my'
        }
        this.$router.push({ name: name })
      },
      // 加载下一页
      nextPage () {
        if (!this.end && !this.loading) {
          this.page = Math.max(this.nowpage, this.page)
          this.page++
          this.getBbs()
        }
      },
      // 获取列表，tab控制调哪个接口
      getBbs: _.debounce(function () {
        // console.log(this.page)
        if (this.curTab === 'time') {
          // 最新
          this.getTimeList()
        } else if (this.curTab === 'hot') {
          // 最热
          this.getHotList()
        } else if (this.curTab === 'my') {
          this.$router.push({ path: '/myqz' })
        }
      }, 300, true),
      getTimeList () {
        if (this.page === 0) {
          this.end = false
        }
        // console.log(this.page)
        getTimeBbs({
          page: this.page,
          openid: this.openid
        }).then(res => {
          this.loading = false
          if (res.data.data.length < 20) {
            this.end = true
          }
          // console.log('page', this.page)
          for (let i = 0; i < res.data.data.length; i++) {
            this.list.splice(this.page * 20 + i, 1, res.data.data[i])
          }
          console.log('list', this.list)
          // console.log('index', Math.floor(this.index / 20))
          this.$nextTick(() => {
            this.$refs.list.bbsScroll && this.$refs.list.bbsScroll.refresh()
          })
        })
      },
      getHotList () {
        if (this.page === 0) {
          this.end = false
        }
        getHotBbs({
          page: this.page,
          openid: this.openid
        }).then(res => {
          this.loading = false
          if (res.data.data.length < 20) {
            this.end = true
          }
          // this.list = this.list.concat(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            this.list.splice(this.page * 20 + i, 1, res.data.data[i])
          }
          console.log('list', this.list)
          this.$nextTick(() => {
            this.$refs.list.bbsScroll && this.$refs.list.bbsScroll.refresh()
          })
        })
      },
      getMyList () {
        if (this.page === 0) {
          this.end = false
        }
        getMyBbs({
          openid: this.openid,
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.data.data.length < 20) {
            this.end = true
          }
          // this.list = this.list.concat(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            this.list.splice(this.page * 20 + i, 1, res.data.data[i])
          }
          this.$nextTick(() => {
            this.$refs.list.bbsScroll && this.$refs.list.bbsScroll.refresh()
          })
        })
      },
      // 切tab
      changeTab (tab) {
        this.page = 0
        this.scrollTop = '0'
        if (tab === 'my') {
          this.$router.push({ name: 'myqz' })
        } else {
          this.curTab = tab
          this.$router.push({ name: 'bbs', params: { type: tab } })
        }
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
  .bbs__add {
    height: 12px;
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  .bbs_index .bbs-return {
    height: 0;
  }
</style>
