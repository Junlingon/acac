import { executeNativeMethod } from '@bilibili/utils-leona'
import toast from '@bilibili/vanilla-toast'
import OgvVipPay from '@bilibili/ogv-buy-vip'

import { searchObj } from './common'
import { inApp } from '@constants/index'
import { BUY_TYPE } from '@constants/home'

export const buyAction = async ({ buyInfo, props, type }) => {
  const { order_report_params = '{}' } = searchObj || {}
  const { month, appId, appSubId, token, panelType, orderType, panelIds } =
    buyInfo || {}

  // 处理传过去的 orderReportParams
  let orderReportParams = {}
  try {
    orderReportParams = JSON.parse(order_report_params)
  } catch (error) {
    // 解析出错的话，就把默认值赋值上去
    orderReportParams = { order_report_params }
  }

  /**
   * 1. 安卓 hd 不让购买
   * 2. 如果买的是超大 那么参数需要加一下 panelId
   */
  let panelIdConfig: any = null
  if (inApp) {
    const appInfo: any = await executeNativeMethod('global.getContainerInfo')
    if (appInfo?.mobi_app === 'android_hd') {
      throw new Error('您所在平台不支持购买该商品，请切换平台购买')
    }

    if (type === BUY_TYPE.SUPER) {
      // tv 购买需要筛选下 panelId
      panelIdConfig = panelIds.find((item) => item.panel === appInfo.platform)
    }
  }

  // 基础参数
  const baseParams = {
    appId,
    appSubId,
    orderType,
    act_token: token,
    months: month,
    panel_type: panelType,
  }

  // 超大多一个参数
  const buyParams =
    type === BUY_TYPE.NORMAL
      ? baseParams
      : {
          ...baseParams,
          panel_id: panelIdConfig?.panelId,
        }

  console.log('buyParams', buyParams)

  const vipPay = new OgvVipPay({
    overOgv: false,
    orderReportParams: {
      cfrom: props.cfrom,
      ...orderReportParams,
    },
  })

  const funName = type === BUY_TYPE.NORMAL ? 'payVipPanel' : 'payTvActOrder'
  console.log('vipPay[funName]', vipPay[funName])
  const res = await vipPay[funName](buyParams)
  console.log('res--->', res)
  const { code, message, msg } = res || {}
  console.log('---->购买成功code:', code)
  if (code === 3) {
    toast.info('未支付成功，记忆碎片未发放到账')
    return false
  } else if (code === 0) {
    // 成功
    return true
  } else {
    throw {
      code,
      message: message || msg,
    }
  }
}
