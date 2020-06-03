<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-box feedback-box">
      <div class="bbs__add">
        <div class="bbs-return return-box">
          <div class="return__icon" @click="gotoPage('/my')">
            <i class="iconfont iconleft-arrow"></i> 志愿清单
          </div>
        </div>
      </div>
    </div>
    <div class="feedback__content">
      <div class="predict__tips__content_volunteer">
<!--        <div class="tips__header">志愿清单</div>-->
        <div class="tips_summary">当前批次是{{batch}}，所在地是{{province}}。</div>
        <div class="tips__body">
          <div v-if="volunteerList.length > 0" class="schoolScoreLine">
            <x-table full-bordered style="table-layout: fixed;" class="schoolScoreLineTable">
              <thead>
              <tr>
                <th>志愿学校</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in volunteerList" :key="index">
                <td class="ttd td_info">{{item.schoolname}}</td>
                <td @click.stop="gotoDel(item.schoolname)" style="touch-action: none;color: #0c5ddc">删除</td>
              </tr>
              </tbody>
            </x-table>
          </div>
          <!--          <p>使用提醒：在您使用高考预测系统前，请务必仔细阅读并透彻理解本声明。如果您使用本系统，您的行为将被视为对本声明全部内容的认可。若您使用本系统预测结果作为志愿填报，应当自行承担相应风险，我们不做任何形式的保证。中科智禾尊重并保护所有用户的个人隐私权，您个人资料，非经您亲自许可或根据相关法律、法规的强制性规定，不会主动地泄露给第三方。</p>-->
        </div>
        <!--        <div class="tips_footer">-->
        <!--          <div class="tips__btn" @click="closeAgree">同意</div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { viewVolunteer, myInfo } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  export default {
    data () {
      return {
        ask: '',
        volunteerList: [],
        batch: '',
        category: '',
        province: '',
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      this.getVolunteer()
      this.getUserInfo()
    },
    methods: {
      // 去页面
      gotoPage (path) {
        this.$router.push({ path: path })
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
      getVolunteer () {
        viewVolunteer({
          openid: this.openid
        }).then(res => {
          if (res.data.code === 0) {
            console.log('志愿单：', res.data.data)
            this.volunteerList = res.data.data
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .bbs-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
  }
  .feedback-box .bbs__add {
    height: 50px;
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  .bbs-return {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 50px;
    body &.return-box .return__icon.return__icon {
      color: #fff;
      font-size: 16px;
    }
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  .feedback__content {
    flex: 1;
    height: calc(100% - 50px);
    padding: 20px;
  }
  /*.predict__tips__content_volunteer {*/
  /*  !*width: 200px;*!*/
  /*  background: rgb(255, 255, 255);*/
  /*  position: absolute;*/
  /*  !*top: 15%;*!*/
  /*  !*left: 50%;*!*/
  /*  padding: 20px;*/
  /*  border-radius: 10px;*/
  /*}*/
  .tips__header {
    margin-bottom: 10px;
    text-align: center;
  }
  .tips_summary {
    text-indent: 2em;
    font-size: 16px;
    line-height: 28px;
  }
  .tips__body {
    font-size: 13px;
    p {
      margin-bottom: 10px;
      text-align: justify;
    }
  }
  .schoolScoreLine {
    padding-top: 2px;
    margin: 10px 8px;
    text-align: center;
    border-radius: 10px;
    color: #3c3c3c;
    /*background-color: #fff;*/
  }
  tbody tr:nth-child(2n + 1) {
    /*background-color: rgb(229,253,239);*/
    background-color: rgba(46,122,241,0.2);
  }
  tbody tr td {
    /*border: 1px solid rgba(46,122,241,0.2);*/
    font-size: 15px;
  }
  thead tr th {
    /*border: 1px solid rgba(46,122,241,0.2);*/
    font-weight: bold;
    font-size: 16px;
  }
  table.vux-table.schoolScoreLineTable {
    /*line-height: 33px;*/
  }
  .td_info {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
  }
</style>
