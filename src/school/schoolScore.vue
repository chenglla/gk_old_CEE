<template>
  <div style="height: 100%;width: 100%">
    <div class="school-info-return return-box">
      <div class="return__icon" @click="gotoPage">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div class="school-info-title">往年专业录取分数线</div>
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
          <i class="iconfont iconzhuanye"></i>
          <div class="major-info-item major__code">专业代码: {{majorCode || '暂无信息'}}</div>
          <div class="major-info-item major__degree">授予学位: {{majorObj.degree || '暂无信息'}}</div>
          <div class="major-info-item major__educationalsystem">学制: {{majorObj.educationalsystem || '暂无信息'}}</div>
        </div>
        <div class="major-info-card" :class="[courseOpen ? 'major-info-card-open': 'major-info-card-close']">
          <div class="major-info-item major__course">
            <div class="major-card-header" @click="toggleOpen('courseOpen')">
              专业课程 <i class="iconfont iconleft-arrow"></i>
            </div>
            <div class="major-card-content">{{majorObj.major || '暂无信息'}}</div>
            <i class="iconfont iconkecheng" v-if="majorObj.major !== ''"></i>
          </div>
        </div>
        <div class="major-info-card" :class="[summaryOpen ? 'major-info-card-open': 'major-info-card-close']">
          <div class="major-info-item major__summary">
            <div class="major-card-header" @click="toggleOpen('summaryOpen')">
              专业简介 <i class="iconfont iconleft-arrow"></i>
            </div>
            <div class="major-card-content" v-html="majorObj.summary">{{majorObj.summary || '暂无信息'}}</div>
          </div>
        </div>
        <div class="major-info-card">
          <div class="major-info-item major__school">
            <div class="major-card-header">往年专业录取分数线</div>
<!--              <div class="chart-shopname">-->
<!--                <div class="info-item__value">-->
<!--                  <popup-picker title="批次" :data="[batchList]" v-model="batch" @on-show="getBatchList" placeholder="选择批次" @on-hide="getCouponSelectedBatch()" style="font-size: 16px"></popup-picker>-->
<!--                </div>-->
<!--                <div class="info-item__value">-->
<!--                  <popup-picker title="分数" :data="[scoreTypeList]" v-model="scoreType"  placeholder="选择分数" @on-hide="getCouponSelectedScore()" style="font-size: 16px"></popup-picker>-->
<!--                </div>-->

<!--              </div>-->
            <div v-if="Object.keys(majorScoreLine).length > 0" class="majorScoreLine">
              <x-table full-bordered style="background-color:#fff;" class="schoolScoreLineTable">
                <thead>
                <tr>
                  <th>年份</th>
                  <th>文理科</th>
                  <th>批次</th>
                  <th>最低分</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in majorScoreLine" :key="index">
                  <td>{{item.year}}</td>
                  <td>{{item.category}}</td>
                  <td>{{item.batch}}</td>
                  <td>{{item.lowestscore}}</td>
                </tr>
                </tbody>
              </x-table>
