import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/layout/Layout'
import returnLayout from '@/layout/returnLayout'
Vue.use(Router)

// const register = () => import('@/register/index')
// const news = () => import('@/news/index')
// /record
const newsDetail = () => import('@/news/article')
const home = () => import('@/home/index')
const school = () => import('@/school/index')
const search = () => import('@/school/search')
const schoolInfo = () => import('@/school/schoolInfo')
const schoolScore = () => import('@/school/schoolScore')
const major = () => import('@/major/index')
const majorSearch = () => import('@/major/search')
const majorInfo = () => import('@/major/majorInfo')
const news = () => import('@/news/index')
const nav = () => import('@/layout/navbar')
const my = () => import('@/my/index')
const newTest = () => import('@/my/new')
const feedback = () => import('@/my/feedback')
const volunteer = () => import('@/my/volunteer')
const oneTone = () => import('@/home/oneTone')
const bbs = () => import('@/bbs/index')
const bbsDetail = () => import('@/bbs/bbsDetail')
const bbsAdd = () => import('@/bbs/bbsAdd')
const predict = () => import('@/predict/index')
// const predict = () => import('@/predict/index0418')
const majorPlan = () => import('@/predict/majorPlan') // 专业招生计划
const record = () => import('@/predict/record')
const predictDetail = () => import('@/predict/predictDetail')
  // /predictDetail
