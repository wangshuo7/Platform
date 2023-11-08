import request from '../utils/request'
import { withdrawData, withdrawAudit } from '../type/withdraw'
// 提现列表
export const getWithdrawList = (data: withdrawData) => {
  return request.post('/pingtai/tixian/index', data)
}
// 审核申请
export const auditWithdraw = (data: withdrawAudit) => {
  return request.post('/pingtai/tixian/change_status', data)
}
