<template>
  <div class="my-info">
    <div class="goal-card">
      <div class="goal__content" @click="gotoEdit">
        <div class="goal-header">
          <div class="edit-btn"><i class="iconfont iconbianji"></i>去更改</div>
          <div class="goal__content-title">
            <span>我的信息</span>
            <span class="sub-label">My Info</span>
          </div>
        </div>
        <div class="goal-body">
          <div class="goal-item first">{{myGoal.province}}<span class="goal-label">所在地</span></div>
          <div class="goal-item second">{{myGoal.category}}<span class="goal-label">类别</span></div>
          <div class="goal-item third">{{myGoal.batch}}<span class="goal-label">批次</span></div>
          <div class="goal-item four" v-if="myGoal.subList.length > 0">
            <span class="four_item" v-for="(item, index) in myGoal.subList" :key="index">{{item}}</span>
            <span class="goal-label">科目</span>
          </div>
        </div>
      </div>
    </div>
    <div class="goal-card">
      <div class="goal__content" @click="gotoGoal">
        <div class="goal-header">
          <div class="edit-btn"><i class="iconfont iconbianji"></i>去更改</div>
          <div class="goal__content-title">
            <span>志愿意向</span>
            <span class="sub-label">Goal</span>
          </div>
        </div>
        <div class="goal-body">
          <div class="goal-item six">{{goal.city}}<span class="goal-label_goal">意向城市</span></div>
          <div class="goal-item five">{{goal.major}}<span class="goal-label_goal">意向专业</span></div>
<!--          <div class="goal-item third">{{myGoal.batch}}<span class="goal-label">批次</span></div>-->
        </div>
      </div>
    </div>
    <div class="goal-card volunteerList">
      <div class="goal__content" @click="gotoVolunteer">
        <div class="goal-header">
          <div class="edit-btn"><i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy"></i>详情</div>
          <div class="goal__content-title">
            <span>志愿清单</span>
            <span class="sub-label">Volunteer</span>
          </div>
        </div>
      </div>
    </div>
    <div class="goal-card aboutUs">
      <div class="goal__content">
        <div class="goal__content-title">
          关注我们
          <span class="sub-label">
          About Us
          </span>
<!--          <i class="iconfont iconjiantou" @click="gotoOpen"></i>-->
          <i class="iconfont iconjiantou1" @click="gotoOpen"></i>
        </div>
        <div v-if="showAbout">
          <div class="goal__content-body">
            {{usText}}
            <p>如想关注公众号，请长按二维码：</p>
          </div>
          <div style="height: 150px;width: 150px;margin-left: 50%;transform: translateX(-50%)">
            <img src="../assets/img/ewm.jpg" style="width: 100%">
          </div>
        </div>
      </div>
    </div>
    <div class="goal-card contact-us">
      <div class="goal__content">
        <div class="goal__content-title">联系我们</div>
        <div class="goal__content-body">
          <div>
            <i class="iconfont iconweibiaoti-"></i><span>电话：13381173397</span>
          </div>
          <div>
            <i class="iconfont icontubiao209"></i><span>邮箱 ：zkzh_edu@163.com</span>
          </div>
        </div>
      </div>
    </div>
    <div class="goal-card">
      <div class="goal__content">
        <div class="goal__content-title">数据声明</div>
        <div class="goal__content-body">{{dataText}}</div>
      </div>
    </div>

    <!-- <div class="goal-card goal-card-line goal-card--feedback" @click="feedback">
      <div class="goal__content">
        <div class="goal__content-btn">意见反馈</div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'user-info',
  data () {
    return {
      usText: '高考预测平台是在整合中科院及教育行业的科技和教育专家基础上，研发出的一款服务考生信息查询与志愿优选的参考推荐系统。\n' +
        '通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，且运用大数据、机器学习、算法和数据库等技术，为高考考生提供全方位的信息查询与报考志愿预测与推荐服务。',
      dataText: '系统数据来源于网络，版权归原作者所有，如有侵权请与我们联系，我们将及时清除。',
      showAbout: false
    }
  },
  props: {
    myGoal: Object,
    goal: Object
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    gotoCheck () {
      this.$router.push({ name: 'predict' })
    },
    gotoEdit () {
      this.$router.push({ path: '/complete?type=edit' })
    },
    gotoGoal () {
      this.$router.push({ path: '/goal' })
    },
    gotoVolunteer () {
      this.$router.push({path: '/volunteer'})
    },
    gotoUs () {
      this.$router.push({ path: '/about' })
    },
    gotoOpen () {
      const ifon = document.querySelector('.goal__content-title .iconfont')
      this.showAbout = !this.showAbout
      if (this.showAbout === true) {
        ifon.className = 'iconfont iconjiantou'
      } else {
        ifon.className = 'iconfont iconjiantou1'
      }
    },
    feedback () {
      // this.$vux.confirm.show({
      //   title: '意见反馈',
      //   showInput: true,
      //   onConfirm: () => {
      //     this.checkLincense = true
      //   }
      // })
      this.$router.push({ name: 'feedback' })
    }
  }
}
</script>
<style lang="scss">
  .aboutUs {
    min-height: unset;
  }
  .volunteerList {
    min-height: unset;
  }
  .goal__content {
    font-size: 0;
  }
  .my-info {
    position: relative;
    padding: 10px 0;
  }
  .goal__content-title {
    font-weight: bold;
    font-size: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #555;
    .iconfont {
      float: right;
      margin-right: 6px;
      color: #9c9c9c;
    }
  }
  .sub-label {
    color: #d3d3d3;
    font-size: 14px;
    &:before {
      content: '|';
      margin: 0 6px 0 10px;
      color: #f5f5f5;
    }
  }
  .goal-body {
    padding-top: 20px;
    text-align: center;
  }
  .goal-item {
    background: #fff;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    color: #fff;
    border-radius: 6px;
    box-shadow: 4px 6px 10px 1px #1b265a4a;
    font-size: 14px;
    position: relative;
    width: 90%;
    .four_item {
      margin-left: 5px;
    }
    & + & {
      margin-top: 10px;
    }
    &.first { background: #c164fb; }
    &.second { background: #fbbf64; }
    &.third { background: #5bbb93; }
    &.four {background: #ec8b89;}
    /*&.five {background: #FFCCCC;}*/
    /*&.six {background: #99CCFF;} */
    &.five {background: #FF9999;}
    &.six {background: #6699CC;}
  }
  .goal-label {
    color: rgba(255,255,255,.5);
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    line-height: 1;
    right: 5px;
    display: inline-block;
    width: 40px;
  }
  .goal-label_goal {
    color: rgba(255,255,255,.5);
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    line-height: 1;
    right: 5px;
    display: inline-block;
    width: 50px;
  }
  .goal-set-score .iconfont {
    position: absolute;
    right: 14px;
    top: 1px;
    font-size: 20px;
    color: #b7b7b7;
  }
  .edit-btn {
    position: absolute;
    right: 0;
    padding: 0 10px;
    text-align: right;
    .iconiconfontyoujiantou-copy-copy-copy-copy {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .goal__content-body {
    padding: 15px 0 3px;
    font-size: 14px;
    text-indent: 2em;
    word-break: break-all;
  }
  .about-email {
    margin-left: 30px;
    margin-top: 10px;
    text-indent: 0;
    .email {
      text-indent: 2em;
      display: block;
    }
    p {
      padding-left: 40px;
    }
    .iconfont {
      margin-right: 8px;
      vertical-align: middle;
      color: #9ba7e2;
    }
  }
  .contact-us .iconfont {
    margin: 0 10px;
  }
</style>
