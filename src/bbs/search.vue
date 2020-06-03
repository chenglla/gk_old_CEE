<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-box">
      <div class="bbs__search">
        <div class="bbs-return return-box">
          <div class="return__icon" @click="returnBack">
            <i class="iconfont iconleft-arrow"></i>
          </div>
          <search v-model="key" :placeholder="placeholder" @on-submit="searchKey" ref="search"></search>
        </div>  
      </div>
    </div>
    <bbs-list class="bbs-list__search"
      ref="list"
      :type="'search'"
      :list="list"
      :loading="loading"
      @nextPage="nextPage"
      @reList="reList"
    ></bbs-list>
  </div>
</template>
<script>
  import { Search } from 'vux'
  import searchTab from './searchTab'
  import bbsList from './bbsList'
  import { searchSchool } from '@/api/index.js'
  export default {
    components: { Search, searchTab, bbsList },
    data () {
      return {
        curTab: 'all',
        loading: false,
        key: '',
        placeholder: '搜索',
        list: [],
        query: {
          size: 0,
          bbsname: ''
        }
      }
    },
    computed: {
      toUrl () {
        return this.$store.state.user.returnUrl
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.search.isFixed = true
        this.$refs.search.isFocus = true
        this.$refs.search.isCancel = false
        this.$refs.search.setFocus()
        this.$refs.list.init()
      })
    },
    methods: {
      returnBack () {
        if (this.toUrl !== '') {
          this.$router.push({ path: this.toUrl })
        } else {
          this.$router.go(-1)
        }
      },
      // 加载下一页
      nextPage () {
        this.page++
        this.getList()
      },
      // 重新加载
      reList () {
        this.page = 0
        this.list = []
        this.getList()
        this.$nextTick(() => {
          this.$refs.list.init()
        })
      },
      // 搜索关键词
      searchKey (key) {
        this.page = 0
        this.query = {
          bbsname: key,
          page: this.page
        }
        this.list = []
        this.getList()
      },
      getList () {
        this.loading = true
        this.query.page = this.page
        searchSchool(this.query).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.list = this.list.concat(res.data.data)
          }
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
  .bbs-list__search .bbs-list {
    margin: 0 !important;
  }
</style>