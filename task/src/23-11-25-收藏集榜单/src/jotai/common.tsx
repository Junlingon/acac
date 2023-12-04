import { atom } from 'jotai'
// import { mainTabs } from '../constants/tab'
export const loadingAtom = atom(false)

import { UserInfo } from '../model/common'
import { ListType } from '../model/list'

export const userInfoAtom = atom<UserInfo>({
  isLogin: false,
  uname: '我的',
  face: '',
  mid: '',
})

type curMainTabAtom2={
  _index?: number;
  name: string;
  value?: number;
  subTabs?: {
      name?: string;
      value?: number;
      awardTittle?: string;
      rankTittle?: string;
      awardList?: {
          name?: string;
          image?: string;
      }[];
  }[];
}

// 前端配置项
export const configAtom = atom(null)

//配置的Tabs值
export const mainTabsAtom = atom<curMainTabAtom2[]>([])

// 当前的主tab值
export const curMainTabAtom = atom<ListType[]>([])

// 当前的副tab值
export const curSubTabAtom = atom<ListType[]>([])

// 当前的榜单列表值
export const curListDataAtom = atom<ListType[]>([])