import React from 'react'
import styles from './buy.module.less'
import { useAtom } from 'jotai'
import { mainInfoAtom } from '@jotai/common'
import { rewardsDialogVisibleAtom, buyRewardsListAtom } from '@jotai/dialog'

import { linkJump } from '@bilibili/utils-leona'
import { dlcUrl } from '@constants/home'
import { $anyDoor } from '@api/http'

const Collections = () => {
  const [mainInfo] = useAtom(mainInfoAtom)
  const [, setRewardsDialogVisible] = useAtom(rewardsDialogVisibleAtom)
  const [, setBuyRewardsList] = useAtom(buyRewardsListAtom)

  const { dlcAwardInfo } = mainInfo || {}

  const getBuyAward = async (taskCode) => {
    try {
      const result = await $anyDoor({
        name: 'quantai_award',
        inputMap: {
          taskCode,
        },
      })
      console.log('----收藏集getBuyAward----', result)
      setBuyRewardsList(result)
      setRewardsDialogVisible(true)
    } catch (error) {
      console.log('收藏集getBuyAward 错误')
    }
  }
  //展示相关状态的btn
  const showActiveBtn = (state: number) => {
    if (state === 1) {
      return (
        <div
          className={styles.button}
          onClick={() => {
            linkJump({
              link: dlcUrl,
            })
          }}
        >
          <div className={styles.bubble}>
            <div className={styles.bubText}>大会员首抽4.9折</div>
          </div>
          <span className={styles.text}>去抽卡</span>
        </div>
      )
    } else {
      return (
        <>
          {dlcAwardInfo?.leftFragment > 50 ? (
            <div
              className={`${styles.button} ${styles.draws}`}
              onClick={() => {
                getBuyAward(dlcAwardInfo.taskCode)
              }}
            >
              <span className={styles.number}>50</span>
              <span className={styles.text}> 连抽</span>
            </div>
          ) : (
            <div
              className={`${styles.button} ${styles.receive}`}
              onClick={() => {
                getBuyAward(dlcAwardInfo.taskCode)
              }}
            ></div>
          )}
        </>
      )
    }
  }

  return (
    <div className={styles.collectionsWrapper}>
      <div className={styles.collections}>
        {showActiveBtn(dlcAwardInfo?.state)}
      </div>
    </div>
  )
}

export default Collections
