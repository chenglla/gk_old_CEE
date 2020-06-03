<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="zyyc_info">
      <div class="predict_header">
        <div class="return__icon" @click="gotoPage('home')" style="float: left;margin-right: 10px;">
          <i class="iconfont iconleft-arrow"></i>
        </div>
        <i class="iconfont iconlocation"></i>
        <span>{{province}}</span>
        <span>{{category}}</span>
        <div @click="gotoRecord()" style="right: 10px;position: absolute;top: 5px;padding: 4px 0;color: #fff;">
          <i class="iconfont iconshizhong"></i>
          <i class="iconfont icondian"></i>
        </div>
        <img src="../assets/img/zt.png" alt="" class="zyyc_left">
        <img src="../assets/img/yt.png" alt="" class="zyyc_right">
      </div>
      <div class="predict_second">
        <div>
<!--        <div class="predict_second_input">-->
          <input type="text" class="predict_score" v-model="score" maxlength="3" @input="handleInput" @click="toggleInput" ref="scoreInput" placeholder="点击请输入成绩">
<!--          <input type="text" class="predict_score" v-model="score" maxlength="3" @blur="gotoBlur" @input="handleInput" @click="toggleInput" ref="scoreInput" placeholder="点击请输入成绩">-->
        </div>
        <p class="predict_second_tip">我的高考成绩</p>
      </div>
      <div class="predict_third">
        <div class="predict_third_left"><span>批次：</span>{{batch}}</div>
        <div class="predict_third_right"><span>省市排名：</span>
          <span v-if="score === ''">--</span>
          <input v-else type="text" oninput = "value=value.replace(/[^\d]/g,'')" v-model="rank" class="predict_paiming">名
        </div>
      </div>
      <div class="predict_four">
        <span class="predict_four_button" @click="startSchoolPredict">马上预测</span>
<!--        <span class="predict_four_button" @click="startSchoolPredict" v-show="showPredict">马上预测</span>-->
<!--        <span class="predict_four_button" v-show="!showPredict">马上预测</span>-->
      </div>
    </div>
    <div class="predict__result">
      <div class="predict__tab">
        <ul>
          <li class="predict__tab-item" :class="{'active': curTab === 'tiao'}" @click="changTab('tiao')">挑战学校</li>
          <li class="predict__tab-item" :class="{'active': curTab === 'wen'}" @click="changTab('wen')">稳妥学校</li>
          <li class="predict__tab-item" :class="{'active': curTab === 'bao'}" @click="changTab('bao')">保底学校</li>
       </ul>
      </div>
<!--      <div class="predict__pay predict__list&#45;&#45;noview" v-if="!loading && noview && list.length !== 0" @click="toPay">-->
      <div class="predict__pay predict__list--noview" v-if="!loading && noview && list.length !== 0 && curTab === 'wen'" @click="toPay">
<!--      <div class="predict__pay predict__list&#45;&#45;noview" v-if="!loading && noview && list.length !== 0 && curTab === 'tiao'" @click="toPay">-->
        <div class="predict__paytext">
          <i class="iconfont iconsuo"></i>
          <span class="pay-tips">解锁全部学校</span>
        </div>
      </div>
      <div  ref="schoolWrapper" class="predict__list">
<!--        <div class="predict__list" v-if="curTab !== 'tiao'">-->
          <div class="school-list" v-if="curTab !== 'wen'">
            <!--          <div class="list-loading" v-if="loading">-->
            <!--            <div class="loader"></div>-->
            <!--          </div>-->
            <!--          {{loading}}-->
            <!--          <box gap="10px">-->
            <!--          <box gap="20px" class="jiaZai">-->
            <box gap="20% 20px" v-if="loading" class="jiaZai">
              <div class="list-loading">
                <div class="loader"></div>
              </div>
              <!--            <x-progress :percent="percentMsg" :show-cancel="false" style="background-color:rgb(0, 115, 231);"></x-progress>-->
<!--              <p>已加载 {{percentMsg}}% </p>-->
            </box>
            <div class="list-no-data" v-if="!loading && list.length === 0">
              <template v-if="!loaded">
                <i class="iconfont iconwuxinxi"></i>
                <div>
                  您还没有预测呦~
                </div>
              </template>
              <template v-else-if="loaded">无结果，请核实您的分数和批次</template>
            </div>
            <div class="school-item" v-if="!loading && list.length !== 0" v-for="school in list" @click="gotoDetailPage(school)">
              <div class="school-item__logo"><img :src="school.logo"></div>
              <div class="school-item__devide"></div>
              <div class="school-item__info">
                <div class="school-item__name">
                  {{school.schoolname}}
                  <div v-if="school.wantcity === 1" class="goal_city">志愿省份</div>
