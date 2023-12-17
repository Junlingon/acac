import Bjax from '@bilibili/bjax'
import Mock from '@bilibili/bapi-mock'

export const http = new Bjax()

import { currentEnv } from '@utils/common'

console.log('bjax：', http, currentEnv)

import { handleHttp } from '@utils/common'
import { ACTIVITY_CODE, CUSTOM_TASK_CODE } from '@constants/index'

// const prefix =
//   currentEnv === 'uat' ? 'uat-' : currentEnv === 'pre' ? 'pre-' : ''
const host = `//api.bilibili.com`
export let HOST = {
  activity: host,
  common: host,
  fe: '//activity.hdslb.com',
}

// 不需要mock的项目删掉 bapi-mock 逻辑即可
if (currentEnv === 'development' || currentEnv === 'uat') {
  const mock = new Mock()
  HOST = mock.getMockPath(HOST)
}

// 主站等公共接口请求
export const $getUserInfo = () => {
  return handleHttp(
    http.get(`${HOST.common}/x/web-interface/nav`, {
      t: new Date().getTime(),
    })
  )
}

// 任意门
export const $anyDoor = (params) => {
  return handleHttp(
    http.post(
      `${HOST.activity}/pgc/activity/dokodemoDoor/req/${params.name}`,
      {
        ...params,
        activityCode: ACTIVITY_CODE,
        t: new Date().getTime(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  )
}

export const $anyDoorGetEasy = (params) => {
  return handleHttp(
    http.post(
      `${HOST.activity}/pgc/activity/dokodemoDoor/getEasy/${params.name}`,
      {
        ...params,
        activityCode: ACTIVITY_CODE,
        t: new Date().getTime(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  )
}

// 任意门 - 不需要登录态
export const $anyDoorNotLogin = (params) => {
  return handleHttp(
    http.post(
      `${HOST.activity}/pgc/activity/dokodemoDoor/get/${params.name}`,
      {
        ...params,
        activityCode: ACTIVITY_CODE,
        t: new Date().getTime(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  )
}

// 任务列表
export const $getTaskList = (params) => {
  return handleHttp(
    http.get(`${HOST.activity}/pgc/activity/common/task/list`, {
      ...params,
      activity_code: ACTIVITY_CODE,
      t: new Date().getTime(),
    })
  )
}

// 任务领取
export const $taskReceive = (params: any) => {
  return handleHttp(
    http.post(`${HOST.activity}/pgc/activity/common/task/award`, {
      ...params,
      activity_code: ACTIVITY_CODE,
      t: new Date().getTime(),
    })
  )
}

// 任务完成
export const $taskComplete = (params) => {
  return handleHttp(
    http.post(`${HOST.activity}/pgc/activity/common/task/complete`, {
      ...params,
      activity_code: ACTIVITY_CODE,
      t: new Date().getTime(),
    })
  )
}

// 活动平台配置项获取
export const $getActivityConfig = (configId) => {
  return http.get(
    `//activity.hdslb.com/blackboard/static/jsonlist/${configId}/value.json`,
    {
      t: new Date().getTime(),
    },
    {
      withCredentials: false,
    }
  )
}

// 查询是否需要降级
export const $isSafeLink = (mainUrl) => {
  return handleHttp(
    http.post(
      `${host}/ogv/public/safe/links`,
      {
        urlList: [mainUrl],
        t: new Date().getTime(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  )
}

//  ios 是否在订阅期内
export const $getIfSubscribe = () => {
  return handleHttp(
    http.get(
      `${HOST.activity}/x/vip/auto_renew/status`,
      {
        type: 1,
        t: new Date().getTime(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  )
}

//自定义任务完成
export const $taskCustomComplete = () => {
  return handleHttp(
    http.post(`${HOST.activity}/pgc/activity/common/task/custom/complete`, {
      task_code:CUSTOM_TASK_CODE,
      activity_code: ACTIVITY_CODE,
      t: new Date().getTime(),
    })
  )
}
