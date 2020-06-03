<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="complete-wrapper">
      <div class="complete-return return-box">
        <div class="return__icon" @click="gotoPage(-1)">
          <i class="iconfont iconleft-arrow"></i> 志愿意向目标
        </div>
      </div>
      <div class="complete-content" ref="completeContent">
        <div>
          <div class="complete-card">
            <i class="iconfont iconbianji"></i>
            <div class="info-item">
              <div class="info-item__value">
                <popup-picker title="意向省份" :data="provList" v-model="province" @on-change="changeProv" placeholder="选择省份"></popup-picker>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__value">
                <x-input title="意向专业" v-model="majorName" text-align="right"></x-input>
<!--                <popup-picker title="类别" :data="cateList" v-model="category" @on-change="changeCate" placeholder="选择类别" @on-show="showCategory()"></popup-picker>-->
              </div>
            </div>
            <div class="info-item">
              <div class="info-btn" @click="submit">提交</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Group, Selector, Checker, CheckerItem, CheckIcon, PopupPicker } from 'vux'
  import { getAllBatch, addGoal, getAllUserProvince, getGoalCity, myInfo } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  import BScroll from 'better-scroll'
  export default {
    components: { Group, Selector, CheckIcon, PopupPicker, Checker, CheckerItem },
    data () {
      return {
        provList: [],
        majorName: '',
        // cateList: [],
        // batchList: [],
        province: [''],
        // category: [''],
        // batch: [''],
        // showNewGK: false, // 是否展示新高考
        // singleChoice: '物理', // 单选结果
        // multipleChoice: ['化学'], // 多选结果
        checkLincense: false,
        completeScroll: null,
        // newGKList: ['北京', '上海', '浙江'],
        // selectSubject: ''
      }
    },
    props: {
      show: Boolean,
      code: String
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      },
      pageType () {
        return this.$route.query.type || ''
      }
    },
    mounted () {
      this.init()
      // this.getUserInfo()
      this.getMyGoal()
      this.getList()
      // if (this.pageType === 'edit' || this.pageType === 'predict') {
      //   this.getUserInfo()
      // } else {
      //   this.getList()
      // }
    },
    methods: {
      gotoPage (name) {
        if (name === -1) {
          this.$router.go(-1)
        } else {
          this.$router.push({ name: name })
        }
      },
      init () {
        console.log('初始化：', this.$refs.completeContent)
        this.$nextTick(() => {
          this.completeScroll = new BScroll(this.$refs.completeContent, {
            click: true
          })
        })
      },
      getMyGoal () {
        getGoalCity({
          openid: this.openid
        }).then(resp => {
          if (resp.data.code === 0) {
            if (resp.data.data.city === '') {
              this.getUserInfo()
              // this.majorName = resp.data.data.majorname || '暂无'
            } else {
              this.province = [resp.data.data.city]
            }
            this.majorName = resp.data.data.majorname || '暂无'
          }
        })
      },
      changeProv (value) {
        // if (this.newGKList.indexOf(value[0]) > -1) {
        //   this.showNewGK = true
        // } else {
        //   this.showNewGK = false
        // }
        console.log(value[0])
      },
      toggleLincese (flag) {
        this.$vux.confirm.show({
          content: '使用提醒：在您使用高考预测系统前，请务必仔细阅读并透彻理解本声明。如果您使用本系统，您的行为将被视为对本声明全部内容的认可。若您使用本系统预测结果作为志愿填报，应当自行承担相应风险，我们不做任何形式的保证。中科智禾尊重并保护所有用户的个人隐私权，您个人资料，非经您亲自许可或根据相关法律、法规的强制性规定，不会主动地泄露给第三方。',
          onConfirm: () => {
            this.checkLincense = true
          }
        })
      },
      submit () {
        const prov = this.province[0]
        if (prov === '') {
          errorMsg(this, '请选择省份')
          return
        }
        addGoal({
          openid: this.openid,
          city: prov,
          majorname: this.majorName
        }).then(res => {
        // save(this.openid, prov, category, batch).then(res => {
          if (res.data.code === 0) {
            this.$router.push({ name: 'my' })
          } else {
            errorMsg(this, res.data.msg)
          }
        })
      },
      getList () {
        getAllUserProvince().then(res => {
          this.provList = [res.data.data]
        })
      },
      getUserInfo () {
        myInfo(this.openid).then(res => {
          // this.checkLincense = true
          if (res.data.code === 0) {
            this.batch = [res.data.data.batch || '暂无']
            this.category = [res.data.data.category || '暂无']
            this.province = [res.data.data.province || '暂无']
          }
          // this.getList()
        })
      }
    }
  }
</script>
<style lang="scss">
  .complete-wrapper {
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    .vux-cell-box {
      border-bottom: 1px solid #4859ad;
    }
    .vux-x-input {
      border-bottom: 1px solid #4859ad;
    }
    .weui-cell {
      padding-left: 0;
      padding-right: 0;
    }
    .weui-label {
      color: #3c4677;
      font-size: 14px;
    }
    .weui-icon-circle,
    .weui-icon-success-circle,
    .weui-icon-success {
      font-size: 14px;
    }
    .vux-cell-value {
      font-size: 14px;
      padding-right: 20px;
    }
  }
  .complete-content {
    position: relative;
    margin-top: 7%;
    /*background: #fbf9fe;*/
    overflow: hidden;
    /*padding-top: 7%;*/
    height: calc(100% - 56px);
  }
  .info-comfirm {
    margin: 80px 0 20px;
    font-size: 13px;
    opacity: 0.8;
  }
  .info-item {
    margin-bottom: 15px;
    .newGK {
      margin-left: 40px;
    }
  }
  .selectInfo {
    font-size: 15px;
    font-weight: bold;
  }
  .selectFirstInfo {
    text-indent: 1.5em;
    margin: 7px 0;
    span {
      font-size: 11px;
    }
  }
  .complete-return {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);
    height: 56px;
  }
  .complete-card {
    overflow: hidden;
    position: relative;
    background: #fff;
    margin: 5px 20px 60px;
    padding: 10px 30px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    & > .iconfont {
      position: absolute;
      bottom: -10px;
      right: 10px;
      font-size: 80px;
      opacity: 0.3;
      color: #4859ae;
    }
  }
  .info-btn {
    background: #347ff4;
    color: #fff;
    width: 140px;
    margin: 20px auto 60px;
    text-align: center;
    border-radius: 4px;
    padding: 6px 10px;
  }
  .info-confirm-link {
    text-decoration: underline;
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    margin: 0 15px 8px;
    font-size: 13px;
  }
  .demo1-item-selected {
    border: 1px solid green;
  }
</style>
