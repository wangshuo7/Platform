export interface platformList {
  game_pingtai_id: number
  title: string
  remark: string
  ctime: number
  uptime: number
  is_del: number
  deltime: number
  path: number
  level: number
  pid: number
}
export interface platformData {
  title: string
  page: number
  page_size: number
}
export interface platformAdd {
  title: string
  remark: string
}
export interface platformEdit {
  id: number | undefined
  title: string
  remark: string
}
export interface platformDel {
  ids: number[]
}
export interface platformInfo {
  id: number
}
