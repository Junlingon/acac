import {
  compose,
  checkLoginStatus,
  checkEnvStatus,
} from '@bilibili/utils-leona'
import { biliBridge } from '@bilibili/js-bridge'
import qs from 'qs'
import dayjs from 'dayjs'
import BFS from '@blink-common/component.bfs-utils'

const _bfs = new BFS()

import { Toast } from 'antd-mobile'

import { ACTIVITY_STATUS, RES_CODE_MAP, errorMessage } from '../constants/index'
// 判断活动时间
export const checkActivityStatus = ({ status }) => {
  if (status === ACTIVITY_STATUS.NOT_START) {
    const errorObj = {
      code: RES_CODE_MAP.NOT_START,
      name: 'checkActivityStatus',
      message: '活动未开始',
      error: false,
    }
    Toast.show({
      content: '活动未开始',
    })
    throw errorObj
  } else if (status === ACTIVITY_STATUS.END) {
    const errorObj = {
      code: RES_CODE_MAP.API_END,
      name: 'checkActivityStatus',
      message: '活动已结束',
      error: false,
    }
    Toast.show({
      content: '活动已结束',
    })
    throw errorObj
  } else {
    // 在活动内
    console.log('在活动内')
    return {}
  }
}

export const checkStatus = async ({ isLogin, status }) => {
  // url 带上debug参数跳过前置检查
  if (location.search.indexOf('debug') > -1) {
    return true
  }

  const preCheck = compose(
    checkActivityStatus,
    checkEnvStatus,
    checkLoginStatus
  )
  return preCheck({
    needLogin: true,
    isLogin: isLogin,
    status,
  })
}

export const handleHttp = (p: Promise<any>) => {
  return p
    .then((dat) => {
      const { code, data, message } = dat
      if (code === 0) {
        return data
      } else if (code === -401 || code === -101) {
        Toast.show({
          content: '当前未登录',
        })
      } else if (code === RES_CODE_MAP.API_END) {
        Toast.show({
          content: '活动已结束',
        })
        throw new Error('活动已结束')
      } else if (message) {
        Toast.show({
          content: message || '网络错误，请重试',
        })
        throw new Error(errorMessage)
      }
    })
    .catch((rej) => {
      Toast.show({
        content: '网络错误，请重试',
      })
      throw rej
    })
}

// 当前环境判断
export const getCurrentEnv = () => {
  const { hostname } = location || {}

  if (hostname === 'www.bilibili.com' || hostname === 'm.bilibili.com') {
    return 'production'
  } else if (
    hostname === 'localhost' ||
    hostname === 'dev.bilibili.com' ||
    hostname === 'ff-dev.bilibili.com' ||
    hostname === 'beta.bilibili.com'
  ) {
    return 'development'
  } else if (hostname === 'uat-m.bilibili.com') {
    return 'uat'
  } else if (hostname === 'pre-m.bilibili.com') {
    return 'pre'
  }
}

export const currentEnv = getCurrentEnv()

export const searchObj: any = (() => {
  const { search } = location || {}
  const searchObj = qs.parse(search.substring(1))
  return searchObj || {}
})()


export const cancellablePromise = (promise) => {
  let canceled = false

  const p = new Promise((resolve, reject) => {
    promise.then((res) => {
      if (!canceled) resolve(res)
    }).catch(err => {
      if (!canceled) reject(err)
    })
  })

  return {
    instance: p,
    cancel: () => {
      canceled = true
    }
  }
}

export const trimProtocol = raw => {
  if (!raw) return ''
  return raw.replace(/^https?:/g, '')
}

export const bfsImg = (
  url: string,
  w: number,
  h?: number,
  q?: number,
  o: number = 1,
  restOptions?: any
) => {
  if (!url) return ''
  const ratio = window === undefined ? 2 : window.devicePixelRatio
  const width = (w && w * ratio) || w
  const height = (h && h * ratio) || h
  return url.includes('gif') ? trimProtocol(url) : trimProtocol(_bfs.getImageLink(url, width, height, { o, q, ...restOptions }))
}