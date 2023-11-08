import request from '../utils/request'
import { login_type, register_type } from '../type/login'
// 登录
export const login = (data: login_type) => {
  return request.post('/pingtai/login/login', data)
}
export const register = (data: register_type) => {
  return request.post('/youxizuozhe/register/register', data)
}
