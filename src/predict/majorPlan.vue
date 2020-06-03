<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;line-height: 45px;text-align: center;" v-if="schoolName !== ''">
        {{schoolName}}招生计划
      </div>
    </div>
    <div class="enroll_plan_second" ref="enroll_plan_second">
      <div>
        <div class="list-loading" v-if="enrollPlanList.length=== 0">
          <div class="loader"></div>
        </div>
        <div v-if="enrollPlanList.length > 0">
          <p>以下是{{schoolName}}对{{enrollPlanList[0].provinceName}}省招生计划人数详情</p>
          <x-table class="third_table" style="table-layout: fixed;">
            <thead>
            <tr class="third_table_thead">
              <th>专业</th>
              <th>学科门类</th>
              <!--          <th>二级门类</th>-->
              <!--          <th>省份</th>-->
              <th>人数</th>
              <th>年份</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in enrollPlanList" :key="index">
              <td class="ttd td_info" @click="gotoTdInfo(index)">{{item.majorName}}</td>
              <td>{{item.majorBigName}}</td>
              <td>{{item.enrollNum}}</td>
              <!--            <td>{{item}}</td>-->
              <td>{{item.year}}</td>
              <!--          <td>{{item.gradeRank}}</td>-->
            </tr>
            </tbody>
          </x-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import { XTable } from 'vux'
  import {getEnrollPlan} from '@/api/index'
  export default {
    components: { XTable },
    data () {
      return {
        enrollPlanList: [], // 招生计划
        enrollScroll: null,
      }
    },
    computed: {
      schoolName () {
        return this.$route.query.schoolName
      },
      openid () {
        return this.$store.state.user.openid
      },
    },
    mounted () {
      this.getEnrollPlan()
      this.init()
    },
    methods: {
      returnBack () {
        this.$router.go(-1)
        // this.$router.push({name: 'predict'})
      },
      init () {
        this.$nextTick(() => {
          this.enrollScroll = new BScroll(this.$refs.enroll_plan_second, {
            click: true
          })
        })
      },
      getEnrollPlan () { // 获取招生详情
        getEnrollPlan({
          openid: this.openid,
          schoolname: this.schoolName,
          year: '2019'
        }).then(res => {
          this.enrollPlanList = res.data.data
          console.log('妆业招生详情', res.data)
        })
      },
      gotoTdInfo (index) {
        console.log('index', index)
        var a = document.querySelectorAll('.ttd')
        a[index].className = 'ttd td_info_no'
        console.log(a[index].className)
      }
    }
  }
</script>
<style scoped lang="scss">
  .check-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);
    flex: none;
    z-index: 1;
    height: 45px;
  }
  .return__icon{
    margin-left: 10px;
    margin-top: 10px;
    color: #fff;
  }
  .enroll_plan_second {
    /*margin-top: 15px;*/
    margin: 15px 4px 5px;
    border-radius: 10px;
    background-color: #fff;
    height: calc(100% - 45px);
    overflow: hidden;
    p {
      text-align: center;
      color: #9c9c9c;
      margin-bottom: 10px;
      /*text-indent: 2em;*/
    }
  }
  /*.third {*/
  /*  margin: 35px 4px;*/
  /*  text-align: center;*/
  /*  border-radius: 10px;*/
  /*  background-color: #fff;*/
  /*}*/
  tbody tr:nth-child(2n + 1) {
    /*background-color: rgb(229,253,239);*/
    background-color: rgba(100,124,251,0.1);
    /*background-color: rgba(66,185,130,0.2);*/
  }
  tbody tr td {
    /*border: 1px solid rgba(66,185,130,0.2);*/
    border: 1px solid rgba(100,124,251,0.1);
    font-size: 13px;
  }
  thead tr th {
    border: 1px solid rgba(100,124,251,0.1);
    /*border: 1px solid rgba(66,185,130,0.2);*/
    font-weight: bold;
    font-size: 14px;
  }
  table.vux-table.third_table {
    line-height: 33px;
  }
  .td_info {
    /*white-space: nowrap; // 强制一行显示*/
    /*width: 20%;*/
    /*overflow: hidden; // 超出部分隐藏*/
    /*text-overflow: ellipsis; // 超出部分显示省略号*/
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    /*-icab-text-overflow: ellipsis;*/
    /*-khtml-text-overflow: ellipsis;*/
    /*-moz-text-overflow: ellipsis;*/
    /*-webkit-text-overflow: ellipsis;*/
  }
  .td_info_no
  {
    overflow:visible;
    white-space:normal;
    word-wrap: break-word;
  }
</style>
