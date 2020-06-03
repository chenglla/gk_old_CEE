<template>
  <div style="height: 100%;width: 100%;display: flex;flex-direction: column;">
    <div class="my-box">
      <div class="my-return return-box">
        <div class="return__icon" @click="gotoBack">
          <i class="iconfont iconleft-arrow"></i>
        </div>
        <div class="user-info-box">
          <div class="user-basic">
            <img v-if="myInfo.userImg !== ''" class="user-logo" :src="myInfo.userImg" />
            <i v-else class="iconfont icontouxiang"></i>
            <div class="vip-flag">VIP</div>
            <div class="user-name">{{myInfo.userName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-content" ref="myScroll">
      <goal-info v-if="curTab==='goal'" :myGoal="myGoal" :goal="goal"></goal-info>
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
  .my-box {
    background: #647cfb;
    background: linear-gradient(to bottom right, #647cfb 0%, #7188fb 15%, #347ff4 70%, #0049bb 100%);
    position: relative;
    box-shadow: 0px 13px 14px 0px #1c275b4f;
  }
  .my-return {
    height: 200px;
  }
  .my-content {
    padding: 0;
    flex: auto;
    height: calc(100% - 200px);
    overflow: hidden;
  }
  .user-info-box {
    position: absolute;
    top: 60px;
    width: 100%;
  }
  .user-basic {
    margin: 0 auto;
    display: block;
    width: 200px;
    text-align: center;
    position: relative;
  }
  .vip-flag {
    display: inline-block;
    vertical-align: top;
    border-radius: 4px;
    color: #fff;
    border: 1px solid #fff;
    padding: 0px 5px;
    position: absolute;
    right: 14px;
  }
  .user-logo,
  .user-basic .iconfont {
    border-radius: 30px;
    width: 80px;
    height: 80px;
  }
  .user-basic .iconfont {
    display: inline-block;
    position: absolute;
    top: -26px;
    left: 50%;
    color: #fff;
    font-size: 88px;
    margin-left: -44px;
  }
  .user-name {
    color: #fff;
    margin: 10px;
  }

  .user-tab {
    padding: 4px 0;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
  }
  .user-tab-item {
    display: inline-block;
    padding: 4px 0;
    width: 40%;
    position: relative;
    color: #fff;
    &.active {
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -20px;
        width: 40px;
        height: 2px;
        background: #fff;
      }
    }
  }
</style>
