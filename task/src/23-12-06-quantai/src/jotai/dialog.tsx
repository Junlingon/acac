import { atom } from 'jotai'
import { RewardsInfo } from '@model/home'

// 购买后弹窗
export const buyDialogVisibleAtom = atom<boolean>(false)

// 领取后弹窗
export const rewardsDialogVisibleAtom = atom<boolean>(false)

// 领取弹窗数据
export const buyRewardsListAtom = atom<RewardsInfo>({
  count: 0,
  taskRewardResultList: [],
})
