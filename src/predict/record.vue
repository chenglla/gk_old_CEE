<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="predict-box">
      <div class="predict__header">
        <div class="predict-return return-box">
          <div class="return__icon" @click="gotoPage('predict')">
            <i class="iconfont iconleft-arrow"></i>
            <span>往期记录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="predict__record" ref="schoolWrapper" style="height: calc(100% - 60px);">
      <div class="record-list">
        <div class="record-list__item" v-for="record in list" @click="gotoYuce(record)" v-if="list.length > 0">
          <div class="record__info">
            <div class="record__province">省份：{{record.province}}</div>
            <div class="record__category" >类别：{{record.category}}</div>
            <div class="record__batch" >批次：{{record.batch}}</div>
            <div class="record__score" >{{record.score === 0 ? '暂无' : record.score}}</div>
          </div>
        </div>
        <div class="record-nolist__item" v-else style="font-size: 15px;text-align: center;margin: 18% 10px 0 10px;color: #4f5b63">暂无支付记录</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { findPay } from '@/api/index'
  import { errorMsg } from '@/utils/common'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        // province: '',
        // category: '',
        // batch: '',
        // score: '',
        loading: false,
        list: [],
        schoolScroll: null
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      gotoPage (name) {
        this.$router.push({ name: name })
      },
      gotoYuce (record) {
        this.$router.push({
          path: '/predictDetail',
          query: {
            'province': record.province,
            'category': record.category,
            'batch': record.batch,
            'score': record.score
          }
        })
      },
      getList () {
        this.loading = true
        findPay(this.openid).then(res => {
          if (res.data.code !== 0) {
            errorMsg(this, res.data.msg)
            this.loaded = false
          } else {
            this.list = res.data.data || []
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
  .record-list__item {
    flex: none;
    position: relative;
    overflow: hidden;
    margin: 10px 20px;
    padding: 10px;
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
  .record__info{
    padding-left: 120px;
  }
  .record__score {
    position: absolute;
    left: 30px;
    top: 30px;
    font-size: 30px;
    &:before {
      content: '分数';
      position: absolute;
      font-size: 12px;
      top: -18px;
      left: -10px;
    }
    &:after {
      content: '';
      position: absolute;
      display: block;
      background: #ddd;
      width: 1px;
      height: 60px;
      top: -18px;
      right: -22px;
    }
  }

</style>
