<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;background-color:#fff;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;margin-top: 10px;text-align: center">
        一分一段信息
      </div>
    </div>
    <div ref="oneScore" class="oneScoreInfo">
      <div>
        <div class="one_score_info">
<!--        <div v-if="provinceList.length > 0 && yearList.length > 0" class="one_score_info">-->
<!--        <div v-if="provinceList.length > 0 && yearList.length > 0 && categoryList.length > 0" class="one_score_info">-->
          <popup-picker title="地区" :data="[provinceList]" :value="province" @on-change="onChangePro" placeholder="请选择"></popup-picker>
          <popup-picker title="年份" :data="[yearList]" :value="year" @on-change="onChangeYear" placeholder="请选择"></popup-picker>
          <popup-picker title="类别" :data="[categoryList]" :value="category" @on-change="onChangeCate" placeholder="请选择"></popup-picker>
          <x-button plain type="primary" style="border-radius:99px;" v-if="this.category.length === 0" class="select_one_score selectno">查询</x-button>
          <x-button plain type="primary" style="border-radius:99px;" v-if="this.category.length >0" class="select_one_score selectok" @click.native="getOneScore">查询</x-button>
        </div>
        <div>
<!--          <div class="schoolScoreLine">-->
          <div class="list-loading" v-if="loading">
            <div class="loader"></div>
          </div>
          <div v-if="!loading && newOneScoreList.length > 0" class="schoolScoreLine">
            <x-table full-bordered style="background-color:#fff;" class="schoolScoreLineTable">
              <thead>
              <tr>
                <th>分数区间上</th>
                <th>分数区间下</th>
                <th>区间人数</th>
                <th>累计排名</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in newOneScoreList" :key="index">
                <td>{{item.supscore}}</td>
                <td>{{item.subscore}}</td>
                <td>{{item.nownumber}}</td>
                <td>{{item.sumnumber}}</td>
              </tr>
              </tbody>
            </x-table>
            <!--                  <div class="content"style="width: 100%">-->
            <!--                    <div class="seven_echarts" ref="chart"></div>-->
            <!--                  </div>-->
          </div>
          <div v-if="!loading && newOneScoreList.length === 0"  style="font-size: 14px;margin: 20% 10px 14px;color: #aaa;text-align: center">所选地区暂无一分一段表信息！</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import { getOneScoreProvince, getOneScoreYear, getOneScoreCategory, getOneScoreOneTable } from '@/api/oneScore'
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
        newOneScoreList: [],
        currentOneScoreList: [],
        loading: false
      }
    },
    // activated () {
    //   this.getUserInfo()
    // },
    mounted () {
      this.getUserInfo()
      this.init()
      // this.getOneScoreProvince()
    },
    computed: {
      ...mapState({
        openid: state => state.user.openid
      })
    },
    methods: {
      // init () {
      //   this.$nextTick(() => {
      //     this.scoreScroll = new BScroll(this.$refs.oneScore, {
      //       click: true
      //     })
      //   })
      // },
      init () {
        this.$nextTick(() => {
          this.scoreScroll = new BScroll(this.$refs.oneScore, {
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
          this.scoreScroll.on('pullingUp', (pos) => {
            this.nextPage()
            this.$nextTick(() => {
              this.scoreScroll.finishPullUp()
            })
          })
          this.scoreScroll.on('pullingDown', () => {
            // this.reList()
            this.$nextTick(() => {
              this.scoreScroll.finishPullDown()
            })
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
          console.log(this.province)
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
        getOneScoreProvince().then(res => {
          // console.log(res.data)
          this.provinceList = res.data
          this.getOneScoreYear()
        })
      },
      getOneScoreYear () {
        // this.year = []
        getOneScoreYear({city: this.province[0]}).then(res => {
          // console.log(res.data)
          this.yearList = res.data
          // this.year.push(this.yearList[0])
          // this.getOneScoreCategory()
        })
      },
      getOneScoreCategory () {
        // this.category = []
        getOneScoreCategory({city: this.province[0], year: this.year[0]}).then(res => {
          this.categoryList = res.data
          // this.category = []
          // this.category.push(this.categoryList[0])
          console.log(res.data)
        })
      },
      getOneScore () {
        this.newOneScoreList = []
        this.loading = true
        getOneScoreOneTable({
          city: this.province[0],
          year: this.year[0],
          subject: this.category[0]
        }).then(res => {
          this.oneScoreList = res.data
          // const title = this.newsList.map(item => item.title)
          // res.data.data.map(item => {
          //   if (title.indexOf(item.title) === -1) {
          //     this.newsList.push(item)
          //   }
          // })
          console.log('取前40条', this.oneScoreList.slice(0, 39))
          this.oneScoreList.slice(0, 40).map(item => {
            this.newOneScoreList.push(item)
          })
          this.oneScoreList.slice(39, this.oneScoreList.length - 1).map(item => {
            this.currentOneScoreList.push(item)
          })
          this.loading = false
          // this.oneScoreList.splice(0, 20)
          console.log('33333', this.newOneScoreList)
          console.log('33333', this.currentOneScoreList)
          this.init()
          console.log('一分一段信息：', res.data)
        })
      },
      nextPage () {
        if (this.currentOneScoreList.length > 40) {
          this.currentOneScoreList.slice(0, 40).map(item => {
            this.newOneScoreList.push(item)
          })
          this.currentOneScoreList.splice(0, 40)
          console.log('下一页之后数据：', this.currentOneScoreList)
        } else {
          this.currentOneScoreList.map(item => {
            this.newOneScoreList.push(item)
          })
        }
        console.log('当前数据：', this.newOneScoreList)
        this.$nextTick(() => {
          this.scoreScroll && this.scoreScroll.refresh()
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
    height: calc(100% - 50px);
    overflow: hidden;
  }
  .select_one_score {
    width: 86%;
    margin-top: 15px;
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
    margin: 20px 8px 10px;
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

