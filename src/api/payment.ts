import request from '../utils/request'
import {
  paymentData,
  paymentAdd,
  paymentEdit,
  paymentDel
} from '../type/payment'
// 列表
export const getPaymentList = (data: paymentData) => {
  return request.post('/pingtai/paymiyao/index', data)
}
// 删除
export const delPayment = (data: paymentDel) => {
  return request.post('/pingtai/paymiyao/del', data)
}
// 设置
export const setPayment = (data: paymentEdit) => {
  return request.post('/pingtai/paymiyao/set', data)
}
// 生成充值卡
export const createKey = (data: paymentAdd) => {
  return request.post('/pingtai/paymiyao/create_miyao', data)
}
