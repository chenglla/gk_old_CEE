<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="major-info-wrapper">
      <div class="major-info-return return-box">
        <div class="return__icon" @click="gotoPage">
          <i class="iconfont iconleft-arrow"></i>
        </div>
        <div class="major-info-title">{{majorName}}</div>
      </div>
    </div>
      <div class="major-info-box" ref="majorInfo">
        <div class="list-loading" v-if="loading">
          <div class="loader"></div>
        </div>
        <div class="list-no-data" v-if="!loading && majorError">
          专业代码错误，请返回
        </div>
        <div style="padding: 10px 0;position: relative;" v-if="!loading && !majorError">
          <div class="major-info-card">
<!--            <i class="iconfont iconzhuanye"></i>-->
            <div class="major-info-item major__code">专业代码: {{majorCode || '暂无信息'}}</div>
            <div class="major-info-item major__degree">授予学位: {{majorObj.degree || '暂无信息'}}</div>
            <div class="major-info-item major__educationalsystem">学制: {{majorObj.educationalsystem || '暂无信息'}}</div>
          </div>
          <div class="major-info-card" :class="[courseOpen ? 'major-info-card-open': 'major-info-card-close']">
            <div class="major-info-item major__course">
              <div class="major-card-header" @click="toggleOpen('courseOpen')">
                专业课程
                <i class="iconfont iconleft-arrow"></i>
              </div>
              <div class="major-card-content">{{majorObj.major || '暂无信息'}}</div>
<!--              <i class="iconfont iconkecheng" v-if="majorObj.major !== ''"></i>-->
            </div>
          </div>
          <div class="major-info-card" :class="[summaryOpen ? 'major-info-card-open': 'major-info-card-close']">
            <div class="major-info-item major__summary">
              <div class="major-card-header" @click="toggleOpen('summaryOpen')">
                专业简介 <i class="iconfont iconleft-arrow"></i>
              </div>
              <div class="major-card-content">{{majorObj.summary || '暂无信息'}}</div>
            </div>
          </div>
          <div class="major-info-card" v-if="majorObj.schoolDtos.length > 0">
            <div class="major-info-item major__school">
              <div class="major-card-header">开设院校</div>
              <div class="major-card-content">
                <div class="major-school-item"
                  v-for="school in majorObj.schoolDtos"
                  @click="gotoDetailPage(school)"
                >
                  <div class="major-school-item__log"><img :src="school.log"></div>
                  <div class="major-school-item__info">
                    <div class="major-school-item__name">{{school.schoolname}}</div>
                    <div class="major-school-item__tag"  >{{school.grade}}</div>
<!--                    <div class="major-school-item__tag"  >热度排名: {{school.province}}</div> &lt;!&ndash;接口无此数据&ndash;&gt;-->
                    <div class="major-school-item__tag">所在地: {{school.address}}</div>
                    <div class="major-school-item__tag">{{school.type}}</div>
