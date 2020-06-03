<template>
  <div class="article-block">
    <div class="list-loading" v-if="loading">
      <div class="loader"></div>
    </div>
    <div class="art-header" v-if="!loading">
      <div class="title">{{title}}</div>
      <div class="author"><span></span> {{author}}</div>
      <div class="time"><span>{{time}}</span></div>
      <div class="tag">
        <span v-if="articleLabel1 !== undefined && articleLabel1 !== ''">{{articleLabel1}}</span>
        <span v-if="articleLabel2 !== undefined && articleLabel2 !== ''">{{articleLabel2}}</span>
      </div>
<!--      <div class="feed">-->
<!--          <span @click.stop="gotoOption(1)"><i class="iconfont iconup"></i>顶</span>-->
<!--          <span @click.stop="gotoOption(0)"><i class="iconfont iconcai1"></i>踩</span>-->
<!--      </div>-->
    </div>
    <div class="art-body" v-if="!loading">
      <img v-if="img !== undefined && img !== ''" :src="img">
      <div v-html="content"></div>
<!--      <div><pre style="overflow:auto;">{{content}}</pre></div>-->
<!--      <template v-for="item in content">-->
<!--        <h4 v-if="item.type === 'title'">{{item.text}}</h4>-->
<!--        <p v-else-if="item.type === 'text'">{{item.text}}</p>-->
<!--        <img v-else="item.type === 'img'" :src="item.text" />-->
<!--      </template>-->
      <div class="readNum">
        {{numList.readnum}}人阅读
      </div>
      <div class="rank">
        <div class="rank-label">评价新闻：</div>
        <div class="rank-content">
          <star :length="5" :value="score" :disabled="isUnReg" :isreadonly="hasScored" @updateScore="updateScore"></star>
        </div>
      </div>
      <div class="art-org" v-if="!loading">
        <a :href="orgUrl">原文出处</a>
      </div>
      <div class="commentList">
        <div v-for="(item, index) in commentList" :key="index" class="commentItem">
<!--          <p class="itemUser">{{item.openid}}</p>-->
<!--          <p class="itemImg">-->
          <div class="itemInfo" v-if="item.userImg !== null">
            <img :src="item.userImg" alt="" class="itemImg">
            <span>{{item.userNickname}}</span>
          </div>
          <div  class="itemInfo" v-if="item.userImg === null">
            <span>{{item.openid}}</span>
          </div>
<!--          </p>-->
<!--          <p class="itemUser">{{item.userNickname}}</p>-->
          <p class="itemContent">{{item.commentContent}}</p>
        </div>
      </div>
    </div>
    <div class="comment" v-if="!loading">
