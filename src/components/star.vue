<template>
  <div class="stars">
    <div class="star"
      v-for="(item, index) in list"
      :key="index"
      :class="{'star-active': item.active}"
      v-tap="[rate, index]">
      <i class="iconfont iconiconzhengli-"></i>
    </div>
  </div>
</template>
<script >
// import {errorMsg} from '@/utils/common'
export default {
  name: 'star',
  props: ['isreadonly', 'value', 'disabled'],
  data () {
    return {
      list: [
        { index: 0, active: false },
        { index: 1, active: false },
        { index: 2, active: false },
        { index: 3, active: false },
        { index: 4, active: false }
      ]
      // score: ''
    }
  },
  mounted () {
    this.list.map((item, i) => {
      if (this.value > i) {
        item.active = true
      } else {
        item.active = false
      }
    })
  },
  watch: {
    value () {
      this.list.map((item, i) => {
        if (this.value > i) {
          item.active = true
        } else {
          item.active = false
        }
      })
    }
  },
  methods: {
    rate (selIndex) {
      console.log(9090909, this.isreadonly, selIndex)
      if (this.isreadonly === 'undefined' || this.isreadonly) {
        return
      }
      this.list.map((item, i) => {
        if (selIndex >= i) {
          item.active = true
        } else {
          item.active = false
        }
      })
      this.$emit('updateScore', selIndex + 1)
    }
  }
}
</script>
<style lang="scss">
  .star {
    display: inline-block;
    .iconfont {
      color: #eee;
    }
    &.star-active .iconfont {
      color: #f4ea2a;
    }
  }
</style>
