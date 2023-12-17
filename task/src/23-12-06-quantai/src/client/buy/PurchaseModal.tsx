import React from 'react'

import BaseDialog from '@client/common/base-dialog/Index'

import { useAtom } from 'jotai'
import { purchaseModalVisibleAtom } from '@jotai/purchaseModal'
import { buyPropsAtom } from '@jotai/home'
import { PURCHASE_AWARD, dlcUrl } from '@constants/home'
import classnames from 'classnames'
import { linkJump } from '@bilibili/utils-leona'

import styles from './purchaseModal.module.less'

const PurchaseModal = () => {
  const [purchaseModalVisible, setPurchaseModalVisible] = useAtom(
    purchaseModalVisibleAtom
  )
  const [buyProps] = useAtom(buyPropsAtom)

  const close = () => {
    setPurchaseModalVisible(false)
  }

  const Content = () => {
    const awards = PURCHASE_AWARD[buyProps.currentItem.month]

    const handleClick = (type) => {
      if (type === 'dlc') {
        linkJump({
          link: dlcUrl,
        })
      } else {
        window.scrollTo({
          top: document.getElementById('buyWrapper').offsetTop,
          behavior: 'smooth',
        })
      }
      setPurchaseModalVisible(false)
    }

    return (
      <div
        className={classnames({
          [styles['purchase-modal']]: true,
        })}
      >
        {awards.map((awardItem, index) => {
          return (
            <div
              key={index}
              className={classnames({
                [styles['award-item']]: true,
                [styles[awardItem.class]]: true,
                [styles['single']]: awards.length === 1,
              })}
            >
              <img
                className={styles['award-item-image']}
                src={awardItem.image}
              />
              <div className={styles['award-item-name']}>{awardItem.name}</div>
              <img
                className={styles['award-item-btn']}
                src={awards.length === 1 ? awardItem.bigBtn : awardItem.btn}
                onClick={handleClick}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <BaseDialog
      content={<Content />}
      visible={purchaseModalVisible}
      handleClose={close}
    />
  )
}

export default PurchaseModal
