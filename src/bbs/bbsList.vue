<template>
  <div class="bbs-wrapper"
    ref="bbsWrapper"
    :style="{height: 'calc(100% - 50px)'}">
    <div class="bbs-list" ref="bbsList">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && list.length === 0">
        暂无结果
      </div>
      <div class="bbs-item" v-if="!loading && list.length !== 0" v-for="(bbs, index) in list">
        <div class="bbs-click-area"  @click="goDetail(bbs.takeid,index)"></div>
        <div class="bbs-item__info" @click="goDetail(bbs.takeid,index)">
          <div class="bbs-item__content" >{{bbs.ask}}</div>
        </div>
        <div class="bbs_item_basic_info">
          <span class="bbs-item__img"><img :src="bbs.pic" alt=""></span>
          <span class="bbs-item__name">{{bbs.username}}</span>
          <div class="bbs-item__time">{{bbs.time}}</div>
          <div href="javascript:;" class="bbs-item__good" @click="dzan(bbs, index)" >{{bbs.hot}}
            <i v-if="!bbs.istrue" class="iconfont iconxinaixin" ></i>
            <i v-else class="iconfont iconxinaixin2" ></i>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'underscore'
  import BScroll from 'better-scroll'
  import { zan } from '@/api/index'
  export default {
    data () {
      return {
        show1: false,
        bbsScroll: null,
        istrue: false,
        scrollTop: '',
        index: 0
      //
      }
    },
    props: {
      end: Boolean,
      loading: Boolean,
      list: Array,
      type: String
    },
    mounted () {
      this.init()
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    activated () {
      this.init()
    },
    deactivated () {
      if (this.$refs.bbsList !== undefined && this.$refs.bbsList.style.transform !== '') {
        this.scrollTop = this.$refs.bbsList.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
        this.bbsScroll = null
      }
    },
    watch: {
      curTab () {
        this.scrollTop = 0
      }
    },
    methods: {
      click (key) {
        console.log(key)
      },
      init () {
        this.$nextTick(() => {
          const start = this.scrollTop || 0
          this.bbsScroll = new BScroll(this.$refs.bbsWrapper, {
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
          this.bbsScroll.on('pullingUp', (pos) => {
            this.nextPage()
            this.$nextTick(() => {
              this.bbsScroll && this.bbsScroll.finishPullUp()
            })
          })
          this.bbsScroll.on('pullingDown', () => {
            this.reList()
            this.$nextTick(() => {
              this.bbsScroll && this.bbsScroll.finishPullDown()
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
      dzan: _.debounce(function (item, index) {
        // console.log(index)
        zan(this.openid, item.takeid).then(res => {
          this.$set(this.list[index], 'istrue', res.data.data.istrue)
          this.$set(this.list[index], 'hot', res.data.data.count)
        })
        return false
      }, 500, false),
      goDetail (id, index) {
        this.index = index
        this.$emit('change', this.index)
        this.$router.push({
          name: 'bbsDetail',
          params: {id: id}
        })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .bbs-wrapper {
    position: relative;
  }
  .bbs-list {
    flex: auto;
    background: #fbf9fe;
    padding: 12px 0;
    margin: 10px 0;
    position: relative;
  }
  /*.bbs-item {*/
  /*  margin: 0 20px 16px;*/
  /*  padding: 16px 20px;*/
  /*}*/
  .bbs-click-area {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .bbs-item__name {
    /*display: inline-block;*/
    /*font-size: 13px;*/
    /*color: #555;*/
    /*margin-bottom: 10px;*/
    /*margin-left: 10px;*/
    white-space: nowrap;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bbs_item_basic_info {
    display: flex;
    margin-top: 10px;
  }
  .bbs-item__img {
    /*flex: 2;*/
    height: 30px;
    width: 30px;
    /*border: 1px solid #fff;*/
    /*border-radius: 50%;*/
    margin-right: 8px;
    /*vertical-align: top;*/
    img {
      height: 100%;
      overflow: hidden;
      border-radius: 50%;

    }
  }
  .bbs-item__name {
    flex: 6;
    margin-top: 9px;
    /*vertical-align: top;*/
  }
  .bbs-item__time {
    flex: 5;
    margin-top: 9px;
  }
  .bbs-item__good {
    flex: 4;
  }
  .bbs-item__content {
    text-indent: 2em;
    /*line-height: 25px;*/
    font-size: 16px;
  }
</style>
