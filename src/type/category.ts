export interface categoryList {
  game_cate_id: number
  title: string
  remark: string
  ctime: number
  uptime: number
  is_del: number
  deltime: number
  path: any
  level: number
  pid: number
}
export interface categoryData {
  title: string
  page: number
  page_size: number
}
export interface categoryAdd {
  title: string
  remark: string
}
export interface categoryEdit {
  id: number | undefined
  title: string
  remark: string
}
export interface categoryDel {
  ids: number[]
}
export interface categoryInfo {
  id: number
}
