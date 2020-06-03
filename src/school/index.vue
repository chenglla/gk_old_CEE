<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="school-box">
      <div class="school__search">
        <div class="school-return return-box">
          <div class="return__icon" @click="gotoPage('home')">
            <i class="iconfont iconleft-arrow"></i>
          </div>
          <search v-model="key" @on-focus="gotoPage('search')" :placeholder="placeholder"></search>
        </div>
      </div>
      <search-tab
        @comSearch="comSearch"
        @changeTab="changeTab"
        :curTab="curTab"></search-tab>
    </div>
    <school-list
      ref="list"
      :list="list"
      :type="listType"
      :end="end"
      :loading="loading"
      :curTab="curTab"
      @nextPage="nextPage"></school-list>
  </div>
</template>
<script>
  import { Search } from 'vux'
  import searchTab from './searchTab'
  import schoolList from './schoolList'
  import { getAllSchool, comSearchApi } from '@/api/index.js'
  export default {
    components: { Search, searchTab, schoolList },
    data () {
      return {
        curTab: '',
        end: false,
        loading: false,
        key: '',
        placeholder: '搜索',
        list: [],
        req: {
          page: 0
        },
        page: 0
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      listType () {
        if (this.curTab === 'prov' || this.curTab === 'type') {
          return 'one'
        } else if (this.curTab === 'com') {
          return 'two'
        }
      }
    },
    created () {
      console.log('the hook of created is done!')
    },
    mounted () {
      this.curTab = this.$route.params.type
      this.clearQuery()
      this.loading = true
      this.getSchool()
      this.$nextTick(() => {
        this.$refs.list.init()
      })
    },
    activated () {
      if (this.list.length === 0) {
        this.loading = true
        this.getSchool()
      }
    },
    watch: {
      curTab () {
        this.clearQuery()
      }
    },
    methods: {
      clearQuery () {
        this.page = 0
        this.list = []
        this.end = false
        this.req = {
          page: 0
        }
        this.loading = true
      },
      // 去页面
      gotoPage (name) {
        this.clearQuery()
        this.curTab = 'all'
        this.$nextTick(() => {
          this.$router.push({ name: name })
        })
      },
      // 加载下一页
      nextPage () {
        this.page++
        this.getSchool()
      },
      // 获取列表，tab控制调哪个接口
      getSchool () {
        if (this.curTab === 'all') {
          // 全部
          this.getAllList()
        } else {
          // 带筛选
          this.getList()
        }
      },
      getAllList () {
        if (this.page === 0) {
          this.end = false
          this.list = []
        }
        getAllSchool({
          openid: this.openid,
          page: this.page
        }).then(res => {
          this.loading = false
          if (res.data && res.data.data && res.data.data.length < 20) {
            this.end = true
          }
          const schoolCode = this.list.map(item => item.schoolcode)
          // console.log('schoolCode', schoolCode)
          res.data.data.map(item => {
            if (schoolCode.indexOf(item.schoolcode) === -1) {
              this.list.push(item)
            }
          })
          this.list = this.list.sort((a, b) => {
            return Number(a.ranking) - Number(b.ranking)
          })
          console.log('学校列表信息：', this.list)
          this.$nextTick(() => {
            this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
          })
        })
      },
      getList () {
        this.req.openid = this.openid
        this.req.page = this.page
        if (this.page === 0) {
          this.end = false
        }
        comSearchApi(this.req).then(res => {
          this.loading = false
          if (res.data && res.data.data && res.data.data.length < 20) {
            this.end = true
          }
          const schoolCode = this.list.map(item => item.schoolcode)
          res.data.data.map(item => {
            if (schoolCode.indexOf(item.schoolcode) === -1) {
              this.list.push(item)
            }
          })
          this.list = this.list.sort((a, b) => {
            return Number(a.ranking) - Number(b.ranking)
          })
          this.$nextTick(() => {
            this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
          })
        })
      },
      // 切tab
      changeTab (tab) {
        this.curTab = tab
        this.clearQuery()
        this.$router.push({ name: 'school', params: { type: tab } })
      },
      // ？
      comSearch (obj) {
        this.req = obj
        this.list = []
        this.req.openid = this.openid
        this.req.page = 0
        this.page = 0
        this.loading = true
        comSearchApi(obj).then(res => {
          this.loading = false
          const schoolCode = this.list.map(item => item.schoolcode)
          console.log('xuexiao:', res.data)
          res.data.data.map(item => {
            if (schoolCode.indexOf(item.schoolcode) === -1) {
              this.list.push(item)
            }
          })
          this.$nextTick(() => {
            this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  .school-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);
    flex: none;
    z-index: 1;
  }
</style>