<!--                  <div v-if="school.wantcity === 1" class="goal_city">{{school.schoolname}}</div>-->
<!--                  <div v-if="school.wantcity === 0" class="no_goal_city">{{school.schoolname}}</div>-->
                  <!--                <span v-for="(item, index) in labelList" :key="index">{{item}}</span>-->
                  <span v-if="school.f985 === 1">985</span>
                  <span v-if="school.f211 === 1">211</span>
                  <span v-if="school.dualClassName !==''">{{school.dualClassName}}</span>
                  <span v-if="school.zslxName !== null">{{school.zslxName}}</span>
                </div>
                <div class="school-item_rank">
                  <div class="school-item_rank_left">
                    名次:
                    <span v-if="school.addpaiming > 0">+{{school.addpaiming}}</span>
                    <span v-else>{{school.addpaiming}}</span>
                  </div>
                  <div class="school-item_rank_right">
                    {{school.paiming}}名
                    <div>19年最低位次</div>
                  </div>
                </div>
                <div class="school-item_rank">
                  <div class="school-item_rank_left">
                    扩招:
                    <span>{{school.addenrol}}人</span>
                  </div>
                  <div class="school-item_rank_right">
                    <div>19年招生：<span>{{school.enrolment}}人</span></div>
                    <div>20年招生：<span>{{school.nowenrolment}}人</span></div>
                    <div @click.stop="gotoMajorPlan(school.schoolname)">查看详情>></div>
                  </div>
                </div>
                <div class="school-item_score">
                  我的分数:
<!--                  <span>+{{score-school.min}}</span>-->
                  <span v-if="score - school.min > 0">+{{score-school.min}}</span>
                  <span v-else>{{score-school.min}}</span>
                  分，19年最低分数: <span>{{school.min}}</span>分。
                </div>
                <!--              <div class="school-item__ranking">推荐批次: {{school.batch}}</div>-->
                <!--              <div class="school-item__grade">{{school.grade}}</div>-->

                <!--              <div class="school-item__ranking">推荐批次: 本科提前批</div>-->
                <!--              <div class="school-item__prescore" @click.stop="gotoMajorPlan">专业招生计划 ></div>-->
                <!--              <div class="school-item__prescore">19年最低分和位次: {{school.prescore}}</div>-->
                <!--              <div class="school-item__prescore">对比19年位次: {{school.prescore}}</div>-->
              </div>
            </div>
            <div class="school-item-end" v-if="!loading && list.length !== 0 && end">到底了</div>
          </div>
<!--        </div>-->
<!--        <div class="predict__list" :class="{'noview': noview}" v-if="curTab === 'tiao'">-->
          <div class="school-list" :class="{'noview': noview}" v-if="curTab === 'wen'" @click="toPay">
                      <div class="list-loading" v-if="loading">
                        <div class="loader"></div>
                      </div>
            <!--          {{loading}}-->
            <!--          <box gap="10px">-->
            <!--          <box gap="20px" class="jiaZai">-->
