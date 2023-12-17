import React from 'react'

import classnames from 'classnames'
import { FRAGMENT_LOCK_MASK, FRAGMENT_TAG } from '@constants/fusion'
import { dlcUrl } from '@constants/home'
import { linkJump } from '@bilibili/utils-leona'

import styles from './fusionBody.module.less'
import { bfsImg } from '@utils/common'

const FusionBody = ({ showVipBtn, showDlcBtn, fragments = [], bigImage }) => {
  const handleVipBtnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDlcBtnClick = () => {
    linkJump({
      link: dlcUrl,
    })
  }

  return (
    <div className={styles['fusion-body']}>
      {bigImage && (
        <div
          style={{
            backgroundImage: `url(${bfsImg(bigImage, 595)})`,
          }}
          className={styles['fragment-container']}
        >
          {/* 碎片 */}
          {fragments.map((fragmentItem, index) => {
            return (
              <div
                key={index}
                className={classnames({
                  [styles[`fragment-item-${index + 1}`]]: true,
                  [styles['fragment-item']]: true,
                })}
              >
                {/* 未解锁蒙层 */}
                {fragmentItem.owned <= 0 && !!FRAGMENT_LOCK_MASK[index] && (
                  <div
                    style={{
                      backgroundImage: `url(${FRAGMENT_LOCK_MASK[index]})`,
                    }}
                    className={classnames({
                      [styles['lock-mask']]: true,
                    })}
                  ></div>
                )}
                {/* 碎片tag */}
                {fragmentItem.label && (
                  <div
                    style={{
                      backgroundImage: `url(${
                        FRAGMENT_TAG[fragmentItem.label]
                      })`,
                    }}
                    className={styles['fragment-tag']}
                  ></div>
                )}
                {/* 数量 */}
                {fragmentItem.owned > 1 && (
                  <div className={styles['fragment-count']}>
                    <div className={styles['fragment-count-text']}>
                      {fragmentItem.owned >= 100
                        ? '99+'
                        : fragmentItem.owned > 1
                        ? fragmentItem.owned
                        : ''}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {/* 去开大会员 */}
          {showVipBtn && (
            <img
              className={styles['buy-vip-btn']}
              src={
                'https://i0.hdslb.com/bfs/activity-plat/static/20231207/55e8b7702babcaa954cb4a844e5ce05e/Y8P1Fta3XO.png'
              }
              onClick={handleVipBtnClick}
            />
          )}
          {/* 去抽收藏集 */}
          {showDlcBtn && (
            <img
              className={styles['buy-dlc-btn']}
              src={
                'https://i0.hdslb.com/bfs/activity-plat/static/20231207/55e8b7702babcaa954cb4a844e5ce05e/r8PlKpKLXH.png'
              }
              onClick={handleDlcBtnClick}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default FusionBody
