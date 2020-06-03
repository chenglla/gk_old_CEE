<template>
  <div class="slider-box">
    <slider animation="fade" :control-btn="false">
      <slider-item v-for="(url, index) in imgs" :key="index">
        <img :src="url">
      </slider-item>
    </slider>
</div>
</template>
<script>
  import { Slider, SliderItem } from 'vue-easy-slider'
  import pic1 from '@/assets/img/1.jpg'
  import pic2 from '@/assets/img/2.jpg'
  import pic3 from '@/assets/img/3.jpg'
  import pic4 from '@/assets/img/4.jpg'
  // import pic1 from '@/assets/img/hb_1.jpg'
  // import pic2 from '@/assets/img/hb2.jpg'
  // import pic3 from '@/assets/img/hb3.jpg'
  export default {
    components: { Slider, SliderItem },
    data () {
      return {
        // imgs: [
        //   pic2, pic3, pic1
        // ]
        imgs: [
          pic2, pic3, pic1, pic4
        ]
      }
    }
  }
</script>
<style lang="scss">
  .silder-box {
    margin: 0;
    overflow: hidden;
    height: 150px;
  }
  .slider {
    height: 150px !important;
  }
  .slider-item img {
    width: 100%;
    height: 100%;
  }
  .slider-box {
    .slider-indicators {
      bottom: 6px !important;
      left: 50%;
      position: absolute;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
    .slider-indicator-icon {
      margin: 0 4px !important;

      button {
        background-color: #eee;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: block;
        height: 10px;
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
        transition-duration: .3s;
        width: 10px;
      }
      &.--current,
      &:hover {
        button {
          background-color: #888;
        }
      }
    }
  }

  .slide {
    align-items: center;
    color: #fff;
    display: flex;
    height: 300px;
    justify-content: center;

    h3 {
      color: red;
      font-size: 32px;
      font-weight: 300;
    }
  }

</style>
