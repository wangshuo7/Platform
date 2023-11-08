import request from '../utils/request'
import {
  categoryData,
  categoryAdd,
  categoryEdit,
  categoryDel,
  categoryInfo
} from '../type/category'
// 列表
export const getCategoryList = (data: categoryData) => {
  return request.post('/pingtai/gamecate/index', data)
}
// 添加
export const addCategory = (data: categoryAdd) => {
  return request.post('/pingtai/gamecate/add', data)
}
// 编辑
export const editCategory = (data: categoryEdit) => {
  return request.post('/pingtai/gamecate/edit', data)
}
// 删除
export const delCategory = (data: categoryDel) => {
  return request.post('/pingtai/gamecate/del', data)
}
// 信息
export const getCategoryInfo = (data: categoryInfo) => {
  return request.post('/pingtai/gamecate/info', data)
}
