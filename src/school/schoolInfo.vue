<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column">
    <div class="school-info-wrapper">
      <div class="school-info-return return-box">
        <div class="return__icon" @click="gotoPage">
          <i class="iconfont iconleft-arrow"></i>
        </div>
        <div class="school-info-title">{{schoolInfoList.schoolNameCn}}</div>
      </div>
      <div class="school-info-box" ref="schoolInfo">
        <div style="padding-bottom: 15px">
          <div class="list-loading" v-if="loading">
            <div class="loader"></div>
          </div>
          <div class="list-no-data" v-if="!loading && schoolError">
            学校代码错误，请返回
          </div>
          <div class="schoolInfo-item" style="padding: 10px 0;position: relative;"
               v-if="!loading && !schoolError && Object.keys(schoolInfoList).length > 0" ref="schoolInfoItem">
            <div class="school-info-card"
                 :style="{backgroundImage: 'url('+ 'http://www.zhongkeruitong.top/cropsImg/ceeImg/schoolimg/' +schoolInfoList.picture + ')',backgroundSize:'100%'}">
              <div class="school-item__logo"><img :src="schoolInfoList.logo"></div>
              <div class="school-info-detail">
                <div class="school-item__info">
                  <div class="school-item__name">{{schoolInfoList.schoolNameCn}}</div>
                  <div class="school-item__enname" v-if="schoolInfoList.schoolNameEn !== undefined">{{schoolInfoList.schoolNameEn}}</div>
                  <div class="school-item__grade" v-if="schoolInfoList.f211 === 1">211</div>
                  <div class="school-item__grade" v-if="schoolInfoList.f985 === 1">985</div>
                  <div class="school-item__grade" v-if="schoolInfoList.dualClassName !== ''">{{schoolInfoList.dualClassName}}</div>
<!--                  <div class="school-item__grade">代码：{{schoolInfoList.schoolcode}}</div>-->
                  <div class="school-item__ranking">{{schoolInfoList.province}}</div>
<!--                  <div class="school-item__ranking">NO. {{schoolRanking}}</div>-->
                  <div class="school-item__prescore">{{schoolInfoList.type}}</div>
                </div>
              </div>

            </div>
            <div class="school-introduction">
              <div style="font-size: 18px;font-weight: bold;margin: 15px 10px 14px">基本信息</div>
              <div>
                <a class="school-introduction-link" :href="schoolInfoList.website">
                  <span class="school-introduction-detail">更多</span>
                  <span class="school-introduction-icon"><i class="iconfont iconleft-arrow"></i></span>
                </a>
                <div  class="school-introduction_content"><b>知名校友</b>: {{schoolInfoList.alumni || '暂无信息'}}</div>
                <div  class="school-introduction_content">校训: {{schoolInfoList.motto || '暂无信息'}}</div>
                <div class="school-introduction-info1" v-show="!showDetail">
                  <div class="school-introduction-info" v-html="schoolInfoList.summary"></div>
                  <span @click="openContent">展开</span>
                </div>
                <div class="school-introduction-info2" @click="openContent" v-show="showDetail">
                  <div v-html="schoolInfoList.summary"></div>
                  <span>收起</span>
                </div>
<!--                <div class="school-introduction-info">{{schoolInfoList.summary}}</div>-->
              </div>

            </div>
            <div class="school-score">
              <div style="font-size: 18px;font-weight: bold;margin: 15px 10px 14px">学校往年分数线</div>
              <popup-picker title="年份" :data="[yearList]" :value="year" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>
              <div>
                <div v-if="Object.keys(SchoolScore).length > 0" class="schoolScoreLine">
                  <x-table full-bordered style="background-color:#fff;" class="schoolScoreLineTable">
                    <thead>
                    <tr>
                      <th>文理科</th>
                      <th>批次</th>
                      <th>最低分</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in SchoolScore[year[0]]" :key="index">
                      <td>{{item.category}}</td>
                      <td>{{item.batch}}</td>
                      <td>{{item.lowestscore}}</td>
                    </tr>
                    </tbody>
                  </x-table>
