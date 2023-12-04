import { inBiliApp } from '@bilibili/js-bridge'
const { init, judgeOverSea } = require('@bilibili/h5-utils')

// 响应code
export const RES_CODE_MAP = {
  SUCCESS: 0,
  NOT_LOGIN: 80001,
  NOT_IN_APP: 80002,
  NOT_START: 80003,
  END: 80004,
  API_END: 6006108,
  NOT_AUTH: -401,
  NOT_LOGIN_NAV: -101,
}

export const ACTIVITY_STATUS = {
  NOT_START: 'NOT_START',
  RUNNING: 'RUNNING',
  END: 'END',
}

export const ACTIVITY_CODE = 'fanRen2023'

const isSafari =
  /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)

export const isIos =
  /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(navigator.userAgent) || isSafari

export const inApp = inBiliApp

if (!inBiliApp) {
  init()
  judgeOverSea()
}

export const errorMessage = '网络异常，请稍后再试'
