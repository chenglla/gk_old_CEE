import request from '@/utils/request'

export function getOneScoreProvince () { // 一分一段表获取城市
  return request({
    url: 'extends/sectioncity',
    method: 'get'
    // params: req
  })
}
export function getOneScoreYear (req) { // 一分一段表根据城市获取年份
  return request({
    url: 'extends/sectionyear',
    method: 'get',
    params: req
  })
}
export function getOneScoreCategory (req) { // 一分一段表根据城市年份获取文理科
  return request({
    url: 'extends/sectionsubject',
    method: 'get',
    params: req
  })
}
export function getOneScoreOneTable (req) { // 一分一段表根据城市年份文理科获取一分一段表
  return request({
    url: 'extends/sectioninfo',
    method: 'get',
    params: req
  })
}
export function getzyProvince (req) { // 一分一段表根据城市年份文理科获取一分一段表
  return request({
    url: 'extends/batchcity',
    method: 'get',
    params: req
  })
}
export function getzyYear (req) { // 一分一段表根据城市年份文理科获取一分一段表
  return request({
    url: 'extends/batchclass',
    method: 'get',
    params: req
  })
}
export function getzyCategory (req) { // 一分一段表根据城市年份文理科获取一分一段表
  return request({
    url: 'extends/batchinfo',
    method: 'get',
    params: req
  })
}
export function getzyOneTable (req) { // 一分一段表根据城市年份文理科获取一分一段表
  return request({
    url: 'extends/batchvalue',
    method: 'get',
    params: req
  })
}
export function getEnrollPlanBySchool (req) { // 招生计划根据学校查询
  return request({
    url: 'extends/enrolplanByschoolname',
    method: 'get',
    params: req
  })
}
export function getEnrollPlanByMajor (req) { // 招生计划根据专业查询
  return request({
    url: 'extends/enrolplanBymajorname',
    method: 'get',
    params: req
  })
}
export function getEnrollPlanByProvince (req) { // 招生计划根据省份查询--进入页面默认展示
  return request({
    url: 'extends/enrollplanlist',
    method: 'get',
    params: req
  })
}
export function getEnrollPlanByCondition (req) { // 招生计划根据多条件查询--选择条件以后
  return request({
    url: 'extends/enrollplanmultlist',
    method: 'get',
    params: req
  })
}

