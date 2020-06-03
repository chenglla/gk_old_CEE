<template>
  <div class="home-news-box">
    <!-- <div class="home-news-title">新闻资讯</div> -->
    <ul class="home-news-list">
      <li @click="jumpToDetail(421)">
        <div class="news-name">中学生填词《满江红》为高考加油</div>
        <div class="news-author">高考</div>
        <div class="news-img"><img src="http://edu.people.com.cn/n1/2019/0304/c1006-30955722.html"></div>
      </li>
      <li @click="jumpToDetail(422)">
        <div class="news-name">取消特长生招生彰显教育公平</div>
        <div class="news-author">政策</div>
        <div class="news-img"><img src="http://edu.people.com.cn/n1/2019/0304/c1006-30955870.html"></div>
      </li>
      <li @click="jumpToDetail(431)">
        <div class="news-name">艺考≠易考，拼才艺更拼文化</div>
        <div class="news-author">解读</div>
        <div class="news-img"><img src="http://edu.people.com.cn/n1/2019/0304/c1006-30955687.html"></div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    methods: {
      gotoNews () {
        this.$router.push({ name: 'news' })
      },
      jumpToDetail (id) {
        this.$router.push({ path: '/news/' + id })
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .home-news-box {    
    border-top: 14px solid #fbf9fe;
    padding: 0 20px 10px;
  }
  .home-news-list {
    ul, li {
      list-style: none;
    }
    li {
      border-bottom: 1px solid #efeff4;
      position: relative;
      height: 60px;
      padding: 10px 0;
    }
    li:last-child {
      border-bottom: 0;
      height: auto;
    }
    .news-name {
      padding: 10px 66px 4px 0;
    }
    .news-more {
      padding: 0;
      text-align: center;
      color: #ddd;
    }
    .news-author {
      color: #ddd;
      font-size: 12px;
    }
    .news-img {
      position: absolute;
      right: 0;
      width: 60px;
      height: 60px;
      top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>