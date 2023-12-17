export interface RankInfoItem {
  userName: string
  userAvatar: string
  score: number
  rank: number
}

export interface RankInfo {
  rankList: RankInfoItem[]
  userRank: RankInfoItem
}