<!--            <box gap="20% 20px" v-if="loading" class="jiaZai">-->
<!--              <div class="list-loading">-->
<!--                <div class="loader"></div>-->
<!--              </div>-->
<!--              &lt;!&ndash;            <x-progress :percent="percentMsg" :show-cancel="false" style="background-color:rgb(0, 115, 231);"></x-progress>&ndash;&gt;-->
<!--&lt;!&ndash;              <p>已加载 {{percentMsg}}% </p>&ndash;&gt;-->
<!--            </box>-->
            <div class="list-no-data" v-if="!loading && list.length === 0">
              <template v-if="!loaded">
                <i class="iconfont iconwuxinxi"></i>
                <div>
                  您还没有预测呦~
                </div>
              </template>
              <template v-else-if="loaded">无结果，请核实您的分数和批次</template>
            </div>
            <div class="school-item" v-if="!loading && list.length !== 0" v-for="school in list" @click="gotoDetailPage(school)">
              <div class="school-item__logo"><img :src="school.logo"></div>
              <div class="school-item__devide"></div>
              <div class="school-item__info">
                <div class="school-item__name">
                  {{school.schoolname}}
                  <!--                <span v-for="(item, index) in labelList" :key="index">{{item}}</span>-->
                  <span v-if="school.f985 === 1">985</span>
                  <span v-if="school.f211 === 1">211</span>
                  <span v-if="school.dualClassName !==''">{{school.dualClassName}}</span>
                  <span v-if="school.zslxName !== null">{{school.zslxName}}</span>
                </div>
                <div class="school-item_rank">
                  <div class="school-item_rank_left">
                    名次:
                    <span v-if="school.addpaiming > 0">+{{school.addpaiming}}</span>
                    <span v-else>{{school.addpaiming}}</span>
                  </div>
                  <div class="school-item_rank_right">
                    {{school.paiming}}名
                    <div>19年最低位次</div>
                  </div>
                </div>
                <div class="school-item_rank">
                  <div class="school-item_rank_left">
                    扩招:
                    <span>{{school.addenrol}}人</span>
                  </div>
                  <div class="school-item_rank_right">
                    <div>19年招生：<span>{{school.enrolment}}人</span></div>
                    <div>20年招生：<span>{{school.nowenrolment}}人</span></div>
                    <div @click.stop="gotoMajorPlan(school.schoolname)">查看详情>></div>
                  </div>
                </div>
                <div class="school-item_score">
                  我的分数:
                  <span v-if="score - school.min > 0">+{{score-school.min}}</span>
                  <span v-else>{{score-school.min}}</span>
                  分，19年最低分数: <span>{{school.min}}</span>分。
                </div>
                <!--              <div class="school-item__ranking">推荐批次: {{school.batch}}</div>-->
                <!--              <div class="school-item__grade">{{school.grade}}</div>-->

                <!--              <div class="school-item__ranking">推荐批次: 本科提前批</div>-->
                <!--              <div class="school-item__prescore" @click.stop="gotoMajorPlan">专业招生计划 ></div>-->
                <!--              <div class="school-item__prescore">19年最低分和位次: {{school.prescore}}</div>-->
                <!--              <div class="school-item__prescore">对比19年位次: {{school.prescore}}</div>-->
              </div>
            </div>
            <div class="school-item-end" v-if="!loading && list.length !== 0 && end">到底了</div>
          </div>
