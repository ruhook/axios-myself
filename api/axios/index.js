import axios from 'axios'
import qs from 'qs'
import { SUCCESS_RESPONSE_COCE, API_PREFIX } from './common/const'
import { getHeader, stringify, validationData } from './common/utils'

/**
 * 模拟toast
 * @param {*} message
 */
function toast(message) {
  console.log(message)
}
// 自定义拦截器
const interceptors = [
  validationData, codeIntercepter
]

// axios实例
const http = axios.create({
  baseURL: API_PREFIX,
  timeout: API_TIMEOUT,
  // POST | PUT | PATCH ，序列化参数
  transformRequest: [function(data) {
    //return serialize(data)
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  // GET，序列化参数
  paramsSerializer: function(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

/**
 * 请求拦截器
 * @return {[type]}          [description]
 */
http.interceptors.request.use(function(request) {
  let { method, data, params } = request

  // loading
  if (data.loading) {
    // show loading
  }
  if (data.hasOwnProperty('loading')) delete data.loading
  // 参数的预处理  根据需求处理 可简省发送请求时的参数填写
  if (!data) data = {}
  if (!(data.hasOwnProperty("param"))) data.param = {}

  if (method.toLowerCase() === 'get') {
    // get的参数预处理
  } else {
    // post的参数预处理
  }
  return request
})

/**
 * 扩展响应拦截器
 * @return {[type]}           [description]
 */
http.interceptors.response.use(function(response) {
  response._i = 0
  response.next = function() {
    if (response._i < interceptors.length) {
      return interceptors[response._i++](response, response.next)
    }
  }
  return response
})

/**
 * 响应拦截器
 * @return {[type]}           [description]
 */
http.interceptors.response.use(function(response) {
  const { data } = response
  const result = response.next()
  if (result) {
    // 请求失败
    switch (result) {
      case error.LOGINERROR:
        // 登录失败时的处理
        break
      default:
        toast(data.message)
    }
    return Promise.reject(data)
  }
  return data
}, function(error) {
  loading && loading.close(); // 理想状态一个页面只有一次请求 可全局控制loading状态  可上node BFF，即 Backend For Frontend（服务于前端的后端）
  toast('网络繁忙，请稍后重试')
  return Promise.reject(error)
})

/**
 * 响应拦截器
 * @return { axios } 
 */
const fetch = (config) => {
  return http(config)
}

/**
 * axios.post
 * @return { axios } 
 */
let post = fetch.post = (...args) => {
  let [url, data, options] = args
  return http({
    url,
    data,
    headers: getHeader(),
    method: 'post',
    ...options
  })
}

/**
 * axios.get
 * @return { axios } 
 */
let get = fetch.get = (...args) => {
  let [url, data, options] = args
  return http({
    url,
    data,
    method: 'get',
    ...options
  })
}

export default {
  fetch,
  post,
  get
}