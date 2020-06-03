<template>
<!--  <div style="height: calc(100% - 50px);overflow: hidden;position: relative;" ref="aboutus">-->
  <div style="width: 100%;height:100%;background-color:#fff;">
    <div class="about-box">
      <div class="about-return return-box">
        <div class="return__icon" @click="gotoBack">
          <i class="iconfont iconleft-arrow"></i>
          五步志愿填报法
        </div>
      </div>
    </div>
    <div class="about-info-box" ref="aboutus">
      <div style="padding-bottom: 20px">
<!--        <div v-transfer-dom>-->
<!--          <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>-->
<!--        </div>-->
<!--      <div style="padding: 10px 0;position: relative;">-->
        <div class="imgInfo three" style="padding-top: 20px">
          <img src="../assets/img/five_right.png" style="width: 100%;height: 100%;" class="previewer-demo-img" @load="gotoLoad()" @click="show(0)">
<!--          <img src="../assets/img/five.png" style="width: 100%;height: 100%;" class="previewer-demo-img" @load="gotoLoad()" @click="show(0)">-->
        </div>
        <div v-transfer-dom>
          <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
        </div>
        <div class="tb_one_item">
<!--          <i class="iconfont iconyinhao"></i>-->
          <div>
            <p>高考志愿填报对高考录取结果，起到了关键性的作用它不仅关系着考生四年的大学经历，更与考生未来人生的发展有着非常重要的关系，在1万多所院校，近千个专业中通过地区、院校、专业、分数等数据筛选出符合考生情况的志愿比较有难度。</p>
            <div class="one__p--top">
              <img src="../assets/gk1.png" @load="gotoLoad()">
            </div>
          </div>
        </div>
        <div class="tb_one_item">
          <div class="one__p--top_l">
            <img src="../assets/img/woshou.png" alt="">
          </div>
          <p>高考志愿填报预测系统经过高考志愿报考专家指导，通过以下几步完成家长考生满意志愿填报！ </p>
          <p>完成志愿填报预测主要通过考生个人情况完成选地区、选学校、选专业三大部分。</p>
        </div>
        <div class="tb_one_item">
          <h4><i class="iconfont iconshuxian4"></i>高校定位<i class="iconfont iconxiaoyou"></i></h4>
          <p>根据我们历史考试成绩，找到我们排名差不多能上的高校，并查找该高校录取信息，如果这所大学的最低录取排名低于或者等于考生的排名，那这所大学基本上就可以看作是能上的大学了。而历年各高校的最低录取排名情况大家可以从以下两个渠道获取：</p>
          <p>①	高校官网</p>
          <p>②“一个好填报”校专业库</p>
          <p style="text-indent: 1em"><strong>1.利用“保稳冲”报考策略，对大学进行分类</strong></p>
          <p>常见保稳冲的定义可以大致这么理解：</p>
          <p><strong>保底：</strong>过去几年该大学的最高录取排名都要低于考生的排名，那这个大学基本是能被录取的大学。</p>
          <p><strong>稳妥：</strong>过去几年该大学的平均录取排名要低于、等于考生的排名，没有什么意外考生就会被录取的大学。</p>
          <p><strong>冲刺：</strong>过去几年该大学的最低录取排名与考生的接近，或者认为今年有可能刚好被录取的大学。</p>
        </div>
        <div class="imgInfo three">
          <img src="../assets/gk2.jpg" style="width: 100%;height: 100%;" @load="gotoLoad()">
        </div>
        <div class="tb_one_item">
          <h4><i class="iconfont iconshuxian4"></i>精挑细选<i class="iconfont iconxiaoyou"></i></h4>
          <p><strong>1.高校水平</strong></p>
          <p>我们在进一步考虑大学的时候，可以考虑一下下面的这些内容：</p>
          <p>①	 有没有入选双一流计划</p>
          <p>②	是不是985、211等高水平大学</p>
          <p>③	大学的主管部门归属</p>
          <p>④	是否为其他教育项目的实施高校，如北京市“985”工程一类</p>
          <p><strong>2.教学实力</strong></p>
          <p>①	师资力量（教师队伍、学术声誉等）</p>
          <p>②	办学条件（硬件设施、地理位置、实验室设置等）</p>
          <p>③	办学历史（优势学科、国内/省内重点专业等）</p>
          <p><strong>3.招生章程</strong></p>
          <p>每一个院校的招生章程都有关于招生录取的重要内容，包括专业录取原则，各专业的办学地点会否有变动，学费标准的说明等等。</p>
        </div>
        <div class="imgInfo three">
          <img src="../assets/gk4.png" style="width: 100%;height: 100%;" @load="gotoLoad()">
        </div>
        <div class="tb_one_item">
          <h4><i class="iconfont iconshuxian4"></i>寻专业<i class="iconfont iconxiaoyou"></i></h4>
          <p>到了这一步，要结合上面筛选出来的信息进一步去深入了解。要了解的专业情况是下面这些内容：</p>
          <p>①	所属分类</p>
          <p>②	培养目标</p>
          <p>③	主要课程</p>
          <p>④	学制年限</p>
          <p>⑤	学位类型</p>
        </div>
        <div class="tb_one_item">
          <h4><i class="iconfont iconshuxian4"></i>生成志愿表<i class="iconfont iconxiaoyou"></i></h4>
          <p>在经历上面的3个筛选步骤以后，同学们可以直接筛选出合适的大学和专业。面是下制作志愿表的注意事项。</p>
          <p><strong>1.定批次</strong></p>
          <p>一般的志愿表是由院校志愿、专业志愿以及专业服从调剂选项三模块构成：志愿表 = 院校志愿 + 专业志愿 + 专业服从调剂选项。各位考生在报志愿之前第一件要做的事，其实就是对比分数，确认自己在哪一个批次，但是也有地区不分一批二批。</p>
          <p><strong>2.了解志愿高校录取规则</strong></p>
          <p>(1)投档：两种最主要的大学录取规则是梯度志愿、平行志愿。</p>
          <p>(2)专业录取：有三种主流的录取模式：专业优先、分数优先以及专业分数级差。</p>
          <p><strong>3.怎样根据不同的录取规则调整院校、专业志愿的顺序</strong></p>
          <p>（1）平行志愿的填报技巧</p>
          <p> 各位考生填报要记得遵循冲稳保的原则。要注意的地方有下面几个：</p>
          <p> ①	尽量把省内的高校放在每一层次的最后一个院校志愿上面；</p>
          <p> ②	要学会依照排名来预测，而不是分数；</p>
          <p> ③	懂得根据自己的需要调整志愿表策略；</p>
          <p> ④	没有找到足够的大学去选择，要学会适当放宽筛选条件。</p>
          <p> （2）梯度志愿的填报技巧</p>
          <p> 因为梯度志愿的特殊性，在报考的时候考生一定要尽力保障第一志愿就顺利被录上。不然的话第二志愿只能等到所有第一志愿录不完的高校录取。所以没有把握，不要随便冲刺！</p>
          <p>（3）各类专业录取的注意事项</p>
          <p> <strong>分数优先：</strong>分数高就占优势，要衡量自己的排名在今年报考的考生中处于什么水平，可以把专业当做平行志愿下的“院校”，按照平行志愿的思路和逻辑进行填报；</p>
          <p> <strong>专业优先：</strong>第一专业非常重要！报考专业优先录取原则的院校专业，要关注去年每个专业的录取平均分及对应的位次，选择与自己的排名接近的专业，不建议冒进，报考思路基本与梯度志愿下的“院校”是一致的！</p>
          <p> <strong>专业分数优先：</strong>要兼顾考生分数还有专业顺序，高分考生报考不能太随意，专业设置之间要注意确定好梯度；低分的考生能选择的专业会相对较少，这个就要配合大学来适当评估了。</p>

        </div>
        <div class="tb_one_item">
          <h4><i class="iconfont iconshuxian4"></i>五、快乐填志愿<i class="iconfont iconxiaoyou"></i></h4>
          <p>除了“一个好填报”的智能院校库预测以外，性格职业测评模块可以帮大家基于既定的目标，根据学生性格兴趣推荐不同的生涯路径！

            俗话说“一考一报定终生”，在减少报考风险上面，更多的付出都是值得！在没有熟悉接触过志愿填报的考生和家长，光靠人工筛选出最适合自己的目标院校难度极大，配合人工智能，人工+智能，我们一起帮孩子选择一个更美好的未来！
          </p>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import { Previewer, TransferDom } from 'vux'
  export default {
    components: {
      Previewer
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        majorScroll: null,
        list: [{
          // msrc: require('../assets/img/five.png'),
          src: require('../assets/img/five_right.png'),
          // src: require('../assets/img/five.png'),
          w: 668,
          h: 445
        }],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    // name: 'aboutus',
    mounted () {
      this.$nextTick(() => {
        this.majorScroll = new BScroll(this.$refs.aboutus, {
          click: true
        })
      })
    },
    methods: {
      gotoBack () {
        this.$router.go(-1)
      },
      gotoLoad () {
        this.majorScroll && this.majorScroll.refresh()
      },
      logIndexChange (arg) {
        console.log(arg)
      },
      show (val) {
        this.$refs.previewer.show(val)
      }
    }
}
</script>
<style lang="scss" scoped>
  .about-box {
    background: #647cfb;
    /*background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;*/
    flex: none;
    /*z-index: 1;*/
    height: 56px;
  }
  .about-info-box {
    position: relative;
    margin: 5px 5px 16px;
    line-height: 26px;
    padding: 10px;
    font-size: 14px;
    height: calc(100% - 76px);
    overflow: hidden;
  }
  .about-email {
    margin-top: 40px;
    text-indent: 0;
    .email {
      text-indent: 2em;
      display: block;
    }
    p {
      padding-left: 40px;
    }
  }
  .imgInfo {
    width: 86%;
    margin-left: 7%;
    img {
      width: 100%;
    }
  }
  .tb_one_item {
    text-indent: 2em;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    padding: 10px 5px 5px;
    margin: 10px 0;
    position: relative;
    overflow: hidden;
    h4 {
      text-indent: 0;
      font-size: 18px;
      margin-bottom: 5px;
    }
    .iconfont:first-child {
      color: #FF9933;
      margin-right: 5px;
      font-weight: bolder;
    }
    .iconfont:nth-child(2) {
      position: absolute;
      font-size: 70px;
      color: #647cfb;
      right: -10px;
      top: -5px;
      opacity: 0.1;
      /*margin-left: 5px;*/
      /*font-weight: bolder;*/
    }
    .iconyinhao {
      position: absolute;
      left: -15px;
      color: #ccc;
    }
  }
  .one__p--top {
    position: absolute;
    /*line-height: 30px;*/
    top: 30%;
    right: 0;
    height: 110px;
    width: 110px;
    opacity: 0.2;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .one__p--top_l {
    position: absolute;
    /*line-height: 30px;*/
    bottom: -20px;
    left: -20%;
    height: 100px;
    width: 100px;
    opacity: 0.2;
    /*overflow: hidden;*/
    img {
      width: 100%;
      height: 100%;
    }
  }
 /* .one__p--top {
    line-height: 30px;
    position: relative;
    &:before {
      content: "\e66b";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      opacity: 0.2;
      padding-right: 10px;
      position: absolute;
      left: 24px;
      top: -10px;
    }
  }*/
</style>
<style lang="scss">
  .v-transfer-dom .pswp__item .pswp__zoom-wrap .pswp__img {
    background-color: #fff;
  }
</style>
