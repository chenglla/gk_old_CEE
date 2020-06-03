<template>
  <div class="search-tab-box" ref="searchWrapper">
    <div class="search-tab">
      <div class="search-tab-item" :class="{'active': curTab === 'all'}" @click="goTab('全部', 'all')">全部</div>
<!--      <div class="search-tab-item" @click="goTab('专业', 'major')">专业</div>-->
<!--      <div class="search-tab-item" :class="{'active': curTab === 'prov'}" @click="goTab('省份', 'prov')">省份</div>-->
<!--      <div class="search-tab-item" :class="{'active': curTab === 'type'}" @click="goTab('类别', 'type')">类别</div>-->
      <div class="search-tab-item" :class="{'active': curTab === 'com'}" @click="goTab('复合', 'com')">综合</div>
    </div>
    <div class="search-tips">
      <i class="iconfont iconjinggao"></i>
      <span>预测分数和当前用户填写的省份、文理科、录取批次有关！</span>
    </div>
    <div class="search-filter" :class="'filter-' + curTab">
      <template v-if="curTab === 'prov' || curTab === 'type'">
        <popup-picker
          :title="title"
          :data="list"
          v-model="value"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onChange"
        ></popup-picker>
      </template>
      <template v-if="curTab === 'com'">
        <popup-picker
          :value-text-align="'left'"
          :placeholder="'省份'"
          :data="sProvList"
          v-model="sProv"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onComChange"
        ></popup-picker>
        <popup-picker
          :value-text-align="'left'"
          :placeholder="'类别'"
          :data="sTypeList"
          v-model="sType"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onComChange"
        ></popup-picker>
        <popup-picker
          :value-text-align="'left'"
          :placeholder="'性质'"
          :data="sCategList"
          v-model="sCateg"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onComChange"
        ></popup-picker>
        <popup-picker
          :value-text-align="'left'"
          :placeholder="'等级'"
          :data="sClassList"
          v-model="sClass"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onComChange"
        ></popup-picker>
      </template>
    </div>
  </div>
</template>
<script>
  import { PopupPicker } from 'vux'
  import BScroll from 'better-scroll'
  import { getSchoolOpts } from '@/api/index.js'
  export default {
    components: { PopupPicker },
    data () {
      return {
        searchScroll: null,
        value: [''],
        title: '筛选省份',
        titleMap: {
          prov: '筛选省份',
          class: '筛选等级',
          type: '筛选类别',
          categ: '筛选性质'
        },
        urlMap: {
          prov: 'school/findAllProvince',
          class: 'school/findAllGrade',
          type: 'school/findAllType',
          categ: 'school/findAllCategory'
        },
        list: [['1', '2']],
        sProv: [],
        sCateg: [],
        sType: [],
        sClass: [],
        sProvList: [['']],
        sCategList: [['']],
        sTypeList: [['']],
        sClassList: [['']]
      }
    },
    props: {
      curTab: String
    },
    mounted () {
      this.$nextTick(() => {
        this.searchScroll = new BScroll(this.$refs.searchWrapper, {
          scrollX: true,
          click: true
        })
      })
      this.init()
    },
    watch: {
      curTab () {
        this.init()
      }
    },
    methods: {
      init () {
        if (this.curTab === 'prov' || this.curTab === 'type') {
          this.getOpts(this.curTab)
          this.value = ['']
        } else if (this.curTab === 'com') {
          this.getOpts('prov')
          this.getOpts('class')
          this.getOpts('categ')
          this.getOpts('type')
          this.sProv = []
          this.sCateg = []
          this.sType = []
          this.sClass = []
        }
        this.$emit('comSearch', {
          page: 0
        })
      },
      goTab (text, tab) {
        if (tab === 'major') {
          this.$router.push({ name: 'major' })
          return
        }
        this.$emit('changeTab', tab)
        if (['prov', 'spec', 'class', 'categ'].indexOf(tab) !== -1) {
          this.title = '筛选' + text
        }
      },
      // 获取筛选的值
      getOpts (name) {
        this.title = this.titleMap[name]
        getSchoolOpts(this.urlMap[name]).then(res => {
          if (res.data.code === 0) {
            if (name === 'prov') {
              this.list = [res.data.data]
              this.sProvList = [res.data.data]
            } else if (name === 'type') {
              this.list = [res.data.data]
              this.sTypeList = [res.data.data]
            } else if (name === 'categ') {
              this.sCategList = [res.data.data]
            } else if (name === 'class') {
              this.sClassList = [['985', '211', '双一流', '普通']]
              // this.sClassList = [res.data.data]
            }
          }
        })
      },
      // 省份和类别
      onChange (val) {
        const query = {}
        if (val.length === 0 || val[0] === '') {
          return
        }
        if (this.curTab === 'prov') {
          query.province = val[0]
        } else if (this.curTab === 'type') {
          query.type = val[0]
        }
        this.$emit('comSearch', query)
      },
      onShow () {
      },
      onHide (type) {
      },
      onComChange () {
        const query = {}
        if (this.sProv[0] !== undefined && this.sProv[0] !== '') {
          query.province = this.sProv[0]
        }
        if (this.sCateg[0] !== undefined && this.sCateg[0] !== '') {
          query.category = this.sCateg[0]
        }
        if (this.sType[0] !== undefined && this.sType[0] !== '') {
          query.type = this.sType[0]
        }
        if (this.sClass[0] !== undefined && this.sClass[0] !== '') {
          query.grade = this.sClass[0]
        }
        this.$emit('comSearch', query)
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @import "@/styles/color.scss";
  .search-tab-box {
    padding: 0;
    box-shadow: 0px 10px 10px 0px #647cfb20;
    position: relative;
  }
  .search-tips {
    background: #fff6cb;
    width: 100%;
    padding: 0 20px;
    color: #6f6f6f;
    &, .iconfont {
      font-size: 12px;
      line-height: 20px;
    }
  }
  .search-tab {
    padding: 4px 20px;
    margin-top: -4px;
    width: 270px;
    min-width: 40px;
  }
  .search-tab-item {
    display: inline-block;
    padding: 4px 0;
    margin-right: 18px;
    width: 30px;
    position: relative;
    color: #fff;
    &.active {
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 4px;
        width: 20px;
        height: 2px;
        background: #fff;
      }
    }
  }
</style>
<style lang="scss">
  .search-filter {
    margin: 0;
    font-size: 0;
    background: #fff;
    &.filter-com .vux-cell-box {
      display: inline-block;
      width: 50%;
    }
    .vux-cell-box:before {
      display: none;
    }
    .weui-cell {
      padding: 4px 15px;
      height: 24px;
    }
  }
</style>
