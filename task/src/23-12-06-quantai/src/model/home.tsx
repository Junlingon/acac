export interface BuyInfo {
  month: number
  price: number // 价格
  bubble: string // 气泡文案
  token: string // sku token
  appId: string // sku appId
  appSubId: string // sku appSubId
  panelType: string // sku panelType
  // month: number // sku month
  orderType: number // sku orderType
  originPrice?: number // 原价
  type: string // 类型
  panelIds?: {
    panelId: string
    panel: string
  }[]
  taskInfo: {
    taskCode: string
    state: number // state=1任务未完成，引导去购买, state=2任务已完成，点击领取
    leftFragment: number //剩余碎片数量，对应抽奖机会
  }
}

export interface DlcAwardInfo {
  taskCode: string
  state: number // state=1任务未完成，引导去购买, state=2任务已完成，点击领取
  leftFragment: number //剩余碎片数量, 大于50显示50连抽
}

export interface MainInfo {
  buyAwardInfo: BuyInfo[] //买赠任务
  dlcAwardInfo: DlcAwardInfo //dlc任务
  user: string
}

export interface ProtocolItem {
  name: string // 购买协议名称
  link: string // 购买协议名称地址
}

export interface RewardsItem {
  rewardId: number //奖励道具id
  rewardRcdIds: string[]
  rewardName: string //奖励名称
  rewardPicUrl: string //奖励图
  rewardNum: number //奖励数量
  rewardDesc: string
  extInfo: string
}

export interface RewardsInfo {
  count: number
  taskRewardResultList: RewardsItem[]
}

// export interface TaskInfo {
//   taskCode: string
//   state: number // state=1任务未完成，引导去购买, state=2任务已完成，点击领取
//   leftFragment: number //剩余碎片数量, 大于50显示50连抽
// }