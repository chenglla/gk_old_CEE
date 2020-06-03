<template>
  <div class="school-wrapper"
    ref="schoolWrapper"
    :style="{height: 'calc(100% - ' + height + 'px)'}">
    <div class="school-list">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && list.length === 0">
        暂无结果
      </div>
      <div class="school-item" v-if="!loading && list.length !== 0" v-for="school in list">
        <div class="school-item__logo"><img :src="school.log"></div>
        <div class="school-item__devide"></div>
        <div class="school-item__info">
          <div class="school-item__name">{{school.schoolname}}</div>
          <div class="school-item__grade">{{school.grade}}</div>
          <div class="school-item__ranking">热度排名: {{school.ranking}}</div>
          <div class="school-item__prescore">建议报考分: {{school.prescore}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        schoolScroll: null
      }
    },
    props: {
      loading: Boolean,
      list: Array,
      type: String
    },
    computed: {
      height () {
        return this.type === undefined ? 100 : this.type === 'one' ? 125 : this.type === 'two' ? 157 : 100
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      list: {
        handler: function () {
          this.init()
        },
        deep: true
      },
      height () {
        this.init()
      }
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.schoolScroll = new BScroll(this.$refs.schoolWrapper, {
            click: true
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .school-wrapper {
    height: calc(100% - 100px);
    position: relative;
    flex: auto;
  }
  .school-list {
    background: #fbf9fe;
    padding: 12px 0;
    margin: 10px 0 20px 0;
    position: relative;
  }
  .school-item {
    background: #fff;
    margin: 0 20px 16px;
    padding: 16px 10px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    min-height: 50px;
  }
  .school-item__logo {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 20px;
    margin-top: -20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .school-item__info {
    padding-left: 80px;
    position: relative;
  }
  .school-item__devide {
    position: absolute;
    left: 75px;
    content: '';
    width: 1px;
    height: calc(100% - 40px);
    background: #4859ad12;
    display: block;
  }
  .school-item__name {
    font-size: 18px;
    color: #1e509e;
  }
  .school-item__grade,
  .school-item__ranking,
  .school-item__prescore {
    display: inline-block;
    background: #5f95dc;
    color: #fff;
    margin: 8px 4px 8px 0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 13px;
  }
</style>