<!--      <x-textarea type="text" class="writeComment" placeholder="写评论..." v-model="commentCon" @click="gotoComment" ref="wComment" @keyup="gotoCommit"></x-textarea>-->
      <input type="text" class="writeComment" placeholder="写评论..." v-model="commentCon" @click="gotoComment" ref="wComment" @keyup.enter="gotoCommit">
      <x-button mini class="wButton" @click.native="gotoCommit" v-show="!showFeed">发送</x-button>
      <div class="feed" v-show="showFeed">
        <span @click.stop="ding && gotoOption(1)"><i class="iconfont iconup"></i>{{numList.likenum}}</span>
        <span @click.stop="cai && gotoOption(0)" disabled="true"><i class="iconfont iconcai1"></i>{{numList.dontlikenum}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import request from '../utils/request'
import { msg, errorMsg } from '@/utils/common'
import star from '../components/star'
import {articleFeed, getFeedNum, sendCommenit, getComment, getIfZan} from '@/api/index'
// import XTextarea from 'vux/src/components/x-textarea/index'

export default {
  components: { star },
  data () {
    return {
      loading: false,
      title: '',
      author: '',
      img: '',
      time: '',
      content: '',
      orgUrl: '',
      score: 0,
      hasScored: false,
      articleLabel1: '',
      articleLabel2: '',
      artId: 0,
      numList: [],
      commentCon: '',
      showFeed: true,
      commentList: [], // 所有的评论
      ding: true,
      cai: true
    }
  },
  computed: {
    isUnReg () {
      return this.$store.state.user.openid === undefined || this.$store.state.user.openid === ''
    },
    openid () {
      return this.$store.state.user.openid
    },
  },
  mounted () {
    this.$store.commit('SET_RETURN_TEXT', '看资讯')
    this.$store.commit('SET_RETURN_URL', '')
    this.getDetail()
  },
  activated () {
    this.$store.commit('SET_RETURN_TEXT', '看资讯')
    this.$store.commit('SET_RETURN_URL', '')
    this.getDetail()
  },
  deactivated () {
    this.loading = true
  },
  methods: {
    getDetail () {
      this.loading = true
      request({
        url: 'article/getArticleContent',
        // url: 'http://zhiheyikaoqin.cn/cee/article/getArticleContent',
        method: 'post',
        data: {
          artId: this.$route.params.id,
          openid: this.$store.state.user.openid
        }
      }).then(res => {
        this.loading = false
        console.log('详情：', res.data)
        this.artId = res.data.data.artId
        this.title = res.data.data.title
        this.author = res.data.data.articleSource
        this.img = res.data.data.articleImg
        this.time = res.data.data.articleDate
        this.orgUrl = res.data.data.articleUrl
        this.articleLabel1 = res.data.data.articleLabel1 || '高考'
        this.articleLabel2 = res.data.data.articleLabel2
        // if (res.data.data.articleContent.indexOf('<p>') !== -1) {
        //   this.content = res.data.data.articleContent.replace(/<p>/g, '').split('</p>').map(item => {
        //     return {
        //       type: 'text',
        //       text: item
        //     }
        //   })
        // } else {
        this.content = res.data.data.articleContent
        // }
        this.initScore()
        this.getIfZan()
        this.getComment()
        this.getFeedNum()
      })
    },
    getFeedNum () { // 获取阅读数以及顶和踩的数量
      getFeedNum({
        artId: this.$route.params.id
      }).then(res => {
        this.numList = res.data.data
        console.log('数量：', res.data)
      })
    },
    getIfZan () {
      getIfZan({
        artId: this.$route.params.id,
        openid: this.openid
      }).then(res => {
        if (res.data.code === 0) {
          var ding = document.querySelector('.iconup')
          var cai = document.querySelector('.iconcai1')
          if (res.data.data === -1) {
            this.ding = true
            this.cai = true
          } else {
            if (res.data.data === 1) {
              ding.style.color = 'red'
              this.cai = false
              this.ding = false
            } else if (res.data.data === 0) {
              cai.style.color = 'green'
              this.ding = false
              this.cai = false
            }
          }
        }
        console.log('是否点赞：', res.data)
      })
    },
    getComment () { // 获取评论
      getComment({artId: this.artId}).then(res => {
        if (res.data.code === 0) {
          this.commentList = res.data.data
        }
        console.log('获取的所有评论', res.data)
      })
    },
    gotoComment () { // 写评论
      this.$refs.wComment.focus()
      var comm = document.querySelector('.writeComment')
      comm.removeAttribute('placeholder')
      // var feed = document.querySelector('.feed')
      // var wButton = document.querySelector('.wButton')
      // wButton.className = 'wButton'
      this.showFeed = false
      // feed.className = 'feed showCom'
    },
    gotoCommit () { // 评论提交
      console.log(44444444444444)
      sendCommenit({
        openid: this.openid,
        artId: this.artId,
        content: this.commentCon
      }).then(res => {
        if (res.data.code === 0) {
          // 显示
          this.$vux.toast.show({
            text: '评论成功'
          })
          this.commentCon = ''
          this.showFeed = true
          var comm = document.querySelector('.writeComment')
          comm.setAttribute('placeholder', '写评论...')
          this.getComment()
        }
        console.log(res.data)
      })
    },
    gotoOption (val) {
      console.log(typeof val, val)
      articleFeed({
        openid: this.openid,
        artId: this.artId,
        type: val
      }).then(res => {
        if (res.data.code === 0) {
          var ding = document.querySelector('.iconup')
          var cai = document.querySelector('.iconcai1')
          if (val === 0) { // 不喜欢
            cai.style.color = 'green'
            this.ding = false
            this.cai = false
          } else { // 喜欢
            ding.style.color = 'red'
            this.ding = false
            this.cai = false
          }
          this.getFeedNum()
        }
        console.log('pinglun', res.data)
      })
    },
    initScore () {
      console.log('是否大兴：')
      request({
        url: 'article/getArticleScore?openid=' + this.$store.state.user.openid + '&artId=' + this.$route.params.id,
        // url: 'http://zhiheyikaoqin.cn/cee/article/getArticleScore?openid=' + this.$store.state.user.openid + '&artId=' + this.$route.params.id,
        method: 'get'
      }).then(res => {
        if (res.data.data !== undefined && res.data.data !== null && res.data.data.scoreId !== undefined) {
          this.hasScored = true
          this.score = res.data.data.score
        } else {
          this.hasScored = false
        }
        console.log('yijing dafen', this.hasScored)
      })
    },
    updateScore (score) {
      console.log('不能打星了？')
      if (this.isUnReg) {
        errorMsg(this, '没注册不允许评论')
        return
      }
      if (this.hasScored) {
        errorMsg(this, '已评价过')
        return
      }
      this.score = score
      request({
        url: 'article/putScore?openid=' + this.$store.state.user.openid + '&artId=' + this.$route.params.id + '&score=' + score,
        // url: 'http://zhiheyikaoqin.cn/cee/article/putScore?openid=' + this.$store.state.user.openid + '&artId=' + this.$route.params.id + '&score=' + score,
        method: 'get'
      }).then(res => {
        if (res.data.code === 0) {
          this.hasScored = true
        }
        msg(this, res.data.msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped="">
  .article-block {
    background: #fff;
    /*padding: 20px;*/
  }
  .art-header {
    padding: 20px 20px 0;
    margin-bottom: 20px;
    .title {
      font-size: 17px;
      line-height: 1.4;
      margin-bottom: 4px;
      color: #333;
    }
    .author,
    .time {
      display: inline-block;
      margin-right: 10px;
      color: #576b95;
      span {
        color: rgba(0,0,0,0.3);
      }
    }
    .tag {
      display: inline-block;
      color: #aaa;
      span {
        display: inline-block;
        background: #ababab;
        color: #fff;
        padding: 0 6px;
        border-radius: 6px;
      }
    }
    /*.feed {*/
    /*  !*float: right;*!*/
    /*  display: flex;*/
    /*  justify-content: flex-end;*/
    /*  margin-top: 15px;*/
    /*  color: #aaa;*/
    /*  .iconfont {*/
    /*    font-size: 13px;*/
    /*    margin-right: 5px;*/
    /*  }*/
    /*  span {*/
    /*    font-size: 13px;*/
    /*    margin-right: 10px;*/
    /*  }*/
    /*}*/
  }
  .art-body {
    padding: 0 20px;
    color: #333;
    text-align: justify;
    h4 {
      font-size: 16px;
      color: #576b95;
    }
    p {
      line-height: 2;
      font-size: 16px;
    }
    img {
      width: 100%;
    }
  }
  .art-org {
    margin: 10px 0;
    a {
      color: #576b95;
    }
  }
  .commentList {
    margin: 10px 0 50px;
    .commentItem {
      padding: 10px 10px 3px;
      border-bottom: 1px solid #ececec;
      .itemUser {
        color: #576b95;
        font-size: 12px;
        display: inline-block;
        /*vertical-align: middle;*/
      }
      .itemInfo {
        span {
          vertical-align: middle;
          font-size: 12px;
          color: #576b95;
        }
      }
      .itemImg {
        height: 35px;
        width: 35px;
        margin-right: 8px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: middle;
        /*display: inline-block;*/
        img {
          /*vertical-align: middle;*/
          /*border-radius: 50%;*/
          height: 100%;
          width: 100%;
        }
      }
      .itemContent {
        font-size: 13px;
        margin-top: 8px;
      }
    }
  }
  .rank {
    margin-top: 30px;
    .rank-label {
      color: #576b95;
      line-height: 34px;
      vertical-align: bottom;
    }
    .rank-label, .rank-content {
      display: inline-block;

    }
  }
  .news-title {
    color: #fff;
    text-align: center;
    font-size: 16px;
    padding: 16px 10px 16px 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  pre{
    white-space: pre-wrap;           /* css-3 */
    white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
    white-space: -o-pre-wrap;        /* Opera 7 */
    word-wrap: break-word;           /* Internet Explorer 5.5+ */
    font-size: 14px;
    line-height: 1.6
  }
  .readNum {
    color: #9c9c9c;
    margin-top: 15px;
    font-size: 12px;
  }
  .comment {
    padding-left: 20px;
    position: fixed;
    display: flex;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 -1px 3px rgba(0, 0,0, .2);
    input {
      flex: 7;
      border: 0;
      margin: 10px 0;
      color: #9c9c9c;
      font-size: 13px;
      /*width: 70%;*/
    }
    .feed {
      flex: 4;
      display: flex;
      justify-content: center;
      align-content: center;
      margin-right: 20px;
      line-height: 35px;
      color: #aaa;
      .iconfont {
        font-size: 13px;
        margin-right: 5px;
      }
      span {
        font-size: 13px;
        margin-right: 10px;
      }
    }
    .wButton {
      flex: 1;
      /*display: none;*/
      outline: 0;
      color: #9c9c9c;
      margin-right: 40px;
      /*height: 25px;*/
      /*margin-top: 5px;*/
      border: 0;
      /*border: 1px solid #fff;*/
      background-color: #fff;
    }
  }
  .weui-btn:after {
    border: 0;
  }
  .showCom {
    display: none;
  }
</style>
<style lang="scss">
  .rank-content {
    .iconfont {
      font-size: 24px;
    }
  }
</style>
