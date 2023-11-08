import request from '../utils/request'
import {
  languageData,
  languageAdd,
  languageEdit,
  languageDel,
  languageInfo
} from '../type/language'
// 列表
export const getLangList = (data: languageData) => {
  return request.post('/pingtai/gamelang/index', data)
}
// 添加
export const addLang = (data: languageAdd) => {
  return request.post('/pingtai/gamelang/add', data)
}
// 编辑
export const editLang = (data: languageEdit) => {
  return request.post('/pingtai/gamelang/edit', data)
}
// 删除
export const delLang = (data: languageDel) => {
  return request.post('/pingtai/gamelang/del', data)
}
// 信息
export const getLangInfo = (data: languageInfo) => {
  return request.post('/pingtai/gamelang/info', data)
}
