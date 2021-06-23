import axios from '@/utils/request'

// 获取页面的访问权限
export const getRights = params => axios.post('/user/wxauth', params)

// 获取登录二维码
export const getQrCode = params =>
  axios.get('/public/getQrCode', { params, responseType: 'arraybuffer' })

// 获取用户的基础信息
export const getUserByScene = params =>
  axios.get('/public/getScene', { params })

// 验证coupon
export const checkCoupon = params => axios.post('/coupon/check', params)

// 获取用户的基础信息
export const getUserBasic = () => axios.get('/public/info')
