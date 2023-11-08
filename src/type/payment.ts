export interface paymentList {
  code: string
  ctime: number
  id: number
  is_use: number
  price: string
  uid: number
  use_auth: any
}
export interface paymentData {
  page: number
  page_size: number
  code: string
}
export interface paymentAdd {
  price: string
  num: string
}
export interface paymentEdit {
  ids: (number | undefined)[]
  price: string
}
export interface paymentDel {
  ids: number[]
}
