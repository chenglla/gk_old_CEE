<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;background-color:#fff;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;margin-top: 10px;text-align: center">
        招生计划
      </div>
      <div class="city_info">
        <i class="iconfont iconlocation"></i>
        <span>{{city}}</span>
        <span>{{category[0]}}</span>
      </div>
    </div>
    <div class="enrollPlanInfo" ref="enrollPlanInfo">
      <div style="padding-bottom: 20px">
        <div class="btn_info">
          <span @click="gotoSelect(0)" class="btnColor">按学校查询</span>
          <span @click="gotoSelect(1)">按专业查询</span>
        </div>
        <div class="search_info">
          <label>
            <input type="text" class="third_input" placeholder="请输入学校名称" v-model="searchContent" ref="searchInput" @click="toggleInput" @keyup.enter="gotoSearch">
<!--            <input type="text" class="third_input" placeholder="请输入学校名称" v-model="searchContent" ref="searchInput" @click="toggleInput" @keyup.enter="gotoSearch"  @input="handleInput">-->
          </label>
          <i class="iconfont iconsousuo2" @click="gotoSearch"></i>
        </div>
        <div class="multiItem">
          <popup-picker class="one_score_info_xiala" placeholder="院校位置" :data="[provinceList]" :value="province" @on-change="onChangePro"></popup-picker>
          <popup-picker class="one_score_info_xiala" placeholder="类别" :data="[categoryList]" :value="category" @on-change="onChangeCate"></popup-picker>
          <popup-picker class="one_score_info_xiala" placeholder="年份" :data="[yearList]" :value="year" @on-change="onChangeYear"></popup-picker>
        </div>
        <div>
          <div class="list-loading" v-if="loading">
            <div class="loader"></div>
          </div>
<!--          <div v-else class="schoolScoreLine">-->
          <div v-if="!loading && enrollPlanList.length > 0" class="schoolScoreLine">
