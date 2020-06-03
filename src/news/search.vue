<template>
  <div class="school-box">
    <div class="school__search">
      <div class="school-return return-box">
        <div class="return__icon" @click="returnBack">
          <i class="iconfont iconleft-arrow"></i>
        </div>
        <search v-model="key" :placeholder="placeholder" @on-submit="searchKey" ref="search"></search>
      </div>
    </div>
  </div>
</template>
<script>
  import { Search } from 'vux'
  export default {
    components: { Search },
    data () {
      return {
        curTab: 'all',
        loading: false,
        key: '',
        placeholder: '搜索',
        list: []
      }
    },
    computed: {
      toUrl () {
        return this.$store.state.user.returnUrl
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.search.isFixed = true
        this.$refs.search.isFocus = true
        this.$refs.search.isCancel = false
        this.$refs.search.setFocus()
      })
    },
    methods: {
      returnBack () {
        if (this.toUrl !== '') {
          this.$router.push({ path: this.toUrl })
        } else {
          this.$router.go(-1)
        }
      },
      searchKey () {
        console.log('search', this.key)
      },
      getList () {
        this.list = []
      },
      changeTab (tab) {
        this.curTab = tab
      }
    }
  }
</script>
