import request from '../utils/request'
import { inviteData } from '../type/invitation'
// 生成邀请码
export const createCode = (data: inviteData) => {
  return request.post('/pingtai/yqcode/create_yqcode', data)
}
