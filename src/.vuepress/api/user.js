import axios from '@/utils/request'

export const getRights = params => axios.post('/user/wxauth', params)

export const getQrCode = params =>
  axios.get('/public/getQrCode', { params, responseType: 'arraybuffer' })

export const getUserByScene = params =>
  axios.get('/public/getScene', { params })
