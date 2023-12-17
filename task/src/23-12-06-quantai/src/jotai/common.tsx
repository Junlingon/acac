import { atom } from 'jotai'
export const loadingAtom = atom(false)

import { UserInfo } from '@model/common'
import { $anyDoorGetEasy, $anyDoorNotLogin } from '@api/http'
import { ACTIVITY_STATUS, NO_FACE, ACTIVITY_CODE } from '@constants/index'
import { BuyInfo, MainInfo } from '@model/home'

export const userInfoAtom = atom<UserInfo>({
  isLogin: false,
  uname: '我的',
  face: '',
  mid: '',
})

export const statusAtom = atom(ACTIVITY_STATUS.RUNNING) // 默认活动开始的

export const currentSelectItemAtom = atom<BuyInfo | null>(null)
export const mainInfoAtom = atom<MainInfo>(null)

// 当前选择的阶段
export const currentSelectAtom = atom<number>(1)

export const getMainInfoAtom = atom(
  (get) => get(mainInfoAtom),
  async (_get, set: any) => {
    try {
      const result = await $anyDoorGetEasy({
        name: 'quantai_buyRewardInfo',
        inputMap: {},
      })
      console.log('----mainInfo----', result)
      if (result) {
        set(mainInfoAtom, result)
        const { status } = result || {}
        set(statusAtom, status)
      }
    } catch (error) {
      console.log('getMainInfo 错误')
    }
  }
)

// export const getRankAtom = atom(
//   (get) => get(taskInfoAtom),
//   async (_get, set: any) => {
//     try {
//       const result = await $anyDoorNotLogin({
//         name: 'quantai_buyRewardInfo',
//       })
//       console.log('----result:', result)
//       set(taskInfoAtom, result)
//     } catch (error) {
//       console.log('error', error)
//     }
//   }
// )