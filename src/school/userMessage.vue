<template>
  <div id="mDig2">
    <x-dialog v-model="show">
      <group class="weui-dialog" title="请完善信息">
        <selector class="weui-cell" title="省份:"  placeholder="请选择省份" :options="provlist" v-model="value1"></selector>
        <selector title="科目:"  placeholder="请选择科目" :options="categorylist" v-model="value2" ></selector>
        <selector title="批次:"  placeholder="请选择批次" :options="batchlist" v-model="value3" ></selector>
        <hr style="border-top:0.1px #D9D9D9 solid; transform: scaleY(0.5);" >
        <button class="button blue medium" @click.stop="change">保存</button>
      </group>
    </x-dialog>
  </div>
</template>

<script>
  import { XDialog, Group, Selector } from 'vux'
  import { getAllBatch, getAllCategory, getAllProvince, save } from '@/api/index'
  export default {
    components: { XDialog, Group, Selector },
    data () {
      return {
        provlist: [],
        categorylist: [],
        batchlist: [],
        value1: '',
        value2: '',
        value3: ''
      }
    },
    props: {
      show: Boolean,
      openid: String,
      code: String
    },
    mounted () {
      this.getList()
    },
    methods: {
      change () {
        if (this.value1 && this.value2 && this.value3) {
          this.$emit('changShow', false)
          save(this.openid, this.value1, this.value2, this.value3).then(res => {
            if (res.data.code === 0) {
              this.$router.push({ path: '/schoolInfo/' + this.openid + '/' + this.code })
            }
          })
        } else {
          alert('请补充所有信息')
        }
      },
      getList () {
        getAllProvince().then(res => {
          this.provlist = this.provlist.concat(res.data.data)
        })
        getAllCategory().then(res => {
          this.categorylist = this.categorylist.concat(res.data.data)
        })
        getAllBatch().then(res => {
          this.batchlist = this.batchlist.concat(res.data.data)
        })
      }
    }
  }
</script>

<style lang="scss" scoped="">
  @import "@/styles/weui.min.scss";
  .weui-dialog {
    position: fixed;
    top: 10%;
    left: 53%;
    display: table;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*margin: auto;*/
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  .weui-cell:before {
    content: " ";
    /*position: absolute;*/
    left: 0;
    /*top: 0;*/
    /*right: 0;*/
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .button {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font: 16px/100% 'Microsoft yahei',Arial, Helvetica, sans-serif;
    /*padding: .5em 2em .55em;*/
    margin-top: 0.77em;
    margin-bottom: 0.3em;
    padding-left: 15px;
    padding-right: 15px;
    text-shadow: 0 1px 1px rgba(0,0,0,.3);
    -webkit-border-radius: .5em;
    -moz-border-radius: .5em;
    border-radius: .5em;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
  }
  .button:hover {
    text-decoration: none;
  }
  .button:active {
    position: relative;
    top: 1px;
  }
  .blue {
    color: #d9eef7;
    border: solid 1px #0076a3;
    background: #0095cd;
    background: -webkit-gradient(linear, left top, left bottom, from(#00adee), to(#0078a5));
    background: -moz-linear-gradient(top,  #00adee,  #0078a5);
    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#00adee', endColorstr='#0078a5');
  }
  .blue:hover {
    background: #007ead;
    background: -webkit-gradient(linear, left top, left bottom, from(#0095cc), to(#00678e));
    background: -moz-linear-gradient(top,  #0095cc,  #00678e);
    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#0095cc', endColorstr='#00678e');
  }
  .blue:active {
    color: #80bed6;
    background: -webkit-gradient(linear, left top, left bottom, from(#0078a5), to(#00adee));
    background: -moz-linear-gradient(top,  #0078a5,  #00adee);
    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#0078a5', endColorstr='#00adee');
  }

  .medium {
    font-size: 12px;
    padding: .4em 1.5em .42em;
  }

</style>


