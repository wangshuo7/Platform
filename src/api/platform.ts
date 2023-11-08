import request from '../utils/request'
import {
  platformData,
  platformAdd,
  platformEdit,
  platformDel,
  platformInfo
} from '../type/platform'
// 列表
export const getPlatformList = (data: platformData) => {
  return request.post('/pingtai/gamepingtai/index', data)
}
// 添加
export const addPlatform = (data: platformAdd) => {
  return request.post('/pingtai/gamepingtai/add', data)
}
// 编辑
export const editPlatform = (data: platformEdit) => {
  return request.post('/pingtai/gamepingtai/edit', data)
}
// 删除
export const delPlatform = (data: platformDel) => {
  return request.post('/pingtai/gamepingtai/del', data)
}
// 信息
export const getPlatformInfo = (data: platformInfo) => {
  return request.post('/pingtai/gamepingtai/info', data)
}
