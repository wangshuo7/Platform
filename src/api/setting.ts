import request from '../utils/request'
import { settingList } from '../type/setting'

// 获取系统配置
export const getConfig = (data: any) => {
  return request.post('/pingtai/setconf/getconf', data)
}
// 设置系统配置
export const setConfig = (data: settingList) => {
  return request.post('/pingtai/setconf/setconf', data)
}
