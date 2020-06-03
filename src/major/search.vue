<template>
  <div style="height: 100%;width: 100%;isplay:flex;flex-direction: column;">
    <div class="major-box">
      <div class="major__search">
        <div class="major-return return-box">
          <div class="return__icon" @click="returnBack">
            <i class="iconfont iconleft-arrow"></i>
          </div>
          <search v-model="key" :placeholder="placeholder" @on-submit="searchKey" @on-cancel="searchKey" ref="search"></search>
        </div>
      </div>
    </div>
    <sub-list class="major-list__search"
      ref="list"
      :list="list"
      :loading="loading"
      :end="end"
      @getCourses="getCourses"
      @nextPage="nextPage"
      @reList="reList"
    ></sub-list>
  </div>
</template>
<script>
  import { Search } from 'vux'
  import subList from './subList'
  import { searchMajor } from '@/api/index'
  export default {
    components: { Search, subList },
    data () {
      return {
        loading: false,
        key: '',
        placeholder: '搜索',
        list: [],
        query: {
          size: 0,
          name: ''
        },
        end: false
      }
    },
    computed: {
      toUrl () {
        return this.$store.state.user.returnUrl
      },
      majorCode () {
        return this.$route.params.majorname || ''
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
        this.$router.go(-1)
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
        this.end = false
        this.loading = true
        this.getList()
        this.$nextTick(() => {
          this.$refs.list.init()
        })
      },
      // 搜索关键词
      searchKey (key) {
        this.page = 0
        this.query = {
          name: key,
          page: this.page
        }
        this.list = []
        this.end = false
        if (key !== undefined && key !== '') {
          this.loading = true
          this.getList()
        }
      },
      getList () {
        this.query.page = this.page
        searchMajor(this.query).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.list = this.list.concat(res.data.data)
            if (res.data.data.length < 20) {
              this.end = true
            }
            this.$nextTick(() => {
              this.$refs.list.majorScroll && this.$refs.list.majorScroll.refresh()
            })
          } else {
            this.end = true
          }
        })
      },
      // 获取子专业
      getCourses (item) {
        this.$emit('getCourses', item)
      }
    }
  }
</script>

<style lang="scss">
  .major-wrapper {
    overflow: hidden;
  }
  .major-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
  }
  .major-list__search .major-list {
    margin: 0 !important;
  }
</style>
