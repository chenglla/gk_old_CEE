<template>
  <div class="my-bbs-block">
    <div class="my-bbs-list">
      <div class="my-bbs-item__sub" ref="my-bbsitemList" style="padding: 10px 0;position: relative;">
        <div class="list-loading" v-if="loading">
          <div class="loader"></div>
        </div>
        <div v-if="!loading" v-for="item in list" class="mybbs-score_line" >
          <template v-if="type==='bbs'">
            <div class="mybbs-score_content" @click="goDetail(item.takeid)">
              <div v-if="item.status === 'fail'" class="bbs-status bbs-status--fail">审核不通过</div>
              <div v-if="item.status === 'checking'" class="bbs-status bbs-status--checking">审核中</div>
              <p>{{item.ask}}</p>
              <p class="my-bbs_time"><i class="iconfont iconshijian1"></i><span>{{item.time}}</span></p>
            </div>
          </template>
          <template v-else>
            <div class="mybbs-score_content">
              <div v-if="item.status === 'fail'" class="bbs-status bbs-status--fail">审核不通过</div>
              <div v-if="item.status === 'checking'" class="bbs-status bbs-status--checking">审核中</div>
              <p>{{item.ask}}</p>
              <p class="my-bbs_time"><i class="iconfont iconshijian1"></i><span>{{item.time}}</span></p>
            </div>
          </template>
        </div>
        <div class="list-no-data" v-if="!loading && list.length === 0">暂无内容</div>
      </div>
    </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      title: String,
      list: Array,
      loading: Boolean,
      type: String
    },
    methods: {
      goDetail (id) {
        this.$router.push({
          name: 'bbsDetail',
          params: { id: id }
        })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .my-bbs-block {
    margin: 20px 16px;
  }
  .my-bbs-item__name {
    padding-left: 18px;
    &:before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 20px;
      background: #88b5fd;
      position: absolute;
      left: 20px;
    }
  }
  .mybbs-score_content {
    position: relative;
    border-bottom: 1px solid #e1edff;
    margin-right: -20px;
    padding: 6px 20px 6px 0;
  }
  .bbs-status {
    position: absolute;
    right: 20px;
    top: 13px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.5);
    transform: rotate(20deg);
    border: 1px solid #fff;
    &.bbs-status--fail {
      border-color: red;
      color: red;
    }
    &.bbs-status--checking {
      border-color: #93bdff;
      color: #93bdff;
    }
  }
  .my-bbs_time {
    font-size: 12px;
    color: #496ca0;
    padding-left: 20px;
    position: relative;
    .iconfont {
      position: absolute;
      left: 0;
      top: -4px;
    }
  }
</style>