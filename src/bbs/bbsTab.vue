<template>
  <div class="bbs-tab-box" ref="bbsWrapper">
    <div class="bbs-tab">
      <div class="bbs-tab-item" :class="{'active': curTab === 'time'}" @click="goTab('最新', 'time')">最新</div>
      <div class="bbs-tab-item" :class="{'active': curTab === 'hot'}" @click="goTab('最热', 'hot')">最热</div>
      <div class="bbs-tab-item" :class="{'active': curTab === 'my'}" @click="goTab('我的', 'my')">我的</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      curTab: String
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      goTab (text, tab) {
        if (tab === 'major') {
          this.$router.push({ name: 'major' })
          return
        }
        this.$emit('changeTab', tab)
        if (['prov', 'spec', 'class', 'categ'].indexOf(tab) !== -1) {
          this.title = '筛选' + text
        }
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @import "@/styles/color.scss";
  .bbs-tab-box {
    padding: 0;
    box-shadow: 0px 10px 10px 0px #647cfb20;
  }
  .bbs-tab {
    padding: 4px 20px;
    margin-top: -4px;
    width: 270px;
    min-width: 40px;
    margin: auto;
    text-align: center;
  }
  .bbs-tab-item {
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
  .bbs-filter {
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