<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;background-color:#fff;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;margin-top: 10px;text-align: center">
        志愿批次信息
      </div>
    </div>
    <div ref="oneScore" class="oneScoreInfo">
      <div>
        <div class="one_score_info">
          <!--        <div v-if="provinceList.length > 0 && yearList.length > 0" class="one_score_info">-->
          <popup-picker class="one_score_info_xiala" title="地区" :data="[provinceList]" :value="province" @on-change="onChangePro" placeholder="请选择"></popup-picker>
          <popup-picker class="one_score_info_xiala" title="类别" :data="[yearList]" :value="year" @on-change="onChangeYear" placeholder="请选择"></popup-picker>
          <popup-picker class="one_score_info_xiala" title="批次" :data="[categoryList]" :value="category" @on-change="onChangeCate" placeholder="请选择"></popup-picker>
          <x-button plain type="primary" style="border-radius:99px;" v-if="this.category.length === 0" class="select_one_score selectno">查询</x-button>
          <x-button plain type="primary" style="border-radius:99px;" v-if="this.category.length >0" class="select_one_score selectok" @click.native="getOneScore">查询</x-button>
        </div>
        <div>
          <div class="list-loading" v-if="loading">
            <div class="loader"></div>
          </div>
          <div v-if="!loading && Object.keys(oneScoreList).length > 0" class="schoolScoreLine">
            <x-table full-bordered style="background-color:#fff;" class="schoolScoreLineTable">
              <thead>
              <tr>
                <th>填报学校数</th>
                <th>填报专业数</th>
                <th>志愿类型</th>
                <th>可否调剂</th>
              </tr>
              </thead>
              <tbody>
              <!--              <tr v-for="(item, index) in oneScoreList" :key="index">-->
              <td>{{oneScoreList.schoolNum}}</td>
              <td>{{oneScoreList.majorNum}}</td>
              <td>{{oneScoreList.parallel}}</td>
              <td v-if="oneScoreList.adjust === 1">可调剂</td>
              <td v-else>不可调剂</td>
              <!--              </tr>-->
              </tbody>
            </x-table>
            <!--                  <div class="content"style="width: 100%">-->
            <!--                    <div class="seven_echarts" ref="chart"></div>-->
            <!--                  </div>-->
          </div>
          <div v-if="!loading && Object.keys(oneScoreList).length === 0" style="font-size: 14px;margin: 20% 10px 14px;color: #aaa;text-align: center">所选地区暂无志愿批次信息！</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import { getzyProvince, getzyYear, getzyCategory, getzyOneTable } from '@/api/oneScore'
  import { myInfo } from '@/api/index'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        provList: [],
        // province: ['北京'],
        checkTime: '',
        checkType: '',
        loginHref: '',
        yearList: [],
        year: [],
        provinceList: [],
        province: [],
        categoryList: [],
        category: [],
        oneScoreList: [],
        scoreScroll: null,
        loading: false
      }
    },
    // activated () {
    //   this.getUserInfo()
    // },
    mounted () {
      this.getUserInfo()
      // this.getOneScoreProvince()
    },
    computed: {
      ...mapState({
        openid: state => state.user.openid
      })
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.scoreScroll = new BScroll(this.$refs.oneScore, {
            click: true
          })
        })
      },
      // 返回
      returnBack () {
        this.$router.go(-1)
      },
      getUserInfo () {
        myInfo(this.openid).then(res => {
          this.province.push(res.data.data.province || '暂无')
          this.category = [res.data.data.batch || '暂无']
          this.year = [res.data.data.category || '暂无']
          if (this.province[0] !== '' && this.year[0] !== '' && this.category[0] !== '') {
            this.getOneScore()
          }
          console.log('用户信息：', this.province, this.year, this.category)
          this.getOneScoreProvince()
        })
      },
      onChangeYear (val) {
        this.year = val
        this.getOneScoreCategory()
        console.log('year:', val)
      },
      onChangePro (val) {
        this.province = val
        this.getOneScoreYear()
        console.log('pro:', val)
      },
      onChangeCate (val) {
        this.category = val
        console.log('cate:', val)
      },
      getOneScoreProvince () {
        console.log(this.province)
        getzyProvince().then(res => {
          // console.log(res.data)
          this.provinceList = res.data
          this.getOneScoreYear()
        })
      },
      getOneScoreYear () {
        getzyYear({city: this.province[0]}).then(res => {
          // console.log(res.data)
          this.yearList = res.data
          // this.getOneScoreCategory()
        })
      },
      getOneScoreCategory () {
        getzyCategory({city: this.province[0], subject: this.year[0]}).then(res => {
          this.categoryList = res.data
          console.log(res.data)
        })
      },
      getOneScore () {
        this.loading = true
        getzyOneTable({
          city: this.province[0],
          subject: this.year[0],
          batch: this.category[0]
        }).then(res => {
          this.oneScoreList = res.data
          this.loading = false
          this.init()
          console.log('一分一段信息：', res.data)
        })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .check-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 45px;
  }
  .return__icon{
    margin-left: 10px;
    margin-top: 10px;
    color: #fff;
  }
  .oneScoreInfo {
    height: calc(100% - 56px);
    overflow: hidden;
  }
  .one_score_info {
    padding-top: 3%;
  }
  .one_score_info_xiala {
    margin: 10px 0;
  }
  .select_one_score {
    width: 86%;
    margin-top: 10%;
  }
  .selectok {
    border: 1px solid rgb(24, 103, 227);
    color: #417dda;
  }
  .selectno {
    border: 1px solid #9c9c9c;
    color: #9c9c9c;
  }
  .schoolScoreLine {
    padding-top: 2px;
    margin: 10% 8px 10px;
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

