<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="check-box">
      <div class="return__icon" @click="returnBack" style="float: left">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div style="color: #fff;font-size: 17px;margin-top: 10px;margin-left: 45%">
        查分系统
      </div>
    </div>
    <div>
      <div class="complete-card">
        <p style="font-size: 16px;margin: 10px 7%">请先选择查分城市：</p>
        <!--        <br>-->
        <div class="info-item__value">
          <popup-picker title="省份" :data="provList" v-model="province" @on-change="changeProv" placeholder="选择省份" @on-hide="getCheck()" style="font-size: 16px"></popup-picker>
        </div>
      </div>
      <div class="check_content">
        <div style="font-size: 18px;font-weight: bolder;background-color: #647cfb;color: #fff;width: 30%;margin-left: 35%;margin-top: 20px;text-align: center">- {{province[0] || '暂无'}} -</div>
        <table style="margin: 3% 5%;padding: 10px">
          <tr>
            <td class="table_item">查分时间</td>
          </tr>
          <tr>
            <td class="table_item_content">{{checkTime || '暂无'}}</td>
          </tr>
          <tr>
            <td class="table_item">查分方式</td>
          </tr>
          <tr>
            <td class="table_item_content">{{checkType || '暂无'}}</td>
          </tr>
          <tr>
            <td class="table_item">查分网址</td>
          </tr>
          <tr class="table_item_content">
            <td class="order-id" :data-clipboard-text="loginHref" @click="copyHref">
              {{loginHref}}
              <span>复制</span>
            </td>
          </tr>
        </table>
        <!--        <div class="table_item_content" >-->
        <!--          <p class="order-id" @click="copyHref">{{loginHref}}</p>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard'
  import { Toast } from 'vant' // 引入vant ui库的toast轻提示
  import { PopupPicker } from 'vux'
  import { getProvinces, getAllCheck, myInfo } from '@/api/index'
  // import { Group, Selector, PopupPicker } from 'vux'
  export default {
    components: { PopupPicker },
    // components: { Group, Selector, PopupPicker },
    data () {
      return {
        provList: [],
        province: [],
        checkTime: '',
        checkType: '',
        loginHref: ''
      }
    },
    computed: {
      openid () {
        return this.$store.state.user.openid
      }
    },
    mounted () {
      // this.getList()
      this.getUserInfo()
    },
    methods: {
      // 返回
      returnBack () {
        this.$router.go(-1)
      },
      // 复制功能
      copyHref () {
        // console.log(1111111)
        const clipboard = new Clipboard('.order-id') // 绑定数据标签的类名
        // console.log(22222)
        clipboard.on('success', e => {
          // alert('复制成功' + e)
          // this.
          this.$vux.toast.show({
            text: '复制成功'
          })
          // Toast.success('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // alert('复制失败' + e)
          this.$vux.toast.show({
            text: '该浏览器或手机权限不支持复制功能'
          })
          // Toast.fail('该浏览器或手机权限不支持复制功能')
          // 释放内存
          clipboard.destroy()
        })
      },
      getUserInfo () {
        myInfo(this.openid).then(res => {
          console.log('用回信息；', res.data)
          if (res.data.code === 0) {
            // console.log(this.value)
            this.province = [res.data.data.province || '暂无']
          }
          this.getList()
        })
      },
      changeProv (value) {
        console.log(value)
      },
      getList () {
        getProvinces().then(res => {
          this.provList = [res.data.data]
        })
        getAllCheck(this.province[0]).then(res => {
          this.checkTime = res.data.data.time
          this.checkType = res.data.data.type
          this.loginHref = res.data.data.loginhref
        })
      },
      getCheck () {
        getAllCheck(this.province[0]).then(res => {
          this.checkTime = res.data.data.time
          this.checkType = res.data.data.type
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
  .table_item_content{
    height: 35px;
    width: 90%;
    word-break: break-all;
  }
  .table_item_content a{
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
  .order-id {
    text-align: center;
    span {
      color: #0c5ddc;
      font-size: 13px;
    }
  }
</style>
