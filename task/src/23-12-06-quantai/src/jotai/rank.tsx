import { $anyDoorGetEasy } from '@api/http'
import { NO_FACE } from '@constants/index'
import { RankInfo } from '@model/rank'
import { atom } from 'jotai'
export const loadingAtom = atom(false)

export const rankInfoAtom = atom<RankInfo>({
  rankList: [],
  userRank: {
    userName: '我的',
    userAvatar: NO_FACE,
    score: 0,
    rank: -1,
  },
})

export const getRankAtom = atom(
  (get) => get(rankInfoAtom),
  async (_get, set: any) => {
    try {
      const result = await $anyDoorGetEasy({
        name: 'quantai_rankInfo',
      })
      console.log('----result:', result)
      if (result) {
        set(rankInfoAtom, result)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
)
