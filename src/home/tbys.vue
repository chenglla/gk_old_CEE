<template>
<!--  <div style="height: calc(100% - 50px);overflow: hidden;position: relative;" ref="aboutus">-->
  <div style="width: 100%;height:100%;">
    <div class="about-box">
      <div class="about-return return-box">
        <div class="return__icon" @click="gotoBack">
          <i class="iconfont iconleft-arrow"></i>
          AI填报优势
        </div>
      </div>
    </div>
    <div class="about-info-box" ref="aboutus">
      <div style="padding: 10px 0;position: relative;">
        <p><strong>1．海量数据基础：</strong>涵盖2800多所院校信息并同步更新，包含近6年院校、专业的录取数据以及院校的招生计划。拥有完整的符合中国的职业目录及大学专业目录。
          拥有百万级海量真实数据基础，能够高效精准定位分析学情数据，提高决策效率。
        </p>
        <p><strong>2.智能算法推荐：</strong>通过多维度目标筛选，运用HTF-RTH（HistoryTensorFlow-RealTimeHeat）核心风险评估算法，精准推荐适合的院校方案。
        </p>
        <p><strong> 3.行业领先技术：</strong>运用业内领先的大数据及人工智能技术，结合百余名报考专家经验，构建完整生涯画像及算法模型。 实现多维度营收入账，盈利倍增。</p>
        <p>结合中国社会实际情况进行量表本土化升级。</p>
        <p>结合教改区真实大数据，四级八维度测评精准推荐。</p>
        <p><strong>4.个性化操作界面：</strong>产品操作界面个性化，是常态化应用的智能规划及报考助手。</p>
        <p><strong>5：优质团队力量：</strong>与国内一线大学研究机构合作，拥有近两百人专业研发团队，联合海内外博士专家团队，提供优质服务支撑 。
          核心团队拥有10年生涯规划行业经验，为您提供完整服务支持，提供7*24小时及时响应运维及客服。
        </p>

        <h4>算法简介</h4>
        <h5>数据处理（数据填充）</h5>
        <p>简介：高考收集的数据主要是最低分跟平均分，主要使用最低分进行预测，但是在实际过程中，并不是所有的最低分都是存在的，在大约千万级的数据中如何对缺省值进行填充是要考虑的重难点。</p>
        <p>算法介绍：改进的k-means算法：利用平均分来填充缺失的最低分。
          详情：计算该学校的其他年份的平均值与最低分的平均差值。将平均分减去该平均差值来填补不存在的最低分。
        </p>
        <h5>数据融合（数据一致性）</h5>
        <p>简介：在实际的过程中，高考数据存在着多样性，比如每年的录取批次可能会发生相应的变化（本科批代替过去的本科一批，本科二批），高考可能会产生变化（新高考代替文理科），所以如何对数据进行处理融合，将过去的数据进行相应的改变是我们需要考虑的重难点。
        </p>
        <p>算法介绍：基于科目相似度的算法将新高考划分文理科，基于省控线融合录取批次。</p>
        <h5>预测算法</h5>
        <p>根据往年各高校各生源地的录取分数线、录取学生数、省份报考数和一分一段表，计算出来各高校各生源地的录取排名占比数，然后通过LSTM神经网络算法预测当前年度各高校各生源地的录取排名占比数；根据预测出的当前年度各高校各生源地的录取排名占比数，根据一分一段表跟报考人数，确定考生生源地当前年度各级别高校分数线；根据考生生源地，对其当前年度成绩值进行判断，并采用DNN神经网络算法计算得出相关的高校专业结果；根据匹配出的高校专业结果，得到初步报考方案；将初步报考方案与高校政策类信息结合分析，得到最终报考方案。
        </p>
    </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        majorScroll: null
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
    margin: 0 5px 16px;
    line-height: 26px;
    /*background-color: #0bb20c;*/
    /*box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);*/
    /*border-radius: 4px;*/
    padding: 10px;
    font-size: 14px;
    text-indent: 2em;
    height: calc(100% - 76px);
    overflow: hidden;
    /*word-break: break-all;*/
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
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    overflow: hidden;
    text-align: center;
    width: 96%;
    margin: 15px -2%;
    img {
      width: 100%;
    }
  }
</style>
