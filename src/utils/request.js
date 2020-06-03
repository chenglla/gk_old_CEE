import axios from 'axios'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://www.kgai.tech/cee/', // api的base_url
  baseURL: 'https://www.zhongkeruitong.top/show/cee/', // api的base_url
  timeout: 50000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  config['headers']['Content-Type'] = 'application/x-www-form-urlencoded'
  if (config.method === 'POST' || config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  Promise.reject(error)
  console.info(error)
})


// respone拦截器
// service.interceptors.response.use(
//   response => {
//     if (response.data.code === 601) {
//       console.log(222222222222222)
//       let url = 'http://zhiheyikaoqin.cn/show/cee/wechat/authorize?returnUrl=index.html&groupId='
//       let groupid = 0
//       if (groupid !== undefined && groupid !== null && groupid !== '') {
//         groupid = localStorage.getItem('groupid')
//       }
//       location.href = url + groupid
//     }
//     return response
//   },
//   error => {
//     console.info(error)
//     return Promise.reject(error)
//   })

export default service