<!--                  <div class="content"style="width: 100%">-->
<!--                    <div class="seven_echarts" ref="chart"></div>-->
<!--                  </div>-->
                </div>
                <div v-else  style="font-size: 14px;margin: 10px 10px 14px;text-indent: 26px;color: #aaa">暂时无往年录取分数线！</div>
                <div class="user" style="padding-left: 30%">
                  <!--                <div  class="userInfo"><div style="width: 10px;height: 10px;background-color:red;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;float: left;margin: 6px 4px 0 0;"></div>{{batch}}</div>-->
                  <div  class="userInfo"><div style="width: 10px;height: 10px;background-color:blue;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;float: left;margin: 6px 4px 0 0;"></div>{{category}}</div>
                  <div  class="userInfo"><div style="width: 10px;height: 10px;background-color:green;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;float: left;margin: 6px 4px 0 20px;"></div>{{province}}</div>
                </div>
              </div>
            </div>
            <div class="major-item"
                 style="padding-bottom: 15px"
                 :class="{'major-item--open': show}"
                 @click="ReturnStatus()"
            >
              <div style="font-size: 18px;font-weight: bold;margin: 15px 10px 14px">专业设置情况</div>
              <div class="major-item__name" style="font-size: 16px;">专业最低分数</div>
              <div class="major-item__icon"><i class="iconfont iconleft-arrow"></i></div>
              <div class="major-item__sub" v-show="show" ref="majoritemList" style="padding: 10px 0;position: relative;">
                <div v-for="major in schoolInfoList.majors" @click="Scoreline(schoolInfoList.schoolcode,major)" class="school-score_line" >
                  <div class="school-score_content" style="font-size:15px">{{major.majorcode}}</div>
                  <div class="school-score_label">
                    <div class="major-item_label">{{major.category}}</div>
