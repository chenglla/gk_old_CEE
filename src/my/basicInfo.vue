<template>
  <div class="my-basic-info">
    <div class="my-info-item">
      <label class="my-info-item__label">微信号</label>
      <div class="my-info-item__value">{{myInfo.userName}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user-info',
  data () {
    return {}
  },
  props: {
    myInfo: Object
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.my-basic-info {
  position: relative;
  padding: 20px 0 20px 20px;
}
.my-info-item {
  border-bottom: 1px solid #ddd;
  position: relative;
  line-height: 1.5;
  padding: 4px 0;
  color: #555;
}
.my-info-item__label {
  position: absolute;
  left: 0;
  top: 4px;
  width: 60px;
}
.my-info-item__value {
  padding-left: 80px;
  padding-right: 20px;
}
</style>