<!--                    <div class="major-school-item__tag" v-if="school.prescore !== '' && school.prescore !== 0" >建议报考分: {{school.prescore}}</div>-->
                  </div>
                </div>

                <div class="school-item-end" v-if="!loading && majorObj.schoolDtos.length !== 0 && isEnd">到底了</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import { getMajorInfo, getSchoolInfo, findMajorSchool, getSmallMajorInfo } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  import BScroll from 'better-scroll'
  import _ from 'underscore'

  export default {
    data () {
      return {
        loading: false,
        majorError: false,
        majorObj: {
          schoolDtos: []
        },
        majorName: '',
        majorScroll: null,
        courseOpen: false,
        summaryOpen: false,
        schoolOpen: false,
        req: {
          majorcode: '',
          page: 0,
          openid: ''
        },
        isEnd: false
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      majorCode () {
        return this.$route.params.id || ''
      }
    },
    mounted () {
      this.getMajorDetail()
      // this.init()
      this.req.majorcode = this.majorCode
      this.req.page = 0
      this.req.openid = this.openid
    },
    methods: {
      gotoDetailPage (school) {
        console.log('学校详情：', school)
        getSchoolInfo(school.schoolname, this.openid).then(res => {
          this.code = school.schoolcode
          this.loading = false
          if (res.data.code === 505) {
            this.show = true
          } else if (res.data.code === 0) {
            this.$router.push({ path: '/schoolInfo/' + this.openid + '/' + school.schoolname })
          } else {
          }
        })
      },
      // card收起
      toggleOpen: _.debounce(function (name) {
        console.log('展开了没')
        this[name] = !this[name]
        this.$nextTick(() => {
          this.majorScroll && this.majorScroll.refresh()
        })
      }, 50, true),
      init () {
        this.$nextTick(() => {
          const start = this.scrollTop || 0
          console.log(this.$refs.majorInfo)
          this.majorScroll = new BScroll(this.$refs.majorInfo, {
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
            // this.reList()
            this.$nextTick(() => {
              this.majorScroll.finishPullDown()
            })
          })
        })
      },
      // init () {
      //   this.$nextTick(() => {
      //     console.log(this.$refs.majorInfo)
      //     this.majorScroll = new BScroll(this.$refs.majorInfo, {
      //       click: true
      //     })
      //   })
      // },
      nextPage: _.debounce(function () {
        if (this.isEnd || this.loading) {
          return
        }
        this.req.page++
        this.getSchool()
      }, 50, true),
      reList: _.debounce(function () {
        // this.$emit('reList')
      }, 50, true),
      gotoPage () {
        this.$router.go(-1)
      },
      // 获取专业详情
      getMajorDetail () {
        if (this.majorCode === undefined || this.majorCode === '') {
          errorMsg(this, '专业代码错误')
          this.majorError = true
          return
        }
        this.loading = true
        getSmallMajorInfo({
          openid: this.openid,
          majorcode: this.majorCode
        }).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.majorError = false
            this.majorName = res.data.data.majorname
            this.majorObj = res.data.data
            if (this.majorObj.summary !== undefined && this.majorObj.summary !== '') {
              this.majorObj.summary = this.majorObj.summary.replace(/<p>/g, '').replace(/<\/p>/g, '')
            }
            console.log('专业开设院校：', this.majorObj.schoolDtos)
            if (res.data.data.schoolDtos < 10) {
              this.isEnd = true
            }
            this.init()
          } else {
            this.majorError = true
          }
        })
      },
      getSchool () {
        findMajorSchool(this.req).then(res => {
          if (res.data.data.length < 10) {
            this.isEnd = true
          }
          const schoolCode = this.majorObj.schoolDtos.map(item => item.schoolcode)
          res.data.data.map(item => {
            if (schoolCode.indexOf(item.schoolcode) === -1) {
              this.majorObj.schoolDtos.push(item)
            }
          })
          console.log('专业开设院校：', this.majorObj.schoolDtos)
          this.$nextTick(() => {
            this.majorScroll && this.majorScroll.refresh()
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  .major-info-wrapper {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column;
  }
  .major-info-return {
    height: 56px;
    flex: none;
  }
  .major-info-title {
    color: #fff;
    text-align: center;
    font-size: 16px;
    padding: 16px 10px 16px 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .major-info-box {
    position: relative;
    background: #fbf9fe;
    padding: 10px 0;
    height: calc(100% - 76px);
    overflow: hidden;
  }
  .major-info-card {
    background: #fff;
    padding: 10px;
    margin: 0 20px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    min-height: 20px;
    overflow: hidden;
    &.major-info-card-close {
      height: 60px;
      .major-card-content {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .iconfont {
        transform: rotate(-90deg);
      }
      .iconkecheng,
      .iconjianjie {
        display: none;
      }
    }
  }
  .iconzhuanye,
  .iconkecheng,
  .iconjianjie {
    color: #99a9f926;
    font-size: 100px;
    position: absolute;
    right: 0;
    bottom: -60px;
  }
  .major-info-item + .major-info-item {
    margin-top: 6px;
  }
  .major-card-header {
    position: relative;
    font-weight: bold;
    padding: 4px 0 6px 0;
    border-bottom: 1px solid #495bb021;
    .iconfont {
      position: absolute;
      right: 10px;
      top: 8px;
      transition: all .2s;
      transform: rotate(90deg);
      font-size: 12px;
    }
  }
  .major-card-content {
    padding: 10px 0;
    transition: all .2s;
  }
  .major-school-item {
    position: relative;
  }
  .major-school-item + .major-school-item {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #495bb008;
  }
  .major-school-item__log {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .major-school-item__info {
    padding-left: 40px;
  }
  .major-school-item__tag {
    display: inline-block;
    background: #5f95dc;
    color: #fff;
    margin: 8px 4px 8px 0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 13px;
  }
</style>
