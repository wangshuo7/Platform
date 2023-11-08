export interface langList {
  game_lang_id: number
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
export interface languageData {
  title: string
  page: number
  page_size: number
}
export interface languageAdd {
  title: string
  remark: string
}
export interface languageEdit {
  id: number | undefined
  title: string
  remark: string
}
export interface languageDel {
  ids: number[]
}
export interface languageInfo {
  id: number
}
