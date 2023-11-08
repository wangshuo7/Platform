export interface withdrawList {
  id: number
  code: string
  ctime: number
  is_use: number
  uid: number
  use_auth: any
  price: string
}
export interface withdrawData {
  page: number
}
export interface withdrawAudit {
  id: number | undefined
  status: string
  remark: string
}