<!--        </div>-->
      </div>
    </div>
    <div class="predict__tips" v-if="agreeDiag !== 'hide'">
      <div class="predict__tips__overlay"></div>
      <div class="predict__tips__content">
        <div class="tips__header">免责声明</div>
        <div class="tips__body">
          <p>使用提醒：在您使用高考预测系统前，请务必仔细阅读并透彻理解本声明。如果您使用本系统，您的行为将被视为对本声明全部内容的认可。若您使用本系统预测结果作为志愿填报，应当自行承担相应风险，我们不做任何形式的保证。中科智禾尊重并保护所有用户的个人隐私权，您个人资料，非经您亲自许可或根据相关法律、法规的强制性规定，不会主动地泄露给第三方。</p>
        </div>
        <div class="tips_footer">
          <div class="tips__btn" @click="closeAgree">同意</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getYuce, getSchoolInfo, myInfo, getPaiming, getGoalCity } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  import { XProgress, Box } from 'vux'
  import BScroll from 'better-scroll'
  import _ from 'underscore'
  export default {
    components: {
      XProgress,
      Box
    },
    data () {
      return {
        labelList: ['211', '双一流'], // 学校标签，如211， 双一流
        batch: '',
        category: '',
        province: '',
        score: '',
        rank: 0,
        curTab: 'tiao',
        // curTab: 'bao',
        loading: false,
        list: [],
        wenList: [],
        tiaoList: [],
        baoList: [],
        end: false,
        schoolScroll: null,
        loaded: false,
        agreeDiag: '',
        noview: false, // 蒙层
        count: '',
        websocket: [],
        dialogPortVisible: true,
        percentMsg: 0,
        showPredict: true,
        TimeId: -1,
        goalCity: '' // 意向城市
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      this.getUserInfo()
      // WebSocket
      // if ('WebSocket' in window) {
      //   this.websocket = new WebSocket('ws://47.104.223.129:11002/cee/websocket/' + this.openid)
      //   this.initWebSocket()
      // } else {
      //   alert('当前浏览器 Not support websocket')
      // }
      // console.log('222222222222', this.score !== '')
      // console.log('333333333333', this.score)
      if (this.$route.query.score !== undefined) {
        this.score = this.$route.query.score
      } else if (localStorage.score !== undefined) {
        this.score = localStorage.score
      }
      console.log('333333333333')
      if (this.score !== '') {
        this.gotoBlur()
        const a = document.querySelector('.predict_score')
        // a.value = this.score + '分'
        // a.removeAttribute('placeholder')
        a.parentNode.className = 'predict_second_input'
      }
      console.log('333333344444')
      if (localStorage.agreeDiag !== undefined) {
        this.agreeDiag = localStorage.agreeDiag
      } else {
        this.agreeDiag = 'show'
      }
      this.loaded = false
      console.log('33333355555')
      this.getGoalCity()
      // this.getList()

      if (this.$route.query.pay !== undefined) {
        if (this.$route.query.pay.toString() === '1') {
          this.noview = false
        } else if (this.$route.query.pay.toString() === '0') {
          // if (this.curTab === 'tiao') {
          this.noview = true
          errorMsg(this, '付款失败')
          // }
        }
      }
    },
    // created () {
    //   this.getGoalCity()
    // },
    activated () {
      console.log('actived')
      this.getUserInfo()
      // this.getGoalCity()
      // if (this.$route.query.score !== undefined) {
      //   this.score = this.$route.query.score
      // } else if (localStorage.score !== undefined) {
      //   this.score = localStorage.score
      // }
      // // console.log('333333333333')
      // if (this.score !== '') {
      //   this.gotoBlur()
      //   const a = document.querySelector('.predict_score')
      //   // a.value = this.score + '分'
      //   // a.removeAttribute('placeholder')
      //   a.parentNode.className = 'predict_second_input'
      // }
      // // console.log('333333344444')
      // if (localStorage.agreeDiag !== undefined) {
      //   this.agreeDiag = localStorage.agreeDiag
      // } else {
      //   this.agreeDiag = 'show'
      // }
      // this.loaded = false
      // // console.log('33333355555')
      // this.getList()
      //
      // if (this.$route.query.pay !== undefined) {
      //   if (this.$route.query.pay.toString() === '1') {
      //     this.noview = false
      //   } else if (this.$route.query.pay.toString() === '0') {
      //     this.noview = true
      //     errorMsg(this, '付款失败')
      //   }
      // }
    },
    methods: {
      gotoRecord () {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/record'})
      },
      getUserInfo () {
        myInfo(this.openid).then(res => {
          this.batch = res.data.data.batch || '暂无'
          this.category = res.data.data.category || '暂无'
          this.province = res.data.data.province || '暂无'
        })
        // 获取意向城市
        // getGoalCity({
        //   openid: this.openid
        // }).then(resp => {
        //   if (resp.data.code === 0) {
        //     this.goalCity = resp.data.data.city
        //   }
        // })
      },
      getGoalCity () {
        // 获取意向城市
        getGoalCity({
          openid: this.openid
        }).then(resp => {
          if (resp.data.code === 0) {
            this.goalCity = resp.data.data.city
            this.getList()
          }
        })
      },
      // setOnmessageMessage (event) {
      //   // 服务器推送的消息
      //   console.log('服务端返回：' + event.data)
      //   // percentMsg就是绑定的进度值
      //   this.percentMsg = parseInt(event.data)
      //   if (this.percentMsg === 100) {
      //     // 如果进度是100 dialog框就隐藏
      //     this.dialogPortVisible = false
      //     console.log('closing')
      //     // this.showPredict = true
      //     console.log('closed')
      //   }
      // },
      // onbeforeunload () {
      //   this.closeWebSocket()
      // },
      // closeWebSocket () {
      //   this.websocket.close()
      // },
      // initWebSocket: _.debounce(function () {
      //   // 连接错误
      //   // this.websocket.onerror = this.setErrorMessage
      //   // 连接成功
      //   // this.websocket.onopen = this.setOnopenMessage
      //   // 收到消息的回调
      //   this.websocket.onmessage = this.setOnmessageMessage
      //   // 连接关闭的回调
      //   // this.websocket.onclose = this.setOncloseMessage
      //   // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      //   window.onbeforeunload = this.onbeforeunload
      // }, 500, true),
      handleInput () {
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
          this.gotoBlur()
        }, 1000)
        console.log('分数：', this.score)
      },
      gotoBlur () { // 失去焦点获取排名
        getPaiming({
          openid: this.openid,
          score: this.score
        }).then(res => {
          this.rank = res.data.data
          console.log('失去焦点：', res.data)
        })
      },
      toggleInput () {
        this.$refs.scoreInput.focus()
        const a = document.querySelector('.predict_score')
        // a.value = this.score + '分'
        a.removeAttribute('placeholder')
        a.parentNode.className = 'predict_second_input'
        console.log(a)
      },
      rankInput () {
        this.$refs.rankInput.focus()
      },
      gotoDetailPage (school) {
        console.log(7894561313, school)
        getSchoolInfo(school.schoolname, this.openid).then(res => {
          // this.code = school.schoolcode
          this.loading = false
          if (res.data.code === 505) {
            this.show = true
          } else if (res.data.code === 0) {
            this.$router.push({ path: '/schoolInfo/' + this.openid + '/' + school.schoolname })
          } else {
          }
        })
      },
      gotoPage (name) {
        this.$router.push({ name: name })
      },
      gotoMajorPlan (val) {
        console.log('跳转到专业招生计划', val)
        this.$router.push({
          name: 'majorPlan',
          query: {
            schoolName: val
          }
        })
      },
      gotoComplete (name) {
        this.$router.push({ path: '/complete?type=predict' })
      },
      changTab (i) {
        this.curTab = i
        this.list = this[i + 'List']
      },
      startSchoolPredict () { // 主学校预测
        console.log('开始预测')
        this.curTab = 'tiao'
        // this.curTab = 'bao'
        // this.showPredict = false
        this.percentMsg = 0
        if (this.score === '' || isNaN(this.score)) {
          errorMsg(this, '请输入正确分数')
          return
        }
        this.getList()
        // getPaiming({
        //   openid: this.openid,
        //   score: this.score
        // }).then(res => {
        //   this.rank = res.data.data
        //   this.getList()
        //   console.log('失去焦点：', res.data)
        // }).catch(err => {
        //   console.log(err)
        //   // error
        // })
        // this.$nextTick(() => {
        //   this.getList()
        // })
        // this.getList()
      },
      startMajorPredict () { // 主专业预测
        if (this.score === '' || isNaN(this.score)) {
          errorMsg(this, '请输入正确分数')
          return
        }
        this.getList()
      },
      // startPredict () {
      //   if (this.score === '' || isNaN(this.score)) {
      //     errorMsg(this, '请输入正确分数')
      //     return
      //   }
      //   this.getList()
      // },
      getList () {
        console.log('0000000000000')
        if (this.score === '') {
          return
        }
        this.loading = true
        localStorage.setItem('score', this.score)
        if (this.rank === '') {
          this.gotoBlur()
          var a = document.querySelector('.predict_paiming')
          console.log('值：', a)
          // this.$nextTick
        }
        // console.log('排名：', this.rank)

        this.$nextTick(() => {
          console.log('意向城市：', this.goalCity)
          const _this = this
          getYuce({
            openid: this.openid,
            score: this.score,
            paiming: this.rank,
            schoolcity: this.goalCity
          }).then(res => {
            this.loaded = true
            this.loading = false
            this.list = []
            if (res.data.code !== 0) {
              errorMsg(this, res.data.msg)
              this.loaded = false
            } else {
              this.noview = !res.data.data.istrue
              this.wenList = res.data.data.wentuo || []
              this.tiaoList = res.data.data.chongci || []
              this.baoList = res.data.data.baodi || []
              this.list = this.tiaoList
              // this.list = this.baoList
              if (this.list.length !== 0) {
                this.end = true
              } else {
                this.end = false
              }
            }
            this.init()
            // const _this = this
          }).catch(function (err) {
            console.log('异常：', err)
            // const _this = this
            _this.loading = false
            _this.loaded = true
            console.log('异常2', _this.loading)
          })
        })
      },
      init () {
        this.$nextTick(() => {
          this.schoolScroll = new BScroll(this.$refs.schoolWrapper, {
            click: true
          })
        })
      },
      closeAgree () {
        this.agreeDiag = 'hide'
        localStorage.setItem('agreeDiag', 'hide')
      },
      toPay () {
        if (this.score === '') {
          errorMsg(this, '请先输入分数')
          return
        }
        location.href = 'http://zhongkeruitong.top/show/cee/pay/create?openid=' + this.openid + '&score=' + this.score
        // location.href = 'http://www.zhongkeruitong.top:11030/cee/pay/create?openid=' + this.openid + '&score=' + this.score
      }
    }
  }
