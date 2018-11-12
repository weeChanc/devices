import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
const baseURL = 'http://139.159.219.76:8008/'

const service = axios.create({
  baseURL, // api的base_url
  timeout: 10000 // 请求超时时间
})


// request拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post' || config.method === 'put') {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  // config.params = {
  //   ...config.params
  // }
  return config
}, error => {
  return Promise.reject(error.response.data)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return response.data
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

Vue.prototype.$http = service

export default service
