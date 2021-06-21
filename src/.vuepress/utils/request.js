import axios from 'axios'
import store from '@/store'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    const token = store.state.token
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应请求的拦截器
axiosInstance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },
  async err => {
    return Promise.reject(err)
  }
)

export default axiosInstance
