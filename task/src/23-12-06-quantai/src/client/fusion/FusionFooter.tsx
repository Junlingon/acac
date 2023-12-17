import React from 'react'

import classnames from 'classnames'
import { linkJump } from '@bilibili/utils-leona'
import { DLC_HANDBOOK_URL } from '@constants/fusion'
import { checkStatus } from '@utils/common'
import { statusAtom, userInfoAtom } from '@jotai/common'
import { useAtom } from 'jotai'

import styles from './fusionFooter.module.less'

const FusionFooter = ({ isCompletely, awards = [], onExchange }) => {
  const [status] = useAtom(statusAtom)
  const [userInfo] = useAtom(userInfoAtom)

  // 去收藏集的图鉴页
  const jumpToAwardPage = () => {
    linkJump({
      link: DLC_HANDBOOK_URL,
    })
  }

  // 兑换奖励
  const toExchange = async () => {
    if (!isCompletely) return
    await checkStatus({
      isLogin: userInfo.isLogin,
      status: status,
    })
    onExchange()
  }

  return (
    <div className={styles['fusion-footer']}>
      <div className={styles['fusion-footer-top']}>
        {/* 完成任务领取碎片，集齐碎片兑换奖励 */}
        <img
          className={styles['desc']}
          src="https://i0.hdslb.com/bfs/activity-plat/static/20231207/55e8b7702babcaa954cb4a844e5ce05e/KytwJntPvR.png"
        />
        {/* 查看奖励 */}
        <div className={styles['check-btn']} onClick={jumpToAwardPage}>
          查看奖励
        </div>
      </div>
      {/* 兑换 */}
      <div className={styles['fusion-footer-exchange']}>
        <div className={styles['exchange-left']}>
          {awards.map((award, index) => {
            return (
              <div
                key={index}
                className={classnames([
                  styles[`exchange-item`],
                  styles[`exchange-item-${index + 1}`],
                ])}
              >
                <div className={styles['exchange-item-left']}>
                  <img
                    className={styles['exchange-item-img']}
                    src={award.picture}
                  />
                </div>
                <div className={styles['exchange-item-right']}>
                  <div className={styles['exchange-item-name']}>
                    {award.name}
                  </div>
                  <div className={styles['exchange-item-desc']}>
                    {award.desc}
                  </div>
                </div>
              </div>
            )
          })}
          <img
            className={styles['exchange-item-add']}
            src="https://i0.hdslb.com/bfs/activity-plat/static/20231207/55e8b7702babcaa954cb4a844e5ce05e/km8csorU7V.png"
          />
        </div>
        <div className={styles['exchange-right']} onClick={toExchange}>
          <img
            src={
              isCompletely
                ? 'https://i0.hdslb.com/bfs/activity-plat/static/20231207/55e8b7702babcaa954cb4a844e5ce05e/9mpki1kxkr.png'
                : 'https://i0.hdslb.com/bfs/activity-plat/static/20231207/55e8b7702babcaa954cb4a844e5ce05e/NvalflExe0.png'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default FusionFooter
