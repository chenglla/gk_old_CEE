<template>
  <div style="height: 100%;width: 100%;">
      <div class="my-return">
        <div class="return__icon" @click="gotoBack">
          <i class="iconfont iconleft-arrow"></i>
        </div>
        <div class="return_second">
          <div class="second_left">
            <span>HELLO,{{myInfo.userName}}!</span>
            <div>
              <img src="../assets/img/VIP.png" alt="">
            </div>
          </div>
          <div class="second_right">
            <img v-if="myInfo.userImg !== ''" class="user-logo" :src="myInfo.userImg" />
            <i v-else class="iconfont icontouxiang"></i>
          </div>
        </div>
        <div class="return_third">
          <div class="third_left">
            <span>{{myGoal.province}}</span>
            <span>所在地</span>
          </div>
          <div class="third_right">
            <div class="third_right_item">
              <span>类别 </span>{{myGoal.category}}
            </div>
            <div class="third_right_item">
              <span>批次 </span>{{myGoal.batch}}
            </div>
            <div class="third_right_item" v-if="myGoal.subList.length > 0">
              <span>科目 </span>
              <span v-for="(item, index) in myGoal.subList" :key="index">
                {{item}}
              </span>
            </div>
          </div>
        </div>
        <div class="return_four" @click="gotoEdit">
          前往编辑 >>
        </div>
      </div>
      <div class="my-content" ref="myScroll">
        <div style="padding-bottom: 30px">
          <goal-info v-if="curTab==='goal'" :myGoal="myGoal" :goal="goal"></goal-info>
        </div>
      </div>
      <div class="my-info_bottom">
        <p>系统数据来源于网络，版权归原作者所有，如有侵权 请与我们联系，我们将及时清除。</p>
      </div>
  </div>
</template>
<script>
import goalInfo from './goalInfo'
import basicInfo from './basicInfo'
import BScroll from 'better-scroll'
import { myInfo, getUserSubjects, getGoalCity } from '@/api/index'
import { mapState } from 'vuex'
export default {
  name: 'my',
  components: { goalInfo, basicInfo },
  data () {
    return {
      curTab: 'goal',
      myScroll: null,
      myInfo: {
        userName: '',
        userImg: ''
      },
      myGoal: {
        batch: '',
        category: '',
        province: '',
        subList: []
      },
      goal: {
        city: '',
        major: ''
      }
    }
  },
  computed: {
    ...mapState({
      openid: state => state.user.openid
    })
  },
  mounted () {
    this.getUserInfo()
    this.getUserSubjects()
    this.getMyGoal()
    this.initSroll()
  },
  activated () {
    console.log('ddd')
    this.getUserInfo()
    this.getUserSubjects()
    this.getMyGoal()
    this.initSroll()
  },
  watch: {
    curTab () {
      this.initSroll()
    }
  },
  methods: {
    getUserInfo () {
      myInfo(this.openid).then(res => {
        console.log('个人用户信息', res.data.data)
        this.myInfo.userName = res.data.data.userNickname || '用户' + this.openid
        this.myInfo.userImg = res.data.data.userHeaderimgurl || ''
        this.myGoal.batch = res.data.data.batch || '暂无'
        this.myGoal.category = res.data.data.category || '暂无'
        this.myGoal.province = res.data.data.province || '暂无'
      })
    },
    getUserSubjects () {
      getUserSubjects({openid: this.openid}).then(res => {
        if (res.data.code === 0) {
          if (res.data.data.length === 1 && res.data.data[0] === '') {
            this.myGoal.subList = []
            return
          }
          console.log('选择的科目：', res.data.data, res.data.data.length)
          this.myGoal.subList = res.data.data
        }
      })
    },
    gotoEdit () {
      this.$router.push({ path: '/complete?type=edit' })
    },
    getMyGoal () {
      getGoalCity({
        openid: this.openid
      }).then(resp => {
        if (resp.data.code === 0) {
          this.goal.city = resp.data.data.city
          this.goal.major = resp.data.data.majorname
        }
      })
    },
    gotoBack () {
      this.$router.push({ name: 'home' })
    },
    initSroll () {
      this.$nextTick(() => {
        this.myScroll = new BScroll(this.$refs.myScroll, {
          click: true
        })
      })
    },
    // 切tab
    goTab (text, name) {
      this.curTab = name
    }
  }
}
</script>
<style lang="scss">
  @media screen and (min-height: 320px) {
    .my-return {
      height: 206px;
    }
    .return_second {
      padding: 40px 17px 0 17px;
    }
    .my-content {
      height: calc(100% - 226px);
    }
  }
  @media screen and (min-height: 750px) {
    .my-return {
      height: 215px;
    }
    .return_second {
      padding: 47px 17px 0 17px;
    }
    .my-content {
      height: calc(100% - 235px);
    }
  }
  .my-return {
    /*height: 215px;*/
    position: relative;
    background: url("../assets/img/wo_bj.png");
    background-size: 100%;
    .return__icon {
      position: absolute;
      color: #fff;
      left: 10px;
      top: 5px;
      z-index: 9;
      padding: 5px;
    }
    .return_second {
      /*padding: 35px 15px 0 17px;*/
      display: flex;
      justify-content: space-between;
      .second_left {
        /*margin-left: 15px;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          color: #fff;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          /*word-wrap: break-word;*/
        }
        div {
          margin-top: 5px;
          height: 15px;
          img {
            height: 100%;
          }
        }
      }
      .second_right {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 2px 4px #87b8fb;
        img {
          height: 100%;
        }
      }
    }
    .return_third {
      margin: 25px 15px 0 15px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      .third_left {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #fff;
        span:nth-child(2) {
          margin-top: 3px;
          font-size: 12px;
          color: rgba(255, 255, 255, .4);
        }
      }
      .third_right {
        flex: 5;
        margin-left: 12%;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: flex-end;*/
        /*text-align: right;*/
        .third_right_item {
          /*margin-top: 5px;*/
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 90%;
          span {
            margin-left: 5px;
            color: #fff;
          }
          span:first-child {
            color: rgba(255, 255, 255, .4);
            margin-right: 5px;
          }
          /*line-height: 28px;*/
        }
      }
    }
    .return_four {
      text-align: center;
      margin-top: 8px;
      color: #fff;
      font-size: 13px;
    }
  }
  .my-content {
    padding: 0;
    /*background-color: #fff;*/
    /*flex: auto;*/
    /*height: calc(100% - 206px);*/
    overflow: hidden;
  }
  .my-info_bottom {
    text-align: center;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 3;
    p {
      width: 76%;
      margin-left: 12%;
      color: #9c9c9c;
      font-size: 13px;
      margin-bottom: 5px;
      margin-top: 3px;
    }
  }
</style>