const complete = () => import('@/register/complete')
const about = () => import('@/register/about')
const goal = () => import('@/register/goal')
const aboutus = () => import('@/register/aboutus')
const tb = () => import('@/home/tb')
const tbys = () => import('@/home/tbys') // 填报优势
const check = () => import('@/home/check')
const oneScore = () => import('@/home/oneScore') // 一分一段表
const charOccupatTest = () => import('@/home/charOccupatTest') // 性格职业测试
const zhiyuan = () => import('@/home/zhiyuan')
const zytbpc = () => import('@/home/zytbpc') // 志愿填报批次信息
const enrollPlan = () => import('@/home/enrollPlan') // 招生计划
const agent = () => import('@/agent/index')
const test = () => import('@/bbs/test')
const myqz = () => import('@/bbs/myqz')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      components: {
        default: home, nav: nav
      },
      name: 'home',
      meta: { tab: 'home', title: 'home' }
    },
    {
      path: '/school/:type',
      components: {
        default: school
      },
      name: 'school',
      meta: { tab: 'school', title: 'school', keepAlive: true }
    },
    {
      path: '/schoolInfo/:id/:schoolcode',
      components: {
        default: schoolInfo
      },
      name: 'schoolInfo',
      meta: { tab: 'schoolInfo', title: 'schoolInfo', keepAlive: true }
    },
    {
      path: '/schoolScore/:schoolcode/:majorcode',
      components: {
        default: schoolScore
      },
      name: 'schoolScore',
      meta: { tab: 'schoolScore', title: 'schoolScore' }
    },
    {
      path: '/search',
      components: {
        default: search
      },
      name: 'search',
      meta: { tab: 'search', title: 'search', keepAlive: true }
    },
    {
      path: '/check',
      components: {
        default: check
      },
      name: 'check',
      meta: { tab: 'check', title: 'check' }
    },
    {
      path: '/zhiyuan',
      components: {
        default: zhiyuan
      },
      name: 'zhiyuan',
      meta: { tab: 'zhiyuan', title: 'zhiyuan' }
    },
    {
      path: '/oneScore',
      components: {
        default: oneScore
      },
      name: 'oneScore',
      meta: { tab: 'oneScore', title: 'oneScore' }
    },
    {
      path: '/charOccupatTest',
      components: {
        default: charOccupatTest
      },
      name: 'charOccupatTest',
      meta: { tab: 'charOccupatTest', title: 'charOccupatTest' }
    },
    {
      path: '/zytbpc',
      components: {
        default: zytbpc
      },
      name: 'zytbpc',
      meta: { tab: 'zytbpc', title: 'zytbpc' }
    },
    { // 常用入口--招生计划
      path: '/enrollPlan',
      components: {
        default: enrollPlan
      },
      name: 'enrollPlan',
      meta: { tab: 'enrollPlan', title: 'enrollPlan' }
    },
    {
      path: '/news',
      components: {
        default: news
        // default: news, nav: nav
      },
      name: 'news',
      meta: { tab: 'news', title: 'news', keepAlive: true }
    },
    {
      path: '/newsDetail',
      component: returnLayout,
      name: 'newsDetail0',
      meta: { tab: 'newsDetail0', title: 'newsDetail0' },
      children: [
        {path: '/news/:id', name: 'newsDetail', component: newsDetail, meta: { title: 'newsDetail' }}
      ]
    },
    {
      path: '/major',
      components: {
        default: major
      },
      name: 'major',
      meta: { tab: 'major', title: 'major', keepAlive: true }
    },
    {
      path: '/majorSearch',
      components: {
        default: majorSearch
      },
      name: 'majorSearch',
      meta: { tab: 'majorSearch', title: 'majorSearch', keepAlive: true }
    },
    {
      path: '/majorInfo/:id',
      components: {
        default: majorInfo
      },
      name: 'majorInfo',
      meta: { tab: 'majorInfo', title: 'majorInfo' }
    },
    {
      path: '/my',
      components: {
        default: my
      },
      name: 'my',
      meta: { tab: 'my', title: 'my' }
    },
    {
      path: '/new',
      components: {
        default: newTest
      },
      name: 'newTest',
      meta: { tab: 'newTest', title: 'newTest' }
    },
    {
      path: '/feedback',
      components: {
        default: feedback
      },
      name: 'feedback',
      meta: { tab: 'feedback', title: 'feedback' }
    },
    {
      path: '/volunteer',
      components: {
        default: volunteer
      },
      name: 'volunteer',
      meta: { tab: 'volunteer', title: 'volunteer' }
    },
    {
      path: '/oneTone',
      components: {
        default: oneTone, nav: nav
      },
      name: 'oneTone',
      meta: { tab: 'oneTone', title: 'oneTone' }
    },
    {
      path: '/bbs/:type',
      components: {
        default: bbs
      },
      name: 'bbs',
      meta: { tab: 'bbs', title: 'bbs', keepAlive: true }
    },
    {
      path: '/bbsDetail/:id',
      components: {
        default: bbsDetail
      },
      name: 'bbsDetail',
      meta: { tab: 'bbsDetail', title: 'bbsDetail' }
    },
    {
      path: '/bbsAdd',
      components: {
        default: bbsAdd
      },
      name: 'bbsAdd',
      meta: { tab: 'bbsAdd', title: 'bbsAdd' }
    },
    {
      path: '/predict',
      components: {
        default: predict
      },
      name: 'predict',
      meta: { tab: 'predict', title: 'predict', keepAlive: true }
    },
    {
      path: '/majorPlan', // 专业招生计划
      components: {
        default: majorPlan
      },
      name: 'majorPlan',
      meta: { tab: 'majorPlan', title: 'majorPlan' }
    },
    {
      path: '/predictDetail',
      components: {
        default: predictDetail
      },
      name: 'predictDetail',
      meta: { tab: 'predictDetail', title: 'predictDetail' }
    },
    {
      path: '/record',
      components: {
        default: record
      },
      name: 'record',
      meta: { tab: 'record', title: 'record' }
    },
    {
      path: '/complete',
      components: {
        default: complete
      },
      name: 'complete',
      meta: { tab: 'complete', title: 'complete' }
    },
    {
      path: '/agent',
      components: {
        default: agent
      },
      name: 'agent',
      meta: { tab: 'agent', title: 'agent' }
    },
    {
      path: '/about',
      components: {
        default: about
      },
      name: 'about',
      meta: { tab: 'about', title: 'about' }
    },
    {
      path: '/goal',
      components: {
        default: goal
      },
      name: 'goal',
      meta: { tab: 'goal', title: 'goal' }
    },
    {
      path: '/aboutus',
      components: {
        default: aboutus
      },
      name: 'aboutus',
      meta: { tab: 'aboutus', title: 'aboutus' }
    },
    {
      path: '/tb',
      components: {
        default: tb
      },
      name: 'tb',
      meta: { tab: 'tb', title: 'tb' }
    },
    {
      path: '/tbys',
      components: {
        default: tbys
      },
      name: 'tbys',
      meta: { tab: 'tbys', title: 'tbys' }
    },
    {
      path: '/test',
      components: {
        default: test
      },
      name: 'test',
      meta: { tab: 'test', title: 'test' }
    },
    {
      path: '/myqz',
      components: {
        default: myqz
      },
      name: 'myqz',
      meta: { tab: 'myqz', title: 'myqz' }
    }
  ]
})
