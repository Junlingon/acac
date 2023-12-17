import React, { useState, useEffect } from 'react'

import styles from './buyDialog.module.less'
import BaseDialog from '@client/common/base-dialog/Index'
import { useAtom } from 'jotai'
import { getMainInfoAtom } from '@jotai/common'
import { rewardsDialogVisibleAtom } from '@jotai/dialog'
import { linkJump } from '@bilibili/utils-leona'
import { buyRewardsListAtom } from '@jotai/dialog'
import { getRoleInfoAtom } from '@jotai/fusion'
import { getRankAtom } from '@jotai/rank'

const RewardsDialog = () => {
  const [rewardsDialogVisible, setRewardsDialogVisible] = useAtom(
    rewardsDialogVisibleAtom
  )

  const [, getMainInfo] = useAtom(getMainInfoAtom)
  const [rewardsInfo] = useAtom(buyRewardsListAtom)
  const [, getRoleInfo] = useAtom(getRoleInfoAtom)
  const [, getRank] = useAtom(getRankAtom)

  const close = () => {
    console.log('close')
    setRewardsDialogVisible(false)

    // 刷新接口数据
    getMainInfo()
    getRoleInfo()
    getRank()
  }

  const buttonClick = () => {
    close()

    // 跳转到卡片位置
    const cardPos = document.getElementById('cardPosition')
    // 如果dom 获取出错就滚动到大概位置
    window.scrollTo({
      top: cardPos?.offsetTop || 550,
      behavior: 'smooth',
    })
  }

  const content = () => {
    return (
      <div className={styles.buyDialogWrapper}>
        <ul className={`${styles.rewardsList}`}>
          {rewardsInfo.taskRewardResultList.map((item, index) => {
            return (
              <li className={styles.rewardsItem} key={index}>
                <img src={item.rewardPicUrl} alt="" />
                <p className={styles.name}>{item.rewardName}</p>
                {item.rewardNum > 1 && (
                  <div className={styles.num}>
                    {item.rewardNum > 100 ? '99+' : item.rewardNum}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* 按钮 */}
        <div className={styles.button} onClick={buttonClick}></div>
      </div>
    )
  }

  return (
    <BaseDialog
      content={content()}
      visible={rewardsDialogVisible}
      handleClose={close}
    ></BaseDialog>
  )
}

export default RewardsDialog
