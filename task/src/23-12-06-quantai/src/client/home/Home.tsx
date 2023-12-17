import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { searchObj } from '@utils/common'

import styles from './home.module.less'
import { $getUserInfo, $taskCustomComplete } from '@api/http'

import Foot from '@client/foot/Foot'
import BuyIndex from '@client/buy/Index'
import Fusion from '@client/fusion/Fusion'

import { getMainInfoAtom, userInfoAtom } from '@jotai/common'
import RewardsDialog from '@client/buy/rewardsDialog'
import Rank from '@client/rank/rank'
import { linkJump } from '@bilibili/utils-leona'
import { getRoleInfoAtom } from '@jotai/fusion'
import { getTaskListAtom } from '@jotai/task'

const Home = () => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [, getMainInfo] = useAtom(getMainInfoAtom)
  const [, getRoleInfo] = useAtom(getRoleInfoAtom)
  const [, getTaskList] = useAtom(getTaskListAtom)

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const data = await $getUserInfo()
      data && setUserInfo(data)
      return data
    } catch (error) {
      return {}
    }
  }

  //首次访问活动页任务
  const fistVisit = async () => {
    try {
      await $taskCustomComplete()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserInfo()
    listenVisibility()
    if (userInfo.isLogin) {
      fistVisit()
    }
  }, [])

  // 监听页面返回
  const listenVisibility = () => {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        refresh()
      }
    })
  }

  const refresh = () => {
    console.log('页面刷新')
    Promise.all([getMainInfo(), getRoleInfo(), getTaskList()])
  }

  const toRule = () => {
    linkJump({
      link: 'https://www.bilibili.com/blackboard/activity-yHn6RLBbq9.html',
    })
  }

  return (
    <div className={styles.homeWrapper}>
      {/* 头图 */}
      <div
        className={`${styles.head} ${
          searchObj.type === 'half' ? styles.half : ''
        }`}
      ></div>

      {/* 规则 */}
      <div className={styles.rules} onClick={toRule}>
        活动规则
      </div>

      {/* 购买 */}
      <BuyIndex></BuyIndex>

      {/* 合成 */}
      <Fusion />

      {/* 排行榜 */}
      <Rank></Rank>

      {/* 页脚 */}
      <Foot></Foot>

      {/* 奖励领取后弹窗 */}
      <RewardsDialog></RewardsDialog>
    </div>
  )
}

export default Home
