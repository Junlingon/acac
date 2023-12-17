import React, { useEffect, useState } from 'react'
import styles from './buy.module.less'
import ProtocolContent from './ProtocolContent'
import { useAtom } from 'jotai'
import { mainInfoAtom, getMainInfoAtom } from '@jotai/common'
import { BUY_DURATION, BUY_TYPE } from '@constants/home'
import useBuy from 'hooks/useBuy'
import { BuyInfo } from '@model/home'
import { buyRewardsListAtom, rewardsDialogVisibleAtom } from '@jotai/dialog'
import { purchaseModalVisibleAtom } from '@jotai/purchaseModal'
import { $anyDoor } from '@api/http'

const Buy = () => {
  const [mainInfo] = useAtom(mainInfoAtom)
  const [, getMainInfo] = useAtom(getMainInfoAtom)
  const [, setBuyRewardsList] = useAtom(buyRewardsListAtom)
  const [, setRewardsDialogVisible] = useAtom(rewardsDialogVisibleAtom)
  const [, setPurchaseModalVisible] = useAtom(purchaseModalVisibleAtom)

  const [normalYearCheck, setNormalYearCheck] = useState(false)
  const [superYearCheck, setSuperYearCheck] = useState(false)
  const [seasonCheck, setSeasonCheck] = useState(false)

  const handleNormalYearCheck = () => {
    console.log('点击')
    setNormalYearCheck(!normalYearCheck)
  }

  const handleSuperYearCheck = () => {
    console.log('点击')
    setSuperYearCheck(!superYearCheck)
  }

  const handleSeasonCheck = () => {
    console.log('点击')
    setSeasonCheck(!seasonCheck)
  }

  const { checkAndBuy } = useBuy()
  // 点击购买
  const onHandleBuy = (item, isChecked: boolean) => {
    console.log('购买', item)
    checkAndBuy({
      cfrom: '',
      isChecked,
      currentItem: item,
      success: () => {
        setPurchaseModalVisible(true)
        //延迟200ms刷新页面
        setTimeout(() => {
          getMainInfo()
        }, 200)
      },
    })
  }
  // 匹配后端接口数据
  const getBuyInfo = (month: number, type: string) => {
    const { buyAwardInfo = [] } = mainInfo || {}
    return buyAwardInfo.find(
      (item) => item.month === month && item.type === type
    )
  }

  //点击开碎片
  const onReceive = async (item) => {
    try {
      const result = await $anyDoor({
        name: 'quantai_award',
        inputMap: {
          taskCode: item.taskInfo.taskCode,
        },
      })
      console.log('----getBuyAward----', result)
      setBuyRewardsList(result)
      setRewardsDialogVisible(true)
    } catch (error) {
      console.log('getBuyAward 错误')
    }
  }

  //展示相关状态的btn
  const showActiveBtn = (
    state: number,
    item?: BuyInfo,
    isChecked?: boolean
  ) => {
    if (state === 2) {
      return (
        <div
          className={`${styles.button} ${styles.receive}`}
          onClick={() => {
            onReceive(item)
          }}
        ></div>
      )
    } else {
      return (
        <div
          className={styles.button}
          onClick={() => {
            onHandleBuy(item, isChecked)
          }}
        >
          {item?.bubble ? (
            <div className={styles.bubble}>
              <div className={styles.bubText}>{item?.bubble}</div>
            </div>
          ) : null}
          <span className={styles.icon}>¥</span>
          <span className={styles.number}>{item?.price}</span>
          <span className={styles.text}> 购买</span>
        </div>
      )
    }
  }

  // 主数据请求
  useEffect(() => {
    getMainInfo()
  }, [])

  return (
    <div className={styles.buyContainer}>
      <div className={styles.yearCardWrapper}>
        <div className={`${styles.yearCard}`}>
          {/* 大会员 */}
          <div className={`${styles.content}`}>
            {showActiveBtn(
              getBuyInfo(BUY_DURATION.YEAR, BUY_TYPE.NORMAL)?.taskInfo.state,
              getBuyInfo(BUY_DURATION.YEAR, BUY_TYPE.NORMAL),
              normalYearCheck
            )}
          </div>
          {/* 协议 */}
          <ProtocolContent
            handleCheck={handleNormalYearCheck}
            checked={normalYearCheck}
          ></ProtocolContent>
        </div>
        <div className={`${styles.yearCard}`}>
          {/* 超级大会员 */}
          <div className={`${styles.content}`}>
            {showActiveBtn(
              getBuyInfo(BUY_DURATION.YEAR, BUY_TYPE.SUPER)?.taskInfo.state,
              getBuyInfo(BUY_DURATION.YEAR, BUY_TYPE.SUPER),
              superYearCheck
            )}
          </div>
          {/* 协议 */}
          <ProtocolContent
            handleCheck={handleSuperYearCheck}
            checked={superYearCheck}
          ></ProtocolContent>
        </div>
      </div>

      <div className={`${styles.cardWrapper}`}>
        {/* 季卡 */}
        {showActiveBtn(
          getBuyInfo(BUY_DURATION.SEASON, BUY_TYPE.NORMAL)?.taskInfo.state,
          getBuyInfo(BUY_DURATION.SEASON, BUY_TYPE.NORMAL),
          seasonCheck
        )}

        {/* 月卡 */}
        {showActiveBtn(
          getBuyInfo(BUY_DURATION.MONTH, BUY_TYPE.NORMAL)?.taskInfo.state,
          getBuyInfo(BUY_DURATION.MONTH, BUY_TYPE.NORMAL),
          seasonCheck
        )}
        {/* 协议 */}
        <ProtocolContent
          handleCheck={handleSeasonCheck}
          checked={seasonCheck}
          style={'blue'}
        ></ProtocolContent>
      </div>
    </div>
  )
}

export default Buy
