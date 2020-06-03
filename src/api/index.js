import request from '@/utils/request'

export function getSchoolOpts (url, req) {
  return request({
    url: url,
    method: 'get',
    params: req
  })
}
export function comSearchApi (req) {
  req.size = 20
  return request({
    url: 'school/findByOptionsCause',
    method: 'get',
    params: req
  })
}
export function getPayStatus (id) {
  return request({
    url: 'extends/findInfoOneTOne',
    method: 'get',
    params: {
      openid: id
    }
  })
}
export function getBatch (schoolname, majorname, id, batch, score) {
  return request({
    url: 'school/findHistoryScoreMajor',
    method: 'get',
    params: {
      schoolname: schoolname,
      majorname: majorname,
      openid: id,
      batch: batch,
      leixing: score
    }
  })
}
export function getMajorBatch (schoolname, majorname, openid) {
  return request({
    url: 'school/findAllMajorBatch',
    method: 'get',
    params: {
      schoolname: schoolname,
      majorname: majorname,
      openid: openid
    }
  })
}
export function getAllSchool (req) {
  req.size = 20
  return request({
    url: 'school/findAllSchool',
    method: 'get',
    params: req
  })
}
export function getSchoolInfo (name, id) {
  return request({
    url: 'school/findSchoolLikeName',
    method: 'get',
    params: {
      schoolname: name,
      openid: id
    }
  })
}
export function findPay (id) {
  return request({
    url: 'pay/findPayOrder',
    method: 'get',
    params: {
      openid: id
    }
  })
}
export function findOrderInfo (req) {
  return request({
    url: 'pay/findOrderInfo',
    method: 'get',
    params: req
  })
}
export function getSchoolScore (schoolcode, majorcode, id) {
  return request({
    url: 'school/findSchoolMajorScoreInfo',
    method: 'get',
    params: {
      schoolcode: schoolcode,
      majorcode: majorcode,
      openid: id
    }
  })
}
export function searchSchool (req) {
  req.size = 20
  return request({
    url: 'school/findBySchoolName',
    method: 'get',
    params: req
  })
}
export function getAllMajor () {
  return request({
    url: 'major/findAllMajor',
    method: 'get'
  })
}
export function getSubMajor (major) {
  return request({
    url: 'major/findMajorByMajorType',
    method: 'get',
    params: {
      majortype: major
    }
  })
}
export function getMajorInfo (req) {
  return request({
    url: 'major/findMajorInfo',
    method: 'get',
    params: req
  })
}
export function searchMajor (query) {
  query.size = 20
  return request({
    url: 'major/findMajornamebyname',
    method: 'get',
    params: query
  })
}

export function findMajorSchool (query) {
  query.size = 10
  return request({
    url: 'school/findAllByMajorCode',
    method: 'get',
    params: query
  })
}

export function getTimeBbs (query, openid) {
  query.size = 20
  query.id = openid
  return request({
    url: 'user/lookTakeByTime',
    method: 'get',
    params: query
    // params: {
    //   page: query,
    //   // query: query,
    //   openid: openid
    // }
  })
}
export function getHotBbs (query, openid) {
  query.size = 20
  query.id = openid
  return request({
    url: 'user/lookTakeByHot',
    method: 'get',
    params: query
    // params: {
    //   query: query,
    //   openid: openid
    // }
  })
}
export function getMyBbs (query, openid) {
  query.size = 20
  query.id = openid
  return request({
    url: 'user/lookMyTake',
    method: 'get',
    params: query
  })
}
export function zan (openid, id) {
  return request({
    url: 'user/addOnclick',
    method: 'get',
    params: {
      openid: openid,
      takeid: id
    }
  })
}
export function getBbsDetail (id, openid) {
  return request({
    url: 'user/findTakebyTakeid',
    method: 'get',
    params: {
      takeid: id,
      openid: openid
    }
  })
}
export function feedbackBbs (req) {
  return request({
    url: 'user/addTakeInfo',
    method: 'post',
    data: req
  })
}
export function addBbs (req) {
  return request({
    url: 'user/createTake',
    method: 'post',
    data: req
  })
}
export function myInfo (id) {
  return request({
    url: 'user/findUserInfo',
    method: 'get',
    params: {
      openid: id
    }
  })
}
export function getAllBatch (province, batch) {
  return request({
    url: 'school/findAllUserBatch',
    method: 'get',
    params: {
      province: province,
      category: batch
    }
  })
}
export function getAllCategory (province) {
  return request({
    url: 'school/findAllUserCategory',
    method: 'get',
    params: {
      province: province
    }
  })
}
export function getAllProvince () {
  return request({
    url: 'school/findAllProvince',
    method: 'get'
  })
}
export function getProvinces () {
  return request({
    url: 'extends/findAllProvince',
    method: 'get'
  })
}

export function getAllCheck (province) {
  return request({
    url: 'extends/findProvinceInfo',
    method: 'get',
    params: {
      province: province
    }
  })
}
export function getAllZhiyuan (province) {
  return request({
    url: 'extends/findProvinceInfo2',
    method: 'get',
    params: {
      province: province
    }
  })
}
export function getAllUserProvince () {
  return request({
    url: 'school/findAllUserProvince',
    method: 'get'
  })
}
export function getGaokaoDate () {
  return request({
    url: 'user/findTimeToGaokao',
    method: 'get'
  })
}
export function getPaiming (req) { // 预测获取排名
  return request({
    url: 'school/getPaiming',
    method: 'get',
    params: req
  })
}
// 查看招生计划详情 ?openid=123456&year=2019&schoolname=北京大学
export function getEnrollPlan (req) { // 预测获取排名
  return request({
    url: 'school/findschoolInfo',
    method: 'get',
    params: req
  })
}
export function getYuce (req) {
  req.page = 0
  req.pageSize = 15
  return request({
    url: 'school/yuce2',
    method: 'get',
    params: req,
    // timeout: 30
    timeout: 300000
  })
}
export function save (req) {
  return request({
    url: 'school/saveUserInfo',
    method: 'post',
    params: req
  })
}
// export function save (id, prov, cate, batch) {
//   return request({
//     url: 'school/saveUserInfo',
//     method: 'post',
//     params: {
//       openid: id,
//       province: prov,
//       category: cate,
//       batch: batch
//     }
//   })
// }