</script>
<style lang="scss" scoped>
  .zyyc_info {
    background: url("../assets/img/zyyc.png") no-repeat;
    .predict_header {
      padding-top: 10px;
      margin: 0 5px 5px 15px;
      color: #fff;
      .iconfont {
        font-size: 14px;
        /*margin-right: -4px;*/
       }
      .zyyc_left, .zyyc_right {
        position: absolute;
      }
      .zyyc_right {
        top: 35px;
        right: 0;
        width: 35px;
      }
      .zyyc_left {
        top: 105px;
        left: 0;
        width: 50px;
      }
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.5);
      /*letter-spacing: 0.1em;*/
      font-size: 18px;
      font-family: 宋体,serif;
    }
    .predict_second {
      margin-top: 10px;
      text-align: center;
      position: relative;
      .predict_second_input:after {
        content: '分';
        /*position: absolute;*/
        color: #fff;
        margin-left: 0;
      }
      .predict_score {
        outline: 0;
        background-color: transparent;
        border: 0;
        font-size: 20px;
        text-align: center;
        width: 35%;
        /*color: rgba(255, 255, 255, 0.5);*/
        color: #fff;
        font-family: 宋体,serif;
        /*&:after {*/
        /*  content: '分';*/
        /*  position: absolute;*/
        /*  top: 0;*/
        /*  right: 0;*/
        /*  color: #f43530;*/
        /*  z-index: 999;*/
        /*}*/
      }
      /*&:after {*/
      /*  content: '分数';*/
      /*}*/
      .predict_second_tip {
        color: #fff;
        margin-top: 3px;
      }
    }
    .predict_third {
      margin-top: 10px;
      text-align: center;
      display: flex;
      .predict_third_left,
      .predict_third_right {
        display: inline-block;
        padding: 0 20px;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span:first-child {
          color: rgba(255, 255, 255, 0.5);
        }
        .predict_paiming {
          /*display: none;*/
          outline: 0;
          background-color: transparent;
          border: 0;
          width: 48px;
          color: #fff;
          margin-left: -8px;
          /*padding: 0 2px;*/
          /*font-family: 宋体,serif;*/
        }
      }
      .predict_third_left {
        flex: 3;
        /*width: 130px;*/
      }
      .predict_third_right {
        flex: 4;
        /*width: 140px;*/
      }
    }
    .predict_four {
      /*width: 100%;*/
      margin: 15px 0 50px;
      text-align: center;
      /*color: #fff;*/
      .predict_four_button {
        background: #fff;
        padding: 6px 35px;
        /*text-align: center;*/
        /*background: #fff;*/
        color: rgb(0, 115, 231);
        /*width: 120px;*/
        border-radius: 15px;
        /*padding: 4px 10px;*/
      }
    }
  }
  /*.predict-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 56px;
  }*/
  /*.fen {*/
  /*  input:after {*/
  /*      content: '分';*/
  /*      position: absolute;*/
  /*      top: 0;*/
  /*      right: 0;*/
  /*  }*/
  /*}*/
  div .jiaZai >>> .weui-progress >>> .weui-progress__bar >>> .weui-progress__inner-bar {
    background-color: rgb(0, 115, 231);
  }
  .jiaZai {
    p {
      /*width: 100%;*/
      text-align: center;
      margin: 10px auto;
      color: #9c9c9c;
    }
  }
   .predict__score {
    flex: none;
    position: relative;
    overflow: hidden;
    margin: 20px;
    padding: 10px 10px 20px 10px;
    /*background: #fff;*/
    border-radius: 4px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    i.iconfont {
      position: absolute;
      font-size: 140px;
      top: -80px;
      right: -40px;
      color: rgba(112, 135, 250, .1);
    }
  }
  /*.predict__score-input {
    width: 80px;
    margin: 0 auto 10px 30%;
    display: block;
    position: relative;
    input {
      border: 0;
      border-bottom: 2px solid #4859ad;
      font-size: 24px;
      color: #4cb710;
      width: 100%;
      text-align: center;
    }
    &:after {
      content: '分';
      position: absolute;
      top: 13px;
      right: -25px;
    }
  }*/
  /*.predict__score-input {
    width: 80px;
    margin: 0 auto 5px 30%;
    display: block;
    position: relative;
    input {
      border: 0;
      border-bottom: 2px solid #4859ad;
      font-size: 26px;
      color: #4cb710;
      width: 100%;
      text-align: center;
    }
    &:after {
      content: '分';
      position: absolute;
      top: 15px;
      right: -25px;
    }
  }*/
  /*.predict__rank-input {
    width: 80px;
    margin: 0 auto 20px 30%;
    display: block;
    position: relative;
    input {
      border: 0;
      border-bottom: 2px solid #4859ad;
      font-size: 26px;
      color: #4cb710;
      width: 100%;
      text-align: center;
    }
    &:after {
        content: '名';
        position: absolute;
        top: 15px;
        right: -25px;
      }
    &:before {
      content: '省市排名:';
      position: absolute;
      top: 15px;
      left: -70px;
    }
  }*/
  .predict__rank-input {
    width: 80px;
    margin: 15px auto 20px 30%;
    display: block;
    position: relative;
    input {
      border: 0;
      border-bottom: 2px solid #4859ad;
      font-size: 24px;
      color: #4cb710;
      width: 100%;
      text-align: center;
    }
    &:after {
      content: '名';
      position: absolute;
      top: 12px;
      right: -25px;
    }
    &:before {
      content: '省市排名:';
      position: absolute;
      top: 12px;
      left: -70px;
    }
  }
  .predit_button {
    text-align: center;
    .predict__score-btn {
      background: #4859ad;
      color: #fff;
      width: 100px;
      font-size: 13px;
      margin: 10px 10px 0;
      text-align: center;
      border-radius: 4px;
      padding: 6px 10px;
      display: inline-block;
    }
  }
  .predict__tab {
    text-align: center;
    font-size: 0;
    height: 28px;
  }
  .predict__tab-item {
    display: inline-block;
    color: #8a8a8a;
    position: relative;
    width: 80px;
    text-align: center;
    padding-bottom: 6px;
    font-size: 14px;
    &.active {
      font-weight: bold;
      color: #4859ad;
      &:after {
        content: '';
        width: 40px;
        height: 2px;
        background: #4859ad;
        position: absolute;
        left: 20px;
        bottom: 0;
      }
    }
  }
  .predict__result {
    flex: 0;
    height: calc(100% - 183px);
    width: 90%;
    position: absolute;
    top: 175px;
    /*margin: 0 auto;*/
    padding: 7px 0;
    background-color: #fff;
    left: 50%;
    transform: translateX(-50%);
  }
  .predict__list {
    height: calc(100% - 30px);
    overflow: hidden;
    background: #fff;
    position: relative;
    /*&.noview {*/
    /*  filter: blur(16px);*/
    /*}*/
  }
  .list-no-data {
    .iconfont {
      font-size: 47px;
      color: rgb(26, 134, 241);
    }
  }
  .school-list {
    padding-bottom: 40px;
  }
  .school-item {
    /*-webkit-filter:blur(16px);*/
    /*<!--filter: not(first-child);-->*/
    margin: 0;
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid #bcbcbc;
    /*margin-bottom: 0;*/
    /*margin-right: 0;*/
    .noview & {
      & {filter: blur(16px);}
      border-top: 1px solid #f9f9f9;
    }
    /*.noview & + & {*/
    /*  &:not(first-child) {filter: blur(16px);}*/
    /*  border-top: 1px solid #f9f9f9;*/
    /*}*/
  }
  /*.school-item__logo {*/
  /*  position: absolute;*/
  /*  width: 50px;*/
  /*  height: 50px;*/
  /*  top: 0;*/
  /*  right: 0;*/
  /*  margin-top: 10px;*/
  /*  margin-left: 10px;*/
  /*  opacity: 0.3;*/
  /*  img {*/
  /*    width: 100%;*/
  /*    height: 100%;*/
  /*  }*/
  /*}*/
  .school-item__logo {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 0;
    right: -13px;
    opacity: .4;
    margin-top: -13px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .school-item__info {
    padding-left: 0;
    position: relative;
  }
  /*.school-item__devide {*/
  /*  position: absolute;*/
  /*  left: 75px;*/
  /*  content: '';*/
  /*  width: 1px;*/
  /*  height: calc(100% - 20px);*/
  /*  background: #4859ad12;*/
  /*  display: block;*/
  /*}*/
  .school-item__name {
    margin-top: 4px;
    font-size: 15px;
    color: #000;
    padding-bottom: 5px;
    border-bottom: 1px solid #ececec;
    padding-top: 2px;
    position: relative;
    /*&:after {*/
    /*  font-size: 13px;*/
    /*  position: absolute;*/
    /*}*/
    /*after*/
    /*.no_goal_city {*/
    /*  display: inline;*/
    /*}*/
    /*.goal_city {*/
    /*  display: inline;*/
    /*  padding: 0 1px;*/
    /*  background-color: rgba(245, 108, 108, 0.7);*/
    /*  font-size: 12px;*/
    /*  color: #fff;*/
    /*  &:after{*/
    /*    content:'';*/
    /*    !*display: flex;*!*/
    /*    position:absolute;*/
    /*    right:100%;*/
    /*    bottom:0px;*/
    /*    width:16px;*/
    /*    height:16px;*/
    /*    border-width:0;*/
    /*    border-style:solid;*/
    /*    border-color:transparent;*/
    /*    border-top-width:10px;*/
    /*    border-top-color:currentColor;*/
    /*    border-radius:32px 0 0 0;*/
    /*    color:#dddddd;*/
    /*  }*/
    .goal_city {
      /*z-index: 10;*/
      position: absolute;
      /*background-color: #FF6666;*/
      background-color: rgba(245, 108, 108, 0.5);
      font-size: 12px;
      color: #fff;
      padding: 0 5px;
      top: -13px;
      left: 30%;
      border-width:0;
      border-style:solid;
      border-color:transparent;
      /*border-top-width:10px;*/
      /*border-top-color:currentColor;*/
      border-radius: 10px 0 0 0;
      /*!*border-top-left-radius: 10px;*/
      border-bottom-left-radius: -10px;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
    }
    span {
      font-size: 12px;
      border: 1px solid rgb(26, 134, 241);
      padding: 1px 1px;
      margin-left: 3px;
      color: rgb(26, 134, 241);
      border-radius: 4px;
      letter-spacing: 0;
    }
    span:first-child {
      margin-left: 3px;
    }
  }
  .school-item_rank {
    /*letter-spacing: 0;*/
    margin-top: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ececec;
    position: relative;
    .school-item_rank_left, .school-item_rank_right {
      display: inline-block;
      width: 46%;
      /*position: absolute;*/
    }
    .school-item_rank_left {
      /*float: left;*/
      vertical-align: 50%;
      /*vertical-align: text-top;*/
      margin-top: -10px;
      font-weight: bolder;
      color: #000;
      font-size: 17px;
      border-right: 1px solid #ececec;
      span {
        color: rgb(255, 158, 0);
      }
    }
    .school-item_rank_right {
      /*float: left;*/
      /*border-left: 1px solid #ececec;*/
      /*border-left-width: 15px;*/
      padding-left: 15px;
      color: #000;
      div {
        font-size: 12px;
        color: #9c9c9c;
        span {
          color: #000;
        }
      }
      div:nth-child(3) {
        margin-top: 3px;
        color: rgb(0, 115, 231);
      }
    }
  }
  .school-item_score {
    color: #000;
    margin-top: 5px;
    font-size: 13px;
  }
  /*.school-item__grade,*/
  /*.school-item__ranking,*/
  /*.school-item__prescore {*/
  /*  display: inline-block;*/
  /*  color: #fff;*/
  /*  border: 1px solid silver;*/
  /*  margin: 4px 4px 4px 0;*/
  /*  padding: 2px 8px;*/
  /*  border-radius: 4px;*/
  /*  font-size: 12px;*/
  /*  background: #5f95dc;*/

  /*}*/
  .school-item-end {
    margin-top: 15px;
    padding-bottom: 30px;
  }
  .school-item__devide {
    display: none;
  }
  .predict__tips {
    position: fixed;
    top: 56px;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .predict__tips__overlay {
    background: rgba(0, 0, 0, .3);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .predict__tips__content {
    width: 200px;
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left: -120px;
    padding: 20px;
    border-radius: 10px;
  }
  .tips__header {
    margin-bottom: 10px;
  }
  .tips__body {
    font-size: 13px;
    p {
      margin-bottom: 10px;
      text-align: justify;
    }
  }
  .tips_footer {
    text-align: right;
  }
  .tips__btn {
    display: inline-block;
    background: #4859ad;
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .predict__pay {
    position: absolute;
    line-height: 80px;
    text-align: center;
    font-size: 14px;
    left: 0;
    top: 30px;
    width: 100%;
    height: 100%;
    z-index: 9;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 9;
      left: 0;
      top: 0;
    }
    .iconfont {
      margin-right: 10px;
    }
    .predict__paytext {
      position: absolute;
      width: 140px;
      top: 35%;
      /*top: 225px;*/
      left: 50%;
      color: #848484;
      z-index: 10;
      margin-left: -70px;
      .iconfont {
        border: 1px solid #4859ad;
        border-radius: 40px;
        width: 40px;
        height: 40px;
        display: block;
        line-height: 40px;
        color: #485aad;
        font-size: 20px;
        margin: auto;
      }
    }
    .pay-tips {
      display: block;
      line-height: 1;
      margin-top: 20px;
      color: #4859ad;
    }
  }
  .predict_userinfo {
    position: absolute;
    right: 10px;
    top: 14px;
  }
  .predict_content{
    border: 1px dashed #acd6ff;
    border-radius: 3px;
    text-align: center;
    background-color: #f0f0f0;
    margin: 6px 0;
    padding: 3px 5px;
  }
</style>
