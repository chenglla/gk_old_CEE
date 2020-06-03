<template>
  <div class="navbar weui-tabbar">
    <div v-for="item in menu" v-tap="[changeMenu, item.link]" :key="item.value" :class="[{'active': item.value === curMenu}, 'weui-tabbar__item']">
      <i :class="['iconfont', item.icon, 'weui-tabbar__icon']"></i>
      <p class="weui-tabbar__label">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
// import bus from '@/eventBus.js'
export default {
  data () {
    return {
      menu: [{
        link: 'home',
        value: 'home',
        name: '首页',
        icon: 'iconHome'
      }, {
        // link: 'http://www.zhongkeruitong.top/evaluate/evaluate/index.html',
        link: 'oneTone',
        value: 'oneTone',
        name: '测评',
        // name: '学涯测评',
        // name: '一对一',
        icon: 'iconpingguicon_cepingguanli'
        // icon: 'iconiconfeature01'
      }, {
        link: 'my',
        value: 'my',
        name: '我的',
        icon: 'iconuser'
      }]
    }
  },
  computed: {
    // 当前tab
    curMenu () {
      return this.$route.name
    },
    infoObj () {
      return this.$store.state.user.infoObj
    }
  },
  methods: {
    changeMenu (link) {
      console.log('啥子链接：', link)
      if (link === 'oneTone') {
      // if (this.curMenu === 'oneTone') {
        // bus.$emit('clearNews')
        console.log('进来了么')
        window.location.href = 'https://zhongkeruitong.top/evaluate/evaluate/index.html'
        return false
        // this.$router.push({ path: '/oneTone' })
      } else {
        this.$router.push({ path: './' + link })
      }
      // if (link === 'my') {
      //   if (this.infoObj === null || this.$store.state.user.openid === '') {
      //     this.$router.push({ path: './selRegType' })
      //     return
      //   }
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/color.scss';

.weui-tabbar {
  /*background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;*/
  background-color: RGB(52,127,245);
  color: #fff;
  height: 50px;
  /*&:before {*/
  /*  display: none;*/
  /*}*/
}
.weui-tabbar__icon>i, i.weui-tabbar__icon {
  color: #fff;
  opacity: 0.6;
}
.active {
  .weui-tabbar__icon {
    color: #fff;
    opacity: 1;
  }
}
.weui-tabbar__item {
  padding-top: 0;
}
.weui-tabbar__label {
  line-height: 1.8;
  font-size: 12px;
  color: #fff;
}
  .iconceping2 {
    font-size: 15px;
  }
</style>
