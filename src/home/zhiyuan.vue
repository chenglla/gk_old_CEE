<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;margin-top: 10px;margin-left: 40%">
        志愿填报系统
      </div>
    </div>
    <div>
      <div class="complete-card">
        <p style="font-size: 16px;margin: 10px 7%">请先选择查分城市：</p>
<!--        <br>-->
        <div class="info-item__value">
          <popup-picker title="省份" :data="provList" v-model="province" @on-change="changeProv" placeholder="选择省份" @on-hide="getZhiyuan()" style="font-size: 16px"></popup-picker>
        </div>
      </div>
      <div class="check_content">
        <div style="font-size: 18px;font-weight: bolder;background-color: #647cfb;color: #fff;width: 30%;margin-left: 35%;margin-top: 20px;text-align: center">- {{province[0] || '暂无'}} -</div>
        <table style="margin: 3% 5%;padding: 10px">
          <tr>
            <td class="table_item">填报志愿时间</td>
          </tr>
          <tr>
            <td class="table_item_content" v-html="zhiyuanTime">{{zhiyuanTime || '暂无'}}</td>
          </tr>
          <tr>
            <td class="table_item">志愿设置</td>
          </tr>
          <tr>
            <td class="table_item_content">
              {{zhiyuanType || '暂无'}}
              <a class="school-introduction-link" :href="zhiyuanChakan">
                <span class="school-introduction-detail">更多</span>
<!--                <span class="school-introduction-icon"><i class="iconfont iconleft-arrow"></i></span>-->
              </a>
            </td>
          </tr>
          <tr>
            <td class="table_item">志愿填报网站</td>
          </tr>
        </table>
        <div class="table_item_content_a" ><a :href="loginHref" title="请先选择城市">进入填报系统</a></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { PopupPicker } from 'vux'
  import { getProvinces, getAllZhiyuan } from '@/api/index'
  export default {
    components: { PopupPicker },
    data () {
      return {
        provList: [],
        province: ['北京'],
        zhiyuanChakan: '',
        zhiyuanType: '',
        zhiyuanTime: '',
        loginHref: ''
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 返回
      returnBack () {
        this.$router.go(-1)
      },
      changeProv (value) {
        console.log(value)
      },
      getList () {
        getProvinces().then(res => {
          this.provList = [res.data.data]
        })
        getAllZhiyuan(this.province[0]).then(res => {
          this.zhiyuanTime = res.data.data.time
          this.zhiyuanType = res.data.data.type
          this.zhiyuanChakan = res.data.data.chakan
          this.loginHref = res.data.data.loginhref
        })
      },
      getZhiyuan () {
        getAllZhiyuan(this.province[0]).then(res => {
          this.zhiyuanTime = res.data.data.time
          this.zhiyuanType = res.data.data.type
          this.zhiyuanChakan = res.data.data.chakan
          this.loginHref = res.data.data.loginhref
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
  .complete-card {
    overflow: hidden;
    position: relative;
    background: #fff;
    /*margin: 16px 20px;*/
    padding: 10px 5px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
  }
  .info-item__value{
    /*height: 50%;*/
    width: 50%;
    margin-left: 25%;
  }
  .table_item{
    font-size: 16px;
    margin-left: 3%;
    font-weight: bold;

  }
  .table_item,
  .table_item_content,
  .table_item_content_a{
    height: 35px;
  }
  .school-introduction-detail {
    color: #ADADAD;
    /*right: 20px;*/
    font-size: 12px;
  }
  .school-introduction-detail i{
    transform: rotate(-180deg);
  }
  .school-introduction-link {
    position: relative;
    /*top: 5px;*/
    right: -10px;
    width: 46px;
  }
  .school-introduction-icon {
    position: relative;
    font-size: 12px;
    right: -2px;
    top: -2px;
    /*<!--transform: rotate:before(-180deg);-->*/
  }
  /*<!--.rotate:before {-->*/
  /*<!--  transform: rotate(-180deg);-->*/
  /*<!--}-->*/
  .table_item_content_a a{
    text-decoration: none;
    background-color: #647cfb;
    border: 1px solid blue;
    border-radius: 3px;
    color: #FFFFFF;
    padding: 2px 7px;
    margin-left: 38%;
  }
  .check_content{
    /*margin: 5px 0;*/
    padding: 10px 0;
    background-color: #fff;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
  }
</style>
