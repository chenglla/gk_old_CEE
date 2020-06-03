<template>
  <div style="height: 90%;width: 100%;display:flex;flex-direction: column;background-color:#fff;">
    <div class="header">
      <div class="agent_first">中科智禾代理收益报表</div>
    </div>
    <div class="content" ref="content">
      <div>
        <div class="agent_all" v-show="groupid === ''">
          <div class="agent_province">
            <p>所有代理引入信息(总付款{{sum}}人):</p>
            <popup-picker class="agent_popup" :data="[provinceList]" :value="province" @on-change="onChangePro" placeholder="请选择"></popup-picker>
          </div>
          <div v-if="agentList.length > 0" class="schoolScoreLine">
            <x-table full-bordered style="background-color:#fff;table-layout: fixed;" class="schoolScoreLineTable">
              <thead>
              <tr>
                <th>代理名称</th>
                <th>代理号</th>
                <th>地区</th>
                <th>付款人数</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in agentList" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.groupId}}</td>
                <td>{{item.province}}</td>
                <td>{{item.paymentcount}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </div>
        <div class="agent_current" v-show="groupid !== ''">
<!--          <p>当前代理号信息</p>-->
          <div class="second">
<!--            <i class="iconfont iconshuxian2"></i>-->
            <p class="one__p--top">当前代理号：{{groupid}}</p>
            <p>引入用户总数：{{userCounts}}</p>
            <p>引入用户付费总数：{{payCount}}</p>
            <p>引入用户付费总额：{{sumMoney}} 元</p>
            <p>代理总收益（按60%抽成）：{{profit}} 元</p>
            <p>上周收益：{{preWeekSummoney}} 元</p>
            <p>本周收益：{{nowWeekSummoney}} 元</p>
            <i class="iconfont icondaili1"></i>
          </div>
<!--          <div class="second">-->
<!--            <i class="iconfont icondaili3"></i>-->
<!--            <p>引入用户总数：{{userCounts}}</p>-->
<!--            <p>引入用户付费总数：{{payCount}}</p>-->
<!--            <p>引入用户付费总额：{{sumMoney}} 元</p>-->
<!--            <p>代理总收益（按60%抽成）：{{profit}} 元</p>-->
<!--            <p>上周收益：{{preWeekSummoney}} 元</p>-->
<!--            <p>本周收益：{{nowWeekSummoney}} 元</p>-->
<!--          </div>-->
<!--          <div class="four">-->

<!--          </div>-->
          <div class="third">
            <x-table full-bordered style="background-color:#fff;table-layout: fixed;" class="schoolScoreLineTable">
              <caption style="text-align: center;color: #0c5ddc;border-bottom: 1px solid #ececec;border-right: 1px solid #ececec">代理用户清单</caption>
              <thead>
                <tr>
                  <td>序号</td>
                  <td>用户微信名</td>
                  <td>引入时间</td>
                  <td>付费次数</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in list" :key="i">
                  <td>{{i}}</td>
                  <td class="td_major">{{item.username}}</td>
                  <td class="td_major">{{item.createTime | formatDate }}</td>
                  <td>{{item.paycount}}</td>
                </tr>
              </tbody>
            </x-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {findAgentInfo, getAllAgent} from '@/api/index'
  import { getOneScoreProvince } from '@/api/oneScore'
  import {formatDate} from '../utils/date.js'
  import BScroll from 'better-scroll'
  import _ from 'underscore'

  export default {
    data () {
      return {
        isEnd: false,
        majorScroll: null,
        list: [],
        page: 0,
        loading: false,
        userName: '',
        userCounts: '',
        payCount: '',
        sumMoney: '',
        profit: '',
        nowTime: '',
        nowWeekSummoney: '',
        preWeekSummoney: '',
        province: [],
        agentList: [],
        provinceList: [],
        sum: 0
      }
    },
    computed: {
      groupid () {
        console.log('groupid:', this.$route.query.groupId || '')
        return this.$route.query.groupId || ''
      }
    },
    mounted () {
      if (this.groupid === '') {
        this.getOneScoreProvince()
        this.getAllAgent()
      } else {
        this.getList()
      }
      this.init()
    },
    filters: {
      formatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.majorScroll = new BScroll(this.$refs.content, {
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
            console.log('上拉')
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
        // this.$nextTick(() => {
        //   this.majorScroll = new BScroll(this.$refs.content, {
        //     click: true
        //   })
        // })
      },
      nextPage: _.debounce(function () {
        console.log(this.isEnd, this.loading)
        if (this.isEnd || this.loading) {
          return
        }
        this.page++
        if (this.groupid === '') {
          this.getAllAgent()
        } else {
          this.getList()
        }
      }, 50, true),
      reList: _.debounce(function () {
      }, 50, true),
      getList () {
        findAgentInfo({
          // groupId: this.groupId,
          groupId: this.groupid,
          page: this.page
        }).then(res => {
          this.userName = res.data.data.username
          this.userCounts = res.data.data.usercounts
          this.payCount = res.data.data.paycount
          this.sumMoney = res.data.data.summoney
          this.profit = res.data.data.profit
          this.preWeekSummoney = res.data.data.preWeekSummoney
          this.nowWeekSummoney = res.data.data.nowWeekSummoney
          this.nowTime = res.data.data.nowTime
          // if (this.list.length > 0) {
          //   this.list.push(res.data.data.agentusers)
          // }
          if (res.data.data.agentusers.length < 10) {
            this.isEnd = true
          }
          const userName = this.list.map(item => item.username)
          res.data.data.agentusers.map(item => {
            if (userName.indexOf(item.username) === -1) {
              this.list.push(item)
            }
          })
          this.$nextTick(() => {
            this.majorScroll && this.majorScroll.refresh()
          })
        })
      },
      getAllAgent () {
        getAllAgent({
          province: this.province[0],
          page: this.page,
          pageSize: 20
        }).then(res => {
          if (res.data.code === 0) {
            console.log('获取所有代理：', res.data)
            this.sum = res.data.data.sum
            if (res.data.data.data.length < 20) {
              this.isEnd = true
            }
            const userName = this.agentList.map(item => item.groupId)
            res.data.data.data.map(item => {
              if (userName.indexOf(item.groupId) === -1) {
                this.agentList.push(item)
              }
            })
            this.$nextTick(() => {
              this.majorScroll && this.majorScroll.refresh()
            })
            // this.agentList = res.data.data.data
          }
        })
      },
      getOneScoreProvince () {
        console.log(this.province)
        getOneScoreProvince().then(res => {
          // console.log(res.data)
          this.provinceList = res.data
        })
      },
      onChangePro (val) {
        this.province = val
        this.page = 0
        this.agentList = []
        this.getAllAgent()
      }
    }
  }
</script>
<style scoped lang="scss">
  .header {
    /*background: #647cfb;*/
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    color: #fff;
    /*background: linear-gradient(to right, #647cfb 0%, #7188fb 25%, #4758ac 100%);*/
    flex: none;
    z-index: 1;
    height: 45px;
  }
  .agent_first {
    font-size: 18px;
    text-align: center;
    line-height: 45px;
  }
  .content {
    position: relative;
    margin: 18px 0 15px 0;
    height: calc(100% - 76px);
  }
  .agent_all {
    p {
      color: #9c9c9c;
      text-indent: 1em;
    }
  }
  .agent_province {
    display: flex;
    p {
      height: 40px;
      line-height: 40px;
      flex: 2;
    }
    .agent_popup {
      flex: 1;
    }
  }
  .vux-cell-box:not(:first-child):before {
    border: unset;
  }
  .first {
    /*font-size: large;*/
    /*position: absolute;*/
    /*border: 1px solid red;*/
    margin: 5px 10px;
    padding: 12px 10px 12px 20px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    .icondaili1 {
      font-size: 40px;
      position: absolute;
      top: 0;
      right: 0;
      opacity: .2;
      color: #FF9933;
    }
    .iconshuxian2 {
      color: #ec8b89;
    }
  }
  .second .one__p--top {
    /*text-indent: 0;*/
    margin-left: 0;
    /*padding-left: 30px;*/
    line-height: 40px;
    position: relative;
    color: #0c5ddc;
    /*text-align: center;*/
    font-size: 20px;
    &:before {
      content: "\e66b";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      opacity: 0.2;
      color: #FF9933;
      position: absolute;
      left: -20px;
      top: -10px;
    }
  }
  .second {
    border: 1px dashed #4db94d;
    margin: 15px 10px;
    padding: 5px 10px 5px 10px;
    box-shadow: 1px 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 10px;
    position: relative;
    p {
      /*margin-left: 50%;
      transform: translateX(-50%);*/
      color: #9c9c9c;
      /*margin-left: 20%;*/
      text-indent: 2em;
      line-height: 26px;
    }
    .iconshuxian2 {
      color: #ec8b89;
    }
    .icondaili1 {
      font-size: 70px;
      position: absolute;
      bottom: -20px;
      right: 0;
      opacity: .1;
      color: #FF9933;
    }
  }

  .third {
    /*border: 1px solid black;*/
    margin: 15px 10px;
    /*padding: 5px 10px 5px 20px;*/
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 10px;
  }
  .four {
    border: 1px solid pink;
    margin: 15px 10px;
    padding: 5px 10px 5px 20px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 10px;
  }
  .trcontent {
    /*border: 1px dashed red;*/
    width: 100%;
    height: 30px;
  }

  .tdclass {
    border: 1px dashed black;
    font-size: 13px
  }
  .schoolScoreLine {
    color: #767c98;
    padding-top: 2px;
    margin: 10px 8px 10px;
    text-align: center;
    border-radius: 10px;
    background-color: #fff;
  }
  tbody tr:nth-child(2n) {
    /*background-color: rgb(229,253,239);*/
    /*background-color: rgba(46,122,241,0.2);*/
    background-color: rgb(242, 242, 242);
  }
  tbody tr td {
    /*border: 1px solid rgba(46,122,241,0.2);*/
    font-size: 13px;
  }
  thead tr th {
    /*border: 1px solid rgba(46,122,241,0.2);*/
    color: #0c5ddc;
    background-color: rgb(242, 242, 242);
    /*font-weight: bold;*/
    font-size: 14px;
  }
  table.vux-table.schoolScoreLineTable {
    line-height: 33px;
  }
  .td_major {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
  }
</style>
