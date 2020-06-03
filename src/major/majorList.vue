<template>
  <div class="major-wrapper"
    ref="majorWrapper"
    :style="{height: 'calc(100% - 60px)'}">
    <div class="major-list" ref="majorList">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && list.length === 0">
        暂无结果
      </div>
      <div class="major-item"
        v-if="!loading && list.length !== 0"
        v-for="major in list"
        @click="getCourses(major)"
        :class="{'major-item--open': major.show}">
        <div class="major-item__name">{{major.name}}</div>
        <div class="major-item__icon"><i class="iconfont iconleft-arrow"></i></div>
        <div class="major-item__sub" v-show="major.show">
          <div class="sub-major-item" :class="{'sub-item--open': sub.middle_show}" @click.stop="getSmallMajor(sub, major)" v-for="(sub, inde) in major.children" :key="inde" v-if="major.children.length > 0">
<!--          <div class="sub-major-item" v-for="sub in major.children" @click="gotoPage(sub)" v-if="major.children.length > 0">-->
            <div class="sub-item__name">{{sub.middle_name}}</div>
            <div class="major-item__icon"><i class="iconfont iconleft-arrow"></i></div>
            <div class="name_item_info" v-for="(sun, ind) in major.children[sub.middle_index].middle_children" :key="ind" v-show="major.children[sub.middle_index].middle_show">
              <div class="name_item_sty" @click.stop="gotoPage(sun.majorcode)">
                <span>{{sun.majorname}}</span>
              </div>
            </div>
<!--            <i class="iconfont iconleft-arrow"></i>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'underscore'
  import BScroll from 'better-scroll'
  import {getSmallMajor} from '@/api/index'
  export default {
    data () {
      return {
        majorScroll: null,
        scrollTop: ''
      }
    },
    props: {
      loading: Boolean,
      list: Array,
      type: String
    },
    mounted () {
      this.init()
    },
    activated () {
      this.init()
    },
    deactivated () {
      if (this.$refs.majorList !== undefined && this.$refs.majorList.style.transform !== '') {
        this.scrollTop = this.$refs.majorList.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
        this.majorScroll = null
      }
    },
    methods: {
      init () {
        const start = this.scrollTop || 0
        this.$nextTick(() => {
          this.majorScroll = new BScroll(this.$refs.majorWrapper, {
            startY: start,
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
            this.nextPage()
            this.$nextTick(() => {
              this.majorScroll.finishPullUp()
            })
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
      // 获取子专业
      getCourses (item) {
        this.$emit('getCourses', item)
      },
      // 去专业详情
      gotoPage (sub) {
        this.$router.push({ path: '/majorInfo/' + sub })
      },
      // 获取专业小类
      getSmallMajor: _.debounce(function (middleName, largeName) {
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
      }, true, 50)
    }
  }
</script>
<style lang="scss" scoped="">
  .major-wrapper {
    position: relative;
    overflow: hidden;
  }
  .major-list {
    flex: auto;
    background: #fbf9fe;
    padding: 12px 0;
    margin: 20px 0;
    position: relative;
  }
  .major-item {
    background: #fff;
    margin: 0 20px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    min-height: 20px;
    &.major-item--open {
      .major-item__name {
        background: linear-gradient(to right, #417dda 0%, #77a5ec 25%, #afd1fb 100%);
        color: #fff;
      }
      .major-item__icon {
        transform: rotate(90deg);
      }
    }
  }
  .major-item__name {
    font-size: 15px;
    padding: 10px;
    color: #1e509e;
  }
  .major-item__icon {
    position: absolute;
    right: 16px;
    top: 10px;
    transform: rotate(-90deg);
    transition: all .2s;
    .iconfont {
      font-size: 15px;
    }
  }
  .major-item__sub {
    transition: all .2s;
    padding: 0 10px;
  }
  .sub-major-item {
    padding: 6px 0;
    position: relative;
    & + .sub-major-item {
      border-top: 1px solid #f5f5f5;
    }
    &.sub-item--open {
      .sub-item__name {
        padding: 5px 0 8px;
        /*border-bottom: 1px solid #ececec;*/
        /*box-shadow: 1px 1px 0 1px rgba(0, 0, 0, .1);*/
        /*background: linear-gradient(to right, #417dda 0%, #77a5ec 25%, #afd1fb 100%);*/
        /*color: #fff;*/
      }
      .major-item__icon {
        transform: rotate(-90deg);
        margin-top: 15px;
        font-size: 12px;
      }
    }
    .iconfont {
      position: absolute;
      /*right: 10px;*/
      top: -10px;
      /*top: 7px;*/
      font-size: 12px;
      color: #b5b5b5;
      transform: rotate(180deg);
    }
  }
  .name_item_info {
    margin: 6px 0;
    padding: 5px 0;
    text-indent: 1em;
    border-bottom: 1px solid #efefef;
  }
</style>
