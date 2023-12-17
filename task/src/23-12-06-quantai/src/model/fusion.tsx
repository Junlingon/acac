
export interface FragmentInfo {
  propId: number
  owned: number
  label: string
}

export interface awardInfo {
  name: string
  propId: number
  desc: string
  picture: string
}

export interface RoleInfo {
  id: number
  name: string
  //头像
  avatar: string
  //角色大图
  picture: string
  //碎片总数
  totalFragments: number
  unlockType: 'VIP' | 'DLC'
  ownedFragmentList: FragmentInfo[]
  awards: awardInfo[]
  // NEW:显示"NEW"标签,"AWARD": 显示礼物标签
  label: 'NEW' | 'AWARD'
  //用户是否解锁
  unlocked: boolean
  //是否集齐碎片
  award: boolean
}