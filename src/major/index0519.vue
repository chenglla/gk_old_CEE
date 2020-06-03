<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="major-box">
      <div class="major__search">
        <div class="major-return return-box">
          <div class="return__icon" @click="returnBack">
            <i class="iconfont iconleft-arrow"></i>
          </div>
          <search v-model="key" @on-focus="gotoPage('majorSearch')" :placeholder="placeholder"></search>
        </div>
      </div>
    </div>
    <major-list
      ref="list"
      :list="list"
      :loading="loading"
      @getCourses="getCourses"
      @nextPage="nextPage"
    ></major-list>
  </div>
</template>
<script>
  import { Search } from 'vux'
  import majorList from './majorList'
  import { getLargeMajor, getMiddleMajor, getSmallMajor } from '@/api/index'
  import _ from 'underscore'
  export default {
    components: { Search, majorList },
    data () {
      return {
        curTab: 'all',
        loading: false,
        key: '',
        placeholder: '搜索',
        list: []
      }
    },
    computed: {
      toUrl () {
        return this.$store.state.user.returnUrl
      }
    },
    mounted () {
      this.getAllMajorList()
    },
    activated () {
      if (this.list.length === 0) {
        this.loading = true
        this.getAllMajorList()
      }
    },
    methods: {
      // 返回
      returnBack () {
        this.list = []
        this.$router.go(-1)
      },
      // 滚动加载
      nextPage () {
        console.log('nextPage')
      },
      // 去页面
      gotoPage (name) {
        this.$router.push({ name: name })
      },
      // 获取列表
      getList () {
        this.list = []
      },
      // 获取专业大类
      getAllMajorList () {
        this.loading = true
        getLargeMajor().then(res => {
          this.loading = false
          this.list = res.data.data.map((item, index) => {
            return {
              show: false,
              index: index,
              name: item,
              children: []
            }
          })
        })
      },
      // 获取专业子类
      getCourses: _.debounce(function (major) {
        if (!this.list[major.index].show) {
          getMiddleMajor(major.name).then(res => {
            if (res.data.code === 0) {
              this.list[major.index].children = res.data.data
              this.list[major.index].show = true
            }
          })
        }
        this.list[major.index].show = false
        // this.list[major.index].show = !this.list[major.index].show
      })
    }
  }
</script>

<style lang="scss">
  .major-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);
    flex: none;
    z-index: 1;
  }
</style>
