<template>
  <div class="major-wrapper"
    ref="majorWrapper"
    :style="{height: 'calc(100% - 56px)'}">
    <div class="major-list">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && list.length === 0">
        暂无结果
      </div>
      <div class="major-item"
        v-if="!loading && list.length !== 0"
        v-for="(major, index) in list"
        @click="gotoPage(major)">
        <div class="major-item__name">{{major.majorname}}</div>
        <div class="major-item__code">{{major.majorcode}}</div>
        <i class="iconfont iconleft-arrow"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'underscore'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        majorScroll: null
      }
    },
    props: {
      loading: Boolean,
      list: Array,
      type: String,
      end: Boolean
    },
    mounted () {
      this.init()
    },
    watch: {
      $route () {
        this.init()
      }
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.majorScroll = new BScroll(this.$refs.majorWrapper, {
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
          this.majorScroll.on('pullingUp', (pos) => {
            console.log('pullingUp')
            if (!this.end && !this.loading) {
              this.nextPage()
              this.$nextTick(() => {
                this.majorScroll.finishPullUp()
              })
            }
          })
          this.majorScroll.on('pullingDown', () => {
            this.reList()
            this.$nextTick(() => {
              this.majorScroll.finishPullDown()
            })
          })
        })
      },
      nextPage: _.debounce(function () {
        this.$emit('nextPage')
      }, 50, true),
      reList: _.debounce(function () {
        this.$emit('reList')
      }, 50, true),
      // 去专业详情
      gotoPage (sub) {
        this.$router.push({ path: '/majorInfo/' + sub.majorcode })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .major-wrapper {
    position: relative;
    background: #fff;
  }
  .major-list {
    flex: auto;
    padding-left: 20px;
    margin: 20px 0;
    position: relative;
  }
  .major-item {
    background: #fff;
    padding: 10px 30px 10px 0;
    position: relative;
    & + & {
      border-top: 1px solid #f5f5f5;
    }
  }
  .major-item__logo {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 20px;
    margin-top: -20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .major-item__info {
    padding-left: 80px;
    position: relative;
  }
  .major-item__devide {
    position: absolute;
    left: 75px;
    content: '';
    width: 1px;
    height: calc(100% - 40px);
    background: #4859ad12;
    display: block;
  }
  .major-item__name {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    color: #1e509e;
  }
  .major-item__code {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    color: #737a9e;
  }
  .iconleft-arrow {
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 12px;
    color: #b5b5b5;
    transform: rotate(180deg);
  }
</style>