export function getPay (openid, score) {
  return request({
    // url: 'pay/create',
    baseURL: 'http://www.zhongkeruitong.top:11030/cee/',
    url: 'pay/create',
    method: 'get',
    params: {
      openid: openid,
      score: score,
      returnUrl: 'yuce'
    }
  })
}
export function getWx () { // 微信分享接口
  return request({
    baseURL: 'http://zhongkeruitong.top/show/cee/wechat/getSign?url=http://zhongkeruitong.top/show/cee/index.html',
    // baseURL: 'http://zhiheyikaoqin.cn/cee/wechat/getSign?url=http://192.168.1.1:8080/',
    url: '',
    method: 'get'
  })
}
export function findAgentInfo (req) {
  req.pageSize = 20
  return request({
    url: 'extends/findAgentInfo',
    method: 'get',
    params: req
  })
}
export function allBbs (req) {
  req.size = 20
  return request({
    url: 'user/lookAllMyTake',
    method: 'get',
    params: req
  })
}
export function checkingBbs (req) {
  req.size = 20
  return request({
    url: 'user/lookMyTake',
    method: 'get',
    params: req
  })
}
export function passBbs (req) {
  req.size = 20
  return request({
    url: 'user/lookSuccessMyTake',
    method: 'get',
    params: req
  })
}
export function failBbs (req) {
  req.size = 20
  return request({
    url: 'user/lookWarnMyTake',
    method: 'get',
    params: req
  })
}
export function checkingComment (req) {
  req.size = 20
  return request({
    url: 'user/lookMyTakeInfo',
    method: 'get',
    params: req
  })
}
export function allComment (req) {
  req.size = 20
  return request({
    url: 'user/lookAllMyTakeInfo',
    method: 'get',
    params: req
  })
}
export function articleFeed (req) { // 看资讯-文章顶或者踩
  return request({
    url: 'article/commentLikeOrNot',
    method: 'post',
    params: req
  })
}
export function getFeedNum (req) { // 获取顶或踩的数量
  return request({
    url: 'article/getReadNumAndLikeNum',
    method: 'get',
    params: req
  })
}
export function sendCommenit (req) { // 看资讯-新增评论
  return request({
    url: 'article/addArticleComment',
    method: 'post',
    params: req
  })
}
export function getComment (req) { // 获取评论
  return request({
    url: 'article/getArticleCommentByArtId',
    method: 'get',
    params: req
  })
}
export function sendFeedback (req) {
  return request({
    url: 'user/feedback',
    method: 'get',
    params: req
  })
}
export function getSchoolScoreLine (req) {
  return request({
    url: 'school/findInfoSchool',
    method: 'get',
    params: req
  })
}
export function getMajorScoreLine (req) {
  return request({
    url: 'school/findSchoolMajorScoreInfo',
    method: 'get',
    params: req
  })
}
export function getIfZan (req) {
  return request({
    url: 'user/findPeekStampConsultIsTrue',
    method: 'get',
    params: req
  })
}
export function getArticleProvnceList (req) {
  return request({
    url: 'article/findAllArticlesProvince',
    method: 'get',
    params: req
  })
}
export function getArticleByProvnce (req) {
  return request({
    url: 'article/findArticlesByProvince',
    method: 'get',
    params: req
  })
}
export function getUserSubjects (req) { // 用户如果是新高考，获取选择的科目
  return request({
    url: 'school/findnewsubject',
    method: 'get',
    params: req
  })
}
export function getAllAgent (req) { // 获取所有的代理
  return request({
    url: 'extends/findAgentAll',
    method: 'get',
    params: req
  })
}
export function getGoalCity (req) { // 获取意向城市
  return request({
    url: 'user/checkgoal',
    method: 'get',
    params: req
  })
}
export function addGoal (req) { // 添加意向城市和专业
  return request({
    url: 'user/savegoal',
    method: 'get',
    params: req
  })
}
export function addVolunteer (req) { // 添加志愿单
  return request({
    url: 'user/myzhiyuan',
    method: 'get',
    params: req
  })
}
export function delVolunteer (req) { // 移出志愿单
  return request({
    url: 'user/delmyzhiyuan',
    method: 'get',
    params: req
  })
}
export function viewVolunteer (req) { // 查看志愿单
  return request({
    url: 'user/lookmyzhiyuan',
    method: 'get',
    params: req
  })
}
export function getLargeMajor () { // 获取专业大类
  return request({
    url: 'major/findAllMajor',
    method: 'get'
    // params: req
  })
}
export function getMiddleMajor (req) { // 获取专业中类
  return request({
    url: 'major/findAllMajorLevel2',
    method: 'get',
    params: req
  })
}
export function getSmallMajor (req) { // 获取专业小类
  return request({
    url: 'major/findMajorByMajorType',
    method: 'get',
    params: req
  })
}
export function getSmallMajorInfo (req) { // 专业详情
  return request({
    url: 'major/findMajorInfo',
    method: 'get',
    params: req
  })
}
// export function getSearchMajor (req) { // 搜索专业
//   req.size = 20
//   return request({
//     url: 'major/findMajornamebyname',
//     method: 'get',
//     params: req
//   })
// }