<!--              <div class="content">-->
<!--                <div class="seven_echarts" ref="chart"></div>-->
<!--              </div>-->
            </div>
            <div v-else  style="font-size: 14px;margin: 10px 10px 14px;text-indent: 26px;color: #aaa">暂时无往年录取分数线！</div>
            <div class="user" style="text-align: center">
              <div  class="userInfo"><div style="width: 10px;height: 10px;background-color:red;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;float: left;margin: 6px 4px 0 0;"></div>{{batchUser}}</div>
              <div  class="userInfo"><div style="width: 10px;height: 10px;background-color:blue;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;float: left;margin: 6px 4px 0 0;"></div>{{category}}</div>
              <div  class="userInfo"><div style="width: 10px;height: 10px;background-color:green;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;float: left;margin: 6px 4px 0 0;"></div>{{province}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { PopupPicker } from 'vux'
  import { getSchoolScore, getBatch, getMajorBatch, myInfo, getMajorScoreLine } from '@/api/index.js'
  import { errorMsg } from '@/utils/common'
  import BScroll from 'better-scroll'
  import _ from 'underscore'
  export default {
    components: { PopupPicker },
    data () {
      return {
        batchUser: '',
        category: '',
        province: '',
        batch: [],
        scoreType: [],
        scoreTypeList: [
          '平均分',
          '最低分'],
        batchList: [],
        loading: false,
        majorError: false,
        // schoolName: '',
        majorObj: {},
        majorName: '',
        schoolName: '',
        majorScroll: null,
        courseOpen: false,
        summaryOpen: false,
        schoolOpen: false,
        schoolError: false,
        schoolScore: '',
        schoolLog: '',
        schoolScroll: null,
        seven_chart: null,
        month_chart: null,
        majorScoreLine: [],
        seven_option: {
          title: {
            // text: '未来一周气温变化',//感觉头部有点乱，没使用自带的标题
            // subtext: '纯属虚构'
            x: 'left',
            align: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          // legend: {
          //   data: ['分数']
          // },
          grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            bottom: '3%',
            containLabel: true
          },
          // toolbox: {
          //   feature: {
          //     magicType: {type: ['line', 'bar']},
          //     restore: {},
          //     // 将图表以折线图的形式展现
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
            // data: ['2014', '2015', '2016', '2017']
          },
          yAxis: {
            min: 0,
            max: 1000,
            axisLine: {
              lineStyle: {
                color: 'black',
                width: 0.5
              }
            },
            splitLine: {
              show: true
            },
            scale: false,
            name: 'score',
            nameLocation: 'end',
            type: 'value',
            axisLabel: {
              formatter: '{value} '
            }
          },
          series: [
            {
              name: '分数',
              type: 'line',
              data: [],
              // data: [9, 10, 6, 7],
              lineStyle: {
                // 设置折线色颜色
                color: 'black'
              },
              // symbol: 'star', // 拐点样式
              // symbolSize: 8, // 拐点大小
              itemStyle: {
                // 设置折线折点的颜色
                normal: {
                  label: {
                    show: true,
                    borderWidth: 3,
                    formatter: '{c}分',
                    // borderType: 'solid',
                    textStyle: {
                      color: '#fff',
                      // backgroundColor: '#767c98'
                      backgroundColor: 'RGB(232,157,66)'
                      // borderType: 'solid',
                      // borderWidth: 3
                    }
                  },
                  color: '#4758ac'
                }
              }
            }
          ]
        }
      }
    },
    computed: {
      majorCode () {
        return this.$route.params.majorcode || ''
      },
      schoolCode () {
        return this.$route.params.schoolcode || ''
      },
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      this.getMajorScoreDetail()
      this.getUserInfo()
      this.getMajorScoreLine()
    },
    methods: {
      getUserInfo () {
        myInfo(this.openid).then(res => {
          this.batchUser = res.data.data.batch || '暂无'
          this.category = res.data.data.category || '暂无'
          this.province = res.data.data.province || '暂无'
        })
      },
      getMajorScoreLine () {
        this.majorScoreLine = []
        getMajorScoreLine({
          openid: this.openid,
          schoolcode: this.schoolCode,
          majorcode: this.majorCode
        }).then(res => {
          for (const item in res.data.data.scores) {
            if (res.data.data.scores[item].length > 0) {
              // console.log(res.data.data.scores[item])
              for (const j in res.data.data.scores[item]) {
                this.majorScoreLine.push(res.data.data.scores[item][j])
              }
              // console.log(item)
              // console.log(res.data.data.scores[item][0]['category'])
            }
          }
          // this.majorScoreLine = res.data.data.scores
          console.log('专业往年', this.majorScoreLine)
        })
      },
      getBatchList () {
        getMajorBatch(this.schoolName, this.majorCode, this.openid).then(res => {
          this.batchList = res.data.data
        })
      },
      getCouponSelectedBatch () {
        getBatch(this.schoolName, this.majorCode, this.openid, this.batch, this.scoreType).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.schoolError = false
            this.schoolScore = res.data.data
            var i = ''
            this.seven_option.xAxis.data = []
            this.seven_option.series[0].data = []
            for (i in res.data.data) {
              if (parseInt(res.data.data[i]) !== 0) {
                this.seven_option.xAxis.data.push(i)
                this.seven_option.series[0].data.push(parseInt(res.data.data[i]))
              }
            }
            this.$nextTick(() => {
              this.seven_chart = this.echarts.init(this.$refs.chart)
              this.seven_chart.setOption(this.seven_option)
            })
            this.init()
          }
        })
      },
      getCouponSelectedScore () {
        getBatch(this.schoolName, this.majorCode, this.openid, this.batch, this.scoreType).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.schoolError = false
            this.schoolScore = res.data.data
            var i = ''
            this.seven_option.xAxis.data = []
            this.seven_option.series[0].data = []
            for (i in res.data.data) {
              if (parseInt(res.data.data[i]) !== 0) {
                this.seven_option.xAxis.data.push(i)
                this.seven_option.series[0].data.push(parseInt(res.data.data[i]))
              }
            }
            this.$nextTick(() => {
              this.seven_chart = this.echarts.init(this.$refs.chart)
              this.seven_chart.setOption(this.seven_option)
            })
            this.init()
          }
        })
      },
      toggleOpen: _.debounce(function (name) {
        this[name] = !this[name]
      }, 500, true),
      init () {
        this.$nextTick(() => {
          this.majorScroll = new BScroll(this.$refs.majorInfo, {
            click: true
          })
        })
      },
      gotoPage () {
        this.$router.go(-1)
      },
      getMajorScoreDetail () {
        if (this.schoolCode === undefined || this.schoolCode === '') {
          errorMsg(this, '学校代码错误')
          this.schoolError = true
          return
        }
        this.loading = true
        getSchoolScore(this.schoolCode, this.majorCode, this.openid).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            this.schoolError = false
            this.schoolName = res.data.data.schoolname
            this.majorName = res.data.data.majorname
            this.schoolScore = res.data.data.scores
            this.majorObj = res.data.data
            var i = ''
            for (i in res.data.data.scores) {
              this.seven_option.xAxis.data.push(i)
              this.seven_option.series[0].data.push(parseInt(res.data.data.scores[i]))
            }
            this.$nextTick(() => {
              this.seven_chart = this.echarts.init(this.$refs.chart)
              this.seven_chart.setOption(this.seven_option)
            })
            this.init()
          } else {
            this.schoolError = true
          }
        })
      }
    },
    beforeDestroy () {
      if (!this.seven_chart) {
        return
      }
      this.seven_chart.dispose()
      this.seven_chart = null
    }
  }
