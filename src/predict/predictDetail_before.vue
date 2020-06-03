<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="predict-box">
      <div class="predict__header">
        <div class="predict-return return-box">
          <div class="return__icon" @click="gotoPage('record')">
            <i class="iconfont iconleft-arrow"></i>
            <span>历史预测</span>
          </div>
        </div>
        <div @click="gotoRecord()" style="right: 10px;position: absolute;top: 6px;padding: 8px 6px;color: #fff;font-size:20px">
          <i class="iconfont iconshizhong"></i>
          <i class="iconfont icondian"></i>
        </div>
      </div>
    </div>
    <div class="predict__score">
      <i class="iconfont iconfenshu-"></i>
      <div class="predict__score-label">你的高考成绩为</div>
      <div class="predict_userinfo">
        <p class="predict_content" >{{province}}</p>
        <p class="predict_content" >{{category}}</p>
        <p class="predict_content" >{{batch}}</p>
      </div>
      <div class="predict__score-input">
        <input type="text" maxlength="3" @click="toggleInput" ref="scoreInput" :value="score" disabled style="background-color: #FFFFFF">
      </div>
    </div>
    <div class="predict__result">
      <div class="predict__tab">
        <ul>
          <li class="predict__tab-item" :class="{'active': curTab === 'bao'}" @click="changTab('bao')">保底学校</li>
          <li class="predict__tab-item" :class="{'active': curTab === 'wen'}" @click="changTab('wen')">稳妥学校</li>
          <li class="predict__tab-item" :class="{'active': curTab === 'tiao'}" @click="changTab('tiao')">挑战学校</li>
        </ul>
      </div>
      <div class="predict__list" ref="schoolWrapper">
        <div class="school-list" ref="schoolList">
          <div class="list-loading" v-if="loading">
            <div class="loader"></div>
          </div>
          <div class="list-no-data" v-if="!loading && list.length === 0">
            <template v-if="!loaded">请输入预测录取分数</template>
            <template v-else-if="loaded">无结果，请核实您的分数和批次</template>
          </div>
          <div class="school-item" v-if="!loading && list.length !== 0" v-for="school in list" @click="gotoDetailPage(school)">
            <div class="school-item__logo"><img :src="school.log"></div>
            <div class="school-item__devide"></div>
            <div class="school-item__info">
              <div class="school-item__name">{{school.schoolname}}</div>
              <div class="school-item__ranking">推荐批次: {{school.batch}}</div>
<!--              <div class="school-item__ranking">推荐批次: 本科提前批</div>-->
              <div class="school-item__grade">{{school.grade}}</div>
              <div class="school-item__prescore">建议报考分: {{school.prescore}}</div>
            </div>
          </div>
          <div class="school-item-end" v-if="!loading && list.length !== 0 && end">到底了</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { findOrderInfo, getSchoolInfo } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        curTab: 'bao',
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
        count: ''
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      province () {
        return this.$route.query.province
      },
      category () {
        return this.$route.query.category
      },
      batch () {
        return this.$route.query.batch
      },
      score () {
        return this.$route.query.score
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      gotoRecord () {
        this.$router.push({ path: '/record' })
      },
      toggleInput () {
        this.$refs.scoreInput.focus()
      },
      gotoDetailPage (school) {
        getSchoolInfo(school.schoolcode, this.openid).then(res => {
          this.code = school.schoolcode
          this.loading = false
          if (res.data.code === 505) {
            this.show = true
          } else if (res.data.code === 0) {
            this.$router.push({ path: '/schoolInfo/' + this.openid + '/' + school.schoolcode })
          } else {
          }
        })
      },
      gotoPage (name) {
        this.$router.push({ name: name })
      },
      changTab (i) {
        this.curTab = i
        this.list = this[i + 'List']
      },
      getList () {
        if (this.score === '') {
          return
        }
        this.loading = true
        findOrderInfo({
          province: this.province,
          category: this.category,
          score: this.score
        }).then(res => {
          this.loaded = true
          this.loading = false
          this.list = []
          if (res.data.code !== 0) {
            errorMsg(this, res.data.msg)
            this.loaded = false
          } else {
            this.noview = !res.data.data.istrue
            this.wenList = res.data.data.wentuos || []
            this.tiaoList = res.data.data.tiaozhans || []
            this.baoList = res.data.data.baodis || []
            this.list = this.baoList
            if (this.list.length !== 0) {
              this.end = true
            } else {
              this.end = false
            }
          }
          this.init()
        })
      },
      init () {
        this.$nextTick(() => {
          this.schoolScroll = new BScroll(this.$refs.schoolWrapper, {
            click: true
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .predict-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 56px;
  }
  .predict__score {
    flex: none;
    position: relative;
    overflow: hidden;
    margin: 20px;
    padding: 10px 10px 20px 10px;
    background: #fff;
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
  .predict__score-input {
    width: 80px;
    margin: 10px auto 20px 30%;
    display: block;
    position: relative;
    input {
      border: 0;
      border-bottom: 2px solid #4859ad;
      font-size: 30px;
      color: #4cb710;
      width: 100%;
      text-align: center;
    }
    &:after {
      content: '分';
      position: absolute;
      top: 18px;
      right: -30px;
    }
  }
  .predict__score-btn {
    background: #4859ad;
    color: #fff;
    width: 140px;
    margin: auto;
    margin-left: 18%;
    text-align: center;
    border-radius: 4px;
    padding: 6px 10px;
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
    height: calc(100% - 192px);
    position: relative;
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
  .school-list {
    padding-bottom: 40px;
  }
  .school-item {
    /*-webkit-filter:blur(16px);*/
    /*<!--filter: not(first-child);-->*/
    box-shadow: none;
    border-radius: 0;
    margin-bottom: 0;
    margin-right: 0;
    .noview & + & {
      &:not(first-child) {filter: blur(16px);}
      border-top: 1px solid #f9f9f9;
    }
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
    background: #5f95dc;

  }
  /*.school-item__ranking{*/
  /*  display: inline-block;*/
  /*  color: #fff;*/
  /*  border: 1px solid silver;*/
  /*  margin: 4px 4px 4px 0;*/
  /*  padding: 2px 8px;*/
  /*  border-radius: 4px;*/
  /*  font-size: 12px;*/
  /*  background: #5f95dc;*/
  /*}*/

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
    top: 0;
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
      top: 130px;
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
    top: 4px;
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
