import axios from 'axios'
import store from '@/store'

const isDev = process.env.NODE_ENV === 'development'
// console.log('🚀 ~ file: request.js ~ line 5 ~ isDev', isDev)

const axiosInstance = axios.create({
  baseURL: isDev ? 'http://localhost:3000' : 'https://mp.toimc.com',
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