<!--          <div v-if="enrollPlanList.length > 0" class="schoolScoreLine">-->
            <x-table full-bordered style="background-color:#fff;table-layout: fixed;" class="schoolScoreLineTable">
              <thead>
              <tr>
                <th>学校名称</th>
                <th>批次</th>
                <th>招生专业</th>
                <th>人数</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in enrollPlanList" :key="index">
                <td>{{item.schoolName}}</td>
                <td>{{item.batch}}</td>
                <td class="td_major">{{item.majorName}}</td>
                <td>{{item.enrollNum}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {myInfo} from '@/api/index'
  import {getOneScoreProvince, getEnrollPlanBySchool, getEnrollPlanByMajor, getEnrollPlanByProvince, getEnrollPlanByCondition} from '@/api/oneScore'
  export default {
    data () {
      return {
        batch: '',
        // category: '',
        city: '',
        placeholder: ['请输入学校名称', '请输入专业名称'],
        searchContent: '',
        TimeId: -1,
        schoolQuery: 0,
        yearList: ['2019'],
        year: ['2019'],
        provinceList: [],
        province: [],
        categoryList: ['文科', '理科', '新高考'],
        category: [],
        page: 1,
        enrollPlanList: [],
        enrollPlanScroll: null,
        isEnd: false,
        loading: false,
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    watch: {
      province (newval, oldval) {
        if (oldval.length !== 0 && newval[0] !== oldval[0]) {
          console.log('province', newval[0], oldval[0])
          this.enrollPlanList = []
          this.getMultiSelect()
        }
      },
      category (newval, oldval) {
        console.log('category', newval, oldval)
        if (oldval.length !== 0 && newval[0] !== oldval[0]) {
          this.enrollPlanList = []
          this.getMultiSelect()
        }
      }
    },
    mounted () {
      this.getUserInfo()
      // this.getOneScoreProvince() // 获取所有省份
      this.loading = true
      // this.getEnrollPlanByProvince() // 刚进页面得到的招生计划数据
      this.init()
    },
    methods: {
      // 返回
      returnBack () {
        this.$router.go(-1)
      },
      init () {
        this.$nextTick(() => {
          this.enrollPlanScroll = new BScroll(this.$refs.enrollPlanInfo, {
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
          this.enrollPlanScroll.on('pullingUp', (pos) => {
            if (this.searchContent === '') {
              this.nextPage()
              this.$nextTick(() => {
                this.enrollPlanScroll.finishPullUp()
              })
            } else {
              console.log('么有数据咯')
            }
          })
          this.enrollPlanScroll.on('pullingDown', () => {
            // this.reList()
            this.$nextTick(() => {
              this.enrollPlanScroll.finishPullDown()
            })
          })
        })
      },
      getUserInfo () {
        myInfo(this.openid).then(res => {
          this.province = []
          this.batch = res.data.data.batch || '暂无'
          this.category.push(res.data.data.category || '暂无')
          this.city = res.data.data.province || '暂无'
          this.province.push(this.city)
          this.enrollPlanList = []
          this.getEnrollPlanByProvince()
          this.getOneScoreProvince()
          // this.province.push(res.data.data.province || '暂无')
        })
      },
      gotoSelect (val) { // 选择专业查询还是学校查询
        this.schoolQuery = val
        this.searchContent = ''
        const btn = document.querySelector('.btn_info')
        const inputCon = document.querySelector('.third_input')
        // var btn = document.querySelectorAll('.btn_info span')
        console.log(btn)
        for (let i = 0; i < btn.children.length; i++) {
          console.log(i)
          btn.children[i].className = ''
        }
        btn.children[val].className = 'btnColor'
        inputCon.setAttribute('placeholder', this.placeholder[val])
      },
      handleInput () {
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
          this.gotoSearch()
        }, 1000)
        console.log('分数：', this.score)
      },
      toggleInput () {
        this.$refs.searchInput.focus()
        const a = document.querySelector('.third_input')
        a.removeAttribute('placeholder')
        // a.parentNode.className = 'predict_second_input'
        // console.log(a)
      },
      gotoSearch () { // 进行搜索
        this.loading = true
        this.enrollPlanList = []
        if (this.schoolQuery === 0) { // 学校查询
          getEnrollPlanBySchool({
            province: this.city,
            schoolname: this.searchContent
          }).then(res => {
            if (res.data.code === 0) {
              this.enrollPlanList = res.data.data
              this.loading = false
              console.log('按学校搜索', res.data.data)
            }
          })
        } else if (this.schoolQuery === 1) {
          getEnrollPlanByMajor({
            province: this.city,
            majorname: this.searchContent
          }).then(res => {
            if (res.data.code === 0) {
              this.enrollPlanList = res.data.data
              this.loading = false
              console.log('按专业搜索', res.data.data)
            }
          })
        }
      },
      onChangePro (val) {
        this.province = val
        this.enrollPlanList = []
        console.log('city', val)
        // this.getMultiSelect()
      },
      onChangeCate (val) {
        this.category = val
        this.enrollPlanList = []
        // this.getMultiSelect()
        console.log('cate:', val)
      },
      onChangeYear (val) {
        this.year = val
        this.enrollPlanList = []
        // this.getMultiSelect()
        console.log('这里调用多条件查询接口')
      },
      getOneScoreProvince () { // 获取所有省份
        console.log(this.province)
        getOneScoreProvince().then(res => {
          this.provinceList = res.data
        })
      },
      getMultiSelect () {
        this.loading = true
        getEnrollPlanByCondition({
          page: this.page,
          size: 20,
          province: this.city,
          schoolcity: this.province[0],
          category: this.category[0]
        }).then(res => {
          if (res.data.code === 0) {
            this.enrollPlanList = res.data.data
            this.loading = false
          }
          console.log(res.data)
        })
      },
      getEnrollPlanByProvince () { // 刚进入页面通过省份获取数据
        getEnrollPlanByProvince({
          page: this.page,
          size: 20,
          province: this.city
        }).then(res => {
          if (res.data.code === 0) {
            if (res.data.data.length < 20) {
              this.isEnd = true
            }
            const id = this.enrollPlanList.map(item => item.id)
            res.data.data.map(item => {
              if (id.indexOf(item.id) === -1) {
                this.enrollPlanList.push(item)
              }
            })
            this.loading = false
            this.$nextTick(() => {
              this.majorScroll && this.majorScroll.refresh()
            })
            // this.enrollPlanList = res.data.data
            // this.init()
          }
          console.log('得到的数据', res.data)
        })
      },
      nextPage () {
        if (this.isEnd || this.loading) {
          return
        }
        this.page++
        this.getEnrollPlanByProvince()
      },
    }
  }
</script>
<style scoped lang="scss">
  input::-webkit-input-placeholder { /* WebKit browsers*/
    　　color:#aaa;font-size:12px;}
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18*/
    　　color:#aaa;font-size:12px;}
  input::-moz-placeholder { /* Mozilla Firefox 19+*/
    　　color:#aaa;font-size:12px;}
  input:-ms-input-placeholder { /* Internet Explorer 10+*/
    　　color:#aaa;font-size:12px;
  }
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
  .enrollPlanInfo {
    margin-top: 5px;
    height: calc(100% - 50px);
    overflow: hidden;
  }
  .city_info {
    position: absolute;
    top: 15px;
    right: 5px;
    color: #fff;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 20%;
    .iconfont {
      font-size: 12px;
      margin-right: -3px;
    }
  }
  .btn_info {
    margin: 10px 0 10px 50%;
    /*padding: 0 5px;*/
    width: 90%;
    /*margin-left: 50%;*/
    transform: translateX(-50%);
    display: flex;
    span {
      flex: 1;
      margin: 0 5px;
      padding: 2px 3px;
      text-align: center;
      border: 1px solid #ececec;
      border-radius: 5px;
      box-shadow: 1px 0 2px 0 rgba(0, 0, 0, .2);
    }
    span:nth-child(2) {
      margin-left: 10px;
    }
  }
  .btnColor {
    color: #0c5ddc!important;
  }
  .search_info {
    border: 1px solid #acacac;
    margin: 10px 15px 0;
    position: relative;
    border-radius: 5px;
    /*margin-top: 10px;*/
  }
  .third_input {
    margin-left: 10px;
    border: 0;
    height: 30px;
    width: 81%;
    outline: 0;
  }
  .iconsousuo2 {
    position: absolute;
    font-weight: bold;
    float: right;
    right: 8px;
    top: 4px;
  }
  .multiItem {
    display: flex;
    border-bottom: 3px solid #ececec;
    /*box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.2);*/
    .one_score_info_xiala {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .vux-cell-box:not(:first-child):before {
    border: unset;
  }
  .enrollPlanInfo >>> .weui-cell_access .weui-cell__ft:after {
    display: none;
  }
  .schoolScoreLine {
    color: #767c98;
    padding-top: 2px;
    margin: 10px 8px 10px;
    text-align: center;
    border-radius: 10px;
    background-color: #fff;
  }
  tbody tr:nth-child(2n) {
    /*background-color: rgb(229,253,239);*/
    /*background-color: rgba(46,122,241,0.2);*/
    background-color: rgb(242, 242, 242);
  }
  tbody tr td {
    /*border: 1px solid rgba(46,122,241,0.2);*/
    font-size: 13px;
  }
  thead tr th {
    /*border: 1px solid rgba(46,122,241,0.2);*/
    color: #0c5ddc;
    background-color: rgb(242, 242, 242);
    /*font-weight: bold;*/
    font-size: 14px;
  }
  table.vux-table.schoolScoreLineTable {
    line-height: 33px;
  }
  .td_major {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
  }
</style>
