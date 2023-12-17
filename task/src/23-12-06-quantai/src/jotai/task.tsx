import { $getTaskList } from '@api/http'
import { ACTIVITY_CODE } from '@constants/index'
import { TASK_STATUS } from '@constants/task'
import { atom } from 'jotai'
export const taskVisibleAtom = atom(false)

export const taskDescVisibleAtom = atom(false)

export const deviceInfoAtom = atom<any>(null)

export const taskListAtom = atom([])

export const getTaskListAtom = atom(
  (get) => get(taskListAtom),
  async (_get, set: any, params = {}) => {
    try {
      // 先从 deviceInfoAtom 拿拿不到就从 params 拿
      const deviceInfo = (await _get(deviceInfoAtom)) || params
      const { build, platform, device, mobi_app } = deviceInfo || {}
      try {
        const data = await $getTaskList({
          activity_code: ACTIVITY_CODE,
          build,
          platform,
          device,
          mobi_app,
        })
        console.log('data:', data)
        // 排个序
        const sortList = data.sort((prev, next) => {
          return TASK_STATUS[prev.state] - TASK_STATUS[next.state]
        })
        console.log('sortList', sortList)
        set(taskListAtom, sortList)
      } catch (error) {
        console.log('error', error)
        return []
      }
    } catch (error) {
      console.log('error', error)
    }
  }
)
