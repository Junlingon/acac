import { atom } from 'jotai'
// import { mainTabs } from '../constants/tab'
export const loadingAtom = atom(false)

import { ICurMainTab, ICurSubTab } from '../model/common'
import { ListType } from '../model/list'

// 前端配置项
export const configAtom = atom(null)

//配置的Tabs值
export const TabsAtom = atom<ICurMainTab[]>([])

// 当前的主tab值
export const curMainTabAtom = atom<ICurMainTab>(null)

// 当前的副tab值
export const curSubTabAtom = atom<ICurSubTab[]>([])

// 当前的榜单列表值
export const curListDataAtom = atom<ListType[]>([])