<!--                    <div class="major-item_label" v-if="parseInt(major.lowestscore) === 0 " style="width: 11%;">-->
<!--                      未公开-->
<!--                    </div>-->
<!--                    <div class="major-item_label" v-else style="width: 11%;text-align: center">{{major.lowestscore}}</div>-->
                    <div class="major-item_label">{{major.majortype}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import BScroll from 'better-scroll'
  import { getSchoolInfo, myInfo, getSchoolScoreLine } from '@/api/index'
  import {errorMsg} from '@/utils/common'
  import _ from 'underscore'
  // const url = require(schoolScore);
  export default {
    data () {
      return {
        schoolInfoList: [], // 学校详情信息
        batch: '',
        category: '',
        province: '',
        scrollTop: '',
        loading: false,
        schoolError: false,
        schoolName: '',
        schoolAlumni: '',
        schoolNameEn: '',
        schoolLog: '',
        schoolScroll: null,
        schoolRanking: '',
        schoolGrade: '',
        schoolMajors: [],
        show: true,
        schoolSummary: '',
        schoolMotto: '',
        schoolWebsite: '',
        Schoolpicture: '',
        SchoolScore: [],
        seven_chart: null,
        month_chart: null,
        colorList: ['pink', 'blue', 'green'],
        yearList: [],
        year: [],
        showDetail: false,
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
          legend: {
            tooltip: {
              show: true   // 点击某个图例可以隐藏
            },
            top: 4
          },
          grid: {
            left: '3%',
            right: '8%',
            top: '37%',
            bottom: '3%',
            containLabel: true
          },
          // xAxis: {
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false
            // data: []
            // data: ['2014', '2015', '2016', '2017', '2018']
          },
          yAxis: {
            // axisTick: {
            //   show: false
            // },
            min: '',
            max: '',
            // min:652,
            // max:721,
            // axisLine: {
              // show: false,
              // formatter: '{value}'
              // lineStyle: {
              //   color: 'black',
              //   width: 0.5
              // }
            // },
            splitLine: {
              show: true
            },
            scale: false,
            // name: 'score',
            nameLocation: 'end',
            type: 'value',
            axisLabel: {
              show: true,
              formatter: '{value} '
            }
          },
          animation: false,
          series: [
            // {
            //   name: '分数',
            //   symbol: 'circle', // 拐点设置为实心
            //   type: 'line',
            //   data: [],
            //   // data: [9, 10, 6, 7],
            //   lineStyle: {
            //     // 设置折线色颜色
            //     color: '#4758ac',
            //     width: 2,  // 设置线宽
            //     type: 'solid'  // 'dotted'虚线 'solid'实线
            //   },
            //   itemStyle: {
            //     // 设置折线折点的颜色
            //     normal: {
            //       label: {
            //         show: true,
            //         borderWidth: 3,
            //         formatter: '{c}分',
            //         // borderType: 'solid',
            //         textStyle: {
            //           color: '#fff',
            //           // fontSize: 14,
            //           backgroundColor: 'RGB(232,157,66)'
            //         }
            //       },
            //       color: '#4758ac'
            //     }
            //   }
            // }
          ]
        }
      }
    },
    computed: {
      openId () {
        return this.$route.params.id || ''
      },
      schoolCode () {
        return this.$route.params.schoolcode || ''
      }
    },
    mounted () {
      this.getUserInfo()
      this.getSchoolDetail()
      this.init()
    },
    activated () {
      this.getUserInfo()
      this.getSchoolDetail()
      this.init()
    },
    // created () {
    //   this.seven_option.yAxis.min = this.schoolMinscore
    //   this.seven_option.yAxis.max = this.schoolMaxscore
    // },
    deactivated () {
      // console.log(this.$refs.schoolInfoItem)
      if (this.$refs.schoolInfoItem !== undefined && this.$refs.schoolInfoItem.style.transform !== '') {
        this.scrollTop = this.$refs.schoolInfoItem.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
        // console.log(this.scrollTop)
        this.schoolScroll = null
      }
    },
    methods: {
      init () {
        // this.$nextTick(() => {
        //   this.schoolScroll = new BScroll(this.$refs.schoolInfo, {
        //     click: true
        //   })
        // })
        this.$nextTick(() => {
          const start = this.scrollTop || 0
          console.log('start', start)
          this.schoolScroll = new BScroll(this.$refs.schoolInfo, {
            startY: start,
            click: true,
            bounce: false,
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
            console.log(444444)
            if (!this.end && !this.loading) {
              this.nextPage()
              this.$nextTick(() => {
                this.schoolScroll && this.schoolScroll.finishPullUp()
              })
            }
          })
          this.schoolScroll.on('pullingDown', () => {
            console.log(55555555555)
            // this.reList()
            this.$nextTick(() => {
              this.schoolScroll && this.schoolScroll.finishPullDown()
            })
          })
        })
      },
      getUserInfo () {
        myInfo(this.openId).then(res => {
          this.batch = res.data.data.batch || '暂无'
          this.category = res.data.data.category || '暂无'
          this.province = res.data.data.province || '暂无'
        })
      },
      openContent: _.debounce(function () {
        console.log('00000')
        this.showDetail = !this.showDetail
      }, 50, true),
      getSchoolScoreLine () { // 获取学校往年历史分数线
        getSchoolScoreLine({
          openid: this.openId,
          schoolcode: this.schoolInfoList.schoolcode
        }).then(res => {
          this.year = []
          this.SchoolScore = res.data.data.listMap
          this.yearList = Object.keys(this.SchoolScore)
          // this.yearList = [Object.keys(this.SchoolScore)]
          this.year.push(this.yearList[this.yearList.length - 1])
          console.log('往年分数线', this.yearList, this.year, res.data)
        })
      },
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      },
      onChange (val) {
        this.year = val
        console.log('val change', val)
      },
      ReturnStatus () {
        this.show = !this.show
      },
      gotoPage () {
        this.$router.go(-1)
      },
      Scoreline (schoolcode, major) {
        console.log('schoolcode', schoolcode, major)
        this.$router.push({
          path: '/schoolScore/' + schoolcode + '/' + major.majorspcode
        })
      },
      // 获取学校详情
      getSchoolDetail () {
        if (this.schoolCode === undefined || this.schoolCode === '') {
          errorMsg(this, '学校代码错误')
          this.schoolError = true
          return
        }
        this.loading = true
        getSchoolInfo(this.schoolCode, this.openId).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            console.log('schoolInfo:', res.data)
            this.schoolError = false
            this.schoolInfoList = res.data.data
            this.getSchoolScoreLine()
            // this.schoolName = res.data.data.schoolNameCn
            // this.schoolAlumni = res.data.data.alumni
            // this.schoolMotto = res.data.data.motto
            // this.schoolNameEn = res.data.data.schoolNameEn
            // this.schoolLog = res.data.data.logo
            // this.schoolRanking = res.data.data.ranking
            // this.schoolGrade = res.data.data.grade
            // this.schoolSummary = res.data.data.summary
            // this.schoolWebsite = res.data.data.website
            // this.Schoolpicture = res.data.data.picture
            // this.SchoolScore = res.data.data.scores
            this.schoolMajors = res.data.data.majors
            this.seven_option.yAxis.min = res.data.data.minscore - 10
            this.seven_option.yAxis.max = res.data.data.maxscore + 10
            if (this.schoolMajors.length === 0) {
              this.schoolMajors = res.data.data.map(item => {
                return item
              })
            }
            var i = ''
            var j = ''
            var ser = ''
            this.seven_option.xAxis.data = []
            this.seven_option.series = []
            console.log(11111)
            // console.log(res.data.data.scores)
            // console.log(Object.keys(res.data.data.scores).length)
            for (i in res.data.data.scores) {
              // console.log(i)
              ser = {
                name: i,
                symbol: 'circle', // 拐点设置为实心
                type: 'line',
                data: [],
                // lineStyle: {
                //   // 设置折线色颜色
                //   color: '#4758ac',
                //   width: 2,  // 设置线宽
                //   type: 'solid'  // 'dotted'虚线 'solid'实线
                // },
                itemStyle: {
                  // 设置折线折点的颜色
                  normal: {
                    label: {
                      show: true,
                      borderWidth: 3
                      // formatter: '{c}分',
                      // borderType: 'solid',
                      // textStyle: {
                      //   color: '#fff',
                      // //   // fontSize: 14,
                      //   backgroundColor: 'RGB(232,157,66)'
                      // }
                    }
                    // color: '#4758ac'
                  }
                }
              }
              for (j in res.data.data.scores[i]) {
                // console.log(typeof res.data.data.scores[i][j])
                // max = res.data.data.scores[i][j]
                // console.log(max.type())
                // console.log('this.seven_option.xAxis.data.indexOf(j):', this.seven_option.xAxis.data.indexOf(j))
                if (this.seven_option.xAxis.data.indexOf(j) === -1) {
                  // console.log('j:', j)
                  // console.log('this.seven_option.xAxis.data', this.seven_option.xAxis.data)
                  this.seven_option.xAxis.data.push(j)
                  this.seven_option.xAxis.data.sort()
                }
                // ser.data.push(parseInt(res.data.data.scores[i][j]))
                ser.data.push([j, parseInt(res.data.data.scores[i][j])])
                // console.log('ser:', ser)
              }
              // this.seven_option.xAxis.data.push(j)
              this.seven_option.series.push(ser)
              // console.log('max:', max)
              // a += 1
              // this.seven_option.xAxis.data.push(xaxisa.data)
              // this.seven_option.series.data.(ser)
            }
            // console.log(this.seven_option.xAxis.data)
            // console.log(this.seven_option.series)
            this.$nextTick(() => {
              // this.seven_chart = ''
              this.seven_chart = this.echarts.init(this.$refs.chart)
              this.seven_chart.setOption(this.seven_option)
            })
            // 把配置和数据放这里
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
<style lang="scss" scoped="">
  .content {
    width: 100%;
  }

  .content p {
    margin-top: 1rem;
    font-size: 0.4rem;
    color: #666666;
  }

  .seven_echarts {
    /*padding-left: 20px;*/
    height: 9rem;
    width: 90%;
    padding: 10px;
  }

  .school-info-wrapper {
    /*background: #647cfb;*/
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: 1;
    z-index: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .school-info-return {
    /*position: relative;*/
    height: 56px;
    flex: none;
  }

  .school-info-title {
    color: #fff;
    text-align: center;
    font-size: 16px;
    /*padding: 14px 10px 16px 50px;*/
    /*overflow: hidden;*/
    white-space: nowrap;
    padding-top: 14px;
    text-overflow: ellipsis;
    /*vertical-align:middle;*/
  }

  .school-info-box {
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 76px);
  }

  .school-info-card {
    background: #fff;
    padding: 16px 10px;
    margin: 0 20px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    min-height: 20px;
    height: 140px;
    overflow: hidden;
  }

  .school-info-detail {
    left: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    width: 100%;

  }

  .school-item__logo {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0;
    margin-top: 10px;
    margin-left: 10px;
    opacity: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .school-item__info {
    padding: 10px 20px 4px 20px;
  }

  .school-item__devide {
    position: relative;
    left: 85px;
    content: '';
    width: 1px;
    /*height: 20%;*/
    height: calc(100% - 40px);
    background: #4859ad12;
    display: block;
  }

  .school-item__name {
    font-size: 16px;
    color: #fff;
  }
  .school-item__enname {
    font-size: 12px;
    color: #fff;
  }
  .school-item__grade,
  .school-item__ranking,
  .school-item__prescore {
    display: inline-block;
    color: #fff;
    border: 1px solid silver;
    margin: 4px 4px 4px 0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .school-score_line {
    display: flex;
    height: 25px;
    margin: 5px 3px;
    position: relative;
    border-radius: 1px;
    box-shadow: 0 1px 4px rgba(75, 92, 178, 0.1);
  }

  /*.school-score_line_item {*/
  /*  position: relative;*/
  /*  margin: 5px 5px;*/
  /*  text-align: center;*/
  /*}*/

  .major-item_no {
    background: #fff;
    margin: 10px 10px 16px;
    font-size: 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    padding-bottom: 10px;
    overflow: hidden;
    position: relative;
  }

  .major-item {
    background: #fff;
    margin: 10px 10px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    min-height: 20px;
    padding-bottom: 10px;
    overflow: hidden;
    /*font-size: 16px;*/
    &.major-item--open {
      .major-item__name {
        /*background: linear-gradient(to right, #647cfb 0%, #7188fb 25%, #fbe2ff 100%);*/
        /*background: linear-gradient(to right, RGB(51,128,215) 0%, RGB(129,179,238) 25%, RGB(168,207,248) 100%);*/
        color: #fff;
        background: linear-gradient(to right, #417dda 0%, #77a5ec 25%, #afd1fb 100%);
        overflow: hidden;
      }

      .major-item__icon {
        transform: rotate(90deg);
      }
    }
  }

  .major-item__name {
    overflow: hidden;
    font-size: 15px;
    padding: 10px;
    /*color: #1e509e;*/
  }

  .major-item__icon {
    position: absolute;
    right: 16px;
    /*margin-top: 10px;*/
    /*bottom: 10px;*/
    top: 68px;
    transform: rotate(-90deg);
    transition: all .2s;

    .iconfont {
      font-size: 15px;
      position: relative;
    }
  }

  .major-item__sub {
    /*transition: all .2s;*/
    margin-bottom: 15px;
    padding: 0 10px;
    overflow: hidden;

  }

  /*.major-item__subname{*/
  /*  color: DimGray ;*/
  /*  font-size: small;*/
  /*  !*float: left;*!*/
  /*  border:1px solid red;*/
  /*  !*display: block;*!*/
  /*}*/
  .major-item_label {
    /*float: left;*/
    /*vertical-align:middle;*/
    vertical-align: auto;
    float: right;
    color: #fff;
    background: #5f95dc;
    border: 1px solid #abc;
    border-radius: 4px;
    /*margin-left: 13px;*/
    /*margin-top: 5px;*/
    margin-right: 7px;
    font-size: xx-small;
    text-align: center;
    /*padding-left: 3px;*/
    /*padding-right: 3px;*/
    /*margin-top: 0px;*/
  }

  .school-score {
    background: #fff;
    font-size: 16px;
    margin: 10px 10px 14px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    padding-bottom: 10px;
    overflow: hidden;
    /*position: relative;*/
  }

  .school-introduction {
    background: #fff;
    position: relative;
    /*font-size: 16px;*/
    margin: 10px 10px 14px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }

  .school-introduction-content {
    margin: 10px 20px 14px 14px;
    text-indent: 30px;
    padding-bottom: 10px;
    overflow: hidden;
    color: #aaa;
    font-size: 14px;
  }
  .school-introduction_content{
    margin: 10px 20px 10px 14px;
    text-indent: 30px;
    /*padding-bottom: 10px;*/
    overflow: hidden;
    color: #aaa;
    font-size: 14px;
  }
  .unfold {
    z-index: 11;
    width: 40px;
    height: 21px;
    outline: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    p {
      margin: 0;
      line-height: 21px;
      color: #7fbe87;
    }
  }
  .school-introduction-info {
    margin: 10px 20px 10px 14px;
    color: #aaa;
    font-size: 14px;
    overflow:hidden;
    height: 60px;
    /*尾部留空字符数*/
    /*padding-right: 4em;*/
    /*overflow: hidden;*/
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    /*display: -webkit-box;*/
    /*overflow:hidden;*/
    /*-webkit-box-orient: vertical;*/
    /*-webkit-line-clamp: 2;*/
  }
  .school-introduction-info2 {
    margin: 10px 20px 10px 14px;
    color: #aaa;
    font-size: 14px;
  }
  .school-introduction-info1 span,
  .school-introduction-info2 span {
    float: right;
    /*right: 15px;*/
    font-size: 13px;
    padding-right: 20px;
    color: #5f95dc;
    margin-bottom: 5px;
  }
  .school-introduction-link {
    position: absolute;
    top: 23px;
    right: 20px;
    width: 46px;
  }
  .school-introduction-detail {
    color: #ADADAD;
    right: 35px;
    font-size: 12px;
  }

  .school-introduction-icon {
    position: absolute;
    font-size: 12px;
    right: -2px;
    top: -2px;
    transform: rotate(-180deg);
  }

  .school-picture {
    position: relative;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    margin: 10px 10px 16px;
    overflow: hidden;
  }

  .school-picture-img {
    /*position: absolute;*/
    width: 320px;
    height: 200px;
    /*top: 30%;*/
    margin-left: 15px;
    padding-bottom: 10px;
    /*margin: 0 10px 25px 25px;*/
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    /*overflow: hidden;*/
    img {
      width: 100%;
      height: 100%;
    }
  }
  .school-score_line .school-score_content{
    /*float: left;*/
    flex: 50%;
    width: 50%;    /*根据自己项目进行定义宽度*/
    overflow: hidden;     /*设置超出的部分进行影藏*/
    text-overflow: ellipsis;     /*设置超出部分使用省略号*/
    white-space:nowrap ;    /*设置为单行*/
  }
  .school-score_label {
    flex: 50%;
    div:nth-child(2) {
      width: 50%;    /*根据自己项目进行定义宽度*/
      overflow: hidden;     /*设置超出的部分进行影藏*/
      text-overflow: ellipsis;     /*设置超出部分使用省略号*/
      white-space:nowrap ;    /*设置为单行*/
    }
  }
  .userInfo{
    font-size: 14px;
    margin: 2% 4%;
    float: left;
  }
  .schoolScoreLine {
    padding-top: 2px;
    margin: 3px 4px 5px;
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
