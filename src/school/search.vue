<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="school-box">
      <div class="school__search">
        <div class="school-return return-box">
          <div class="return__icon" @click="returnBack">
            <i class="iconfont iconleft-arrow"></i>
          </div>
          <search v-model="key" :placeholder="placeholder" @on-submit="searchKey" @on-cancel="searchKey" ref="search"></search>
        </div>  
      </div>
    </div>
    <school-list class="school-list__search"
      ref="list"
      :type="'search'"
      :list="list"
      :end="end"
      :loading="loading"
      @nextPage="nextPage"
      @reList="reList"
    ></school-list>
  </div>
</template>
<script>
  import { Search } from 'vux'
  import searchTab from './searchTab'
  import schoolList from './schoolList'
  import { searchSchool } from '@/api/index.js'
  export default {
    components: { Search, searchTab, schoolList },
    data () {
      return {
        curTab: 'all',
        end: false,
        loading: false,
        key: '',
        placeholder: '搜索',
        list: [],
        query: {
          size: 0,
          schoolname: ''
        }
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
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
        this.list = []
        this.key = ''
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
        this.loading = true
        this.getList()
        this.$nextTick(() => {
          this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
        })
      },
      // 搜索关键词
      searchKey (key) {
        this.page = 0
        this.query = {
          schoolname: key,
          openid: this.openid,
          page: this.page
        }
        this.list = []
        console.log(key)
        if (key !== undefined && key !== '') {
          this.loading = true
          this.getList()
        }
      },
      getList () {
        this.query.page = this.page
        if (this.page === 0) {
          this.end = false
        }
        searchSchool(this.query).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            if (res.data && res.data.data && res.data.data.length < 20) {
              this.end = true
            }
            this.list = this.list.concat(res.data.data)
            this.$nextTick(() => {
              this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
            })
          }
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
  .school-list__search .school-list {
    margin: 0 !important;
  }
</style>