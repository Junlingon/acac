export interface UserInfo {
  isLogin: boolean
  uname: string
  face: string
  mid: string
}

export interface ShareConfig {
  url?: string
  type?: string
  share_id?: string
  share_origin?: string
  title?: string
  desc?: string
  avatar?: string
  imageUrl?: string
  posterUrl?: string
  wxImgUrl?: string
  posterWidth?: number
  posterHeight?: number
  editContent?: string
  description?: string
  shareImageUrl?: string
  shareConfig?: Record<string, unknown>
  callback?: () => void
  onShowPannel?: () => void
  onClick?: () => void
  onSuccuss?: () => void
}

export interface GenerateImageConfig {
  nodeList: Array<any>
  height: number
  width: number
}
