<template>
  <div class="school-wrapper"
    ref="schoolWrapper"
    :style="{height: 'calc(100% - ' + height + 'px)'}">
    <div class="school-list" ref="schoolList">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && list.length === 0">
        暂无结果
      </div>
      <div class="school-item" v-if="!loading && list.length !== 0" v-for="school in list" @click="gotoPage(school)">
        <div class="school-item__logo"><img :src="school.log"></div>
        <div class="school-item__devide"></div>
        <div class="school-item__info">
          <div class="school-item__name">{{school.schoolname}}</div>
          <div class="school-item__grade" v-if="school.grade !== null">{{school.grade}}</div>
          <div class="school-item__grade" v-if="school.f985 !== null">{{school.f985}}</div>
          <div class="school-item__grade" v-if="school.f211 !== null">{{school.f211}}</div>
          <div class="school-item__grade" v-if="school.dualClassName !== null">{{school.dualClassName}}</div>
          <div class="school-item__ranking" >{{school.address}}</div>
<!--          <div class="school-item__ranking" >热度排名: {{school.ranking}}</div>-->
          <div class="school-item__prescore" >{{school.type}}</div>
<!--          <div class="school-item__prescore" >建议报考分: {{school.prescore === 0 ? '暂无' : school.prescore}}</div>-->
        </div>
      </div>
      <div class="school-item-end" v-if="!loading && list.length !== 0 && end">到底了</div>
    </div>
  </div>
</template>
<script>
  import _ from 'underscore'
  import BScroll from 'better-scroll'
  import userMessage from './userMessage'
  export default {
    components: { userMessage },
    data () {
      return {
        value: '',
        schoolScroll: null,
        openid: '',
        show: false,
        code: '',
        scrollTop: ''
      }
    },
    props: {
      loading: Boolean,
      list: Array,
      end: Boolean,
      type: String,
      curTab: String
    },
    computed: {
      height () {
        if (this.type === undefined) {
          return 100
        } else if (this.type === 'one') {
          return 120
        } else if (this.type === 'two') {
          return 152
        } else if (this.type === 'search') {
          return 56
        } else {
          return 100
        }
      }
    },
    mounted () {
      this.openid = this.$store.state.user.openid
      this.init()
    },
    activated () {
      this.init()
    },
    deactivated () {
      console.log(this.$refs.schoolList.style.transform)
      if (this.$refs.schoolList !== undefined && this.$refs.schoolList.style.transform !== '') {
        this.scrollTop = this.$refs.schoolList.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
        console.log(this.scrollTop)
        this.schoolScroll = null
      }
    },
    watch: {
      curTab () {
        this.scrollTop = 0
      }
    },
    methods: {
      changShow (value) {
        this.show = value
      },
      init () {
        this.$nextTick(() => {
          const start = this.scrollTop || 0
          console.log('start', start)
          this.schoolScroll = new BScroll(this.$refs.schoolWrapper, {
            startY: start,
            click: true,
            pullDownRefresh: {
              threshold: 50,
              stop: 40
            },
            pullUpLoad: {
              threshold: 40,
              moreTxt: '加载中',
              noMoreTxt: '没有更多数据了'
            }
          })
          this.schoolScroll.on('pullingUp', (pos) => {
            console.log(444444444444444)
            if (!this.end && !this.loading) {
              this.nextPage()
              this.$nextTick(() => {
                this.schoolScroll && this.schoolScroll.finishPullUp()
              })
            }
          })
          this.schoolScroll.on('pullingDown', () => {
            console.log(55555555555555555)
            this.reList()
            this.$nextTick(() => {
              this.schoolScroll && this.schoolScroll.finishPullDown()
            })
          })
        })
      },
      nextPage: _.debounce(function () {
        this.$emit('nextPage')
      }, 500, true),
      reList: _.debounce(function () {
        this.$emit('reList')
      }, 500, true),
      gotoPage: _.debounce(function (school) {
        console.log('school:', school)
        this.$router.push({ path: '/schoolInfo/' + this.openid + '/' + school.schoolname })
      }, 500, true)
    }
  }
</script>
<style lang="scss" scoped="">
  .school-wrapper {
    position: relative;
  }
  .school-list {
    flex: auto;
    background: #fbf9fe;
    padding: 30px 0 12px 0;
    margin: 20px 0;
    position: relative;
  }
  .school-item__grade,
  .school-item__ranking,
  .school-item__prescore {
    display: inline-block;
    color: #fff;
    /*border: 1px solid silver;*/
    margin: 4px 4px 4px 0;
    padding: 2px 2px;
    border-radius: 4px;
    font-size: 12px;
  }

  /*.school-item__logo {
    position: absolute;
    width: 50px;
    height: 50px;
    top: -5px;
    right: -13px;
    opacity: .4;
    img {
      width: 100%;
      height: 100%;
    }
  }*/
  .school-item__logo {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    right: -22px;
    margin-top: -8px;
    opacity: .4;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