</script>
<style type="text/css" lang="scss" scoped="">
  .chart-shopname{
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 10px;
    margin-bottom: 15px;
    height: 20%;
  }
  .content{
    margin-top: 20px;
    /*top:10px;*/
  }
  .line_select{
    width: 35%;
    height: 22px;
    margin: 7px;
  }
  .info-item__value{
    height: 8px;
    margin-bottom: 25px;
    /*width: 50%;*/
    /*float: left;*/
  }
  /*.content {*/
  /*  width: 100%;*/
  /*  margin: 10px 10px;*/
  /*  padding-top: 20px;*/
  /*  box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);*/
  /*  border-radius: 4px;*/
  /*}*/
  /*.content p {*/
  /*  margin-top: 1rem;*/
  /*  font-size: 0.4rem;*/
  /*  color: #666666;*/
  /*}*/
  .seven_echarts {
    margin-top: 13px;
    height: 9rem;
    width: 94%;
  }
  .school-info-return {
    /*position: relative;*/
    height: 56px;
    flex: none;
    background-color: #647cfb;
  }
  .school-info-title {
    color: #fff;
    text-align: center;
    font-size: 16px;
    padding: 14px 10px 16px 50px;
    /*overflow: hidden;*/
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .iconfont {
    font-size: 15px;
    position: relative;
  }
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
  .userInfo{
    font-size: 14px;
    margin: 2% 4%;
    float: left;
  }
  .majorScoreLine {
    margin: 13px 4px 8px;
    text-align: center;
    border-radius: 10px;
    background-color: #fff;
  }
  tbody tr:nth-child(2n + 1) {
    /*background-color: rgb(229,253,239);*/
    background-color: rgba(46,122,241,0.2);
  }
  tbody tr td {
    border: 1px solid rgba(46,122,241,0.2);
    font-size: 13px;
  }
  thead tr th {
    border: 1px solid rgba(46,122,241,0.2);
    font-weight: bold;
    font-size: 14px;
  }
  table.vux-table.schoolScoreLineTable {
    line-height: 33px;
  }
</style>
