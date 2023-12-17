import React from 'react'

import { linkJump } from '@bilibili/utils-leona'
import { DLC_HANDBOOK_URL } from '@constants/fusion'
import classnames from 'classnames'

import styles from './exchangeSuccessModal.module.less'
import { bfsImg } from '@utils/common'

interface Props {
  awardList: any[]
  onClose?: () => void
}

const ExchangeSuccessModal = ({ awardList, onClose }: Props) => {
  const confirm = () => {
    linkJump({
      link: DLC_HANDBOOK_URL,
    })
    onClose()
  }

  return (
    <div className={styles['exchange-success-modal']}>
      <div className={styles['exchange-success-modal-body']}>
        {awardList.map((award, index) => {
          return (
            <div
              key={index}
              className={classnames([
                styles['awards-item'],
                styles[`awards-item-${index + 1}`],
              ])}
            >
              <div className={styles['awards-cover-wrap']}>
                <img className={styles['awards-cover']} src={award.picture} />
              </div>
              <div className={styles['awards-name']}>{award.name}</div>
            </div>
          )
        })}
        <img
          className={styles['award-add']}
          src="https://i0.hdslb.com/bfs/activity-plat/static/20231208/55e8b7702babcaa954cb4a844e5ce05e/3gJQwKL1lH.png"
        />
      </div>
      <div className={styles['confirm-btn']} onClick={confirm}></div>
    </div>
  )
}

export default ExchangeSuccessModal
