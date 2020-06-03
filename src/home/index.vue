<template>
  <div class="home-page" ref="homeWrapper">
    <div class="content">
      <!-- <search v-model="key" :placeholder="'搜索你关注的学校'" @on-focus="gotoSearch"></search> -->
      <slider></slider>
      <counts></counts>
      <menus></menus>

      <home-link></home-link>
      <home-ad></home-ad>
    </div>
  </div>
</template>
<script>
  import { Search } from 'vux'
  import slider from './slider'
  import menus from './menus'
  import counts from './counts'
  import homeLink from './homeLink'
  import homeAd from './homeAd'
  import BScroll from 'better-scroll'

  export default {
    components: { Search, slider, menus, counts, homeLink, homeAd },
    data () {
      return {
        homeScroll: null,
        key: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.homeScroll = new BScroll(this.$refs.homeWrapper, {
          click: true
        })
      })
    },
    methods: {
      gotoSearch () {
        this.$router.push({ path: '/search' })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home-page {
    height: calc(100% - 50px);
    overflow: hidden;
    flex: 1;
    background: #fff;
  }
  .content {
    padding: 0;
    background: url("../assets/img/home-bac.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
