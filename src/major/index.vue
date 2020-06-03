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
      @getSmallMajor="getSmallMajor"
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
          console.log('专业大类：', res.data.data)
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
          getMiddleMajor({
            level1name: major.name
          }).then(res => {
            if (res.data.code === 0) {
              console.log('专业中类：', res.data)
              this.list[major.index].children = res.data.data.map((item2, index2) => {
                return {
                  middle_show: false,
                  middle_index: index2,
                  middle_name: item2,
                  middle_children: []
                }
              })
              this.list[major.index].show = true
            }
          })
        }
        this.list[major.index].show = false
        // this.list[major.index].show = !this.list[major.index].show
      }),
      // 获取专业小类
      getSmallMajor (middleName, largeName) {
        if (!middleName.middle_show) {
          getSmallMajor({
            level1: largeName.name,
            level2: middleName.middle_name
          }).then(res => {
            if (res.data.code === 0) {
              middleName.middle_children = res.data.data
              middleName.middle_show = true
              console.log('专业小类：', res.data)
            }
          })
        } else {
          middleName.middle_show = false
        }
      }
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
