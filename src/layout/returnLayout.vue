<template>
  <div class="app-main">
    <div class="major-info-return return-box">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconleft-arrow"></i>
      </div>
      <div class="return-title">看资讯</div>
    </div>
    <router-view class="return-body"></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    returnText () {
      return this.$store.state.user.returnText
    },
    toUrl () {
      return this.$store.state.user.returnUrl
    }
  },
  methods: {
    returnBack () {
      if (this.toUrl !== '') {
        this.$router.push({ path: this.toUrl })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  html, body,
  #app,
  .app-main {
    height: 100%;
    margin: 0;
  }
  .return-box {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    height: 56px;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    .iconfont {
      font-size: 20px;
      color: #fff;
    }
  }
  .return-title {
    color: #fff;
    text-align: left;
    font-size: 16px;
    padding: 16px 10px 16px 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .return-body {
    box-sizing: border-box;
    height: 90%;
    height: calc(100% - 56px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
