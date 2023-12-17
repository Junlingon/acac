import { atom } from 'jotai'
import { $anyDoorGetEasy, $anyDoor } from '@api/http'
import { RoleInfo } from '@model/fusion'

// 所有角色的信息
export const roleListAtom = atom<RoleInfo[]>([])

// 当前角色的信息
export const curRoleInfoAtom = atom<RoleInfo>(null)

export const setCurRoleInfoAtom = atom(null, (get, set: any, payload) => {
  set(curRoleInfoAtom, payload)
})

// 获取角色信息
export const getRoleInfoAtom = atom(null, async (get, set: any) => {
  const res = await $anyDoorGetEasy({
    name: 'quantai_roleInfo',
  })

  const curRoleInfo = get(curRoleInfoAtom)

  const roles = res?.roles || []
  set(roleListAtom, roles)
  const curRole = roles.find((item) => item.id === curRoleInfo?.id)
  set(curRoleInfoAtom, curRole ? curRole : roles[0])
  return roles
})

// 兑换奖励
export const exchangeRewardAtom = atom(null, async (get, set, payload) => {
  const res = await $anyDoor({
    name: 'quantai_redeemRoleAward',
    inputMap: {
      roleId: payload,
    },
  })

  return res
})

// 清除new
export const clearNewAtom = atom(null, async (get, set, payload) => {
  const res = await $anyDoor({
    name: 'quantai_reportClick',
    inputMap: {
      roleId: payload,
    },
  })
})
